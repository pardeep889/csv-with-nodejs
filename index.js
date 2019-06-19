const csv = require('csv-parser');  
const createCsvWriter = require('csv-writer').createObjectCsvWriter;  
const fs = require('fs');

const csvWriter = createCsvWriter({  
    path: 'out.csv',
    header: [
      {id: 'city', title: 'city'},
      {id: 'population', title: 'Population'}
    ]
  });
const data = [];
fs.createReadStream('worldcities.csv')  
  .pipe(csv())
  .on('data', (row) => {    
   data.push({city: row.city_ascii,population: row.population}); 
  })
  .on('end', () => {
    // console.log('CSV file successfully processed');
    csvWriter  
  .writeRecords(data)
  .then(()=> {
        console.log('The CSV file was written successfully');
        // read new file:
        const newData = [];
        fs.createReadStream('out.csv')  
        .pipe(csv())
        .on('data', (row) => {
          if(row.Population){
            newData.push({city: row.city,population: parseInt(row.Population)}); 
          }            
        })
        .on('end', () => {
            // let sum = newData.population.reduce((previous, current) => current += previous);
            // console.log(sum);
           var total = 0;
           for (i = 0; i < newData.length; i++) {  //loop through the array
              total += newData[i].population;  //Do the math!
           }
           
           const aver = total/newData.length; 

           const max = newData.reduce(function(prev, current) {
            return (prev.population > current.population) ? prev : current
            })         
           console.log(`largest population city is: ${max.city} and population is: ${max.population}`);
           
           const min = newData.reduce(function(prev, current) {
            return (prev.population < current.population) ? prev : current
            })  
            console.log(`smallest population city is: ${min.city} and population is: ${min.population}`);
            // let ave = sum/newData.population.length;
            // console.log('Avrage is: '+ave);
            console.log('----------Final Report----------------');

            console.log(`The Average of all the cities is: ${aver}. The lowest populated city is: ${min.city} and heighest populated city is: ${max.city}`);
        });
    });
  });

  