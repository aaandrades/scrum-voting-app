import { useSocket } from "../../Context/Index";
import ActiveUsers from "../ActiveUsers";
import Footer from "../Footer";
import Profile from "../Profile";
import "./styles.css";
import Chevron from "../Chevron";

interface NavProps {
  isOpen: boolean;
  handleClick: () => void;
}

const Nav = ({ isOpen, handleClick }: NavProps) => {
  const { context } = useSocket();
  const { user } = context;

  return (
    <>
      <nav
        className={`app-container__navbar ${
          isOpen ? "open-navbar" : "close-navbar"
        } `}
      >
        <div className="nav-container">
          <Profile user={user.name} />
          <ActiveUsers users={context.users} />
        </div>
        <Footer />
      </nav>
      <Chevron open={isOpen} onClick={handleClick} />
    </>
  );
};

export default Nav;
