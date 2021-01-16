import chai from "chai";
import request from "supertest";
import api from "../../../../index";

const expect = chai.expect;

let token;

const sampleMovie = {
  id: 729648,
  title: "The Dalton Gang",
};

let movieId
const movie = {
  backdrop_path: "/5Iw7zQTHVRBOYpA0V6z0yypOPZh.jpg",
  genres: [
      {
          id: 14,
          name: "Fantasy"
      },
      {
          id: 12,
          name: "Adventure"
      },
      {
          id: 878,
          name: "Science Fiction"
      },
      {
          id: 28,
          name: "Action"
      }
  ], id: 181808,
  original_language: "en",
  original_title: "Star Wars: The Last Jedi",
  overview:
      "Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.",
  popularity: 44.208,
  poster_path: "/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
  release_date: "2017-12-13",
  tagline: "Darkness rises... and light to meet it",
  title: "Star Wars: The Last Jedi",
  video: false,
  vote_average: 7,
  vote_count: 9692
};


describe("Movies endpoint", function () {

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
  });

  describe("GET /movies/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching movie", () => {
        return request(api)
          .get(`/api/movies/${sampleMovie.id}`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("title", sampleMovie.title);
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return en array", () => {
        return request(api)
          .get(`/api/movies/9999`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect({
            
        });
      });
    });
  });
//   describe("POST /movies ", () => {
//     it("should return a 201 status and the newly added movie", () => {
//         return request(api)
//             .post("/api/movies")
//             .send(movie)
//             .expect(201)
//             .then((res) => {
//                 expect(res.body.title).equals(movie.title);
//                 movieId = res.body.id;
//             });
//     });
//     after(() => {
//         return request(api)
//             .get(`/api/movies/${movieId}`)
//             .expect(200)
//             .then((res) => {
//                 expect(res.body).to.have.property("title", movie.title);
//             });
//     });
// });
// describe("PUT /api/movies/:id ", () => {
//     it("should return a 200 status and a copy of the updated movie", () => {
//         return request(api)
//             .put(`/api/movies/${currentMovieId}`)
//             .send(movie)
//             .expect(200)
//             .then((res) => {
//                 expect(res.body.title).equals(movie.title);
//                 movieId = res.body.id;
//             });
//     });
//     it("should return a 404 status and 'Unable to find Movie' message", () => {
//         return request(api)
//             .put(`/api/movies/:id`)
//             .send(movie)
//             .expect(404)
//             .then((res) => {
//                 expect({
//                     message: "Unable to find Movie",
//                 });
//                 movieId = res.body.id;
//             });
//     });
// });
// describe("Delete /movies/:id", () => {
//     describe("when the id is valid", () => {
//         it("should return a 200 status and confirmation message", () => {
//             return request(api)
//                 .delete(`/api/movies/${sampleMovie.id}`)
//                 .set("Accept", "application/json")
//                 .expect("Content-Type", /json/)
//                 .expect(200)
//                 .expect({
//                     message: `Deleted movie id: ${sampleMovie.id}.`,
//                     status: 200,
//                 });
//         });
//         after(() => {
//             return request(api)
//                 .get(`/api/movies/${sampleMovie.id}`)
//                 .expect(404)
//                 .expect({
//                     message: `Unable to find movie with id: ${sampleMovie.id}.`,
//                     status: 404,
//                 });
//         });
//     });
//     describe("when the id is invalid", () => {
//         it("should return a 404 status and 'Unable to find Movie with id' message", () => {
//             return request(api)
//                 .delete(`/api/movies/${movie.id}`)
//                 .set("Accept", "application/json")
//                 .expect("Content-Type", /json/)
//                 .expect(404)
//                 .expect({
//                     message: `Unable to find movie with id: ${movie.id}.`,
//                     status: 404
//                 });
//         });
//     });
// });
});
