import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
// import ngSanitize from 'angular-sanitize';
import uiRouter from '@uirouter/angularjs';
import template from './salontrap.html';
import {
  Meteor
} from 'meteor/meteor';

import {
  name as Navigation
} from '../navigation/navigation';

import {
  name as Login
} from '../login/login';

class SalonTrap {
  constructor($scope, $reactive, $rootScope, $timeout, $state, $interval, $q) {

    'ngInject';
    $reactive(this).attach($scope);

    this.state = $state;
    this.timeout = $timeout;
    this.scope = $scope;
    this.rootScope = $rootScope;
  }
}
const name = 'salontrap';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial,
  Navigation,
  // Home,
  Login
]).component(name, {
  template,
  controllerAs: name,
  controller: SalonTrap
}).config(config).run(run);

function config($locationProvider, $urlRouterProvider, $stateProvider, $qProvider) {
  'ngInject';

  $stateProvider.state('salontrap', {
    abstract: true,
    template: '<salontrap></salontrap>'
  });

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/login');

  $qProvider.errorOnUnhandledRejections(false);
}

function run($rootScope, $state, $q) {
  'ngInject';

  $rootScope.$on('$stateChangeError',
    (event, toState, toParams, fromState, fromParams, error) => {
      if (error === 'AUTH_REQUIRED') {
        $state.go('login');
      }
    }
  );
}
