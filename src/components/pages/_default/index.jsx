import PropTypes from "prop-types";
import { NavigationBar } from "components/organisms/navigation-bar";

export default function Default(props) {
  const { children } = props;

  return (
    <>
      <NavigationBar />
      <div>{children}</div>
    </>
  );
}

Default.propTypes = {
  children: PropTypes.node,
};
