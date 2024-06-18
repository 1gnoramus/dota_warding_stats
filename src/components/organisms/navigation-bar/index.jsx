import { Link } from "react-router-dom";
import classnames from "classnames";
import styles from "./index.module.scss";

export function NavigationBar() {
  return (
    <div>
      <Link className={classnames(styles.navBtn)} to={"/pro"}>
        PRO PLAYERS
      </Link>
      <Link className={classnames(styles.navBtn)} to={"/public"}>
        PUBLIC PLAYERS
      </Link>
      <Link className={classnames(styles.navBtn)} to={"/turbo"}>
        TURBO PLAYERS
      </Link>
      <Link className={classnames(styles.navBtn)} to={"/overall"}>
        OVERALL
      </Link>
      <Link className={classnames(styles.navBtn)} to={"/test"}>
        TEST
      </Link>
    </div>
  );
}
