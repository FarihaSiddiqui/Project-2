// // Use D3 fetch to read the JSON file
// // The data from the JSON file is arbitrarily named importedData as the argument
d3.json("http://127.0.0.1:5000/api/v1.0/date").then((importedData) => {
  var data = importedData;
  console.log(data)

// Hydroelectric = Hydraulic turbine + Tidal power turbine 
// Solar = Solar
// Wind = Wind power turbine
// Fossil fuels = Conventional Steam turbine + Internal combustion turbine + combustion turbine +
// Fuel cells/battery
// Nuclear = Nuclear steam turbine

  var nuDateList = [];
  var nuValueList = [];

  var filteredDataNuclear = data.forEach( row => {
        if (row[2] === 'Nuclear steam turbine'){
          if(row[0] === 'Canada'){
            nuDateList.push(row[1])
            nuValueList.push(row[3]);
          }}
  });

 var hyDateList = [];
 var hyValueList = [];

  var filteredDataHydraulic = data.forEach( row => {
        if (row[2] === 'Hydraulic turbine'){
          if(row[0] === 'Canada'){
            hyDateList.push(row[1])
            hyValueList.push(row[3]);
          }}
  });

  var stDateList = [];
  var stValueList = [];

  var filteredDataSteam = data.forEach( row => {
        if (row[2] === 'Conventional steam turbine'){
          if(row[0] === 'Canada'){
            stDateList.push(row[1])
            stValueList.push(row[3]);
            }}
  });  
 
  var inDateList = [];
  var inValueList = [];
 
   var filteredDataSteam = data.forEach( row => {
         if (row[2] === 'Internal combustion turbine'){
           if(row[0] === 'Canada'){
             inDateList.push(row[1])
             inValueList.push(row[3]);
            }}
   });  

   var wiDateList = [];
   var wiValueList = [];
  
    var filteredDataSteam = data.forEach( row => {
          if (row[2] === 'Wind power turbine'){
            if(row[0] === 'Canada'){
              wiDateList.push(row[1])
              wiValueList.push(row[3]);
             }}
    }); 

  var soDateList = [];
  var soValueList = [];
  
    var filteredDataSteam = data.forEach( row => {
          if (row[2] === 'Solar'){
            if(row[0] === 'Canada'){
              soDateList.push(row[1])
              soValueList.push(row[3]);
            }}
    }); 
  var combDateList = [];
  var combValueList = [];
  
    var filteredDataSteam = data.forEach( row => {
          if (row[2] === 'Combustion turbine'){
            if(row[0] === 'Canada'){
              combDateList.push(row[1])
              combValueList.push(row[3]);
            }}
    }); 

  var tiDateList = [];
  var tiValueList = [];
  
    var filteredDataSteam = data.forEach( row => {
          if (row[2] === 'Tidal power turbine'){
            if(row[0] === 'Canada'){
              tiDateList.push(row[1])
              tiValueList.push(row[3]);
            }}
    }); 

  var otherDateList = [];
  var otherValueList = [];

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
    var filteredDataSteam = data.forEach( row => {
      if(row[0] === 'Canada'){
        if (row[2] === 'Total electricity production from combustible fuels'){
            otherDateList.push(row[1])
            otherValueList.push(row[3]);
          }
          else if (row[2] === 'Combustion turbine' && row[1] <= 2015)  {
            otherDateList.push(row[1])
            otherValueList.push(0);
          }    
        }
    }); 
// console.log(otherDateList)
// console.log(otherValueList)

//  Adding values for combustion turbine + conventional steam turbine + Internal combuston turbine
var fossilFuelValue = stValueList.map(function (num, idx){
  return num + combValueList[idx] + inValueList[idx] + otherValueList[idx];
});

var hydroValue = hyValueList.map(function (num, idx){
  return num + tiValueList[idx]
})

// console.log(fossilFuelValue)

// Using plotly to plot the stacked bar chart
var trace3 = {
  x: nuDateList,
  y: nuValueList,
  name: 'Nuclear',
  marker: {color: 'rgb(179, 134, 0)'},
  type: 'bar'
}

var trace1 = {
  x: hyDateList,
  y: hydroValue,
  name: 'Hydroelectric',
  marker: {color: 'rgb(0, 77, 102)'},
  type: 'bar'
}
var trace2 = {
  x: stDateList,
  y: fossilFuelValue,
  name: 'Fossil Fuel',
  marker: {color: 'rgb(128, 0, 0)'},
  type: 'bar'
}

var trace4 = {
  x: inDateList,
  y: inValueList,
  name: 'Internal combustion Steam',
  type: 'bar'
}

var trace6 = {
  x: wiDateList,
  y: wiValueList,
  name: 'Wind',
  marker: {color: 'rgb(45, 134, 45)'},
  type: 'bar'
}

var trace5 = {
  x: soDateList,
  y: soValueList,
  name: 'Solar',
  marker: {color: 'rgb(0, 45, 179)'},
  type: 'bar'
}

var trace7 = {
  x: combDateList,
  y: combValueList,
  name: 'Combustion',
  type: 'bar'

  }

  var data = [trace1, trace2, trace3,  trace5, trace6];

  var layout = {
    barmode: 'stack',
    paper_bgcolor: "#ffffff00",
    plot_bgcolor: "#ffffff00",
    xaxis: {
      tickfont : {
        color : 'white'
      }  },
    yaxis: {
      tickfont : {
        color : 'white'
      }  },
      legend: {
        font:{
          color: 'white'
        }
      }

};

  Plotly.newPlot('plot1', data, layout);

});

