import { get, post } from "../client/src/utilities";
import chai from 'chai';
import chaiHttp from 'chai-http';
var expect = require('chai').expect;
// Configure chai
chai.use(chaiHttp);
chai.should();
describe('get', function(){
    context('all tiles', function(){
        it('should get all tiles in db', function(){
            get("/api/all_tiles").then((res)=>{
                const tiles = res;
                expect(tiles).to.be.an('array').with.lengthOf(2);
            })
        })
    })
})