var myMap = L.map("map", {
  center: [56.1304, -106.3468],
  zoom: 13
});

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  tileSize: 512,
  maxZoom: 5,
  zoomOffset: -1,
  id: "dark-v10",
  accessToken: API_KEY
}).addTo(myMap);

var url = "http://127.0.0.1:5000/api/v1.0/renewable";


d3.json(url).then((response) =>  {

  // console.log(response);

  var heatArray = [];
  var ratio=[];
  for (var i = 0; i < response.length; i++) {
    var location = [response[i].lat, response[i].lon]
    // ratio.push(response[i].RenewabletoNonReneableRatio)
    
    // if (location) {
    //   heatArray.push([location.lat, location.lon]);
    // }

    var heat = L.heatLayer([location], {
      radius: response[i].RenewabletoNonReneableRatio / 2,
      blur: 3
    }).addTo(myMap);

  }

  console.log(heatArray);

  // var heat = L.heatLayer(heatArray, {
  //   radius: ratio,
  //   blur: 5
  // }).addTo(myMap);

});
