import axios from 'axios';

const API_URL = 'https://api.yelp.com/ai/chat/v2';
const API_KEY = process.env.REACT_APP_YELP_API_KEY;

export const sendQuery = async (query, chatId = null, userContext = {}) => {
  const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  };
  const body = { query };
  if (userContext) body.user_context = userContext;
  if (chatId) body.chat_id = chatId;

  try {
    const response = await axios.post(API_URL, body, { headers });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch recommendations');
  }
};
