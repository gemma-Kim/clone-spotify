import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { useQuery } from '@tanstack/react-query'; 
import './SearchPage.style.css';
import { api } from '../../utils/api/api';


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

  const handleAlbumClick = (album) => {
    navigate(`/albums/${album.id}`); 
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

      <Container className="d-flex flex-column align-items-center mt-5">
        {isMobile && (
          <Form className="d-flex w-100 search-form" onSubmit={handleFormSubmit}>
            <Form.Control
              type="search"
              placeholder="Search for a song, artist, or album" 
              className="me-2 search-input"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="primary" className="search-button" type="submit">
              <FaSearch className="search-icon" />
            </Button>
          </Form>
        )}

        <div className="mt-4 w-100">
          {searchResults ? (
            <>
              {searchResults.tracks?.items.length > 0 && (
                <ul>
                  {searchResults.tracks.items.map((track) => (
                    <li
                      key={track.id}
                      onClick={() => handleTrackClick(track)}
                      style={{
                        cursor: 'pointer',
                        listStyle: 'none',
                        padding: '10px',
                        borderBottom: '1px solid #ccc',
                        backgroundColor: selectedTrack?.id === track.id ? 'rgba(200, 200, 200, 0.5)' : 'transparent',
                      }}
                      role="button"
                    >
                      <img src={track.album.images[0]?.url} alt="album cover" width="50" />
                      {track.name} by {track.artists.map(artist => artist.name).join(', ')}
                    </li>
                  ))}
                </ul>
              )}

              {searchResults.albums?.items.length > 0 && (
                <ul>
                  {searchResults.albums.items.map((album) => (
                    <li
                      key={album.id}
                      onClick={() => handleAlbumClick(album)} 
                      style={{
                        cursor: 'pointer',
                        listStyle: 'none',
                        padding: '10px',
                        borderBottom: '1px solid #ccc',
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                      }}
                      role="button"
                    >
                      <div>
                        <img src={album.images[0]?.url} alt="album cover" width="50" />
                        {album.name} by {album.artists.map(artist => artist.name).join(', ')}
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation(); 
                          handleAlbumClick(album); 
                        }}
                        style={{
                          fontSize: '1.5rem', 
                          padding: '5px 10px', 
                          border: 'none', 
                          backgroundColor: 'transparent', 
                          cursor: 'pointer'
                        }}
                      >
                        {'>'}
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <p>No results found</p>
          )}
        </div>
      </Container>
    </>
  );
};

export default SearchPage;
