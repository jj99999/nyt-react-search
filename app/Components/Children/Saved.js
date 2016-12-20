// include React 
var React = require('react');

var Saved = React.createClass({

	getInitialState: function() {
    	return {
      	// ???
    	};
	},

	

	delArticle: function(event) {

    // get article's id
    var articleId = event.target.value;

    // send to API route from helpers
    helpers.delSaved(articleId).then(function(){

      // query mongo and render fresh data
      helpers.apiGet().then(function(query){
        this.props._resetMongoResults(query.data);
});




	render: function(){

		return(

			<div className="row">
				<h2>Saved Articles</h2>
			</div>

			<div className="row">
				<ul>
					{/* Here we use a map function to loop through an array in JSX*/}
					{this.props.saved.map(function(search, i)
						{
							return (
								<li key={i}>(search.id)>
								<a href={search.url}>{search.title} - {search.date.substring(0, 10)}</a>
								<button className="button" type="button" onClick={this.delArticle} value={search._id}>Remove Article</button>
								</li>
							)	
						}
					)}

				</ul>	
			</div>

		)
	}
});


// export component back for use in other files
module.exports = History;