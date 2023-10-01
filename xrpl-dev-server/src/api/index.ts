import express from 'express';
import user from './routes/user';
import challenge from './routes/challenge';

const api = express.Router();

api.use('/user', user);
api.use('/challenge', challenge);

export default api;