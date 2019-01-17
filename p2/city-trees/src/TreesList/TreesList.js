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
      slctdBoroZips: 0
    };
  }

  componentWillReceiveProps = props => {
    console.log(props);
    // this.setState(prevState => ({
    //   trees: props.treesData
    // }));
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

  // componentDidMount() {
  //   this.fetchData(this.props.treesurl + this.props.boro);
  // }

  render() {
    // console.log(this.props.treesData);

    let snipPrpStr = str => {
      let prpstr = str.substring(str.indexOf("=") + 1);

      return prpstr;
    };

    // //https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript

    // let array = [
    //   { "name": "Joe", "age": 17 },
    //   { "name": "Bob", "age": 17 },
    //   { "name": "Carl", "age": 35 }
    // ];
    // this.props.treeData.map(item => item.age)
    //   .filter((value, index, self) => self.indexOf(value) === index)

    const unqZip = [
      ...new Set(
        this.state.trees.map((item, index) => {
          return <option key={index}>{item.zipcode}</option>;
        })
      )
    ];

    const unqSpecies = [
      ...new Set(
        this.state.trees.map((item, index) => {
          return <option key={index}>{item.spc_common}</option>;
        })
      )
    ];

    const trees = (
      <div>
        {this.props.treesData &&
          this.props.treesData.map((tree, index) => {
            return <Tree key={index} address={tree.address} />;
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

    return (
      <div>
        {borosList}
        {<select onChange={this.props.zipChng}>{unqZip}</select>}
        {statusList}
        {this.props.status === "&status=Alive" ? healthList : null}
        {/* {<select onChange={this.props.speciesChng}>{unqSpecies}</select>} */}

        {trees}
      </div>
    );
  }
}

export default TreesList;
