const assert  = require("assert");
const operations = require("../../src/mocha");
const chai = require("chai");
const {expect} = chai;
const axios = require('axios');


const url = `https://jsonplaceholder.typicode.com/posts/1`

describe('Testing the rest api', () => {
    it('should fetch details of the post', (done) => {
         axios.get(url)
            .then(res => {
                expect(res.data.userId).to.equal(1);
                done();
            })
            .catch(err => {
                console.log(err)
                done(err);
            })
        
    });
});

// describe('Mathematical operations', function () {
//     // Hook level timeout
//     // beforeEach(function(done) {
//     //     this.timeout(500);
//     //     setTimeout(done, 3000);
//     // });
//     // this.timeout(1000);

//     var a = 10;
//     var b = 5;

//     it.only('addition of two numbers', () => {
//         // setTimeout(done, 3000)
//         var add = a+b;
        
//         // assert.equal(add,15);
//         expect(add).to.be.equal(15);
//     });

//     it('subtraction of two numbers', () => {
        
//         var sub = a-b;
//         assert.equal(sub, 5);
//     });

//     it.skip('Multiplication of two numbers', () => {
        
//         var mul = a * b;
//         assert.equal(mul, 50);
//     });

//     it('Division of two numbers', () => {
        
//         var div = 10/5;
//         assert.equal(div, 2);
//     });
// });

// describe('Calculator operations', () => {
//     it('correctly calculates the sum of 1 and 3', () => {
//         assert.equal(operations.add(1, 3), 4)
//     });

//     it('correctly calculates the sum of -1 and -1', () => {
//         assert.equal(operations.add(-1, -1), -2)
//     });

//     it('correctly calculates the difference of 33 and 3', () => {
//         assert.equal(operations.subtract(33, 3), 30)
//     });

//     it('correctly calculates the product of 12 and 12', () => {
//         assert.equal(operations.multiply(12, 12), 144)
//     });

//     it('correctly calculates the quotient of 10 and 2', () => {
//         assert.equal(operations.divide(10, 2), 5)
//     });
// });


