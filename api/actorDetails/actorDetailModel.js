import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const ActorDetailSchema = new Schema({
  birthday: { type: String },
  id: { type: Number, required: true, unique: true },
  known_for_department: { type: String },
  deathday: { type: String },
  name: { type: String },
  also_known_as: [{ type: String }],
  gender: { type: Number },
  biography: { type: String },
  popularity: { type: Number },
  place_of_birth: { type: String },
  profile_path: { type: String },
  adult: { type: Boolean },
  imdb_id: { type: String },
  homepage: { type: String }
});

ActorDetailSchema.statics.findByActorDetailDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('ActorDetails', ActorDetailSchema);