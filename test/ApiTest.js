import chai, {expect, should} from 'chai';
import nock from 'nock';

// Configure chai
chai.should();

describe('writing tiles', function(){
    context('route: get all tiles', function(){
        it('should get all tiles in db', function(){
            let tiles = null;
            nock('http://localhost:5000/api').get('/all_tiles').then(e =>{
                tiles =e;
                expect(tiles).to.be.an('array').of({type:"Tile"});
            })
        })
    })
})