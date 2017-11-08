'use strict'; 

let myApp = angular.module('myApp', [
  'ui.router',
  'appControllers',
  'appDirectives'
  ]);

myApp.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider
    .when('', '/view-page')
    .when('/index.html', '/view-page');

    $stateProvider
    .state('view-page', {
      url: "/view-page",
      templateUrl: 'views/view-page.html'
    })

  }]);