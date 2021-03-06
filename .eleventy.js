const { DateTime } = require("luxon");


module.exports = function(config) {

  // A useful way to reference to the contect we are runing eleventy in
  let env = process.env.ELEVENTY_ENV;

  // Layout aliases can make templates more portable
  config.addLayoutAlias('default', 'layouts/base.njk');

  // Add some utiliuty filters
  config.addFilter("dateDisplay", (dateObj, format = "LLL d, y") => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc"
    }).toFormat(format);
  });

  config.addFilter("where", (array, query) => {
    let args = query.split("=");
    let key = args[0];
    let value = args[1];
    return array.filter(function(item){
      return item[key] == value;
    });
  });


  // minify the html output
  config.addTransform("htmlmin", require("./src/utils/minify-html.js"));





  // pass some assets right through
  // config.addPassthroughCopy("./src/site/images");s


  return {
    dir: {
      input: "src/site",
      output: "dist",
      data: `_data`
    },
    templateFormats : ["njk", "md"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk",
    passthroughFileCopy: true
  };

};
