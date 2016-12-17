// include React 
var React = require('react');

// include all of the sub-components
var Form = require('./Children/Search');
var Results = require('./Children/Results');
var History = require('./Children/Saved');

// helper function
var helpers = require('./utils/helpers.js');

// main component
var Main = React.createClass({

	// set a generic state associated with the number of clicks
	getInitialState: function(){
		return {
			searchTerm: "",
			results: "",
			saved: []
		}
	},	

	// function allows children to update parent
	setTerm: function(term){
		this.setState({
			searchTerm: term
		})
	},

	// if component changes (e.g. if a search is entered)
	componentDidUpdate: function(prevProps, prevState){

		if(prevState.searchTerm != this.state.searchTerm){
			console.log("UPDATED");

			// run query for the search keywords
			helpers.runQuery(this.state.searchTerm)
				.then(function(data){
					if (data != this.state.results)
					{
						console.log("Article Title", data);

						this.setState({
							results: data
						})

						// after results received, post the results to saved 
						helpers.postSaved(this.state.searchTerm)
							.then(function(data){
								console.log("Updated!");

								// then get updated saved articles
								helpers.getSaved()
									.then(function(response){
										console.log("Saved Articles", response.data);
										if (response != this.state.saved){
											console.log ("Saved Articles", response.data);

											this.setState({
												saved: response.data
											})
										}
									}.bind(this))	
							}.bind(this)
						)
					}
				}.bind(this))
				
			}
	},

	// when the component mounts,  get the saved articles
	componentDidMount: function(){

		helpers.getSaved()
			.then(function(response){
				if (response != this.state.saved){
					console.log ("Saved Articles", response.data);

					this.setState({
						saved: response.data
					})
				}
			}.bind(this))
	},

	// render the Main component, which includes each Child
	render: function(){

		return(

			<div className="container">

				<div className="row">
					<h2 className="text-center">New York Times Article Scrubber</h2>
					<p className="text-center"><em>Search for and annotate articles of interest.</em></p>
				</div>

				<div className="row">
					<Search setTerm={this.setTerm}/>
				</div>

				<div className="row">
					<Results results={this.state.results} />
				</div>


				<div className="row">
					<Saved saved={this.state.saved}/> 
				</div>

			</div>
		)
	}
});

// export component back for use in other files
module.exports = Main;