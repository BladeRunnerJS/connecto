var SettingsViewModelTest = TestCase( 'SettingsViewModelTest' );

var SettingsViewModel = require( 'connecto/play/settings/SettingsViewModel' );

SettingsViewModelTest.prototype.testSomething = function() {
  var model = new SettingsViewModel();
  assertEquals( 'Welcome to your new Blade.', model.welcomeMessage() );
};
