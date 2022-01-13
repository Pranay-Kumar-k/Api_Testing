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

describe('Testing the staffsAnytime api in the easyshare', () => {

    it('staffsAnytime api for profileId (30854ee8-2329-4208-b199-638d18a0320d) - should fetch details of the staff', (done) => {

        const endpoint = `/api/v1/profile/${merchantId}/hours`;

        const url = baseUrl + endpoint;

        axios({
            method: 'GET',
            url: url,
            headers: headers
        })
        .then(res => {
            expect(res.status).to.equal(200);
            expect(res.data.response).to.be.true;
            expect(res.data.data.items).to.be.an('array');
            done();
        })
        .catch(err => {
            done(err);
        })
    });

    it('staffsAnytime api for wrong merchantId (abcd) - should show the full name as null with 200 status', (done) => {

        const endpoint = `/api/v1/profile/abcd/hours`;

        const url = baseUrl + endpoint;

        axios({
            method: 'GET',
            url: url,
            headers: {
                'authority' : 'easyshare-dot-services-dot-staging-schedulingengine.el.r.appspot.com',
                'authorization' : token,
                'content-type' : 'application/json',
                'brandid' : brandid,
                'merchantid' : 'abcd'
            }
        })
        .then(res => {
             
            expect(res.status).to.equal(200);
            expect(res.data.response).to.be.true;
            expect(res.data.data.items[0].profile.fullname).to.be.null;
            done();
        })
        .catch(err => {
             
            done(err);
        })
    });

    it('staffsAnytime api for merchantId is null  - returns the response with status code 400', (done) => {

        const endpoint = `/api/v1/profile/${merchantId}/hours`;

        const url = baseUrl + endpoint;

        axios({
            method: 'GET',
            url: url,
            headers: {
                'authority' : 'easyshare-dot-services-dot-staging-schedulingengine.el.r.appspot.com',
                'authorization' : token,
                'content-type' : 'application/json',
                'brandid' : brandid,
                'merchantid' : null
            }
        })
        .then(res => {
            done();
        })
        .catch(err => {
            expect(err.response.data.code).to.equal(400);
            expect(err.response.data.response).to.be.false;
            done();
        })
    });
});