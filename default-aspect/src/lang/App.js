'use strict';

var GridViewModel = require( 'lang/play/grid/GridViewModel' );
var ChoicesViewModel = require( 'lang/play/choices/ChoicesViewModel' );
var SettingsViewModel = require( 'lang/play/settings/SettingsViewModel' );

var KnockoutComponent = require( 'br/knockout/KnockoutComponent' );
var SimpleFrame = require( 'br/component/SimpleFrame' );


var App = function() {

  this.appFrames = [];
    
  var gridViewModel = new GridViewModel();
  var gridComponent = new KnockoutComponent('lang.play.grid.view-template', gridViewModel );
  this.appFrames.push( { id: 'connecto-grid', frame: new SimpleFrame(gridComponent)});   

  var choicesViewModel = new ChoicesViewModel();
  var choicesComponent = new KnockoutComponent('lang.play.choices.view-template', choicesViewModel );
  this.appFrames.push( { id: 'connecto-choices', frame: new SimpleFrame(choicesComponent)}); 

  var settingsViewModel = new SettingsViewModel();
  var settingsComponent = new KnockoutComponent('lang.play.settings.view-template', settingsViewModel );
  this.appFrames.push( { id: 'connecto-settings', frame: new SimpleFrame(settingsComponent)});

  this._attachElements();    
};

App.prototype._attachElements = function() {
  for(var i = 0; i < this.appFrames.length; i++ ) {
    var element = document.getElementById( this.appFrames[i].id );
    element.appendChild(this.appFrames[i].frame.getElement());
    this.appFrames[i].frame.trigger("attach");
  }
};

module.exports = App;