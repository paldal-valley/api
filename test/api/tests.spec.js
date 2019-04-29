import request from 'supertest'
import should from 'should'
import foo from '../../src/app'

describe('Tests api Suite', function() {
  after(function() {
    foo.server.close()
  })

  describe('User Test', function(){
    let getSuccess
    let getFail

    before(function() {
      getSuccess = async(query) => {
        const res = await request(foo.app)
          .get('/tests')
          .expect('Content-Type', /json/)
          .expect(200)

        const { obj } = res.body.should.be.instanceOf(Object)
        obj.should.have.be.an.Array()
      }
    })

    it ('GET /user | 모든 유저 불러오기', async function() {
      await getSuccess()
    })

    it ('POST /user | 유저 저장', async function() {
      await getSuccess()
    })
  })
})
