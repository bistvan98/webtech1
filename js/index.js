/*********************************************************************************************/

/********Bajusz István OBYBZK WEB Technológiák I. beadandó feladat JS/************************/

/*********************************************************************************************/

/*A még nem lényeges dolgokat elrejti a JS */
$(document).ready(function(){  
	$("#addCar").hide();
	$("#addManufacturer").hide();
	$("#modCar").hide();
	$("#modManufacturer").hide();
});

/*Az oldalsó menü megnyitása */

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/*Az oldalsó menü bezárása */

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

/*Az alpértelmezett kép az 1-es számú */

var slideIndex = 1;
showSlides(slideIndex);

/*A képváltó nyilak ezt a függvényt hávják meg, kattintástól függően +1 vagy -1 értékkel n helyén (lenti függvény miatt nem lehet túl nagy vagy túl kicsi a keletkező szám)*/

function plusSlides(n) {
  showSlides(slideIndex += n);
}

/*Ha a körökre kattintva váltok képet, akkor ezt a függvényt hívja meg, kattintástól függően kap értéket */

function currentSlide(n) {
  showSlides(slideIndex = n);
}

/*A slide-ok működéséhez szükséges függény */

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides"); /* Megszámolja, hogy hány slide van, az egyedi class-uk miatt */
  var dots = document.getElementsByClassName("dot"); /* A pontokat is megszámolja, szintén egyedi class */
  
  if (n > slides.length) {slideIndex = 1} /* Ügyel arra, hogy a következő szám ne lehessen nagyobb, mint a slide-ok száma */
  
  if (n < 1) {slideIndex = slides.length} /* Ügyel arra, hogy ne is lehessen kisebb */
  
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

/* A "Home" menü megnyomásával visszaáll az oldal kinézete az alpértelmezettre */

function homeMenu() {
	
	/* Az éppen megynitott részek elhalványulva tűnnek el */
    $("#listManufacturers").fadeOut(700);
    $("#listCar").fadeOut(700);
    $("#addCar").fadeOut(700);
    $("#addManufacturer").fadeOut(700);
    $("#modManufacturer").fadeOut(700);
    $("#modCar").fadeOut(700);
}

/* ---------------------- "Car" táblázat" ---------------------------*/

/*A "Car" táblázat kilisázásához szükséges függvény */
function listCars() {
	/* Minden mást elrejt, ami nem ide tartozik (a slide, a menük és az alsó információk maradnak) */
    $("#listManufacturers").hide();
    $("#addCar").fadeOut(700);
    $("#addManufacturer").fadeOut(700);
    $("#modManufacturer").fadeOut(700);
    $("#modCar").fadeOut(700);
	$("#listCar").fadeIn(700);

	/*Az információkat megszerzi, majd táblázattá alakítja */
	/* a let kulcsszó miatt csak a blokkon belül használhatóak a változók */
    $.getJSON(`https://webtechcars.herokuapp.com/api/cars`, function (data) {
        let table = $('<table id="listTableCar" border="2" class="table2"></table>');
        table.append('<tr><th class="tableEntity">ID</th><th class="tableEntity">Name</th><th class="tableEntity">Consumption</th><th class="tableEntity">Color</th><th class="tableEntity">Manufacturer</th><th class="tableEntity">Available</th><th class="tableEntity">Year</th><th class="tableEntity">Horsepower</th></tr>');
        $.each(data, function (key, value) {
			/*Behelyettesíti a megfelelő adatokat */
            let row = $('<tr></tr>');
            let idCell = $('<td class="tableEntity">' +value._id+ '</td>');
            let nameCell = $('<td class="tableEntity">' + value.name + '</td>');
            let consumptionCell = $('<td class="tableEntity">' + value.consumption +'</td>');
            let colorCell = $('<td class="tableEntity">' + value.color + '</td>');
            let manufacturerCell = $('<td class="tableEntity">' + value.manufacturer +' </td>');
            let availableCell = $('<td class="tableEntity">' + value.avaiable + '</td>');
            let yearCell = $('<td class="tableEntity">' + value.year + '</td>');
            let horsepowerCell = $('<td class="tableEntity">' + value.horsepower + '</td>');
            row.append(idCell);
            row.append(nameCell);
            row.append(consumptionCell);
            row.append(colorCell);
            row.append(manufacturerCell);
            row.append(availableCell);
            row.append(yearCell);
            row.append(horsepowerCell);
            table.append(row)
        });
        $('#listCar').html(table);
    });

}

