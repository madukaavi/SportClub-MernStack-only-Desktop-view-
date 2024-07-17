import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sliderbar from '../Sliderbar/Sliderbar';
import { FaBell } from 'react-icons/fa';

const Players = () => {
  const initialPlayerState = {
    id: null,
    playerName: "",
    age: "",
    dob: "",
    phoneNumber: "",
    email: "",
    emergencyContact: "",
    height: "",
    weight: "",
    playerRanking: "",
    MatchRanking: "",
    reportInjuries: "",
    gameLost: "",
    gameMissed: "",
    attended: "",
    duePayments: "",
    completePayments: ""
  };

  const [editing, setEditing] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(initialPlayerState);
  const [players, setPlayers] = useState([]);

  // Fetch players from the backend
  useEffect(() => {
    axios.get('http://localhost:9000/api/v1/players/find-all')
      .then(response => {
        setPlayers(response.data.data);
      })
      .catch(error => {
        console.error("There was an error fetching the players!", error);
      });
  }, []);

  const editPlayer = (player) => {
    setEditing(true);
    setCurrentPlayer({ ...player });
  };

  const updatePlayer = (id, updatedPlayer) => {
    axios.patch(`http://localhost:9000/api/v1/players/update/${id}`, updatedPlayer)
      .then(response => {
        setPlayers(players.map(player => (player._id === id ? response.data : player)));
        setEditing(false);
      })
      .catch(error => {
        console.error("There was an error updating the player!", error);
      });
  };

  const deletePlayer = (id) => {
    axios.delete(`http://localhost:9000/api/v1/players/delete/${id}`)
      .then(() => {
        setPlayers(players.filter(player => player._id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the player!", error);
      });
  };

  return (
    <>
      <div className="flex bg-rgba-239-246-255-1">
        <div className="lg:basis-[20%] basis-[20%] md:basis-[44%] h-[100vh] rounded-[20px]">
          <Sliderbar />
        </div>
        <div className="basis-[90%] lg:h-[100%] lg:m-1 md:m-1 m-1 bg-rgba-239-246-255-1">
          <div className="lg:w-full w-[100%] lg:h-[60px] flex bg-rgba-36-40-51-1 lg:mt-1 mt-3 md:mt-2 md:rounded-[16px] rounded-md lg:rounded-[16px] h-[40px] md:h-[60px] items-center justify-between">
            <h1 className="text-white lg:text-md text-[13px] lg:text-lg font-custom text-center lg:ml-0 ml-2 lg:p-4 p-[10px] font-bold">PLAYERS</h1>
            <div className="flex items-center space-x-6 mr-6">
              <FaBell className="text-white text-lg" />
              <img src="src/assets/profilepic.png" alt="Avatar" className="h-[30px] w-[30px] rounded-full bg-white cursor-pointer" />
            </div>
          </div>
          <div className="w-full h-[510px] mt-8 flex items-center justify-start gap-10">
            <div className="w-[98%] h-full bg-white shadow-sm ml-2 rounded-md flex flex-col">
              <div className="w-full h-[50px] flex items-center mt-6 justify-start">
                <h1 className='text-[22px] font-custom text-rgba-36-40-51-1 font-bold pl-6'>Player Details</h1>
              </div>
              <div className="w-full h-full border p-4">
                <div className="overflow-x-auto" style={{ maxWidth: "1070px", maxHeight: "500px" }}>
                  <table className="table-auto min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player Id</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emergency Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Height</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player Rank</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match Rank</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Injuries</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Games Lost</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Games Missed</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attended</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Payments</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed Payments</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {players.map((player) => (
                        <tr key={player._id}>
                          <td className="px-6 py-4 whitespace-nowrap">{player._id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{player.playerName}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{player.age}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{player.dob}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{player.phoneNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{player.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{player.emergencyContact}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{player.height}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{player.weight}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{player.playerRanking}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{player.MatchRanking}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{player.reportInjuries}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{player.gameLost}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{player.gameMissed}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{player.attended}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{player.duePayments}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{player.completePayments}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button onClick={() => editPlayer(player)}>Edit</button>
                            <button onClick={() => deletePlayer(player._id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {editing && (
            <div>
              <h2>Edit Player</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updatePlayer(currentPlayer._id, currentPlayer);
                }}
              >
                <input
                  type="text"
                  name="playerName"
                  value={currentPlayer.playerName}
                  onChange={(e) =>
                    setCurrentPlayer({ ...currentPlayer, playerName: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="age"
                  value={currentPlayer.age}
                  onChange={(e) =>
                    setCurrentPlayer({ ...currentPlayer, age: e.target.value })
                  }
                />
                <input
                  type="date"
                  name="dob"
                  value={currentPlayer.dob}
                  onChange={(e) =>
                    setCurrentPlayer({ ...currentPlayer, dob: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="phoneNumber"
                  value={currentPlayer.phoneNumber}
                  onChange={(e) =>
                    setCurrentPlayer({ ...currentPlayer, phoneNumber: e.target.value })
                  }
                />
                <input
                  type="email"
                  name="email"
                  value={currentPlayer.email}
                  onChange={(e) =>
                    setCurrentPlayer({ ...currentPlayer, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="emergencyContact"
                  value={currentPlayer.emergencyContact}
                  onChange={(e) =>
                    setCurrentPlayer({ ...currentPlayer, emergencyContact: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="height"
                  value={currentPlayer.height}
                  onChange={(e) =>
                    setCurrentPlayer({ ...currentPlayer, height: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="weight"
                  value={currentPlayer.weight}
                  onChange={(e) =>
                    setCurrentPlayer({ ...currentPlayer, weight: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="playerRanking"
                  value={currentPlayer.playerRanking}
                  onChange={(e) =>
                    setCurrentPlayer({ ...currentPlayer, playerRanking: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="MatchRanking"
                  value={currentPlayer.MatchRanking}
                  onChange={(e) =>
                    setCurrentPlayer({ ...currentPlayer, MatchRanking: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="reportInjuries"
                  value={currentPlayer.reportInjuries}
                  onChange={(e) =>
                    setCurrentPlayer({ ...currentPlayer, reportInjuries: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="gameLost"
                  value={currentPlayer.gameLost}
                  onChange={(e) =>
                    setCurrentPlayer({ ...currentPlayer, gameLost: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="gameMissed"
                  value={currentPlayer.gameMissed}
                  onChange={(e) =>
                    setCurrentPlayer({ ...currentPlayer, gameMissed: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="attended"
                  value={currentPlayer.attended}
                  onChange={(e) =>
                    setCurrentPlayer({ ...currentPlayer, attended: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="duePayments"
                  value={currentPlayer.duePayments}
                  onChange={(e) =>
                    setCurrentPlayer({ ...currentPlayer, duePayments: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="completePayments"
                  value={currentPlayer.completePayments}
                  onChange={(e) =>
                    setCurrentPlayer({ ...currentPlayer, completePayments: e.target.value })
                  }
                />
                <button>Update Player</button>
                <button onClick={() => setEditing(false)}>Cancel</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Players;
