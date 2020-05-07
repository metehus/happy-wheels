const { defaults } = require('./Constants.json');

const { Level, Replay, User } = require('./models/');

const Utils = require('./Utils.js');
const Parser = require('./Parser.js');

module.exports = class HappyWheels {
    static async searchLevels(name, options) {
        options = Utils.getOptions(options);
                    
        const xml = await Utils.request('get_level.hw', {
            action: 'search_by_' + options.searchBy,
            sterm: name, ...options
        });
        
        const levels = Parser.getLevels(xml);
      
        return levels.map((data) => new Level(data));
    };
  
    static async getLevel(id) {
        const xml = await Utils.request('get_level.hw', {
            action: 'get_level',
            level_id: id
        });
      
        const data = Parser.getLevels(xml);
      
        return new Level(data);
    };
  
    static async getFeatured(options) {
        options = Utils.getOptions(options);

        const xml = await Utils.request('get_level.hw', {
            action: 'get_all', ...options
        });
      
        const levels = Parser.getLevels(xml);
      
        return levels.map((data) => new Level(data));
    };
  
    static async getReplay(id) {
        const xml = await Utils.request('replay.hw', {
            action: 'get_combined',
            replay_id: id
        });
                  
        const data = Parser.getReplays(xml);
      
        return new Replay(data);
    };
  
    static async getUser(id) {
        const user = new User(id);
      
        return user.fetchProfile();
    };
};
