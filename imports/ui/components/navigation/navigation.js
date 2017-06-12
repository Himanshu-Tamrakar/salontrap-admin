import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from '@uirouter/angularjs';
import template from './navigation.html';



class Navigation {
  constructor($scope, $reactive, $state, $timeout) {
    'ngInject';

    $reactive(this).attach($scope);

    this.scope = $scope;
    this.state = $state;

    $timeout(function() {
      $(".dropdown-button").dropdown();
    }, 10);

  }

}

const name = 'navigation';

// Module
export default angular.module(name, [
  angularMeteor,
  ngMaterial,
  uiRouter
]).component(name, {
  template,
  controllerAs: name,
  controller: Navigation
});
