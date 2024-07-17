import React, { useState } from 'react';
import Sliderbar from '../../Trainer/Sliderbar/Sliderbar'
import { FaBell } from 'react-icons/fa';


function Players() {

  const [players, setPlayers] = useState([
    { name: 'Aoron Macdonald', rank: '#10', picture: 'src/assets/player.png' },
    { name: 'Aoron Macdonald', rank: '#12', picture: 'src/assets/player.png' },
    { name: 'Aoron Macdonald', rank: '#13', picture: 'src/assets/player.png' },
    { name: 'Aoron Macdonald', rank: '#15', picture: 'src/assets/player.png' },
    { name: 'Aoron Macdonald', rank: '#18', picture: 'src/assets/player.png' },
    { name: 'Aoron Macdonald', rank: '#19', picture: 'src/assets/player.png' },
    { name: 'Aoron Macdonald', rank: '#20', picture: 'src/assets/player.png' },
    { name: 'Aoron Macdonald', rank: '#13', picture: 'src/assets/player.png' },
    { name: 'Aoron Macdonald', rank: '#33', picture: 'src/assets/player.png' },
    { name: 'Aoron Macdonald', rank: '#9',  picture: 'src/assets/player.png' },
  ]);

  return (
    <>
    { /*slider-import-section */}
        <div className="flex bg-rgba-239-246-255-1">
        <div className="lg:basis-[20%] basis-[20%] md:basis-[44%] h-[100vh] rounded-[20px]  ">
          <Sliderbar  />
        </div>
        { /*main-content-with- top- bar*/}
        <div className="basis-[90%] lg:h-[100%] lg:m-1 md:m-1 m-1 bg-rgba-239-246-255-1 ">
        <div className="lg:w-full w-[100%] lg:h-[60px]  flex bg-rgba-36-40-51-1 lg:mt-1 mt-3 md:mt-2 md:rounded-[16px] rounded-md lg:rounded-[16px] h-[40px] md:h-[60px] items-center justify-between  ">
        <h1 className="text-white lg:text-md text-[13px] lg:text-lg font-custom text-center lg:ml-0 ml-2 lg:p-4 p-[10px] font-bold ">PLAYERS</h1>
        <div className="flex items-center space-x-6 mr-6">
        <FaBell className="text-white text-lg" />
        <img src="src/assets/profilepic.png" alt="Avatar" className="h-[30px] w-[30px] rounded-full bg-white cursor-pointer" /> 
        </div>
        </div>
        { /*Team-Main-Section */}
        <div className="w-full h-[510px]  mt-8 flex  items-center justify-start gap-10">
        <div className="w-[98%] h-full  bg-white shadow-sm ml-2 rounded-md flex flex-col ">
        <div className="w-full  h-[50px] flex items-center mt-6 justify-start">
        <h1 className='text-[22px] font-custom text-rgba-36-40-51-1 font-bold pl-6'>Player Information</h1>
        </div>

        <div className="w-full  h-[400px] mt-2 flex flex-col gap-[10%] pl-6">
        <div className="w-[97%]  h-[45%] bg-gray-200 rounded-md flex p-2 gap-5">
        <div className="w-[130px] h-[160px]  rounded-md bg-white flex flex-col shadow-md">
        <div className="w-full h-[50%]  "><img src={players[1].picture} alt="" className='w-full h-full' /></div>
        <div className="w-full mt-1 h-[10%]  flex items-center justify-center"><h2 className='font-medium text-sm font-custom text-rgba-36-40-51-1'>{players[0].name}</h2></div>
        <div className="w-full mt-1 h-[35%] flex items-center justify-center"><h1 className='text-[30px] font-bold font-custom text-rgba-36-40-51-1'>{players[0].rank}</h1></div>
        </div>

        <div className="w-[130px] h-[160px]  rounded-md bg-white flex flex-col shadow-md">
        <div className="w-full h-[50%] "><img src={players[1].picture} alt="" className='w-full h-full' /></div>
        <div className="w-full mt-1 h-[10%]  flex items-center justify-center"><h2 className='font-medium text-sm font-custom text-rgba-36-40-51-1'>{players[1].name}</h2></div>
        <div className="w-full mt-1 h-[35%]  flex items-center justify-center"><h1 className='text-[30px] font-bold font-custom text-rgba-36-40-51-1'>{players[1].rank}</h1></div>
        </div>

        <div className="w-[130px]  h-[160px]  rounded-md bg-white flex flex-col shadow-md">
        <div className="w-full h-[50%] "><img src={players[1].picture} alt="" className='w-full h-full' /></div>
        <div className="w-full mt-1 h-[10%]   flex items-center justify-center"><h2 className='font-medium text-sm font-custom text-rgba-36-40-51-1'>{players[2].name}</h2></div>
        <div className="w-full mt-1 h-[35%] flex items-center justify-center"><h1 className='text-[30px] font-bold font-custom text-rgba-36-40-51-1'>{players[2].rank}</h1></div>
        </div>

          <div className="w-[130px]  h-[160px]  rounded-md bg-white flex flex-col shadow-md">
          <div className="w-full h-[50%]   "><img src={players[1].picture} alt="" className='w-full h-full' /></div>
          <div className="w-full mt-1 h-[10%]  flex items-center justify-center"><h2 className='font-medium text-sm font-custom text-rgba-36-40-51-1'>{players[3].name}</h2></div>
          <div className="w-full mt-1 h-[35%]  flex items-center justify-center"><h1 className='text-[30px] font-bold font-custom text-rgba-36-40-51-1'>{players[3].rank}</h1></div>
          </div>

          <div className="w-[130px] h-[160px]  rounded-md bg-white flex flex-col shadow-md">
          <div className="w-full h-[50%]  "><img src={players[1].picture} alt="" className='w-full h-full' /></div>
          <div className="w-full mt-1 h-[10%]  flex items-center justify-center"><h2 className='font-medium text-sm font-custom text-rgba-36-40-51-1'>{players[4].name}</h2></div>
          <div className="w-full mt-1 h-[35%]  flex items-center justify-center"><h1 className='text-[30px] font-bold font-custom text-rgba-36-40-51-1'>{players[4].rank}</h1></div>
          </div>

          <div className="w-[130px]  h-[160px]  rounded-md bg-white flex flex-col shadow-md">
          <div className="w-full h-[50%]  "><img src={players[1].picture} alt="" className='w-full h-full' /></div>
          <div className="w-full mt-1 h-[10%]   flex items-center justify-center"><h2 className='font-medium text-sm font-custom text-rgba-36-40-51-1'>{players[5].name}</h2></div>
          <div className="w-full mt-1 h-[35%]  flex items-center justify-center"><h1 className='text-[30px] font-bold font-custom text-rgba-36-40-51-1'>{players[5].rank}</h1></div>
          </div>

          <div className="w-[130px]  h-[160px]  rounded-md bg-white flex flex-col shadow-md">
          <div className="w-full h-[50%]   "><img src={players[1].picture} alt="" className='w-full h-full' /></div>
          <div className="w-full mt-1 h-[10%]  flex items-center justify-center"><h2 className='font-medium text-sm font-custom text-rgba-36-40-51-1'>{players[0].name}</h2></div>
          <div className="w-full mt-1 h-[35%]  flex items-center justify-center"><h1 className='text-[30px] font-bold font-custom text-rgba-36-40-51-1'>{players[0].rank}</h1></div>
          </div>

          </div>
          <div className="w-[97%]  h-[45%] bg-gray-200 rounded-md p-2 gap-5 flex">
          <div className="w-[130px]  h-[160px]  rounded-md bg-white flex flex-col shadow-md">
          <div className="w-full h-[50%] "><img src={players[1].picture} alt="" className='w-full h-full' /></div>
          <div className="w-full mt-1 h-[10%]   flex items-center justify-center"><h2 className='font-medium text-sm font-custom text-rgba-36-40-51-1'>{players[6].name}</h2></div>
          <div className="w-full mt-1 h-[35%]   flex items-center justify-center"><h1 className='text-[30px] font-bold font-custom text-rgba-36-40-51-1'>{players[6].rank}</h1></div>
          </div>

          <div className="w-[130px]  h-[160px]  rounded-md bg-white flex flex-col shadow-md">
          <div className="w-full h-[50%] "><img src={players[1].picture} alt="" className='w-full h-full' /></div>
          <div className="w-full mt-1 h-[10%]  flex items-center justify-center"><h2 className='font-medium text-sm font-custom text-rgba-36-40-51-1'>{players[7].name}</h2></div>
          <div className="w-full mt-1 h-[35%]  flex items-center justify-center"><h1 className='text-[30px] font-bold font-custom text-rgba-36-40-51-1'>{players[7].rank}</h1></div>
          </div>

          <div className="w-[130px] h-[160px]  rounded-md bg-white flex flex-col shadow-md">
          <div className="w-full h-[50%]  "><img src={players[1].picture} alt="" className='w-full h-full' /></div>
          <div className="w-full mt-1 h-[10%]  flex items-center justify-center"><h2 className='font-medium text-sm font-custom text-rgba-36-40-51-1'>{players[8].name}</h2></div>
          <div className="w-full mt-1 h-[35%]   flex items-center justify-center"><h1 className='text-[30px] font-bold font-custom text-rgba-36-40-51-1'>{players[8].rank}</h1></div>
          </div>

          <div className="w-[130px]  h-[160px]  rounded-md bg-white flex flex-col shadow-md">
          <div className="w-full h-[50%]"><img src={players[1].picture} alt="" className='w-full h-full' /></div>
          <div className="w-full mt-1 h-[10%] flex items-center justify-center"><h2 className='font-medium text-sm font-custom text-rgba-36-40-51-1'>{players[9].name}</h2></div>
          <div className="w-full mt-1 h-[35%] flex items-center justify-center"><h1 className='text-[30px] font-bold font-custom text-rgba-36-40-51-1'>{players[9].rank}</h1></div>
          </div>

          <div className="w-[130px]  h-[160px]  rounded-md bg-white flex flex-col shadow-md">
          <div className="w-full h-[50%] border"><img src={players[1].picture} alt="" className='w-full h-full' /></div>
          <div className="w-full mt-1 h-[10%]   flex items-center justify-center"><h2 className='font-medium text-sm font-custom text-rgba-36-40-51-1'>{players[0].name}</h2></div>
          <div className="w-full mt-1 h-[35%]   flex items-center justify-center"><h1 className='text-[30px] font-bold font-custom text-rgba-36-40-51-1'>{players[0].rank}</h1></div>
          </div>

          <div className="w-[130px]  h-[160px] rounded-md bg-white flex flex-col shadow-md">
          <div className="w-full h-[50%] "><img src={players[1].picture} alt="" className='w-full h-full' /></div>
          <div className="w-full mt-1 h-[10%]  flex items-center justify-center"><h2 className='font-medium text-sm font-custom text-rgba-36-40-51-1'>{players[0].name}</h2></div>
          <div className="w-full mt-1 h-[35%]  flex items-center justify-center"><h1 className='text-[30px] font-bold font-custom text-rgba-36-40-51-1'>{players[0].rank}</h1></div>
          </div>
          
          <div className="w-[130px]  h-[160px]  rounded-md bg-white flex flex-col shadow-md">
          <div className="w-full h-[50%] border"><img src={players[1].picture} alt="" className='w-full h-full' /></div>
          <div className="w-full mt-1 h-[10%]   flex items-center justify-center"><h2 className='font-medium text-sm font-custom text-rgba-36-40-51-1'>{players[0].name}</h2></div>
          <div className="w-full mt-1 h-[35%]   flex items-center justify-center"><h1 className='text-[30px] font-bold font-custom text-rgba-36-40-51-1'>{players[0].rank}</h1></div>
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

export default Players;