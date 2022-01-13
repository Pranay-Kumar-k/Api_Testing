const axios = require('axios');
const chai = require('chai');
const {expect} = chai;
const token = require("../../../src/easyshare");

const baseUrl = "https://easyshare-dot-services-dot-staging-schedulingengine.el.r.appspot.com/";

const brandid = '0dab9518-34d4-4725-a847-ca7ff65168a2';

const merchantId = '30854ee8-2329-4208-b199-638d18a0320d';

 headers = {
    'authority' : 'easyshare-dot-services-dot-staging-schedulingengine.el.r.appspot.com',
    'authorization' : token,
    'content-type' : 'application/json',
    'brandid' : brandid,
    'merchantid' : merchantId
};

describe('Testing Setmore Bookinglink api', () => {
    
    const endpoint = '/api/v1/services/bookinglink';

    it('fetches a booking link url for a service with userid(30854ee8-2329-4208-b199-638d18a0320d)', (done) => {

        const url = baseUrl + endpoint;

        axios({
            method: 'GET',
            url: url,
            params: {
                userid: merchantId,
                brand : '110003eb-76c1-4b81-a96a-4cdf91bf70fb',
                headers: headers,
                type: 'merchant'
            }
        })
        .then(res => {
             
            expect(res.status).to.equal(200);
            expect(res.data.response).to.be.true;
            expect(res.data.data.mybookinglink).to.be.a('string');
            done();
        })
        .catch(err => {
             
            done(err);
        })
    });

    it('service with userid(30854ee8-2329-4208-b199-638d18a0320d) when type is not passed in params should through 400 error', (done) => {

        const url = baseUrl + endpoint;

        axios({
            method: 'GET',
            url: url,
            params: {
                userid: merchantId,
                brand : '110003eb-76c1-4b81-a96a-4cdf91bf70fb',
                headers: headers,
            }
        })
        .then(res => {
            done();
        })
        .catch(err => {
             
            expect(err.response.status).to.equal(400);
            expect(err.response.statusText).to.be.a('string', 'Bad Request');
            expect(err.response.data.response).to.be.false;
            done();
        })
    });

    it('fetches a booking link url for a service with userid(30854ee8-2329-4208-b199-638d18a0320d) when brandid is null or empty string', (done) => {
        const url = baseUrl + endpoint;

        axios({
            method: 'GET',
            url: url,
            params: {
                userid: merchantId,
                brand : null,
                headers: headers,
                type: 'merchant'
            }
        })
        .then(res => {
            done();
        })
        .catch(err => {
             
             expect(err.response.status).to.equal(400);
            expect(err.response.statusText).to.be.a('string', 'Bad Request');
            expect(err.response.data.response).to.be.false;
            done();
        })
    });

});