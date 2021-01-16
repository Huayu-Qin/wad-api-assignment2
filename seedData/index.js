import userModel from '../api/users/userModel';
import movieModel from '../api/movies/movieModel';
import actorModel from '../api/actors/actorModel';
import actorDetailModel from '../api/actorDetails/actorDetailModel';
import { movies } from './movies.js';
import { getActor, getActors } from '../api/tmdb-api';

const users = [
  {
    'username': 'user1',
    'password': 'test1',
  },
  {
    'username': 'user2',
    'password': 'test2',
  },
];

// deletes all user documents in collection and inserts test data
export async function loadUsers() {
  console.log('load user Data');
  try {
    await userModel.deleteMany();
    await users.forEach(user => userModel.create(user));
    console.info(`${users.length} users were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load user Data: ${err}`);
  }
}

// deletes all movies documents in collection and inserts test data
export async function loadMovies() {
  console.log('load seed data');
  console.log(movies.length);
  try {
    await movieModel.deleteMany();
    await movieModel.collection.insertMany(movies);
    console.info(`${movies.length} Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}

export async function loadActors() {
  console.log('load actors data');
  try {
    getActors().then(async res => {
      await actorModel.deleteMany();
      await actorDetailModel.deleteMany();
      await actorModel.collection.insertMany(res);
      console.info(`${res.length} Actors were successfully stored.`);
      res.map(async (actor) => {
        await getActor(actor.id).then(async (res) => {
          await actorDetailModel.collection.insertOne(res, (err) => { if (err) console.log(err); })
        })
      })
    })
  } catch (err) {
    console.err(`failed to load actors data: ${err}`);
  }
}

