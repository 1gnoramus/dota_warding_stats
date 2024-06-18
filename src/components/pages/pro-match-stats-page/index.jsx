import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  useGetRecentmatchByIdQuery,
  useGetmatchByIdQuery,
  //   useGetMatchesByPeriodQuery,
} from "src/store/api";
import Default from "../_default";

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
<<<<<<< HEAD:src/ProMatchStats.jsx
=======
  //   let {
  //     data: matchesByPeriodList,
  //     isLoading: matchesByPeriodListisLoading,
  //     error: matchesByPeriodListerror,
  //   } = useGetMatchesByPeriodQuery(playerStats.playerStats.account_id, 7);
  function lol() {
    let matches = [];
>>>>>>> d24c68da13af1fce58fca96bacd0346a684c8f35:src/components/pages/pro-match-stats-page/index.jsx

  const [totalObsLog, setTotalObsLog] = useState([]);
  const [totalSenLog, setTotalSenLog] = useState([]);

  let [period, setPeriod]=useState(7)

  //TESTING ARRAY
  //  const totalObsLog = [{x:130,y:250},{x:230,y:450},{x:430,y:350}]

useEffect(() => {
    //GET ALL MATCHES LAST 7 DAYS THAT SELECTED PLAYER PLAYED
    fetch(
      `https://api.opendota.com/api/players/${playerStats.playerStats.account_id}/matches?&date=${period}`
    )
      .then((res) => res.json())
      .then((data) => {
<<<<<<< HEAD:src/ProMatchStats.jsx
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
=======
        matches = data;

        let matchIDs = matches.map((item) => item.match_id);
        console.log(playerStats.playerStats.account_id);
        matchIDs.map((match_id) => {
          fetch(`https://api.opendota.com/api/matches/${match_id}`)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              let matchData = data;
              console.log(matchData.players);
              let current_player_match_data = matchData.players.find(
                (p) => p.account_id == playerStats.playerStats.account_id
              );
              console.log(current_player_match_data);
            });
        });
        // for (let i = 0; i < matchIDs.length; i++) {

        //   // 3.3 every player item has obs_log prop. information about wards, the time of their placement and position is stored here
        //   //    create a list that contains all the information about each ward in each match. It should look like this:
        //   //    [
        //   //      { "time": 128, "type": "obs_log", "slot": 0, "x": 158.2, "y": 91.8, "z": 132.2, "entityleft": false, "ehandle": 788732, "key": "[158,92]", "player_slot": 0},
        //   //      { "time": 129, "type": "obs_log", "slot": 0, "x": 158.2, "y": 91.8, "z": 132.2, "entityleft": false, "ehandle": 788732, "key": "[158,92]", "player_slot": 0},
        //   //      ...
        //   //    ]
        //   for (let i = 0; i < current_player_match_data.obs_log; i++) {
        //     let item = current_player_match_data.obs_log[i];
        //     total_obs_log.push(item);
        //   }
        //   for (let i = 0; i < current_player_match_data.sen_log; i++) {
        //     let item = current_player_match_data.sen_log[i];
        //     total_sen_log.push(item);
        //   }
        // }
>>>>>>> d24c68da13af1fce58fca96bacd0346a684c8f35:src/components/pages/pro-match-stats-page/index.jsx
      });
  }, [period]);

  return (
<<<<<<< HEAD:src/ProMatchStats.jsx
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
      </div>
      <div className="playerStats_nav">
        <button
          onClick={() => {
            setselectedTopic("stats");
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
            <button onClick={() => setPeriod(7)}>Week</button>
            <button onClick={() => setPeriod(30)}>Month</button>
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
=======
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
>>>>>>> d24c68da13af1fce58fca96bacd0346a684c8f35:src/components/pages/pro-match-stats-page/index.jsx
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
<<<<<<< HEAD:src/ProMatchStats.jsx
              {matchesList.map((match) => (
                <tr key={match.match_id}>
                  <td>{match.match_id}</td>
                  <td>{match.duration}</td>
                  <td>{match.radiant_win ? "Radiant Lose" : "Radiant Win"}</td>
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
=======
              {recentmatchesList.map((match) => {
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
        )}
      </div>
    </Default>
>>>>>>> d24c68da13af1fce58fca96bacd0346a684c8f35:src/components/pages/pro-match-stats-page/index.jsx
  );
}
