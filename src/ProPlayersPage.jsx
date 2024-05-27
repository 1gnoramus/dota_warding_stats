export function ProPlayersPage() {
  let obsLeft = 520;
  let sentryLeft = 220;
  return (
    <div className="proplayers_page">
      <table>
        <tr>
          <td>PLAYER</td>
          <td>TEAM</td>
          <td>MATCHES</td>
        </tr>
        <tr>
          <td>MIPOSHKA</td>
          <td>TEAM SPIRIT</td>
          <td>17</td>
        </tr>
        <tr>
          <td>MIPOSHKA</td>
          <td>TEAM SPIRIT</td>
          <td>17</td>
        </tr>
        <tr>
          <td>MIPOSHKA</td>
          <td>TEAM SPIRIT</td>
          <td>17</td>
        </tr>
      </table>
      <div className="dota_map">
        <div className="obs_ward" style={{ left: `${obsLeft}px` }}></div>
        <div className="sentry_ward" style={{ left: `${sentryLeft}px` }}></div>
      </div>
    </div>
  );
}
