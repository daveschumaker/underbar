/**
* Quick scratch pad to quickly test out functions using nodejs
**/

var last = function(array, n) {
    return n === undefined ? array[array.length - 1] : array.slice(array.length - (n+1), n);
};

// expect(_.first([1,2,3], 2)).to.eql([1, 2]);

console.log(last([1,2,3], 2));