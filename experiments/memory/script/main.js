(function(){

"use strict";
document.getElementsByTagName('input')[0].addEventListener("click", start);
function start (){
	var n = 0,
		startElem,
		gameBoard = document.getElementById('game'),
		d = document.createElement("div"),
		score = document.createElement("span"),
		selectedCards = [];
	
	score.addEventListener("select", select);
	d.innerHTML="Score: ";
	score.innerHTML=n;
	d.appendChild(score);
	gameBoard.appendChild(d);

	function advance (nOfPairs){
		var cardList = [];
		for (var i = 0; i < nOfPairs; i++){
			n++;
			cardList.push({group:n,element:document.importNode(newCard(n), true)});
			cardList.push({group:n,element:document.importNode(newCard(n), true)});
		}
		cardList.sort(function(currVal, nextVal){
			return Math.random() - 0.5;
		});
		cardList.forEach(function(v, i, a){
			var lm = v.element.querySelector("figure");
			lm.group = v.group
			lm.querySelector("img").className = "hidden";
			lm.addEventListener("click", function(ev){
				console.log("Clicked: " + lm.group);
				select(lm);
				this.querySelector("img").className = "visible";
			});
			gameBoard.appendChild(lm);
		});
	}
	function newCard (n){
		var template = document.querySelector('#card');
		template.content.querySelector("img").src =
			"http://lorempixel.com/200/200/animals/" + n;
		return template.content;
	}
	function select(selectedCard){
		selectedCards.push(selectedCard);
		if (selectedCards.length > 1 ){
			if (selectedCards.every(function(v, i, a){
					return( v.group === this.group);
				}, selectedCard)){
				console.log("pair");
			} else {
				console.log("mismatch")
				selectedCards.forEach(function(v,i,a){
					console.log(v.querySelector("img").className);
					v.querySelector("img").className="hidden";
				});				
			}
			selectedCards.length = 0;
		}

	}
//Init
	startElem = document.getElementById("start");
	startElem.style.display = "none";
	advance(3);
}
}());
