var map;
var clientId = '44ZBUPBKJLBXBM0IJRZPSM34YPUKNSE2VQCNL041GNFIWRSO';
var clientKey = 'RPHMMDSE0DQIAY4XZ34WN1ZRTUV250NCNIX05N1WMSRODPJ2';
var template = 'https://api.foursquare.com/v2/venues/explore?client_id=%CLIENT_ID%&client_secret=%CLIENT_SECRET%&v=20130815&near=%CITY%&query=%query%'
var Venue = require('./../js/venue.js').Venue;
var location;

 function codeAddress(address) {
   var geocoder = new google.maps.Geocoder();
     geocoder.geocode( { 'address': address}, function(results, status) {
       if (status == google.maps.GeocoderStatus.OK) {
         var latlng = results[0].geometry.location;
         location = latlng;
         var mapOptions = {
           zoom: 13,
           center: latlng
         }
         map = new google.maps.Map(document.getElementById("map"), mapOptions);
       } else {
         alert("Geocode was not successfual for the following reason: " + status);
       }
     });
   }

$(document).ready(function(){
    $('#token').submit(function(event){
      event.preventDefault();
      var address = $('#city').val();
      codeAddress(address);
      apiCall(createUrl(address, 'food'));
    });
});




function createMarker(venue){
  var latlng = new google.maps.LatLng(venue.lat, venue.long);
  var marker = new google.maps.Marker({
    map: map,
    position: latlng
  });
  var infowindow = new google.maps.InfoWindow({
    content: venue.name
  });
  marker.addListener('click', function() {
   infowindow.open(map, marker);
 });
}

function createUrl(city, query){
  var url = template.replace('%CLIENT_ID%', clientId).
  replace('%CLIENT_SECRET%', clientKey).
  replace('%CITY%', city).
  replace('%query%', query);
  return url;
}

function apiCall(url){
  $.get(url).then(function(response){
    for(var i=0; i<10; i++){
      var current = response.response.groups[0].items[i].venue;
      var venue = new Venue(current.name, current.rating, current.price.message, current.location.lat, current.location.lng, current.location.address);
      createMarker(venue);
    }
  })
}
