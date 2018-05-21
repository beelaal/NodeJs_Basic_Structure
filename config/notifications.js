/**
 * Created by Bilal on 03/11/2018.
 */

'use strict'; //NO SONAR
/*

const mongoose = require('mongoose'),
    PN = mongoose.model('pushNotifications'),
    SNS = require('./sns'),
    _SNS = SNS.sns(),
    promise = require('bluebird'),
    _ = require('lodash'),
    agendaHelper = require('../modules/agenda/agenda.helper'),
    winston = require('winston');

let generateEndPoint = (req) => {
    if (!req.body.deviceToken) {
        return promise.resolve();
    }

    if (req.body.deviceType === 'android') {
        return makeEndPointForAndroidUser(req.body.deviceToken).catch(function (err) {
            return promise.reject(err);
        });

    } else if (req.body.deviceType === 'ios') {
        return makeEndPointForIOSUser(req.body.deviceToken).catch(function (err) {
            return promise.reject(err);
        });
    } else {
        return promise.resolve();
    }
}

let removeEndPoint = (arn) => {

    PN.find({
        arn: arn
    }).remove().exec();

}

let removeEndPointUsingSessionId = (sid) => {
    winston.info('Request to remove session recieved having sid : ' + sid);
    PN.find({
        sid: sid
    }).remove().exec().then((removedSession) => {
    }).catch(err => {
        winston.error(err);
    });
}

let makeEndPointForAndroidUser = (deviceToken) => {
    return new promise(function (resolve, reject) {
        _SNS.createPlatformEndpoint({
            PlatformApplicationArn: SNS.androidPlatformApplicationArn(),
            Token: deviceToken
        }, function (err, data) {
            if (err) {
                return reject(err);
            } else {
                return resolve(data.EndpointArn);
            }
        });
    });
}


let makeEndPointForIOSUser = (deviceToken) => {

    return new promise(function (resolve, reject) {
        _SNS.createPlatformEndpoint({
            PlatformApplicationArn: SNS.iosPlatformApplicationArn(),
            Token: deviceToken
        }, function (err, data) {
            if (err) {
                return reject(err);
            } else {
                return resolve(data.EndpointArn);
            }
        });
    });

}


let sendPush = (endPoint, message, messageType, type, senderName, badgeCount, resourceId, status) => {
    winston.info('sending push to', endPoint);
    var na = "N/A";
    var msg = {
        "default": message,
        "APNS_SANDBOX": "{\"aps\":{\"alert\": \"" + message + "\"" +
        ",\"badge\":" + badgeCount +
        ",\"messageType\":\"" + messageType + "\"" +
        ",\"senderName\":\"" + senderName + "\"" +
        ",\"resourceId\":\"" + resourceId + "\"" +
        ",\"resourceType\":\"" + status + "\"" +
        ",\"sound\":\"default\",\"type\":\"" + type + "\"}}",
        "APNS": "{\"aps\":{" +
        "\"alert\": \"" + message + "\"" +
        ",\"badge\":" + badgeCount +
        ",\"messageType\":\"" + messageType + "\"" +
        ",\"senderName\":\"" + senderName + "\"" +
        ",\"resourceId\":\"" + resourceId + "\"" +
        ",\"resourceType\":\"" + status + "\"" +
        ",\"sound\":\"default\",\"type\":\"" + type + "\"}}",
        "GCM": "{\"data\":{\"" +
        "message\":\"" + message + "\"," +
        "\"type\":\"" + type + "\"," +
        "\"resourceId\":\"" + resourceId + "\"," +
        "\"resourceType\":\"" + status + "\"" +
        "}}",
    };
    return new promise(function (resolve) {
        _SNS.publish({
            Message: JSON.stringify(msg),
            /!* required *!/
            TargetArn: endPoint,
            MessageStructure: 'json'
        }, function (err, data) {
            if (err && err.code === 'EndpointDisabled') {
                // if error remove endPoint
                winston.info('error', err);
                removeEndPoint(endPoint);

            } else if (err) {
                winston.info('error', err);
            } // an error occurred
            else {
                winston.info('success', data);
                return resolve(data);
            }

        });
    });
}

let pushDeviceNotificationDetail = (sessionId, userId, endPoint, deviceType, deviceToken) => {

    let deviceTypeId = 1;

    if (deviceType === 'android') {
        deviceTypeId = 2;
    }
    else {
        deviceTypeId = 1;
    }

    return PN.findOneAndUpdate({
        sid: sessionId,
        user: userId
    }, {
        $set: {
            sid: sessionId,
            user: userId,
            arn: endPoint,
            type: deviceTypeId,
            token: deviceToken
        }
    }, {
        upsert: true
    }).then(dataSaved => {
        winston.info("Push Notification Data Saved.")
    }).catch(err=> {
        winston.error(err);
    });
}

let testPush = (req, res, next) => {

    let userId = req.query.userId;

    if (userId) {
        agendaHelper.pushJob({
            userId: userId,
            messageType: 'order_status'
        }, 1);
        winston.info('Agenda pushed');
        res.send({success: 1});
    }
    else {
        winston.log("No UserId found");
        res.send({success: 1});
    }

}

module.exports = {
    generateEndPoint,
    makeEndPointForAndroidUser,
    makeEndPointForIOSUser,
    removeEndPoint,
    sendPush,
    pushDeviceNotificationDetail,
    testPush,
    removeEndPointUsingSessionId
}





*/
