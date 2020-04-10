import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import SitterCard from "../components/SitterCard/sitterCard";
import UserContext from "../context/UserContext";

class PetSitter extends Component {
  static contextType = UserContext;

  state = {
    petSitters: []
  };

  componentDidMount() {
    let currentComponent = this;
    axios.get(`/api/user/${this.context.user.id}/petSitters`).then(function(res) {
      console.log(res.data);
      currentComponent.setState({
        petSitters: res.data.petSitters
      });
    });
  }

  render() {
    const { user } = this.context;
    return (
      <div className="PetSitter">
        <div className="row">
          <div className="col-9">
            <h2>Pet Sitters </h2>
        </div>
        <div className="row">
          <div className="col-12">
            {this.state.petSitters < 1 ? (
              <div className="alert alert-warning mt-4" role="alert">
                You don't have pet sitters in your records
              </div>
            ) : null}
            {this.state.petSitters.map(item => (
              <SitterCard
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default PetSitter;