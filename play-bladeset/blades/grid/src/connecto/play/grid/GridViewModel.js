'use strict';

var ko = require( 'ko' );
var i18n = require( 'br/I18n' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

var Column = require('connecto/play/grid/Column');

function GridViewModel() {
	this.size = 7; //todo: make configurable
	
	this.columns = ko.observableArray();

	this.firstPlayerName = ko.observable("Player 1");
	this.secondPlayerName = ko.observable("Player 2");

	
	this.players = [this.firstPlayerName(), this.secondPlayerName()];
	this.redTurn = ko.observable(true);
	
	this.currentPlayer = ko.observable(this.firstPlayerName());
	this.currentColour = "red";

	this.arrow = ko.observable("O");//DOWN
	this.columnsEnabled = ko.observable(true);
	
	this.messages = ["select a column", "identify the image"];
	this.message = ko.observable(this.messages[0]);

	for(var i = 1; i <= this.size  ; i++)
	{
		this.columns.push(new Column(this.size , i));
	}
	
	this._eventHub = ServiceRegistry.getService( 'br.event-hub' );

	this._eventHub.channel( 'grid' ).on( 'take-turn', this.executeTurn, this );	
	this._eventHub.channel( 'settings' ).on( 'change-player-name', this._changePlayerName, this );
	window.xxx = this;
};

GridViewModel.prototype.executeTurn = function(correct)
{	
	this.columnsEnabled(true);
	for(var i = 0; i < this.size ; i++)
	{
		if(this.columns()[i].selected())
		{
			if(correct)
			{
				this.columns()[i].addDisc(this.currentColour);
			}
			this.columns()[i].deSelect();
			this.currentColour = this.currentColour == "red" ? "blue" : "red";
			this._changePlayer();
			this._changeMessage();
			return;
		}
	}	
	
};

GridViewModel.prototype.deselectAll = function()
{
	for(var i = 0; i < this.size ; i++)
	{
		this.columns()[i].deSelect();
	}
	
	this._changeMessage();
	this.columnsEnabled(false);
};

GridViewModel.prototype._changePlayer = function()
{
	var newPlayer = this.currentPlayer() == this.firstPlayerName() ? this.secondPlayerName():  this.firstPlayerName();
	this.currentPlayer(newPlayer);

	var redTurn = this.redTurn() ? false : true;
	this.redTurn(redTurn);
};

GridViewModel.prototype._changeMessage = function()
{
	var newMessage = this.message() == this.messages[0] ? this.messages[1] : this.messages[0];
	this.message(newMessage);

	var newArrow = this.arrow() == "O" ? "M" : "O";
	this.arrow(newArrow);
};

GridViewModel.prototype._changePlayerName = function(playerNumber, newName)
{
	var currentPlayer;
	if(playerNumber == 1) {
		currentPlayer = this.currentPlayer() == this.firstPlayerName() ? newName : this.currentPlayer();
		this.firstPlayerName(newName);
	}
	else {
		currentPlayer = this.currentPlayer() == this.secondPlayerName() ? newName : this.currentPlayer();
		this.secondPlayerName(newName);		
	}

	this.currentPlayer(currentPlayer);
};

module.exports = GridViewModel;
