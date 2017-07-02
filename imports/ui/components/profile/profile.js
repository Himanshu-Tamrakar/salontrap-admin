import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from '@uirouter/angularjs';
import template from './profile.html';
import {
  Meteor
} from 'meteor/meteor';
import {
  Bookings
} from '../../../api/bookings'
import {
  Shops
} from '../../../api/shops'
import {
  Services
} from '../../../api/services'



class Profile {
  constructor($scope, $reactive, $state, $timeout) {
    'ngInject';

    $reactive(this).attach($scope);

    this.scope = $scope;
    this.state = $state;

    $timeout(function() {
      $(document).ready(function() {
        $('ul.tabs').tabs();
      });
    }, 10);

    this.helpers({
      user() {
        if (Meteor.userId()) {
          return Meteor.users.findOne(Meteor.userId())
        }
      },
      bookings() {
        return Bookings.find({})
      },
      allusers() {
        return Meteor.users.find({})
      }
    });

    $scope.salonIdToSalon = function(id) {
      return Shops.findOne({
        '_id': id
      })
    }
    $scope.getUserName = function(userId) {
      const user = Meteor.users.findOne({
        '_id': userId
      })
      if (user && user.profile) {
        return user.profile.name
      }
    }

    $scope.serviceIdToService = function(id) {
      if (id) {
        return Services.findOne({
          '_id': id
        })
      }
    }

  }


  cancelBooking(id) {
    if (id) {
      Meteor.call('cancelBooking', id, Meteor.userId());
    }
  }

  markAsComplete(id) {
    if (id) {
      Meteor.call('markAsComplete', id);
    }
  }


}



const name = 'profile';

// Module
export default angular.module(name, [
  angularMeteor,
  ngMaterial,
  uiRouter
]).component(name, {
  template,
  controllerAs: name,
  controller: Profile
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider.state('profile', {
    url: '/profile',
    template: '<profile></profile>',
    resolve: {
      currentUser($q, $state) {
        if (Meteor.userId() === null) {
          // return $q.reject('AUTH_REQUIRED');
          $state.go('login')
        } else {
          return $q.resolve();
        }
      }
    }
  });
}
