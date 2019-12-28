import React, { Component } from "react"
import Autosuggest from "react-autosuggest"

const languages = [
  {
    name: "C",
    year: 1972
  },
  {
    name: "Elm",
    year: 2012
  }
]

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
// const getSuggestionValue = suggestion => {
//   // console.log('hi',suggestion, evt)

//   return suggestion
// }
// Use your imagination to render suggestions.
// const renderSuggestion = suggestion => <div>{suggestion}</div>

function getSuggestionValue(suggestion) {
  console.log(suggestion)
  return suggestion
}

function renderSuggestion(suggestion) {
  // console.log(suggestion)
  return <span>{suggestion}</span>
}

function renderSectionTitle(section) {
  let title
  if (section.title === "nta_name") {
    title = "neighborhood"
  } else if (section.title === "spc_common") {
    title = "common name"
  } else {
    title = section.title
  }
  return <strong>{title}</strong>
}

function getSectionSuggestions(section) {
  // console.log(section)
  // console.log(Object.keys(section)[1])
  //   console.log(section[Object.keys(section)[0]])
    return section[Object.keys(section)[1]]
    //  return ['hi']
}

class InputPlus extends React.Component {
  constructor(props) {
    super(props)

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: "",
      suggestions: [],
      filtered: {}
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState)
    if (prevProps.filtered !== undefined && prevProps.filtered !== prevState.filtered) {
      console.log("here")
      this.setState({
        suggestions: this.getSuggestions(this.props.searchString),
        filtered: prevProps.filtered
      })
    }
  }

  onChange = (event, { newValue, method }) => {
    // console.log('event', event.target.value)
    console.log("onChange", newValue, method)
    
    this.props.onchange(newValue) 
  
    this.setState({
      value: newValue,
      filtered: this.props.filtered || {'':''}
    }) 

    // method === 'click' && this.props.onchange(newValue)

  }

  // onSuggestionSelected = (event, {suggestion, method}) => {
  //   console.blackList = () => {

  //     // this.props.onchange(event)
  // }

  // onClick = (event) => {
  //   // console.log(event.target)
  //   this.props.onchange(event)
  // }
  blackList = () => {
    return [
      "latitude",
      "longitude",
      "x_sp",
      "y_sp",
      "block_id",
      "boro_ct",
      "problems"
    ]
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    // console.log(this.props.filtered && this.props.filtered)
    // console.log(value)
    console.log(this.blackList())
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    console.log("ip", inputValue, this.props.filtered)
    if (this.props.filtered && Object.keys(this.props.filtered).length !== 0) {
      let filKeys = Object.keys(this.props.filtered).filter(
        e => !this.blackList().includes(e)
      )
      console.log(filKeys)
      let data =
        inputLength === 0
          ? []
          : // this.props.filtered.filter(lang =>
            // lang.toLowerCase().slice(0, inputLength) === inputValue)
            filKeys
              .sort()
              .map(key => {
                console.log(key)
                console.log(this.props.filtered[key])
                return {
                  title: key,
                  [key]: this.props.filtered[key]
                    .sort()
                    .slice(0, 3)
                    .map(e => e)
                }
              })

      console.log(data)
      let flattened = [].concat.apply([], data)
      return flattened.sort()
    } else {
      return []
    }
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    console.log("value", value)
    // this.props.onchange(value)

      this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  render() {
    console.log(this.state)
    console.log(this.props.filtered)
    const { value, suggestions } = this.state
    const filtered = this.props.filtered

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "search...",
      value,
      onChange: this.onChange,
      onClick: this.props.scrollToView,
      type: "text",
      name: "input",
      style: {
        transform: "translate(-10%, 15%)",
        background: "lightyellow",
        width: "130%"
      }
    }

    // Finally, render it!
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
        getSectionSuggestions={getSectionSuggestions}
        inputProps={inputProps}
        // className="search-input"
        style={{ transform: "translate(50px)", background: "green" }}
      />
    )
  }
}

export default InputPlus
