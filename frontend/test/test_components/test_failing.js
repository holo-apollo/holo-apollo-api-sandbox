import {expect} from 'chai';


describe('Failing test', function() {
    it('should fail', function() {
        expect(false).to.equal(true);
    });

    it('should fail 2', function() {
        expect(2 + 2).to.equal(5);
    });
});
