import {
    Mongo
} from 'meteor/mongo';
export const ShopServices = new Mongo.Collection('shopservices');

//Make it all for only Admin can perform insert, update, remove
ShopServices.allow({
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
