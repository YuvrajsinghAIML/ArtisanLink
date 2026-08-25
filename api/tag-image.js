export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { imageUrl, description } = req.body;

  if (!imageUrl && !description) {
    return res.status(400).json({ error: 'Missing image or description' });
  }

  try {
    // TODO: Swap in real vision model (e.g. OpenAI Vision or Gemini API)
    // Example:
    // const apiKey = process.env.VISION_API_KEY;
    // const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', { ... });

    // HACKATHON SHORTCUT: Keyword-based auto-tagging heuristic fallback
    // Since we don't have a real API key provided right now, we simulate AI processing
    // based on the description text, or return generic defaults.
    
    await new Promise(resolve => setTimeout(resolve, 1500)); // simulate network delay

    let category = 'Other';
    let material = 'Unknown';
    let region = 'Local';

    const descLower = (description || '').toLowerCase();

    // Heuristic rules for demo
    if (descLower.includes('pot') || descLower.includes('clay') || descLower.includes('ceramic')) {
      category = 'Pottery';
      material = 'Clay';
    } else if (descLower.includes('cloth') || descLower.includes('weave') || descLower.includes('sari') || descLower.includes('textile')) {
      category = 'Textiles';
      material = 'Cotton / Silk';
    } else if (descLower.includes('wood') || descLower.includes('carv')) {
      category = 'Woodwork';
      material = 'Wood';
    } else if (descLower.includes('metal') || descLower.includes('brass')) {
      category = 'Metalwork';
      material = 'Brass / Bronze';
    } else if (descLower.includes('jewelry') || descLower.includes('necklace') || descLower.includes('bead')) {
      category = 'Jewelry';
      material = 'Beads / Metals';
    }

    if (descLower.includes('rajasthan')) region = 'Rajasthan';
    else if (descLower.includes('gujarat')) region = 'Gujarat';
    else if (descLower.includes('odisha')) region = 'Odisha';
    else if (descLower.includes('assam')) region = 'Assam';

    return res.status(200).json({
      category,
      material,
      region,
      confidence: 0.85, // mock confidence score
      isMock: true
    });
  } catch (error) {
    console.error('Error in tag-image handler:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
