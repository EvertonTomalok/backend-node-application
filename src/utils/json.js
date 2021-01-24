const { compareSync } = require('bcryptjs');
const fs = require('fs');


const jsonReader = (file_path) => {
    try {

        const data = fs.readFileSync(file_path, 'utf8');    
        return JSON.parse(data);
    
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
        return {};
    };
}

module.exports = jsonReader;