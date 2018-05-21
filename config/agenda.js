/**
 * Created by Bilal on 03/14/2018.
 */
/*


const winston = require('winston'),
    Agenda = require('agenda'),
    mongoose = require('mongoose'),
    chalk = require('chalk'),
    PN = mongoose.model('pushNotifications'),
    notifications = require('./notifications'),
    _ = require('lodash'),
    userModel = mongoose.model('User'),
    promoCodes = mongoose.model('promoCodes'),
    sms = require('./sms');

let agenda = new Agenda({
    db: {
        address: config.mongodb.host + config.mongodb.db_name
    }
});

agenda.on('ready', function () {

    winston.info("Agenda Started.");

    agenda.start();
});


//Push Notifications Job
agenda.define('pushNotification', {
    priority: 'high'
}, function (job) {
    winston.info(chalk.green('push job received'));

    const information = job.attrs.data.notificationInfo,
        type = job.attrs.data.type;    //1 for message 2 for jobs

    if (type === 1) {
        winston.info("Agenda triggered for single notification.");

        let messageType = information.messageType || "order_status",
            userId = information.userId || "123",
            message = information.message || "Message_to_show",
            senderName = information.senderName || "Message_to_show",
            badge = information.badge || 10,
            resourceId = information.resource || 'ObjectId',
            status = information.statusCase || 2;

        winston.info("User id " + userId);

        PN.find({user: userId}).then(_usersData  => {
            winston.info("Found " + _usersData.length);
            try {
                if (_usersData && _usersData.length) {
                    _.forEach(_usersData, (_user) => {
                        notifications.sendPush(_user.arn, message, messageType, messageType, senderName, badge, resourceId, status);
                    });
                }
            }
            catch (err) {
                winston.error(err);
            }
        });
    }
    else if (type === 2) {
        winston.info("Promo codes messaging notifications");

        const promoCode = information.code,
            discountedPercentage = information.percentage,
            promoCodeId = information.promoCodeId;

        let promoText = information.promoText || 'Message_to_show Limited time offer! Enter this code' + promoCode + ' and get ' + discountedPercentage + '% discount.';

        userModel.find({}, {_id: 1, mobileNo: 1}).then(_users => {
            winston.info("Found " + _users.length);

            let numbers = "",
                num = "";

            try{
                _.forEach(_users, (user, index) => {
                    num = user.mobileNo.replace(/^\+/, '');
                    if (index < _users.length - 1) {
                        numbers += num + ',';
                    } else {
                        numbers += num;
                    }
                });
            }
            catch(err){
                winston.error(err);
            }

            try{
                winston.info("Numbers :" + numbers);
                let smsObject = {
                    to: numbers,
                    text: promoText
                };
                sms.sendMessage(smsObject, (err) => {
                    if (err) {
                        winston.error(err);
                        throw {msgCode: 9123};
                    }
                    else {
                        promoCodes.update({_id : promoCodeId}, {allSend : true}).exec();
                        winston.info('sms sent');
                    }
                });
            }
            catch(err){
                winston.error(err);
            }
        });
    }

});

agenda.on('success:pushNotification', function (job) {
    winston
        .info(chalk.green("push sending success to " +
            job.attrs.data.notificationInfo.userId));
    job.remove();
});
agenda.on('fail:pushNotification', function (job) {
    winston.info(chalk.red("Push sending failed to user " +
        job.attrs.data.notificationInfo.userId));
});
*/
