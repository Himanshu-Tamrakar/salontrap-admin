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
      $('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '4%', // Starting top style attribute
        endingTop: '10%', // Ending top style attribute
        ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.

        },
        complete: function() {

        }
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

  initialize(id) {
    const object = Locations.findOne({
      '_id': id
    });

    this.savedLocation._id = object._id
    this.savedLocation.name = object.name
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
