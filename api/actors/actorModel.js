import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const ActorSchema = new Schema({
    gender: { type: Number },
    adult: { type: Boolean },
    id: { type: Number, required: true },
    biography:{type:String},
    also_known_as:{type:Array},
    birthday:{type:String},
    name:{type:String},
    known_for_department:{type:String},
    profile_path:{type:String},
    imdb_id:{type:String},
    place_of_birth:{type:String}
});

ActorSchema.statics.findByActorDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('Actors', ActorSchema);