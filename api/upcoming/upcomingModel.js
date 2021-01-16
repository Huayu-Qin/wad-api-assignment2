import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const UpcomingMovieSchema = new Schema({
    adult: { type: Boolean },
    id: { type: Number, required: true, unique: true },
    overview: { type: String },
    poster_path: { type: String },
    genre_ids: [{ type: Number }],
    original_title: { type: String },
    backdrop_path: { type: String },
    release_date: { type: String },
    original_language: { type: String },
    title: { type: String },
    vote_average: { type: Number },
    vote_count: { type: Number },
    popularity: { type: Number },
    video: { type: Boolean },
    production_countries: [{
        iso_3166_1: { type: String },
        name: { type: String }
    }],
    runtime: { type: Number },
    spoken_languages: [{
        iso_639_1: { type: String },
        name: { type: String }
    }],
    status: { type: String },
    tagline: { type: String }
});

UpcomingMovieSchema.statics.findByMovieDBId = function (id) {
    return this.findOne({ id: id });
};

export default mongoose.model('Upcoming Movies', UpcomingMovieSchema);