// d3.json("http://127.0.0.1:5000/api/v1.0/date").then((importedData) => {
//   var data = importedData;

//  var provinceList = [];
//  var hydroList = [];
//  var nuclearList = [];
//  var solarList = [];
//  var combustionList = [];
//  var windList = [];
//  var internalCombustionList = [];
//  var steamList = [];
//  var otherList = [];

// var filteredData = data.forEach( row => {
//   if (row[0] != 'Canada'){
//     if(row[1] === 2019){
//       if (row[2] === 'Hydraulic turbine'){
//         provinceList.push(row[0])
//         hydroList.push(row[3]);
//       }
//       else if (row[2] === 'Nuclear turbine'){
//         nuclearList.push(row[3]);
//       }
//       else if (row[2] === 'Combustion turbine'){
//         combustionList.push(row[3]);
//       }  
//       else if (row[2] === 'Solar'){
//         solarList.push(row[3]);
//       }
//       else if (row[2] === 'Wind power turbine'){
//         windList.push(row[3]);
//       }
//       else if (row[2] === 'Internal combustion turbine'){
//         internalCombustionList.push(row[3]);
//       }
//       else if (row[2] === 'Conventional steam turbine'){
//         steamList.push(row[3]);
//       }
//       else if (row[2] === 'Total electricity production from combustible fuels'){
//         otherList.push(row[3]);
//       }
//     }
//   }
// }); 

// //  Adding values for combustion turbine + conventional steam turbine + Internal combuston turbine
// var fossilFuelValue = internalCombustionList.map(function (num, idx){
//   return num + steamList[idx] + combustionList[idx] + otherList[idx];
// });

// // console.log(xList)
// var trace1 = {
//   x: hydroList,
//   y: provinceList,
//   name: 'Hydro',
//   marker: {color: 'rgb(0, 77, 102)'},
//   orientation: 'h',
//   type: 'bar',
// }
// var trace2 = {
//   x: fossilFuelValue,
//   y: provinceList,
//   name: 'Fossil Fuel',
//   marker: {color: 'rgb(128, 0, 0)'},
//   orientation: 'h',
//   type: 'bar',
// }
// var trace3 = {
//   x: hydroList,
//   y: provinceList,
//   name: 'Nuclear',
//   marker: {color: 'rgb(179, 134, 0)'},
//   orientation: 'h',
//   type: 'bar',
// }
// var trace4 = {
//   x: solarList,
//   y: provinceList,
//   name: 'Solar',
//   marker: {color: 'rgb(0, 45, 179)'},
//   orientation: 'h',
//   type: 'bar',
// }
// var trace5 = {
//   x: windList,
//   y: provinceList,
//   name: 'Wind',
//   marker: {color: 'rgb(45, 134, 45)'},
//   orientation: 'h',
//   type: 'bar',
// }

