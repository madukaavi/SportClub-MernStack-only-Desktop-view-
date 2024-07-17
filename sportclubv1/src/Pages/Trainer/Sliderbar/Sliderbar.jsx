import React, { useState } from 'react';
import { FaChartBar, FaUser, FaTrophy, FaUsers, FaHistory, FaCalendarAlt } from 'react-icons/fa';
import {  RiProgress6Line } from "react-icons/ri";

const menuItems = [
  { icon: <FaChartBar />, label: 'Dashboard', link: '/TrainerDashboard' },
  { icon: <FaUser />, label: 'Players', link: '/Player_T' },
  { icon: <FaTrophy />, label: 'Tournaments', link: '/Tournaments_T' },
  { icon: <FaUsers />, label: 'Teams', link: '/Teams_Teams' },
  { icon: < RiProgress6Line />, label: 'Player Progress', link: '/PlayerProgress_T' },
  { icon: <FaCalendarAlt />, label: 'Schedule', link: '/Schedule_T' },
];

function Sliderbar  () {
  const [activeItem, setActiveItem] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleItemClick = (label) => {
    setActiveItem(label);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0  left-0 bg-rgba-36-40-51-1 p-4 m-1 rounded-[18px] flex flex-col justify-between ${isSidebarOpen ? '' : 'hidden md:flex'}`}>
        <div>
          <div className="flex items-center justify-center mb-4">
            <img
              src="src/assets/panther.png"
              alt="Avatar"
              className="w-[60px] h-[50px] rounded-full mr-2 cursor-pointer"
              onClick={closeSidebar}
            />
            <h2 className="font-semibold text-[24px] text-white font-custom tracking-widest cursor-pointer" onClick={closeSidebar}>PANTHERS</h2>
          </div>
          <div className="w-full h-[0.8px] bg-white"></div>

          <ul className="list-none items-center text-right mt-5">
            {menuItems.map((item, index) => (
              <li key={index} className={`mb-4 ${item.label === activeItem ? 'bg-white rounded-md' : ''}`}>
                <a
                  href={item.link}
                  className={`flex items-center font-normal justify-start py-3 px-4 text-lg font-custom ${item.label === activeItem ? 'text-rgba-36-40-51-1' : 'text-white'} hover:bg-white hover:rounded-md hover:text-rgba-36-40-51-1`}
                  onClick={() => handleItemClick(item.label)}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <button className="bg-white  text-rgba-36-40-51-1 font-custom hover:bg-slate-300 text-xl font-bold py-1 lg:py-2 rounded" >
          Logout
        </button>
      </aside>

      {/* Toggle Button (Mobile) */}
      {!isSidebarOpen && (
        <div className="md:hidden fixed top-4 left-4 ">
          <button onClick={toggleSidebar} className="bg-rgba-36-40-51-1 p-2 rounded-md fixed">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 9h14a1 1 0 110 2H3a1 1 0 110-2zm0-4h14a1 1 0 110 2H3a1 1 0 110-2zm0 8h14a1 1 0 110 2H3a1 1 0 110-2z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

export default Sliderbar;
