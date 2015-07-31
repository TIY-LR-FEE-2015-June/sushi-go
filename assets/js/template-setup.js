AppTemplates = {};

Handlebars.registerHelper('slug', function(str) {
  return str.toLowerCase().replace(' ', '-');
});
