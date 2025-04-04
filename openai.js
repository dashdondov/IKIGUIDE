import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  
  const { answer1, answer2, answer3, answer4 } = req.body;
  
  const prompt = `
  Дараах асуултуудад өгсөн хариултууд дээр үндэслэн IKIGAI-н дүгнэлтийг Монгол хэл дээр бичиж өгнө үү.
  
  1) Та юу хийх дуртай вэ? => ${answer1}
  2) Та юуг сайн хийж чаддаг вэ? => ${answer2}
  3) Дэлхий ертөнцөд юугаар туслах вэ? => ${answer3}
  4) Та юунаас мөнгө олох боломжтой вэ? => ${answer4}
  
  Таны дүгнэлт:
  `;

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 200,
      temperature: 0.7,
    });
    
    const ikigaiConclusion = completion.data.choices[0].text.trim();
    res.status(200).json({ ikigaiConclusion });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "OpenAI API Error" });
  }
}