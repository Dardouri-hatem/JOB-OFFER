import React from "react";
import "./home.css";

function Home() {
  return (
    <div className="home">
      <h3>
        Make an appointment for physical consultation or online consultation
      </h3>
      <div className="warning-coronavirus">
        <h6>Together against Coronavirus (COVID-19)</h6>
      </div>
      <div className="container-presentation">
        <div className="patient">
          <h5>
            <i
              className="fa fa-user-o"
              aria-hidden="true"
              style={{ color: "#0596de", margin: "5px" }}
            ></i>
            You are a patient
          </h5>
          <h6>Limit your travels and make an appointment online</h6>
          <p>
            In accordance with travel restrictions, it is recommended that you
            perform your medical consultations on video if possible.
          </p>
        </div>
        <div className="doctor">
          <h5>
            <i
              className="fa fa-stethoscope"
              aria-hidden="true"
              style={{ color: "#0596de", margin: "5px" }}
            ></i>
            You are a doctor
          </h5>
          <h6>We supports you in the face of the COVID-19 epidemic</h6>
          <ul>
            <li>join us quickly and Offer video consultation to your patients </li>
            <li>Help your patients during the epidemic</li>
            <li>Inform your patients during the epidemic</li>
          </ul>
        </div>
      </div>
      <div className='container mt-5'>
      <h4>How it works ?</h4>
      <div className='how-work mt-5'>
      <div className="how-work-before">
      <img src="https://www.doctolib.fr/webpack/f36f20f251d157a85bdb1fbb9a082d01.svg" className="img-rdv" alt =""/><br></br>
      <span className="span-before">Before</span>
      <p>
      Make an appointment with your usual doctor and join a "video" consultation.
      </p>
      </div>
      <div className="how-work-after">
      <img src="https://www.doctolib.fr/webpack/feb750d71eb143d65e292b0cea1dd288.svg" className="img-rdv" alt=""/><br></br>
      <span className="span-before">after</span>
      <p>   
        Join your video consultation according to your appointment
      </p>
      </div>
      </div>
      </div>
      <footer>
        
      </footer>
   
    </div>
  );
}

export default Home;
