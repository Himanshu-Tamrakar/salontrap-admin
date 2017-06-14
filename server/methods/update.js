import {
  Meteor
} from 'meteor/meteor';
import {
  ShopServices
} from '../../imports/api/shopServices'

Meteor.methods({
  /**
   * confirmBooking
   * @param object older object
   * @param object1 New object
   **/
  'updateSubservice': function(id, object, object1) {
    this.unblock()
    ShopServices.update({
      '_id': id,
      'services': {
        $elemMatch: {
          'serviceId': object.serviceId,
          'serviceName': object.serviceName,
          'subServiceName': object.subServiceName,
          'price': object.price,
          'discount': object.discount
        }
      }
    }, {
      $set: {
        "services.$.subServiceName": object1.subServiceName,
        "services.$.price": object1.price,
        "services.$.discount": object1.discount,
      }
    }, function(error) {
      if (error) {
        console.log("error in updateSubservice" + error);
      } else {
        console.log("subService updated");
      }
    })

  }
});
