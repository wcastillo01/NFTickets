import React, { useState, useContext } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { ThemeContext } from "../context/ThemeContext";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext";

const NavBarItem = ({ title, classprops, path }) => {
  return (
    <Link to={path} className={`mx-4 cursor-pointer ${classprops}`}>
      {title}
    </Link>
  );
};

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isClicked, setIsClicked] = useState(false);
  const { currentAccount } = useContext(TransactionContext);
  const { connectWallet } = useContext(TransactionContext);

  const handleImageButtonClick = () => {
    setIsClicked(!isClicked);
    toggleTheme();
  };

  return (
    <nav
      className={`w-full flex md:justify-center justify-between items-center p-4`}
    >
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <Link to="/">
          <img src={logo} alt="logo" className="w-32 cursor-pointer" />
        </Link>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {[
          { label: "Home", path: "/" },
          { label: "Sobre Nosotros", path: "/services" },
          { label: "FAQ", path: "/faq" },
          { label: "Soporte", path: "/support" },
          { label: "Mis tickets", path: "/owned" },
          { label: "Mi cartera", path: "/wallet" },
        ].map((item, index) => (
          <NavBarItem
            key={item.label + index}
            title={item.label}
            path={item.path}
          />
        ))}
        <Link to="/publish-event">
          <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
            Publicar Evento
          </li>
        </Link>
        {currentAccount ? (
          <img
            src={`https://avatars.dicebear.com/api/bottts/${currentAccount}.svg`}
            alt="Metamask Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={handleImageButtonClick}
          />
        ) : (
          <li
            className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
            onClick={connectWallet}
          >
            Login
          </li>
        )}
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {["Home", "Publish event", "Support", "Register"].map(
              (item, index) => (
                <NavBarItem
                  key={item + index}
                  title={item}
                  classprops="my-2 text-lg"
                />
              )
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
