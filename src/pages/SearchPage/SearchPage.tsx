import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchPage.style.css";
import SearchForm from "./SearchForm/SearchForm";
import ClipLoader from "react-spinners/ClipLoader";
import { useSearchQuery } from "../../hooks/common/useSearchQuery";
import MusicTab from "../../common/MusicTab/MusicTab";

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

  const { data: searchResults, refetch } = useSearchQuery({
    q: searchQuery,
    type: "track,artist,album",
  });

  const handleFormSubmit = (event: Event) => {
    event.preventDefault();
    refetch();
  };

  const handleAlbumClick = (album: any) => {
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
              {tab === "tracks" &&
                searchResults.data.tracks?.items.length > 0 && (
                  <>
                    <h2>Track</h2>
                    {searchResults.data.tracks?.items.map(
                      (item: any, idx: number) => (
                        <MusicTab key={idx} data={item} />
                      )
                    )}
                  </>
                )}

              {tab === "albums" &&
                searchResults.data.albums?.items.length > 0 && (
                  <>
                    <h2>Albums</h2>
                    {searchResults.data.albums?.items.map(
                      (item: any, idx: number) => (
                        <MusicTab key={idx} data={item} />
                      )
                    )}
                  </>
                )}
            </>
          ) : (
            <div className="loading-spinner">
              <ClipLoader color="green" size={50} />
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default SearchPage;
