import React, { useState, useEffect } from 'react';
import Sliderbar from '../../Trainer/Sliderbar/Sliderbar';
import { FaBell } from 'react-icons/fa';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

function Schedule() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('your-api-endpoint');
                setEvents(response.data); // Update events state with fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {/* slider-import-section */}
            <div className="flex bg-rgba-239-246-255-1">
                <div className="lg:basis-[20%] basis-[20%] md:basis-[44%] h-[100vh] rounded-[20px]  ">
                    <Sliderbar />
                </div>
                {/* main-content-with- top- bar */}
                <div className="basis-[90%] lg:h-[100%] lg:m-1 md:m-1 m-1 bg-rgba-239-246-255-1 ">
                    <div className="lg:w-full w-[100%] lg:h-[60px]  flex bg-rgba-36-40-51-1 lg:mt-1 mt-3 md:mt-2 md:rounded-[16px] rounded-md lg:rounded-[16px] h-[40px] md:h-[60px] items-center justify-between  ">
                        <h1 className="text-white lg:text-md text-[13px] lg:text-lg font-custom text-center lg:ml-0 ml-2 lg:p-4 p-[10px] font-bold ">SCHEDULE</h1>
                        <div className="flex items-center space-x-6 mr-6">
                            <FaBell className="text-white text-lg" />
                            <img src="src/assets/profilepic.png" alt="Avatar" className="h-[30px] w-[30px] rounded-full bg-white cursor-pointer" />
                        </div>
                    </div>
                    {/* main-schedule-area-Trainer */}
                    <div className="w-[1090px] h-[870px]  mt-14 flex  items-center justify-start gap-10">
                        <div className="w-full h-full  bg-white shadow-sm ml-2 rounded-md p-3">
                            <FullCalendar
                                plugins={[dayGridPlugin]}
                                initialView="dayGridMonth"
                                events={events} // Pass fetched events data to FullCalendar component
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Schedule;
