import { useDispatch, useSelector } from "react-redux";
import { addPlayer, playerStatsSlice } from "../store/reducers";
import { useNavigate } from "react-router-dom";

export function ProPlayersPage() {
  const dispatch = useDispatch();
  const playerStats = useSelector((state) => state.playerStats);
  const navigate = useNavigate();

  let playersList = [
    {
      name: "MIPOSHKA",
      matchesPlayed: 17,
      team: "TEAM SPIRIT",
      position: 5,
      img_url: "./src/assets/miposhka.jpg",
    },
    {
      name: "MIRA",
      matchesPlayed: 223,
      team: "TEAM SPIRIT",
      position: 4,
      img_url: "./src/assets/mira.jpg",
    },
    {
      name: "Gh",
      matchesPlayed: 12,
      team: "NIGMA GALAXY",
      position: 4,
      img_url: "./src/assets/gh.jpg",
    },
    {
      name: "TORONTOTOKYO",
      matchesPlayed: 107,
      team: "BET BOOM",
      position: 5,
      img_url: "./src/assets/toronto.jpg",
    },
  ];


  return (
    <div className="proplayers_page">
      <table>
        <tbody>
          <tr>
            <td>PLAYER</td>
            <td>TEAM</td>
            <td>MATCHES</td>
          </tr>
          {playersList.map((player) => {
            return (
              <tr>
                <td
                  onClick={() => {
                    dispatch(addPlayer(player));
                    navigate("/player-stats");
                  }}
                >
                  {player.name}
                </td>
                <td>{player.team}</td>
                <td>{player.matchesPlayed}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    
    </div>
  );
}
