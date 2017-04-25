require('./config/config');

const fs = require('fs');
const path = require('path');
const parse = require('csv-parse');

let {mongoose} = require('./db/mongoose');
let {Voter} = require('./models/voter');

let filePath = path.join(__dirname, '..', 'data');
let inputFile = path.join(filePath, 'test.txt');

try {
  fs.createReadStream(inputFile)
    .pipe(parse({delimiter: '\t', relax: true}))
    .on('data', (data) => {
      Voter.createVoterDataFromArray(data).then((voterData) => {
        let voter = new Voter(voterData);
        voter.save().then((doc) => {
        }, (err) => {
          console.log('Unable to save voter', err);
        })
      })
    })
    .on('end', () => {
      console.log('done');
      process.exit(0);
    });
} catch (e) {
  console.log('Error', e);
  process.exit(1);
}
