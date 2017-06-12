import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { name as SalonTrap } from '../imports/ui/components/salontrap/salontrap';


function onReady() {
  angular.bootstrap(document, [
    SalonTrap
  ], {
    strictDi: true
  });
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
