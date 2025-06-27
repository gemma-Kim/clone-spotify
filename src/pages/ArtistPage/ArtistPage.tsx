import "./ArtistPage.style.css";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faShuffle } from "@fortawesome/free-solid-svg-icons";
import Alert from "react-bootstrap/Alert";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import PlayButton from "@features/player/PlayButton/PlayButton";
import { Track } from "@types";
import { useEffect, useState } from "react";
import { useArtistTopTracksQuery } from "@hooks/artist/useArtistTopTracksQuery";
import { useArtistsQuery } from "@hooks";
import TrackItem from "@features/track/TrackItem";
import {
  useCheckIfUserFollowsQuery,
  UsefollowArtistMutation,
  UseUnFollowArtistMutation,
} from "@hooks/user";

const ArtistPage = () => {
  const { id } = useParams();
  const { mutate: followArtist } = UsefollowArtistMutation();
  const { mutate: unfollowArtist } = UseUnFollowArtistMutation();
  const [isFollow, setIsFollow] = useState(false);

  const {
    data: trackData,
    isLoading: isLoading,
    isError: isError,
    error: error,
  } = useArtistTopTracksQuery(id || "");

  const {
    data,
    isLoading: isLoading2,
    isError: isError2,
    error: error2,
  } = useArtistsQuery(id || "");

  const {
    data: followData,
    isLoading: isLoading3,
    isError: isError3,
    error: error3,
  } = useCheckIfUserFollowsQuery("artist", id!);

  useEffect(() => {
    if (followData && Array.isArray(followData)) {
      setIsFollow(followData[0]);
    }
  }, [followData]);

  if (isLoading || isLoading2 || isLoading3) return <LoadingSpinner />;
  if (isError || isError2 || isError3)
    return <Alert variant="danger">{error?.message}</Alert>;

  const [artistData] = data;

  const handleFollow = () => {
    if (isFollow) unfollowArtist(id!);
    else followArtist(id!);
    setIsFollow(!isFollow);
  };

  return (
    <div className="artist-detail-page">
      {/* 아티스트 상세 상단 섹션 */}
      <div
        className="artist-detail-section"
        style={{
          backgroundImage: `url(${data[0].images[0].url})`,
        }}
      >
        <div className="artist-detail-container">
          <div className="artist-detail-info">
            <h1>{artistData.name}</h1>
            <div className="artist-detail-info-detail">
              {trackData && trackData.length} tracks
            </div>
          </div>
        </div>
      </div>

      <div className="artist-detail-content-wrapper">
        {/* 버튼 섹션 */}
        <div className="artist-detail-btn-section">
          <div className="artist-detail-play-btn">
            <PlayButton
              wrapperWidth="4rem"
              wrapperHeight="4rem"
              btnWidth="1.3rem"
              btnHeight="1.3rem"
              content={trackData as Track[]}
              position={"relative"}
              origin={"artist"}
            />
          </div>
          <div className="artist-detail-basic-btn">
            <FontAwesomeIcon icon={faShuffle} />
          </div>
          <div
            className={`artist-detail-basic-btn artist-detial-follow-btn`}
            onClick={handleFollow}
          >
            {isFollow ? "Following" : "Follow"}
          </div>
          <div className="artist-detail-basic-btn">
            <FontAwesomeIcon icon={faEllipsis} />
          </div>
        </div>

        {/* 트랙 리스트 */}
        <div className="track-tabs-container">
          <div className="artist-popular-track-container">
            <h2>Popular Tracks</h2>
            {trackData &&
              trackData.map((track: Track, idx: number) => (
                <TrackItem
                  key={idx}
                  tracks={trackData.slice(idx)}
                  origin={"artist"}
                  showDuration={true}
                  showTrackNumber={true}
                  showAlbumImg={true}
                  index={idx + 1}
                />
              ))}
          </div>
          <div className="related-tracks">
            <div>
              <h3>Recommendations</h3>
              <div></div>
            </div>
            <div>
              <h3>Likes</h3>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
