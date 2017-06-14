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
import {
  Services
} from '../../../../api/services'



class SalonService {
  constructor($scope, $stateParams, $reactive, $timeout, $state, $q) {
    'ngInject';

    $reactive(this).attach($scope);

    this.scope = $scope;
    this.timeout = $timeout;
    this.state = $state;
    this.stateParams = $stateParams

    this.documentNeedToUpdate = null;

    this.selectedItems = {
      'service': null,
      'serviceId': null,
      'serviceName': null,
      'subServiceName': null,
      'price': null,
      'discount': null
    }



    $scope.atNgRepeatFinish = function() {
      $timeout(function() {
        $(document).ready(function() {
          $('select').material_select();
        });
      }, 10);
    }

    $timeout(function() {

      $(document).ready(function() {
        $('select').material_select();
      });

      $(document).ready(function() {
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal').modal();
      });


    }, 10);

    console.log($stateParams.serviceId);

    this.helpers({
      shopServices() {
        const shop = Shops.findOne({'_id' : $stateParams.shopId})
        if(shop) {
          return shop.services;
        }
      },
      AllShopServices() {
        const object = ShopServices.findOne({
          '_id': $stateParams.serviceId
        })
        if (object) {
          return object.services;
        }
      }
    })


  }


  initialize(object) {
    console.log(object);
    this.documentNeedToUpdate = object
    this.selectedItems.serviceId = object.serviceId
    this.selectedItems.serviceName = object.serviceName
    this.selectedItems.subServiceName = object.subServiceName
    this.selectedItems.price = object.price
    this.selectedItems.discount = object.discount

  }

  update() {
    $stateParams = this.stateParams;
    console.log(this.documentNeedToUpdate);
    Meteor.call('updateSubservice', $stateParams.serviceId, this.documentNeedToUpdate, this.selectedItems)
  }

  save() {
    $stateParams = this.stateParams

    const serviceId = JSON.parse(this.selectedItems.service)._id
    const serviceName = JSON.parse(this.selectedItems.service).name

    var object = {
      'serviceId': serviceId,
      'serviceName': serviceName,
      'subServiceName': this.selectedItems.subServiceName,
      'price': this.selectedItems.price,
      'discount': this.selectedItems.discount
    }
    ShopServices.update({
      '_id': $stateParams.serviceId
    }, {
      $addToSet: {
        'services': object
      }
    }, function(error) {
      if (error) {
        console.log(error);
      } else {
        $("select").val("");
        $("input").val(null);
        $('select').material_select();
        console.log("inserted successfully");
      }
    })
  }

  delete(object) {
    $stateParams = this.stateParams
    ShopServices.update({
      '_id': $stateParams.serviceId
    }, {
      $pull: {
        "services": {
          "serviceId": object.serviceId,
          "serviceName": object.serviceName,
          "subServiceName": object.subServiceName,
          "price": object.price,
          "discount": object.discount
        }
      }
    }, function(error) {
      if (error) {
        console.log("not remove");
      } else {
        console.log("removed");
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
