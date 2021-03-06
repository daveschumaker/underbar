(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {

    // TODO: Need to further test this with some different length arrays.
    // But it seems to work for now.

    // Debug / Testing stuff.
    // TODO: Remove all this cruft later
    /*
    console.log(array);
    console.log("SLICE: " + n );
    console.log(n === undefined ? array[array.length - 1] : array.slice(n > array.length ? 0 : array.length - n, n+1));
    console.log("\n\n");
    */

    return n === undefined ? array[array.length - 1] : array.slice(n > array.length - 1 ? 0 : array.length - n, n+1);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {

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

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var passedValues = []; // Create an array that will hold any values that pass the test.
    
    // Iterate over our collection and check each element for truthiness based on our test function.
    _.each(collection, function(element) {
      if (test(element)) { passedValues.push(element) };
    });

    return passedValues;    
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    
    // Create an array that will hold any values that pass the test.
    var passedValues = [];

    // Store array of values that are returned from passing the filter.
    var testCollection = _.filter(collection, test);
    
    // Iterate over each element in our collection and see if the value is found in our filtered testCollection array.
    _.each(collection, function(element) {
      if (_.indexOf(testCollection, element) == -1) {
        passedValues.push(element);
      }
    });

    return passedValues;

  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {

    // Temporary array to store our values.
    var uniqueValues = [];

    _.each(array, function(element) {

      if (_.indexOf(uniqueValues, element) == -1) {
        uniqueValues.push(element);
      }

    });

    return uniqueValues;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    
    // Temporary array to store our values.
    var mappedArray = [];

    // Iterate over each element of the array and then do something with it.
    _.each(collection, function(element) {
      mappedArray.push(iterator(element));
    });

    return mappedArray;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {

    var computeTotal; // Keep track of total number of whatever we're doing.

    // Check if accumulator is defined and has a value.
    // If so, set our initial total to be equal to whatever the accumulator is.
    (typeof accumulator === "undefined") ? computeTotal = 0 : computeTotal = accumulator;
    
    _.each(collection, function(element, index) {
      if (index == 0 && typeof accumulator === "undefined") {
        computeTotal = element;
      } else {
        computeTotal = iterator(computeTotal, element); 
      }
    })

    return computeTotal;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // We're going to store the truthiness value of our collection here.
    // We will assume it's true unless otherwise noted below.
    var BooleanStatus = true; 
    
    // Trying to get this to work using _.each right now so I understand what's happening.
    //console.log("Collection:");
    //console.log(collection);
    //console.log("\nIterator:");
    // console.log(iterator);  

    _.each(collection, function(item) {
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
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
  
    // Doing a similar thing as we did with _.every().
    // Need to refactor this so that it uses the _.every() function.

    var BooleanStatus = false;

    _.each(collection, function(item) {
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


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    // Create a new object to temporarily store key-value pairs.
    var newObject = obj; 

    // We first need to iterate over parameters passed into the function
    // since we won't know ahead of time how many objects will be passed into
    // this function.

    _.each(arguments, function(getobj) {
      //console.log(getobj);
      // For each argument, we now need to iterate through that object to
      // properly extract the key-value pairs.
      // Iterate over each value in the object
      _.each(getobj, function(value, key) {
        //console.log(key + ": " + value);
        newObject[key] = value;
      });     
    })

    return newObject;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    // Create a new object to temporarily store key-value pairs.
    var newObject = obj; 

    // We first need to iterate over parameters passed into the function
    // since we won't know ahead of time how many objects will be passed into
    // this function.

    _.each(arguments, function(getobj) {
      //console.log(getobj);
      // For each argument, we now need to iterate through that object to
      // properly extract the key-value pairs.
      // Iterate over each value in the object
      _.each(getobj, function(value, key) {
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


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
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
  _.memoize = function(func) {
    // Store an array of results to keep track of values that we've already computed.
    var computedResults = {};
    var result; 

    return function() {
      
      // Store our arguments in a variable that we will clean up with JSON.stringify in order
      // to use them as a key.
      var myArgs = JSON.stringify(arguments);

      // Check if argument has already been computed. If not, run function and
      // add results to our array.
      if (!computedResults[myArgs]) {
        result = func.apply(this, arguments);
        computedResults[myArgs] = result;
      }

      return computedResults[myArgs];
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    // Store our arguments so we can pass into the callback function. 
    var myArgs = arguments;

    setTimeout(function() {
      // Check if we have additional arguments to pass into the function.
      if (myArgs.length > 2) {
        // This works, but we'd probably want to make it more robust so that it can account for any
        // number of additional arguments.
        return func(myArgs[2], myArgs[3]);
      } else {
        return func();
      }
    }, wait);

  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    // Copy array elements into a new array using slice.
    var copiedArray = array.slice();
    var newArray = []; // This is where will push new values to.

    // Build a loop that will iterate through our array.
    for (var i = 0; i < array.length; i++) {

      // Choose a random number based on the number of elements in our array
      var getElement = Math.floor(Math.random() * (copiedArray.length)+0);
      
      // Use array.splice() to remove the random element chosen above from the copiedArray.
      var getValue = copiedArray.splice(getElement,1);

      // Push the randomly chosen element (which is returned as an array) into a new array.
      newArray.push(getValue[0]);
    }

    return newArray;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
