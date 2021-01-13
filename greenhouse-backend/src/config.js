export const {
    PORT = 5000,
    NODE_ENV = 'production',
    MONGO_URI = 'mongodb://localhost/data',
    // MONGO_URI = 'mongodb://SuperNora9:tYf74-Gnet5_yhx@95.181.230.220:38128/react-auth?authSource=admin',
    SESS_NAME = 'sid',
    SESS_SECRET = 'secret!session',
    SESS_LIFETIME = 1000 * 60 * 60 * 2
} = process.env;