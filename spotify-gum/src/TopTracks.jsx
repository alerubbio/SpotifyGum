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
      console.log("json top tracks: " + json)
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

