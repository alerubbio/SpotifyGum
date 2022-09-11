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

function TopTracks() {

  const [topTracks, setTopTracks] = useState(tracks)

  useEffect(() => {
    async function getTopTracks() {
      const response = await fetch('/api/top/tracks');
      const json = await response.json();
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
