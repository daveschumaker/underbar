/**
* Quick scratch pad to quickly test out functions using nodejs
* by outputting relevant data to the console.
*
* Written by Dave Schumaker
**/


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

  /*
  *
  * BEGIN SCRATCHPAD FOR CURRENT PROBLEMS WE'RE WORKING ON.
  *
  */

  // Produce a duplicate-free version of the array.
  var uniq = function(array) {
  
  };


  // DEBUG TEST STUFF

  var logger = function(output) {
    console.log(output);
  }


  // Test array
  var isEven = function(num) { return num % 2 === 0; };
  var odds = reject([1, 2, 3, 4, 5, 6], isEven);

  console.log(odds);
  //each(animals, logger);
