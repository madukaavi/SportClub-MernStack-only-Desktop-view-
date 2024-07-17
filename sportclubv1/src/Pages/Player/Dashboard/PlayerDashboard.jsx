import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import Sliderbar from '../../../Components/Sliderbar/Sliderbar';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import playerimage from './../../../assets/player.png'

function PlayerDashboard() {
  
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    playerName: '',
    age: '',
    dob: '',
    height: '',
    weight: '',
  });
  const [file, setFile] = useState(null);

  const toggleEditProfile = () => {
    setEditProfileOpen(!isEditProfileOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const updateProfile = async () => {
    try {
      let imageUrl = '';

      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        const uploadResponse = await axios.post('http://localhost:9000/api/v1/file-upload/test-upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        imageUrl = uploadResponse.data.fileLocation;
      }

      const profileResponse = await axios.patch('http://localhost:9000/api/v1/players/update/:id', {
        playerName: profileInfo.playerName,
        age: profileInfo.age,
        dob: profileInfo.dob,
        height: profileInfo.height,
        weight: profileInfo.weight,
        playerImage: imageUrl,
      });

      console.log('Profile updated successfully', profileResponse.data);
      toggleEditProfile();
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };


  const [playerName, setPlayerName] = useState(null);
  const [age, setAge] = useState(null);
  const [dob, setDob] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [MatchRanking, setMatchRanking] = useState(null);
  const [playerRanking, setPlayerRanking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:9000/api/v1/players/find-by-id/664c4c163c4d2111dd952013')
      .then(response => {
        console.log('Fetched data:', response.data); // Log fetched data to console
        const { playerName, age, dob, height, weight, MatchRanking, playerRanking, playerImage } = response.data.data; // Destructure duePayments and completedPayments from response.data.data
        console.log('Player Name:', playerName);
        console.log('Age:', age);
        console.log('Dob:', dob);
        console.log('Height:', height);
        console.log('Weight:', weight);
        console.log('MatchRanking:', MatchRanking);
        console.log('PlayerRanking:', playerRanking);
        // Update state with fetched data
        setPlayerName(playerName);
        setAge(age);
        setDob(dob);
        setHeight(height);
        setWeight(weight);
        setMatchRanking(MatchRanking);
        setPlayerRanking(playerRanking);
        setPlayerImage(playerImage);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Loading....');
        setLoading(false);
      });
  }, []);
  
const[teamss,setTeamss] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/v1/team-details/find-all/');
      setTeamss(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);


  return (
    <>
      <div className="flex bg-rgba-239-246-255-1">
        <div className="lg:basis-[20%] basis-[20%] md:basis-[44%] h-[100vh] rounded-[20px]  ">
          <Sliderbar />
        </div>
        <div className="basis-[90%] lg:h-[100%] lg:m-2 md:m-2 m-1 bg-rgba-239-246-255-1  ">
          <div className="lg:w-full w-[100%] lg:h-[60px]   flex bg-rgba-36-40-51-1 lg:mt-1 mt-3 md:mt-2 md:rounded-[16px] rounded-md lg:rounded-[16px] h-[40px] md:h-[60px] items-center justify-between  ">
            <h1 className="text-white lg:text-md text-[15px] lg:text-lg font-custom text-center lg:ml-0 ml-12 lg:p-4 p-[10px] font-bold">DASHBOARD</h1>
            <div className="flex items-center space-x-6 mr-6">
              <FaBell className="text-white text-lg" />
              <img src="src/assets/profilepic.png" alt="Avatar" className="h-[30px] w-[30px] rounded-full bg-white cursor-pointer" onClick={toggleEditProfile} />
            </div>
          </div>
          <div className={`md:w-full w-[300px] lg:w-full lg:h-[650px] md:h-[550px] h-[900px] mt-2 flex flex-col ${isEditProfileOpen ? 'hidden' : ''}`}>
            <div className="w-full h-[50%] flex flex-col md:flex-row p-1">
              <div className="w-full  md:w-[30%] h-[50%] md:h-full  flex flex-col  bg-white rounded-lg shadow-md">
                <h1 className="text-[20px] text-rgba-36-40-51-1 p-2 font-custom font-semibold">My Info</h1>
                <div className="flex items-center justify-center">
                  <img src={playerimage} alt="Avatar" className="lg:h-[150px] h-[80px] w-[80px] lg:w-[170px]  " />
                </div>
                <div className="flex flex-col px-3 mt-[3px] ">
                  <h2 className="text-rgba-36-40-51-1 font-custom font-medium lg:text-[15px] text-[12px]">
                    Name: <span className="text-rgba-36-40-51-1 text-md font-custom font-medium ">{playerName}</span>
                  </h2>
                  <h2 className="text-rgba-36-40-51-1 font-custom font-medium lg:text-[15px] text-[12px]">
                    Age: <span className="text-rgba-36-40-51-1 text-md font-custom font-medium ">{age}</span>
                  </h2>
                  <h2 className="text-rgba-36-40-51-1 font-custom font-medium lg:text-[15px] text-[12px]">
                    Date Of Birth: <span className="text-rgba-36-40-51-1 text-md font-custom font-medium">{dob}</span>
                  </h2>
                  <h2 className="text-rgba-36-40-51-1 font-custom font-medium lg:text-[15px] text-[12px]">
                    Height: <span className="text-rgba-36-40-51-1 text-md font-custom font-medium">{height}</span>
                  </h2>
                  <h2 className="text-rgba-36-40-51-1 font-custom font-medium lg:text-[15px] text-[12px]">
                    Weight: <span className="text-rgba-36-40-51-1 text-md font-custom font-medium">{weight}</span>
                  </h2>
                  <div className="w-full h-[3%]  flex items-end justify-end mb-4 ">
                    <BsArrowRight className="h-5 w-5 mr-2 cursor-pointer mb-2" onClick={toggleEditProfile} />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-[70%] h-[50%] md:h-full  flex flex-col">
                <div className="w-full h-[40%]  flex">
                  <div className="w-[50%] border mx-4 bg-white flex flex-col text-center p-4 rounded-lg shadow-md">
                    <h1 className='font-bold font-custom lg:text-[30px] text-[10px] text-rgba-36-40-51-1'>Player Ranking</h1>
                    {/* Placeholder for playerRank */}
                    <h1 className='font-medium font-custom text-[30px] text-rgba-36-40-51-1'>{playerRanking}</h1>
                  </div>
                  <div className="w-[50%] border mx-2 bg-white flex flex-col text-center rounded-md shadow-md p-4">
                    <h1 className='font-bold font-custom lg:text-[30px] text-[10px] text-rgba-36-40-51-1'>Match Ranking</h1>
                    {/* Placeholder for matchRank */}
                    <h1 className='font-medium font-custom text-[30px] text-rgba-36-40-51-1'>{MatchRanking}</h1>
                  </div>
                </div>
                <div className="w-full h-[180px] mt-2 flex">
                  <div className="w-full mt-1 ml-4 mx-2  flex flex-col bg-white rounded-lg shadow-md">
                    <h1 className='text-[20px] font-custom font-bold text-rgba-36-40-51-1 p-2'>Past Teams & Positions</h1>
                    <div className="w-full h-full  p-2 overflow-x-auto">
                      <table className="table-auto min-w-full">
                        <thead>
                          <tr>
                            <th className="border px-4 py-1 bg-black text-white font-custom">Team</th>
                            <th className="border px-4 py-1 bg-black text-white font-custom">Position</th>
                            <th className="border px-4 py-1 bg-black text-white font-custom">Team Rank</th>
                            <th className="border px-4 py-1 bg-black text-white font-custom">League Name</th>
                          </tr>
                        </thead>
                        <tbody>
                        {teamss.map((team, index) => (
                         <tr key={index}>
                            <td className="border px-2 py-2 font-custom">{team.teamName}</td>
                            <td className="border px-2 py-2 font-custom ">{team.position}</td>
                            <td className="border px-2 py-2 font-custom">{team.teamRank}</td>
                            <td className="border px-2 py-2 font-custom">{team.leagueName}</td>
                          </tr>
                         ))}
                          {/* Add more rows as needed */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[45%]  flex p-2 ">
              <div className="w-[30%]  border flex flex-col mt-3 bg-white rounded-lg shadow-md ">
                <h1 className='text-[19px] font-custom font-bold text-rgba-36-40-51-1 p-2 mt-2'>Tournament Details</h1>
                <div className="w-full h-[100%]   flex">
                  <div className="w-full h-full  ">
                    <div className="overflow-x-auto p-2">
                      <table className="table-auto min-w-full">
                        <thead>
                          <tr>
                            <th className="border py-2 bg-black text-white text-[10px] font-custom">Team</th>
                            <th className="border py-2  bg-black text-white text-[10px] font-custom">Position</th>
                            <th className="border py-2 bg-black text-white text-[10px] font-custom">Team Rank</th>
                            <th className="border py-2 bg-black text-white text-[10px] font-custom">League Name</th>
                          </tr>
                        </thead>
                        <tbody>
                        {teamss.map((team, index) => (
                         <tr key={index}>
                            <td className="border py-2 font-custom text-[11px]">{team.teamName}</td>
                            <td className="border py-2 font-custom text-[11px] ">{team.position}</td>
                            <td className="border py-2 font-custom  text-[11px]">{team.teamRank}</td>
                            <td className="border py-2 font-custom text-[11px]">{team.leagueName}</td>
                          </tr>
                           ))}
                          {/* Add more rows as needed */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="w-full h-[10%]  flex items-end justify-end p-1 ">
                <Link to="/Tournaments">
                  <BsArrowRight className="h-5 w-5 mr-2 cursor-pointer"  />
                  </Link>
                </div>
              </div>
              <div className="w-[70%]  p-3  ">
                <div className="w-full  h-[265px] rounded-lg shadow-md flex flex-col p-2 bg-white">
                  <h1 className='text-[30px] font-custom font-semibold text-rgba-36-40-51-1 p-2'>Player Stats</h1>
                  <div className="w-full h-[100%]  flex items-end justify-end mt-3 ">
                  <Link to="/PlayerStats">
                    <BsArrowRight className="h-5 w-5 mr-2 cursor-pointer " />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
      <button onClick={toggleEditProfile}>Edit Profile</button>
      {isEditProfileOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] sm:w-[600px] md:w-[700px] lg:w-[800px] h-[450px] overflow-y-scroll">
            <h1 className="text-lg font-semibold mb-4">Edit Profile</h1>
            <div className="flex flex-col space-y-4">
              <label className="text-sm font-semibold" htmlFor="playerName">Name:</label>
              <input className="border rounded-md px-2 py-1" type="text" id="playerName" name="playerName" value={profileInfo.playerName} onChange={handleChange} />
              <label className="text-sm font-semibold" htmlFor="age">Age:</label>
              <input className="border rounded-md px-2 py-1" type="number" id="age" name="age" value={profileInfo.age} onChange={handleChange} />
              <label className="text-sm font-semibold" htmlFor="dob">Date of Birth:</label>
              <input className="border rounded-md px-2 py-1" type="text" id="dob" name="dob" value={profileInfo.dob} onChange={handleChange} />
              <label className="text-sm font-semibold" htmlFor="height">Height:</label>
              <input className="border rounded-md px-2 py-1" type="number" id="height" name="height" value={profileInfo.height} onChange={handleChange} />
              <label className="text-sm font-semibold" htmlFor="weight">Weight:</label>
              <input className="border rounded-md px-2 py-1" type="number" id="weight" name="weight" value={profileInfo.weight} onChange={handleChange} />
              <label className="text-sm font-semibold" htmlFor="image">Profile Picture:</label>
              <input type="file" id="image" name="image" onChange={handleFileChange} />
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2" onClick={toggleEditProfile}>Cancel</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" onClick={updateProfile}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
    
    </>
  );
};

export default PlayerDashboard;
