import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from '@uirouter/angularjs';
import template from './editHomeSalon.html';
import {
  Meteor
} from 'meteor/meteor';

import {
  Services
} from '../../../../api/services'
import {
  Shops
} from '../../../../api/shops'


class EditHomeSalon {
  constructor($scope, $reactive, $stateParams, $timeout, $state) {

    'ngInject';
    $reactive(this).attach($scope);

    this.state = $state;
    this.timeout = $timeout;
    this.scope = $scope;
    this.stateParams = $stateParams

    this.homeSalonDetails = null

    $timeout(function() {
      $(document).ready(function() {
        $('.collapsible').collapsible();
      });

      $(document).ready(function() {
        $('select').material_select();
      });
    }, 100);

    $scope.atNgRepeatFinish = function() {
      $timeout(function() {
        $(document).ready(function() {
          $('select').material_select();
        });
      }, 1000);
    }

    this.helpers({
      salon() {
        const shop = Shops.findOne({
          '_id': $stateParams.salonId
        });
        if (shop) {
          this.homeSalonDetails = shop
        }
      },
      allServices() {
        return Services.find({})
      }
    })

  }

  update() {
    $state = this.state
    $stateParams = this.stateParams

    var selectedService = []
    this.homeSalonDetails.services.forEach(function(object) {
      selectedService.push({
        '_id': object
      });
    })
    this.homeSalonDetails.services = selectedService;

    Shops.update({
      '_id': $stateParams.salonId
    }, {
      $set: {
        'name': this.homeSalonDetails.name,
        'images':this.homeSalonDetails.images,
        'services':this.homeSalonDetails.services,
        'mobile':this.homeSalonDetails.mobile,
        'email':this.homeSalonDetails.email
      }
    }, function(error) {
      if(!error) {
        alert('updated successfully')
        $state.go('salon')
      }
    })
  }

}
const name = 'editHomeSalon';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial,
]).component(name, {
  template,
  controllerAs: name,
  controller: EditHomeSalon
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider.state('editHomeSalon', {
    url: '/editHomeSalon/:salonId',
    template: '<edit-home-salon></edit-home-salon>',
    resolve: {
      currentUser($q, $state) {
        if (Meteor.userId() === null) {
          $state.go('login')
        } else {
          return $q.resolve();
        }
      }
    }
  });
}
