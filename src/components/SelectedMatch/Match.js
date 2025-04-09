import "./Match.css";
function Match({ isOpen, dados, closeModal, videoData, selectedSport }) {
  if (!isOpen || !dados) return null;
  return (
    <div className="overlay" onClick={closeModal}>
      <div className="modalContainer">
        <button onClick={closeModal}>x</button>
        <div className="container_match">
          <div className="video">
            {videoData.length > 0 ? (
              videoData.map((video) => (
                <iframe
                  key={video.id.videoId}
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.id.videoId}`}
                  title={video.snippet.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ))
            ) : (
              <p>Nenhum vídeo encontrado.</p>
            )}
          </div>
          {/* <div className="estatistica">
           <span> {dados.teams.home.name} </span>
            {selectedSport === "football"
              ? dados.goals?.home
              : dados.teams.home.name}
            -<span> {dados.teams.away.name} </span>
            {selectedSport === "football"
              ? dados.goals?.away
              : dados.teams.away.name}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Match;
