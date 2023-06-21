import React, { useState, useContext } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { ThemeContext } from "../context/ThemeContext";
import logo from "../../images/logo.svg";
import Sol from "../../images/Sol.png";
import Luna from "../../images/Luna.png";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isClicked, setIsClicked] = useState(false);

  const handleImageButtonClick = () => {
    setIsClicked(!isClicked);
    toggleTheme();
  };

  return (
    <nav
      className={`w-full flex md:justify-center justify-between items-center p-4`}
    >
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Home", "Publish event", "Support", "Register"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
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
        <button
          className="image-button"
          onClick={handleImageButtonClick}
          style={{ color: isClicked ? "white" : "inherit" }}
        >
          <img src={isClicked ? Sol : Luna} alt="Toggle Button" className="ui-toggle" 
          style={{filter: isClicked ? "invert(1)" : "invert(1)" }}
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