//   var data = [trace1, trace2, trace3, trace4, trace5];

//   var layout = {barmode: 'stack',
//   yaxis: {
//     automargin: true
//   } 

// };

//   Plotly.newPlot('plot2', data, layout);
// });

// Donut chart
d3.json("http://127.0.0.1:5000/api/v1.0/date").then((importedData) => {
  var data = importedData;

  var sourceList = [];
  var valueList = [];

  var filteredData = data.forEach( row => {
    if (row[0] === 'Canada' && row[1] === 2019 && row[2] === 'Nuclear steam turbine' && row[4] !== 0) {
        sourceList.push('Nuclear')
        valueList.push(row[3])
    } 
    if (row[0] === 'Canada' && row[1] === 2019 && row[2] === 'Wind power turbine' && row[4] !== 0) {
      sourceList.push("Wind")
      valueList.push(row[3])
    } 
    if (row[0] === 'Canada' && row[1] === 2019 && row[2] === 'Solar' && row[4] !== 0) {
      sourceList.push('Solar')
      valueList.push(row[3])
    } 
    if (row[0] === 'Canada' && row[1] === 2019 && row[2] === 'Total electricity production from combustible fuels' && row[4] !== '0') {
      sourceList.push('Fossil Fuel')
      valueList.push(row[3])
    } 
    if (row[0] === 'Canada' && row[1] === 2019 && row[2] === 'Hydraulic turbine' && row[4] !== '0') {
      sourceList.push('Hydroelectric')
      valueList.push(row[3])
    } 
  });
 
   console.log(sourceList)
   console.log(valueList)
   
  var trace = {
  values: valueList,
  labels: sourceList,
  domain: {column: 0},
  name: ' ',
  hoverinfo: 'label+percent+name',
  hole: .6,
  type: 'pie',
  marker: {
    colors: ['rgb(0, 77, 102)', 'rgb(179, 134, 0)', 'rgb(0, 45, 179)', 'rgb(128, 0, 0)', 'rgb(45, 134, 45)']
  }
  }
  var data = [trace];

  var layout = {
    paper_bgcolor: "#ffffff00",
    plot_bgcolor: "#ffffff00",
    showlegend: false

};

  Plotly.newPlot('plot3', data, layout);

});

//  Pie chart for provincial distribution

// d3.json("http://127.0.0.1:5000/api/v1.0/date").then((importedData) => {
//   var data = importedData;

//   var labelList = [];
//   var valueList = [];

//   var filteredData = data.forEach( row => {
//     if (row[0] === 'Alberta' && row[1] === 2019 && row[2] === 'Nuclear steam turbine' && row[4] !== 0) {
//         sourceList.push('Nuclear')
//         valueList.push(sum(row[3]))
//     } 
//     // if (row[0] === 'Canada' && row[1] === 2019 && row[2] === 'Wind power turbine' && row[4] !== 0) {
//     //   sourceList.push("Wind")
//     //   valueList.push(row[3])
//     // } 
//     // if (row[0] === 'Canada' && row[1] === 2019 && row[2] === 'Solar' && row[4] !== 0) {
//     //   sourceList.push('Solar')
//     //   valueList.push(row[3])
//     // } 
//     // if (row[0] === 'Canada' && row[1] === 2019 && row[2] === 'Total electricity production from combustible fuels' && row[4] !== '0') {
//     //   sourceList.push('Fossil Fuel')
//     //   valueList.push(row[3])
//     // } 
//     // if (row[0] === 'Canada' && row[1] === 2019 && row[2] === 'Hydraulic turbine' && row[4] !== '0') {
//     //   sourceList.push('Hydroelectric')
//     //   valueList.push(row[3])
//     // } 
//   });
//   console.log (labelList);
//   console.log(valueList)

// })
