'use strict';


var ServiceRegistry = require( 'br/ServiceRegistry' );

function Column(length, index) {
	
	this._eventHub = ServiceRegistry.getService( 'br.event-hub' );
	this.cells = ko.observableArray();
	this.length = length;
	this.selected = ko.observable(false);
	this.index = ko.observable(index);	
	this.firstAvailableSpace = length - 1;
	
	this.initialize(length, index);
};

Column.prototype.initialize = function(length, index)
{
	for(var i = length ; i > 0 ; i--)
	{
		var content = { colour: ko.observable("empty") }
		this.cells.push(content);
	}
};

Column.prototype.addDisc = function(colour)
{
	this.cells()[this.firstAvailableSpace].colour(colour);
	this.firstAvailableSpace--;
};

Column.prototype.select = function()
{
	if(this.firstAvailableSpace >= 0)
	{
		this.selected(true);
		this._eventHub.channel( 'grid' ).trigger( 'next-options' );
	}
};

Column.prototype.deSelect = function()
{
	this.selected(false);
};

Column.prototype.clearAllDiscs = function()
{
	for(var i = 0; i < this.length ; i++ )
	{
		this.cells()[i].colour("empty");
	}
	this.firstAvailableSpace = this.length - 1;
};

module.exports = Column;