/*A "Car" táblához egy új adat hozzáadásához szükséges felületet megvalósító JS rész */
function addCar() {
	/*A felesleges részek eltűnnek, a teljes "Car" lista megmarad, könnyebb ellenőrizni, hogy megadtuk-e már */
    $("#listManufacturers").hide();
    $("#addManufacturer").hide();
    $("#modManufacturer").hide();
    $("#modCar").hide();
	$("#listCar").fadeIn(700);
	$("#addCar").fadeIn(700);

    let dropdown = $('#dropdown');

    dropdown.empty();
    dropdown.append('<option  disabled>Select a manufacturer!</option>');
    dropdown.prop('selectedIndex', 0);
    const url = 'https://webtechcars.herokuapp.com/api/manufacturers';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            dropdown.append($('<option></option>').attr('value', entry.id).text(entry.name));
        })
    });
}

/*A "Car" listához elemet hozzáadó felület előhozása */
function modCar() {
    $("#listManufacturers").hide();
    $("#addCar").hide();
    $("#modManufacturer").hide();
    $("#addManufacturer").hide();
	$("#listCar").fadeIn(700);
    $("#modCar").fadeIn(700);

}

/*A "Car" listából törlése JS része */
function deleteCar (id) {
    $.ajax({
        url: `https://webtechcars.herokuapp.com/api/cars/`+id,
        type: 'DELETE',
        contentType: "application/json",
        success: function () {
            listCars();
        },
        error: function () {
            alert("Error!");
        }
    });
}

/*A "Car" listából való törléshez betölti a teljes listát, egy "Delete" gombbal kiegészítve */
function deleCar() { 
    $("#listManufacturers").hide();
    $("#addCar").hide();
    $("#addManufacturer").hide();
    $("#modManufacturer").hide();
    $("#modCar").hide();
	$("#listCar").fadeIn(700);


    $.getJSON(`https://webtechcars.herokuapp.com/api/cars`, function (data) {
        let table = $('<table id="listTableCar" border="2" class="table2"></table>');
        table.append('<tr><th class="tableEntity">Delete</th><th class="tableEntity">ID</th><th class="tableEntity">Name</th><th class="tableEntity">Consumption</th><th class="tableEntity">Color</th><th class="tableEntity">Manufacturer</th><th class="tableEntity">Available</th><th class="tableEntity">Year</th><th class="tableEntity">Horsepower</th></tr>');
        $.each(data, function (key, value) {
            let row = $('<tr></tr>');
            let delButton = $('<td class="tableEntity"><button onclick="deleteCar(\''+value._id+'\')">Delete</button></td>');
            let idCell = $('<td class="tableEntity">' +value._id+ '</td>');
            let nameCell = $('<td class="tableEntity">' + value.name + '</td>');
            let consumptionCell = $('<td class="tableEntity">' + value.consumption +'</td>');
            let colorCell = $('<td class="tableEntity">' + value.color + '</td>');
            let manufacturerCell = $('<td class="tableEntity">' + value.manufacturer +' </td>');
            let availableCell = $('<td class="tableEntity">' + value.avaiable + '</td>');
            let yearCell = $('<td class="tableEntity">' + value.year + '</td>');
            let horsepowerCell = $('<td class="tableEntity">' + value.horsepower + '</td>');
            row.append(delButton);
            row.append(idCell);
            row.append(nameCell);
            row.append(consumptionCell);
            row.append(colorCell);
            row.append(manufacturerCell);
            row.append(availableCell);
            row.append(yearCell);
            row.append(horsepowerCell);
            table.append(row)
        });
        $('#listCar').html(table);
    });
}

