import React, { Component } from "react";
import SocialLogin from "./SocialLogin";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import json from "../cred.json";
const bcrypt = require("bcryptjs");

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      // password: null,

      proData: [],
      userData: [],
      password: "",
      // LoginStatus: false
    };
  }

  componentDidMount() {
    this.setState({ proData: json.cred });
  }

  handler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  formSubmit = (event) => {
    event.preventDefault();
    let formdata = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(formdata.password);
    console.log(formdata);

    console.log(this.state.proData);

    for (var i = 0; i < this.state.proData.length; i++) {
      console.log(this.state.proData[i]);
      if (
        this.state.proData[i].email === formdata.email &&
        formdata.email !== ""
      ) {
        //  alert("Ok")
        bcrypt
          .compare(formdata.password, this.state.proData[i].password)
          .then((result) => {
            if (result === true) {
              alert("Login Successful");
              this.setState({
                userData: [
                  ...this.state.userData, //spread operator
                  {
                    email: formdata.email,
                    password: formdata.password,
                  },
                ],
              });

              localStorage.setItem("userdetails", formdata.email);
              this.props.history.push("/budget");

              //    break;
            } else {
              alert("Not Valid");
            }
          });
      } else {
        //  alert("not")
        console.log("Not");
        //  break;
      }
    }

    // console.log(this.state)
    /* document.getElementById('email').value = '';
         document.getElementById('password').value = '';*/
    // console.log(this.state)
  };

  render() {
    return (
      <div>
        <Grid
          container
          spacing={2}
          style={{ background: "#e0f5f8", height: "700px" }}
        >
          <Grid xs={3}></Grid>
          <Grid
            xs={6}
            style={{
              height: "450px",
              width: "300px",
              backgroundColor: "lightcoral",
              paddingLeft: "40px",
              marginTop: "100px",
            }}
          >
            <h1 style={{ marginLeft: "184px", color: "whitesmoke" }}>
              <LoginIcon
                color="white"
                style={{ height: "70px", width: "70px", paddingLeft: "70px" }}
              />
              Login
            </h1>

            <TextField
              required
              id="outlined-required"
              label="Email"
              placeholder="Enter Email"
              onChange={this.handler}
              name="email"
              style={{
                marginLeft: "100px",
                marginTop: "40px",
                background: "whitesmoke",
                width: "400px",
              }}
            />
            <br />

            <TextField
              required
              id="outlined-required"
              label="Password"
              placeholder="Enter Password"
              type="password"
              onChange={this.handler}
              name="password"
              style={{
                marginLeft: "100px",
                marginTop: "40px",
                background: "whitesmoke",
                width: "400px",
              }}
            />
            <br />

            <Button
              variant="contained"
              color="success"
              style={{ marginLeft: "260px", marginTop: "40px" }}
              onClick={this.formSubmit}
            >
              Submit
            </Button>
            <p style={{ color: "white", textAlign: "center" }}>
              If not registered.<Link to="/Register">Click Here</Link>
            </p>
            <br />
            <SocialLogin />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Login;

var abc = {
  xyz: "pws",
};
