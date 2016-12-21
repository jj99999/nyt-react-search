// include React
var React = require('react');

// include the helpers file to access the save function
var helpers = require("../utils/helpers");

// create Results component
var Results = React.createClass({

	// function from helpers,  to save an article
	articleSave: function(event){
    	helpers.postSaved(article)
    	.then(function(response){
      		console.log("Article is saved.");
    	}.bind(this));
	},

	// Here we render the function
	// React created
	render: function(){

		return(

			<div className="row">
				<h2>Results</h2>
			</div>

			<div className="row">
				<ul>
				<br></br>
          		{this.props.results.map(function(search, i){
            		return(
              			<li key={search._id}>
                			<a href={search.web_url}>{search.title}</a><p> {search.date.substring(0,10)} </p>
                      		<button className="button" onClick={this.articleSave} value={search._id}>Save Article</button>
						</li>
					)
            	})};
				</ul>
			</div>


		)
	}
});

// Export the component back for use in other files
module.exports = Results;