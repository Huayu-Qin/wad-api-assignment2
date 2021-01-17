import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import User from "../../../../api/users/userModel";
import api from "../../../../index";

const expect = chai.expect;

let db;
//let api;
let token;
let specfiedUser;
let movieId = 635780

const users = [
  {
    username: "user1",
    password: "test1",
  },
  {
    username: "user2",
    password: "test2",
  },
];

describe("Users endpoint /Users are registered ", () => {
  before((done) => {
    mongoose.connect(process.env.mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
    // api.request("../../../../index")
    request(api)
      .post("/api/users")
      .send({
        "username": "user1",
        "password": "test1"
      })
      .end((err, res) => {
        token = res.body.token;
        // console.log(token)
        done();
      });
  });

  after(async () => {
    try {
      await db.dropDatabase();
    } catch (error) {
      console.log(error);
    }
  });
  beforeEach(async () => {
    try {
      //api = require("../../../../index");
      await User.deleteMany({});
      await User.collection.insertMany(users);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close();
    delete require.cache[require.resolve("../../../../index")];
  });
  describe("GET /users ", () => {
    it("should return the users correctly and a status 200", (done) => {
      request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(2);
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1", "user2"]);
          done();
        });
    });
  });

  // describe("PUT / ", () => {
  //   it("should show the updated user and  a 201 status ", () => {
  //     let username = "newName"
  //     return request(api)
  //       .put(`/api/users/${specfiedUser._id}`)
  //       .send({
  //         username
  //       })
  //       .expect(201)
  //       .then((res) => {
  //         request(api)
  //           .get("/api/users")
  //           .then((res) => {
  //             expect(res).to.have.members(["user1", "user2", username]);
  //           })
  //       })
  //   });
  // })

  describe("POST /users ", () => {

    it("should show the confirmation message and the 201 status", () => {
      return request(api)
        .post("/api/users?action=register")
        .send({
          username: "user4",
          password: "test4",
        })
        .expect(201)
        .expect({ code: 201, msg: 'Created new user Successfully.' });
    });
    after(() => {
      return request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body.length).to.equal(3);
          let result = res.body.map((user) => user.username);
          expect(res.body).to.be.a("array");
          expect(result).to.have.members(["user1", "user2", "user4"]);

          specfiedUser = res.body[0]
        });
    });
  });



  describe("POST  /user/favourites ", () => {
    it("should return a messgae and 201 status", () => {
      return request(api)
        .post(`/api/users/user1/favourites`)
        .send({
          id: movieId
        })
        .expect(201)
        .then((res) => {
          expect(res.body.favourites.length).to.be.above(0)
        })
    });
  })

  describe("GET /users/username/favourites ", () => {
    it("should return the  favourites movies and a status 201", () => {
      request(api)
        .get(`/api/users/user1/favourites`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(0);
        });
    });
  })
  describe("POST /users/username/favourites ", () => {
    it("should the vaild movie id and a status 201", () => {
      request(api)
        .post(`/api/users/user1/favourites`)
        .send({
          id: "635302"
        })
        .expect(201);
    });

    it("should return wrong movie id and a status 401 ", () => {
      request(api)
        .post(`/api/users/user1/favourites`)
        .send({
          id: "123456",
        });
      request(api)
        .post(`/api/users/user1/favourites`)
        .send({
          id: "123456",
        })
        .expect(401);
    });
  })
  describe("GET /users/username/favourites ", () => {
    it("should return the  favourites movies and a status 201", () => {
      request(api)
        .get(`/api/users/user1/favourites`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(0);
        });
    });
  })
  describe("POST /users/username/favourites ", () => {
    it("should the vaild movie id and a status 201", () => {
      request(api)
        .post(`/api/users/user1/favourites`)
        .send({
          id: "635302"
        })
        .expect(201);
    });

    it("should return wrong movie id and a status 401 ", () => {
      request(api)
        .post(`/api/users/user1/favourites`)
        .send({
          id: "123456",
        });
      request(api)
        .post(`/api/users/user1/favourites`)
        .send({
          id: "123456",
        })
        .expect(401);
    });
  })
  describe("POST /users/username/watchlists ", () => {
    it("should the vaild movie id and a status 201", () => {
      request(api)
        .post(`/api/users/user1/watchlists`)
        .send({
          id: "635302"
        })
        .expect(201);
    });

    it("should return wrong movie id and a status 401 ", () => {
      request(api)
        .post(`/api/users/user1/watchlists`)
        .send({
          id: "123456",
        });
      request(api)
        .post(`/api/users/user1/watchlists`)
        .send({
          id: "123456",
        })
        .expect(401);
    });
  })

});


describe("Users endpoint /Users are not registered", () => {
  before(() => {
    mongoose.connect(process.env.mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
  });

  beforeEach(async () => {
    try {
      // api = require("../../../../index");
      await User.deleteMany({});
      await User.collection.insertMany(users);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  // afterEach(() => {
  //   api.close();
  //   delete require.cache[require.resolve("../../../../index")];
  // });

  describe("POST /users ", () => {
    it("should show the wrong message for wrong password and a 401 status", () => {
      request(api)
        .post("/api/users?action=register")
        .send({
          username: "qhyqhy",
          password: "123456",
        })
        .expect(200)
        .end((err, res) => {
          console.log(res.body.msg);
          expect(res.body.msg).to.equal("Please enter correct format password.");
        });
    });

  });

})
//   describe("Users endpoint /Watchlist", () => {
//     before(() => {
//       mongoose.connect(process.env.mongoDB, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
//       db = mongoose.connection;
//     });

//     beforeEach(async () => {
//       try {
//         // api = require("../../../../index");
//         await User.deleteMany({});
//         await User.collection.insertMany(users);
//       } catch (err) {
//         console.error(`failed to Load user Data: ${err}`);
//       }
//     });
//     describe("GET /users/username/watchlists ", () => {
//       it("should return the  favourites movies and a status 201", () => {
//         request(api)

//           .get(`/api/users/user1/watchlists`)
//           .set("Accept", "application/json")
//           .expect("Content-Type", /json/)
//           .expect(201)
//           .end((err, res) => {
//             expect(res.body).to.be.a("array");
//             expect(res.body.length).to.equal(0);
//           });
//       });
//     })
//     describe("POST /users/username/watchlists ", () => {
//       it("should the vaild movie id and a status 201", () => {
//         request(api)
//           .post(`/api/users/user1/watchlists`)
//           .send({
//             id: "635302"
//           })
//           .expect(201);
//       });

//       it("should return wrong movie id and a status 401 ", () => {
//         request(api)
//           .post(`/api/users/user1/watchlists`)
//           .send({
//             id: "123456",
//           });
//         request(api)
//           .post(`/api/users/user1/watchlists`)
//           .send({
//             id: "123456",
//           })
//           .expect(401);
//       });
//     })
//   });
// });
