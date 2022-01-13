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

describe('Testing the Anytime staffs api', () => {
    
    const endpoint = "/api/v1/profile/all/hours";

    it('Anytime Staffs api - should fetch all the staffs details in the application', (done) => {

        const url = baseUrl + endpoint;

        axios({
            method: 'GET',
            url: url,
            headers: headers,
        })
        .then(res => {
             
            expect(res.status).to.equal(200);
            expect(res.data.response).to.be.true;
            expect(res.statusText).to.be.a('string', 'OK');
            expect(res.data.data.items).to.be.an('array');
            done();
        })
        .catch(err => {
             
            done(err);
        })
    });
    
    it('Anytime Staffs api - status code to be 400 and response should be false for wrong merchantId', (done) => {

        const url = baseUrl + endpoint;

        let wrongMerchantId = 'abcd';

        axios({
            method: 'GET',
            url: url,
            headers: {
                'authority' : 'easyshare-dot-services-dot-staging-schedulingengine.el.r.appspot.com',
                'authorization' : token,
                'content-type' : 'application/json',
                'brandid' : brandid,
                'merchantid' : wrongMerchantId
            },
        })
        .then(res => {
             
            done();
        })
        .catch(err => {
             
            expect(err.response.data.code).to.equal(400);
            expect(err.response.statusText).to.be.a('string', 'Bad Request');
            expect(err.response.data.response).to.be.false;
            expect(err.response.data.msg).to.be.a('string', `${wrongMerchantId} is not found`);
            done();
        })
    });

    it('Anytime Staffs api - status code to be 400 and response should be false if merchantId is null', (done) => {

        const url = baseUrl + endpoint;

        let wrongMerchantId = null;

        axios({
            method: 'GET',
            url: url,
            headers: {
                'authority' : 'easyshare-dot-services-dot-staging-schedulingengine.el.r.appspot.com',
                'authorization' : token,
                'content-type' : 'application/json',
                'brandid' : brandid,
                'merchantid' : wrongMerchantId
            },
        })
        .then(res => {
             
            done();
        })
        .catch(err => {
             
            expect(err.response.data.code).to.equal(400);
            expect(err.response.statusText).to.be.a('string', 'Bad Request');
            expect(err.response.data.response).to.be.false;
            expect(err.response.data.msg).to.be.a('string', `${wrongMerchantId} is not found`);
            done();
        })
    });

});