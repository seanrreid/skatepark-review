// Import the dependencies for testing
const chai = require('chai'),
    expect = chai.expect,
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised).should();

const User = require('../models/users');

describe('Users model', () => {
    // happy path 👍🏼
    it('should be able to retreive by id', async () => {
        const userInstance = new User(null, null, null, 'sean@digitalcrafts.com', null);
        const theUser = await userInstance.getOneUser();
        theUser.should.be.an.instanceOf(User);
    });

    // it('should error if no user by id', async () => {
    //     const theUser = await User.getById(324);
    //     expect(theUser).to.be.null;
    // });
});