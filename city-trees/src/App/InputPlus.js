import React, { Component } from "react"
import Autosuggest from "react-autosuggest"
import { blackList } from './Shared'
import axios from "axios"
import Api from './Api'
import { capitalize } from './Shared'
// import { blackList } from './Shared'




function getSuggestionValue(suggestion) {
  console.log(suggestion)
  return suggestion
}

function renderSuggestion(suggestion) {
  console.log(suggestion)
  return <span>{suggestion}</span>
}

function renderSectionTitle(section) {
  let title
  let d = Object.keys(section)[0]
  console.log(Object.keys(section)[0])
  if (d === "nta_name") {
    title = "neighborhood"
  } else if (d === "spc_common") {
    title = "common name"
  } else {
    title = d
  }
  return <strong>{d}</strong>
}



class InputPlus extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: "",
      suggestions: [],
      filtered: {}
    }
  }
  getSectionSuggestions = (section)=> {
    console.log(section)
    this.setState({section})
  return section[Object.keys(section)]

}
  // componentWillUpdate(nextProps, nextState) {
  //   console.log(nextProps, nextState)
  //   console.log(this.state.click)
  //   //   console.log('Component will update!');
  //   if (nextProps.filtered !== undefined && nextProps.filtered !== nextState.filtered) {
  //     // console.log("here", this.props.searchString, this.props.filtered, this.state.filtered)
  //     this.state.click !== 'click' && this.setState({
  //       suggestions: this.getSuggestions(this.props.searchString, nextProps.filtered),
  //       filtered: nextProps.filtered
  //     })
  //   }
  // }


  onChange = (event, { newValue, method }) => {
    // console.log(event.target)
    this.setState({
      value: newValue,
    })
    method === 'click' && this.props.onchange(newValue, this.state.section)
  }

  filterTrees = async (srch, data) => {
    const trees = data.data
    console.log(srch, trees)
    const arr = []
    const arr2 = []
    const arr3 = []

    const filtered = {}
    const filteredMap = {}
    trees && trees.map((obj, i) => {
      Object.entries(obj).map((str, index) => {
        if (typeof str[1] === "string" && !blackList().includes(str[0])) {
          if (
            str[1].includes(srch) ||
            str[1].includes(srch.toLowerCase()) ||
            str[1].includes(srch.toUpperCase()) ||
            str[1].includes(capitalize(srch))
          ) {
            if (!arr.includes(str[0])) {
              arr.push(str[0])
              arr2.push({ [str[0]]: [str[1]] })

            }
        


            arr2.forEach(e => Object.keys(e)[0] === str[0]
              && !e[str[0]].includes(str[1])
              && e[str[0]].length < 5
              && e[str[0]].push(str[1])
            )

          }
        }
      })
    })
    console.log(arr2)
    return arr2
  }

  // // Teach Autosuggest how to calculate suggestions for any given input value.
  // getSuggestions = (value, arr) => {
  //   // console.log('hi there', value, arr)
  //   const inputValue = value.trim().toLowerCase()
  //   const inputLength = inputValue.length
  //   // console.log("ip", inputValue, arr)
  //   if (arr && Object.keys(arr).length !== 0) {

  //     let data =
  //       inputLength === 0
  //         ? []
  //         : Object.keys(arr)
  //           .reverse()
  //           .map(key => {

  //             return {
  //               title: key,
  //               [key]: arr[key]
  //                 .sort()
  //                 .slice(0, 6)
  //                 .map(e => e)
  //             }
  //           })
  //     let flattened = [].concat.apply([], data)
  //     console.log(flattened.sort())
  //     return flattened.sort()

  //   } else {
  //     return []
  //   }
  // }

  onSuggestionsFetchRequested = async ({ value }) => {

    if (this.lastRequestId !== null) {
      clearTimeout(this.lastRequestId);
    }

    this.lastRequestId = setTimeout(async () => {
      let data = value.length > 2 && await axios
        .get(Api(value))
        // .then(e => e.data)
        .then(e => this.filterTrees(value, e))
      console.log(data)
      this.setState({
        suggestions: data
      });
    }, 500);
  }


  // onSuggestionsClearRequested = () => {
  //   this.setState({
  //     suggestions: []
  //   })
  // }

  render() {
    console.log(this.state)
    // console.log(this.props.filtered)
    const { value, suggestions } = this.state
    const filtered = this.props.filtered

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "search...",
      value: this.state.value,
      onChange: this.onChange,
      onClick: this.props.scrollToView,
      type: "text",
      name: "input",
      style: {
        transform: "translate(-10%, 25%)",
        background: "lightyellow",
        width: "130%"
      }
    }

    return (
      <Autosuggest
        multiSection={true}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        // onSuggestionSelected={this.onSuggestionSelected}
        renderSectionTitle={renderSectionTitle}
        getSectionSuggestions={this.getSectionSuggestions}
        inputProps={inputProps}
      // className="search-input"

      />
    )
  }
}

export default InputPlus
