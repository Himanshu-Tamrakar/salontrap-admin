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



class Salon {
  constructor($scope, $reactive, $timeout, $state, $q) {
    'ngInject';

    $reactive(this).attach($scope);

    this.scope = $scope;
    this.timeout = $timeout;
    this.state = $state;

    this.shopToBeUpdate = null;


    this.salonDetails = {
      'name': null,
      'serviceId': null,
      'type': null,
      'location': {},
      'images': null,
      'openingHours': null,
      'amenities': [],
      'price': null,
      'paymentModes': [],
      'createdAt': null,
      'updatedAt': null,
      'services': [],
      'mobile':null,
      'email':null
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
    var selectedLocation = {'_id':null}

    $("#service :selected").each(function() {
      selectedService.push({'_id': JSON.parse($(this).val())._id});
    });
    // $("#service :selected").each(function() {
    //   selectedService.push(JSON.parse($(this).val()));
    // });
    selectedLocation._id = JSON.parse(document.getElementById('location-select').value)._id;

    this.salonDetails.services = selectedService;
    this.salonDetails.location = selectedLocation
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
            $('#add-shop').modal('close');
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

            // alert("Inserted Successfully")
          }
        })
    } else {
      alert("Please Fill The all required fields")
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
          ShopServices.remove({
              '_id': serviceId
            }, function(error) {
              if (error) {

              } else {
                alert("related subservices deleted")
              }
            })
            // alert("deleted Successfully")
        }
      })
    }
  }

  initialize(shop) {
    this.shopToBeUpdate = shop._id;
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
      'services': shop.services,
      'mobile':shop.mobile,
      'email':shop.email
    }
  }

  update() {
    console.log(this.salonDetails);
    $timeout = this.timeout;
    $state = this.state;
    var selectedService = []
    var selectedLocation = null

    $("#service :selected").each(function() {
      selectedService.push(JSON.parse($(this).val()));
    });
    selectedLocation = JSON.parse(document.getElementById('location-select').value);
    this.salonDetails.location = selectedLocation
    this.salonDetails.services = selectedService;


    // Shops.update({
    //   '_id': this.shopToBeUpdate
    // }, {
    //   $set: this.salonDetails
    // }, function(error) {
    //   if (error) {
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
