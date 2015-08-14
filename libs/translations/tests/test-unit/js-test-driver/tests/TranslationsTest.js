ExampleClassTest = TestCase("ExampleClassTest");

var Translations = require("translations/Translations");

ExampleClassTest.prototype.testHelloWorldUtil = function()
{
	assertEquals( "Hello World!", Translations.helloWorldUtil() );
};
