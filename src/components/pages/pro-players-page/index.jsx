import { useDispatch } from "react-redux";
import { addPlayer } from "src/store/reducers";
import { useNavigate } from "react-router-dom";
import { useGetproPlayersQuery } from "src/store/api";
import Default from "../_default";

export function ProPlayersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //ВЫТАСКИВАЕМ СПИСОК ВСЕХ ПРО ИГРОКОВ
  let {
    data: proPlayersList,
    isLoading: proPlayersListisLoading,
    error: proPlayersListisserror,
  } = useGetproPlayersQuery();

  //ФИЛЬТРАЦИЯ ИГРОКОВ (КАК-ТО НАДО ИХ ПО РОЛЯМ ФИЛЬТРОВАТЬ. FANTASY_ROLE - ЭТО НЕ РОЛЬ Я ТАК ПОНИМАЮ)
  // let suppPlayersList = proPlayersList.filter((player) => {
  //   return player.team_name == "Team Spirit";
  // });

  return (
    <Default>
      <div className="proplayers_page">
        {proPlayersListisLoading ? (
          <div>Loading</div>
        ) : proPlayersListisserror ? (
          <div>error</div>
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
