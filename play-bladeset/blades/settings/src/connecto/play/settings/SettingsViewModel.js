'use strict';

var ko = require( 'ko' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

function SettingsViewModel() {
	this._eventHub = ServiceRegistry.getService( 'br.event-hub' );
	this.availableCategories = ko.observableArray(['animals', 'sports', 'transport', 'vegetables']);
	this.selectedCategory = ko.observable("animals");

	this.availableLanguages = ko.observableArray(['Spanish', 'French']);
	this.selectedLanguage = ko.observable("Spanish");

	this.player1 = ko.observable("Player 1");
	this.player2 = ko.observable("Player 2");
}

SettingsViewModel.prototype.categoryChanged = function() {
	this._eventHub.channel( 'settings' ).trigger( 'change-category', this.selectedCategory() );
};

SettingsViewModel.prototype.playerOneNameChanged = function(args) {
	this._eventHub.channel( 'settings' ).trigger( 'change-player-name', 1, this.player1() );
};

SettingsViewModel.prototype.playerTwoNameChanged = function(args) {
	this._eventHub.channel( 'settings' ).trigger( 'change-player-name', 2, this.player2() );
};

SettingsViewModel.prototype.languageChanged = function() {
	this._eventHub.channel( 'settings' ).trigger( 'change-language', this.selectedLanguage() );
};

module.exports = SettingsViewModel;
