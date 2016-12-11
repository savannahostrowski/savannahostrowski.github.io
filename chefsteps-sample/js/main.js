function removeDuplicates(arr) {
	  var arrMap = {};
	  var outputArr = [];
	  for (var i = 0; i < arr.length; i++) {
	    if (!arrMap.hasOwnProperty(arr[i])) {
	      arrMap[arr[i]] = true;
	      outputArr.push(arr[i]);
	    }
	  }
	  return outputArr;
	}

$(document).ready(function () {

	$('#submit').click(function(e) {
		if ($("#output").length > 1) {
			$('#output').remove();
		}
		e.preventDefault();
		var lst_temp = $('#array').val();
		var lst = lst_temp.split(',');
		var newlst = removeDuplicates(lst);
		$('#array').val('');
		var outputText = "[ " + newlst.toString() + " ]";
		$("#output").text(outputText);
		$(".update").css("display", "block");

	});
});
