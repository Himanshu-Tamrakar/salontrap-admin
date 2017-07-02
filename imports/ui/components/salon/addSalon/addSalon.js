import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from '@uirouter/angularjs';
import template from './addSalon.html';
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


class AddSalon {
  constructor($scope, $reactive, $rootScope, $timeout, $state, $interval, $q) {

    'ngInject';
    $reactive(this).attach($scope);

    this.state = $state;
    this.timeout = $timeout;
    this.scope = $scope;
    this.rootScope = $rootScope;

    this.salonDetails = {
      'name': null,
      'serviceId': null,
      'type': null,
      'location': {
        '_id': null
      },
      'images': null,
      'openingHours': null,
      'amenities': [],
      'price': null,
      'paymentModes': [],
      'createdAt': null,
      'updatedAt': null,
      'services': [],
      'mobile': null,
      'email': null,
      'isHomeSalon':false
    }

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
        $('.modal').modal();
      });

      $(document).ready(function() {
        $('select').material_select();
      });

      $(document).ready(function() {
        $('input#input_text, textarea#textarea1').characterCounter()
      });

    }, 100);

    this.helpers({
      allSalons() {
        return Shops.find();
      },
      allLocations() {
        return Locations.find({})
      },
      allServices() {
        return Services.find({})
      }
    })

  }

  insert() {
    $timeout = this.timeout;
    $state = this.state;
    var selectedService = []

    this.salonDetails.services.forEach(function(object) {
      selectedService.push({
        '_id': object
      });
    })
    this.salonDetails.services = selectedService;

    var arrOfImages = this.salonDetails.images.split(",").map(function(item) {
      return item.trim();
    })
    this.salonDetails.images = arrOfImages;


    if (this.salonDetails.name && this.salonDetails.type && this.salonDetails.location._id && this.salonDetails.openingHours && this.salonDetails.amenities.length > 0 && this.salonDetails.price && this.salonDetails.paymentModes.length > 0 && this.salonDetails.services.length > 0) {
      Shops.insert(this.salonDetails,
        function(error, result) {
          if (error) {
            alert("Insertion fails")
          } else {
            $("select").val("");
            $("input").val(null);
            $("textarea").val(null);
            $('input#input_text, textarea#textarea1').characterCounter();
            $('select').material_select();
            $('.model').modal('close');
            var object = {}

            object['shopId'] = result;
            object['services'] = [];
            object['createdAt'] = new Date();
            object['updatedAt'] = new Date();

            ShopServices.insert(object, function(error, result) {
              if (error) {

              } else {
                // alert("Services created for this Shop");
                const shopId = ShopServices.findOne(result).shopId;
                Shops.update({
                  '_id': shopId
                }, {
                  $set: {
                    'serviceId': result
                  }
                }, function(error) {
                  if (!error) {

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
const name = 'addSalon';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial,
]).component(name, {
  template,
  controllerAs: name,
  controller: AddSalon
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider.state('addSalon', {
    url: '/addSalon',
    template: '<add-salon></add-salon>',
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
