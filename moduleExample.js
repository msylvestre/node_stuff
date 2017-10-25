var MyModule = function () {

  function privateFunction() {
    return null;
  }

  this.publicFunction = function(){
    return null;
  }

};  

module.exports = new MyModule();