/*A "Car" lista elemének módosításához betölti a teljes "Car" listát egy "Modify" gombbal kiegészítve */
function modifCar() {
    $("#listManufacturers").hide();
    $("#addCar").hide();
    $("#addManufacturer").hide();
    $("#modManufacturer").hide();
    $("#modCar").hide();
	$("#listCar").fadeIn(700);


    $.getJSON(`https://webtechcars.herokuapp.com/api/cars`, function (data) {
        let table = $('<table id="listTableCar" border="2" class="table2"></table>');
        table.append('<tr><th class="tableEntity">Modify</th><th class="tableEntity">ID</th><th class="tableEntity">Name</th><th class="tableEntity">Consumption</th><th class="tableEntity">Color</th><th class="tableEntity">Manufacturer</th><th class="tableEntity">Available</th><th class="tableEntity">Year</th><th class="tableEntity">Horsepower</th></tr>');
        $.each(data, function (key, value) {
            let row = $('<tr></tr>');
            let modButton = $("<td class='tableEntity'><button onclick='modifyCar("+JSON.stringify(value)+")'>Modify</button></td>");
            let idCell = $('<td class="tableEntity">' +value._id+ '</td>');
            let nameCell = $('<td class="tableEntity">' + value.name + '</td>');
            let consumptionCell = $('<td class="tableEntity">' + value.consumption +'</td>');
            let colorCell = $('<td class="tableEntity">' + value.color + '</td>');
            let manufacturerCell = $('<td class="tableEntity">' + value.manufacturer +' </td>');
            let availableCell = $('<td class="tableEntity">' + value.avaiable + '</td>');
            let yearCell = $('<td class="tableEntity">' + value.year + '</td>');
            let horsepowerCell = $('<td class="tableEntity">' + value.horsepower + '</td>');
            row.append(modButton);
            row.append(idCell);
            row.append(nameCell);
            row.append(consumptionCell);
            row.append(colorCell);
            row.append(manufacturerCell);
            row.append(availableCell);
            row.append(yearCell);
            row.append(horsepowerCell);
            table.append(row)
        });
        $('#listCar').html(table);
    });
}

/*A "Car listában egy elem módosításához szükséges felület betöltése */
function modifyCar(car){
    modCar()
    $('#modCarForm #modCarID').val(car._id)
    $('#modCarForm #modCarName').val(car.name)
    $('#modCarForm #modConsumption').val(car.consumption)
    $('#modCarForm #modColor').val(car.color)
    $('#modCarForm #modManufacturer').val(car.manufacturer)
    $('#modCarForm #modAvailable').val(car.avaiable)
    $('#modCarForm #modYear').val(car.year)
    $('#modCarForm #modHorsepower').val(car.horsepower)

    let dropdown = $('#moddropdown');
    let manuf = [];

    $('#moddropdown option').remove();
    dropdown.append('<option value="0" disabled>Choose Manufacturer</option>');

    const url = 'https://webtechcars.herokuapp.com/api/manufacturers';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            dropdown.append($('<option></option>').attr('value', entry.name).text(entry.name));
        })
        manuf = data;
    }).then(function (){
        dropdown.val(0);
        for (let i in manuf) {
            if (manuf[i].name === car.manufacturer) {
                dropdown.val(manuf[i].name);
            }
        }
    });
}

/*-------------------"Car" táblázat vége----------------------*/

/*------------------"Manufacturers" táblázat--------------------*/

/*A "Manufacturers" lista betöltése */
function listManufacturers() {
    $("#listCar").hide();
    $("#addCar").fadeOut(700);
    $("#addManufacturer").fadeOut(700);
    $("#modManufacturer").fadeOut(700);
    $("#modCar").fadeOut(700);
	$("#listManufacturers").fadeIn(700);

    $.getJSON("https://webtechcars.herokuapp.com/api/manufacturers", function (data) {
        let table = $('<table id="listTableManufacturers" border="2" class="table2"></table>');
        table.append('<tr><th class="tableEntity">ID</th><th class="tableEntity">Name</th><th class="tableEntity">Country</th><th class="tableEntity">Founded</th></tr>');
        $.each(data, function (key, value) {
            let row = $('<tr></tr>');
            let idCell = $('<td class="tableEntity">' + value._id + '</td>');
            let nameCell = $('<td class="tableEntity">' + value.name + '</td>');
            let countryCell = $('<td class="tableEntity">' + value.country + ' </td> ');
            let foundedCell = $('<td class="tableEntity">' + value.founded + ' </td>');
            row.append(idCell);
            row.append(nameCell);
            row.append(countryCell);
            row.append(foundedCell);
            table.append(row)
        });
        $('#listManufacturers').html(table);
    });
}

