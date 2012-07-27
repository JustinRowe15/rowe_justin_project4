// Justin M. Rowe
// Project 4
// Visual Frameworks 1207 (VFW)
// Mobile Development
// Full Sail University

//Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function () {

	//getElementById function
	function $(x) {
		var element = document.getElementById(x);
		return element;
	}

	//Create select field element and populate with options.
	function enterProduct() {
		var formTag = document.getElementsByTagName("form"),
			selectLi = $('select'),
			makeInfoBlocks = document.createElement('select');
		makeInfoBlocks.setAttribute("id", "groups");
		for (var i=0, j=productType.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optionText = productType[i];
			makeOption.setAttribute("value", optionText);
			makeOption.innerHTML = optionText;
			makeInfoBlocks.appendChild(makeOption);
		}
		selectLi.appendChild(makeInfoBlocks);
	}
	
	function getContractingCheckboxValue() {
		if($('nocontracting').checked) {
			nocontractingValue = $('nocontracting').value;
		} else {
			nocontractingValue = "No";
		}
	}
	
	function getTestingCheckboxValue() {
		if($('notesting').checked) {
			notestingValue = $('notesting').value;
		} else {
			notestingValue = "No";
		}
	}
	
	function getTrainingCheckboxValue() {
		if($('notraining').checked) {
			notrainingValue = $('notraining').value;
		} else {
			notrainingValue = "No";
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				$('projectForm').style.display = "none";
				$('clear').style.display = "inline";
				$('display').style.display = "none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('projectForm').style.display = "block";
				$('clear').style.display = "inline";
				$('display').style.display = "inline";
				$('addNew').style.display = "inline";
				$('items').style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	function storeData(key) {
		//If there is no key, this means this is a brand new item and we need a new key.
		if(!key){
			var id 					= Math.floor(Math.random()*100000001);
		} else {
			//Set id to the existing key that we're editing so that it will save over the data.
			//The key is the same key that has been passed along from the editSubmit event handler
			id = key;
		}
		//getCheckboxValue();
		var item					= {};
			item.pname				= ["Project Name:", $('pname').value];
			item.pmfname			= ["First Name:", $('pmfname').value];
			item.pmlname			= ["Last Name:", $('pmlname').value];
			item.sdate				= ["Project Start Date:", $('sdate').value];
			item.fdate				= ["Project Finish Date:", $('fdate').value];
			item.contractstart		= ["Contract Start Date:", $('contractstart').value];
			item.contractaward		= ["Contract Award Date:", $('contractaward').value];
			item.productionstart	= ["Vendor Production Start Date:", $('productionstart').value];
			item.productionfinish	= ["Vendor Production Finish Date:", $('productionfinish').value];
			item.teststart			= ["Testing Start Date:", $('teststart').value];
			item.testfinish			= ["Testing Finish Date:", $('testfinish').value];
			item.delivery			= ["Delivery Date:", $('delivery').value];
			item.nocontracting		= ["Contracting N/A", nocontractingValue];
			item.notesting			= ["Testing N/A", notestingValue];	
			item.notraining			= ["Training N/A", notrainingValue];
			item.group				= ["Product Type:", $('groups').value];
			item.notes				= ["Notes:", $('notes').value];
		//Save Data to Local Storage
		localStorage.setItem(id, JSON.stringify(item));
		alert("Project Saved!");
		
	}
	
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in Local Storage so default data was added.");
			autoFillData();
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "display";
		for(i=0, j=localStorage.length; i<j; i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			getImage(obj.group[1], makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi);
		}
	}
	
	function getImage(picName, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/"+ picName +".png");
		imageLi.appendChild(newImg);
	}
	
	//Autopopulate Local Storage
	function autoFillData(){
		//The actual JSON object data required for this to work is coming from our json.js file which is loaded from our HTML page.
		//Store JSON into local storage.
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	function makeItemLinks(key, linksLi){
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Project";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Project";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		toggleControls("off");
		$('groups').value = item.group[1];
		$('pname').value = item.pname[1];
		$('pmfname').value = item.pmfname[1];
		$('pmlname').value = item.pmlname[1];
		$('sdate').value = item.sdate[1];
		$('fdate').value = item.fdate[1];
		$('contractstart').value = item.contractstart[1];
		$('contractaward').value = item.contractaward[1];
		$('productionstart').value = item.productionstart[1];
		$('productionfinish').value = item.productionfinish[1];
		$('teststart').value = item.teststart[1];
		$('testfinish').value = item.testfinish[1];
		$('delivery').value = item.delivery[1];
		if(item.nocontracting[1] == "Yes"){
			$('nocontracting').setAttribute("checked", "checked");
		}
		if(item.notesting[1] == "Yes"){
			$('notesting').setAttribute("checked", "checked");
		}
		if(item.notraining[1] == "Yes"){
			$('notraining').setAttribute("checked", "checked");
		}
		$('notes').value = item.notes[1];
		
		save.removeEventListener("click", storeData);
		
		$('submit').value = "Edit Project";
		var editSubmit = $('submit');
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this project?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Project deleted!");
			window.location.reload();
		} else {
			alert("Project was not deleted.")
		}
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.")
		} else {
			localStorage.clear();
			alert("All contacts are deleted!");
			window.location.reload();
			return false;
		}
	}
	
	function validate(e){
		var getPname = $('pname');
		var getPmfname = $('pmfname');
		var getPmlname = $('pmlname');
		
		//Reset Error Messages
		errMsg.innerHTML = " ";
		getPname.style.border = "1px solid black";
		getPmfname.style.border = "1px solid black";
		getPmlname.style.border = "1px solid black";
		
		//Get Error Messages
		var messageAry = [];
		if(getPname.value === ""){
			var pnameError = "Please enter a project name."
			getPname.style.border = "1px solid red";
			messageAry.push(pnameError);
		}
		if(getPmfname.value === ""){
			var pmfnameError = "Please enter a first name."
			getPmfname.style.border = "1px solid red";
			messageAry.push(pmfnameError);
		}
		if(getPmlname.value === ""){
			var pmlnameError = "Please enter a last name."
			getPmlname.style.border = "1px solid red";
			messageAry.push(pmlnameError);
		}
		
		/*Email Validation
		var re = /^\w+([\.=]?\w+)*@\w+([\.=]?\w+)*(\.\w{2,3})+$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid email address.";
			getEmail.style.border = "1px solid red";
			messageAry.push(emailError);
		}*/
		
		//If there were errors, display them on the screen.
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i<j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		} else {
			//If all is ok, save our data.  Send key value from editData function.
			//Remember key value was passed through the editSubmit event Listener
			storeData(this.key);
		}
	}	

	//variable defaults
	var productType = ["Commercial Off The Shelf", "Modified Commercial Off The Shelf", "Research and Development"];
		nocontractingValue = "No";
		notestingValue = "No";
		notrainingValue = "No"
		errMsg = $('errors');
	;
	enterProduct();

	//Set Link & Submit Click Events
	var displayLink = $('display');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", validate);



});