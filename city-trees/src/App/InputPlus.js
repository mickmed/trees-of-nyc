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
const getSuggestionValue = (suggestion) => {
  // console.log('hi',suggestion, evt)

  return suggestion
}
// Use your imagination to render suggestions.
const renderSuggestion = suggestion => <div>{suggestion}</div>

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
      suggestions: []
    }
  }
  onChange = (event, { newValue, method }) => {
    // console.log('event', event.target.value)
    console.log(newValue, method)
    this.props.onchange(newValue) 
    // method !== 'click' &&
    this.setState({
      value: newValue
    })
  }

  // onSuggestionSelected = (event, {suggestion, method}) => {
  //   console.log(event)
  //     // this.props.onchange(event)
  // }

  // onClick = (event) => {
  //   // console.log(event.target)
  //   this.props.onchange(event)
  // }


  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    // console.log(this.props.filtered && this.props.filtered)
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    console.log('ip', inputValue, this.props.filtered)
    if (this.props.filtered && Object.keys(this.props.filtered).length !==0) {
      let data = inputLength === 0
        ? []
        : // this.props.filtered.filter(lang =>
          // lang.toLowerCase().slice(0, inputLength) === inputValue)
          Object.keys(this.props.filtered).map(key => {
            return this.props.filtered[key]
              .sort()
              .slice(0, 5)
              .map(e => e)
          })
        console.log(data)
        return data[0]
    } else {
      return []
    }
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    console.log('value', value)
    this.props.onchange(value) && 
    
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
    // console.log(this.state.suggestions)
    console.log(this.props.filtered)
    const { value, suggestions } = this.state
    const filtered = this.props.filtered

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Type a programming language",
      value,
      onChange: this.onChange
      // onClick: this.onClick

    }

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        // onSuggestionSelected={this.onSuggestionSelected}
        inputProps={inputProps}
      />
    )
  }
}

export default InputPlus
