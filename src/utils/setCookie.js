/**
 * Sets a cookie that does not expire
 * @param {String} cookieName
 * @param {String} cookieValue
 */
const setCookie = (cookieName, cookieValue) => {
  document.cookie = `${cookieName}=${cookieValue}; path=/`;
};

export default setCookie;
