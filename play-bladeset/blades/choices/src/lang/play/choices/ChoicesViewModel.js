'use strict';

var ko = require( 'ko' );
var Translations = require( 'translations/Translations' );
var Randomator = require( 'randomator/Randomator' );

var ServiceRegistry = require( 'br/ServiceRegistry' );

function ChoicesViewModel() {
	this._eventHub = ServiceRegistry.getService( 'br.event-hub' );	
	this._eventHub.channel( 'grid' ).on( 'next-options', this._getOptions, this );
	this._eventHub.channel( 'settings' ).on( 'change-category', this._setNewCategory, this );
	
	var imageLocation = this._computeResourceURL();
	this.bgImage = ko.observable(imageLocation);
	this.message = ko.observable( "" );
	this.translations = new Translations();

	this.rando = new Randomator();
	
	this.category = ko.observable("Animals");
	this.allChoices = this.translations[this.category()];

	this.gameHasStarted = false;
	this.buttonsEnabled = ko.observable(false);
	
	this.numberOfOptions = 3;

	this.arrayMax = this.allChoices.length;
	
	this.currentOptions = ko.observableArray();
		
	this.currentImage;
	this.lastSelected = -1;
	
	this._createEmptyOptionsList();
	
	this._addClassToButtons();

	this._getInitialOptions();
	
	this._setNewCategory("Animals");

	this.redTurn = true;
}

ChoicesViewModel.prototype.setNewImage = function(name) {
	
	var oldUrl = this.bgImage().split("/");
	oldUrl[oldUrl.length - 2] = this.category();
	oldUrl[oldUrl.length - 1] = name + ")";
	var newUrl = oldUrl.join("/");
	
	this.bgImage(newUrl);
};

ChoicesViewModel.prototype._setNewCategory = function(category){
	this.category(category);
	this.allChoices = this.translations[this.category()];

	this.currentImage = this.allChoices[0].english;
	this._addClassToButtons();
	
	this._getOptions(true);	
}

ChoicesViewModel.prototype._getInitialOptions = function() {
	for(var i = 0; i < this.numberOfOptions; i++)
	{
		this.currentOptions()[i](this.allChoices[i]);
	}
	//TODO remove hardcoding
	this.setNewImage("dog.png");
};

ChoicesViewModel.prototype._getOptions = function(categoryChangedFlag) {

	if(this.lastSelected >= 0)
	{
		this._clearSelectedButton(this.lastSelected);
	}

	var randomOptionArray = this.rando.getSetNumberOfRandoms(this.numberOfOptions, this.arrayMax - 1);	

	for(var i = 0; i < this.numberOfOptions; i++)
	{
		var newIndex = randomOptionArray[i];
		this.currentOptions()[i](this.allChoices[newIndex]);
	}
	
	var randomSelection = this.rando.getRandomNumberUpTo(this.numberOfOptions);

	var newImage = this.currentOptions()[randomSelection]()["english"].replace(/\s/g, '') + ".png";
	this.setNewImage(newImage);
	this.message("");
	
	this.currentImage = this.currentOptions()[randomSelection]()["english"];

	if(this.gameHasStarted){
		this.buttonsEnabled(true);
	}
	else {
		this.gameHasStarted = true;
	}
};

ChoicesViewModel.prototype._createEmptyOptionsList = function() {
	for(var i = 0; i < this.numberOfOptions; i++)
	{
		this.currentOptions()[i] = ko.observable();
	}
};

ChoicesViewModel.prototype.submitAnswer = function(data) {
	if( data["english"] == this.currentImage )
	{
		this.message("Correct!!!");
		this._highlightAnswer(data["english"], true);
		this._eventHub.channel( 'grid' ).trigger( 'take-turn', true );
	}
	else
	{	
		this.message("Incorrect.");
		this._highlightAnswer(data["english"], false);
		this._eventHub.channel( 'grid' ).trigger( 'take-turn', false );
	}

	this.buttonsEnabled(false);
};

ChoicesViewModel.prototype._highlightAnswer = function(answer, correct) {
	for(var i = 0; i < this.currentOptions().length; i++)
	{
		if(this.currentOptions()[i]()["english"] == answer)
		{
			var copy = this.currentOptions()[i]();
			copy["redSelected"] = this.redTurn ? true : false;
			copy["blueSelected"] = this.redTurn ? false : true;
			this.currentOptions()[i](copy);
			this.lastSelected = i;
		}
	}
	this.redTurn = this.redTurn ? false : true;
};

ChoicesViewModel.prototype._addClassToButtons = function() {
	for(var i = 0; i < this.allChoices.length; i++)
	{
		this.allChoices[i]["redSelected"] = false;
		this.allChoices[i]["blueSelected"] = false;
	}
};


ChoicesViewModel.prototype._clearSelectedButton = function(index) {
	var copy = this.currentOptions()[index]();
	copy["redSelected"] = false;
	copy["blueSelected"] = false;
	this.currentOptions()[index](copy);
};

ChoicesViewModel.prototype._computeResourceURL = function() {
	return window.getComputedStyle(document.getElementById("dumb")).getPropertyValue("background-image");
}

module.exports = ChoicesViewModel;
