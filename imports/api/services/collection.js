import {
    Mongo
} from 'meteor/mongo';
export const Services = new Mongo.Collection('services');

//Make it all for only Admin can perform insert, update, remove
Services.allow({
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
