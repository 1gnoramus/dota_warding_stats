import { useDispatch } from "react-redux";
import { addPlayer } from "src/store/reducers";
import { useNavigate } from "react-router-dom";
import Default from "../_default";
import { useEffect, useState } from "react";
import proPlayersData from "src/json-files/proPlayers.json"; // Импортируем JSON-файл

export function ProPlayersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [proPlayersList, setProPlayersList] = useState([]);

  useEffect(() => {
    setProPlayersList(proPlayersData);
  });

  return (
    <Default>
      <div className="proplayers_page">
        {proPlayersList.length === 0 ? (
          <div>Loading</div>
        ) : (
          <table>
            <tbody>
              <tr>
                <td>PLAYER</td>
                <td>TEAM</td>
                <td>MATCHES</td>
              </tr>
              {proPlayersList.map((player, index) => {
                return (
                  <tr key={index}>
                    <td
                      onClick={() => {
                        dispatch(addPlayer(player));
                        navigate("/player-stats");
                      }}
                    >
                      {player.name}
                    </td>
                    <td>{player.team_name}</td>
                    <td>{player.fantasy_role}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </Default>
  );
}
