const { characters } = require('../Constants.json');

const Utils = require('../Utils.js');
const Parser = require('../Parser.js');
const Replay = require('./Replay.js');
const User = require('./User.js');

module.exports = class Level {
    constructor(data) {      
        this.name = data['@_ln'];
        this.description = data.uc;
        this.id = data['@_id'];
        this.createdAt = new Date(data['@_dp']);
        this.author = new User(data['@_ui'], data['@_un']);
        this.character = characters[data['@_pc']];
        this.playCount = data['@_ps'];
        this.votes = data['@_vs'];
        this.weightedRating = data['@_rg'];
        this.averageRating = Utils.getAverage(data['@_rg'], data['@_vs']);
    };
  
    async getReplays(sortBy = 'completion_time') {
        const xml = await Utils.request('replay.hw', {
            action: 'get_all_by_level',
            level_id: this.id,
            sortby: sortBy,
            page: 1
        });
      
        const replays = Parser.getReplays(xml);
      
        return replays.map((data) => new Replay(data));
    };
  
    toString() {
        return `${this.name} (${this.id})`;
    };
};