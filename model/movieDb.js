const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://userone:userone@ictakfiles.by4qw.mongodb.net/MOVIE?retryWrites=true&w=majority");
const Schema = mongoose.Schema;
var movieSchema = new Schema({
    m_name : String,
    m_actor : String,
    m_actress : String,
    m_dir : String,
    m_year : Number,
    m_camera : String,
    m_pro : String,
    m_lan: String
});

var MovieInfo = mongoose.model("movies",movieSchema);
module.exports = MovieInfo;