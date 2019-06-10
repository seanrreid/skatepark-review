// Import the dependencies for testing
const chai = require('chai'),
    expect = chai.expect,
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised).should();

const User = require('../models/users');
const Park = require('../models/parks');

describe('Users model', () => {
    // Given an email address, is this a valid user object?
    it('should be a valid user object', async () => {
        const userInstance = new User(null, null, null, 'sean@digitalcrafts.com', null);
        const theUser = await userInstance.getUserByEmail();
        expect(theUser).to.be.an('object');
    });

    // User id should not be undefined, this will pass
    it('User id should not be undefined', async () => {
        const userInstance = new User(null, null, null, 'sean@digitalcrafts', null);
        const theUser = await userInstance.getUserByEmail();
        expect(theUser.id).to.not.be.an('undefined');
    });
});

describe('Parks model', () => {
    // This will pass...
    it('should be able to retreive a park by id', async () => {
        const thePark = await Park.getById(1);
        thePark.should.be.an.instanceOf(Park);
    });
    // This should fail...
    it('should be able to retreive a park by id', async () => {
        const thePark = await Park.getById(2);
        thePark.should.be.an.instanceOf(Park);
    });
});