import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "./SearchPage.style.css";
import { api } from "../../utils/api/api";
import SearchForm from "../../common/SearchForm/SearchForm";
import MusicList from "../../common/MusicList/MusicList";
import MusicTab from "../../common/MusicTab/MusicTab";

const useSearchQuery = (searchQuery) => {
  return useQuery({
    queryKey: ["searchResults", searchQuery],
    queryFn: async () => {
      const spotifyApi = api();
      const response = await spotifyApi.get("/v1/search", {
        params: {
          q: searchQuery,
          type: "track,artist,album",
          limit: 10,
        },
      });
      return response.data;
    },
    enabled: !!searchQuery,
  });
};

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [tab, setTab] = useState("tracks");
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    if (query) {
      setSearchQuery(query);
    }
  }, [location]);

  const { data: searchResults, refetch } = useSearchQuery(searchQuery);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  const handleAlbumClick = (album) => {
    navigate(`/albums/${album.id}`);
  };

  return (
    <>
      <Container className="search-page">
        {isMobile && (
          <SearchForm
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleFormSubmit={handleFormSubmit}
          />
        )}

        <div className="header-container">
          <h1>Results</h1>

          <div className="tabs-container">
            <button
              className={`tab-button ${tab === "tracks" ? "active" : ""}`}
              onClick={() => setTab("tracks")}
            >
              Tracks
            </button>
            <button
              className={`tab-button ${tab === "albums" ? "active" : ""}`}
              onClick={() => setTab("albums")}
            >
              Albums
            </button>
          </div>
        </div>
        <div
          className="music-library"
          style={{ paddingBottom: selectedTrack ? "100px" : "0" }}
        >
          {searchResults ? (
            <>
              {tab === "tracks" && searchResults.tracks?.items.length > 0 && (
                <>
                  <h2>Track</h2>
                  {searchResults.tracks?.items.map((item, idx) => (
                    <MusicTab key={idx} data={item} />
                  ))}
                </>
              )}

              {tab === "albums" && searchResults.albums?.items.length > 0 && (
                <>
                  <h2>Albums</h2>
                  <MusicList
                    items={searchResults.albums.items}
                    type="album"
                    handleAlbumClick={handleAlbumClick}
                  />
                </>
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
