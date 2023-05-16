function extractPhrase(str) {
 const match = str.match(/^"(.*)"$/);
 return match ? new RegExp(`\\b${escapeRegExp(match[1])}\\b`, 'i') : null;
 }


function escapeRegExp(str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').replace(/"/g, '\\"');
}


module.exports = {
  extractPhrase,
  escapeRegExp,
};
