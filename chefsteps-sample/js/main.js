$(document).ready(function () {
	
	function removeDuplicates(arr) {
	  var arrMap = {};
	  for (var i = 0; i < arr.length; i++) {
	    if (!arrMap.hasOwnProperty(arr[i])) {
	      arrMap[arr[i]] = true;

	    } else {
	      arr.splice(i, 1);
	      i = i - 1;
	    }
	  }
	  return arr;
	}

	function addNewList(arr) {
		var outputHeader = $('<h3>', {id: "output"});
		var outputText = document.createTextNode(arr.toString());

		outputHeader.append(outputText);
		$('body').append(outputHeader);
	}

	$('#submit').click(function(e) {
		$('#output').remove();
		e.preventDefault();
		var lst_temp = $('#array').val();
		var lst = lst_temp.split(',');
		var newlst = removeDuplicates(lst);
		$('#array').val('');
		addNewList(newlst);

	});


});
