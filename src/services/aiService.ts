import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.OPENAI_API_KEY; // Replace with your actual API key

export const generateResponse = async (prompt: string) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return '';
  }
};

export const changeTone = async (message: string, tone: string) => {
  const prompt = `Change the tone of the following message to be ${tone}: "${message}"`;
  return generateResponse(prompt);
};
