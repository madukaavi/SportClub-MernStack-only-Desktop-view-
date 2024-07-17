import React, { useState, useEffect } from 'react';
import Sliderbar from '../Sliderbar/Sliderbar'
import { FaBell } from 'react-icons/fa';
import { IoIosArrowForward } from "react-icons/io";
import { FaRegPlusSquare } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom



const AdminDashboard = () => {

  //Player info Endpoints
  const [playerss, setPlayerss] = useState([
    { name: 'Steve', picture: 'src/assets/player.png' },
    { name: 'Steve',  picture: 'src/assets/player.png' },
    { name: 'Steve',  picture: 'src/assets/player.png' },
    { name: 'Steve',  picture: 'src/assets/player.png' },
    { name: 'Steve',  picture: 'src/assets/player.png' },
    { name: 'Steve',  picture: 'src/assets/player.png' },
    { name: 'Steve',  picture: 'src/assets/player.png' },
  ]);

//Player-Stats-Endpoints
const [playersstats, setPlayersStats] = useState([
  { name: 'Steve', picture: 'src/assets/player.png' },
  { name: 'Steve',  picture: 'src/assets/player.png' },
  { name: 'Steve',  picture: 'src/assets/player.png' },
  { name: 'Steve',  picture: 'src/assets/player.png' },
  { name: 'Steve',  picture: 'src/assets/player.png' },
  { name: 'Steve',  picture: 'src/assets/player.png' },
  { name: 'Steve',  picture: 'src/assets/player.png' },
]);

//Team-information-Table-Endpoints 
const [teamss, setTeamss] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/v1/team-details/find-all/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setTeamss(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);


//No-Of-Players-End-Point
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


//No-Of-Teams-End-Point
const [totatlTIds, setTotalTIds] = useState(0);
const [teams, setTeams] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/v1/team-details/find-all');
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


// Player Modal state



// Form data state
const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const [formData, setFormData] = useState({
    playerId: '',
    userName: '',
    playerName: '',
    age: '',
    dob: '',
    phoneNumber: '',
    email: '',
    emergencyContact: '',
    height: '',
    weight: '',
    playerRanking: '',
    matchRanking: '',
    reportInjuries: '',
    gameLost: '',
    gameMissed: '',
    practiceMissed: '',
    attended: '',
    duePayments: '',
    completePayments: '',
    date: '',
    freeThrows: '',
    rightLayups: '',
    leftLayups: '',
    aroundTheWorldShots: '',
    threePointer: '',
    defensiveShoot: '',
    aroundTheNeck: '',
    aroundTheHead: '',
    rightLowDribble: '',
    leftLowDribble: '',
    rightHighDribble: '',
    leftHighDribble: ''
  });

  useEffect(() => {
    if (isPlayerModalOpen) {
      axios.get('http://localhost:9000/api/v1/users/find-all')
        .then(response => {
          setUsernames(response.data.data);
        })
        .catch(error => {
          console.error('There was an error fetching the usernames!', error);
        });
    }
  }, [isPlayerModalOpen]);

  const openPlayerModal = () => setIsPlayerModalOpen(true);
  const closePlayerModal = () => setIsPlayerModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:9000/api/v1/players/create', formData)
      .then(response => {
        console.log('Player created successfully:', response.data);
        closePlayerModal();
      })
      .catch(error => {
        console.error('There was an error creating the player!', error);
      });
  };



  return (
    <>
       { /*slider-import-section */}
        <div className="flex bg-rgba-239-246-255-1">
        <div className="lg:basis-[20%] basis-[20%] md:basis-[44%] h-[100vh] rounded-[20px]  ">
          <Sliderbar  />
        </div>
        { /*main-content-with- top- bar*/}
        <div className="basis-[90%] lg:h-[100%] lg:m-1 md:m-1 m-1 bg-rgba-239-246-255-1 ">
        <div className="lg:w-full w-[100%] lg:h-[60px]  flex shadow-xl bg-rgba-36-40-51-1 lg:mt-1 mt-3 md:mt-2 md:rounded-[16px] rounded-md lg:rounded-[16px] h-[40px] md:h-[60px] items-center justify-between  ">
        <h1 className="text-white lg:text-md text-[13px] lg:text-lg font-custom text-center lg:ml-0 ml-2 lg:p-4 p-[10px] font-bold ">DASHBOARD</h1>
        <div className="flex items-center space-x-6 mr-6">
        <FaBell className="text-white text-lg" />
        <img src="src/assets/profilepic.png" alt="Avatar" className="h-[30px] w-[30px] rounded-full bg-white cursor-pointer" /> 
        </div>
        </div>
        { /*Main-Admin-informations */}
        <div className="w-full  h-[540px]  mt-4 flex justify-start gap-4">
        <div className="w-[60%] h-[535px]  shadow-sm ml-2  flex flex-col items-center gap-[2%]">
        <div className="w-full h-[40%] bg-white  flex flex-col gap-1 shadow-md rounded-lg">
        <div className="w-full  h-[40px] p-2 flex items-center">
        <h1 className='text-[18px] font-custom text-rgba-36-40-51-1 font-bold '>All Player Info</h1>
        </div>
        <div className="w-full h-[60%]  flex p-1 gap-4">
        <div className="w-[80px] h-full  flex flex-col">
        <div className="w-full h-[75px] "><img src={playerss[0].picture} alt="" className='w-full h-full' /></div>
        <div className="w-full h-[20px]  flex items-center justify-center"><h1 className='text-[14px] font-medium font-custom text-rgba-36-40-51-1'>{playerss[0].name}</h1></div>
        </div>
        <div className="w-[80px] h-full  flex  flex-col">
        <div className="w-full h-[75px] "><img src={playerss[1].picture} alt="" className='w-full h-full' /></div>
        <div className="w-full h-[20px]  flex items-center justify-center"><h1 className='text-[14px] font-medium font-custom text-rgba-36-40-51-1'>{playerss[0].name}</h1></div>
        </div>
        <div className="w-[80px] h-full  flex flex-col">
        <div className="w-full h-[75px]"><img src={playerss[2].picture} alt="" className='w-full h-full' /></div>
        <div className="w-full h-[20px] flex items-center justify-center"><h1 className='text-[14px] font-medium font-custom text-rgba-36-40-51-1'>{playerss[0].name}</h1></div>
        </div>
        <div className="w-[80px] h-full flex flex-col">
        <div className="w-full h-[75px]"><img src={playerss[3].picture} alt="" className='w-full h-full' /></div>
        <div className="w-full h-[20px] flex items-center justify-center"><h1 className='text-[14px] font-medium font-custom text-rgba-36-40-51-1'>{playerss[0].name}</h1></div>
        </div>
        <div className="w-[80px] h-full  flex flex-col">
        <div className="w-full h-[75px] "><img src={playerss[4].picture} alt="" className='w-full h-full' /></div>
        <div className="w-full h-[20px]  flex items-center justify-center"><h1 className='text-[14px] font-medium font-custom text-rgba-36-40-51-1'>{playerss[0].name}</h1></div>
        </div>
        <div className="w-[80px] h-full  flex flex-col">
        <div className="w-full h-[75px] "><img src={playerss[5].picture} alt="" className='w-full h-full' /></div>
        <div className="w-full h-[20px]  flex items-center justify-center"><h1 className='text-[14px] font-medium font-custom text-rgba-36-40-51-1'>{playerss[0].name}</h1></div>
        </div>
        <div className="w-[80px] h-full  flex flex-col">
        <div className="w-full h-[75px] "><img src={playerss[6].picture} alt="" className='w-full h-full' /></div>
        <div className="w-full h-[20px]  flex items-center justify-center"><h1 className='text-[14px] font-medium font-custom text-rgba-36-40-51-1'>{playerss[0].name}</h1></div>
        </div>
        </div>
        <div className="w-full  h-[23px]  flex items-center justify-end">
        <Link to="/Admin_Players">
        <IoIosArrowForward className='mr-2 cursor-pointer'/>
        </Link>
        </div>
        </div>

        {/*--Player-Stats-Area--*/}
        <div className="w-full h-[40%] bg-white  flex flex-col gap-1 shadow-md rounded-lg">
        <div className="w-full  h-[40px] p-2 flex items-center">
        <h1 className='text-[18px] font-custom text-rgba-36-40-51-1 font-bold '>Player Stats</h1>
        </div>
        <div className="w-full h-[60%]  flex p-1 gap-4">
        <div className="w-[80px] h-full flex flex-col">
        <div className="w-full h-[75px]"><img src={playersstats[0].picture} alt="" className='w-full h-full' /></div>
        <div className="w-full h-[20px]  flex items-center justify-center"><h1 className='text-[14px] font-medium font-custom text-rgba-36-40-51-1'>{playerss[0].name}</h1></div>
        </div>
        <div className="w-[80px] h-full  flex  flex-col">
        <div className="w-full h-[75px]"><img src={playersstats[1].picture} alt="" className='w-full h-full' /></div>
        <div className="w-full h-[20px] flex items-center justify-center"><h1 className='text-[14px] font-medium font-custom text-rgba-36-40-51-1'>{playerss[0].name}</h1></div>
        </div>
        <div className="w-[80px] h-full  flex flex-col">
        <div className="w-full h-[75px] "><img src={playersstats[2].picture} alt="" className='w-full h-full' /></div>
        <div className="w-full h-[20px]  flex items-center justify-center"><h1 className='text-[14px] font-medium font-custom text-rgba-36-40-51-1'>{playerss[0].name}</h1></div>
        </div>
        <div className="w-[80px] h-full  flex flex-col">
        <div className="w-full h-[75px] "><img src={playersstats[3].picture} alt="" className='w-full h-full' /></div>
        <div className="w-full h-[20px]  flex items-center justify-center"><h1 className='text-[14px] font-medium font-custom text-rgba-36-40-51-1'>{playerss[0].name}</h1></div>
        </div>
        <div className="w-[80px] h-full  flex flex-col">
        <div className="w-full h-[75px] "><img src={playersstats[4].picture} alt="" className='w-full h-full' /></div>
        <div className="w-full h-[20px]  flex items-center justify-center"><h1 className='text-[14px] font-medium font-custom text-rgba-36-40-51-1'>{playerss[0].name}</h1></div>
        </div>
        <div className="w-[80px] h-full  flex flex-col">
        <div className="w-full h-[75px] "><img src={playersstats[5].picture} alt="" className='w-full h-full' /></div>
        <div className="w-full h-[20px]  flex items-center justify-center"><h1 className='text-[14px] font-medium font-custom text-rgba-36-40-51-1'>{playerss[0].name}</h1></div>
        </div>
        <div className="w-[80px] h-full flex flex-col">
        <div className="w-full h-[75px] "><img src={playersstats[6].picture} alt="" className='w-full h-full' /></div>
        <div className="w-full h-[20px] flex items-center justify-center"><h1 className='text-[14px] font-medium font-custom text-rgba-36-40-51-1'>{playerss[0].name}</h1></div>
        </div>
        </div>
        <div className="w-full  h-[23px]  flex items-center justify-end">
        <IoIosArrowForward className='mr-2  cursor-pointer'/>
        </div>
        </div>

        {/*Table-area-main-*/}
        <div className="w-full h-[40%] bg-white  flex p-1 shadow-md rounded-lg">
        <div className="w-full h-full  flex flex-col">
        <div className="w-full  h-[40px] p-2 flex items-center">
        <h1 className='text-[18px] font-custom text-rgba-36-40-51-1 font-bold '>Team Information</h1>
        </div>
        <div className="overflow-x-auto  w-full h-[100px]">
      <div className="shadow overflow-hidden border-b border-gray-200 ">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-black">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Team</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Team Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">League Name</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
        {teamss.map((team, index) => (
          <tr key={index}>
            <td className="px-6 py-3 whitespace-nowrap text-xs">{team.teamName}</td>
            <td className="px-6 py-3 whitespace-nowrap text-xs">{team.position}</td>
            <td className="px-6 py-3 whitespace-nowrap text-xs">{team.teamRank}</td>
            <td className="px-6 py-3 whitespace-nowrap text-xs">{team.leagueName}</td>
          </tr>
        ))}
      
      </tbody>
          </table>
          </div>
          </div>
        </div>
        </div>
        </div>

        <div className="w-[33%] h-[535px]  shadow-sm ml-2  flex flex-col items-center gap-5 ">
          {/* NO OF PLAYERS SECTION */}
          <div className="w-full h-[25%] bg-white  flex flex-col shadow-md rounded-lg">
          <div className="w-full  h-[40px] p-2 flex items-center justify-center">
          <h1 className='text-[20px] font-custom text-rgba-36-40-51-1 font-bold '>No: Of Players</h1>
          </div>
          <div className="w-full h-[92px]  flex items-center justify-center">
          <h1 className='text-[40px] font-custom text-rgba-36-40-51-1 font-bold '>{totalIds}</h1> 
          </div>
          </div>

          {/* NO OF PLAYERS TEAMS */}
          <div className="w-full h-[25%]  bg-white flex flex-col shadow-md rounded-lg">
          <div className="w-full h-[40px] p-2 flex items-center justify-center">
          <h1 className='text-[20px] font-custom text-rgba-36-40-51-1 font-bold '>No: Of Teams</h1>
          </div>
          <div className="w-full h-[92px]  flex items-center justify-center">
          <h1 className='text-[40px] font-custom text-rgba-36-40-51-1 font-bold '>{totatlTIds}</h1> 
          </div>
          </div>

          {/* ADD PLAYER & TRAINER BUTTON AREA */}
          <div className="w-full h-[43%]  flex flex-col rounded-[10px] items-center justify-center gap-5 p-4 bg-rgba-36-40-51-1 shadow-md">
           <div className="w-full h-[60px] flex items-center justify-center">
           <button class="bg-white flex items-center justify-center shadow-sm hover:bg-gray-500 text-rgba-36-40-51-1 text-[28px] font-bold font-custom w-full py-2 px-4 rounded-[10px]" onClick={openPlayerModal}>
           <FaRegPlusSquare className='mr-3 w-[30px] h-[39px]'/>Add Player</button>
           </div>
           
           
           </div>
          </div>
        </div>
        </div>
        </div>
       
        
        <button onClick={openPlayerModal} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Open Modal</button>
      {isPlayerModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black opacity-75" onClick={closePlayerModal}></div>
            <div className="bg-white rounded-md p-8 z-50">
              <form className="grid grid-cols-4 gap-4" onSubmit={handleSubmit}>
                <input type="text" name="playerId" placeholder="PlayerId" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <select name="userName" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange}>
                  <option value="" disabled selected>UserName</option>
                  {usernames.map(user => (
                    <option key={user.id} value={user.userName}>{user.userName}</option>
                  ))}
                </select>
                <input type="text" name="playerName" placeholder="Player Name" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="age" placeholder="Age" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="text" name="dob" placeholder="Dob" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="text" name="phoneNumber" placeholder="Phone Number" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="text" name="email" placeholder="Email" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="text" name="emergencyContact" placeholder="Emergency Contact" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="height" placeholder="Height" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="weight" placeholder="Weight" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="playerRanking" placeholder="PlayerRanking" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="matchRanking" placeholder="MatchRanking" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="reportInjuries" placeholder="ReportInjuries" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="gameLost" placeholder="GameLost" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="gameMissed" placeholder="GameMissed" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="practiceMissed" placeholder="PracticeMissed" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="attended" placeholder="Attended" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="duePayments" placeholder="DuePayments" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="completePayments" placeholder="CompletePayments" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="text" name="date" placeholder="Date" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="freeThrows" placeholder="FreeThrows" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="rightLayups" placeholder="RightLayups" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="leftLayups" placeholder="LeftLayups" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="aroundTheWorldShots" placeholder="AroundTheWorldShots" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="threePointer" placeholder="ThreePointer" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="defensiveShoot" placeholder="DefensiveShoot" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="aroundTheNeck" placeholder="AroundTheNeck" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="aroundTheHead" placeholder="AroundTheHead" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="rightLowDribble" placeholder="RightLowDribble" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="leftLowDribble" placeholder="LeftLowDribble" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="rightHighDribble" placeholder="RightHighDribble" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />
                <input type="number" name="leftHighDribble" placeholder="LeftHighDribble" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} />

                <div className='flex w-auto gap-4'>
                  <button type="submit" className="bg-blue-500 w-[80px] text-white font-bold py-2 px-4 rounded mt-4 col-span-2">Add</button>
                  <button type="button" className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-4 col-span-2" onClick={closePlayerModal}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
           
      
    </>
  );
};

export default AdminDashboard;