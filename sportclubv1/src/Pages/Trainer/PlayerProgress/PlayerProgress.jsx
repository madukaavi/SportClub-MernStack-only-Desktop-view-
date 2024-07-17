import React, { useState } from 'react';
import Sliderbar from '../Sliderbar/Sliderbar';
import { FaBell } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { VictoryPie, VictoryLegend } from 'victory';

const data = [
  { date: 'Jan', player1: 5, player2: 5, player3: 6, player4: 5, player5: 20, player6: 5, player7: 32, player8: 5 },
  { date: 'Feb', player1: 8, player2: 3, player3: 7, player4: 8, player5: 34, player6: 5, player7: 36, player8: 33 },
  { date: 'Mar', player1: 3, player2: 5, player3: 7, player4: 5, player5: 34, player6: 3, player7: 35, player8: 34 },
  { date: 'Apr', player1: 2, player2: 2, player3: 3, player4: 6, player5: 34, player6: 6, player7: 45, player8: 33 },
  // Add more data for other months as needed
];

const playerMapping = {
  player1: 'player1',
  player2: 'player2',
  player3: 'player3',
  player4: 'player4',
  player5: 'player5',
  player6: 'player6',
  player7: 'player7',
  player8: 'player8'
};

const monthlyStats = [
  { month: 'January', Attend: 80, Miss: 20 },
  { month: 'February', Attend: 70, Miss: 30 },
  // Add more months here...
];

const COLORS = ['#FFA500', '#000000']; // Orange for Attendance, Black for Missed Attendance

