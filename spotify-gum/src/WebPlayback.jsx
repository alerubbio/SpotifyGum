import React, { useState, useEffect } from 'react';

function WebPlayback(props) {
    const [player, setPlayer] = useState(undefined);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
    
        document.body.appendChild(script);
    
        window.onSpotifyWebPlaybackSDKReady = () => {
    
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: callback => { callback(props.token); },
                volume: 0.5
            });
    
            setPlayer(player);
    
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });
    
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('initialization_error', ({ message }) => { 
                console.error('Initialization Error: ', message);
            });
          
            player.addListener('authentication_error', ({ message }) => {
                console.error('Authentication Error:', message);
            });
          
            player.addListener('account_error', ({ message }) => {
                console.error('Account Error:', message);
            });
    

            player.connect();
    
        };
    }, []);
   return (
      <>
        <div className="container">
           <div className="main-wrapper">

            </div>
        </div>
      </>
    );
}

export default WebPlayback