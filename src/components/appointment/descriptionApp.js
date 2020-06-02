import {connect} from 'react-redux'
import {deleteAppointment,confirmAppointment} from "../../JS/actions/appointmentsAction"
import React, { Component } from 'react'
import FullScreenDialog from "./videoConsult"

class DescriptionApp extends Component {
  handleDelete=(id)=>{
    this.props.deleteAppointment(id)
    this.props.displayDescription([])
  }
  handleConfirm=(id)=>{
    this.props.confirmAppointment(id)
  }
  render() {
    return (
      <div className="appointment-details">
          {this.props.appointment.map(currentApp=>
              <div key={currentApp._id}>
          <li className="appointment-header">
            <i className="fa fa-calendar mr-2 ml-2" aria-hidden="true"></i>
            {currentApp.date} at <i class="fa fa-clock-o mr-2" aria-hidden="true"></i> {currentApp.time}
          </li>
          {this.props.doctorsList
            .filter((doc) => doc._id === currentApp.idEmp)
            .map((doc) => (
                <>
              <li className="appointment-body">
                <h6>{doc.practiceName}</h6>
                <p>
                  {doc.speciality}
                  <br></br>
                  {doc.address}
                </p>
              </li>
              <hr></hr>
              <li className ="container">
              <i className="fa fa-times mr-2 cancel-app mr-4" aria-hidden="true"
              onClick={()=>this.handleDelete(currentApp._id)}
              > Cancel candidature</i>
              {this.props.userType!=="doctor"?null :
              currentApp.confirmation ==='confirmed' ?null:
             <i class="fa fa-check confirm-app" aria-hidden="true" onClick={
               ()=>this.handleConfirm(currentApp._id)}> Select candidature</i>
            }
                   </li>
                   <hr></hr>

              <li className='li-details'>
                  <h6> <i className="fa fa-user mr-2" aria-hidden="true"/> Patient Name </h6> 
                  <p className ='p-details'>
                  {currentApp.patientName}
                  </p>
              </li>
              <hr></hr>
              <li  className='li-details'><h6><i className="fa fa-phone mr-2" aria-hidden="true"/>
              Doctor phone </h6>
              <p className ='p-details'>
              {doc.phone}
              </p>
              </li>
              <hr></hr>
              <li  className='li-details'><h6><i className="fa fa-envelope-o mr-2" aria-hidden="true"/>
              Doctor email </h6>
              <p className ='p-details'>
              {doc.email}
              </p>
              </li>
              <hr></hr>
              <li  className='li-details'><h6><i className="fa fa-map-marker mr-2" aria-hidden="true"></i>
              Address</h6>
              <p className ='p-details'>
              {doc.address}
              </p>
              </li>
              <hr></hr>
              <li  className='li-details'><h6><i className="fa fa-credit-card-alt mr-2" aria-hidden="true"></i>
              Means of payment</h6>
              <p className ='p-details'>
              Checks, cash and bank cards
              </p>
              </li>
              <hr/>
              <hr></hr>
              <div className="container">
              <FullScreenDialog />
              </div>
              </>
            ))}
              </div>
              )}
   </div>
  )
  }
}


 
const mapStateToProps = (state) => {
    return {doctorsList: state.doctor.doctorsList,
        user: state.auth.user,
        userType :state.auth.userType
      };
  };

export default  connect(mapStateToProps,{deleteAppointment,confirmAppointment}) (DescriptionApp)