const PlayerProgress = () => {
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const [selectedMonth, setSelectedMonth] = useState('January'); // State to hold selected month

  // Filter data based on selected month
  const filteredData = monthlyStats.find(item => item.month === selectedMonth);

  // Progress Table Data row
  const prodata = [
    ["2024.03.01", 6, "5", "5", "5", "20", "5", "32", "5"],
    ["2024.03.01", 7, "3", "8", "8", "34", "5", "36", "33"],
    ["2024.03.01", 7, "5", "3", "3", "34", "3", "35", "34"],
    ["2024.03.01", 3, "2", "2", "6", "34", "6", "45", "33"]
  ];
  // Progress Table Data colums
  const columnNames = ["Data", "Free Throws", "Right Layups in", "Left Layups in", "Around World shots", "Three Pointers", "Defensive Shoot", "Around Neck", "Around the Head"];

  // Main-Sub-4-Cards Variables Declare
  const [totalnoofplayers] = useState('15');
  const [totalnoofteams] = useState('09');
  const [gameslost] = useState('03');
  const [gameswon] = useState('12');

  return (
    <>
      {/*slider-import-section */}
      <div className="flex bg-rgba-239-246-255-1">
        <div className="lg:basis-[20%] basis-[20%] md:basis-[44%] h-[100vh] rounded-[20px]  ">
          <Sliderbar />
        </div>
        {/*main-player-progress-with- top- bar*/}
        <div className="basis-[90%] lg:h-[100%] lg:m-1 md:m-1 m-1 bg-rgba-239-246-255-1 ">
          <div className="lg:w-full w-[100%] lg:h-[60px]  flex bg-rgba-36-40-51-1 lg:mt-1 mt-3 md:mt-2 md:rounded-[16px] rounded-md lg:rounded-[16px] h-[40px] md:h-[60px] items-center justify-between  ">
            <h1 className="text-white lg:text-md text-[13px] lg:text-lg font-custom text-center lg:ml-0 ml-2 lg:p-4 p-[10px] font-bold ">PLAYER PROGRESS</h1>
            <div className="flex items-center space-x-6 mr-6">
              <FaBell className="text-white text-lg" />
              <img src="src/assets/profilepic.png" alt="Avatar" className="h-[30px] w-[30px] rounded-full bg-white cursor-pointer" />
            </div>
          </div>
          {/*main-sub-4-cards */}
          <div className="w-full h-[138px]  mt-4 flex  items-center justify-start gap-10">
            <div className="w-[240px] h-full border bg-white shadow-sm ml-2 rounded-md flex flex-col items-center justify-center">
              <h1 className='text-[40px] font-custom text-rgba-36-40-51-1 font-normal'>{totalnoofplayers}</h1>
              <h1 className='text-[15px] font-custom text-rgba-36-40-51-1 font-bold'>Total No Of Players</h1>
            </div>
            <div className="w-[240px] h-full border bg-white shadow-sm rounded-md flex flex-col items-center justify-center">
              <h1 className='text-[40px] font-custom text-rgba-36-40-51-1 font-normal'>{totalnoofteams}</h1>
              <h1 className='text-[15px] font-custom text-rgba-36-40-51-1 font-bold'>Total No Of Teams</h1>
            </div>
            <div className="w-[240px] h-full border bg-white shadow-sm rounded-md flex flex-col items-center justify-center">
              <h1 className='text-[40px] font-custom text-rgba-36-40-51-1 font-normal'>{gameslost}</h1>
              <h1 className='text-[15px] font-custom text-rgba-36-40-51-1 font-bold'>Games Lost</h1>
            </div>
            <div className="w-[240px] h-full border bg-white shadow-sm rounded-md flex flex-col items-center justify-center">
              <h1 className='text-[40px] font-custom text-rgba-36-40-51-1 font-normal'>{gameswon}</h1>
              <h1 className='text-[15px] font-custom text-rgba-36-40-51-1 font-bold'>Games Won</h1>
            </div>
          </div>
          {/*main-chart section with progress section */}
          <div className="w-full h-[360px]  mt-4 flex justify-start gap-10">
            <div className="w-[73%]  h-full ml-2 rounded-md shadow-sm bg-white">
              <div className="w-full  h-[50px] flex items-center gap-5">

                {/*progress-text-main */}
                <h1 className='text-[22px] font-custom text-rgba-36-40-51-1 font-bold pl-2'>Progress Stats</h1>
                {/*chart-filters */}
                <label htmlFor="selectFilter" className='outline-none'></label>
                <select id="selectFilter" value={selectedFilter} className='m w-30 border rounded-md outline-none' onChange={handleFilterChange}>
                  <option value="" className='font-custom'>Default</option>
                  {Object.keys(playerMapping).map(player => (
                    <option key={player} value={player} className='font-custom'>{player}</option>
                  ))}
                </select>
              </div>
              {/*main-charts-section */}
              <div >
                <BarChart
                  width={800}
                  height={290}
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {selectedFilter === '' && (
                    <>
                      {Object.keys(playerMapping).map((player, index) => (
                        <Bar key={index} dataKey={playerMapping[player]} fill={index % 2 === 0 ? 'black' : 'orange'} barSize={20} fontFamily='font-custom' />
                      ))}
                    </>
                  )}
                  {selectedFilter !== '' && (
                    <Bar dataKey={playerMapping[selectedFilter]} fill="black" barSize={20} fontFamily='font-custom' />
                  )}
                </BarChart>
              </div>
            </div>
            {/*attendance-section */}
            <div className="w-[22%] h-full bg-white rounded-md shdow-sm">
              <div className="w-full  h-[50px] flex items-center gap-4">
                {/*attendance-text */}
                <h1 className='text-[22px] font-custom text-rgba-36-40-51-1 font-bold pl-3'>Attendance</h1>
                {/*attendance-text-filter */}
                <select onChange={e => setSelectedMonth(e.target.value)} className='outline-none border rounded-md'>
                  {monthlyStats.map(item => (
                    <option key={item.month} value={item.month}>{item.month}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <VictoryPie
                  data={[
                    { x: 'Attend', y: filteredData.Attend },
                    { x: 'Miss', y: filteredData.Miss },
                  ]}
                  colorScale={COLORS}
                  innerRadius={100}
                  style={{ labels: { fill: 'black', fontSize: 16, fontWeight: 'light', } }}
                  label={({ datum }) => `${datum.y}`}
                />
                <VictoryLegend
                  x={160}
                  y={10}
                  orientation="horizontal"
                  gutter={20}
                  data={[
                    { name: `Attend: ${filteredData.Attend}`, symbol: { fill: COLORS[0] } },
                    { name: `Miss: ${filteredData.Miss}`, symbol: { fill: COLORS[1] } },
                  ]}
                  style={{ labels: { fill: 'black', fontSize: 17, fontWeight: 'light', textAlign: 'center' } }}
                />
              </div>
            </div>
          </div>
          {/*-----Progress-----Table-Area-----*/}
          <div className="w-full  h-[308px] mt-4 flex justify-start ">
            <div className="w-[800px] h-full ml-2 rounded-md shadow-sm bg-white">
              <div className="w-full  h-[50px] flex items-center gap-4">
                {/*-----Progress-----Main--Text---*/}
                <h1 className='text-[22px] font-custom text-rgba-36-40-51-1 font-bold pl-3'>Progress Information</h1>
              </div>
              {/*-----Progress-----table deatils--Views-----*/}
              <div style={{ width: "800px", height: "260px", overflow: "auto", padding: "20px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {columnNames.map((columnName, index) => (
                        <th key={index} style={{ border: "1px solid #000", padding: "8px", backgroundColor: "#000", color: "#fff", fontSize: "12px", fontFamily: "Roboto" }}>{columnName}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {prodata.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                          <td key={colIndex} style={{ border: "1px solid #ccc", padding: "8px" }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/*-----Progress-----table deatils--Views-----*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerProgress;
