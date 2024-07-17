import React, { useState, useEffect } from 'react';
import Sliderbar from '../Sliderbar/Sliderbar';
import { FaBell } from 'react-icons/fa';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

function Schedule() {
    const [events, setEvents] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [trainingTimes, setTrainingTimes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [trainingData, setTrainingData] = useState({
        date: '',
        time: '',
        location: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = [
                    { title: 'Event 1', start: '2024-05-01' },
                    { title: 'Event 2', start: '2024-05-05' },
                ];
                setEvents(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleEditSchedule = () => {
        setEditMode(!editMode);
    };

    const handleAddTrainingTimes = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedItem(null); // Reset selected item when modal is closed
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTrainingData({ ...trainingData, [name]: value });
    };

    const handleSaveTrainingTime = () => {
        const { date, time, location } = trainingData;
        const newTrainingTime = {
            title: 'Training',
            start: `${date}T${time}`,
            location: location
        };
        setTrainingTimes([...trainingTimes, newTrainingTime]);
        setShowModal(false);
        setSelectedItem(null); // Reset selected item after saving
    };

    const handleEventClick = (arg) => {
        setSelectedItem(arg.event);
        setShowModal(true);
    };

    const handleEventTrainingClick = (arg) => {
        setSelectedItem(arg.event);
        setShowModal(true);
    };

    const handleEditInfo = () => {
        if (selectedItem) {
            if (selectedItem.extendedProps.location) {
                setTrainingData({
                    date: selectedItem.start,
                    time: '',
                    location: selectedItem.extendedProps.location
                });
            } else {
                setTrainingData({
                    date: selectedItem.start,
                    time: '',
                    location: ''
                });
            }
            setShowModal(true);
        }
    };

    return (
        <>
            <div className="flex bg-rgba-239-246-255-1">
                <div className="lg:basis-[20%] basis-[20%] md:basis-[44%] h-[100vh] rounded-[20px]  ">
                    <Sliderbar />
                </div>
                <div className="basis-[90%] lg:h-[100%] lg:m-1 md:m-1 m-1 bg-rgba-239-246-255-1 ">
                    <div className="lg:w-full w-[100%] lg:h-[60px]  flex bg-rgba-36-40-51-1 lg:mt-1 mt-3 md:mt-2 md:rounded-[16px] rounded-md lg:rounded-[16px] h-[40px] md:h-[60px] items-center justify-between  ">
                        <h1 className="text-white lg:text-md text-[13px] lg:text-lg font-custom text-center lg:ml-0 ml-2 lg:p-4 p-[10px] font-bold ">SCHEDULE</h1>
                        <div className="flex items-center space-x-6 mr-6">
                            <FaBell className="text-white text-lg" />
                            <img src="src/assets/profilepic.png" alt="Avatar" className="h-[30px] w-[30px] rounded-full bg-white cursor-pointer" />
                        </div>
                    </div>
                    <div className="w-full  h-[50px] mt-1 flex gap-4 items-center p-2 justify-end">
                        
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddTrainingTimes}>
                            Add Trainer Times
                        </button>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        {showModal ? (
                            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                                <div className="bg-white p-6 rounded-lg">
                                    <h2 className="text-lg font-semibold mb-4">Edit Information</h2>
                                    <div className="mb-4">
                                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                                        <input type="date" id="date" name="date" value={trainingData.date} onChange={handleInputChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                                        <input type="time" id="time" name="time" value={trainingData.time} onChange={handleInputChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                                        <input type="text" id="location" name="location" value={trainingData.location} onChange={handleInputChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md" />
                                    </div>
                                    <div className="flex justify-end">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleSaveTrainingTime}>Save</button>
                                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={handleModalClose}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-[1090px] h-[870px] bg-white shadow-sm rounded-md p-3">
                                <FullCalendar
                                    plugins={[dayGridPlugin]}
                                    initialView="dayGridMonth"
                                    events={[...events, ...trainingTimes]}
                                    eventClick={handleEventClick} // Add this line to handle event clicks
                                    dateClick={handleEventTrainingClick} // Add this line to handle training clicks
                                    eventBorderColor="#3182ce"
                                    eventTextColor="#fff"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Schedule;
