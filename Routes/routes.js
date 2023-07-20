const {Router} = require('express');
const createPost = require('../controllers/createPost');
const register = require('../controllers/register');
const login = require('../controllers/login');
const getPosts = require('../controllers/getPosts');
const getPostById = require('../controllers/getPostById');
const getUserById = require('../controllers/getUserById');
const getAllUsers = require('../controllers/getAllUsers');
const updatePost = require('../controllers/updatePost');
const updateUser = require('../controllers/updateUser');
const deletePost = require('../controllers/deletePost');
const logOut = require('../controllers/logout');
const verifyToken = require('../validators/verifyToken');
const getPostByBloggerId = require('../controllers/getPostByBloggerId');

const route = Router();



//the post methods

route.post('/api/auth/register', register);
route.post('/api/auth/register', login);
route.post('/api/create_posts', verifyToken, createPost );

//the get methods

route.get('/api/posts', verifyToken, getPosts);
route.get('/api/posts/:id', verifyToken, getPostById);
route.get('/api/users/:id', verifyToken, getUserById);
route.get('/api/users', verifyToken, getAllUsers);
route.get('/api/auth/logout', verifyToken, logOut);
route.get('/post/:bloggerId', verifyToken, getPostByBloggerId);

//the put methods

route.put('/api/post/:id', verifyToken, updatePost );
route.put('/api/user/:id', verifyToken, updateUser );

//the delete methods

route.delete('/api/post/:id', verifyToken, deletePost);

module.exports = route