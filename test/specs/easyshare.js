const axios = require('axios');
const chai = require('chai');
const {expect} = chai;

const baseUrl = "https://easyshare-dot-services-dot-staging-schedulingengine.el.r.appspot.com/";

const brandid = '0dab9518-34d4-4725-a847-ca7ff65168a2';

const merchantId = '30854ee8-2329-4208-b199-638d18a0320d';

 headers = {
    'authority' : 'easyshare-dot-services-dot-staging-schedulingengine.el.r.appspot.com',
    'authorization' : token,
    'content-type' : 'application/json',
    'brandid' : brandid,
    'merchantid' : merchantId
}

describe('Testing the staffsAnytime api in the easyshare', () => {

    it('staffsAnytime api for profileId (30854ee8-2329-4208-b199-638d18a0320d) - should fetch details of the staff to be easyshare', (done) => {

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

    it('staffsAnytime api for merchantId is null  - returns the response with status code 400 and msg with "null is not found"', (done) => {

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
            expect(err.response.data.msg).to.be.a('string', 'null is not found');
            done();
        })
    });
});

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

    it('In the app if the merchantid is null and isDeleted is false then the response should be an empty string', (done) => {

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
             
            expect(res.status).to.equal(200);
            expect(res.statusText).to.be.a('string', 'OK');
            expect(res.data).to.be.a('string', '');
            done();
        })
        .catch(err => {
             
            done(err);
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
            expect(res.status).to.equal(200);
            expect(res.statusText).to.be.a('string', 'OK');
            expect(res.data).to.be.a('string', '');
            done();
        })
        .catch(err => {
            done(err);
        })
    });
});

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

describe(`Testing the add and edit meeting api's in the easyshare`, () => {

    it('Anytime Service api - Add a meeting with the post request for the given data and response title should be dummy meeting', (done) => {

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

    it('Setmore Service api - Edit a meeting with the PUT request for the given data and response id should be f86263b6-d988-4513-ae42-10ecc1889c53', (done) => {

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

});