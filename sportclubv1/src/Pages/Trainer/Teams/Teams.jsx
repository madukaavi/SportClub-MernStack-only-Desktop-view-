import React, { useState } from 'react';
import Sliderbar from '../Sliderbar/Sliderbar';
import { FaBell } from 'react-icons/fa';

function Teams() {
  const [sortBy, setSortBy] = useState(null); // Default sorting by null (no sorting)
  const [teams, setTeams] = useState([
    {
      teamName: 'Lions',
      position: 'Center',
      teamRank: 5,
      score: 80,
      league: 'Wontons',
      basketsIn: '',
      threePointers: '',
      profilePic: 'src/assets/teama.png'
    },
    {
      teamName: 'Tigers',
      position: 'Forward',
      teamRank: 6,
      score: 70,
      league: 'Wontons',
      basketsIn: '',
      threePointers: '',
      profilePic: 'src/assets/team2.png'
    },
    {
      teamName: 'Bears',
      position: 'Guard',
      teamRank: 3,
      score: 90,
      league: 'Wontons',
      basketsIn: '',
      threePointers: '',
      profilePic: 'src/assets/teama.png'
    },
    {
      teamName: 'Panthers',
      position: 'Forward',
      teamRank: 10,
      score: 60,
      league: 'Wontons',
      basketsIn: '',
      threePointers: '',
      profilePic: 'src/assets/team2.png'
    }
  ]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu open/close

  // Function to sort teams based on the selected criteria
  const sortTeams = (criteria) => {
    setSortBy(criteria);
    const sortedTeams = [...teams].sort((a, b) => {
      if (criteria === 'teamRank') {
        return a.teamRank - b.teamRank;
      } else if (criteria === 'score') {
        return b.score - a.score;
      }
    });
    setTeams(sortedTeams);
  };

  // Function to filter teams by score
  const filterTeamsByScore = (type) => {
    if (type === 'highest') {
      const highestScoreTeams = [...teams].sort((a, b) => b.score - a.score);
      setTeams(highestScoreTeams);
    } else if (type === 'lowest') {
      const lowestScoreTeams = [...teams].sort((a, b) => a.score - b.score);
      setTeams(lowestScoreTeams);
    }
    setIsMenuOpen(false); // Close the menu after selecting an option
  };

  return (
    <>
      {/*slider-import-section */}
      <div className="flex bg-rgba-239-246-255-1">
        <div className="lg:basis-[20%] basis-[20%] md:basis-[44%] h-[100vh] rounded-[20px]">
          <Sliderbar/>
        </div>
        {/*main-content-with- top- bar*/}
        <div className="basis-[90%] lg:h-[100%] lg:m-1 md:m-1 m-1 bg-rgba-239-246-255-1 ">
          <div className="lg:w-full w-[100%] lg:h-[60px]  flex bg-rgba-36-40-51-1 lg:mt-1 mt-3 md:mt-2 md:rounded-[16px] rounded-md lg:rounded-[16px] h-[40px] md:h-[60px] items-center justify-between">
            <h1 className="text-white lg:text-md text-[13px] lg:text-lg font-custom text-center lg:ml-0 ml-2 lg:p-4 p-[10px] font-bold ">TEAMS</h1>
            <div className="flex items-center space-x-6 mr-6">
              <FaBell className="text-white text-lg" />
              <img src="src/assets/profilepic.png" alt="Avatar" className="h-[30px] w-[30px] rounded-full bg-white cursor-pointer" /> 
            </div>
          </div>
          {/* Sorting buttons */}
          <div className="flex justify-end mr-4 mt-4">
            <button onClick={() => sortTeams('teamRank')} className="mr-2">Sort by Rank</button>
            <button onClick={() => sortTeams('score')} className="mr-2">Sort by Score</button>
            <div className="relative inline-block text-left">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="options-menu" aria-haspopup="true" aria-expanded="true">
                Sort by Score
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 12l-8-8H1l9 9 9-9h-1l-8 8zm0 5l-8-8H1l9 9 9-9h-1l-8 8z" clipRule="evenodd" />
                </svg>
              </button>
              {/* Dropdown menu, show/hide based on menu state */}
              {isMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu" tabIndex={-1}>
                  <div className="py-1" role="none">
                    <button onClick={() => filterTeamsByScore('highest')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex={-1}>Highest Score</button>
                    <button onClick={() => filterTeamsByScore('lowest')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex={-1}>Lowest Score</button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Main Trainer Team Sections */}
          <div className="w-full h-[50px] mt-2 flex items-center">
            <h1 className='text-[22px] font-custom text-rgba-36-40-51-1 font-bold pl-14'>All Team Details</h1>
          </div>
          {/* Team Section Area */}
          <div className="w-full h-[700px] mt-4 flex items-center justify-start flex-col gap-2">
            <div className="grid grid-cols-4 gap-4">
              {teams.map((team, index) => (
                <div key={index} className="w-[227px] h-full border bg-white shadow-sm ml-4 rounded-md flex flex-col items-center">
                  <div className="w-full h-[155px] p-1 flex items-center justify-center"><img src={team.profilePic} alt="Team Profile" style={{ width: '120px', height: '120px', borderRadius:'5px' }} /></div>
                  <div className="w-full h-[25px] px-10 flex items-center justify-start"><p className="leading-6 text-sm font-custom font-semibold">Team Name: {team.teamName}</p></div>
                  <div className="w-full h-[25px] px-10 flex items-center justify-start"><p className="leading-6 text-sm font-custom font-semibold">Position: {team.position}</p></div>
                  <div className="w-full h-[25px] px-10 flex items-center justify-start"><p className="leading-6 text-sm font-custom font-semibold">Team Rank: {team.teamRank}</p></div>
                  <div className="w-full h-[25px] px-10 flex items-center justify-start"><p className="leading-6 text-sm font-custom font-semibold">Score: {team.score}</p></div>
                  <div className="w-full h-[25px] px-10 flex items-center justify-start"><p className="leading-6 text-sm font-custom font-semibold">League: {team.league}</p></div>
                  <div className="w-full h-[25px] px-10 flex items-center justify-start"><p className="leading-6 text-sm font-custom font-semibold">Baskets In: {team.basketsIn}</p></div>
                  <div className="w-full h-[25px] px-10 flex items-center justify-start"><p className="leading-6 text-sm font-custom font-semibold">Three Pointers: {team.threePointers}</p></div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {teams.map((team, index) => (
                <div key={index} className="w-[227px] h-full border bg-white shadow-sm ml-4 rounded-md flex flex-col items-center">
                  <div className="w-full h-[155px] p-1 flex items-center justify-center"><img src={team.profilePic} alt="Team Profile" style={{ width: '120px', height: '120px', borderRadius:'5px' }} /></div>
                  <div className="w-full h-[25px] px-10 flex items-center justify-start"><p className="leading-6 text-sm font-custom font-semibold">Team Name: {team.teamName}</p></div>
                  <div className="w-full h-[25px] px-10 flex items-center justify-start"><p className="leading-6 text-sm font-custom font-semibold">Position: {team.position}</p></div>
                  <div className="w-full h-[25px] px-10 flex items-center justify-start"><p className="leading-6 text-sm font-custom font-semibold">Team Rank: {team.teamRank}</p></div>
                  <div className="w-full h-[25px] px-10 flex items-center justify-start"><p className="leading-6 text-sm font-custom font-semibold">Score: {team.score}</p></div>
                  <div className="w-full h-[25px] px-10 flex items-center justify-start"><p className="leading-6 text-sm font-custom font-semibold">League: {team.league}</p></div>
                  <div className="w-full h-[25px] px-10 flex items-center justify-start"><p className="leading-6 text-sm font-custom font-semibold">Baskets In: {team.basketsIn}</p></div>
                  <div className="w-full h-[25px] px-10 flex items-center justify-start"><p className="leading-6 text-sm font-custom font-semibold">Three Pointers: {team.threePointers}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Teams;
