var GridViewModelTest = TestCase( 'GridViewModelTest' );

var GridViewModel = require( 'connecto/play/grid/GridViewModel' );

GridViewModelTest.prototype.testSomething = function() {
  var model = new GridViewModel();
  assertEquals( 'Welcome to your new Blade.', model.welcomeMessage() );
};
