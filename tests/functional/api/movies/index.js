import chai from "chai";
import request from "supertest";
import api from "../../../../index";

const expect = chai.expect;

let token;
//let api;

const testMovie = {
  id: 729648,
  title: "The Dalton Gang",
};

// let movieId
// const movie = {
//   backdrop_path: "/5Iw7zQTHVRBOYpA0V6z0yypOPZh.jpg",
//   genres: [
//       {
//           id: 14,
//           name: "Fantasy"
//       },
//       {
//           id: 12,
//           name: "Adventure"
//       },
//       {
//           id: 878,
//           name: "Science Fiction"
//       },
//       {
//           id: 28,
//           name: "Action"
//       }
//   ], id: 181808,
//   original_language: "en",
//   original_title: "Star Wars: The Last Jedi",
//   overview:
//       "Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.",
//   popularity: 44.208,
//   poster_path: "/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
//   release_date: "2017-12-13",
//   tagline: "Darkness rises... and light to meet it",
//   title: "Star Wars: The Last Jedi",
//   video: false,
//   vote_average: 7,
//   vote_count: 9692
// };


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
    it("should return 20 movies and a status 200", (done) => {
      request(api)
        .get("/api/movies")
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
    describe("when the id is valid", () => {
      it("should return the matching movie", () => {
        return request(api)
          .get(`/api/movies/${testMovie.id}`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("title", testMovie.title);
          });
      });
    });
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

  describe("POST /movies", () => {
    it("should return the new movie added with a random id and the status 201", () => {
      return request(api)
        .post("/api/movies")
        .set("Accept", "application/json")
        .set("Authorization", token)
        .send({
          title: "Fatman"
        })
        .then((res) => {
          expect(res.body).to.have.property("title", "Fatman");
          expect(res.body).to.have.property("id")
          expect(201)
        });
    });
  });

  describe("DELETE /movies/:id", () => {
    it("should remove movie and the status 200", () => {
      request(api)

        .delete(`/api/movies/${testMovie.id}`)
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect(200)

    });
    after(() => {
      request(api)
        .get("/api/movies")
        .set("Accept", "application/json")
        .set("Authorization", "BEARER" + token)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(19);

        });
    });

    describe("GET /movies/:id/reviews", () => {
      describe("when the id is valid", () => {
        it("should return the matching movie reviews", () => {
          return request(api)
            .get(`/api/movies/${testMovie.id}/reviews`)
            .set("Accept", "application/json")
            .set("Authorization", token)
            .expect("Content-Type", /json/)
            .expect(201)
        });
      });
    });

  });
});
