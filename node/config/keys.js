module.exports = {
    mongodb: {
        dbURI: process.env.DB_URI,
        options: {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true}
    },
    session: {
        cookieKey: process.env.COOKIE_KEY
    }
};
