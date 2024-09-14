import React, { useEffect, useState } from 'react'
import MusicTab from '../../common/MusicTab/MusicTab'
import "./UserPage.style.css"
import { useUserSavedAlbums } from '../../hooks/user/useUserSavedAlbums'
import { useUserFollowedArtistsQuery } from '../../hooks/user/useUserFollwedArtists'
import { useUserSavedTracksQuery } from '../../hooks/user/useUserSavedTracks'

const UserPage = () => {
  const { data: albumData } = useUserSavedAlbums();
  const { data: artistsData } = useUserFollowedArtistsQuery();
  const { data: trackData } = useUserSavedTracksQuery();
  console.log("tra", trackData)
  const [myLibrary, setMyLibrary] = useState([]);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    const formattedAlbums = Array.isArray(albumData)
      ? albumData.map(({ album, added_at }) => ({
          ...album,
          added_at,
        }))
      : [];

    const formattedArtists = Array.isArray(artistsData) ? artistsData : [];

    const formattedTracks = Array.isArray(trackData)
      ? trackData.map(({ track, added_at }) => ({
        ...track,
        added_at,
      }))
      : [];

    if (tab === 'all') {
      setMyLibrary([...formattedAlbums, ...formattedArtists, ...formattedTracks]);
    } else if (tab === 'album') {
      setMyLibrary(formattedAlbums);
    } else if (tab === 'artist') {
      setMyLibrary(formattedArtists);
    } else if (tab === "track") {
      setMyLibrary(formattedTracks);
    }
  }, [albumData, artistsData, trackData,tab]);

  return (
    <div className="user-page">
      <div className="header-container">
        <h1>My Library</h1> {/* 수정 */}
      </div>

      <div className="music-libary">
        <div className="tabs-container">
        <button
          className={`tab-button ${tab === 'all' ? 'active' : ''}`}
          onClick={() => setTab("all")}
        >
          All {/* 수정 */}
        </button>
        <button
          className={`tab-button ${tab === 'album' ? 'active' : ''}`}
          onClick={() => setTab("album")}
        >    
          Albums {/* 수정 */}
        </button>
        <button
          className={`tab-button ${tab === 'artist' ? 'active' : ''}`}
          onClick={() => setTab("artist")}
        >
          Artists {/* 수정 */}
        </button>
        <button
          className={`tab-button ${tab === 'track' ? 'active' : ''}`}
          onClick={() => setTab("track")}
        >
          Tracks {/* 수정 */}
        </button>
      </div>

        <div className="music-list">
          {myLibrary && myLibrary.length > 0
            ? myLibrary.map((data, index) => (
              <MusicTab data={data} key={index} />
            ))
            : "You haven't added any albums yet."} {/* 수정 */}
          
        </div>
      </div>
    </div>
  )
}

export default UserPage
