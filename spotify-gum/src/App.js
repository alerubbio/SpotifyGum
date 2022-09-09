import React, { useState, useEffect } from 'react';
import WebPlayback from './WebPlayback.jsx'
import Login from './Login'
import './App.css';

function App() {

  const [token, setToken] = useState('');

  console.log("token val before:" + token)
  useEffect(() => {

    async function getToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();
    console.log("token val after:" + token)
  }, []);

  return (
    <>
        { (token === '') ? <Login/> : <WebPlayback token={token} /> }
    </>
  );
}

export default App;