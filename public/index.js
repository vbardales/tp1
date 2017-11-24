(function(angular) {
  'use strict';
angular.module('myApp', [])
  .controller('RecipeController', ['$http', RecipeController])
  .controller('SettingsController', SettingsController);

function RecipeController($http) {
  $http.get('/api')
    .then(function(res) {
      this.fields = res.data.fields;
      this.rows = res.data.rows;
      console.log(res)
    }.bind(this))
  ;

  this.removeRow = function(index) {

    this.rows.splice(index, 1);
  };
}

function SettingsController() {
  this.name = 'John Smith';
  this.contacts = [
    {type:'phone', value:'408 555 1212'},
    {type:'email', value:'john.smith@example.org'}
  ];

  this.greet = function() {
    alert(this.name);
  };

  this.addContact = function() {
    this.contacts.push({type:'email', value:'yourname@example.org'});
  };

  this.removeContact = function(contactToRemove) {
    var index = this.contacts.indexOf(contactToRemove);
    this.contacts.splice(index, 1);
  };

  this.clearContact = function(contact) {
    contact.type = 'phone';
    contact.value = '';
  };
}
})(window.angular);
