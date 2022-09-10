import React, { useState, useEffect } from 'react';

const tracks = {
  href: "",
  items: [
    {}
  ],
  "limit": 0,
  "offset": 0,
  "total": 0
}

function TopTracks(props) {

  const [topTracks, setTopTracks] = useState(tracks)

  useEffect(() => {
    async function getTopTracks() {
      const response = await fetch('/me/top/tracks');
      const json = await response.json();
      console.log("json top tracks: ")
      setTopTracks(json);
    }

    getTopTracks();

  }, []);

  return (
    <>
      <div>
        Top Tracks
      </div>
    </>

  )
} export default TopTracks

// app.get('/me/top/tracks', (req, res) => {

//   const response = fetch('https://api.spotify.com/v1/me/player', {
//     method: "GET",
//     headers: ({
//       'Content-type': 'application/json',
//       'Authorization': `Bearer ${access_token}`
//     }),
//     body: JSON.stringify({
//       limit: 30,
//       offset: 0,
//       time_range: 'medium_term',
//     })
//   }).then((res) => {
//     res.json()
//     console.log(res)
//   });

//   res.json(response)
// })