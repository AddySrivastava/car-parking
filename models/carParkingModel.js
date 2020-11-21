const fs = require('fs');
const path = require('path');

exports.saveFile = (data, filePath) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data));
    } catch (err) {
        console.error(err);
        throw err;
    }
}