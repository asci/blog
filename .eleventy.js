const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPlugin(pluginRss);

  // Pass through the built React app files
  eleventyConfig.addPassthroughCopy({ "src/apps/calc/dist": "apps/calc" });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "./_includes",
    },
  };
};
