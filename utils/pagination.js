const getTotalCount = (data, page = 1, limit = data.length) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedData = data.slice(startIndex, endIndex);
  const totalCount = data.length;

  return { paginatedData, totalCount };
};

module.exports = {
  getTotalCount,
};
