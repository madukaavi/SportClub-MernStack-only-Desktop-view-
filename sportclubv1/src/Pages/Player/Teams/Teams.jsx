import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sliderbar from '../../../Components/Sliderbar/Sliderbar';
import { FaBell } from 'react-icons/fa';
import teamlogo from './../../../assets/team2.png'
function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/v1/team-details//find-all')
      .then(response => {
        setTeams(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching team data:", error);
      });
  }, []);

  return (
    <>
      <div className="flex bg-rgba-239-246-255-1">
        <div className="lg:basis-[20%] basis-[20%] md:basis-[44%] h-[100vh] rounded-[20px]">
          <Sliderbar />
        </div>
        <div className="basis-[90%] lg:h-[100%] lg:m-1 md:m-1 m-1 bg-rgba-239-246-255-1">
          <div className="lg:w-full w-[100%] lg:h-[60px] flex bg-rgba-36-40-51-1 lg:mt-1 mt-3 md:mt-2 md:rounded-[16px] rounded-md lg:rounded-[16px] h-[40px] md:h-[60px] items-center justify-between">
            <h1 className="text-white lg:text-md text-[13px] lg:text-lg font-custom text-center lg:ml-0 ml-2 lg:p-4 p-[10px] font-bold">TEAMS</h1>
            <div className="flex items-center space-x-6 mr-6">
              <FaBell className="text-white text-lg" />
              <img src="src/assets/profilepic.png" alt="Avatar" className="h-[30px] w-[30px] rounded-full bg-white cursor-pointer" />
            </div>
          </div>
          <div className="w-full h-[50px] mt-6 flex items-center">
            <h1 className='text-[22px] font-custom text-rgba-36-40-51-1 font-bold pl-4'>All Team Details</h1>
          </div>
          <div className="w-full h-[315px] mt-4 flex items-center justify-start gap-8">
            {teams.map((team, index) => (
              <div key={team._id} className="w-[227px] h-full border bg-white shadow-sm ml-4 rounded-md flex flex-col items-center">
                <div className="w-full h-[155px] p-1 flex items-center justify-center">
                  <img src={teamlogo}  style={{ width: '120px', height: '120px', borderRadius: '5px' }} />
                </div>
                <div className="w-full h-[25px] px-10 flex items-center justify-start">
                  <p className="leading-6 text-sm font-custom font-semibold">Team Name: {team.teamName}</p>
                </div>
                <div className="w-full h-[25px] px-10 flex items-center justify-start">
                  <p className="leading-6 text-sm font-custom font-semibold">Position: {team.position}</p>
                </div>
                <div className="w-full h-[25px] px-10 flex items-center justify-start">
                  <p className="leading-6 text-sm font-custom font-semibold">Team Rank: {team.teamRank}</p>
                </div>
                <div className="w-full h-[25px] px-10 flex items-center justify-start">
                  <p className="leading-6 text-sm font-custom font-semibold">League: {team.leagueName}</p>
                </div>
                <div className="w-full h-[25px] px-10 flex items-center justify-start">
                  <p className="leading-6 text-sm font-custom font-semibold">Baskets In: {team.basketsIn}</p>
                </div>
                <div className="w-full h-[25px] px-10 flex items-center justify-start">
                  <p className="leading-6 text-sm font-custom font-semibold">Three Pointers: {team.threePoint}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Teams;
