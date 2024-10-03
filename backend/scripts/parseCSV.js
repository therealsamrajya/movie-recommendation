import fs from "fs"
import csv from "csv-parser"
import path from "path"


const parseCSV = () => {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(path.join(__dirname, '../data/movies.csv'))
        .pipe(csv())
        .on('data', (data) => {
          // Convert numeric strings to numbers
          const numericFields = ['index', 'budget', 'id', 'popularity', 'revenue', 'runtime', 'vote_average', 'vote_count'];
          numericFields.forEach(field => {
            if (data[field]) {
              data[field] = parseFloat(data[field]);
            }
          });
  
          // Convert release_date to Date object
          if (data.release_date) {
            data.release_date = new Date(data.release_date);
          }
  
          results.push(data);
        })
        .on('end', () => {
          console.log('CSV file successfully processed');
          resolve(results);
        })
        .on('error', (error) => {
          console.error('Error parsing CSV:', error);
          reject(error);
        });
    });
  };
  export default parseCSV;