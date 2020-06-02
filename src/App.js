import React from 'react';
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/header'
import {BrowserRouter as Router, Route} from "react-router-dom";
import Users from './components/login/users'
import EntrLogin from './components/login/entrLogin'
import Home from './components/home'
import ProfileUser from "./components/profileUser/profileUser"
import DoctorCard from './components/doctors/doctorCard'
import AddJobOffer from "./components/addJobOffer/addJobOffer"
import AppointmentApp  from "./components/modalAddAppointment/AppointmentApp"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Appointments from "./components/appointment/appointment"




function App() {
  return (
    
    <Router>
     <div className="App">
        <Header />
        <Route path='/' exact component ={Home}/>
        <Route path='/login' exact component ={Users}/>
        <Route path='/entr_login' exact component ={EntrLogin}/>
        <Route path="/profile" exact component = {ProfileUser}/>
        <Route path="/jobs" exact component={DoctorCard} />
        <Route path = "/appointments" exact component = {Appointments} />
        <Route path = "/add_job_offer" exact component = {AddJobOffer} />
        <MuiThemeProvider>
        <Route path = "/appointment/:jobId" exact component = {AppointmentApp} />
        </MuiThemeProvider>
     </div>
    </Router>
    
  );
}

export default App;
