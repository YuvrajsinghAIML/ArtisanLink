import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
  }

  const { image, mimeType } = req.body;

  if (!image || !mimeType) {
    return res.status(400).json({ error: "Missing required fields: image (base64) and mimeType." });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an expert product listing assistant for a handmade artisan marketplace.
Analyze the uploaded product image carefully and return a JSON object with these exact keys:

- "title": A catchy, descriptive product name (max 10 words).
- "description": A 2-sentence product pitch describing its appeal and craftsmanship.
- "category": One of: Pottery, Textiles, Woodwork, Painting, Jewelry, Metalwork, Basketry, Leatherwork, Other.
- "material": The primary material (e.g., Clay, Silk, Brass, Cotton, Canvas, Wood, Leather).
- "tags": An array of exactly 3 short descriptive keyword strings.

Return ONLY the raw JSON object. No markdown, no code fences, no extra text.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: image,
          mimeType: mimeType,
        },
      },
    ]);

    const responseText = result.response.text();

    // Strip any accidental markdown code fences the model might add
    const cleaned = responseText
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    // Validate required keys exist
    const requiredKeys = ["title", "description", "category", "material", "tags"];
    for (const key of requiredKeys) {
      if (!(key in parsed)) {
        return res.status(500).json({ error: `AI response missing required key: ${key}` });
      }
    }

    return res.status(200).json(parsed);
  } catch (error) {
    console.error("Gemini API error:", error);
    return res.status(500).json({
      error: "Failed to analyze image. Please try again or enter details manually.",
    });
  }
}
