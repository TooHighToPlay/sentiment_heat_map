//var scale = ['#C8EEFF', '#0071A4'];
var scale = ['#FF0000', '#0000FF'];

$( document ).ready(function() {
  	var bootstrapCSSLink = $('<link rel="stylesheet" type="text/css" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">');
	var bootstrapThemeCSSLink = $('<link rel="stylesheet" type="text/css" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css">');
	var bootstrapJavaScriptLink = $('<script type="text/javascript" src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>');

	$('body').append(bootstrapCSSLink);
	$('body').append(bootstrapThemeCSSLink);
	$('body').append(bootstrapJavaScriptLink);
});

function generateLegends(data) {
  var mapObj = $('#world-map').vectorMap('get', 'mapObject');
  var min = Math.ceil(jvm.min(data));
  var max = Math.ceil(jvm.max(data));
  //var steps = Math.floor(max-min);
  var first = false;
  for (var i = min; i<=max; i++) {
    var val = i;
    var color = mapObj.series.regions[0].scale.getValue(val);
    //$('#key').append('<div class="customLegend" style="background-color:' + color + ';">' + val + ' - ' + color + '</div>');
    if (!first && i < 5) {
      $('#key').append('<div class="customLegend" style="background-color:' + color + ';">' + val + '- negative' +'</div>');
      first = true;
    } else if (i == 5) {
      $('#key').append('<div class="customLegend" style="background-color:' + color + ';">' + val + '- neutral' +'</div>');
    } else if (i == max) {
      $('#key').append('<div class="customLegend" style="background-color:' + color + ';">' + val + '- positive' +'</div>');
    } else {
      $('#key').append('<div class="customLegend" style="background-color:' + color + ';">' + val +'</div>');
    }
  }
}

function initialiseMap(data, scale, normalize) {
  $('#world-map').vectorMap({
  map: 'world_mill_en',
  series: {
    regions: [{
      values: data,
      //scale: scale,
      scale: scale,
      normalizeFunction: normalize,
      min: jvm.min(data),
      max: jvm.max(data)
    }],
  },
  onRegionLabelShow: function(e, el, code){
    el.html(el.html()+' (Sentiment - '+data[code]+')');
  }
});
}

$('#submit').click( function() {
  var data = document.getElementById('data');

  $('#world-map').remove();
  $(".customLegend").remove();

  var newData = jQuery.parseJSON( data.value );

  if (jvm.min(newData) < 0 || jvm.min(newData) > 10 || jvm.max(newData) > 10 || jvm.max(newData) < 0) {
    $('#warning').append('<h3 id="warningMsg" style="color:red;">Data values must be in range [0,10] !!!</h3>');
    return;
  }

  $('#warningMsg').remove();

    
    $('#mapPosition').append('<div id="world-map" class="center-block" style="width: 600px; height: 400px"></div>');

  var normalizeFunction = $('#normalize').val();
  initialiseMap(newData, scale, normalizeFunction);

  var mapObj = $('#world-map').vectorMap('get', 'mapObject');
  //mapObj.series.regions[0].clear();
  //mapObj.series.regions[0].setValues(newData);
  //mapObj.series.regions[0].setScale(scale);

  generateLegends(newData); 
});

var gdpData = {
  "BE": 5.0,
  "FR": 2.5,
  "NL": 5.0,
  "UA": 6.0,
  "RU": 7.142857142857143,
  "MY": 5.0,
  "CA": 5.0,
  "DE": 5.0,
  "JP": 5.0,
  "ZA": 4.0,
  "US": 4.660194174757281,
  "MX": 5.0,
  "GB": 5.666666666666666,
  "SE": 5.0,
  "IE": 5.0,
  "ID": 5.0,
  "PL": 5.0
};