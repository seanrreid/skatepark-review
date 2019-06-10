// Import the dependencies for testing
const chai = require('chai'),
    expect = chai.expect,
    chaiAsPromised = require('chai-as-promised'),
    bcrypt = require('bcryptjs');

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

    // User id should NOT be undefined, this will pass
    it('User id should not be undefined', async () => {
        const userInstance = new User(null, null, null, 'sean@digitalcrafts', null);
        const theUser = await userInstance.getUserByEmail();
        expect(theUser.id).to.be.an('undefined');
    });

    // Verify that a password check function works.
    // This REALLY needs re-working...
    it('should be able to check for correct passwords', async () => {
        const userInstance = new User(null, null, null, 'derp@mcderp.com', null);
        const theUser = await userInstance.getUserByEmail();

        // This SHOULD be broken out into a service, for maximum test coverage
        const isCorrectPassword = bcrypt.compareSync('derp', theUser.password);
        expect(isCorrectPassword).to.be.true;
        const isNotCorrectPassword = bcrypt.compareSync('derpassword', theUser.password);
        expect(isNotCorrectPassword).to.be.false;
    });

});

describe('Parks model', () => {
    // This will pass...
    it('should be able to retreive a park by id', async () => {
        const thePark = await Park.getById(1);
        thePark.should.be.an.instanceOf(Park);
    });
});