import {
    Mongo
} from 'meteor/mongo';
export const Locations = new Mongo.Collection('locations');

//Make it all for only Admin can perform insert, update, remove
Locations.allow({
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
