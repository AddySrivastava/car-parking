const fs = require('fs');
const path = require('path');

exports.saveFile = (data, filePath) => {
    fs.writeFileSync(filePath, JSON.stringify(data));
}