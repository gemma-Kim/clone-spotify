import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchPage.style.css";
import { useSearchQuery } from "../../hooks/common/useSearchQuery";
import Card from "src/components/Card/Card";
// import {
//   Album,
//   ArtistDetail,
//   ContentTypes,
//   Playlist,
// } from "@types/content/index";
import TrackList from "@features/track/TrackList";
import Button from "src/components/Button/Button";
import List from "src/components/List/List";
import MediaHighlight from "src/components/MediaHighlight/MediaHighlight";
import { Album, ArtistDetail, ContentTypes, Playlist } from "@types";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [tab, setTab] = useState<ContentTypes | null>("all");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    if (query) {
      setSearchQuery(query);
    }
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { data: searchResults } = useSearchQuery({
    q: searchQuery,
    type: ["track", "artist", "album", "playlist"],
  });

  // const handleFormSubmit = (searchValue: string) => {
  //   if (!searchValue) return;
  //   navigate(`/search?query=${encodeURIComponent(searchValue)}`);
  // };

  const tabOptions = [
    { label: "All", value: "all" },
    { label: "Tracks", value: "track" },
    { label: "Artists", value: "artist" },
    { label: "Albums", value: "album" },
    { label: "Playlists", value: "playlist" },
  ] as const;

  return (
    <div className="search-page-container">
      {/* {isMobile && (
        <SearchForm defaultQuery={searchQuery} onSubmit={handleFormSubmit} />
      )} */}

      <div className="tabs-container">
        {tabOptions.map(({ label, value }) => (
          <Button
            key={value}
            content={label}
            isActive={tab === value}
            onClickHandler={() => setTab(value)}
          />
        ))}
      </div>

      <div className="library-container">
        {searchResults ? (
          <>
            {tab === "all" && searchResults?.tracks?.items.length > 0 ? (
              <>
                <div>
                  <div className={"highlighted-search-result"}>
                    <div className={"mediahighlight-container"}>
                      <h2 className="highlight-title">Highlight</h2>
                      {
                        <MediaHighlight
                          content={
                            searchResults?.tracks?.items.length > 0 ? (
                              searchResults?.tracks?.items[0]
                            ) : searchResults?.artists?.items.length > 0 ? (
                              searchResults?.artists?.items[0]
                            ) : searchResults?.albums?.items.length > 0 ? (
                              searchResults?.artists[0]
                            ) : (
                              <></>
                            )
                          }
                        />
                      }
                    </div>
                    <div className={"track-list-container"}>
                      <h2>Track</h2>
                      {
                        <TrackList
                          showHeader={false}
                          showTrackNumber={false}
                          showAlbumName={false}
                          tracks={searchResults.tracks.items}
                          origin={"track"}
                        />
                      }
                    </div>
                  </div>
                </div>
                <h2>Artist</h2>
                {
                  <List
                    layout={"horizontal"}
                    items={searchResults.artists.items.map(
                      (artist: ArtistDetail, idx: number) => (
                        <Card
                          key={idx}
                          content={artist}
                          title={artist.name}
                          subtitles="Artist"
                          imgUrl={artist.images[0]?.url}
                          roundImg={true}
                          onClickHandler={() => {
                            navigate(`/artists/${artist.id}`);
                          }}
                        />
                      )
                    )}
                  />
                }
                <h2>Album</h2>
                {
                  <List
                    layout={"horizontal"}
                    gap={0.01}
                    items={searchResults.albums.items.map(
                      (album: Album, idx: number) => (
                        <Card
                          key={idx}
                          content={album}
                          title={album.name}
                          subtitles={`${album.release_date.split("-")[0]} · ${
                            album.artists[0].name
                          }`}
                          imgUrl={album.images[0]?.url}
                          onClickHandler={() => {
                            navigate(`/albums/${album.id}`);
                          }}
                        />
                      )
                    )}
                  />
                }
                <h2>Playlist</h2>
                {
                  <List
                    layout={"horizontal"}
                    items={searchResults?.playlists?.items
                      .filter((p: Playlist) => p?.name && p?.owner)
                      .map((playlist: Playlist, idx: number) => (
                        <Card
                          key={idx}
                          content={playlist}
                          title={playlist?.name}
                          subtitles={
                            playlist?.owner?.display_name
                              ? `Maker · ${playlist?.owner?.display_name}`
                              : ""
                          }
                          imgUrl={playlist?.images[0]?.url}
                          onClickHandler={() => {
                            navigate(`/playlists/${playlist.id}`);
                          }}
                        />
                      ))}
                  />
                }
              </>
            ) : tab === "track" && searchResults.tracks?.items.length > 0 ? (
              <>
                {
                  <TrackList
                    showHeader={true}
                    showTrackNumber={true}
                    tracks={searchResults.tracks.items}
                    origin={"track"}
                  />
                }
              </>
            ) : tab === "album" && searchResults.albums?.items.length > 0 ? (
              <>
                {
                  <List
                    layout={"horizontal"}
                    gap={0.01}
                    items={searchResults.albums.items.map(
                      (album: Album, idx: number) => (
                        <Card
                          key={idx}
                          content={album}
                          title={album.name}
                          subtitles={`${album.release_date.split("-")[0]} · ${
                            album.artists[0].name
                          }`}
                          imgUrl={album.images[0]?.url}
                          onClickHandler={() => navigate(`/albums/${album.id}`)}
                        />
                      )
                    )}
                  />
                }
              </>
            ) : tab === "artist" && searchResults.artists.items.length > 0 ? (
              <>
                {
                  <List
                    layout={"horizontal"}
                    items={searchResults.artists.items.map(
                      (artist: ArtistDetail, idx: number) => (
                        <Card
                          key={idx}
                          content={artist}
                          title={artist.name}
                          subtitles="Artist"
                          imgUrl={artist.images[0]?.url}
                          roundImg={true}
                          onClickHandler={() => {
                            navigate(`/artists/${artist.id}`);
                          }}
                        />
                      )
                    )}
                  />
                }
              </>
            ) : tab === "playlist" &&
              searchResults.playlists.items.length > 0 ? (
              <>
                {
                  <List
                    layout={"horizontal"}
                    items={searchResults?.playlists?.items
                      .filter((p: Playlist) => p?.name && p?.owner)
                      .map((playlist: Playlist, idx: number) => (
                        <Card
                          key={idx}
                          content={playlist}
                          title={playlist?.name}
                          subtitles={
                            playlist?.owner?.display_name
                              ? `Maker · ${playlist?.owner?.display_name}`
                              : ""
                          }
                          imgUrl={playlist?.images[0]?.url}
                          onClickHandler={() => {
                            navigate(`/playlists/${playlist.id}`);
                          }}
                        />
                      ))}
                  />
                }
              </>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default SearchPage;
