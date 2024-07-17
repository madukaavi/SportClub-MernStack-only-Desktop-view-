import React, { useState, useEffect } from 'react';
import Sliderbar from '../../../Components/Sliderbar/Sliderbar';
import { FaBell } from 'react-icons/fa';

function PaymentHistory() {
  const [duePayments, setDuePayments] = useState(null);
  const [completePayments, setCompletePayments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    

    // Fetch data from API endpoint
    fetch(`http://localhost:9000/api/v1/players/find-by-id/:id`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data); // Log fetched data to console
        const { duePayments, completePayments } = data.data; // Destructure duePayments and completedPayments from data.data
        console.log('Due payments:', duePayments);
        console.log('Complete payments:', completePayments);
        // Update state with fetched data
        setDuePayments(duePayments);
        setCompletePayments(completePayments);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Loding....');
        setLoading(false);
      });
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <>
      <div className="flex bg-rgba-239-246-255-1">
        <div className="lg:basis-[20%] basis-[20%] md:basis-[44%] h-[100vh] rounded-[20px]">
          <Sliderbar />
        </div>
        <div className="basis-[90%] lg:h-[100%] lg:m-1 md:m-1 m-1 bg-rgba-239-246-255-1 ">
          <div className="lg:w-full w-[100%] lg:h-[60px]  flex bg-rgba-36-40-51-1 lg:mt-1 mt-3 md:mt-2 md:rounded-[16px] rounded-md lg:rounded-[16px] h-[40px] md:h-[60px] items-center justify-between ">
            <h1 className="text-white lg:text-md text-[13px] lg:text-lg font-custom text-center lg:ml-0 ml-2 lg:p-4 p-[10px] font-bold ">PAYMENT HISTORY</h1>
            <div className="flex items-center space-x-6 mr-6">
              <FaBell className="text-white text-lg" />
              <img src="src/assets/profilepic.png" alt="Avatar" className="h-[30px] w-[30px] rounded-full bg-white cursor-pointer" />
            </div>
          </div>
          <div className="w-full h-[182px] mt-8 flex  items-center justify-start gap-10">
            <div className="w-[278px] h-full bg-white shadow-sm ml-2 rounded-md flex flex-col items-center justify-center">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <>
                  <h1 className='text-[40px] font-custom text-rgba-36-40-51-1 font-normal'>{duePayments}</h1>
                  <h1 className='text-[15px] font-custom text-rgba-36-40-51-1  font-bold'>Due Payments</h1>
                </>
              )}
            </div>
            <div className="w-[278px] h-full  bg-white shadow-sm  rounded-md flex flex-col items-center justify-center">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <>
                  <h1 className='text-[40px] font-custom text-rgba-36-40-51-1 font-normal'>{completePayments}</h1>
                  <h1 className='text-[15px] font-custom text-rgba-36-40-51-1  font-bold'>Completed Payments</h1>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentHistory;
