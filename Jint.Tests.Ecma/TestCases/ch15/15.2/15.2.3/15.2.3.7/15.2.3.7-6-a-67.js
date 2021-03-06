/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-67.js
 * @description Object.defineProperties throws TypeError when P is accessor property and P.configurable is false, desc is data property (8.12.9 step 9.a)
 */


function testcase() {

        var obj = {};

        function get_Func() {
            return 10;
        }

        Object.defineProperty(obj, "foo", {
            get: get_Func,
            configurable: false
        });

        try {
            Object.defineProperties(obj, {
                foo: {
                    value: 11
                }
            });
            return false;
        } catch (e) {
            var verifyEnumerable = false;
            for (var p in obj) {
                if (p === "foo") {
                    verifyEnumerable = true;
                }
            }

            var verifyValue = false;
            verifyValue = (obj.foo === 10);

            var desc = Object.getOwnPropertyDescriptor(obj, "foo");

            var verifyConfigurable = false;
            delete obj.foo;
            verifyConfigurable = obj.hasOwnProperty("foo");

            return e instanceof TypeError && verifyConfigurable && !verifyEnumerable &&
                verifyValue && typeof (desc.set) === "undefined" && desc.get === get_Func;
        }
    }
runTestCase(testcase);
