import "./AlbumPage.style.css";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faShuffle,
  faCheck,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import Alert from "react-bootstrap/Alert";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import { useTrackQuery } from "../../hooks/track/useTrackQuery";
import { useAlbumQuery } from "src/hooks/album/useAlbumQuery";
import TrackList from "@features/track/TrackList";
import PlayButton from "@features/player/PlayButton/PlayButton";
import Color from "color-thief-react";
import { Album, Track } from "@types";
import { useState } from "react";

const AlbumPage = () => {
  const { id } = useParams();
  const {
    data: albumData,
    isLoading,
    isError,
    error,
  } = useAlbumQuery(id ?? "");

  const [isActive, setIsActive] = useState(false);

  const trackIds =
    albumData?.tracks?.items?.map((track: Track) => track.id) || [];
  const { data: trackData } = useTrackQuery(trackIds);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Alert variant="danger">{error.message}</Alert>;

  return (
    <Color src={albumData.images[0].url} format="hex" crossOrigin="anonymous">
      {({ data, loading, error: colorError }) => (
        <div
          className="album-page"
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
          <div className="album-section album-fade-mask ">
            <div className="album-container">
              <img
                src={albumData.images[1]?.url || albumData.images[0]?.url}
                alt="Album cover"
              />
              <div className="album-info">
                <h3>Album</h3>
                <h1>{albumData.name}</h1>
                <div className="album-info">
                  {`${albumData.artists[0].name} · ${new Date(
                    albumData.release_date
                  ).getFullYear()} · ${albumData.tracks.items.length} tracks`}
                </div>
              </div>
            </div>
          </div>

          <div className="album-content-wrapper">
            {/* 버튼 섹션 */}
            <div className="album-btn-section">
              <div className="album-play-btn">
                <PlayButton
                  wrapperWidth="4rem"
                  wrapperHeight="4rem"
                  btnWidth="1.3rem"
                  btnHeight="1.3rem"
                  content={albumData as Album}
                  position={"relative"}
                  origin={"album"}
                />
              </div>
              <div className="album-basic-btn">
                <FontAwesomeIcon icon={faShuffle} />
              </div>
              <div
                className={`album-basic-btn ${isActive ? "active" : ""}`}
                onClick={() => setIsActive(!isActive)}
              >
                <FontAwesomeIcon icon={isActive ? faCheck : faPlusCircle} />
              </div>
              <div className="album-basic-btn">
                <FontAwesomeIcon icon={faEllipsis} />
              </div>
            </div>

            {/* 트랙 리스트 */}
            <div className="album-track-container">
              {trackData?.length > 0 && (
                <TrackList
                  tracks={trackData}
                  showTrackNumber={true}
                  showAlbumHeader={false}
                  showAlbumImg={false}
                  origin={"album"}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </Color>
  );
};

export default AlbumPage;
