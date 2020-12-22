// News to me after all these years...
//
// * [what is the best way to check variable type in javascript - Michael
// Mikowski](https://stackoverflow.com/a/17583612)
// * [Check whether variable is number or string in JavaScript - Michael
// Mikowski](https://stackoverflow.com/a/14206536)
// * [Standard ECMA-262 5.1 Edition - `Object.prototype.toString()`]
// (https://www.ecma-international.org/ecma-262/5.1/#sec-15.2.4.2)
//
// I never create strings or numbers with a constructor, so I've never
// encoutered this as a problem. Now I add this library everywhere where I use
// `typeof` so I tought I'd put it somewhere where I could get to it.

// This readme document is a unit test from the Empath source code. It uses the
// [Proof](https://github.com/bigeasy/proof) unit test framework. We'll be using
// the `okay` method from Proof to assert the points we make about Empathy.
//
// Please run this test yourself.
//
// ```text
// git clone git@github.com:bigeasy/empathy.git
// cd empathy
// npm install --no-package-lock --no-save
// node test/readme.t.js
// ```

// Our unit test begins here.

//
require('proof')(22, okay => {
    // In your program this would be
    //
    // ```javascript
    // const sortof = require('empathy')
    // ```
    //
    // But we'll be running this as a unit test as part of CI/CD to ensure that
    // this readme doesn't get out of date.

    //
    const sortof = require('..')
    //

    // `undefined` is the same as it is in `typeof`, but `null` is no longer
    // `object`. It is `null`.

    //
    okay(sortof([][0]), 'undefined', 'is undefined')
    okay(sortof(null), 'null', 'is null')
    //

    // Wrapped primitives are the same as their primitive values.

    //
    okay(sortof('x'), 'string', 'is string')
    okay(sortof(new String('x')), 'string', 'is still string')
    okay(sortof(true), 'boolean', 'is boolean')
    okay(sortof(new Boolean(true)), 'boolean', 'is still boolean')
    okay(sortof(1), 'number', 'is number')
    okay(sortof(new Number(1)), 'number', 'is still number')
    okay(sortof(1n), 'bigint', 'is bigint')
    okay(sortof(BigInt(1)), 'bigint', 'is still bigint')
    okay(sortof(Symbol('x')), 'symbol', 'is symbol')
    //

    // `async` functions required a fixup, but I want them to be considered
    // functions since I've never done special handling for `async` functions.

    //
    okay(sortof(function () {}), 'function', 'is function')
    okay(sortof(() => {}), 'function', 'is also function')
    okay(sortof(async function () {}), 'function', 'is also function')
    okay(sortof(new Function('return 1')), 'function', 'is still function')
    //

    // Arrays are not `object` but `array`. This makes life easier in switch
    // statements.

    //
    okay(sortof([]), 'array', 'is array')
    okay(sortof(new Array(0)), 'array', 'is still array')
    //

    // Object is `object` and derived classes are still `object`.

    //
    okay(sortof({}), 'object', 'is object')
    class Example {}
    okay(sortof(new Example), 'object', 'is still object')
    //

    // This is an important departure from `typeof` but I find these to be
    // helpful so I've not corrected them.

    //
    okay(sortof(new Date(0)), 'date', 'is date')
    okay(sortof(new Map()), 'map', 'is map')
    okay(sortof(new Set()), 'set', 'is set')
    //

    // Here is the counter example form the landing page. First type `typeof`
    // implementation.

    //
    {
        const assert = require('assert')

        function counter (value) {
            switch (typeof value) {
            case 'object': {
                    if (null) {
                        return 1
                    }
                    let sum = 0
                    if (Array.isArray(value)) {
                        for (const item of value) {
                            sum += counter(item)
                        }
                        return sum
                    }
                    for (const name in value) {
                        sum += counter(value[name])
                    }
                    return sum
                }
            default:
                return 1
            }
        }

        assert.equal(counter({ a: 'x', b: [ 'y', 'z' ] }), 3, 'found three scalar values')
    }
    //

    // And now the empathy implementation.

    //
    {
        const assert = require('assert')

        function counter (value) {
            switch (sortof(value)) {
            case 'array': {
                    let sum = 0
                    for (const item of value) {
                        sum += counter(item)
                    }
                    return sum
                }
            case 'object': {
                    let sum = 0
                    for (const item in value) {
                        sum += counter(value[item])
                    }
                    return sum
                }
            default:
                return 1
            }
        }

        assert.equal(counter({ a: 'x', b: [ 'y', 'z' ] }), 3, 'found three scalar values')
    }
})
