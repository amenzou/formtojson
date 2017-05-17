(function($) {
  $.fn.formToJson = function(options) {
 		 var settings = $.extend({
    	strict: true
    }, options);
  	var params = {};
    var rawParams = this.serializeArray();
    console.log(rawParams);
    $.each(rawParams, function(i, keyValue) {
      //if it's a multi value field (e.g.: <select multiple>)
      if (params.hasOwnProperty(keyValue.name)) {
        params[keyValue.name] = $.makeArray(params[keyValue.name]);
        params[keyValue.name].push(keyValue.value);
      } else {
      	params[this.name] = this.value;
      }
    });
    if (settings.strict) {
      // Use binary for checkboxes
    	this.find('input[type="checkbox"]').each(function(){
        params[this.name] = 0;
        if ($(this).not(':checked')) {
        	params[this.name] = 1;
        }
      });
      // Cast select[multiple] to array 
      this.find('select[multiple]').each(function(){
      	var count = $(this).find('option:selected').length;
        if(count == 0 ){
          params[this.name] = [];            
        } else if (count == 1) {
        	params[this.name] = [this.value]; 
        }
      });
    }
    return params;
  };
}(jQuery));
