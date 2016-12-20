// include React 
var React = require('react');

// search form component
var Search = React.createClass({

	// set an initial generic state
	// React created
	getInitialState: function(){
		return {
			searchTerm: "",
			startYr: "",
			endYr: ""
		}
	},

	// this function will respond to the user input 
	handleChange: function(event){
 		this.setState({ 
 			topic: event.target.value 
 		});

	},

	// click to submit function
	handleClick: function(){
		console.log("CLICK");
		// set parent to have the search term
 		this.props.setSearch(
 			this.state.term,
 			this.state.startYr, 
 			this.state.endYr
 		);

	},

	render: function(){

		return(

			<div className="panel panel-default">
				
				<div className="row">
					<h2>Search</h2>
				</div>
				
				<div className="row">

				<form>
					<div className="row">
    					<div className="six columns">
      
      					<label for="searchTerm">Search Terms (required)</label>
      					<input className="u-full-width" placeholder="required" id="searchTerm" type="text"></input>
    					</div>

    					<div className="six columns">
      						<div className="row">
      							<label for="startYr">Start Year</label>
      							<input className="u-full-width" placeholder="Enter the 4-digit starting year for your search" id="startYr" type="text"></input>
      						</div>

							<div className="row">
							    <label for="startYr">Start Year</label>
      							<input className="u-full-width" placeholder="Enter the 4-digit starting year for your search" id="startYr" type="text"></input>
      						</div>
      					</div>

					</div>

  					<input className="button-primary" value="Submit" type="submit"></input>

				</form>
				</div>
			
			</div>



		)
	}
});

// Export the Search component back for use in other files
module.exports = Search;