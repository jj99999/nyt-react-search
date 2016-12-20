// require axios
var axios = require("axios");

//NYT API key
var nytKey= "5aa79c02ea5840d28aa684eed86fe61c";

var helper= {
  runQuery: function(topic, startYr, endYr){
    
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytKey + "&q="+ searchTerm + "&begin_date=" + startYr + "0101" + "&end_date=" + endYr + "1231";
    return axios.get(queryURL).then(function(response){
      var results = [];
      // format results
      if (response.data.results[0]) {
        for(var i=0; i<5; i++) {
          results.push(response.data.results[i].formatted);
        }
        return results;
      } else {
        return "No results from this search.";
      }
    });
  },
  
  getSaved: function(){
    return axios.get('/api/saved')
      .then(function(response){
        return response;
      })
  },
  
  postSaved: function(){
    return axios.post('/api', article)
      .then(function(response){
        return response;
      })
  },
  
  delSaved: function(){
    // return axios.delete('api/');
  }
};

module.exports = helper;