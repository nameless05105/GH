export const {
    PORT = 5000,
    NODE_ENV = 'development',
    MONGO_URI = 'mongodb://mongopi/react-auth',
    SESS_NAME = 'sid',
    SESS_SECRET = 'secret!session',
    SESS_LIFETIME = 1000 * 60 * 60 * 2
} = process.env;