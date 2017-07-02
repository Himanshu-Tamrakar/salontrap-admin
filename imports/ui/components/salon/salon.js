import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './salon.html';
import uiRouter from '@uirouter/angularjs';
import ngMaterial from 'angular-material';
import {
  Meteor
} from 'meteor/meteor';
import {
  Locations
} from '../../../api/locations'
import {
  Services
} from '../../../api/services'
import {
  Shops
} from '../../../api/shops'
import {
  ShopServices
} from '../../../api/shopServices'
import {
  name as SalonService
} from './salonService/salonService'
import {
  name as AddSalon
} from './addSalon/addSalon'
import {
  name as AddHomeSalon
} from './addHomeSalon/addHomeSalon'



class Salon {
  constructor($scope, $reactive, $timeout, $state, $q) {
    'ngInject';

    $reactive(this).attach($scope);

    this.scope = $scope;
    this.timeout = $timeout;
    this.state = $state;

    this.shopToBeUpdate = null;

    $scope.locationIdToLocation = function(id) {
      if (id) {
        return Locations.findOne({
          '_id': id
        })
      }
    }

    $timeout(function() {
      $(document).ready(function() {
        $('ul.tabs').tabs();
      });

      $(document).ready(function() {
        $('.modal').modal();
      });
    }, 100);

    this.helpers({
      allSalons() {
        return Shops.find();
      }
    })

  }

  delete(shopId, serviceId) {
    if (shopId, serviceId) {
      Shops.remove({
        '_id': shopId
      }, function(error) {
        if (error) {

        } else {
          ShopServices.remove({
            '_id': serviceId
          }, function(error) {
            if (error) {

            } else {
              alert("related subservices deleted")
            }
          })
        }
      })
    }
  }

}


const name = 'salon';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial,
  SalonService,
  AddSalon,
  AddHomeSalon
]).component(name, {
  template,
  controllerAs: name,
  controller: Salon
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider.state('salon', {
    url: '/salon',
    template: '<salon></salon>',
    resolve: {
      currentUser($q, $state) {
        if (Meteor.userId() === null) {
          $state.go('login')
        } else {
          // $state.go('home')
          return $q.resolve();
        }
      }
    }
  });
}
