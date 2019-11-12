var JSON_URL = "http://socialclub.rockstargames.com/games/gtav/ajax/stockdetail";
var HMTL = "";

var marketGenerator = {
	requestServerData: function (e) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", JSON_URL, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				STOCKS = JSON.parse(xhr.responseText);
				HMTL = HMTL + "<div id=stocks>";
				for (var key in STOCKS) {
					if( key == "Stocks" ) {
						var company = STOCKS[key];
						for (var prop in company) {
							if(company.hasOwnProperty(prop)){   // important check that this is objects own property  not from prototype prop inherited
								HMTL = HMTL + "<div class=\"company " + company[prop].CompanyCode + " " + company[prop].PriceMovementDirection + "\"><span class=acronym>" + company[prop].CompanyCode + "</span> " + company[prop].CompanyName + " <span class=highlight_" + company[prop].PriceMovementDirection + ">" + company[prop].CurrentPrice + "</span> " + company[prop].PriceMovement + " (" + company[prop].PriceMovementPercent + "%) - " + company[prop].PriceHistory + "</div>";
							}
						}
					}
				}
				htmlElement = document.createElement('div');
				var HMTL = HMTL + "</div>";
				htmlElement.innerHTML = HMTL;
				document.body.appendChild(htmlElement);
			}
		}
		xhr.send();
	}
};

document.addEventListener('DOMContentLoaded', function () {
  marketGenerator.requestServerData();
});
