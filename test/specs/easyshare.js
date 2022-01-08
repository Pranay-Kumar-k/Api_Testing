const axios = require('axios');
const chai = require('chai');
const {expect} = chai;

const baseUrl = "https://easyshare-dot-services-dot-staging-schedulingengine.el.r.appspot.com/";

const brandid = '0dab9518-34d4-4725-a847-ca7ff65168a2';

const merchantId = '30854ee8-2329-4208-b199-638d18a0320d';

const headers = {
    'authority' : 'easyshare-dot-services-dot-staging-schedulingengine.el.r.appspot.com',
    'authorization' : token,
    'content-type' : 'application/json',
    'brandid' : brandid,
    'merchantid' : merchantId
}

describe(`Testing the api's in the easyshare module`, () => {

    it('staffsAnytime api for merchantId (30854ee8-2329-4208-b199-638d18a0320d) - should fetch details of the staff to be easyshare', (done) => {

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
            expect(res.data.data.items[0].profile.fullname).to.be.equal('easyshare ');
            done();
        })
        .catch(err => {
            // console.log(err);
            done(err);
        })
    });
    
    it('Anytime Staffs api - should fetch all the staffs details', (done) => {

        const endpoint = "/api/v1/profile/all/hours";

        const url = baseUrl + endpoint;

        axios({
            method: 'GET',
            url: url,
            headers: headers,
            params: {
                merchantId: merchantId,
                brand : brandid
            }
        })
        .then(res => {
            expect(res.status).to.equal(200);
            expect(res.data.response).to.be.true;
            expect(res.data.data.items).to.be.an('array');
            done();
        })
        .catch(err => {
            // console.log(err);
            done(err);
        })
    });

    it('Anytime Services api - should fetch all the services', (done) => {

        const endpoint = "/api/v1/services/type";

        const url = baseUrl + endpoint;

        axios({
            method: 'GET',
            url: url,
            headers: headers,
            params: {
                merchantId: merchantId,
                brand : brandid
            }
        })
        .then(res => {
            expect(res.status).to.equal(200);
            expect(res.data.response).to.be.true;
            done();
        })
        .catch(err => {
            // console.log(err);
            done(err);
        })
    });

    it('Setmore Categories api - should fetch all the categories', (done) => {

        const endpoint = "/api/v1/services/category";

        const url = baseUrl + endpoint;

        axios({
            method: 'GET',
            url: url,
            params: {
                merchantId: merchantId,
                brand : '110003eb-76c1-4b81-a96a-4cdf91bf70fb',
                isDeleted: false
            }
        })
        .then(res => {
            expect(res.status).to.equal(200);
            expect(res.data.data.scheduleCategories).to.be.an('array');
            done();
        })
        .catch(err => {
            // console.log(err);
            done(err);
        })
    });

    it('Setmore bookingLink api - fetches a booking link url', (done) => {

        const endpoint = '/api/v1/services/bookinglink';
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
            // console.log(res.data)
            expect(res.status).to.equal(200);
            expect(res.data.response).to.be.true;
            expect(res.data.data.mybookinglink).to.be.a('string');
            done();
        })
        .catch(err => {
            // console.log(err);
            done(err);
        })
    });

    it('Anytime Get Service api - fetches services related to the brand', (done) => {

        const endpoint = 'api/v1/services/type?brand=0dab9518-34d4-4725-a847-ca7ff65168a2';
        const url = baseUrl + endpoint;

        axios({
            method: 'GET',
            url: url,
            headers: headers
        })
        .then(res => {
            // console.log(res)
            expect(res.status).to.equal(200);
            expect(res.data.response).to.be.true;
            expect(res.data.data.scheduleTypes).to.be.an('array');
            done();
        })
        .catch(err => {
            // console.log(err);
            done(err);
        })
    });

    it('Anytime Service api - Deletes service with the service id', (done) => {

        const endpoint = 'api/v1/services/type/e3935a5d-d6df-47e0-b48b-2c5d4a3aad00';
        const url = baseUrl + endpoint;

        axios({
            method: 'DELETE',
            url: url
        })
        .then(res => {
            // console.log(res)
            expect(res.status).to.equal(200);
            expect(res.data.response).to.be.true;
            done();
        })
        .catch(err => {
            // console.log(err);
            done(err);
        })
    });

});