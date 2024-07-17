import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sliderbar from '../Sliderbar/Sliderbar';
import { FaBell } from 'react-icons/fa';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/v1/team-details/find-all');
      setTeams(response.data.data); // Adjust this according to your API response structure
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const createTeam = async (newTeam) => {
    try {
      const response = await axios.post('http://localhost:9000/api/v1/team-details/create', newTeam);
      setTeams([...teams, response.data.data]); // Adjust this according to your API response structure
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  const updateTeam = async (teamId, updatedTeam) => {
    try {
      const response = await axios.patch(`http://localhost:9000/api/v1/team-details/update/${teamId}`, updatedTeam);
      setTeams(teams.map(team => (team._id === teamId ? response.data.data : team))); // Adjust this according to your API response structure
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error('Error updating team:', error);
    }
  };

  const deleteTeam = async (teamId) => {
    try {
      await axios.delete(`http://localhost:9000/api/v1/team-details/delete/${teamId}`);
      setTeams(teams.filter(team => team._id !== teamId));
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  const handleCreate = () => {
    setCurrentTeam(null);
    setIsCreateModalOpen(true);
  };

  const handleUpdate = (team) => {
    setCurrentTeam(team);
    setIsUpdateModalOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newTeam = {
      teamName: formData.get('teamName'),
      teamRank: formData.get('teamRank'),
      leagueName: formData.get('leagueName'),
      basketsIn: formData.get('basketsIn'),
      threePoint: formData.get('threePoint'),
      freeThrows: formData.get('freeThrows'),
    };

    if (currentTeam) {
      updateTeam(currentTeam._id, newTeam);
    } else {
      createTeam(newTeam);
    }
  };

  return (
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
        <div className="w-full h-[510px] mt-8 flex items-center justify-start gap-10">
          <div className="w-[98%] h-full bg-white shadow-sm ml-2 rounded-md flex flex-col">
            <div className="w-full h-[50px] flex items-center mt-6 justify-between">
              <h1 className='text-[22px] font-custom text-rgba-36-40-51-1 font-bold pl-6'>All Team Details</h1>
              <button onClick={handleCreate} className="mr-6 bg-blue-500 text-white px-4 py-2 rounded">Create Team</button>
            </div>
            <div className="w-full h-full border p-4">
              <div className="overflow-x-auto" style={{ maxWidth: "1070px", maxHeight: "500px" }}>
                <table className="table-auto min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Rank</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">League Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Baskets In</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Three Pointers</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Free Throws</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teams.map((team) => (
                      <tr key={team._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{team.teamId}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{team.teamName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{team.teamRank}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{team.leagueName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{team.basketsIn}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{team.threePoint}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{team.freeThrows}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button onClick={() => handleUpdate(team)} className="text-blue-500">Update</button>
                          <button onClick={() => deleteTeam(team._id)} className="text-red-500 ml-4">Delete</button>
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
              <h2 className="text-lg font-semibold">{currentTeam ? 'Update Team' : 'Create Team'}</h2>
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                  <label className="block text-gray-700">Team Name</label>
                  <input name="teamName" defaultValue={currentTeam?.teamName || ''} className="mt-1 p-2 border rounded w-full" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Team Rank</label>
                  <input name="teamRank" defaultValue={currentTeam?.teamRank || ''} className="mt-1 p-2 border rounded w-full" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">League Name</label>
                  <input name="leagueName" defaultValue={currentTeam?.leagueName || ''} className="mt-1 p-2 border rounded w-full" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Baskets In</label>
                  <input name="basketsIn" defaultValue={currentTeam?.basketsIn || ''} className="mt-1 p-2 border rounded w-full" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Three Pointers</label>
                  <input name="threePoint" defaultValue={currentTeam?.threePoint || ''} className="mt-1 p-2 border rounded w-full" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Free Throws</label>
                  <input name="freeThrows" defaultValue={currentTeam?.freeThrows || ''} className="mt-1 p-2 border rounded w-full" required />
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={() => { setIsCreateModalOpen(false); setIsUpdateModalOpen(false); }} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{currentTeam ? 'Update' : 'Create'}</button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Teams;
