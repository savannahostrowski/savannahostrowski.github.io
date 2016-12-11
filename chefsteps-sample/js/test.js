$(document).ready(function () {
	function createEmailLists() {
		var emails = [];
		for (var i = 0; i < 100000; i++) {
			var email = "savannah" + i.toString() + "@gmail.com";
			emails.push(email);

		}
		return emails;
	}

	function createDuplicateList() {
		var duplicateEmails = [];
		for (var i = 0; i < 100000; i++) {
			var email = "savannah" + i.toString() + "@gmail.com";
			duplicateEmails.push(email);
			var randomIdx = generateRandomNumber(i);
			var duplicate = duplicateEmails[randomIdx];
			duplicateEmails.push(duplicate);

		}
		return duplicateEmails;
	}

	function generateRandomNumber(num) {
		return Math.floor(Math.random() * num);
	}

	function equals(lst1, lst2) {
		return (lst1.length == lst2.length) && lst1.every(function(element, index) {
			return element === lst2[index]}); 
	}


	$('#run').click(function(e) {	
		var emails = createEmailLists();
		var duplicateEmails = createDuplicateList();
		var t0 = performance.now();
		var removedDup = removeDuplicates(duplicateEmails);
		var t1 = performance.now();
		var tf = equals(emails, removedDup);
		if (tf === true) {
			$("#tf").text("Yes");
		} else {
			$("#tf").text("No");
		}
		
		$("#second").text(Math.round((t1-t0) * 10) / 10 + " milliseconds");
	});

	// Other tests

	function allTests() {
		var testlst = ["a", "b", "e", "a", "e", "a", "c", "c", "b", "f"];
		var testlst2 = ["a"];
		var testlst3 = [];
		var testlst4 = ["a", "a", "a", "a"];
		console.log(equals((removeDuplicates(testlst)), ["a","b","e","c","f"]));
		console.log(equals((removeDuplicates(testlst2)), ["a"]));
		console.log(equals((removeDuplicates(testlst3)), []));
		console.log(equals((removeDuplicates(testlst4)), ["a"]));
	}
	allTests();

});
