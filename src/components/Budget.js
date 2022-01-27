import React, { Component } from "react";
import PropTypes from "prop-types";
import { v1 as uuid } from "uuid";

export class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      id: 0,
      budget: 0,
      expence: 0,
      titleExpence: "",
    };
  }
  //////////////////////////////////////
  handlerBudget(event) {
    event.preventDefault();
    console.log(event.target.value);
    this.setState({
      budget: event.target.value,
    });
  }
  /////////////////////////////////////////
  setBudget() {
    var temp = this.state.budget;
    console.log(temp);
    alert("your total balance is:" + temp);
  }
  //////////////////////////////////////////
  handlerExpence(event) {
    event.preventDefault();

    this.setState({
      expence: event.target.value,
    });
  }
  ////////////////////////////////////////
  handlerReason(event) {
    event.preventDefault();

    this.setState({
      titleExpence: event.target.value,
    });
  }
  ///////////////////////////
  setExpence() {
    const newItem = {
      id: Math.floor(Math.random() * 100),
      expence: this.state.expence,
      titleExpence: this.state.titleExpence,
    };
    const Exp = {};
    const updatedItems = [...this.state.items, newItem];
    this.setState(
      {
        items: updatedItems,
      },
      () => console.log(this.state)
    );
    console.log(this.state.items.id);
  }

  calcTotalExp() {
    let tot = 0;
    console.log(tot);
  }

  deleteItem(key) {
    console.log(key);
    let list = [...this.state.items];
    const updateList = list.filter((item) => item.id !== key);
    this.setState({
      items: updateList,
    });
  }

  UpdateItem(key) {
    console.log(key);
    let list = [...this.state.items];
    const updateList = list.filter((item) => item.id !== key);
    this.setState({
      items: updateList,
    });
  }

  render() {
    console.log(this.state.items);
    let arr = localStorage.getItem("expance");
    console.log(arr);
    let tot = 0;
    let budget = this.state.budget;

    return (
      <div>
        <div className="container-fluid row">
          <div className="col-md-4" style={{ marginTop: "100px" }}>
            <h3>Add Budget</h3>
            <div className="input-group mb-3">
              <span className="input-group-text">$</span>
              <input
                type="text"
                className="form-control"
                onChange={this.handlerBudget.bind(this)}
                aria-label="Amount (to the nearest dollar)"
              />
              <span className="input-group-text">.00</span>
            </div>
            <button
              type="button"
              class="btn btn-outline-success"
              onClick={this.setBudget.bind(this)}
              style={{ marginLeft: "130px" }}
            >
              Add budget
            </button>
            <br />
            <br />
            <br />
            <br />
            Please Enter your Expence
            <input
              type="text"
              className="form-control"
              onChange={this.handlerReason.bind(this)}
            />
            <br />
            Please Enter your expence amount
            <div className="input-group mb-3">
              <span className="input-group-text">$</span>
              <input
                type="text"
                className="form-control"
                onChange={this.handlerExpence.bind(this)}
                aria-label="Amount (to the nearest dollar)"
              />
              <span className="input-group-text">.00</span>
            </div>
            <br />
            <button
              type="button"
              class="btn btn-outline-danger"
              onClick={this.setExpence.bind(this)}
              style={{ marginLeft: "130px" }}
            >
              Add Expence
            </button>
          </div>
          <div
            className="col-md-6"
            style={{ marginTop: "40px", marginLeft: "100px" }}
          >
            <table
              className="table "
              style={{ marginTop: "50px", border: "4px solid lightblue" }}
            >
              <thead>
                <tr>
                  <td colspan="4">
                    <h2>Total Expences</h2>
                  </td>
                </tr>
                <tr>
                  <th>Sr No</th>
                  <th>Expence Title</th>
                  <th>Expence Amount</th>
                  <th colspan="2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map((item, ind) => (
                  <tr>
                    <td key={item.id}>{ind + 1}</td>
                    <td>{item.titleExpence}</td>
                    <td>{item.expence}</td>
                    <span style={{ color: "white" }}>
                      {(tot = tot + Number(item.expence))}
                    </span>

                    <td>
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        onClick={() => this.deleteItem(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="table table-dark " style={{ marginTop: "50px" }}>
              <thead>
                <tr>
                  <td colspan="3">
                    <h2>Total Budget</h2>
                  </td>
                </tr>
                <tr>
                  <th>Total budget</th>
                  <th>Total Expances</th>
                  <th>Remaining Funds</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.budget}</td>
                  <td>{tot}</td>
                  <td>{(budget = budget - tot)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Budget;
