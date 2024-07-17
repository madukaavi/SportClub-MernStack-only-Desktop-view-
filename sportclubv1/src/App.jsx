import {React} from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

// Security
import LoginForm from "./Security/LoginForm/LoginForm";
import ForgotPassword from "./Security/ForgotPassword/ForgotPassword";
import OTPForm from "./Security/OTP Form/OtpForm";
import RegisterForm from "./Security/RegisterFrom/RegisterForm";

//Player
import PlayerDashboard from './Pages/Player/Dashboard/PlayerDashboard';
import PaymentHistory  from './Pages/Player/PaymentHistory/PaymentHistory';
import PlayerStats from './Pages/Player/PlayerStats/PlayerStats';
import Schedule from './Pages/Player/Schedule/Schedule';
import Teams from './Pages/Player/Teams/Teams';
import Tournaments from './Pages/Player/Tournaments/Tournaments';

//Trainer
import TrainerDashboard from './Pages/Trainer/Dashboard/TrainerDashboard';
import PlayerProgress_T from './Pages/Trainer/PlayerProgress/PlayerProgress';
import Players_T from './Pages/Trainer/Players/Players';
import Schedule_T from './Pages/Trainer/Schedule/Schedule';
import Teams_Teams from './Pages/Trainer/Teams/Teams';
import Tourments_T from './Pages/Trainer/Tournaments/Tournaments';

//Admin
import AdminLogin from './Pages/Admin/Security/AdminLogin/AdminLogin';
import AdminRegister from './Pages/Admin/Security/AdminRegister/AdminRegister';
import AdminDashboard from './Pages/Admin/Dashboard/AdminDashboard';
import Admin_Player_Progress from './Pages/Admin/PlayerProgress/PlayerProgress';
import Admin_Players from './Pages/Admin/Players/Players';
import Admin_Schedule from './Pages/Admin/Schedule/Schedule';
import Admin_Teams from './Pages/Admin/Teams/Teams';
import Admin_Tournaments from './Pages/Admin/Tournaments/Tournaments';

function App () {
  
  return (
    
    <Router>
    <Routes>
        {/*-------security-----------*/}
      
        <Route path="/" element={<LoginForm />} />
       
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/OTPForm" element={<OTPForm />} />
        <Route path="/RegisterForm" element={<RegisterForm />} />

        {/*-------Player-----------*/}
        <Route path="/PlayerDashboard" element={<PlayerDashboard />} />
        <Route path="/PaymentHistory"  element={<PaymentHistory />} />
        <Route path="/PlayerStats"     element={<PlayerStats />} />
        <Route path="/Schedule"        element={<Schedule />} />
        <Route path="/Teams"           element={<Teams />} />
        <Route path="/Tournaments"     element={<Tournaments />} />

        {/*Trainer*/}
        <Route path="/TrainerDashboard" element={<TrainerDashboard/>} />
        <Route path="/PlayerProgress_T" element={<PlayerProgress_T />} />
        <Route path="/Player_T" element={<Players_T />} />
        <Route path="/Schedule_T" element={<Schedule_T />} />
        <Route path="/Teams_Teams" element={<Teams_Teams />} />
        <Route path="/Tournaments_T" element={<Tourments_T/>} />

        {/*Admin*/}
        <Route path="/AdminLogin" element={<AdminLogin/>} />
        <Route path="/AdminRegister" element={<AdminRegister/>} />
        <Route path="/AdminDashboard" element={<AdminDashboard/>} />
        <Route path="/Admin_Player_Progress" element={<Admin_Player_Progress/>} />
        <Route path="/Admin_Players" element={<Admin_Players/>} />
        <Route path="/Admin_Schedule" element={<Admin_Schedule/>} />
        <Route path="/Admin_Teams" element={<Admin_Teams/>} />
        <Route path="/Admin_Tournaments" element={<Admin_Tournaments/>} />

        </Routes>
       </Router>
       
  );
};

export default App;
