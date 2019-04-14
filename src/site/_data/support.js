const axios  = require('axios');
// const seed   = require('../../../utils/save-seed.js');

var sheetTab = 4;
var url = `https://spreadsheets.google.com/feeds/list/17m9vrk7-0q89-kHBdr7VO7Sews6pTrIquT_l5Lg77qk/${sheetTab}/public/values?alt=json`;

console.log('URL :', url);

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
            "type" : element.gsx$type.$t,
            "description" : element.gsx$description.$t
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
