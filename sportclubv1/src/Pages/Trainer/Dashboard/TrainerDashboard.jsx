import React, { useState, useEffect } from 'react';
import Sliderbar from './../Sliderbar/Sliderbar'
import { FaBell } from 'react-icons/fa';
import { IoIosArrowForward } from "react-icons/io";
import profileimage from './../../../assets/player.png';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom



const TrainerDashboard = () => {

  // front-end-end-point-to-connect-trainer-userinfo
  const [trainerName, setTrainerName] = useState(null);
const [age, setAge] = useState(null);
const [dob, setDob] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  //Fetch data from API endpoint
  fetch(`http://localhost:9000/api/v1/trainer/find-by-id/:id`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Fetched data:', data); // Log fetched data to console
      const { trainerName, age, dob } = data.data; // Destructure properties from data.data
      console.log('Trainer Name:', trainerName);
      console.log('Age:', age);
      console.log('Dob :', dob );
      // Update state with fetched data
      setTrainerName(trainerName);
      setAge(age);
      setDob(dob);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setError('Loding....');
      setLoading(false);
    });
}, []); 

//ALL PLAYER PROFILE
  const [allPlayers, setAllPlayers] = useState({
   player1:'src/assets/player.png',
   playert2:'src/assets/player.png',
   playert3:'src/assets/player.png',
   playert4:'src/assets/player.png',
   playert5:'src/assets/player.png',
   player1name: 'Steve',
   player2name : 'Steve',
   player3name : 'Steve',
   player4name : 'Steve',
   player5name : 'Steve',
  });

  //ALL PLAYER Stats
  const [playerStats, setPlayerStats] = useState({
    playerstats1:'src/assets/player.png',
    playerstats2:'src/assets/player.png',
    playerstats3:'src/assets/player.png',
    playerstats4:'src/assets/player.png',
    playerstast5:'src/assets/player.png',
   });

//no-of-teams -front-end-end-point
const [totatlTIds, setTotalTIds] = useState(0);
const [teams, setTeams] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/v1/team-details/find-all/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setTeams(data.data);
      // Calculating total of player IDs
      const total = data.data.length;
      setTotalTIds(total);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);


