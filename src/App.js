import React, { useState, useEffect } from 'react';
import { sendQuery } from './services/yelpAPI';
import './App.css';  // We'll add this file next

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chatId, setChatId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [userContext, setUserContext] = useState({
  locale: 'en_US',
  latitude: 37.7749,
  longitude: -122.4194,
});

useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserContext({
          locale: 'en_US',
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      () => console.log("Location denied — using SF")
    );
  }
}, []);

  const handleSend = async () => {
    if (!input.trim()) return;  // Don't send empty messages
    setLoading(true);

    // Add the user's message to the chat
    setMessages(prev => [...prev, { type: 'user', text: input }]);

    try {
      // Call the API using our helper function
      const data = await sendQuery(input, chatId, userContext);
      setChatId(data.chat_id);  // Save chat ID for follow-ups

      // Add the AI's response to the chat
      setMessages(prev => [...prev, {
        type: 'ai',
        text: data.response.text,
        businesses: data.entities?.[0]?.businesses || []  // Pull out business details if available
      }]);
    } catch (error) {
      // If error, show it in chat
      setMessages(prev => [...prev, { type: 'error', text: error.message }]);
    }

    setInput('');  // Clear the input box
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Yelp AI Restaurant Recommender</h1>
      <div className="chat-container">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.type}`}>
            {msg.type === 'ai' && msg.businesses.length > 0 ? (
              <div>
                <p>{msg.text}</p>
                <div className="businesses">
                  {msg.businesses.map((biz, i) => (
                    <div key={i} className="business-card">
                      <h3>{biz.name}</h3>
                      <p>Rating: {biz.rating}/5</p>
                      <p>Location: {biz.location.address1}</p>
                      {biz.contextual_info?.business_hours?.[0]?.business_hours?.[0] && (
  <p>
    Open: {biz.contextual_info.business_hours[0].business_hours[0].open_time} – 
    {biz.contextual_info.business_hours[0].business_hours[0].close_time}
  </p>
)}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>{msg.text}</p>
            )}
          </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>
      <div className="input-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about restaurants, e.g., 'Vegan pizza near me'"
        />
        <button onClick={handleSend} disabled={loading}>Send</button>
      </div>
    </div>
  );
}

export default App;
