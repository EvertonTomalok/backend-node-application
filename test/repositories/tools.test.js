const expect = require('chai').expect;
const Tools = require('../../src/repositories/tools');

describe('# Tools', function() {
    describe('Create', function() {
      it('should return a new tool', function() {
        const userId = 1
        const title = 'Tool'
        const link = 'http://somelink.com' 
        const description = 'A very cool test' 
        const tags = ['testing', 'chai', 'mocha']
    
        Tools.createTool(userId, title, link, description, tags).then(
            (tool) => {
                expect(tool.id).to.equal(1);
                expect(tool.userId).equal(1);
                expect(tool.title).equal(title);
                expect(tool.link).equal(link);
                expect(tool.description).equal(description);
                expect(tool.tags).has.length(3);
            }
        ).catch(() => {return false});
      });

      it('should edit a tool.', function() {
        const userId = 1;
        const toolId = 1;
        const newTitle = 'new Title'
    
        Tools.editTool(userId, toolId, newTitle).then(
            (tool) => {
                expect(tool.data.title).equal(newTitle);
            }
            ).catch(() => {return false});
      });

      it('should find a tool.', function() {
        const userId = 1;
    
        Tools.getTools(userId).then(
            (tool) => {
                expect(tool).has.length.equal(1);
            }
        ).catch(() => {return false});
      });
    });
  });