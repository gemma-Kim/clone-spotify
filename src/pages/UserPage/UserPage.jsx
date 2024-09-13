import React, { useEffect, useState } from 'react'
import MusicTab from '../../common/MusicTab/MusicTab'
import "./UserPage.style.css"
import { useUserSavedAlbums } from '../../hooks/user/useUserSavedAlbums'
import { useUserFollowedArtistsQuery } from '../../hooks/user/useUserFollwedArtists'

const UserPage = () => {
  const { data: albumData } = useUserSavedAlbums();
  const { data: artistsData } = useUserFollowedArtistsQuery();
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

    if (tab === 'all') {
      setMyLibrary([...formattedAlbums, ...formattedArtists]);
    } else if (tab === 'album') {
      setMyLibrary(formattedAlbums);
    } else if (tab === 'artist') {
      setMyLibrary(formattedArtists);
    }
  }, [albumData, artistsData, tab]);

  return (
    <div className="user-page">
      <div className="header-container">
        <h1>내 라이브러리</h1>
      </div>

      <div className="music-libary">
        <div className="tabs-container">
        <button
          className={`tab-button ${tab === 'all' ? 'active' : ''}`}
          onClick={() => setTab("all")}
        >
          전체
        </button>
        <button
          className={`tab-button ${tab === 'album' ? 'active' : ''}`}
          onClick={() => setTab("album")}
        >
          앨범
        </button>
        <button
          className={`tab-button ${tab === 'artist' ? 'active' : ''}`}
          onClick={() => setTab("artist")}
        >
          아티스트
        </button>
      </div>

        <div className="music-list">
          {myLibrary && myLibrary.length > 0
            ? myLibrary.map((data, index) => (
              <MusicTab data={data} key={index} />
            ))
            : "아직 추가한 앨범이 없습니다"}
          
        </div>
      </div>
    </div>
  )
}

export default UserPage
