// Adding tile layer 
// Create base layers

// lightmap Layer
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
});



// dark map layer
var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

// Create a baseMaps object
var baseMaps = {
 
  "Light view": lightmap,
  "Darkmap view": dark
  
};


// Create two separate layer groups
var renewable = new L.LayerGroup();
var nonrenewable = new L.LayerGroup();

var allPowerStations= new L.LayerGroup();
var borders= new L.LayerGroup()

    // Create an overlay object
var overlayMaps = {
  "Stations ": allPowerStations,
  "Province Borders":borders
//   "Renewable" : renewable;
//   "Non Renewable" :nonrenewable
}; 



// // Define a map object

var myMap = L.map("map", {
    center: [50.13, -117],
    zoom: 4,
    layers: [lightmap,dark,allPowerStations,borders]
  });
    
       // Pass our map layers into our layer control
// Add the layer control to the map
// L.control.layers(baseMaps, overlayMaps, {
//   collapsed: false
// }).addTo(myMap);
  






var queryUrl = 'http://127.0.0.1:5000/api/v1.0/location';


d3.json(queryUrl).then((response) => {
  var data = response;
    
  var powerstations = []
  
    for (var i = 0; i < data.length; i++) {
        
        try {
        var lat = data[i].coordinates.split(', ')[0]
        var lon = data[i].coordinates.split(', ')[1]
        
        lat = +lat
        lon = +lon
        console.log(lat, lon)
        
//         powerstations.push(
            
           var circle= L.circle([lat, lon],  {
                stroke: true,
                fillOpacity: 0.5,
                fillColor: getColor(data[i].type),
                color: "black",
                opacity: 0.5,
                weight: 1,
                radius: getRadius(data[i].capacity),
            })
allPowerStations.addLayer(circle)
//         )
        } catch(err){}
    };
    
  
// powerstations.addTo(allPowerStations)




// set different color from Type
    function getColor(type) {
    switch (true) {
    case type == 'Hydroelectric':
      return "rgb(0, 77, 102)";
    case type == 'Wind':
      return "rgb(45, 134, 45)";
    case type == 'Biomass':
      return "rgb(0, 255, 0)";
    case type == 'Solar':
      return "rgb(0, 51, 0)";
    case type == 'Battery':
      return "grey";
    case type =='rgb(255, 0, 255)':
      return "bisque";
    case type == 'rgb(255, 80, 80)':
      return "rgb(255, 255, 0)";
    case type == 'Coal':
      return "rgb(128, 0, 0)";
    
    case type == 'Fossil Fuel':
      return "rgb(128, 0, 0)";
    
    case type == 'Fuel oil / Natural gas':
      return "rgb(128, 0, 0)";
    case type == "Natural Gas":
      return "rgb(128, 0, 0)";
    case type == 'Diesel':
      return "rgb(0, 0, 102)";
    case type == 'Nuclear':
      return "rgb(179, 134, 0)";
    
    default:
      return "grey";
    }
  };

      
     
  // set radius from capacity
    function getRadius(capacity) {
    if (capacity === 0) {
      return 0;
    }
    return capacity * 60;
    };



   
// an object legend
    // var legend = L.control({
    //   position: "bottomright"
    // });
  
    // details for the legend
     


    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var types=['Hydroelectric','Wind','Solar','Biomass','Battery','Offgrid','Combined','Coal','Fossil Fuel','Fuel oil / Natural gas',"Natural Gas",'Diesel','Nuclear'];
      var labels= ['<strong>PowerStation Types</strong>'];
      // Looping through
      for (var i = 0; i < types.length; i++) {
          console.log(types[i])
        div.innerHTML += 
                labels.push(
                '<i style="background:' + getColor(types[i] ) + '"></i> ' +
                (types[i] ? types[i] : '+'));
        }
        div.innerHTML = labels.join('<br>');
    return div;
};
    // adding legend to the map.
    // legend.addTo(myMap);
  
});

  
  var provincebordersURL='https://raw.githubusercontent.com/johan/world.geo.json/master/countries/CAN.geo.json'
var lines=d3.json(provincebordersURL, function(r) {
L.geoJson(r).addTo(borders)
});

borders.addTo(myMap)




// https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/canada.geojson