/**
* Quick scratch pad to quickly test out functions using nodejs
**/

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  var each = function(collection, iterator) {

    // TODO: Check whether collection is an array or object. Then proceed from there.
    for (var i = 0; i < collection.length ;i++) {
      iterator(collection[i])
    }
  };





  // DEBUG TEST STUFF

  var logger = function(output) {
    console.log(output);
  }


  // Test array
  var animals = ['ant', 'bat', 'cat'];

  each(animals, logger);
