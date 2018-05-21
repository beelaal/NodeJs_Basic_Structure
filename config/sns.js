/**
 * Created by Bilal on 17/08/2018.
 */
const aws = require('aws-sdk');

function initialize() {

    aws.config.update({
        accessKeyId: config.sns.access.accessKeyId,
        secretAccessKey: config.sns.access.secretAccessKey
    });
    aws.config.region = config.sns.access.region;
    var _SNS = new aws.SNS({
        sns: '2010-03-31'
    });
    return _SNS;
}

function android() {
    return config.platFormApplicationArn.gcm;
}

function ios() {
    return config.platFormApplicationArn.apn_user;
}
module.exports = {
    androidPlatformApplicationArn: android,
    iosPlatformApplicationArn: ios,
    sns: initialize
};
