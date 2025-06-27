import "./PlaylistPage.style.css";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faShuffle,
  faCheck,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import Alert from "react-bootstrap/Alert";
import TrackList from "@features/track/TrackList";
import PlayButton from "@features/player/PlayButton/PlayButton";
import Color from "color-thief-react";
import { Track } from "@types";
import { useEffect, useState } from "react";
import LoadingSpinner from "@common/LoadingSpinner/LoadingSpinner";
import { useFindPlaylistQuery } from "@hooks/playlist";
import { useCheckIfUserFollowsQuery } from "@hooks/user/query/useCheckIfUserFollowsQuery";
import { UseUnFollowPlaylistMutation } from "@hooks/user/mutation/useUnFollowPlaylistMutation";
import { UseFollowPlaylistMutation } from "@hooks/user/mutation/useFollowPlaylistMutation";

const PlaylistPage = () => {
  const { id } = useParams();
  const { mutate: followPlaylist } = UseFollowPlaylistMutation();
  const { mutate: unfollowPlaylist } = UseUnFollowPlaylistMutation();
  const {
    data: playlist,
    isLoading,
    isError,
    error,
  } = useFindPlaylistQuery(id ?? "");

  const {
    data: followData,
    isLoading: isLoading2,
    isError: isError2,
    error: error2,
  } = useCheckIfUserFollowsQuery("playlist", id ?? "");

  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    if (followData && Array.isArray(followData)) {
      setIsFollow(followData[0]);
    }
  }, [followData]);

  if (isLoading || isLoading2) return <LoadingSpinner />;
  if (isError || isError2)
    return <Alert variant="danger">{error?.message || error2?.message}</Alert>;

  const trackData = playlist?.tracks?.items.map((i: any) => i.track);
  const handleFollow = () => {
    if (isFollow) unfollowPlaylist(id!);
    else followPlaylist(id!);
    setIsFollow(!isFollow);
  };
  return (
    <Color
      src={playlist.images[0]?.url || playlist.images[1]?.url}
      format="hex"
      crossOrigin="anonymous"
    >
      {({ data, loading, error: colorError }) => (
        <div
          className="playlist-page"
          style={{
            backgroundImage: `linear-gradient(to bottom,
            ${data} 0%, #000 100%)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            color: "white",
          }}
        >
          {/* 앨범 상세 상단 섹션 */}
          <div className="playlist-section playlist-fade-mask ">
            <div className="playlist-container">
              <img
                src={playlist.images[0]?.url || playlist.images[1]?.url}
                alt="Album cover"
              />
              <div className="playlist-info">
                <h3>Album</h3>
                <h1>{playlist?.name}</h1>
                <div className="playlist-info">
                  {`${playlist?.name} · ${new Date(
                    playlist?.release_date
                  ).getFullYear()} · ${playlist?.tracks?.items?.length} tracks`}
                </div>
              </div>
            </div>
          </div>

          <div className="playlist-content-wrapper">
            {/* 버튼 섹션 */}
            <div className="playlist-btn-section">
              <div className="playlist-play-btn">
                <PlayButton
                  wrapperWidth="4rem"
                  wrapperHeight="4rem"
                  btnWidth="1.3rem"
                  btnHeight="1.3rem"
                  content={trackData as Track[]}
                  position={"relative"}
                  origin={"playlist"}
                />
              </div>
              <div className="playlist-basic-btn">
                <FontAwesomeIcon icon={faShuffle} />
              </div>
              <div
                className={`playlist-basic-btn ${isFollow ? "active" : ""}`}
                onClick={handleFollow}
              >
                <FontAwesomeIcon icon={isFollow ? faCheck : faPlusCircle} />
              </div>
              <div className="playlist-basic-btn">
                <FontAwesomeIcon icon={faEllipsis} />
              </div>
            </div>

            {/* 트랙 리스트 */}
            <div className="playlist-track-container">
              {trackData.length > 0 && (
                <TrackList
                  tracks={trackData}
                  showTrackNumber={true}
                  origin={"playlist"}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </Color>
  );
};

export default PlaylistPage;
