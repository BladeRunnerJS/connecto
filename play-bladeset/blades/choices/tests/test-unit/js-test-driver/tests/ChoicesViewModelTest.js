var ChoicesViewModelTest = TestCase( 'ChoicesViewModelTest' );

var ChoicesViewModel = require( 'lang/play/choices/ChoicesViewModel' );

ChoicesViewModelTest.prototype.testSomething = function() {
  var model = new ChoicesViewModel();
  assertEquals( 'Welcome to your new Blade.', model.welcomeMessage() );
};
