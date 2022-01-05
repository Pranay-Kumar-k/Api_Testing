const axios = require('axios');
const chai = require('chai');
const {expect} = chai;

const url = 'https://easyshare-dot-services-dot-staging-schedulingengine.el.r.appspot.com/api/v1/profile/2eb699b3-cbf1-4fdb-b427-5a5ad6baad8b/hours';

const headers = {
    'authority' : 'easyshare-dot-services-dot-staging-schedulingengine.el.r.appspot.com',
    'authorization' : token,
    'content-type' : 'application/json',
    'brandid' : '0dab9518-34d4-4725-a847-ca7ff65168a2',
    'merchantid' : '2eb699b3-cbf1-4fdb-b427-5a5ad6baad8b'
}

describe('Testing the staff api in the easyshare module', async() => {
    it('should fetch details of the staff to be Syed Yaseen', async() => {
        const result = await axios({
            method: 'GET',
            url: url,
            headers: headers
        })
        .then(res => {
            expect(res.data.data.items[0].profile.fullname).to.be.equal('Syed Yaseen');
        })
        .catch(err => {
            console.log(err);
        })
    });
});