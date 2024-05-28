import { useState } from "react";
import { NavigationComponent } from "./NavigationComponent";
import { Route, Routes } from "react-router-dom";
import "./styles.scss";
import { ProPlayersPage } from "./ProPlayersPage";
import { PublicPlayersPage } from "./PublicPlayersPage";
import { TurboPlayersPage } from "./TurboPlayersPage";
import { OverallPage } from "./OverallPage";
import { ProMatchStats } from "./ProMatchStats";

function App() {
  return (
    <>
      <NavigationComponent></NavigationComponent>
      <div className="main">
        <Routes>
          <Route
            path="/pro"
            element={<ProPlayersPage></ProPlayersPage>}
          ></Route>
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
        </Routes>
      </div>
    </>
  );
}

export default App;
