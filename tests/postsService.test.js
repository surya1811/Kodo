const { searchPosts, sortPosts } = require('../services/postsService');
const { extractPhrase, escapeRegExp } = require('../utils/search');
const data = require('../Data/Mock_data.json');
describe('Posts Service', () => {
  const mockData = [
    {
      "name": "Senior Security Agent",
      "image": "http://lorempixel.com/640/480",
      "description": "Ratione perferendis id sint maiores. Omnis aut libero facilis ipsa sed rerum saepe quo. Nesciunt eaque iure.",
      "dateLastEdited": "2017-12-30T20:10:58.661Z"
    },
    {
      "name": "Central Creative Producer",
      "image": "http://lorempixel.com/640/480",
      "description": "Et qui rerum voluptatibus molestias. Eos id incidunt adipisci eum ratione dolores deleniti consectetur rem. Pariatur soluta inventore est facere maiores.",
      "dateLastEdited": "2018-07-17T00:19:24.296Z"
    },
  ];

  test('should return all posts if no search term is provided', () => {
    const result = searchPosts(undefined);
    expect(result).toEqual(data);
  });

  test('should return posts matching the search term', () => {
    const searchTerm = JSON.stringify({ name: "Senior Security Agent" });
    const result = searchPosts(searchTerm);
    const expectedData = mockData.filter(post => post.name === "Senior Security Agent");
    expect(result).toEqual(expectedData);
  });
  

  test('should return empty array if no posts match the search', () => {
    const searchTerm = JSON.stringify({ name: 'Post' });
    const result = searchPosts(searchTerm);
    expect(result).toEqual([]);
  });

  test('should sort posts by name', () => {
    const sorted = sortPosts(mockData, 'name');
    const expected = [
      {
        "name": "Central Creative Producer",
        "image": "http://lorempixel.com/640/480",
        "description": "Et qui rerum voluptatibus molestias. Eos id incidunt adipisci eum ratione dolores deleniti consectetur rem. Pariatur soluta inventore est facere maiores.",
        "dateLastEdited": "2018-07-17T00:19:24.296Z"
      },
      {
        "name": "Senior Security Agent",
        "image": "http://lorempixel.com/640/480",
        "description": "Ratione perferendis id sint maiores. Omnis aut libero facilis ipsa sed rerum saepe quo. Nesciunt eaque iure.",
        "dateLastEdited": "2017-12-30T20:10:58.661Z"
      },
    ];
    expect(sorted).toEqual(expected);
  });

  test('should sort posts by dateLastEdited', () => {
    const sorted = sortPosts(mockData, 'dateLastEdited');
    const expected = [
      {
        "name": "Central Creative Producer",
        "image": "http://lorempixel.com/640/480",
        "description": "Et qui rerum voluptatibus molestias. Eos id incidunt adipisci eum ratione dolores deleniti consectetur rem. Pariatur soluta inventore est facere maiores.",
        "dateLastEdited": "2018-07-17T00:19:24.296Z"
      },
      {
        "name": "Senior Security Agent",
        "image": "http://lorempixel.com/640/480",
        "description": "Ratione perferendis id sint maiores. Omnis aut libero facilis ipsa sed rerum saepe quo. Nesciunt eaque iure.",
        "dateLastEdited": "2017-12-30T20:10:58.661Z"
      },
    ];
    expect(sorted).toEqual(expected);
  });

  test('should sort posts by id if sortField is not provided', () => {
    const sorted = sortPosts(mockData);
    const expected = [
      {
        "name": "Central Creative Producer",
        "image": "http://lorempixel.com/640/480",
        "description": "Et qui rerum voluptatibus molestias. Eos id incidunt adipisci eum ratione dolores deleniti consectetur rem. Pariatur soluta inventore est facere maiores.",
        "dateLastEdited": "2018-07-17T00:19:24.296Z"
      },
      {
        "name": "Senior Security Agent",
        "image": "http://lorempixel.com/640/480",
        "description": "Ratione perferendis id sint maiores. Omnis aut libero facilis ipsa sed rerum saepe quo. Nesciunt eaque iure.",
        "dateLastEdited": "2017-12-30T20:10:58.661Z"
      },
    ];
    expect(sorted).toEqual(expected);
  });

  test('should extract phrase from search string', () => {
    const result = extractPhrase('"Post 2"');
    const expected = /\bPost 2\b/i;
    expect(result).toEqual(expected);
  });

  test('should escape regular expression special characters in search string', () => {
    const result = escapeRegExp('Post 2');
    const expected = 'Post 2';
    expect(result).toEqual(expected);
  });
});

