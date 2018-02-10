import _ from 'lodash';

export const log = (isDev)
  ? console
    .log
    .bind(window.console)
  : (() => '');

/** parse json, if fail then return defaultValue
 * @param {string} string
 * @param {any} defaultValue
 * @returns {object} json
 */
export const jsonParse = (string, defaultValue = {}) => {
  let json = _.attempt(JSON.parse, string);
  if (_.isError(json)) {
    log('JSON parse fail');
    json = defaultValue;
  }
  return json;
}