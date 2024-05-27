import { Link } from "react-router-dom";

export function NavigationComponent() {
  return (
    <nav>
      <button className="nav_btn">
        <Link to={"/pro"}>PRO PLAYERS</Link>
      </button>
      <button className="nav_btn">
        <Link to={"/public"}>PUBLIC PLAYERS</Link>
      </button>
      <button className="nav_btn">
        <Link to={"/turbo"}>TURBO PLAYERS</Link>
      </button>
      <button className="nav_btn">
        <Link to={"/overall"}>OVERALL</Link>
      </button>
    </nav>
  );
}
