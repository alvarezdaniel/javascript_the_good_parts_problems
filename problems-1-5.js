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

//alert(identity(3));

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

//alert(add(3, 4));
//alert(mul(3, 4));

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
