var map;
var createMap = require('./../js/api-helpers.js').createMap;
var apiCall = require('./../js/api-helpers.js').apiCall;
var createUrl = require('./../js/api-helpers.js').createUrl;


$(document).ready(function(){
    $('#token').submit(function(event){
      event.preventDefault();
      var address = $('#city').val();
      var query = $('#category').val();
      createMap(address);
      apiCall(createUrl(address, query));
    });
});
