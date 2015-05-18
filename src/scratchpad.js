/**
* Quick scratch pad to quickly test out functions using nodejs
* by outputting relevant data to the console.
*
* Written by Dave Schumaker
**/


  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  var identity = function(val) {
    return val;
  };

  // Functions we wrote earlier
  var each = function(collection, iterator) {
      // First determine whether or not out collection is an object or an array.
      if (typeof collection[0] === "undefined") {
        // If collection is an object, let's run this code.
        //console.log("Collection is an object.");

        for (var key in collection) {
          iterator(collection[key], key, collection);   
        }
      } else {
        // If collection is an array, let's run this code.
        //console.log("Collection is an array");
        
        for (var i = 0; i < collection.length ;i++) {
          
          // Debug / Testing code
          // TODO: Remove
          //console.log(collection[i] + " " + i + " " + collection);
          
          iterator(collection[i], i, collection);
        }    
      }
  };

  var indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  var filter = function(collection, test) {
    var passedValues = []; // Create an array that will hold any values that pass the test.
    
    // Iterate over our collection and check each element for truthiness based on our test function.
    each(collection, function(element) {
      if (test(element)) { passedValues.push(element) };
    });

    return passedValues;

  };

  // Return all elements of an array that don't pass a truth test.
  var reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

    // Create an array that will hold any values that pass the test.
    var passedValues = [];

    // Store array of values that are returned from passing the filter.
    var testCollection = filter(collection, test);
    
    // Iterate over each element in our collection and see if the value is found in our filtered testCollection array.
    each(collection, function(element) {
      if (indexOf(testCollection, element) == -1) {
        passedValues.push(element);
      }
    });

    return passedValues;
  };  

  // Produce a duplicate-free version of the array.
  var reduce = function(collection, iterator, accumulator) {

    var computeTotal; // Keep track of total number of whatever we're doing.

    // Check if accumulator is defined and has a value.
    // If so, set our initial total to be equal to whatever the accumulator is.
    (typeof accumulator === "undefined") ? computeTotal = 0 : computeTotal = accumulator;
    
    each(collection, function(element, index) {
      if (index == 0 && typeof accumulator === "undefined") {
        computeTotal = element;
      } else {
        computeTotal = iterator(computeTotal, element); 
      }
    })

    return computeTotal;
  };

  // Determine if the array or object contains a given value (using `===`).
  var contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };  

  // Determine whether all of the elements match a truth test.
  var every = function(collection, iterator) {

    // We're going to store the truthiness value of our collection here.
    // We will assume it's true unless otherwise noted below.
    var BooleanStatus = true; 
    
    // Trying to get this to work using _.each right now so I understand what's happening.
    console.log("Collection:");
    console.log(collection);
    console.log("\nIterator:");
    console.log(iterator);

    each(collection, function(item) {
      // Check if a callback function is not passed as an argument.
      if (typeof iterator == "undefined") {
        if (!item) {
          BooleanStatus = false;
        }
      } else if (!iterator(item)) {
        BooleanStatus = false;
      }
    });

    return BooleanStatus;
 
    // TIP: Try re-using reduce() here.

    //reduce(collection, function(wasFound, item) {
    //  logger("hmmmmm");
    //}, false);
  };  

 // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  var some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.

    //console.log(collection.length);

    var BooleanStatus = false;

    each(collection, function(item) {
      // Check if a callback function is not passed as an argument.
      if (typeof iterator == "undefined") {
        if (item) {
          BooleanStatus = true;
        }
      } else if (iterator(item)) {
        BooleanStatus = true;
      }

    });

    return BooleanStatus;
  };  

  var extend = function(obj) {
    // Create a new object to temporarily store key-value pairs.
    var newObject = obj; 

    // We first need to iterate over parameters passed into the function
    // since we won't know ahead of time how many objects will be passed into
    // this function.

    each(arguments, function(getobj) {
      console.log(getobj);
      // For each argument, we now need to iterate through that object to
      // properly extract the key-value pairs.
      // Iterate over each value in the object
      each(getobj, function(value, key) {
        console.log(key + ": " + value);
        newObject[key] = value;
      });     
    })

    return newObject;
  };  

 // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  var defaults = function(obj) {
    // Create a new object to temporarily store key-value pairs.
    var newObject = arguments[0]; 

    // We first need to iterate over parameters passed into the function
    // since we won't know ahead of time how many objects will be passed into
    // this function.

    each(arguments, function(getobj) {
      //console.log(getobj);
      // For each argument, we now need to iterate through that object to
      // properly extract the key-value pairs.
      // Iterate over each value in the object
      each(getobj, function(value, key) {
        // Don't overwrite key / value pair if it already exists.
        // Using (key in obj) instead of obj[key] because it will still work
        // for falsey values.
        if (key in newObject) {
          // Do nothing, since the key already exists in the object.
        } else {
          //console.log(key + ": " + value);
          newObject[key] = value;          
        }
      });     
    })

    return newObject;
  };

  /*
  *
  * BEGIN SCRATCHPAD FOR CURRENT PROBLEMS WE'RE WORKING ON.
  *
  */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  var once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };  

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  var memoize = function(func) {
    // Store an array of results to keep track of values that we've already computed.
    var computedResults = [];
    var result;

    //logger(computedResults);

    return function() {
      
      // Store our arguments in a variable that we can access later within another function.
      var myArgs = arguments;

      // On the initial run, our each() function will return an undefined value and
      // bad things will happen.
      
      //logger(computedResults);
      if (computedResults.length == 0) {
        result = func.apply(this, arguments);

        // Store results in an object that we'll store and later search for.
        computedResults.push({args:arguments, computedResult: result});
        //return result;
      } else {
        // Use one of our earlier functions to iterate over our arrays.
        // and search for whether value has already been calculated.
        each(computedResults, function(item) {
          // Not the most robust code, but this looks at our arguments and compares
          // to results found in array.
          //logger(myArgs);
          if (item.args == myArgs) {
            // If our computed result has been found, return the already calculated result.
            //logger("Dupe detected!!");
            result = item.computedResult;
          } else {
            //logger("No dupe");
            result = func.apply(this, myArgs);

            // Store results in an object that we'll store and later search for.
            computedResults.push({args:myArgs, computedResult: result});
          }

        });
      }

      //logger(computedResults);

      return result;
    }
  };

  // DEBUG TEST STUFF

  var logger = function(output) {
    console.log(output);
  }
  
// Memoize stuff....
  var add = function(a, b) {
    return a + b;
  };

  memoAdd = memoize(add);

  console.log(memoAdd(1,2));
  console.log(memoAdd(3,4));

  var spy = sinon.spy(function() { return 'Dummy output'; });
  var memoSpy = _.memoize(spy);  

  memoSpy(10);


