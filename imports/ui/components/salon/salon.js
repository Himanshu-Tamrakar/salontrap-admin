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
import {name as SalonService} from './salonService/salonService'



class Salon {
  constructor($scope, $reactive, $timeout, $state, $q) {
    'ngInject';

    $reactive(this).attach($scope);

    this.scope = $scope;
    this.timeout = $timeout;
    this.state = $state;


    this.salonDetails = {
      'name': null,
      'serviceId': null,
      'type': null,
      'description': null,
      'location': {},
      'images': [],
      'openingHours': null,
      'amenities': [],
      'price': null,
      'paymentModes': [],
      'createdAt': null,
      'updatedAt': null,
      'services': []
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
        $('input#input_text, textarea#textarea1').characterCounter();
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
    var selectedLocation = {}

    $("#service :selected").each(function() {
      selectedService.push(JSON.parse($(this).val()));
    });
    selectedLocation = JSON.parse(document.getElementById('location-select').value);

    this.salonDetails.services = selectedService;
    this.salonDetails.location = selectedLocation

    console.log(this.salonDetails.location._id)
    console.log(this.salonDetails.images.length);
    console.log(this.salonDetails.services.length);
    // parseInt(this.salonDetails.images.length) > 0
    if (this.salonDetails.name && this.salonDetails.type && this.salonDetails.description && this.salonDetails.location._id && this.salonDetails.openingHours && this.salonDetails.amenities.length > 0 && this.salonDetails.price && this.salonDetails.paymentModes.length > 0 && this.salonDetails.services.length > 0) {
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
            $('#add-shop').modal('close');
            var object = {}

            object['shopId'] = result;
            object['createdAt'] = new Date();
            object['updatedAt'] = new Date();
            Shops.findOne({
              '_id': result
            }).services.forEach(function(obj) {
              var temp = obj._id
              object[temp] = []
            })

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
                },function(error) {
                  if(!error) {

                  }
                })
              }
            })

            // alert("Inserted Successfully")
          }
        })
    } else {
      alert("Please enter some Location")
    }
  }

  delete(shopId, serviceId) {
    if (shopId, serviceId) {
      Shops.remove({
        '_id': shopId
      }, function(error) {
        if (error) {
          // alert("deleter error")
        } else {
          ShopServices.remove({'_id':serviceId}, function(error) {
            if(error) {

            } else {

            }
          })
          // alert("deleted Successfully")
        }
      })
    }
  }

  initialize(shop) {
    this.salonDetails = {
      'name': shop.name,
      'serviceId': shop.serviceId,
      'type': shop.type,
      'description': shop.description,
      'location': shop.location,
      'images': shop.images,
      'openingHours': shop.openingHours,
      'amenities': shop.amenities,
      'price': shop.price,
      'paymentModes': shop.paymentModes,
      'createdAt': shop.createdAt,
      'updatedAt': shop.updatedAt,
      'services': shop.services
    }
  }
  update() {
    // Locations.update({
    //   '_id': this.savedLocation._id
    // }, {
    //   $set: {
    //     'name': this.savedLocation.name
    //   }
    // },function(error) {
    //   if(error) {
    //     alert("update fails");
    //   } else {
    //     alert("updated")
    //   }
    // })
  }


}


const name = 'salon';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial,
  SalonService
]).component(name, {
  template,
  controllerAs: name,
  controller: Salon
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider.state('salon', {
    url: '/salon',
    template: '<salon></salon>'
  });
}
