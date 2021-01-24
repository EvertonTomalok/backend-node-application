const expect = require('chai').expect;
const Password = require('../../src/utils/password');

describe('Password', function() {
  describe('Encrypt', function() {
    it('should return a valid hash', function() {
      Password.encrypt('12345').then(
        hash => {expect(hash).to.equal('$2a$10$UxaTB2a0QsEOT8UTTZ9Jh.bXt7jcOyZPpJQkcCYdlIEZXGJldlHYy');}
      ).catch(err => {return false});
      
    });

    it('should return an invalid hash', function() {
      Password.encrypt('12345').then(
        hash => {expect(hash).to.equal('not valid');}
      ).catch(err => {return false});
      
    });
  });

  describe('Check', function() {
    it('should check true', function() {
      Password.check('12345', '$2a$10$UxaTB2a0QsEOT8UTTZ9Jh.bXt7jcOyZPpJQkcCYdlIEZXGJldlHYy').then(
        hash => {expect(hash).is(true);}
      ).catch(err => {return false});
      
    });

    it('should check false', function() {
      Password.check('12345', 'not valid').then(
        hash => {expect(hash).is(false);}
      ).catch(err => {return false});      
    });
  });
});