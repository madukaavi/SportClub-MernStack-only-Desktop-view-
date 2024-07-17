import React, { useState, useEffect } from "react";
import axios from "axios";
import Sliderbar from '../../../Components/Sliderbar/Sliderbar';
import { FaBell, FaSort } from 'react-icons/fa';
import { orderBy } from "lodash";

const Tournaments = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterLocation, setFilterLocation] = useState("All");
  const [filterLeague, setFilterLeague] = useState("All");
  const [filterTeam, setFilterTeam] = useState("All");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fetch data from API
  useEffect(() => {
    axios.get('http://localhost:9000/api/v1/tournaments/find-all')
      .then(response => {
        const apiData = response.data.data.flatMap(item => 
          item.teams.length > 0 ? item.teams.map(team => ({
            Date: new Date(item.date).toISOString().split('T')[0],
            Location: item.location,
            LeagueName: item.leagueName,
            TeamId: team.teamId,
            TeamScore: team.teamScore,
            PersonalScore: null, // Adjust as per the data structure
            ThreePointers: team.totalThreePoint
          })) : [{
            Date: new Date(item.date).toISOString().split('T')[0],
            Location: item.location,
            LeagueName: item.leagueName,
            TeamId: item._id,
            TeamScore: "N/A",
            PersonalScore: "N/A",
            ThreePointers: "N/A"
          }]
        );
        setData(apiData);
        setSortedData(apiData);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
      filteredData = filteredData.filter(item => item.TeamId === filterTeam);
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
    const sorted = orderBy(sortedData, ["TeamScore"], type === "highest" ? ["desc"] : ["asc"]);
    setSortedData(sorted);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="flex bg-rgba-239-246-255-1">
        <div className="lg:basis-[20%] basis-[20%] md:basis-[44%] h-[100vh] rounded-[20px]">
          <Sliderbar/>
        </div>
        <div className="basis-[90%] lg:h-[100%] lg:m-1 md:m-1 m-1 bg-rgba-239-246-255-1 ">
          <div className="lg:w-full w-[100%] lg:h-[60px] flex bg-rgba-36-40-51-1 lg:mt-1 mt-3 md:mt-2 md:rounded-[16px] rounded-md lg:rounded-[16px] h-[40px] md:h-[60px] items-center justify-between">
            <h1 className="text-white lg:text-md text-[13px] lg:text-lg font-custom text-center lg:ml-0 ml-2 lg:p-4 p-[10px] font-bold">TOURNAMENTS</h1>
            <div className="flex items-center space-x-6 mr-6">
              <FaBell className="text-white text-lg" />
              <img src="src/assets/profilepic.png" alt="Avatar" className="h-[30px] w-[30px] rounded-full bg-white cursor-pointer" /> 
            </div>
          </div>
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
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                          <select
                            id="location"
                            name="location"
                            className="mt-1 block p-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={filterLocation}
                            onChange={(e) => setFilterLocation(e.target.value)}
                          >
                            <option value="All">All</option>
                            {Array.from(new Set(data.map(item => item.Location))).map(location => (
                              <option key={location} value={location}>{location}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="league" className="block text-sm font-medium text-gray-700">League</label>
                          <select
                            id="league"
                            name="league"
                            className="mt-1 block p-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={filterLeague}
                            onChange={(e) => setFilterLeague(e.target.value)}
                          >
                            <option value="All">All</option>
                            {Array.from(new Set(data.map(item => item.LeagueName))).map(league => (
                              <option key={league} value={league}>{league}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="team" className="block text-sm font-medium text-gray-700">Team</label>
                          <select
                            id="team"
                            name="team"
                            className="mt-1 block p-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={filterTeam}
                            onChange={(e) => setFilterTeam(e.target.value)}
                          >
                            <option value="All">All</option>
                            {Array.from(new Set(data.map(item => item.TeamId))).map(team => (
                              <option key={team} value={team}>{team}</option>
                            ))}
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
                          <th onClick={() => handleSort("TeamId")} className="cursor-pointer">Team ID</th>
                          <th onClick={() => handleSort("TeamScore")} className="cursor-pointer">Team Score</th>
                          <th onClick={() => handleSort("PersonalScore")} className="cursor-pointer">Personal Score</th>
                          <th onClick={() => handleSort("ThreePointers")} className="cursor-pointer">Three Pointers</th>
                          <th onClick={() => handleSort("Date")} className="cursor-pointer">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedData.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                            <td className="text-center">{item.Location}</td>
                            <td className="text-center">{item.LeagueName}</td>
                            <td className="text-center">{item.TeamId}</td>
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
    </>
  );
};

export default Tournaments;
