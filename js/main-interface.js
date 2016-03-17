var map;
var address;
var createMap = require('./../js/api-helpers.js').createMap;
var apiCall = require('./../js/api-helpers.js').apiCall;
var createUrl = require('./../js/api-helpers.js').createUrl;
var clearMarkers = require('./../js/api-helpers.js').clearMarkers;
var venueCallback = require('./../js/api-helpers.js').venueCallback;
var wikiCallback = require('./../js/api-helpers.js').wikiCallback;
var createWikiUrl = require('./../js/api-helpers.js').createWikiUrl;


$(document).ready(function(){
  $('#token').submit(function(event){
    event.preventDefault();
    $('#slider').empty();
    $('#wiki').empty();
    $('#category').prop('selectedIndex',0);
    address = $('#city').val();
    createMap(address);
    wikiCallback(createWikiUrl(address));
  });
  $('#category').change(function() {
    $('#slider').empty();
    var query = $('#category').val();
    if(query){
      apiCall(createUrl(address, query), venueCallback);
    }
});
});
