const Utils = require('../Utils.js');
const Parser = require('../Parser.js');
const Level = require('./Level.js');

module.exports = class User {
    constructor(id, name = '') {
        this.name = name;
        this.id = id;
    };
  
    async fetchProfile() {
        const route = 'profile.tjf?uid=' + this.id;
      
        const html = await Utils.request(route);
        const profile = Parser.getUser(html);
      
        for(const key in profile)
            this[key] = profile[key];
      
        return this;
    };
  
    async getLevels() {
        const Level = require('./Level.js');

        const data = await Utils.request('get_level.hw', {
            action: 'get_pub_by_user',
            sortby: 'newest',
            user_id: this.id,
            uploaded: 'week',
            page: 1,
            type: 'xml'
        });

        const levels = Parser.getLevels(data);
      
        return levels.map((data) => new Level(data));
    };
  
    toString() {
        return `${this.name} (${this.id})`;
    };
};