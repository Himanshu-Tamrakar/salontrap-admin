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
  'cancelBooking': function(id, userId) {
    Future = Npm.require('fibers/future');
    var myFuture = new Future();
    const user = Meteor.users.findOne({"_id":userId})
    Bookings.update({
      '_id': id
    }, {
      $set: {
        'isCancel': true,
        'cancelBy': user.username
      }
    }, function(error) {
      if (error) {
        console.log("booking canceled");
        myFuture.return(false)
      } else {
        console.log("booking canceled");
        myFuture.return(true);
      }
    })

    return myFuture.wait();
  }
});
