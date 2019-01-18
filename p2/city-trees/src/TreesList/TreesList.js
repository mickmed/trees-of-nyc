import React from "react";
import Tree from "./Tree";
import axios from "axios";
const boros = ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"];
const status = ["Alive", "Stump", "Dead"];
const health = ["Good", "Fair", "Poor"];

class TreesList extends React.Component {
  constructor() {
    super();
    this.state = {
      trees: [],
      zipSelectdefault: []
    };
  }
  //set state of rawurl and zip to obtain zips for select
  componentWillReceiveProps = props => {
    console.log(props.treesurl + props.boro);
    this.fetchData(props.treesurl + props.boro);
  };

  fetchData = async url => {
    await axios
      .get(url)
      .then(response => {
        const trees = response.data;
        this.setState({
          trees: trees
        });
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  };

  render() {
    let snipPrpStr = str => {
      let prpstr = str.substring(str.indexOf("=") + 1);
      return prpstr;
    };

    // //https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript

    const trees = (
      <div>
        {this.props.treesData.map((tree, index) => {
          return <Tree key={index} trees={tree} />;
        })}
      </div>
    );

    const borosList = (
      <div>
        {boros.map((el, id) => {
          return (
            <button
              key={id}
              onClick={this.props.boroClk}
              value={"&boroname=" + el}
              style={{
                backgroundColor:
                  snipPrpStr(this.props.boro) === el ? "lightgreen" : "yellow"
              }}
            >
              {el}
            </button>
          );
        })}
      </div>
    );

    const statusList = (
      <div>
        {status.map((el, id) => {
          return (
            <button
              key={id}
              onClick={this.props.sttsClk}
              value={"&status=" + el}
              style={{
                backgroundColor:
                  snipPrpStr(this.props.status) === el ? "lightgreen" : "yellow"
              }}
            >
              {el}
            </button>
          );
        })}
      </div>
    );

    const healthList = (
      <div>
        {health.map((el, id) => {
          return (
            <button
              key={id}
              onClick={this.props.hlthClk}
              value={"&health=" + el}
              style={{
                backgroundColor:
                  snipPrpStr(this.props.health) === el ? "lightgreen" : "yellow"
              }}
            >
              {el}
            </button>
          );
        })}
      </div>
    );

    //make unique zipcode selects
    console.log(this.state.trees);
    const zips = this.state.trees
      .map(item => item.zipcode)
      .filter((value, index, arr) => arr.indexOf(value) === index);

    zips.sort(function(a, b) {
      return a - b;
    });
    console.log(zips);
    const zipsOpts = zips.map((el, id) => {
      // console.log(el)
      return (
        <option key={id} value={el}>
          {el}
        </option>
      );
    });

    //make unique species selects
    const species = this.state.trees
      .map(item => item.spc_common)
      .filter((value, index, arr) => arr.indexOf(value) === index);

    species.sort();
    const speciesOpts = species.map((el, id) => {
      // console.log(el)
      return (
        <option key={id} value={el}>
          {el}
        </option>
      );
    });

    ///render filter selects and buttons
    return (
      <div className="filters">
        <div className="boros">
          {borosList}
          <div className="zip" />
          {
            <select
              onChange={this.props.zipChng}
              value={snipPrpStr(this.props.zipcode)}
            >
              <option value="" disabled>
                zipcode
              </option>

              {zipsOpts}
            </select>
          }
        </div>

        <div className="status">
          {statusList}
          <div className="health">
            {this.props.status === "&status=Alive" ? healthList : null}
          </div>
        </div>

        <div className="species">
          {
            <select
              onChange={this.props.speciesChng}
              value={snipPrpStr(this.props.spcCommon)}
            >
              <option value="" disabled>
                species
              </option>
              {speciesOpts}
            </select>
          }
        </div>
        {trees}
      </div>
    );
  }
}

export default TreesList;
