// include React
var React = require('react');

// create Results component
var Results = React.createClass({

	// Here we render the function
	// React created
	render: function(){

		return(

			<div className="row">
				<h2>Results</h2>
			</div>

			<div className="row">
				<br></br>
				<p>{this.props.results}</p>
			</div>

		)
	}
});

// Export the component back for use in other files
module.exports = Results;