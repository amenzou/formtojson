(function($) {
  $.fn.formToJson = function() {
  	var params = {};
    var rawParams = this.serializeArray();
    this.find('input[type="checkbox"]:not(:checked)').each(function(){
      rawParams.push({name: this.name, value: 0});
    });
    this.find('select[multiple]').each(function(){
      if(!$(this).find('option:selected').length){
        rawParams.push({name: this.name, value: []});            
      }
    });
    $.each(rawParams, function(i, keyValue) {
      //if it's a multi value field (e.g.: <select multiple>)
      if (params.hasOwnProperty(keyValue.name)) {
        params[keyValue.name] = $.makeArray(params[keyValue.name]);
        params[keyValue.name].push(keyValue.value);
      }
      else {
        //If it's a checkbox use 1 instead of 'on'
        params[keyValue.name] = (keyValue.value == 'on') ? 1 : keyValue.value;
      }
    });
    return params;
  };
}(jQuery))
