import {
    Mongo
} from 'meteor/mongo';
export const Bookings = new Mongo.Collection('bookings');

//Make it all for only Admin can perform insert, update, remove
Bookings.allow({
    insert(userId, party) {
        return true;
    },
    update(userId, party, field, modifier) {
        return true;
    },
    remove(userId, party) {
        return true;
    }
})
