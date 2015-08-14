'use strict';

var ko = require( 'ko' );
var i18n = require( 'br/I18n' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

var Column = require('lang/play/grid/Column');

function GridViewModel() {
	this.size = 7; //todo: make configurable
	
	this.columns = ko.observableArray();
	
	this.players = ["Player 1:", "Player 2:"];
	this.redTurn = ko.observable(true);

	
	this.currentPlayer = ko.observable(this.players[0]);
	this.currentColour = "red";

	this.arrow = ko.observable("O");//DOWN
	this.columnsEnabled = ko.observable(true);
	
	this.messages = ["Select a column", "Identify the image"];
	this.message = ko.observable(this.messages[0]);

	for(var i = 1; i <= this.size  ; i++)
	{
		this.columns.push(new Column(this.size , i));
	}
	
	this._eventHub = ServiceRegistry.getService( 'br.event-hub' );

	this._eventHub.channel( 'grid' ).on( 'take-turn', this.executeTurn, this );	
	window.yyy = this;
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
	var newPlayer = this.currentPlayer() == this.players[0] ? this.players[1] :  this.players[0];
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

module.exports = GridViewModel;
