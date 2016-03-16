var map;
var clientId = '44ZBUPBKJLBXBM0IJRZPSM34YPUKNSE2VQCNL041GNFIWRSO';
var clientKey = 'RPHMMDSE0DQIAY4XZ34WN1ZRTUV250NCNIX05N1WMSRODPJ2';
var template = 'https://api.foursquare.com/v2/venues/explore?client_id=%CLIENT_ID%&client_secret=%CLIENT_SECRET%&v=20130815&near=%CITY%&query=%query%'
var Venue = require('./../js/venue.js').Venue;

 function codeAddress(address) {
   var geocoder = new google.maps.Geocoder();
     geocoder.geocode( { 'address': address}, function(results, status) {
       if (status == google.maps.GeocoderStatus.OK) {
         var latlng = results[0].geometry.location;
         var mapOptions = {
           zoom: 14,
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
  var latlng = new google.maps.LatLng(venue.lat, venue.lng);
  console.log(latlng);
  console.log(map);
  var marker = new google.maps.Marker({
    map: map,
    position: {lat: 59.327, lng: 18.067}
  });
  map.setCenter(latlng);
  console.log(marker);
  var infowindow = new google.maps.InfoWindow();
  infowindow.setContent(venue.name);
}

function createUrl(city, query){
  var url = template.replace('%CLIENT_ID%', clientId).
  replace('%CLIENT_SECRET%', clientKey).
  replace('%CITY%', city).
  replace('%query%', query);
  console.log(url);
  return url;
}

function apiCall(url){
  $.get(url).then(function(response){
    console.log(response);
    var current = response.response.groups[0].items[0].venue;
    var name = current.name;
    var rating = current.rating;
    var price = current.price.message;
    var lat = current.location.lat;
    var lng = current.location.lng;
    var address = current.location.address;
    var venue = new Venue(name, rating, price, lat, lng, address);
    console.log(venue);
    createMarker(venue);

  })
}
