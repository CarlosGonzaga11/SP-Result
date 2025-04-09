import "./Card.css";
import { formatTimestamp } from "../utils";

function Card({
  home,
  away,
  golsHome,
  golsAway,
  flagHome,
  flagAway,
  status,
  videoData,
  timeStamp,
  golsFootHome,
  golsFootAway,
  selectedSport,
  league,
  image,
  openModal,
}) {
  const cardClass = `card ${selectedSport}`;

  const handleClick = () => {
    openModal({
      home,
      away,
      golsHome,
      golsAway,
      flagHome,
      flagAway,
      status,
      videoData,
    });
  };

  return (
    <div className={cardClass} onClick={handleClick}>
      <div className="info-header">
        <span className="status">{league}</span>
        <p className="timestamp">{formatTimestamp(timeStamp)}</p>
      </div>
      <div className="team-container">
        <div className="team flex">
          <img width="25px" height="25px" src={flagHome} alt="logo time" />
          <span className="teamName">{home}</span>
          <span className="teamGol">
            {selectedSport === "football" ? golsFootHome : golsHome}
          </span>
        </div>
        <div className="versus">-</div>
        <div className="team flex">
          <img
            width="25px"
            height="25px"
            src={flagAway}
            alt="logo adversario"
          />
          <span className="teamName">{away}</span>
          <span className="teamGol">
            {selectedSport === "football" ? golsFootAway : golsAway}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
