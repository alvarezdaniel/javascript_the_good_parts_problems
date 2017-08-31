// JavaScript: The Good Parts
// Problems

// Test 1

function funky(o) {
  o = null;
}

var x = [];
funky(x);
console.log(x);

// What is x? 
// null, [], undefined, throw

// []

// Test 2

function swap(a, b) {
  var temp = a;
  a = b;
  b = temp;
}

var x = 1, y = 2;
swap(x, y);
console.log(x);

// What is x?
// 1, 2, undefined, throw

// 1 

//////////////////////////////////////////////////////////////////////////////////////////
// Problem 1
// Write a function that takes an argument and returns that argument
// identity(3) // 3

function identity(val) {
    return val;
}

console.log(identity(3));

// Professor

function identity(x) {
  return x;
}

var identity = function identity(x) {
    return x;
}

//////////////////////////////////////////////////////////////////////////////////////////
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

console.log(add(3, 4));
console.log(mul(3, 4));

// Professor

function add(x, y) {
  return x + y;
}

function mul(x, y) {
  return x * y;
}

// Problem 3
// Write a function that takes an argument and returns a function
// that returns that argument
// idf = identityf(3);
// idf() // 3

function identityf(x) {
  return function(x) {
    return x;
  }
}

idf = identityf(3);
console.log(idf());

// MAL!

// Professor

function identityf(x) {
  return function() {
    return x;
  }
}

idf = identityf(3);
console.log(idf());

// Problem 4
// Write a function that adds from two invocations
// addf(3)(4) // 7

function addf(x) {
  var sum = x;
  return function() {
    sum = sum + x;
    return sum;
  }
}

console.log(addf(3)(4));

// MAL!

// Professor

function addf(x) {
  return function(y) {
    return x + y;
  }
}

console.log(addf(3)(4));

// Problem 5
// Write a function that takes a binary function, and make it callable
// with two invocations
//
// addf = applyf(add);
// addf(3)(4)        // 7
// applyf(mul)(5)(6) // 30

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
console.log(addf(3)(4));         // 7
console.log(applyf(mul)(5)(6));  // 30

// Well!

// Professor

function applyf(binary) {
  return function(x) {
    return function(y) {
      return binary(x, y);
    }
  }
}

// Problem 6
// Write a function that takes a function and an argument,
// and returns a function that can supply a second argument
//
// add3 = curry(add, 3);
// add3(4) // 7
//
//curry(mul, 5)(6) // 30

function add(x, y) {
  return x + y;
}

function mul(x, y) {
  return x * y;
}

function curry(f, x) {
  return function(y) {
    return f(x, y);
  }
}

add3 = curry(add, 3);
console.log(add3(4)); // 7
console.log(curry(mul, 5)(6)); // 30

// Well!

// Professor

function curry(func, first) {
  return function(second) {
    return func(first, second);
  }
}

// currying

// Using a previous function
function curry(func, first) {
  return applyf(func)(first);
}

// For any number of arguments
function curry(func) {
  var slice = Array.prototype.slice,
    args = slice.call(arguments, 1);
  return function() {
    return func.apply(
      null,
      args.concat(slice.call(arguments, 0))
    );
  }
}

// Next JS edition
function curry(func, ...first) {
  return function(...second) {
    return func(...first, ...second);
  }
}

// Problem 7
// Without writing any new functions, show three ways to create
// the inc function
//
// inc(5)      // 6
// inc(inc(5)) // 7

function add(x, y) {
  return x + y;
}

function applyf(f) {
  return function(x) {
    return function(y) {
      return f(x, y);
    }
  }
}

function curry(func, first) {
  return applyf(func)(first);
}

inc = curry(add, 1);

console.log(inc(5));      // 6
console.log(inc(inc(5))); // 7

// Well!

// Professor

 inc = addf(1);
 inc = applyf(add)(1);
 inc = curry(add, 1);

 // Problem 8
 // Write methodize, a function that converts a binary function to a method
 // Number.prototype.add = methodize(add);
 // (3).add(4) // 7

 function methodize(func) {
   return function(x) {
     return func(x);
   }
 }
 //???

 // Professor

 function add(x, y) {
  return x + y;
}

function methodize(func) {
  return function(y) {
    return func(this, y);
  };
}

function methodize(func) {
  return function(...y) {
    return func(this, ...y);
  };
}

Number.prototype.add = methodize(add);
console.log((3).add(4)); // 7

// Problem 9
// Write demethodize, a function that converts a method to a binary function
// demethodize(Number.prototype.add)(5, 6) // 11

function add(x, y) {
  return x + y;
}

function methodize(func) {
  return function(y) {
    return func(this, y);
  };
}

/*
function methodize(func) {
  return function(...y) {
    return func(this, ...y);
  };
}
*/

