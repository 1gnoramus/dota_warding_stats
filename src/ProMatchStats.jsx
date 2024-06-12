import { useSelector } from "react-redux";
import { useState } from "react";
import {
  useGetRecentmatchByIdQuery,
  useGetmatchByIdQuery,
  useGetMatchesByPeriodQuery,
} from "../store/api";

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
  let {
    data: matchesByPeriodList,
    isLoading: matchesByPeriodListisLoading,
    error: matchesByPeriodListerror,
  } = useGetMatchesByPeriodQuery(playerStats.playerStats.account_id, 7);
  function lol() {
    let matches = [];

    fetch("https://api.opendota.com/api/players/1296625/matches?&date=7")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        matches = data;

        let matchIDs = matches.map((item) => item.match_id);
        console.log(playerStats.playerStats.account_id)
        matchIDs.map((match_id)=>{
          fetch(`https://api.opendota.com/api/matches/${match_id}`).then((res)=>{
            return res.json()
          }).then((data)=>{
            let matchData = data
            console.log(matchData.players)
            let current_player_match_data = matchData.players.find(
              (p) => p.account_id == playerStats.playerStats.account_id
            );
            console.log(current_player_match_data)
          })
        })
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
      });

    let matchIDs = matches.map((item) => item.match_id);
    console.log(matchIDs);
  }

  const onPeriodChangedCb = (period) => {
    // 1. fetch matches by period. It can be done using:
    //    https://api.opendota.com/api/players/1296625/matches?&date={period}
    //    For example: https://api.opendota.com/api/players/1296625/matches?&date=7 (get all maches for past 7 days)
    fetch("https://api.opendota.com/api/players/1296625/matches?&date=7").then(
      (req, res) => {}
    );
    const matches = [];

    // 2. create a list of match IDs for this period
    const matchIDs = matches.map((item) => item.match_id);

    const total_obs_log = [];
    const total_sen_log = [];

    // 3. get wards data
    for (let i = 0; i < matchIDs.length; i++) {
      // 3.1 for every match ID, retrieve it's data from
      //    https://api.opendota.com/api/matches/{match_id}
      let matchData = {};
      // 3.2 every match item (matchData) has players prop:
      // {
      //   "version": 21,
      //   "match_id": 7764358501,
      //   "draft_timings": [],
      //   "players": [
      //     {
      //       "player_slot": 0,
      //       "obs_placed": 12,
      //       "sen_placed": 20,
      //       ...
      //       "account_id": 123
      //     }
      //   ]
      //   ...
      // }
      //  retrieve player item from matchData.players using selected account_id
      let current_player_match_data = matchData.players.map(
        (p) => p.account_id == "account_id"
      );
      // 3.3 every player item has obs_log prop. information about wards, the time of their placement and position is stored here
      //    create a list that contains all the information about each ward in each match. It should look like this:
      //    [
      //      { "time": 128, "type": "obs_log", "slot": 0, "x": 158.2, "y": 91.8, "z": 132.2, "entityleft": false, "ehandle": 788732, "key": "[158,92]", "player_slot": 0},
      //      { "time": 129, "type": "obs_log", "slot": 0, "x": 158.2, "y": 91.8, "z": 132.2, "entityleft": false, "ehandle": 788732, "key": "[158,92]", "player_slot": 0},
      //      ...
      //    ]
      for (let i = 0; i < current_player_match_data.obs_log; i++) {
        let item = current_player_match_data.obs_log[i];
        total_obs_log.push(item);
      }
      for (let i = 0; i < current_player_match_data.sen_log; i++) {
        let item = current_player_match_data.sen_log[i];
        total_sen_log.push(item);
      }
    }

    // 4. invoke the dispayHeatMap(wardsData) method
    dispayHeatMap(total_obs_log, total_sen_log);
  };

  const dispayHeatMap = (obs, sen) => {
    // TODO: Implement this
  };

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
