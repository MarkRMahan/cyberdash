require("dotenv").config();

module.exports = {
    url: `mongodb+srv://${process.env.DB_URL_ENCODED_USERNAME}:${process.env.DB_URL_ENCODED_PASS}@cluster0.nbhob.mongodb.net/cyberdash_db?retryWrites=true&w=majority`
};
