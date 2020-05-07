const { baseURL, defaults } = require('./Constants.json');

const fetch = require('node-fetch');

module.exports = class Utils {
    static async request(route, options) {      
        const params = new URLSearchParams(options);

        const request = await fetch(baseURL + route, {
            method: 'post',
            body: params
        });

        return request.text();
    };
  
    static getAverage(rating, votes) {
        const a = 10;

        let c = 0;

        if(votes > 0)
            c = (rating - 2.5 * a / (votes + a)) / (votes / (votes + a));

        return Math.round(Math.min(5, Math.max(c, 0)), 2);
    };
  
    static getOptions(options = {}) {
        const result = typeof options === 'string' ?
            { ...defaults, sortby: options } :
            { ...defaults, ...options };
      
        if(options.sortBy) result.sortby = options.sortBy;
      
        return result;
    };
};