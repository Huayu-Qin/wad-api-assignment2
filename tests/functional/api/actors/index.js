import chai from "chai";
import request from "supertest";
import api from "../../../../index";

const expect = chai.expect;

let token;

const sampleActor = {
  id: 1245,
  name: "Scarlett Johansson",
};

describe("Actors endpoint", function () {

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
    describe("GET /actors ", () => {
      it("should return 20 popular actors and a status 200", (done) => {
        request(api)
          .get("/api/actors")
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
  
    describe("GET /actors/:id", () => {
      describe("when the id is valid", () => {
        it("should return the matching actor", () => {
          return request(api)
            .get(`/api/actors/${sampleActor.id}`)
            .set("Accept", "application/json")
            .set("Authorization", token)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
              expect(res.body).to.have.property("name", sampleActor.name);
            });
        });
      });
      describe("when the id is invalid", () => {
        it("should return en array", () => {
          return request(api)
            .get(`/api/actors/9999`)
            .set("Accept", "application/json")
            .set("Authorization", token)
            .expect({
              
          });
        });
      });
    });
});
