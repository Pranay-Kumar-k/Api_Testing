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

describe('Testing the Setmore categories api', () => {

    const endpoint = "/api/v1/services/category";

    const url = baseUrl + endpoint;

    it('should fetch all the categories in the setmore app', (done) => {

        axios({
            method: 'GET',
            url: url,
            headers: headers,
            params: {
                merchantId: merchantId,
                brand : '110003eb-76c1-4b81-a96a-4cdf91bf70fb',
                isDeleted: false
            }
        })
        .then(res => {
             
            expect(res.status).to.equal(200);
            expect(res.statusText).to.be.a('string', 'OK');
            expect(res.data.data.scheduleCategories).to.be.an('array');
            expect(res.data.response).to.be.true;
            done();
        })
        .catch(err => {
             
            done(err);
        })
    });

    it('should fetch the categories in the app if we dont include brandid & isDeleted in params', (done) => {

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
            expect(res.data.data.scheduleCategories).to.be.an('array');
            done();
        })
        .catch(err => {
             
            done(err);
        })
    });

    it('should fetch all the categories in the app if we dont include brandid in params and isDeleted is false', (done) => {

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
            expect(res.data.data.scheduleCategories).to.be.an('array');
            done();
        })
        .catch(err => {
             
            done(err);
        })
    });

    it('should fetch all the categories deleted in the app with brandid & isDeleted is true in params', (done) => {

        axios({
            method: 'GET',
            url: url,
            headers: headers,
            params: {
                merchantId: merchantId,
                isDeleted:true,
                brand : '110003eb-76c1-4b81-a96a-4cdf91bf70fb',
            }
        })
        .then(res => {
            
            expect(res.status).to.equal(200);
            expect(res.statusText).to.be.a('string', 'OK');
            expect(res.data.response).to.be.true;
            expect(res.data.data.scheduleCategories).to.be.an('array');
            done();
        })
        .catch(err => {
             
            done(err);
        })
    });

    it('In the app if the merchantid is null and isDeleted is false then the response should be with 500 status code', (done) => {

        axios({
            method: 'GET',
            url: url,
            headers: headers,
            params: {
                merchantId: null,
                isDeleted:false,
                brand : '110003eb-76c1-4b81-a96a-4cdf91bf70fb',
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

    it('response should be an empty string if the merchantid and brandid is null', (done) => {

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
            // console.log(res)
            expect(res.status).to.equal(200);
            expect(res.statusText).to.be.a('string', 'OK');
            expect(res.data).to.be.a('string', '');
            done();
        })
        .catch(err => {
            done();
        })
    });
});