const expect = require('chai').expect;
const Users = require('../../src/repositories/users');

describe('# Users', function() {
    describe('Create', function() {
      it('should return a new cliente', function() {
        const email = 'teste@email.com';
        const nome = 'Tester da Silva';
        const hash = '12345';
    
        Users.createUser(email, nome, hash).then(
            user => {expect(user.id).to.equal(1);}
        ).catch(err => {return false});
      });

      it('should find a client.', function() {
        const email = 'teste@email.com';
    
        Users.getUserByEmail(email).then(
            user => {expect(user.id).to.equal(1);}
        ).catch(err => {return false});
      });
    });
  });