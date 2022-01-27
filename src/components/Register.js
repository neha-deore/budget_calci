import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import axios from 'axios';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Link } from 'react-router-dom';
const bcrypt = require("bcryptjs")
const regForName = RegExp(/^[A-Za-z]/);
const regForEve = RegExp(/^(?!^ +$)^.+$/);
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);



export class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            prodata: [], name: '', email: '', password: '', confirm_password: '',  encry_pass: '', errors: {
                name: '',
                email: '',
                password: '',
                confirm_password: ''



            }, err: {
                name: '',
                email: '',
                password: '',
                confirm_password: ''



            }
        }

    }
  
    handle = (event) => {
        const { name, value } = event.target

        let errors = this.state.errors;
        let err = this.state.err;
        switch (name) {
            case 'name':
                errors.name = regForName.test(value) ? '' : 'Enter Valid first Name';
                if (errors.name !== "") { err.name = "error" }
                else { err.name = "" }
                break;


            case 'email':
                errors.email = regForEmail.test(value) ? '' : 'Enter Valid Email';
                if (errors.email !== "") { err.email = "error" }
                else { err.email = "" }
                break;
            case 'password':
                errors.password = regForEve.test(value) ? '' : 'Enter Password';
                if (errors.password !== "") { err.password = "error" }
                else { err.password = "" }
                break;
            case 'confirm_password':
                errors.confirm_password = this.state.password === value ? '' : "Password and Confirm Password does not match"
                if (errors.confirm_password !== "") { err.confirm_password = "error" }
                else { err.name = "" }
                break;

        }
        this.setState({ err, errors, [name]: value }, () => {
            console.log(errors)
        })
    }
    formSubmit = (event) => {
        event.preventDefault();

        if (this.validate(this.state.errors)) {
            if (this.state.email !== "" && this.state.password !== "" && this.state.name !== "") {
                //   alert("Details added successfully !!")
                //    this.add()

              
                    alert("Details added successfully !!")
                    console.log("Key is" + this.state.encry_pass)
                    //  this.add()
                    bcrypt.genSalt().then(salt => {
                        bcrypt.hash(this.state.password, salt).then(hash => {

                            this.setState({
                                encry_pass: hash
                            })
                            this.add()
                            console.log(this.state.encry_pass)
                        })
                    })
                    console.log("Key is" + this.state.encry_pass)


                
                
            }
            else {
                alert("Failed to Register")
            }


        }
        else {
            alert("Please Enter Valid Details");
        }
    }
    validate = (errors) => {
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        return valid;
    }
    add = (event) => {
        const URL = "http://localhost:3001/cred"
        axios.post(URL, {
            name: this.state.name,

            email: this.state.email,
            password: this.state.encry_pass

        })
            .catch(err => { console.log(err) })

    }
    render() {
        const { errors } = this.state;
        return (
            <div>
                <Grid container spacing={2} style={{ background: "#e0f5f8" }}>
                    <Grid xs={3}>

                    </Grid>
                    <Grid xs={6} style={{ height: "750px", width: "300px", background: "#1999ad", paddingLeft: "40px" }}>
                        <h1 style={{ marginLeft: "184px", color: "whitesmoke" }}>

                            {/* <MailIcon color="white" /> */}
                            <AppRegistrationIcon color="white" style={{ height: "70px", width: "70px", paddingLeft: "70px" }} />
                        </h1>
                        <TextField
                            required
                            id="outlined-required"
                            label="Name"
                            placeholder="Enter Name"
                            onChange={this.handle}
                            name="name"
                            style={{ marginLeft: "100px", background: "whitesmoke", width: "400px" }}
                        /><br />
                        {errors.name.length > 0 &&
                            <span style={{ color: 'red', marginLeft: "100px" }}>{errors.name}</span>}<br />
                        <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            placeholder="Enter Email"
                            onChange={this.handle}
                            name="email"
                            style={{ marginLeft: "100px", marginTop: "40px", background: "whitesmoke", width: "400px" }}
                        /><br />
                        {errors.email.length > 0 &&
                            <span style={{ color: 'red', marginLeft: "100px" }}>{errors.email}</span>}<br />
                        <TextField
                            required
                            id="outlined-required"
                            label="Password"
                            placeholder="Enter Password"
                            type="password"
                            onChange={this.handle}
                            name="password"
                            style={{ marginLeft: "100px", marginTop: "40px", background: "whitesmoke", width: "400px" }}
                        /><br />
                        {errors.password.length > 0 &&
                            <span style={{ color: 'red', marginLeft: "100px" }}>{errors.password}</span>}<br />
                        <TextField
                            required
                            id="outlined-required"
                            label="Confirm Password"
                            type="password"
                            placeholder="Enter Password Again"
                            onChange={this.handle}
                            name="confirm_password"
                            style={{ marginLeft: "100px", marginTop: "40px", background: "whitesmoke", width: "400px" }}
                        /><br />
                        {errors.confirm_password.length > 0 &&
                            <span style={{ color: 'red', marginLeft: "100px" }}>{errors.confirm_password}</span>}<br />
                        <div style={{ paddingLeft: "150px" }}>
                           
                        </div>

                        <Button variant="contained" color="success" style={{ marginLeft: "240px", marginTop: "40px" }} onClick={this.formSubmit}>Submit</Button>
                        <p style={{color:"white",textAlign:"center"}}>If already registered.<Link to="/">Click Here</Link></p>
                    </Grid>
                    <Grid xs={3}>

                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default Register
