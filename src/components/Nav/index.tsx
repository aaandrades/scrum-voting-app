import { useState } from "react";
import { useSocket } from "../../Context/Index";
import ActiveUsers from "../ActiveUsers";
import Footer from "../Footer";
import Profile from "../Profile";
import "./styles.css";
import Chevron from "../Chevron";

const Nav = () => {
  const { context } = useSocket();
  const [isOpen, setIsOpen] = useState<boolean>(true);
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
      <Chevron open={isOpen} onClick={() => setIsOpen(!isOpen)} />
    </>
  );
};

export default Nav;
