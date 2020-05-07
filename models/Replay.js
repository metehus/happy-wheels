const { characters } = require('../Constants.json');

const Utils = require('../Utils.js');
const User = require('./User.js');

module.exports = class Replay {
    constructor(data) {      
        if(data.rp) {
            const Level = require('./Level.js');
          
            this.level = new Level(data.lv);
          
            data = data.rp;
        };
            
        this.description = data.uc;
        this.id = data['@_id'];
        this.createdAt = new Date(data['@_dc']);
        this.author = new User(data['@_ui'], data['@_un']);
        this.character = characters[data['@_pc']];
        this.votes = data['@_vs'];
        this.weightedRating = data['@_rg'];
        this.averageRating = Utils.getAverage(data['@_rg'], data['@_vs']);
    };
};