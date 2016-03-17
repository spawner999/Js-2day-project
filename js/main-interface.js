var map;
var createMap = require('./../js/api-helpers.js').createMap;
var apiCall = require('./../js/api-helpers.js').apiCall;
var createUrl = require('./../js/api-helpers.js').createUrl;
var clearMarkers = require('./../js/api-helpers.js').clearMarkers;
var address;


$(document).ready(function(){


  $('#token').submit(function(event){
    event.preventDefault();
    $('#category').prop('selectedIndex',0);
    address = $('#city').val();
    createMap(address);
  });
  $('#category').change(function() {
    var query = $('#category').val();
    if(query){
      apiCall(createUrl(address, query));
    }
});
});
