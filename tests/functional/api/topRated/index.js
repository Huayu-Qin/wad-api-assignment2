import chai from "chai";
import request from "supertest";
import api from "../../../../index";

const expect = chai.expect;

let token;
//let api;

const testMovie = {
  id: 311,
  title: "Once Upon a Time in America",
};

describe("Movies endpoint", function () {
  this.timeout(10000);
  before((done) => {
    setTimeout(() => {
      done();
    }, 5000);
  });
  before((done) => {
    //api = require("../../../../index");
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
  describe("GET /movies ", () => {
    // it("should return 20 movies and a status 200", (done) => {
    //   request(api)
    //     .get("/api/movies")
    //     .set("Accept", "application/json")
    //     .set("Authorization", token)
    //     .expect("Content-Type", /json/)
    //     .expect(200)
    //     .end((err, res) => {
    //       expect(res.body).to.be.a("array");
    //       expect(res.body.length).to.equal(20);
    //       done();
    //     });
    // });
    it("should not return 20 movies and get an error massage", () => {
      request(api)
        .get("/api/movies")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect({
          success: false,
          status_code: 34,
          status_message: "The resource could not be found.",
        });
    });

  });

  describe("GET /movies/:id", () => {
    // describe("when the id is valid", () => {
    //   it("should return the matching movie", () => {
    //     return request(api)
    //       .get(`/api/movies/${testMovie.id}`)
    //       .set("Accept", "application/json")
    //       .set("Authorization", token)
    //       .expect(200)
    //       .then((res) => {
    //         expect(res.body).to.have.property("title", testMovie.title);
    //       });
    //   });
    // });
    describe("when the id is invalid", () => {
      it("should return the NOT found message and an empty array", () => {
        return request(api)
          .get(`/api/movies/9999`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .set("Authorization", token)
          .expect({
              message: "Unable to find movie with id: 9999.",
              status: 404
          });
      });
    });
  });
})