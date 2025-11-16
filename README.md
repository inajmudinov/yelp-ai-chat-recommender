# Yelp AI Recommender

**Built in San Francisco, California** for the **Yelp AI API Hackathon 2025**

Ask in natural language — get smart local business recommendations with ratings, addresses, and **real-time hours**.

## Features
- Natural language chat (e.g., "Coffee shops in San Francisco")
- Multi-turn conversations
- Business cards with **hours**, rating, location
- Browser geolocation (falls back to San Francisco)
- **100% Yelp AI API** — no other data sources

## Live Demo
[https://yelp-ai-recommender.vercel.app](https://yelp-ai-chat-recommender-jqxu64hih-inajmudinovs-projects.vercel.app)

## Tech Stack
- React
- Axios
- Yelp AI API (`/ai/chat/v2`)
- Deployed on Vercel

## Setup
```bash
npm install
cp .env.example .env
# Add your Yelp API key
npm start
