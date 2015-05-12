/**
* Quick scratch pad to quickly test out functions using nodejs
**/

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  var each = function(collection, iterator) {

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

  // DEBUG TEST STUFF

  var logger = function(output) {
    console.log(output);
  }


  // Test array
  //var animals = ['ant', 'bat', 'cat']; // Array
  var animals = { a: 'ant', b: 'bat', c: 'cat' }; // Object
  var iterationInputs = [];

  each(animals, function(animal, index, list) {
          iterationInputs.push([animal, index, list]);
  })

  console.log(iterationInputs);
  //each(animals, logger);
