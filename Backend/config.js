const config = {
    local: {
        DB: {
            HOST: "localhost",
            PORT: "27017",
            DATABASE: "pratikshaladke",
            MONGOOSE: {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            },
            username: "pratikshaladke",
            password: "pratikshaladke45"
        },
        PORTNO: 8085,
    },

    staging: {
        DB: {
            HOST: "172.10.1.3",
            PORT: "27017",
            DATABASE: "pratikshaladke",
            MONGOOSE: {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            },
            username: "pratikshaladke",
            password: "pratikshaladke45"
        },
        Email: {
            host: "smtp.gmail.com",
            port: 465,
            username: "pratikshaladke56@gmail.com",
            password: "keddsrwusdefrnvg"
        },
        PORTNO: 2775,
    }
}

export const get = function get(env) {
    return config[env];
}