import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './home.html';
import uiRouter from '@uirouter/angularjs';
import ngMaterial from 'angular-material';
import {
  Meteor
} from 'meteor/meteor';
import {
  name as Location
} from '../location/location'
import {
  name as Service
} from '../service/service'
import {
  name as Salon
} from '../salon/salon'
// import {
//   name as HomeSalon
// } from '../homeSalon/homeSalon'





class Home {
  constructor($scope, $reactive, $timeout, $state, $q) {
    'ngInject';

    $reactive(this).attach($scope);

    this.scope = $scope;
    this.timeout = $timeout;
    this.state = $state;

  }


}


const name = 'home';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial,
  Location,
  Service,
  Salon
  // HomeSalon
]).component(name, {
  template,
  controllerAs: name,
  controller: Home
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider.state('home', {
    url: '/home',
    template: '<home></home>',
    resolve: {
      currentUser($q, $state) {
        if (Meteor.userId() === null) {
          // return $q.reject('AUTH_REQUIRED');
          $state.go('login')
        } else {
          // $state.go('home')
          return $q.resolve();
        }
      }
    }
  });
}