//no-of-players -front-end-end-point
  const [totalIds, setTotalIds] = useState(0);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/v1/players/find-all/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPlayers(data.data);
        // Calculating total of player IDs
        const total = data.data.length;
        setTotalIds(total);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Simulating fetching data from an endpoint table
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Simulating fetching data from an endpoint
    setTimeout(() => {
      const dataFromEndpoint = [
        { team: 'Black Panther', position: 'Center', teamRank: '05', leagueName: 'Mind West League' },
        { team: 'Warrior', position: 'Center', teamRank: '03', leagueName: 'Upright League' },
        { team: 'Nicks', position: 'PowerForward', teamRank: '5', leagueName: 'Leganda League' },
        { team: 'Golden Wings', position: 'PowerForward', teamRank: '02', leagueName: 'Fallout League' }
      ];
      setTableData(dataFromEndpoint);
    }, ); // Simulating delay in fetching data
  }, []);


  return (
    <>
        { /*slider-import-section */}
        <div className="flex bg-rgba-239-246-255-1">
        <div className="lg:basis-[20%] basis-[20%] md:basis-[44%] h-[100vh] rounded-[20px]">
          <Sliderbar  />
        </div>
        { /*main-content-with- top- bar*/}
        <div className="basis-[90%] lg:h-[100%] lg:m-1 md:m-1 m-1 bg-rgba-239-246-255-1 ">
        <div className="lg:w-full w-[100%] lg:h-[60px]  flex bg-rgba-36-40-51-1 lg:mt-1 mt-3 md:mt-2 md:rounded-[16px] rounded-md lg:rounded-[16px] h-[40px] md:h-[60px] items-center justify-between  ">
        <h1 className="text-white lg:text-md text-[13px] lg:text-lg font-custom text-center lg:ml-0 ml-2 lg:p-4 p-[10px] font-bold ">DASHBOARD</h1>
        <div className="flex items-center space-x-6 mr-6">
        <FaBell className="text-white text-lg" />
        <img src="src/assets/profilepic.png" alt="Avatar" className="h-[30px] w-[30px] rounded-full bg-white cursor-pointer" /> 
        </div>
        </div>
        { /*DASHBOARD-TRAINER-MAIN */}
        <div className="w-full h-[380px]  mt-10 flex  items-center justify-start gap-8">
        <div className="w-[402px] h-[99%]  bg-white shadow-sm ml-2 rounded-md flex flex-col items-center ">
        <div className="w-full   h-[50px] flex items-center ">
        <h1 className='text-[22px] font-custom text-rgba-36-40-51-1 font-bold pl-3'>My Info</h1>
        </div>
        { /*Trainer-Info */}
        <div className="w-full h-[180px]  flex items-center justify-center">
        <img src={profileimage}  width={210} alt=''/>
        </div>
        <div className="w-full  h-[25px] px-10 items-center justify-start"><p className='leading-6 text-[15px] font-custom font-semibold'>Name: {trainerName}</p></div>
        <div className="w-full  h-[25px] px-10 items-center justify-start"><p className='leading-6 text-[15px] font-custom font-semibold'>Age: {age}</p></div>
        <div className="w-full  h-[25px] px-10 items-center justify-start"><p className='leading-6 text-[15px] font-custom font-semibold'>Date of Birth: {dob}</p></div>
        <div className="w-full  h-[25px] px-10 items-center justify-start"><p className='leading-6 text-[15px] font-custom font-semibold'>Height: 0</p></div>
        <div className="w-full  h-[25px] px-10 items-center justify-start"><p className='leading-6 text-[15px] font-custom font-semibold'>Weight:0</p></div>
        </div>
        <div className="w-[640px] h-full   ml-2 flex flex-col">
        <div className="w-full    h-[50%] flex gap-12">
         <div className="w-[275px] bg-white shadow-sm rounded-md h-full ">
         <div className="w-full  h-[50px] flex items-center justify-center"><h1 className='text-[22px] font-custom text-rgba-36-40-51-1 font-bold'>No: Of Teams</h1></div>
         <div className="w-full  h-[130px] flex justify-center items-center"><h1 className='text-[30px] font-custom font-bold'>{totatlTIds}</h1></div>
         </div>
         <div className="w-[282px] bg-white shadow-sm rounded-md h-full ">
         <div className="w-full  h-[50px] flex items-center justify-center"><h1 className='text-[22px] font-custom text-rgba-36-40-51-1 font-bold'>No: Of Players</h1></div>
         <div className="w-full  h-[130px] flex justify-center items-center"><h1 className='text-[30px] font-custom font-bold'>{totalIds}</h1></div>
         </div>
        </div>
        { /*ALL-PLAYER-Info */}
        <div className="w-full  h-[50%]">
        <div className="w-[610px] rounded-md shadow-sm  bg-white mt-2 h-[179px]">
        <div className="w-full  h-[50px] flex items-center "><h1 className='text-[22px] pl-3 font-custom text-rgba-36-40-51-1 font-bold'>All Player Info</h1></div>
        <div className="w-full  h-[100px] flex items-start gap-5 pl-2 ">
        <div className="w-[100px]  h-[100px]">
        <div className="w-full  h-[80%]"><img src={allPlayers.player1}  className='w-[100%] h-[100%]' alt=""/></div>
        <div className="w-full  h-[20%] flex items-center justify-center"><h1 className='text-[15px] font-custom font-medium'>{allPlayers.player1name}</h1></div>
        </div>
        <div className="w-[100px]  h-[100px]">
        <div className="w-full  h-[80%]"><img src={allPlayers.playert2}   className='w-[100%] h-[100%]' alt=""/></div>
        <div className="w-full  h-[20%] flex items-center justify-center"><h1 className='text-[15px] font-custom font-medium'>{allPlayers.player2name}</h1></div>
        </div>
        <div className="w-[100px]  h-[100px]">
        <div className="w-full  h-[80%]"><img src={allPlayers.playert3}   className='w-[100%] h-[100%]' alt=""/></div>
        <div className="w-full  h-[20%] flex items-center justify-center"><h1 className='text-[15px] font-custom font-medium'>{allPlayers.player3name}</h1></div>
        </div>
        <div className="w-[100px]  h-[100px]">
        <div className="w-full  h-[80%]"><img src={allPlayers.playert4}   className='w-[100%] h-[100%]' alt=""/></div>
        <div className="w-full  h-[20%] flex items-center justify-center"><h1 className='text-[15px] font-custom font-medium'>{allPlayers.player4name}</h1></div>
        </div>
        <div className="w-[100px]  h-[100px]">
        <div className="w-full  h-[80%]"><img src={allPlayers.playert5}   className='w-[100%] h-[100%]' alt=""/></div>
        <div className="w-full  h-[20%] flex items-center justify-center"><h1 className='text-[15px] font-custom font-medium'>{allPlayers.player5name}</h1></div>
        </div>
        </div>
        { /*clikc arrow go player section */}
        <div className="w-full   h-[30px] flex items-center justify-end">
        <Link to="/Player_T">
        <IoIosArrowForward className='mr-2'/>
        </Link>
        </div>
        </div>
        </div>
        </div>
        </div>
        { /*Team*/}
        <div className="w-full mt-2  h-[200px] flex items-center justify-start gap-8">
        <div className="w-[402px] h-full  bg-white shadow-sm ml-2 rounded-md flex flex-col items-center ">
        <div className="w-full  h-[50px] flex">
        <div className="w-full  h-[50px] pl-2 flex items-center justify-start"><h1 className='text-[22px] font-custom text-rgba-36-40-51-1 font-bold'>Team Information</h1></div>
        <div className="w-full   h-[50px] flex items-center  justify-end">
        <Link to="/Teams_Teams">
        <IoIosArrowForward className='mr-2 '/>
        </Link>
        </div>
        </div>
        <div className="overflow-x-auto p-2">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left px-4 py-2 bg-black text-white font-custom border font-medium">Team</th>
            <th className="text-left px-4 py-2 bg-black text-white font-custom border font-medium">Position</th>
            <th className="text-left px-4 py-2 bg-black text-white font-custom border font-medium">Team Rank</th>
            <th className="text-left px-4 py-2 bg-black text-white font-custom border font-medium">League Name</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((rowData, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border font-custom font-light text-xs">{rowData.team}</td>
              <td className="px-4 py-2 border font-custom font-light text-xs">{rowData.position}</td>
              <td className="px-4 py-2 border font-custom font-light text-xs">{rowData.teamRank}</td>
              <td className="px-4 py-2 border font-custom font-light text-xs">{rowData.leagueName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
        <div className="w-[610px] h-full  bg-white shadow-sm ml-2 rounded-md flex flex-col ">
         <div className="w-full h-[50px]  items-center flex justify-start pl-2">
         <h1 className='text-[22px] font-custom text-rgba-36-40-51-1 font-bold'>Player Stats</h1>
         </div>
         <div className="w-full  h-[110px] flex items-start gap-2 pl-2">
          <div className="w-[110px] h-[109px] ">
          <img src={playerStats.playerstats1}   className='w-[100%] h-[100%]' alt=""/>
          </div>
          <div className="w-[110px] h-[109px] ">
          <img src={playerStats.playerstats2}   className='w-[100%] h-[100%]' alt=""/>
          </div>
          <div className="w-[110px] h-[109px] ">
          <img src={playerStats.playerstats3}   className='w-[100%] h-[100%]' alt=""/>
          </div>
          <div className="w-[110px] h-[109px] ">
          <img src={playerStats.playerstats4}   className='w-[100%] h-[100%]' alt=""/>
          </div>
          <div className="w-[110px] h-[109px] ">
          <img src={playerStats.playerstast5}   className='w-[100%] h-[100%]' alt=""/>
          </div>
         </div>
         <div className="w-full h-[40px]  flex items-center justify-end">
         <Link to="/PlayerProgress_T">
         <IoIosArrowForward className='mr-2'/>
         </Link>
         </div>
        </div>
        </div>
        </div>
        </div>
    </>
  );
};

export default TrainerDashboard;