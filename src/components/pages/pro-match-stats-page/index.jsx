import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  useGetRecentmatchByIdQuery,
  useGetmatchByIdQuery,
  //   useGetMatchesByPeriodQuery,
} from "src/store/api";
import Default from "../_default";
import { saveAs } from "file-saver";

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

  const [totalObsLog, setTotalObsLog] = useState([]);
  const [totalSenLog, setTotalSenLog] = useState([]);

  //TESTING ARRAY
  //  const totalObsLog = [{x:130,y:250},{x:230,y:450},{x:430,y:350}]

  useEffect(() => {
    //GET ALL MATCHES LAST 7 DAYS THAT SELECTED PLAYER PLAYED
    fetch(
      `https://api.opendota.com/api/players/${playerStats.playerStats.account_id}/matches?&date=7`
    )
      .then((res) => res.json())
      .then((data) => {
        const blob = new Blob([JSON.stringify(data)], {
          type: "application/json",
        });
        saveAs(blob, "matches.json");
        //GET ONLY MATCH'S IDs
        let matchIDs = data.map((item) => item.match_id);
        return Promise.all(
          matchIDs.map((match_id) =>
            fetch(`https://api.opendota.com/api/matches/${match_id}`).then(
              (res) => res.json()
            )
          )
        );
      })
      .then((matchesData) => {
        const newTotalObsLog = [];
        const newTotalSenLog = [];
        matchesData.forEach((data) => {
          //GET MATCH INFO OF THE SELECTED PLAYER ONLY
          let current_player_match_data = data.players.find(
            (p) => p.account_id == playerStats.playerStats.account_id
          );
          //PUSH OBS INFO OF SELECTED PLAYER IN ARRAY
          current_player_match_data.obs_log.map((i) => {
            newTotalObsLog.push(i);
          });
          //PUSH SENTRY INFO OF SELECTED PLAYER IN ARRAY
          current_player_match_data.sen_log.map((i) => {
            newTotalSenLog.push(i);
          });
        });
        setTotalObsLog(newTotalObsLog);
        setTotalSenLog(newTotalSenLog);
      });
  }, [playerStats.playerStats.account_id]);

  return (
    <Default>
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
              lol();
            }}
          >
            WARDING HEATMAP
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
            <h1>WARDING HEATMAP</h1>
            <h3>Period:</h3>
            <div>
              <button onClick={() => onPeriodChangedCb(7)}>Week</button>
              <button onClick={() => onPeriodChangedCb(30)}>Month</button>
            </div>
            <div className="dota_map">
              {totalObsLog.map((obs_info, index) => (
                <div
                  key={index}
                  className="obs_ward"
                  style={{ left: `${obs_info.x}px`, top: `${obs_info.y}px` }}
                ></div>
              ))}
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
                {matchesList.map((match) => (
                  <tr key={match.match_id}>
                    <td>{match.match_id}</td>
                    <td>{match.duration}</td>
                    <td>
                      {match.radiant_win ? "Radiant Lose" : "Radiant Win"}
                    </td>
                    <td>{match.average_rank}</td>
                  </tr>
                ))}
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
              {recentmatchesList.map((match) => (
                <tr key={match.match_id}>
                  <td>{match.match_id}</td>
                  <td>{match.duration}</td>
                  <td>{match.radiant_win ? "Radiant Lose" : "Radiant Win"}</td>
                  <td>{match.average_rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Default>
  );
}
