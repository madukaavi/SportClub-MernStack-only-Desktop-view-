import React, { useState } from "react";
import Sliderbar from '../../Trainer/Sliderbar/Sliderbar';
import { FaBell, FaSort } from 'react-icons/fa';
import { orderBy } from "lodash";

const data = [
  {
    Date: "2024-05-01",
    Location: "New York",
    LeagueName: "NBA",
    TeamName: "Team A",
    TeamScore: 98,
    PersonalScore: 30,
    ThreePointers: 5,
    Players: ["Player 1", "Player 2", "Player 3"]
  },
  {
    Date: "2024-05-02",
    Location: "Los Angeles",
    LeagueName: "NBA",
    TeamName: "Team B",
    TeamScore: 105,
    PersonalScore: 25,
    ThreePointers: 3,
    Players: ["Player 4", "Player 5", "Player 6"]
  },
  {
    Date: "2024-03-02",
    Location: "Los Angeles",
    LeagueName: "NBA",
    TeamName: "Team B",
    TeamScore: 105,
    PersonalScore: 24,
    ThreePointers: 3,
    Players: ["Player 4", "Player 5", "Player 6"]
  },
  {
    Date: "2024-05-02",
    Location: "Los Angeles",
    LeagueName: "NBA",
    TeamName: "Team B",
    TeamScore: 105,
    PersonalScore: 25,
    ThreePointers: 8,
    Players: ["Player 4", "Player 5", "Player 6"]
  }
  // Add more data as needed
];

