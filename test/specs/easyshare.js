const axios = require('axios');
const chai = require('chai');
const {expect} = chai;

const url = 'https://easyshare-dot-services-dot-staging-schedulingengine.el.r.appspot.com/api/v1/profile/2eb699b3-cbf1-4fdb-b427-5a5ad6baad8b/hours';

const token = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImQxNzJhY2MxMDJjMGRhYWQzNThiZmM5ZDYwZWEyMWJhOWVjY2I2ZWUifQ.eyJpc3MiOiJodHRwczovL2FueXdoZXJlLnN0YWdpbmcuYW55d2hlcmVhdXRoLmNvbSIsImlhdCI6MTYzNjA5NzA1NywicHJval9pZCI6ImFueXdoZXJld29ya3MiLCJ0eXBlIjoidXNlciIsInN1YiI6IjJlYjY5OWIzLWNiZjEtNGZkYi1iNDI3LTVhNWFkNmJhYWQ4YiIsImV4cCI6MTYzNjEwNDI1NywianRpIjoiMGNjZTA0T1g1TkxZQzUzMiJ9.Na2yS_O9C91-kxGIWFfcn296Dyqrj-3whnPafkWaSr4BXYo1IvDcV_fGlc_702JAYtkBGPam6YBM50dxEb19MPl_zyVaZ-grAeuljzODM5zP-isOaNcC4AJyux3FuE-WphYHSTxOofTGj4ayeLQVdTXT16EJOm2GQdal73X8NdkesPblsW_-921X_AluScJy9XKuzZok3It6kRwTwpqvoADafcFBTEmkdDxuo4t1nx1yvN9mfepTNDcU3or4QXS9JV5rh9cDPxDKSQtnl8VouuuVHl8BWweFXn2PfEn28cn_vdjzdGtNfO3KXfGvVg9REt6qVBAudIW-RBxVTRzP3Q`;

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