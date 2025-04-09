import { useState, useEffect } from "react";
import "./Hero.css";
import Card from "../Cards/Card";
import CustomButton from "../CustomButton/CustomButton";
import Live from "../LiveEnd/Live";
import Match from "../SelectedMatch/Match";
import Header from "../Header/Header";

import Football from "../../img/futebol.png";
import BasketImage from "../../img/basket.png";
import VoleiImage from "../../img/voleiball.png";
import HandballImage from "../../img/handball.png";
import Baseball from "../../img/beiseball.png";
import Loader from "../loader/Loader";
function Hero() {
  const [selectedSport, setSelectedSport] = useState("volleyball");
  const [matches, setMatches] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dadosModal, setDadosModal] = useState(null);
  const [videoData, setVideoData] = useState([]);
  const [filter, setFilter] = useState("live");
  const [filterInput, setFilterInput] = useState("");
  const [showFilter, setShowFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchMatches() {
      const apiKeySport = process.env.REACT_APP_API_KEY_SPORTS;
      if (!selectedSport) return;
      try {
        setLoading(true);
        const baseUrl =
          selectedSport === "football"
            ? `https://v3.football.api-sports.io/fixtures`
            : `https://v1.${selectedSport}.api-sports.io/games`;

        const response = await fetch(`${baseUrl}?date=${dataFormatada}`, {
          headers: {
            "x-apisports-key": apiKeySport,
          },
        });
        const data = await response.json();

        setMatches(data.response);
        setFilter("");

        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {}
    }

    fetchMatches();
  }, [selectedSport]);

  function pegarDataAtual() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
  }

  async function fetchYouTubeVideos(searchQuery) {
    const apiKey = process.env.REACT_APP_API_KEY_YTB;
    const maxResults = 1;

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          searchQuery
        )}&type=video&maxResults=${maxResults}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        setVideoData(data.items);
      } else {
        setVideoData([]);
      }
    } catch (error) {
      setVideoData([]);
    }
  }

  function getStatus(game) {
    return selectedSport === "football"
      ? game.fixture?.status?.long
      : game.status?.long;
  }

  const filteredGames = matches.filter((game) => {
    const status = getStatus(game);

    if (filter === "Not Started") return status === "Not Started";
    if (filter === "Finished") return status === "Finished";
    if (filter === "Premier League")
      return game.league?.name === "Premier League";
    if (filter === "Second Half") return status === "Second Half";
    if (filter === "live")
      return (
        status !== "Not Started" &&
        status !== "Finished" &&
        status !== "Game Finished"
      );

    return true;
  });

  const dataFormatada = pegarDataAtual();
  async function openModal(match) {
    setDadosModal(match);
    await fetchYouTubeVideos(
      `${match.teams.home.name} vs ${match.teams.away.name}  highlights`
    );
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);

    setVideoData([]);
  }

  const sports = [
    "Football",
    "Handball",
    "Basketball",
    "Volleyball",
    "Baseball",
    "Hockey",
  ];
  useEffect(() => {}, [videoData]);

  const sportImages = {
    basketball: BasketImage,
    volleyball: VoleiImage,
    handball: HandballImage,
    baseball: Baseball,
    football: Football,
  };

  function ShippingName(e) {
    const ship = e.target.value;
    setFilterInput(ship);
    const filtredArray = matches.filter(
      (match) =>
        match.teams.away.name.toLowerCase().includes(ship) ||
        match.teams.home.name.toLowerCase().includes(ship) ||
        match.league.name.toLowerCase().includes(ship)
    );
    setShowFilter([...filtredArray]);
  }

  useEffect(() => {
  }, [filterInput]);

  function SelectedSport(sport) {
    setSelectedSport(sport.toLowerCase());
    setShowFilter("");
    setFilterInput("");
  }

  return (
    <div className="width_container">
      <Header filterInput={filterInput} ShippingName={ShippingName} />
      <div className="hero">
        <div className="live_end">
          <Live onClick={() => setFilter("live")} onGoing="Live" />
          <Live onClick={() => setFilter("Finished")} onGoing="Finished" />
          <Live
            onClick={() => setFilter("Not Started")}
            onGoing="Not Started"
          />
        </div>
        <div className="sportsName">
          {sports.map((sport) => (
            <span key={sport} onClick={() => SelectedSport(sport)}>
              {sport.toLowerCase()}
            </span>
          ))}
        </div>
        <div className="line"></div>
        {loading ? (
          <Loader />
        ) : (
          <div className="placar">
            <div>
              {showFilter.length > 0 ? (
                <div className="container_card">
                  {showFilter.map((match) => {
                    return (
                      <Card
                        openModal={() => openModal(match)}
                        closeModal={closeModal}
                        isOpen={isOpen}
                        key={match.id}
                        league={match.league.name}
                        tempo={match.time}
                        timeStamp={
                          selectedSport === "football"
                            ? match.fixture?.timestamp
                            : match.timestamp
                        }
                        home={match.teams.home.name}
                        away={match.teams.away.name}
                        flagHome={match.teams.home.logo}
                        flagAway={match.teams.away.logo}
                        selectedSport={selectedSport}
                        golsFootHome={
                          selectedSport === "football"
                            ? match.goals?.home ?? 0
                            : match.teams.home.name
                        }
                        golsFootAway={
                          selectedSport === "football"
                            ? match.goals?.away ?? 0
                            : match.teams.away.name
                        }
                        golsHome={
                          typeof match.scores?.home === "object"
                            ? match.scores?.home?.total ?? 0
                            : match.scores?.home ?? 0
                        }
                        golsAway={
                          typeof match.scores?.away === "object"
                            ? match.scores?.away?.total ?? 0
                            : match.scores?.away ?? 0
                        }
                        image={sportImages[selectedSport.toLowerCase()]}
                        esporte={selectedSport}
                        videoData={videoData}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="container_card">
                  {" "}
                  {filteredGames.length > 0 ? (
                    filteredGames.map((match) => {
                      if (match.status === "Not Started") return null;
                      return (
                        <Card
                          openModal={() => openModal(match)}
                          closeModal={closeModal}
                          isOpen={isOpen}
                          key={match.id}
                          tempo={match.time}
                          timeStamp={
                            selectedSport === "football"
                              ? match.fixture?.timestamp
                              : match.timestamp
                          }
                          home={match.teams.home.name}
                          away={match.teams.away.name}
                          flagHome={match.teams.home.logo}
                          flagAway={match.teams.away.logo}
                          selectedSport={selectedSport}
                          golsFootHome={
                            selectedSport === "football"
                              ? match.goals?.home ?? 0
                              : match.teams.home.name
                          }
                          golsFootAway={
                            selectedSport === "football"
                              ? match.goals?.away ?? 0
                              : match.teams.away.name
                          }
                          golsHome={
                            typeof match.scores?.home === "object"
                              ? match.scores?.home?.total ?? 0
                              : match.scores?.home ?? 0
                          }
                          golsAway={
                            typeof match.scores?.away === "object"
                              ? match.scores?.away?.total ?? 0
                              : match.scores?.away ?? 0
                          }
                          image={sportImages[selectedSport.toLowerCase()]}
                          esporte={selectedSport}
                          videoData={videoData}
                          league={match.league.name}
                        />
                      );
                    })
                  ) : (
                    <p>Nenhuma partida ao vivo no momento.</p>
                  )}
                </div>
              )}

              <Match
                isOpen={isOpen}
                dados={dadosModal}
                videoData={videoData}
                closeModal={closeModal}
                selectedSport={selectedSport}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Hero;