const Tournaments = () => {
  const [sortedData, setSortedData] = useState(data);
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterLocation, setFilterLocation] = useState("All");
  const [filterLeague, setFilterLeague] = useState("All");
  const [filterTeam, setFilterTeam] = useState("All");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu open/close
  const [selectedTeam, setSelectedTeam] = useState(null); // State to track selected team for modal

  const handleSort = (field) => {
    const order = sortOrder === "desc" ? "asc" : "desc";
    const sorted = orderBy(sortedData, [field], [order]);
    setSortedData(sorted);
    setSortOrder(order);
  };

  const handleFilter = () => {
    let filteredData = data;
    if (filterLocation !== "All") {
      filteredData = filteredData.filter(item => item.Location === filterLocation);
    }
    if (filterLeague !== "All") {
      filteredData = filteredData.filter(item => item.LeagueName === filterLeague);
    }
    if (filterTeam !== "All") {
      filteredData = filteredData.filter(item => item.TeamName === filterTeam);
    }
    setSortedData(filteredData);
  };

  const resetFilters = () => {
    setFilterLocation("All");
    setFilterLeague("All");
    setFilterTeam("All");
    setSortedData(data);
  };

  const handleSortByScore = (type) => {
    const sorted = orderBy(sortedData, ["PersonalScore"], type === "highest" ? ["desc"] : ["asc"]);
    setSortedData(sorted);
    setIsMenuOpen(false); // Close the menu after sorting
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu open/close
  };

  const openTeamDetailsModal = (team) => {
    setSelectedTeam(team);
  };

  const closeModal = () => {
    setSelectedTeam(null);
  };

  return (
    <>
      <div className="flex bg-rgba-239-246-255-1">
        <div className="lg:basis-[20%] basis-[20%] md:basis-[44%] h-[100vh] rounded-[20px]">
          <Sliderbar />
        </div>
        <div className="basis-[90%] lg:h-[100%] lg:m-1 md:m-1 m-1 bg-rgba-239-246-255-1">
          <div className="w-[1080px] h-[400px] mt-12 flex items-center justify-start gap-10">
            <div className="w-[1080px] h-full bg-white shadow-sm rounded-md flex flex-col items-center">
              <div className="w-full h-[50px] flex items-center gap-5">
                <h1 className='text-[22px] font-custom text-rgba-36-40-51-1 font-bold pl-2'>All Tournament Details</h1>
              </div>
              <div className="w-full px-8 mt-4 h-[300px]">
                <div className="w-full h-[300px]">
                  <div className="p-4">
                    <div className="flex justify-between mb-4 items-center">
                      <div className="flex space-x-4">
                        <div className="mr-4">
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location
                          </label>
                          <select
                            id="location"
                            name="location"
                            className="mt-1 block p-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={filterLocation}
                            onChange={(e) => setFilterLocation(e.target.value)}
                          >
                            <option value="All">All</option>
                            <option value="New York">New York</option>
                            <option value="Los Angeles">Los Angeles</option>
                            {/* Add more locations as needed */}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="league" className="block text-sm font-medium text-gray-700">
                            League
                          </label>
                          <select
                            id="league"
                            name="league"
                            className="mt-1 block p-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={filterLeague}
                            onChange={(e) => setFilterLeague(e.target.value)}
                          >
                            <option value="All">All</option>
                            <option value="NBA">NBA</option>
                            {/* Add more leagues as needed */}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="team" className="block text-sm font-medium text-gray-700">
                            Team
                          </label>
                          <select
                            id="team"
                            name="team"
                            className="mt-1 block p-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={filterTeam}
                            onChange={(e) => setFilterTeam(e.target.value)}
                          >
                            <option value="All">All</option>
                            <option value="Team A">Team A</option>
                            <option value="Team B">Team B</option>
                            {/* Add more team options as needed */}
                          </select>
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={handleFilter}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                          Apply Filters
                        </button>
                        <button
                          onClick={resetFilters}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                        >
                          Reset Filters
                        </button>
                        <div className="relative inline-block text-left">
                          <button
                            type="button"
                            onClick={toggleMenu}
                            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                            id="options-menu"
                            aria-haspopup="true"
                            aria-expanded={isMenuOpen ? "true" : "false"}
                          >
                            Sort by Score
                            <FaSort className="-mr-1 ml-2 h-5 w-5" />
                          </button>
                          {isMenuOpen && (
                            <div
                              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="options-menu"
                            >
                              <div className="py-1" role="none">
                                <button
                                  onClick={() => handleSortByScore("highest")}
                                  className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                                  role="menuitem"
                                >
                                  Highest Score
                                </button>
                                <button
                                  onClick={() => handleSortByScore("lowest")}
                                  className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                                  role="menuitem"
                                >
                                  Lowest Score
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <table className="table-auto w-full">
                      <thead>
                        <tr>
                          <th onClick={() => handleSort("Location")} className="cursor-pointer">Location</th>
                          <th onClick={() => handleSort("LeagueName")} className="cursor-pointer">League Name</th>
                          <th onClick={() => handleSort("TeamName")} className="cursor-pointer">Team Name</th>
                          <th onClick={() => handleSort("TeamScore")} className="cursor-pointer">Team Score</th>
                          <th onClick={() => handleSort("PersonalScore")} className="cursor-pointer">Personal Score</th>
                          <th onClick={() => handleSort("ThreePointers")} className="cursor-pointer">Three Pointers</th>
                          <th onClick={() => handleSort("Date")} className="cursor-pointer">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedData.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-gray-100 cursor-pointer' : 'cursor-pointer'} onClick={() => openTeamDetailsModal(item)}>
                            <td className="text-center">{item.Location}</td>
                            <td className="text-center">{item.LeagueName}</td>
                            <td className="text-center">{item.TeamName}</td>
                            <td className="text-center">{item.TeamScore}</td>
                            <td className="text-center">{item.PersonalScore}</td>
                            <td className="text-center">{item.ThreePointers}</td>
                            <td className="text-center">{item.Date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for displaying team details */}
      {selectedTeam && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Team Details</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Team Name: {selectedTeam.TeamName}<br />
                        Team Score: {selectedTeam.TeamScore}<br />
                        Personal Score: {selectedTeam.PersonalScore}<br />
                        Three Pointers: {selectedTeam.ThreePointers}
                      </p>
                      <p className="text-sm font-medium text-gray-900 mt-4">Players:</p>
                      <ul className="text-sm text-gray-500">
                        {selectedTeam.Players.map((player, index) => (
                          <li key={index}>{player}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={closeModal} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tournaments;
