import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './service.html';
import uiRouter from '@uirouter/angularjs';
import ngMaterial from 'angular-material';
import {
  Meteor
} from 'meteor/meteor';
import {
  Services
} from '../../../api/services'


class Service {
  constructor($scope, $reactive, $timeout, $state, $q) {
    'ngInject';

    $reactive(this).attach($scope);

    this.scope = $scope;
    this.timeout = $timeout;
    this.state = $state;

    this.serviceName = null;

    this.savedService = {
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
      allServices() {
        return Services.find();
      }
    })

  }

  insert() {
    if (this.serviceName) {
      Services.insert({
        name: this.serviceName
      }, function(error) {
        if (error) {
          alert("Insertion fails")
        } else {
          document.getElementById('service_name').value = null;
          alert("Inserted Successfully")
        }
      })
    } else {
      alert("Please enter Service Name")
    }
  }

  delete(id) {
    if (id) {
      Services.remove({
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

  initialize(service) {
    this.savedService._id = service._id
    this.savedService.name = service.name
  }
  update() {
    Services.update({
      '_id': this.savedService._id
    }, {
      $set: {
        'name': this.savedService.name
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


const name = 'service';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial,
]).component(name, {
  template,
  controllerAs: name,
  controller: Service
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider.state('service', {
    url: '/service',
    template: '<service></service>'
  });
}
