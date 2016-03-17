
var clientId = '44ZBUPBKJLBXBM0IJRZPSM34YPUKNSE2VQCNL041GNFIWRSO';
var clientKey = 'RPHMMDSE0DQIAY4XZ34WN1ZRTUV250NCNIX05N1WMSRODPJ2';
var template = 'https://api.foursquare.com/v2/venues/explore?client_id=%CLIENT_ID%&client_secret=%CLIENT_SECRET%&v=20130815&near=%CITY%&venuePhotos=1&query=%query%';
var Venue = require('./../js/venue.js').Venue;
var markers = [];
var infowindow;

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
  infowindow = new google.maps.InfoWindow();
  marker.addListener('click', function() {
    clearInfoWindows(markers);
    infowindow.setContent(venue.name + ' ' + venue.rating + '<br>' + '<img src="' + venue.img +
    '">');
    this.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
      marker.setAnimation(false);
    }, 2050);
   infowindow.open(map, marker);
 });
 return marker;
};

clearMarkers = function(markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

clearInfoWindows = function(markers) {
  for (var i = 0; i < markers.length; i++) {
    infowindow.open(map, markers[i]);
  }
}

exports.createUrl = function(city, query){
  var url = template.replace('%CLIENT_ID%', clientId).
  replace('%CLIENT_SECRET%', clientKey).
  replace('%CITY%', city).
  replace('%query%', query);
  return url;
};

exports.apiCall = function(url){
  $.get(url).then(function(response){
    if(markers){
      clearMarkers(markers);
    }
    for(var i=0; i<10; i++){
      var current = response.response.groups[0].items[i].venue;
      var venue = new Venue(current.name, current.rating, current.location.lat, current.location.lng, current.location.address, current.photos.groups[0].items[0].suffix);
      var marker = createMarker(venue);
      markers.push(marker);
    }
  })
};
