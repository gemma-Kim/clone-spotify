import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './SearchPage.style.css';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null); 
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

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
      handleSearch(query);
    }
  }, [location]);

  const getSpotifyAccessToken = async () => {
    const client_id = 'd657a50906a84e7b86cf0425717caa5b';
    const client_secret = '4e156cb8f6974579bbf399d81137c81a';

    const tokenResponse = await axios.post('https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: client_id,
        client_secret: client_secret
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    return tokenResponse.data.access_token;
  };

  const handleSearch = async (query) => {
    const accessToken = await getSpotifyAccessToken();

    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        q: query || searchQuery,
        type: 'track,artist',
        limit: 10
      }
    });

    setSearchResults(response.data.tracks.items);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleTrackClick = (track) => {
    setSelectedTrack(track); 
  };

  return (
    <>
      {selectedTrack && (
        <div className="player-bar">
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
              placeholder="Search for a song or artist"
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
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((track) => (
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
          ) : (
            <p>No results found</p>
          )}
        </div>
      </Container>
    </>
  );
};

export default SearchPage;
