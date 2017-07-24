import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from '@uirouter/angularjs';
import template from './addHomeSalon.html';
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
import {
  ShopServices
} from '../../../../api/shopServices'


class AddHomeSalon {
  constructor($scope, $reactive, $rootScope, $timeout, $state, $interval, $q) {

    'ngInject';
    $reactive(this).attach($scope);

    this.state = $state;
    this.timeout = $timeout;
    this.scope = $scope;
    this.rootScope = $rootScope;

    this.homeSalonDetails = {
      'name': null,
      'serviceId': null,
      'images': null,
      'services': [],
      'mobile': null,
      'email': null,
      'isHomeSalon': true
    }

    $timeout(function() {
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

    $timeout(function() {
      $(document).ready(function() {
        $('select').material_select();
      });

      $(document).ready(function() {
        $('input#input_text, textarea#textarea1').characterCounter()
      });

    }, 100);

    this.helpers({
      allServices() {
        return Services.find({})
      }
    })

  }

  insert() {
    $timeout = this.timeout;
    $state = this.state;
    var selectedService = []

    this.homeSalonDetails.services.forEach(function(object) {
      selectedService.push({
        '_id': object
      });
    })
    this.homeSalonDetails.services = selectedService;

    var arrOfImages = this.homeSalonDetails.images.split(",").map(function(item) {
      return item.trim();
    })
    this.homeSalonDetails.images = arrOfImages;


    if (this.homeSalonDetails.name && this.homeSalonDetails.images.length > 0 && this.homeSalonDetails.services.length > 0) {
      Shops.insert(this.homeSalonDetails,
        function(error, result) {
          if (error) {
            alert("Insertion fails")
          } else {
            var object = {}
            object['shopId'] = result;
            object['services'] = [];
            object['createdAt'] = new Date();
            object['updatedAt'] = new Date();

            ShopServices.insert(object, function(error, result) {
              if (error) {

              } else {
                const shopId = ShopServices.findOne(result).shopId;
                Shops.update({
                  '_id': shopId
                }, {
                  $set: {
                    'serviceId': result
                  }
                }, function(error) {
                  if (!error) {
                    $("select").val("");
                    $("input").val(null);
                    $("textarea").val(null);
                    $('input#input_text, textarea#textarea1').characterCounter();
                    $('select').material_select();
                  }
                })
              }
            })
          }
        })
    } else {
      alert("Please Fill The all required fields")
    }
  }

}
const name = 'addHomeSalon';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial,
]).component(name, {
  template,
  controllerAs: name,
  controller: AddHomeSalon
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider.state('addHomeSalon', {
    url: '/addHomeSalon',
    template: '<add-home-salon></add-home-salon>',
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
