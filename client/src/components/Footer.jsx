import React from "react";

import logo from "../../images/logo.svg";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
const Footer = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div
      className={`w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer-${theme}`}
    >
      <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
        <div className="flex flex-[0.5] justify-center items-center">
    
        </div>
        <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
          <p className="text-white text-base text-center mx-2 cursor-pointer"></p>
          <p className="text-white text-base text-center mx-2 cursor-pointer"></p>
          <p className="text-white text-base text-center mx-2 cursor-pointer"></p>
          <p className="text-white text-base text-center mx-2 cursor-pointer"></p>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col mt-5">
        <img src={logo} alt="logo" className="w-12" />
        <p className="text-white text-sm text-center">
          Unete en esta nueva tecnologia mas segura que las otras!
        </p>
        <u className="text-white text-center">
          <a href="/reviews" style={{ fontSize: '12px' }} >
            Haz un review!
          </a>
        </u>
        <p className="text-white text-sm text-center font-medium mt-2">
          info@nftickets.com
        </p>
      </div>

      <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

      <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
        <p className="text-white text-left text-xs">@NFTickets</p>
        <p className="text-white text-right text-xs">All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
