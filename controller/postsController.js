const { searchPosts, sortPosts } = require('../services/postsService');
const { getTotalCount } = require('../utils/pagination');

const searchAndSortPosts = async (req, res) => {
  try {
    const { search, sort,page,pageSize } = req.query;
    const posts = await searchPosts(search)
    const sortedPosts =sortPosts(posts, sort);
    const { paginatedData, totalCount } =getTotalCount(sortedPosts, page, pageSize);

    return res.status(200).json({
      data: paginatedData,
      totalCount,
    });
  } catch (error) {
    return res.status(500).json({
     
      message: 'Internal server error',
    });
  }
};

module.exports = {
  searchAndSortPosts,
};
