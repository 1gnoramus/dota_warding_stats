import { useSelector } from "react-redux";
import playerImage from "./assets/gh.jpg";
import { useState } from "react";
import { useGetRecentmatchByIdQuery, useGetmatchByIdQuery, useGetproPlayersQuery } from "../store/api";

export function ProMatchStats() {
  const playerStats = useSelector((state) => state.playerStats);
  let [selectedTopic, setselectedTopic] = useState("stats");
  let {
    data: matchesList,
    isLoading: matchesListisLoading,
    error: matchesListerror,
  } = useGetmatchByIdQuery(playerStats.playerStats.account_id);
  let {
    data: recentmatchesList,
    isLoading: recentmatchesListisLoading,
    error: recentmatchesListerror,
  } = useGetRecentmatchByIdQuery(playerStats.playerStats.account_id);

  // let matchesList = [
  //   {
  //     id: 228337,
  //     duration: "17:25",
  //     result: "LOSE",
  //     wardsPlaced: 5,
  //   },
  //   {
  //     id: 228337,
  //     duration: "17:25",
  //     result: "LOSE",
  //     wardsPlaced: 5,
  //   },
  //   {
  //     id: 228337,
  //     duration: "17:25",
  //     result: "WIN",
  //     wardsPlaced: 5,
  //   },
  //   {
  //     id: 228337,
  //     duration: "17:25",
  //     result: "WIN",
  //     wardsPlaced: 5,
  //   },
  // ];
  let obsLeft = 520;
  let sentryLeft = 220;
  return (
    <div className="playerStatsComponent">
      <div className="player_info">
        <img
          style={{ width: "200px", height: "200px" }}
          src={playerStats.playerStats.avatarfull}
          alt=""
        />
        <div>
          <h1>Player: {playerStats.playerStats.name}</h1>
          <h3>Team: {playerStats.playerStats.team_name}</h3>
          <h3>Position: {playerStats.playerStats.fantasy_role}</h3>
          <h3>Account ID: {playerStats.playerStats.account_id}</h3>
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
            console.log(matchesList);
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
        matchesListisLoading ? (
          <div>Loading</div>
        ) : matchesListerror ? (
          <div>error</div>
        ) : (
          <table>
            <tbody>
              <tr>
                <td>MATCH ID</td>
                <td>DURATION</td>
                <td>RESULT</td>
                <td>WARDS PLACED</td>
              </tr>
              {matchesList.map((match) => {
                return (
                  <tr key={match.match_id}>
                    <td>{match.match_id}</td>
                    <td>{match.duration}</td>
                    <td>
                      {match.radiant_win ? "Radiant Lose" : "Radiant Win"}
                    </td>
                    {/* <td>{match.radiant_win}</td> */}

                    <td>{match.average_rank}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )
      ) : recentmatchesListisLoading ? (
        <div>Loading</div>
      ) : recentmatchesListerror ? (
        <div>error</div>
      ) : (
        <table>
          <tbody>
            <tr>
              <td>MATCH ID</td>
              <td>DURATION</td>
              <td>RESULT</td>
              <td>WARDS PLACED</td>
            </tr>
            {recentmatchesList.map((match) => {
              return (
                <tr key={match.match_id}>
                  <td>{match.match_id}</td>
                  <td>{match.duration}</td>
                  <td>{match.radiant_win ? "Radiant Lose" : "Radiant Win"}</td>

                  {/* <td>{match.radiant_win}</td> */}
                  <td>{match.average_rank}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
