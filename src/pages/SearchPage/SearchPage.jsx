import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';  
import { FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import './SearchPage.style.css';
import { api } from '../../utils/api/api';
import SearchForm from '../../common/SearchForm/SearchForm';  
import MusicList from '../../common/MusicList/MusicList';    

const useSearchQuery = (searchQuery) => {
  return useQuery({
    queryKey: ['searchResults', searchQuery],
    queryFn: async () => {
      const spotifyApi = api();
      const response = await spotifyApi.get('/v1/search', {
        params: {
          q: searchQuery,
          type: 'track,artist,album',
          limit: 10
        }
      });
      return response.data;
    },
    enabled: !!searchQuery
  });
};

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [tab, setTab] = useState('tracks'); 
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    if (query) {
      setSearchQuery(query);
    }
  }, [location]);

  const { data: searchResults, refetch } = useSearchQuery(searchQuery);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  const handleTrackClick = (track) => {
    setSelectedTrack(track);
  };

  const handlePlayerBarClick = () => {
    if (selectedTrack) {
      navigate(`/track/${selectedTrack.id}`);
    }
  };

  return (
    <>
      {selectedTrack && (
        <div className="player-bar" onClick={handlePlayerBarClick} style={{ cursor: 'pointer' }}>
          <div className="player-info">
            <img src={selectedTrack.album.images[0]?.url} alt={selectedTrack.album.name} width="50" />
            <div>
              <p>{selectedTrack.name}</p>
              <p>{selectedTrack.artists.map(artist => artist.name).join(', ')}</p>
            </div>
          </div>
          <audio controls src={selectedTrack.preview_url}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

<Container className="search-page">
        {isMobile && (
          <SearchForm 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            handleFormSubmit={handleFormSubmit} 
          />
        )}

        <div className="header-container">
          <h1>검색 결과</h1>

          {/* 트랙/앨범 버튼 */}
          <div className="tabs-container">
            <button
              className={`tab-button ${tab === 'tracks' ? 'active' : ''}`}
              onClick={() => setTab('tracks')}
            >
              곡
            </button>
            <button
              className={`tab-button ${tab === 'albums' ? 'active' : ''}`}
              onClick={() => setTab('albums')}
            >
              앨범
            </button>
          </div>
        </div>
        <div className="music-library" style={{ paddingBottom: selectedTrack ? '100px' : '0' }}>
          {searchResults ? (
            <>
              {tab === 'tracks' && searchResults.tracks?.items.length > 0 && (
                <>
                  <h2>곡</h2>
                  <MusicList 
                    items={searchResults.tracks.items} 
                    type="track" 
                    handleTrackClick={handleTrackClick} 
                  />
                </>
              )}

              {tab === 'albums' && searchResults.albums?.items.length > 0 && (
                <>
                  <h2>앨범</h2>
                  <MusicList 
                    items={searchResults.albums.items} 
                    type="album" 
                    handleTrackClick={handleTrackClick} 
                  />
                </>
              )}
            </>
          ) : (
            <p>결과가 없습니다</p>
          )}
        </div>
      </Container>
    </>
  );
};

export default SearchPage;
