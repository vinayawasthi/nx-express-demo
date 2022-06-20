const MONGO_USERNAME = process.env.MONGO_USERNAME || ""
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ""
const MONGO_URL = "mongodb://localhost:27017/partners"
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5200

const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
}

export default config;