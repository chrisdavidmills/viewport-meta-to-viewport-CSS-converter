var viewport = document.querySelector('meta[name="viewport"]').getAttribute('content');
var body = document.body;
var input = document.createElement('pre');
var inputMessage = document.createElement('p');
var result = document.createElement('pre');
var outputMessage = document.createElement('p');

body.appendChild(inputMessage);
body.appendChild(input);
body.appendChild(outputMessage);
body.appendChild(result);

inputMessage.innerHTML = 'The following code is the viewport that this page contains:';
input.innerHTML = '&lt;meta name="viewport" content="' + viewport + '"&gt;';
outputMessage.innerHTML = 'The following code is the equivalent <code>@viewport</code> code, including all prefixed versions. ';

var viewportItems = viewport.split(/[;,]/);
var output = 'viewport {\n';


for(i=0;i<viewportItems.length;i++) {
  var item = viewportItems[i];
  item.trim();
  var propertyValue = item.split("=")[1];
  var property = "";
  property.trim();
  propertyValue.trim();
  
  if(item.indexOf('width') != -1) {
    property = 'width: '; 
  }
  
  if(item.indexOf('height') != -1) {
    property = 'height: ';
  }
  
  if(item.indexOf('initial-scale') != -1) {
    property = 'zoom: ';
  }
  
  if(item.indexOf('maximum-scale') != -1) {
    property = 'max-zoom: ';
  }
  
  if(item.indexOf('minimum-scale') != -1) {
    property = 'min-zoom: ';
  }
  
  if(item.indexOf('target-densitydpi') != -1) {
    var resolutionMessage = document.createElement('p');
    body.appendChild(resolutionMessage);
    resolutionMessage.innerHTML = 'Please note that <code>target-densitydpi</code> does not have an equivalent in <code>@viewport</code>, as of yet. You\'ll need to use viewport meta for this, for the moment.';
    propertyValue = "NO target-densitydpi EQUIVALENT!!";
  }
  
  if(item.indexOf('user-scalable') != -1) {
    property = 'user-zoom: ';
    if(propertyValue == 'no') {
      propertyValue = 'fixed';
    } else if(propertyValue == 'yes') {
      propertyValue = 'zoom';
    }
  }
  
  output = output.concat("  " + property + propertyValue + ';\n');
}

result.innerHTML = "@-webkit-" + output + "}\n\n" +
                   "@-moz-" + output + "}\n\n" +
                   "@-ms-" + output + "}\n\n" +
                   "@-o-" + output + "}\n\n" +
                   "@" + output + "}";
