import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateLoveLetter(params) {
  const { recipientName, senderName, occasion, tone, additionalDetails } = params;
  
  const prompt = `
    Generate a romantic and personalized love letter with the following details:
    - From: ${senderName}
    - To: ${recipientName}
    - Occasion: ${occasion}
    - Tone: ${tone}
    - Additional Details: ${additionalDetails || "None provided"}
    
    Please write a heartfelt love letter that feels genuine and personal. Format it properly with salutation, body paragraphs, and closing. Only write the content of the letter, without any metadata.
    Try to keep it short (about 3 paragraphs max) and sweet. Feel free to be creative and expressive with your words.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating love letter:", error);
    throw new Error("Failed to generate love letter. Please try again later.");
  }
}