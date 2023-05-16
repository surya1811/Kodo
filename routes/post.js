const express = require('express');
const router = express.Router();
const {searchAndSortPosts  } = require('../controller/postsController');

// Get all posts
router.get('/posts',searchAndSortPosts);

module.exports = router;
