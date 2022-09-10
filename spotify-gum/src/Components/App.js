import React, { useState, useEffect } from 'react';
import WebPlayback from './WebPlayback.jsx'
import Login from './Login'
import '../CSS/App.css';
import TopTracks from './TopTracks.jsx';

function App() {

  const [token, setToken] = useState('');

  useEffect(() => {

    async function getToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();
  }, []);

  return (
    <>
      <div>
        {(token === '') ? <Login /> : <WebPlayback token={token} />}
        <TopTracks />
      </div>
    </>
  );
}

export default App;