/*A "Manufacturers" lista elemének szerkesztéséhez betölti az egész listát egy "Modify" gombbal kiegészítve */
function modifManufacturer() {
    $("#listCar").hide();
    $("#addCar").hide();
    $("#addManufacturer").hide();
    $("#modManufacturer").hide();
    $("#modCar").hide();
	$("#listManufacturers").fadeIn(700);

    $.getJSON("https://webtechcars.herokuapp.com/api/manufacturers", function (data) {
        let table = $('<table id="listTableManufacturers" border="2" class="table2"></table>');
        table.append('<tr><th class="tableEntity">Modify</th><th class="tableEntity">ID</th><th class="tableEntity">Name</th><th class="tableEntity">Country</th><th class="tableEntity">Founded</th></tr>');
        $.each(data, function (key, value) {
            let row = $('<tr></tr>');
            let modButton = $("<td class='tableEntity'><button onclick='modifyManufacturer("+JSON.stringify(value)+")'>Modify</button></td>");
            let idCell = $('<td class="tableEntity">' + value._id + '</td>');
            let nameCell = $('<td class="tableEntity">' + value.name + '</td>');
            let countryCell = $('<td class="tableEntity">' + value.country + ' </td> ');
            let foundedCell = $('<td class="tableEntity">' + value.founded + ' </td>');
            row.append(modButton);
            row.append(idCell);
            row.append(nameCell);
            row.append(countryCell);
            row.append(foundedCell);
            table.append(row)
        });
        $('#listManufacturers').html(table);
    });
}

/*A "Manufacturers" listából törléshez betölti az egész listát egy "Delete" gombbal kiegésztítve */
function deleManufacturer() {
    $("#listCar").hide();
    $("#addCar").hide();
    $("#addManufacturer").hide();
    $("#modManufacturer").hide();
    $("#modCar").hide();
	$("#listManufacturers").fadeIn(700);

    $.getJSON("https://webtechcars.herokuapp.com/api/manufacturers", function (data) {
        let table = $('<table id="listTableManufacturers" border="2" class="table2"></table>');
        table.append('<tr><th class="tableEntity">Delete</th><th class="tableEntity">ID</th><th class="tableEntity">Name</th><th class="tableEntity">Country</th><th class="tableEntity">Founded</th></tr>');
        $.each(data, function (key, value) {
            let row = $('<tr></tr>');
            let delButton = $('<td class="tableEntity"><button onclick="deleteManufacturer(\''+value._id+'\')">Delete</button></td>');
            let idCell = $('<td class="tableEntity">' + value._id + '</td>');
            let nameCell = $('<td class="tableEntity">' + value.name + '</td>');
            let countryCell = $('<td class="tableEntity">' + value.country + ' </td> ');
            let foundedCell = $('<td class="tableEntity">' + value.founded + ' </td>');
            row.append(delButton);
            row.append(idCell);
            row.append(nameCell);
            row.append(countryCell);
            row.append(foundedCell);
            table.append(row)
        });
        $('#listManufacturers').html(table);
    });	
}

/*A "Manufacturers" listából egy elem törlése */
function deleteManufacturer (id) {
    $.ajax({
        url: `https://webtechcars.herokuapp.com/api/manufacturers/`+id,
        type: 'DELETE',
        contentType: "application/json",
        success: function () {
            listManufacturers();
        },
        error: function () {
            alert("Error!");
        }
    });

}

/*A "Manufacturers" lista elemének szerkesztéséhez betöltött felület és adatok*/
function modifyManufacturer(manuf){
    modManufacturer()
    $('#modManufacturerForm #modId').val(manuf._id)
    $('#modManufacturerForm #modName').val(manuf.name)
    $('#modManufacturerForm #modCountry').val(manuf.country)
    $('#modManufacturerForm #modFounded').val(manuf.founded)
}

/*A "Manufacturers" listához elem hozzáadásához szükséges felület betöltése */
function addManufacturer() {
    $("#listCar").hide();
    $("#addCar").hide();
    $("#modManufacturer").hide();
    $("#modCar").hide();
	$("#listManufacturers").fadeIn(700);
	$("#addManufacturer").fadeIn(700);
}

/*A "Manufacturers" lista egy elemének módosításához szükséges felület betöltése */
function modManufacturer() {
    $("#listCar").hide();
    $("#addCar").hide();
    $("#addManufacturer").hide();
    $("#modCar").hide();
	$("#listManufacturers").fadeIn(700);
	$("#modManufacturer").fadeIn(700);
}

/*---------------"Manufacturer" táblázat vége-------------------*/

