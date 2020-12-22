[![Actions Status](https://github.com/bigeasy/empathy/workflows/Node%20CI/badge.svg)](https://github.com/bigeasy/empathy/actions)
[![codecov](https://codecov.io/gh/bigeasy/empathy/branch/master/graph/badge.svg)](https://codecov.io/gh/bigeasy/empathy)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A `typeof` implementation safe for Object representations of JavaScript primitives.

| What          | Where                                         |
| --- | --- |
| Discussion    | https://github.com/bigeasy/empathy/issues/1   |
| Documentation | https://bigeasy.github.io/empathy             |
| Source        | https://github.com/bigeasy/empathy            |
| Issues        | https://github.com/bigeasy/empathy/issues     |
| CI            | https://travis-ci.org/bigeasy/empathy         |
| Coverage:     | https://codecov.io/gh/bigeasy/empathy         |
| License:      | MIT                                           |


```
npm install empathy
```

What's in a name? Empathy looks deep into the soul of a variable and really
_feels_ its actual type. I found this function on StackOverflow under [Check
whether variable is number or string in
JavaScript](https://stackoverflow.com/a/14206536) and again under [what is the
best way to check variable type in
javascript](https://stackoverflow.com/a/17583612), both submitted by one
[Michael S. Mikowski](https://michaelmikowski.com/). I started to copy and paste
it into one module after another. Decided it needs a base of operations, so now
it lives here.

```
const assert = require('assert')
const sortof = require('empathy')

assert.equal(sortof(1), 'number', 'is number')
assert.equal(sortof(new Number(1)), 'number', 'object wrapped is still number')
assert.equal(sortof(null), 'null', 'is null')
assert.equal(sortof([][0]), 'undefined', 'is undefined')
assert.equal(sortof([]), 'array', 'is array')
```

I find that using this function not only protects against object wrappers around
primitives, it simplifies the `switch` statements I write using `typeof`.

```javascript
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
            }
            for (const name in value) {
                for (const item of value) {
                    sum += counter(value[name])
                }
            }
        }
    default:
        return 1
    }
}

assert.equal(counter({ a: 'x', b: [ 'y', 'z' ] }), 3, 'found three scalar values')
```

```javascript
const assert = require('assert')
const sortof = require('empathy')

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
```
