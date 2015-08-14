ExampleClassTest = TestCase("ExampleClassTest");

var Randomator = require("randomator/Randomator");

ExampleClassTest.prototype.testHelloWorldUtil = function()
{
	assertEquals( "Hello World!", Randomator.helloWorldUtil() );
};
