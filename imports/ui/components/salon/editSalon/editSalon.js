import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from '@uirouter/angularjs';
import template from './editSalon.html';
import {
  Meteor
} from 'meteor/meteor';
import {
  Locations
} from '../../../../api/locations'
import {
  Services
} from '../../../../api/services'
import {
  Shops
} from '../../../../api/shops'



class EditSalon {
  constructor($scope, $reactive, $stateParams, $timeout, $state) {

    'ngInject';
    $reactive(this).attach($scope);

    this.state = $state;
    this.timeout = $timeout;
    this.scope = $scope;
    this.stateParams = $stateParams
    // this.rootScope = $rootScope;

    this.salonDetails = null

    $scope.atNgRepeatFinish = function() {
      $timeout(function() {
        $(document).ready(function() {
          $('select').material_select();
        });
      }, 1000);
    }

    $timeout(function() {
      $(document).ready(function() {
        $('.collapsible').collapsible();
      });

      $(document).ready(function() {
        $('select').material_select();
      });
    }, 100);

    this.helpers({
      salon() {
        const shop = Shops.findOne({
          '_id': $stateParams.salonId
        });
        if (shop) {
          this.salonDetails = shop
          console.log(this.salonDetails);
        }
      },
      allLocations() {
        return Locations.find({})
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
    this.salonDetails.services.forEach(function(object) {
      selectedService.push({
        '_id': object
      });
    })
    this.salonDetails.services = selectedService;

    Shops.update({
      '_id': $stateParams.salonId
    }, {
      $set: {
        'name': this.salonDetails.name,
        'serviceId': this.salonDetails.serviceId,
        'type': this.salonDetails.type,
        'location': {
          '_id': this.salonDetails.location._id
        },
        'images': this.salonDetails.images,
        'openingHours': this.salonDetails.openingHours,
        'amenities': this.salonDetails.amenities,
        'price': this.salonDetails.price,
        'paymentModes': this.salonDetails.paymentModes,
        'updatedAt': new Date(),
        'services': this.salonDetails.services,
        'mobile': this.salonDetails.mobile,
        'email': this.salonDetails.email,
      }
    }, function(error) {
      if(!error) {
        alert('Shop updated successfully')
        $state.go('salon')
      }
    })
  }

}
const name = 'editSalon';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial,
]).component(name, {
  template,
  controllerAs: name,
  controller: EditSalon
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider.state('editSalon', {
    url: '/editSalon/:salonId',
    template: '<edit-salon></edit-salon>',
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
