var Venue = function(name, rating, lat, long, address, img){
  this.name = name;
  this.rating = rating;
  this.lat = lat;
  this.long = long;
  this.address = address;
  this.img = 'https://irs3.4sqi.net/img/general/300x150' + img;
  this.marker;
}

exports.Venue = Venue;
