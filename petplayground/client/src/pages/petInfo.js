import React from "react";
import API from "../utils/API2";
import axios from "axios";
import PetInfoCard from "../components/petInfoCard/petInfoCard";
import UserContext from "../context/UserContext"
class PetInfo extends React.Component {
static contextType = UserContext;
  state = {
    pets: []
  };
  componentDidMount() {
    let currentComponent = this;
    axios.get(`/api/user/${this.context.user.id}/petFamily`).then(data => {
      console.log(data);
      currentComponent.setState({
        pets: data.data.pets
      });
    });
  }
  deletePet = id => {
    console.log("hello: " + id);
    // axios.delete(`/api/user/${this.context.user.id}/pet/`).then((response) => {
    //   console.log(response);
    // });
  };
  render() { 
    return (
      <div className="petInfoCont">
        <div className="container">
          <h1>Pet Info</h1>
        </div>
        {this.state.pets.map( item => (
          <PetInfoCard
          key={item._id}
          id={item._id}
          img={item.image}
          name={item.name}
          breed={item.breed}
          nickname={item.nicknames}
          birthday={item.birthday}
          temperament={item.temperament}
          diet={item.diet}
          directions={item.directions}
          deletePetCB={this.deletePet}
        />
          )
        )}
      </div>
    );
  }
}
export default PetInfo;
