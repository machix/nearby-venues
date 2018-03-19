const react = require("react");

/*
 * Resolution for requestAnimationFrame not supported in jest error :
 * https://github.com/facebook/react/issues/9102#issuecomment-283873039
 */
global.window = global;
window.addEventListener = () => {};
window.requestAnimationFrame = () => {
    throw new Error("requestAnimationFrame is not supported in Node");
};
window.navigator = {}
window.navigator.geolocation = {
    getCurrentPosition: jest.fn((success) => success({
        coords: {
            latitude: 13.7563,
            longitude: 100.5018
        }
    }))
}

window.fetch = jest.fn(() => ({
    then: () => Promise.resolve('resolved'),
    catch: () => Promise.reject('resolved')
}))
window.alert = jest.fn();
module.exports = react;
