
var clientId = '44ZBUPBKJLBXBM0IJRZPSM34YPUKNSE2VQCNL041GNFIWRSO';
var clientKey = 'RPHMMDSE0DQIAY4XZ34WN1ZRTUV250NCNIX05N1WMSRODPJ2';
var template = 'https://api.foursquare.com/v2/venues/explore?client_id=%CLIENT_ID%&client_secret=%CLIENT_SECRET%&v=20130815&near=%CITY%&venuePhotos=1&query=%query%';
var Venue = require('./../js/venue.js').Venue;

exports.createMap = function(address) {
  var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var latlng = results[0].geometry.location;
        var mapOptions = {
          zoom: 13,
          center: latlng
        }
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
      } else {
        alert("Geocode was not successfual for the following reason: " + status);
      }
    });
  };

createMarker = function(venue){
  var latlng = new google.maps.LatLng(venue.lat, venue.long);
  var marker = new google.maps.Marker({
    map: map,
    position: latlng
  });
  var infowindow = new google.maps.InfoWindow({
    content: venue.name + ' ' + venue.rating + '<br>' + '<img src="' + venue.img +
    '">'
  });
  marker.addListener('click', function() {
   infowindow.open(map, marker);
 });
};

exports.createUrl = function(city, query){
  var url = template.replace('%CLIENT_ID%', clientId).
  replace('%CLIENT_SECRET%', clientKey).
  replace('%CITY%', city).
  replace('%query%', query);
  return url;
};

exports.apiCall = function(url){
  $.get(url).then(function(response){
    console.log(response);
    for(var i=0; i<10; i++){
      var current = response.response.groups[0].items[i].venue;
      console.log(current.photos.groups[0]);
      var venue = new Venue(current.name, current.rating, current.location.lat, current.location.lng, current.location.address, current.photos.groups[0].items[0].suffix);
      createMarker(venue);
    }
  })
};
