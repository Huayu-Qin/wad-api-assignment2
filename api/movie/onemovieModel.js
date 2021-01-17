import mongoose from 'mongoose';


const Schema = mongoose.Schema;


const OnemovieSchema = new Schema({
  original_title: {type: String},
  poster_path: {type: String},
  overview: {type: String},
  runtime: {type: Number},
  release_date: {type: String},
  genres: {type:Array},
  spoken_languages: {type:Object},
  production_companies: {type:Array},
  production_countries: {type:Object},

});
OnemovieSchema.statics.findByMovieDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('movie details', OnemovieSchema);