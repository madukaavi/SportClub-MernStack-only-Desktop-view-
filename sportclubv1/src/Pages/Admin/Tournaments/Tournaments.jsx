import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sliderbar from '../Sliderbar/Sliderbar';
import { FaBell } from 'react-icons/fa';

const Tourments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentTournament, setCurrentTournament] = useState(null);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/v1/tournaments/find-all');
      setTournaments(response.data.data); // Adjust this according to your API response structure
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    }
  };

  const createTournament = async (newTournament) => {
    try {
      const response = await axios.post('http://localhost:9000/api/v1/tournaments/create', newTournament);
      setTournaments([...tournaments, response.data.data]); // Adjust this according to your API response structure
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating tournament:', error);
    }
  };

  const updateTournament = async (tournamentId, updatedTournament) => {
    try {
      const response = await axios.patch(`http://localhost:9000/api/v1/tournaments/update/${tournamentId}`, updatedTournament);
      setTournaments(tournaments.map(tournament => (tournament._id === tournamentId ? response.data.data : tournament))); // Adjust this according to your API response structure
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error('Error updating tournament:', error);
    }
  };

  const deleteTournament = async (tournamentId) => {
    try {
      await axios.delete(`http://localhost:9000/api/v1/tournaments/delete/${tournamentId}`);
      setTournaments(tournaments.filter(tournament => tournament._id !== tournamentId));
    } catch (error) {
      console.error('Error deleting tournament:', error);
    }
  };

  const handleCreate = () => {
    setCurrentTournament(null);
    setIsCreateModalOpen(true);
  };

  const handleUpdate = (tournament) => {
    setCurrentTournament(tournament);
    setIsUpdateModalOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newTournament = {
      Id: formData.get('_id'),
      date: formData.get('date'),
      location: formData.get('location'),
      leagueName: formData.get('leagueName'),
      teamScore: formData.get('teamScore'),
      totalThreePoint: formData.get('totalThreePoint'),
      playerNames: formData.get('playerNames'),
    };

    if (currentTournament) {
      updateTournament(currentTournament._id, newTournament);
    } else {
      createTournament(newTournament);
    }
  };

  return (
    <div className="flex bg-rgba-239-246-255-1">
      <div className="lg:basis-[20%] basis-[20%] md:basis-[44%] h-[100vh] rounded-[20px]">
        <Sliderbar />
      </div>
      <div className="basis-[90%] lg:h-[100%] lg:m-1 md:m-1 m-1 bg-rgba-239-246-255-1">
        <div className="lg:w-full w-[100%] lg:h-[60px] flex bg-rgba-36-40-51-1 lg:mt-1 mt-3 md:mt-2 md:rounded-[16px] rounded-md lg:rounded-[16px] h-[40px] md:h-[60px] items-center justify-between">
          <h1 className="text-white lg:text-md text-[13px] lg:text-lg font-custom text-center lg:ml-0 ml-2 lg:p-4 p-[10px] font-bold">TOURNAMENTS</h1>
          <div className="flex items-center space-x-6 mr-6">
            <FaBell className="text-white text-lg" />
            <img src="src/assets/profilepic.png" alt="Avatar" className="h-[30px] w-[30px] rounded-full bg-white cursor-pointer" />
          </div>
        </div>
        <div className="w-full h-[510px] mt-8 flex items-center justify-start gap-10">
          <div className="w-[98%] h-full bg-white shadow-sm ml-2 rounded-md flex flex-col">
            <div className="w-full h-[50px] flex items-center mt-6 justify-between">
              <h1 className='text-[22px] font-custom text-rgba-36-40-51-1 font-bold pl-6'>All Tournament Details</h1>
              <button onClick={handleCreate} className="mr-6 bg-blue-500 text-white px-4 py-2 rounded">Create Tournament</button>
            </div>
            <div className="w-full h-full border p-4">
              <div className="overflow-x-auto" style={{ maxWidth: "1070px", maxHeight: "500px" }}>
                <table className="table-auto min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">League Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Three Points</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player Names</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tournaments.map((tournament) => (
                      <tr key={tournament._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{tournament._id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{tournament.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{tournament.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{tournament.leagueName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{tournament.teamScore}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{tournament.totalThreePoint}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{tournament.playerNames}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button onClick={() => handleUpdate(tournament)} className="text-blue-500">Update</button>
                          <button onClick={() => deleteTournament(tournament._id)} className="text-red-500 ml-4">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {isCreateModalOpen || isUpdateModalOpen ? (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md shadow-lg">
              <h2 className="text-lg font-semibold">{currentTournament ? 'Update Tournament' : 'Create Tournament'}</h2>
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                  <label className="block text-gray-700">ID</label>
                  <input name="Id" defaultValue={currentTournament?._id || ''} className="mt-1 p-2 border rounded w-full" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Date</label>
                  <input name="date" defaultValue={currentTournament?.date || ''} className="mt-1 p-2 border rounded w-full" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Location</label>
                  <input name="location" defaultValue={currentTournament?.location || ''} className="mt-1 p-2 border rounded w-full" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">League Name</label>
                  <input name="leagueName" defaultValue={currentTournament?.leagueName || ''} className="mt-1 p-2 border rounded w-full" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Team Score</label>
                  <input name="teamScore" defaultValue={currentTournament?.teamScore || ''} className="mt-1 p-2 border rounded w-full" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Total Three Points</label>
                  <input name="totalThreePoint" defaultValue={currentTournament?.totalThreePoint || ''} className="mt-1 p-2 border rounded w-full" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Player Names</label>
                  <input name="playerNames" defaultValue={currentTournament?.playerNames || ''} className="mt-1 p-2 border rounded w-full" required />
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={() => { setIsCreateModalOpen(false); setIsUpdateModalOpen(false); }} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{currentTournament ? 'Update' : 'Create'}</button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Tourments;
