import { useSelector } from "react-redux";
import playerImage from "./assets/gh.jpg";
import { useState } from "react";

export function ProMatchStats() {
  const playerStats = useSelector((state) => state.playerStats);
  let [selectedTopic, setselectedTopic] = useState("stats");

  let matchesList = [
    {
      id: 228337,
      duration: "17:25",
      result: "LOSE",
      wardsPlaced: 5,
    },
    {
      id: 228337,
      duration: "17:25",
      result: "LOSE",
      wardsPlaced: 5,
    },
    {
      id: 228337,
      duration: "17:25",
      result: "WIN",
      wardsPlaced: 5,
    },
    {
      id: 228337,
      duration: "17:25",
      result: "WIN",
      wardsPlaced: 5,
    },
  ];
  let obsLeft = 520;
  let sentryLeft = 220;
  return (
    <div className="playerStatsComponent">
      <div className="player_info">
        <img
          style={{ width: "200px", height: "200px" }}
          src={playerStats.playerStats.img_url}
          alt=""
        />
        <div>
          <h1
            onClick={() => {
              console.log(playerStats.playerStats);
            }}
          >
            Player: {playerStats.playerStats.name}
          </h1>
          <h3>Team: {playerStats.playerStats.team}</h3>
          <h3>Position: {playerStats.playerStats.position}</h3>
          <h3>Matches Played: {playerStats.playerStats.matchesPlayed}</h3>
        </div>
        <div></div>
      </div>
      <div className="playerStats_nav">
        <button
          onClick={() => {
            setselectedTopic("stats");
          }}
        >
          STATS
        </button>
        <button
          onClick={() => {
            setselectedTopic("matches");
          }}
        >
          MATCHES
        </button>
        <button
          onClick={() => {
            setselectedTopic("recent");
          }}
        >
          RECENT
        </button>
      </div>
      {selectedTopic == "stats" ? (
        <>
          <h1>OVERALL STATS</h1>
          <div className="dota_map">
            <div className="obs_ward" style={{ left: `${obsLeft}px` }}></div>
            <div
              className="sentry_ward"
              style={{ left: `${sentryLeft}px` }}
            ></div>
          </div>
        </>
      ) : selectedTopic == "matches" ? (
        <table>
          <h1>MATCHES PLAYED</h1>
          <tbody>
            <tr>
              <td>MATCH ID</td>
              <td>DURATION</td>
              <td>RESULT</td>
              <td>WARDS PLACED</td>
            </tr>
            {matchesList.map((match) => {
              return (
                <tr>
                  <td
                    onClick={() => {
                      dispatch(addPlayer(player));
                      navigate("/player-stats");
                    }}
                  >
                    {match.id}
                  </td>
                  <td>{match.duration}</td>
                  <td>{match.result}</td>
                  <td>{match.wardsPlaced}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <table>
          <h1>RECENT MATCHES PLAYED</h1>
          <tbody>
            <tr>
              <td>MATCH ID</td>
              <td>DURATION</td>
              <td>RESULT</td>
              <td>WARDS PLACED</td>
            </tr>
            {matchesList.map((match) => {
              return (
                <tr>
                  <td
                    onClick={() => {
                      dispatch(addPlayer(player));
                      navigate("/player-stats");
                    }}
                  >
                    {match.id}
                  </td>
                  <td>{match.duration}</td>
                  <td>{match.result}</td>
                  <td>{match.wardsPlaced}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
