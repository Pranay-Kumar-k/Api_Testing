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

describe('Testing the Get Service api based on brand type', () => {
    
    const endpoint = 'api/v1/services/type';
    
    const url = baseUrl + endpoint;
        
    it('fetches services related to the anytime', (done) => {

        axios({
            method: 'GET',
            url: url,
            headers: headers,
            params: {
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

    it('response should be empty when the brand id is null/wrong id/empty string', (done) => {

        axios({
            method: 'GET',
            url: url,
            headers: headers,
            params: {
                brand: 'abcd'
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
});

describe('Testing the Delete service api in Anytime', () => {

    it('Deletes service with the service id', (done) => {

        const endpoint = 'api/v1/services/type/e3935a5d-d6df-47e0-b48b-2c5d4a3aad00';
        const url = baseUrl + endpoint;

        axios({
            method: 'DELETE',
            url: url
        })
        .then(res => {
             
            expect(res.status).to.equal(200);
            expect(res.data.response).to.be.true;
            done();
        })
        .catch(err => {
             
            done(err);
        })
    });

    it('response status should be 400 and throws a error msg when service id is null/empty/wrong service id', (done) => {

        const endpoint = 'api/v1/services/type/abcd';
        const url = baseUrl + endpoint;

        axios({
            method: 'DELETE',
            url: url
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

describe('Testing Anytime service api - add metting', () => {
    
    it('Add a meeting with the post request for the given data and response title should be dummy meeting', (done) => {

        const endpoint = 'api/v1/services/type';
        const url = baseUrl + endpoint;

        axios({
            method: 'POST',
            headers: headers,
            url: url,
            data: {
                "brand": brandid,
                "merchantId": merchantId,
                "referrerType": "PROVIDER",
                "scheduleType": "INDIVIDUAL",
                "provider": [
                    "2eb699b3-cbf1-4fdb-b427-5a5ad6baad8b"
                ],
                "isPrivate": false,
                "title": "dummy meeting"
            }
        })
        .then(res => {
            expect(res.status).to.equal(200);
            expect(res.data.response).to.be.true;
            expect(res.data.data.title).to.be.equal('dummy meeting');
            done();
        })
        .catch(err => {
            done(err);
        })
    });

    it('Add a meeting with the post request for the given data and response title should be dummy meeting if the brandid is wrong/empty string', (done) => {

        const endpoint = 'api/v1/services/type';
        const url = baseUrl + endpoint;

        axios({
            method: 'POST',
            headers: headers,
            url: url,
            data: {
                "brand": 'abcd',
                "merchantId": merchantId,
                "referrerType": "PROVIDER",
                "scheduleType": "INDIVIDUAL",
                "provider": [
                    "2eb699b3-cbf1-4fdb-b427-5a5ad6baad8b"
                ],
                "isPrivate": false,
                "title": "dummy meeting"
            }
        })
        .then(res => {
            expect(res.status).to.equal(200);
            expect(res.data.response).to.be.true;
            expect(res.data.data.title).to.be.equal('dummy meeting');
            done();
        })
        .catch(err => {
            done(err);
        })
    });

    it('If the brandid is null then it should through the error with status code of 400', (done) => {

        const endpoint = 'api/v1/services/type';
        const url = baseUrl + endpoint;

        axios({
            method: 'POST',
            headers: headers,
            url: url,
            data: {
                "brand": null,
                "merchantId": '',
                "referrerType": "PROVIDER",
                "scheduleType": "INDIVIDUAL",
                "provider": [
                    "2eb699b3-cbf1-4fdb-b427-5a5ad6baad8b"
                ],
                "isPrivate": false,
                "title": "dummy meeting"
            }
        })
        .then(res => {
            done();
        })
        .catch(err => {
            console.log()
            expect(err.response.status).to.equal(400);
            expect(err.response.data.response).to.be.false;
            expect(err.response.data.msg).to.be.a('string', 'Invalid payload required brand');
            done();
        })
    });

    it('If the merchantId is empty string/null/wrong then it should through the error with status code of 400', (done) => {

        const endpoint = 'api/v1/services/type';
        const url = baseUrl + endpoint;

        axios({
            method: 'POST',
            headers: headers,
            url: url,
            data: {
                "brand": brandid,
                "merchantId": 'wrong',
                "referrerType": "PROVIDER",
                "scheduleType": "INDIVIDUAL",
                "provider": [
                    "2eb699b3-cbf1-4fdb-b427-5a5ad6baad8b"
                ],
                "isPrivate": false,
                "title": "dummy meeting"
            }
        })
        .then(res => {
            done();
        })
        .catch(err => {
            expect(err.response.status).to.equal(400);
            expect(err.response.data.response).to.be.false;
            expect(err.response.data.msg).to.be.a("string", "id can't be null or empty :: ");
            done();
        })
    });
})

describe(`Testing the Anytime Service api - edit meeting`, () => {

    it('Edit a meeting with the PUT request for the given data and response id should be f86263b6-d988-4513-ae42-10ecc1889c53 and title should be Test meeting 123', (done) => {

        const endpoint = 'api/v1/services/type';
        const url = baseUrl + endpoint;

        axios({
            method: 'PUT',
            url: url,
            data: {
                "id": "f86263b6-d988-4513-ae42-10ecc1889c53",
                "brand": "110003eb-76c1-4b81-a96a-4cdf91bf70fb",
                "merchantId": merchantId,
                "referrerType": "MERCHANT",
                "title": "Test meeting 123",
                "provider": [
                    "ra3ac1634885874116",
                    "rce712b90f057af52736efc23b6614979eff29aa0-d",
                    "r93431634885792142"
                ],
                "scheduleType": "SERVICE"
            }
        })
        .then(res => {
            expect(res.status).to.equal(200);
            expect(res.data.response).to.be.true;
            expect(res.data.data.title).to.be.equal('Test meeting 123');
            expect(res.data.data.id).to.be.equal('f86263b6-d988-4513-ae42-10ecc1889c53');
            done();
        })
        .catch(err => {
            done(err);
        })
    });

    it('Response should be true if the meeting id is wrong', (done) => {

        const endpoint = 'api/v1/services/type';
        const url = baseUrl + endpoint;

        axios({
            method: 'PUT',
            url: url,
            data: {
                "id": "abcd",
                "brand": "110003eb-76c1-4b81-a96a-4cdf91bf70fb",
                "merchantId": merchantId,
                "referrerType": "MERCHANT",
                "title": "Test meeting 123",
                "provider": [
                    "ra3ac1634885874116",
                    "rce712b90f057af52736efc23b6614979eff29aa0-d",
                    "r93431634885792142"
                ],
                "scheduleType": "SERVICE"
            }
        })
        .then(res => {
            expect(res.status).to.equal(200);
            expect(res.data.response).to.be.true;
            expect(res.data.data.title).to.be.equal('Test meeting 123');
            expect(res.data.data.id).to.be.equal('abcd');
            done();
        })
        .catch(err => {
            done(err);
        })
    });

    it('Response should be true if the meeting id is empty string/null', (done) => {

        const endpoint = 'api/v1/services/type';
        const url = baseUrl + endpoint;

        axios({
            method: 'PUT',
            url: url,
            data: {
                "id": null,
                "brand": "110003eb-76c1-4b81-a96a-4cdf91bf70fb",
                "merchantId": merchantId,
                "referrerType": "MERCHANT",
                "title": "Test meeting 123",
                "provider": [
                    "ra3ac1634885874116",
                    "rce712b90f057af52736efc23b6614979eff29aa0-d",
                    "r93431634885792142"
                ],
                "scheduleType": "SERVICE"
            }
        })
        .then(res => {
            done();
        })
        .catch(err => {
            expect(err.response.status).to.equal(400);
            expect(err.response.data.response).to.be.false;
            expect(err.response.data.msg).to.be.a("string", "id can't be null or empty :: ")
            done();
        })
    });

});