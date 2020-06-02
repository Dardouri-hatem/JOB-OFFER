import React, { Component } from "react";
import {Form,Button} from 'react-bootstrap'
import axios from 'axios'
import {connect} from "react-redux"

class AddJob extends Component {
    state={
            name : '',
            telephone : '',
            email : '',
            post :"",
            description:'',
            deadline:"",
            idEmp : this.props.user._id
    }

handleChange=(e)=>{
this.setState({
    [e.target.name]: e.target.value
})
}
handleAdd=(e)=>{
  e.preventDefault();
    const newContact={
        name : this.state.name,
        telephone : this.state.telephone,
        email : this.state.email,
        post : this.state.post,
        description : this.state.description,
        deadline: this.state.deadline,
        idEmp : this.state.idEmp
    }
    axios.post("http://localhost:5000/jobs/add_job",newContact)
}
  render() {
    return (
      <div className = "container text-left mt-3" style = {{width : "420px"}}>
        <Form>
        <Form.Group controlId="formBasicPassword">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Entre your Name" value ={this.state.name} onChange={this.handleChange} name = "name"/>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value = {this.state.email} onChange={this.handleChange}  name ="email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Telephone</Form.Label>
            <Form.Control type="text" placeholder="Entre your phone Number"  value = {this.state.telephone} onChange={this.handleChange}  name = "telephone" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Post Number</Form.Label>
            <Form.Control type="number"  value ={this.state.post} onChange={this.handleChange} name = "post"/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Job description</Form.Label><br></br>
            <textarea    value ={this.state.description} onChange={this.handleChange} name = "description" style ={{width : '100%'}} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>DeadLine</Form.Label>
            <Form.Control type="text"  value ={this.state.deadline} onChange={this.handleChange} name = "deadline"/>
          </Form.Group>
          

          <Button variant="primary" type="submit" onClick={this.handleAdd}>
            Add
          </Button>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return {user : state.auth.user}
}
export default connect(mapStateToProps) (AddJob);
