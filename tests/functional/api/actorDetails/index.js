import chai from "chai";
import request from "supertest";
import api from "../../../../index";

const expect = chai.expect;

let token;

const sampleActorDetail = {
  id: 1245,
  name: "Scarlett Johansson",
  birthday: "1984-11-22"
};

describe("ActorDetails endpoint", function () {

    this.timeout(10000);
    before((done) => {
      setTimeout(() => {
        done();
      }, 5000);
    });
    before((done) => {
      request(api)
        .post("/api/users")
        .send({
          "username": "user1",
          "password": "test1"
        })
        .end((err, res) => {
          token = res.body.token;
  
          done();
        });
    });
  
    afterEach(() => {
      api.close(); // Release PORT 8080
      delete require.cache[require.resolve("../../../../index")];
    });
    describe("GET /actorDetails ", () => {
      it("should return 20 popular actorDetails and a status 200", (done) => {
        request(api)
          .get("/api/actorDetails")
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.equal(20);
            done();
          });
      });
    });
  
    describe("GET /actorDetails/:id", () => {
      describe("when the id is valid", () => {
        it("should return the Details of the actor", () => {
          return request(api)
            .get(`/api/actorDetails/${sampleActorDetail.id}`)
            .set("Accept", "application/json")
            .set("Authorization", token)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
              expect(res.body).to.have.property("birthday", sampleActorDetail.birthday);
            });
        });
      });
      describe("when the id is invalid", () => {
        it("should return en array", () => {
          return request(api)
            .get(`/api/actors/9999`)
            .set("Accept", "application/json")
            .set("Authorization", token)
            .expect({});
        });
      });
    });
});