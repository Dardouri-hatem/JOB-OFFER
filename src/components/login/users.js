import React, { useState } from "react";
import { connect } from "react-redux";
import "./users.css";
import { Card, Accordion, Button,Alert } from "react-bootstrap";
import {registerUser,login} from "../../JS/actions/authActions"
import {clearErrors} from "../../JS/actions/errorActions"
import {Redirect} from "react-router-dom"

function Users(props) {
  const [state, setstate] = useState({
    isOpen: true,
    email: "",
    password: "",
    name: "",
    msg: null,
  });

  const toggle = () => {
   setstate({...state,isOpen:!state.isOpen})
   props.clearErrors()
  };

  const handleChange=(e)=>{
      setstate({...state,[e.target.name] : e.target.value})  
  }

  const registre =(e,payload)=>{
    e.preventDefault()
    props.registerUser(payload)
    
  }
const login=(e,payload)=>{
  e.preventDefault()
  props.login(payload)
}

return(

<div className="login">
{props.isAuthenticated ? <Redirect to ="/jobs"/>:null}
<Accordion defaultActiveKey="0" className="container mt-5">
  {state.isOpen ? null : (
      <div className="login-container mb-3 text-center">
      <h6>I have already an account !!</h6>
    <Accordion.Toggle
      as={Button}
      variant="link"
      eventKey="0"
      onClick={toggle}
    >
      <span className="sign" > Sign In </span>
    </Accordion.Toggle>
    </div>
  )}
  <Accordion.Collapse eventKey="0">
    <form className="login-container">
    {props.error.id !=="LOGIN_FAIL"? null :<Alert  variant="danger">{props.error.msg}</Alert>}

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

  {!state.isOpen ? null : (
    <div className="login-container mt-3 text-center">
    <h6>Are you a new User ?</h6>
    <Accordion.Toggle
      as={Card.Header}
      variant="link"
      eventKey="1"
      onClick={toggle}
      className="bg-white border-bottom border-white"
    >
      <span className="sign">Sign Up</span>
    </Accordion.Toggle>
    </div>
  )}
  <Accordion.Collapse eventKey="1">
    <form className="login-container">
      {props.error.id !=="REGISTER_FAIL"? null :<Alert  variant="danger">{props.error.msg}</Alert>}
    
      <h3> Sign Up </h3>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Entre Name"
          name = "name"
          onChange = {handleChange}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="text"
          className="form-control"
          placeholder="Email"
          name = "email"
          onChange = {handleChange}
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
      <button type="submit" className="btn-log btn btn-block"onClick={(e)=>registre(e,{name :state.name,email:state.email,password:state.password})}>
        Registre
      </button>
    </form>
  </Accordion.Collapse>
</Accordion>
</div>
);
}


const mapStateToProps=state=>{
    return{error : state.error,
      isAuthenticated : state.auth.token   
    }
}
export default connect(mapStateToProps,{registerUser,login,clearErrors})(Users)