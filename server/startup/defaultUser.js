import {
    Accounts
} from 'meteor/accounts-base'

Meteor.startup(function () {
    console.log('Startup: default-user');
    if(!Accounts.findUserByUsername('admin')) {
        console.log('no user found....creating user');
        var options = {
            username: 'admin',
            password: 'iDLxsteh2As9MmikX'
        };
        Accounts.createUser(options);
    }else{
        console.log('user found successfully');
    }
});
