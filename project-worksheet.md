# Project Overview

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.  

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

|  Day | Deliverable | Status
|---|---| ---|
|Day 1| Project Description | Complete
|Day 2| Wireframes / Priority Matrix / Functional Components, Core Application Structure (HTML, CSS, etc.), Initial Clickable Model| Complete
|Day 3| MVP, Present | Incomplete



## Project Description

A map that shows population and other demographics of major world cities.

## Wireframes

https://drive.google.com/drive/u/0/folders/1Z1ZevfqgnntRZHu8aewaD4etL7KFsFVs

## Priority Matrix

https://drive.google.com/drive/u/0/folders/1Z1ZevfqgnntRZHu8aewaD4etL7KFsFVs 

### MVP/PostMVP - 5min


#### MVP 
	Find API
	Fetch Data
	Display Map
	Display Markers
	Display Popups
	Style Components


#### PostMVP 
	Add UI features, select menus, filters etc...

## React Architectural Design

https://drive.google.com/drive/u/0/folders/1Z1ZevfqgnntRZHu8aewaD4etL7KFsFVs



## Functional Components

Based on the initial logic defined in the previous sections try and breakdown the logic further into stateless/stateful components. 

#### SAMPLE.....
| Component | Description | 
| --- | :---: |  
| App | This will fetch the data | 
| CityList | This will map the city demographics | 
| City | This will display city info |
| Map Container | This will render the map |
| Map Blobs | This will render map blobs |
| Popup Info | Display info for popups |



| Component | Priority | Estimated Time | Actual Time |
| --- | :---: |  :---: | :---: |
| App (and fetch) | H | 1hr| 1hr |
| Get tree demographics | H | 2hrs|  |
| Display Tree Info | H | 2hrs|  |
| Display Map | H | 2hrs| 2hrs|
| Map Markers | H | 2hrs| 2hrs |
| Map Markers with Filters | H | 4hrs|  |
| Popup Info | H | 2hrs |  |
| Style | H | 5rs |  |
| Media Queries | H | 3hrs |  |
| Total | H | 18hrs |  |



## Helper Functions

| Function | Description | 
| --- | :---: |  
| ColorSelector | This will choose blob color according to population size | 


## Additional Libraries

| Library | What it Does | 
| --- | :---: |  
| Bulma/Bootstrap | Used to help style my application | 
| Font Awesome | Indicators and Clickable Icons | 


## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of an a brief description  

#### SAMPLE.....
```
function reverse(string) {
	// here is the code to reverse a string of text
}
```

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.  

#### SAMPLE.....
| Original Plan | Outcome | 
| --- | :---: |  
| Have one Book component | Split that component into BookInfo and BookInteraction as the component grew too complicated | 

## Issues and Resolutions
 Use this section to list of all major issues encountered and their resolution.

#### SAMPLE.....
**ERROR**: app.js:34 Uncaught SyntaxError: Unexpected identifier                                
**RESOLUTION**: Missing comma after first object in sources {} object
