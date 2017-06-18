import {
  Meteor
} from 'meteor/meteor';
import {
  Bookings
} from '../../imports/api/bookings'

Meteor.methods({
  /**
   * confirmBooking
   * @param object Booking related all details
   **/
  'markAsComplete': function(id) {
    Future = Npm.require('fibers/future');
    var myFuture = new Future();
    Bookings.update({
      '_id': id
    }, {
      $set: {
        'markAsComplete': true
      }
    }, function(error) {
      if (error) {
        console.log("booking Completed error");
        myFuture.return(false)
      } else {
        console.log("booking Completed");
        myFuture.return(true);
      }
    })

    return myFuture.wait();
  }
});
