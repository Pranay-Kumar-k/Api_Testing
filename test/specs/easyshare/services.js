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

describe('Testing the Anytime services api', () => {
    
    const endpoint = "/api/v1/services/type";

    it('should fetch all the services in the anytime app', (done) => {

        const url = baseUrl + endpoint;

        axios({
            method: 'GET',
            url: url,
            headers: headers,
            params: {
                merchantId: merchantId,
                brand : brandid,
                isDeleted: false
            }
        })
        .then(res => {
            expect(res.status).to.equal(200);
            expect(res.statusText).to.be.a('string', 'OK');
            expect(res.data.response).to.be.true;
            done();
        })
        .catch(err => {
            done(err);
        })
    });

    it('should fetch the services in the app if we dont include brandid & isDeleted in params', (done) => {

        const url = baseUrl + endpoint;

        axios({
            method: 'GET',
            url: url,
            headers: headers,
            params: {
                merchantId: merchantId
            }
        })
        .then(res => {
             
            expect(res.status).to.equal(200);
            expect(res.statusText).to.be.a('string', 'OK');
            expect(res.data.response).to.be.true;
            expect(res.data.data.scheduleTypes).to.be.an('array');
            done();
        })
        .catch(err => {
             
            done(err);
        })
    });

    it('should fetch the services in the app if we dont include brandid in params and isDeleted is false', (done) => {

        const url = baseUrl + endpoint;

        axios({
            method: 'GET',
            url: url,
            headers: headers,
            params: {
                merchantId: merchantId,
                isDeleted:false
            }
        })
        .then(res => {
             
            expect(res.status).to.equal(200);
            expect(res.statusText).to.be.a('string', 'OK');
            expect(res.data.response).to.be.true;
            expect(res.data.data.scheduleTypes).to.be.an('array');
            done();
        })
        .catch(err => {
             
            done(err);
        })
    });

    it('should fetch the services in the app with anytime brand id & isDeleted is true in params', (done) => {

        const url = baseUrl + endpoint;

        axios({
            method: 'GET',
            url: url,
            headers: headers,
            params: {
                merchantId: merchantId,
                isDeleted:true,
                brand: brandid
            }
        })
        .then(res => {
             
            expect(res.status).to.equal(200);
            expect(res.statusText).to.be.a('string', 'OK');
            expect(res.data.response).to.be.true;
            expect(res.data.data.scheduleTypes).to.be.an('array');
            done();
        })
        .catch(err => {
             
            done(err);
        })
    });

    it('should fetch all the services in the app if the merchantid is null and isDeleted is false then the response should be true', (done) => {

        const url = baseUrl + endpoint;

        axios({
            method: 'GET',
            url: url,
            headers: headers,
            params: {
                merchantId: null,
                isDeleted:false,
                brand: brandid
            }
        })
        .then(res => {
             
            expect(res.status).to.equal(200);
            expect(res.statusText).to.be.a('string', 'OK');
            expect(res.data.response).to.be.true;
            expect(res.data.data.scheduleTypes).to.be.an('array');
            done();
        })
        .catch(err => {
             
            done(err);
        })
    });

    it('should fetch all the services in the app if the merchantid and brandid is null and the response status to be 500', (done) => {

        const url = baseUrl + endpoint;

        axios({
            method: 'GET',
            url: url,
            headers: headers,
            params: {
                merchantId: null,
                isDeleted:false,
                brand: null
            }
        })
        .then(res => {
             
            done();
        })
        .catch(err => {
            expect(err.response.status).to.equal(500);
            expect(err.response.statusText).to.be.a('string', 'Internal Server Error');
            done();
        })
    });
});