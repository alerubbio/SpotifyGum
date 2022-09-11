import React, { useState, useEffect } from 'react';
import WebPlayback from './WebPlayback.jsx'
import Login from './Login'
import './App.css';
import TopTracks from './TopTracks.jsx';
import GumContainer from './GumContainer.jsx';

function App() {

  const [token, setToken] = useState('');

  useEffect(() => {

    async function getToken() {
      const response = await fetch('/api/token');
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();
  }, []);

  return (
    <>
        { (token === '') ? <Login/> : <GumContainer token={token} /> }
    </>
  );
}

export default App;