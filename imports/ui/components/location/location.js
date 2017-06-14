import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './location.html';
import uiRouter from '@uirouter/angularjs';
import ngMaterial from 'angular-material';
import {
  Meteor
} from 'meteor/meteor';
import {
  Locations
} from '../../../api/locations'


class Location {
  constructor($scope, $reactive, $timeout, $state, $q) {
    'ngInject';

    $reactive(this).attach($scope);

    this.scope = $scope;
    this.timeout = $timeout;
    this.state = $state;

    this.locationName = null;

    this.savedLocation = {
      '_id': null,
      'name': null
    };

    $timeout(function() {
      $(document).ready(function() {
        $('.modal').modal();
      });
    }, 10);

    this.helpers({
      allLocations() {
        return Locations.find();
      }
    })

  }

  insert() {
    if (this.locationName) {
      Locations.insert({
        name: this.locationName
      }, function(error) {
        if (error) {
          alert("Insertion fails")
        } else {
          document.getElementById('location_name').value = null;
          alert("Inserted Successfully")
        }
      })
    } else {
      alert("Please enter some Location")
    }
  }

  delete(id) {
    if (id) {
      Locations.remove({
        '_id': id
      }, function(error) {
        if (error) {
          // alert("deleter error")
        } else {
          // alert("deleted Successfully")
        }
      })
    }
  }

  initialize(location) {
    this.savedLocation._id = location._id
    this.savedLocation.name = location.name
  }
  update() {
    Locations.update({
      '_id': this.savedLocation._id
    }, {
      $set: {
        'name': this.savedLocation.name
      }
    },function(error) {
      if(error) {
        alert("update fails");
      } else {
        alert("updated")
      }
    })
  }


}


const name = 'location';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial,
]).component(name, {
  template,
  controllerAs: name,
  controller: Location
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider.state('location', {
    url: '/location',
    template: '<location></location>'
  });
}
