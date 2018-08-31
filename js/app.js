(function(){
var app = angular.module('mynotes', ['ionic', 'mynotes.notestore'])

/* App config */
app.config(function($stateProvider, $urlRouterProvider){

  $stateProvider.state('list', {
    url: '/list',
    templateUrl: 'templates/list.html'
  })
  /*Share view with edit.html*/
  $stateProvider.state('add', {
    url: '/add',
    templateUrl: 'templates/edit.html',
    controller: 'AddCtrl'
  })

  $stateProvider.state('edit', {
    url: '/edit/:noteId',
    templateUrl: 'templates/edit.html',
    controller: 'EditCtrl'
  })

  $urlRouterProvider.otherwise('/list');
})
/* list html controller */
app.controller('ListCtrl', function($scope, noteStore) {

  $scope.reordering = false;
  $scope.notes = noteStore.list();

  $scope.remove = function(noteId){
    noteStore.remove(noteId);
  }

})

/* edit page controller */
app.controller('EditCtrl', function($scope, $state, noteStore) {

  $scope.note = angular.copy(noteStore.get($state.params.noteId));

  $scope.save = function() {
    noteStore.update($scope.note);
    $state.go('list');
  };
});

/* Add page controller */
app.controller('AddCtrl', function($scope, $state, noteStore) {

  $scope.note = {
    id: new Date().getTime().toString(),
    title: '',
    description: ''
  };

  $scope.save = function() {
    noteStore.create($scope.note);
    $state.go('list');
  };
});


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
}());
