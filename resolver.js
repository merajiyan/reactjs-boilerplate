const { resolve } = require('path');

/**
 * Resolve to a file or directory from project's root
 * @param {string} [path=''] path to a file or directory from project's root
 */
function resolveProject(path = '') {
  return resolve(__dirname, '../..', path);
}

module.exports = resolveProject;
