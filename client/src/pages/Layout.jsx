import React from 'react'
import { Outlet } from "react-router-dom"
import { Navbar } from '../components'
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export default function Layout() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
      <div className="min-h-screen">  
        <div className={`gradient-bg-welcome-${theme}`}> 
            <Navbar />
        </div>
          <Outlet />
      </div>
  )
}
