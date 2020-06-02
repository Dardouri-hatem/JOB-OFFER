import React, { useState } from "react";
import { connect } from "react-redux";
import "./users.css";
import {Accordion,Alert } from "react-bootstrap";
import {loginDoctor} from "../../JS/actions/doctorAction"
import {clearErrors} from "../../JS/actions/errorActions"
import {Redirect} from "react-router-dom"

function EntrLogin(props) {
  const [state, setstate] = useState({
    email: "",
    password: "",
    name: "",
    msg: null,
  });


  const handleChange=(e)=>{
      setstate({...state,[e.target.name] : e.target.value})  
  }

  
const login=(e,payload)=>{
  e.preventDefault()
  props.loginDoctor(payload)
}

return(
<div className = 'opecity'>
<div className="container-login-doctor">
{props.isAuthenticated ? <Redirect to ="/jobs"/>:null}
<Accordion defaultActiveKey="0" className="container mt-5">
  <Accordion.Collapse eventKey="0">
    <form className="login-container">
    {props.error.id !=="LOGIN_FAIL" ? null :<Alert  variant="danger">{props.error.msg}</Alert>}

      <h3> Sign In </h3>
      <div className="form-group">
        <label>Email</label>
        <input
          type="text"
          className="form-control"
          placeholder="Email"
          name ="email"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          name = "password"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn-log btn btn-block" onClick={(e)=>login(e,{email:state.email,password :state.password})} >
        Login
      </button>
      <hr></hr>
    </form>
  </Accordion.Collapse>
</Accordion>
</div>
</div>
);
}


const mapStateToProps=state=>{
    return{error : state.error,
      isAuthenticated : state.auth.token   
    }
}
export default connect(mapStateToProps,{loginDoctor,clearErrors})(EntrLogin)