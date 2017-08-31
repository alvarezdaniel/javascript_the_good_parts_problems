// JavaScript: The Good Parts
// Problems


// Problem 1
// Write a function that takes an argument and returns that argument
// identity(3) // 3

function identity(val) {
    return val;
}

var identity = function identity(x) {
    return x;
}

alert(identity(3));

// Problem 2
// Write two binary functions, add and mul, that take two numbers
// and return their sum and product
// add(3, 4) // 7
// mul(3, 4) // 12

var add = function add(a, b) {
  return a + b;
}

var mul = function mul(a, b) {
  return a * b;
}

alert(add(3, 4));
alert(mul(3, 4));

function add(x, y) {
  return x + y;
}

function mul(x, y) {
  return x * y;
}

// Problem 3
// Write a function that takes an argument and returns a function
// that returns that argument

idf = identityf(3);
idf() // 3


function identityf(x) {
  return function(x) {
    return x;
  }
}

idf = identityf(3);
alert(idf());


function identityf(x) {
  return function() {
    return x;
  }
}

idf = identityf(3);
alert(idf());

// Problem 4
// Write a function that adds from two invocations

addf(3)(4) // 7

function addf(x) {
  var sum = x;
  return function() {
    sum = sum + x;
    return sum;
  }
}

alert(addf(3)(4));

function addf(x) {
  return function(y) {
    return x + y;
  }
}

alert(addf(3)(4));

// Problem 5
// Write a function that takes a binary function, and make it callable
// with two invocations

addf = applyf(add);
addf(3)(4)        // 7
applyf(mul)(5)(6) // 30

function add(x, y) {
  return x + y;
}

function mul(x, y) {
  return x * y;
}

function applyf(f) {
  return function(x) {
    return function(y) {
      return f(x, y);
    }
  }
}

addf = applyf(add);
alert(addf(3)(4));         // 7
alert(applyf(mul)(5)(6));  // 30

function applyf(binary) {
  return function(x) {
    return function(y) {
      return binary(x, y);
    }
  }
}