Number.prototype.add = methodize(add);

function demethodize(obj, met) {
  return obj.met;
}

console.log(demethodize(Number.prototype.add)(5, 6)); // 11

// Wrong!!

// Professor

function add(x, y) {
  return x + y;
}

function methodize(func) {
  return function(y) {
    return func(this, y);
  };
}

function methodize(func) {
  return function(...y) {
    return func(this, ...y);
  };
}

Number.prototype.add = methodize(add);

function demethodize(func) {
  return function(that, y) {
    return func.call(that, y);
  };
}

/*
function demethodize(func) {
  return function(that, ...y) {
    return func.apply(that, y);
  };
}
*/

console.log(demethodize(Number.prototype.add)(5, 6)); // 11

// Problem 10
// Write a function twice that takes a binary function and returns a unary function that
// passes its argument to the binary function twice
// var double = twice(add);
// double(11) // 22
// var square = twice(mul);
// square(11) // 121

function add(x, y) {
  return x + y;
}

function mul(x, y) {
  return x * y;
}

function twice(binary) {
  return function(x) {
    return binary(x, x);
  };
}

var double = twice(add);
console.log(double(11)); // 2
var square = twice(mul);
console.log(square(11)); // 121

// Well!!

// Professor

function twice(binary) {
  return function(a) {
    return binary(a, a);
  };
}

// Problem 11
// Write a function composeu that takes two unary functions
// and returns a unary function that calls them both
// composeu(double, square)(3) // 36

function add(x, y) {
  return x + y;
}

function mul(x, y) {
  return x * y;
}

function twice(binary) {
  return function(x) {
    return binary(x, x);
  };
}

var double = twice(add);
var square = twice(mul);

function composeu(unary1, unary2){
  return function(x){
    return unary2(unary1(x));  
  };
}

console.log(composeu(double, square)(3)) // 36

// Well!!

// Professor

function composeu(f, g) {
  return function(a) {
    return g(f(x));
  };
}

// Problem 12
// Write a function composeb that takes twi binary functions
// and return a function that calls them both
// composeb(add, mul)(2, 3, 5) // 25

function add(x, y) {
  return x + y;
}

function mul(x, y) {
  return x * y;
}

function composeb(binary1, binary2) {
  return function(x, y, z) {
    return binary2(binary1(x, y), z);
  }
}

console.log(composeb(add, mul)(2, 3, 5));  // 25

// Well!!

// Professor

function composeb(f, g) {
  return function(a, b, c) {
    return g(f(a, b), c);
  };
}

// Problem 13
// Write a function that allows another function to only be called once
// add_once = once(add);
// add_once(3, 4) // 7
// add_once(3, 4) // throw

function add(x, y) {
  return x + y;
}

function once(func) {
  var called = false;
  return function(a, b) {
    if (!called) {
      called = true;
      return func(a, b);
    }
    else {
      throw {
        error: "Function only can be called once"
      }
    }
  }
}

add_once = once(add);
console.log(add_once(3, 4)); // 7
console.log(add_once(3, 4)); // throw

// Well!

// Professor

function once(func) {
  return function() {
    var f = func;
    func = null;
    return f.apply(
      this,
      arguments
    );
  };
}

// Problem 14
// Write a factory function that returns two functions that implement
// an up/down counter
// counter = counterf(10);
// counter.inc() // 11
// counter.dec() // 10

function counterf(x) {
  var v = x;
  return {
    inc: function() {
      return x+=1; 
    },
    dec: function() {
      return x-=1;
    }
  }
}

counter = counterf(10);
console.log(counter.inc()); // 11
console.log(counter.dec()); // 10

// Well!!

// Professor

function counterf(value) {
  return {
    inc: function() {
      value += 1;
      return value;
    },
    dec: function() {
      value -= 1;
      return value;
    }
  };
}

// Problem 15
// Make a revocable function that takes a nice function, and returns a revoke
// function that denies access to the nice function, and an invoke function
// that can invoke the nice function until it is revoked
// temp = revocable(alert);
// temp.invoke(7); // alert: 7
// temp.revoke();
// temp.invoke(8); // throw!

function alertx(x) {
  console.log(x);
}

function revocable(func) {
  var ok = true;
  return {
    invoke: function(x) {
      if (ok) {
        func(x);
      }
      else
      {
        throw {
          error: "Error"
        };
      }
    },
    revoke: function() {
      ok = false;
    }

  }
}

temp = revocable(alertx);
temp.invoke(7); // alert: 7
temp.revoke();
temp.invoke(8); // throw!

// Well!

// Professor

function revocable(nice) {
  return  {
    invoke: function() {
      return nice.apply(
        this,
        arguments
      );
    },
    revoke: function() {
      nice = null;
    }
  };
}

