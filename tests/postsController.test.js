const { searchAndSortPosts } = require('../controller/postsController');
const { searchPosts, sortPosts } = require('../services/postsService');
const utils = require('../utils/pagination');

jest.mock('../services/postsService'); // Mock the postsService module
jest.mock('../utils/pagination');
describe('Posts Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { query: { search: { name: "Post 1" } } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return paginated and sorted posts data with 200 status code', async () => {
    const mockFilteredPosts = [{ id: 1, name: 'Post 1' }, { id: 2, name: 'Post 2' }];
    const mockSortedPosts = [{ id: 2, name: 'Post 2' }, { id: 1, name: 'Post 1' }];

    searchPosts.mockResolvedValue(mockFilteredPosts);
    sortPosts.mockReturnValue(mockSortedPosts);
   utils.getTotalCount.mockReturnValue({
      paginatedData: mockSortedPosts,
      totalCount: mockSortedPosts.length,
    });

    req.query.search = {
      name: 'Post 1',
      description: '',
    };
    req.query.sort = 'name'; 
    req.query.page = 1;
    req.query.limit = 10;
    await searchAndSortPosts(req, res);

    expect(searchPosts).toHaveBeenCalledTimes(1);
    expect(searchPosts).toHaveBeenCalledWith({
      name: 'Post 1',
      description: '',
    });

    expect(sortPosts).toHaveBeenCalledWith(mockFilteredPosts, 'name');
    expect(utils.getTotalCount).toHaveBeenCalledWith(mockSortedPosts, 1,undefined);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: mockSortedPosts,
      totalCount: mockSortedPosts.length,
    });
  });

  test('should handle errors and return 500 status code', async () => {
    const error = new Error('Internal server error');
    searchPosts.mockRejectedValue(error);

    await searchAndSortPosts(req, res);

    expect(searchPosts).toHaveBeenCalledWith({
      name: 'Post 1',
    });

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});
