import { Route, Routes } from "react-router-dom";
import { ProPlayersPage } from "components/pages/pro-players-page";
import { PublicPlayersPage } from "components/pages/public-players-page";
import { TurboPlayersPage } from "components/pages/turbo-players-page";
import { OverallPage } from "components/pages/overall-page";
import { ProMatchStats } from "components/pages/pro-match-stats-page";
import { TestPage } from "components/pages/test-page";
import "./styles.scss";
import Default from "./components/pages/_default";

function App() {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Default></Default>}></Route>
        <Route path="/pro" element={<ProPlayersPage></ProPlayersPage>}></Route>
        <Route
          path="/public"
          element={<PublicPlayersPage></PublicPlayersPage>}
        ></Route>
        <Route
          path="/turbo"
          element={<TurboPlayersPage></TurboPlayersPage>}
        ></Route>
        <Route path="/overall" element={<OverallPage></OverallPage>}></Route>
        <Route
          path="/player-stats"
          element={<ProMatchStats></ProMatchStats>}
        ></Route>
        <Route path="/test" element={<TestPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
