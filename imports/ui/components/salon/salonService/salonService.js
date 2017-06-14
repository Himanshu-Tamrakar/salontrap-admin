import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './salonService.html';
import uiRouter from '@uirouter/angularjs';
import ngMaterial from 'angular-material';
import {
  Meteor
} from 'meteor/meteor';

import {
  Shops
} from '../../../../api/shops'
import {
  ShopServices
} from '../../../../api/shopServices'



class SalonService {
  constructor($scope, $stateParams, $reactive, $timeout, $state, $q) {
    'ngInject';

    $reactive(this).attach($scope);

    this.scope = $scope;
    this.timeout = $timeout;
    this.state = $state;
    this.stateParams = $stateParams

    console.log($stateParams.serviceId);

    this.helpers({
      salonAllDetails() {
        var salonAllDetails = []

        const shop = Shops.findOne({
          '_id': $stateParams.shopId
        })
        const services = ShopServices.findOne({
          '_id': $stateParams.serviceId
        })

        if (shop && services) {
          salonAllDetails.push({
            'salon': shop,
            'salonServices': services
          })
        }

        return salonAllDetails;

      }
    })


  }

  save(serviceId, subServiceId) {
    console.log(serviceId + " " + subServiceId);
    temp = {'a': subServiceId}
    ShopServices.update({
      '_id': serviceId
    }, {
      $addToSet: {
        subServiceId: {
          'name': "ttimeout",
          'price': '1000',
          'discount': '10'
        }
      }
    },function(error) {
      if(error) {
        console.log("not");
      } else {
        console.log("inserted");
      }
    })
  }


}


const name = 'salonService';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial,
]).component(name, {
  template,
  controllerAs: name,
  controller: SalonService
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider.state('salonService', {
    url: '/salonService/:shopId/:serviceId',
    template: '<salon-service></salon-service>'
  });
}