/*A tevékenységek után a gombnyomásra való utasítások */
$(function() {

	/*Elem hozzáadása a "Car" listához*/
    $('#addCarForm').on("submit", function (e) {
        e.preventDefault();
		
		/*Ellenőrzi, hogy minden adatok megadtak-e */
		if((($("#addCarName").val()) == "") || (($("#addConsumption").val()) == "") || (($("#addColor").val()) == "") || (($("#dropdown").val()) == "") || (($("#addAvailable").val()) == "")
		|| (($("#addYear").val()) == "") || (($("#addHorsepower").val()) == "")) {
			alert("Error! You forgot to give atleast one data!");
		} else {
			$.ajax({
				type: 'post',
				url: 'https://webtechcars.herokuapp.com/api/cars',
				data: JSON.stringify({
					name: $("#addCarName").val(),
					consumption: $("#addConsumption").val(),
					color: $("#addColor").val(),
					manufacturer: $("#dropdown").val(),
					avaiable: $("#addAvailable").val(),
					year: $("#addYear").val(),
					horsepower: $("#addHorsepower").val()

				}),
				contentType: "application/json",
				success: function () {
					listCars()
				},
				error: function () {
					alert("Error! Check the entered data!");
				}
			})
		}
    });

	/*Elem módosítása a "Car" listában */
    $('#modCarForm').on("submit", function (e) {
        e.preventDefault();
		
		/*Ellenőrzi, hogy minden adat meg lett-e adva */
		if((($("#modCarId").val()) == "") || (($("#modCarName").val()) == "") || (($("#modConsumption").val()) == "") || (($("#modColor").val()) == "") || (($("#moddropdown").val()) == "") || (($("#modAvailable").val()) == "")
		|| (($("#modYear").val()) == "") || (($("#modHorsepower").val()) == "")) {
			alert("Error! You forgot to give atleast one data!");
		} else {
			$.ajax({
				type: 'post',
				url: 'https://webtechcars.herokuapp.com/api/cars',
				data: JSON.stringify({
					id: $("#modCarID").val(),
					name: $("#modCarName").val(),
					consumption: $("#modConsumption").val(),
					color: $("#modColor").val(),
					manufacturer: $("#moddropdown").val(),
					avaiable: $("#modAvailable").val(),
					year: $("#modYear").val(),
					horsepower: $("#modHorsepower").val()

				}),
				contentType: "application/json",
				success: function () {
					/*Ha sikeres, akkor törli az előző verziót */
					deleteCar($("#modCarID").val())
					listCars()
				},
				error: function () {
					alert("Error! Check the entered data!");
				}
			})
		}
    });

	/*Elem hozzáadása a "Manufacturers" listához */
    $('#addManufacturerForm').on("submit", function (e) {
        e.preventDefault();
		
		/*Ellenőrzi, hogy minden adatot megadott-e a felhasználó */
		if((($("#addName").val()) == "") || (($("#addCountry").val()) == "") || (($("#addFounded").val()) == "")) {
			alert("Error! You forgot to give atleast one data!");
		} else {
			$.ajax({
				type: 'post',
				url: 'https://webtechcars.herokuapp.com/api/manufacturers',
				data: JSON.stringify({
					name: $("#addName").val(),
					country: $("#addCountry").val(),
					founded: $("#addFounded").val()
				}),
				contentType: "application/json",
				success: function () {
					listManufacturers()
				},
				error: function () {
					alert("Error! Check the entered data!");
				}
			})
		}
    });

	/*Egy elem módosítása a "Manufacturers" listában */
    $('#modManufacturerForm').on("submit", function (e) {
        e.preventDefault();
		
		/*Ellenőrzi, hogy minden adat meg lett-e adva */
		if((($("#modId").val()) == "") || (($("#modName").val()) == "") || (($("#modCountry").val()) == "") || (($("#modFounded").val()) == "")) {
			alert("Error! You forgot to give atleast one data!");
		} else {
			$.ajax({
				type: 'post',
				url: 'https://webtechcars.herokuapp.com/api/manufacturers',
				data: JSON.stringify({
					id: $("#modId").val(),
					name: $("#modName").val(),
					country: $("#modCountry").val(),
					founded: $("#modFounded").val()
				}),
				contentType: "application/json",
				success: function () {
					/*Ha sikeres, akkor törli a régebbi verziót */
					deleteManufacturer($("#modId").val())
					listManufacturers()
				},
				error: function () {
					alert("Error! Check the entered data!");
				}
			})
		}
    });
});