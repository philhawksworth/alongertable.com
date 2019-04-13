const axios  = require('axios');
// const seed   = require('../../../utils/save-seed.js');

// var url = 'https://spreadsheets.google.com/feeds/list/1gzNuhVoL01ioql-FJIEg9FstS36d-hVkZqQi8UxPAG0/od6/public/values?alt=json';
var url = 'https://spreadsheets.google.com/feeds/list/17m9vrk7-0q89-kHBdr7VO7Sews6pTrIquT_l5Lg77qk/od6/public/values?alt=json';

module.exports = () => {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
        var results = [];
        response.data.feed.entry.forEach(element => {

          var result = {
            "name" : element.gsx$name.$t,
            "address" : element.gsx$address.$t,
            "url" : element.gsx$website.$t,
            "phone" : element.gsx$phonenumber.$t,
            "management" : element.gsx$management.$t,
            "notes" : element.gsx$notes.$t
          };

          results.push(result);
        });


        // seed(JSON.stringify(results), `${__dirname}/../dev/events.json`)
        resolve(results);
      })
      .catch(err => {
        reject(err);
      });
  })
}
