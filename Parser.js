const { parse: parseXML } = require('fast-xml-parser');
const { parse: parseHTML } = require('node-html-parser');

const options = {
    ignoreAttributes: false
};

module.exports = class Parser {    
    static getLevels(data) {
        data = parseXML(data, options);
      
        if(!data || !data.lvs.lv) return [];
            
        return data.lvs.lv;
    };
  
    static getReplays(data) {
        data = parseXML(data, options);
            
        if(!data) return [];
      
        if(data.combined_data)
            return data.combined_data;
          
        return data.rps.rp || [];
    };
  
    static getUser(data) {
        const document = parseHTML(data);
      
        const header = document.querySelector('.header');
        const items = document.querySelectorAll('tr');  
        
        if(!header) return null;
              
        const clean = ({ text }) => text.replace(/\r|\n| {2,}|:$/g, '');

        const name = header.text.split('\'')[0];
        const result = { name };
            
        for(const item of items) {
            let key = clean(item.childNodes[1]).toLowerCase();
            let value = clean(item.childNodes[3]);
          
            if(key === 'date joined') {
                key = 'createdAt';
              
                value = new Date(value);
            };
          
            result[key] = value;
        };

        return result.createdAt ? result : null;
    };
};
