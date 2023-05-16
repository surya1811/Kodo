const mockData = require('../Data/Mock_data.json');
const { extractPhrase, escapeRegExp } = require('../utils/search');

exports.searchPosts = (searchTerm) => {
  const { name = '', description = '' } = searchTerm ? JSON.parse(searchTerm) : {};
  if (!name && !description) {
    // Return all posts if no search term is provided
    return mockData;
  }
  const exactMatch=extractPhrase(name)
  const filtered = mockData.filter((post) => {
    if (exactMatch) {
      return exactMatch.test(post.name) || exactMatch.test(post.description);
    } else {
      const words = name.split(" ");
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const wordRegExp = new RegExp(`\\b${escapeRegExp(word)}\\b`, 'i');
        if (!wordRegExp.test(post.name) && !wordRegExp.test(post.description)) {
          return false;
        }
      }
      return true;
    }
  });
  return filtered;
};



exports.sortPosts = (posts, sortField) => {
  let sorted = posts;
  if (sortField) {
    sorted = posts.sort((a, b) => {
      if (sortField === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortField === 'dateLastEdited') {
        return new Date(b.dateLastEdited) - new Date(a.dateLastEdited);
      }
    });
  } else {
    sorted = posts.sort((a, b) => a.id - b.id);
  }
  return sorted;
};


