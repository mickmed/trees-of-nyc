import React, { Component } from "react";
import "./style.css";
import axios from "axios";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: []
    };
  }

  componentDidMount() {
    const TELEPORT_URL =
      "https://api.teleport.org/api/";
    axios
      .get(TELEPORT_URL)
      .then(response => {
        const cities = response.data;
        this.setState({
          cities: cities
        });
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  }
  render() {
    const citiesData = this.state.cities;
    console.log(citiesData)

    return (
      <div className="App">
      
        null
      </div>
    );
  }
}

export default App