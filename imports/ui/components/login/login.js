import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from '@uirouter/angularjs';
import template from './login.html';
import ngMaterial from 'angular-material';
import {
  Meteor
} from 'meteor/meteor';

import {
  name as Home
} from '../home/home'

class Login {
  constructor($scope, $timeout, $reactive, $state) {
    'ngInject';
    $reactive(this).attach($scope);
    this.state = $state;
    this.username = '';
    this.password = '';
  }

  signIn() {
    $state = this.state;
    const username = this.username;
    const password = this.password;
    Meteor.loginWithPassword(username, password, function(error) {
      if (error) {
        $('.toast').remove();
        Materialize.toast(error.reason, 4000);
      } else {
        $state.go('home');
        $('.toast').remove();
        Materialize.toast("Logged in successfully", 4000);
      }
    });
  }
}

const name = 'login';

// Module Creation
export default angular.module(name, [
  angularMeteor,
  ngMaterial,
  uiRouter,
  Home
]).component(name, {
  template,
  controllerAs: name,
  controller: Login
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider.state('login', {
    url: '/login',
    template: '<login></login>',
    resolve: {
      currentUser($q, $state) {
        if (Meteor.userId() === null) {

          return $q.resolve();
        } else {
          // $state.go('home')
          return $q.resolve();
        }
      }
    }
  });
}
