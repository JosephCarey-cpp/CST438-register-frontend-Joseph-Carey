import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


// properties addCoure is required, function called when Add clicked.
class AddStudent extends Component {
      constructor(props) {
      super(props);
      this.state = {name: ' ', email: ' ', message: ' ' };
    };
    
    handleChange = (event) =>{
        this.setState({[event.target.name]: event.target.value});
     
    }

    handleClickOpen = () => {
        
      
      console.log("AddStudent:handleClickOpen");
      const token = Cookies.get('XSRF-TOKEN');
      
      fetch(`http://localhost:8080/addStudent?email=${this.state.email}&name=${this.state.name}`,
      {
        method: 'GET',
        headers: { 'X-XSRF-TOKEN': token}
      })
      .then((response) => {
        // console.log("RES: "+response);
        return response.json();})
        .then(responseData => {
          console.log(responseData);
          if(responseData.status == 400){
            console.log("Student already exists");
            this.setState({ 
              message: "Student already exists!"
            });
          } else {
            console.log("Student added!");
            this.setState({ 
              message: "Student Added!"
            });
          }
        })
      .catch(err => console.error(err))
      
    };

    render()  {  
      const {name, email, message} = this.state;
      return (
        <div>
            <br/>
            <br/>
            <TextField autoFocus style = {{width:200}} label="Student Name" name="name" 
              onChange={this.handleChange} value={name} /> 
            <br/>
            <br/>
            <TextField autoFocus style = {{width:200}} label="Student Email" name="email" 
              onChange={this.handleChange} value={email} /> 
            <br/>
            <br/>
            <Button 
                variant="outlined" 
                color="primary" 
                style={{margin: 10}} 
                onClick={this.handleClickOpen}>
              Add Student
            </Button>
            <br/>
            <br/>
            <h3>{message}</h3>
                 
          </div>
      ); 
    }
}

// required property:  addStudent is a function to call to perform the Add action
AddStudent.propTypes = {
  addStudent : PropTypes.func.isRequired
}

export default AddStudent;