const eachLimit = require( 'async/eachLimit' );

const array = ['Hello', 'World', 'This', 'is', 'an', 'array'];

eachLimit(array, 2, (item, callback)=> {
  
  console.log(item);
  callback();

}, err=>{
  
  console.log("in err");
  console.log(err);

});
