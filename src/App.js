import logo from "./logo.svg";
import "./App.css";
import Budget from "./components/Budget";
import Login from "./components/Login";
import Register from "./components/Register";
import { Switch, Route, Link } from "react-router-dom";
import ReactProtectedRoute from "react-route-protected";

function App() {
  return (
    <div>
      {/* <Budget/> */}
      {/* <Login/> */}
      {/* <Register/> */}

      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/Register" exact component={Register} />

        <ReactProtectedRoute
          path="/budget"
          component={Budget}
          authPath="/"
          isAuthorized={
            localStorage.getItem("userdetails") !== null ? true : false
          }
        />
      </Switch>
    </div>
  );
}

export default App;
