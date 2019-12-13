const path = require('path');
const util = require('util');
const fs = require('fs');
const program = require('commander');

const _readdir = util.promisify(fs.readdir);
const _readFile = util.promisify(fs.readFile);
const _writeFile = util.promisify(fs.writeFile);

const base = '../img/check';
const outFile = '../constants/recipeImg.ts';

let arrData = {};

const transformBmpToBase64 = async function(base, out) {
  _readdir(base)
    .then(files => {
      files.forEach(fileName => {
        let localBase = path.join(base, fileName);
        let stat = fs.statSync(localBase);

        if (stat.isDirectory()) {
          transformBmpToBase64(localBase, out);
        } else {
          _readFile(localBase).then(file => {
            let buffer = Buffer.from(file);
            arrData[fileName] = buffer.toString('base64');

            _writeFile(out, `const BASE64_IMAGES = ${JSON.stringify(arrData)}`);
          });
        }
      });
    })
    .catch(err => {
      console.error(err.message);
    });
};

program
  .version('1.0.0')
  .option('-i, --in [folder]', 'In dir')
  .option('-o, --out [folder]', 'Out dir')
  .parse(process.argv);

transformBmpToBase64(program.in || base, program.out || outFile).then(() => {
  console.log('File is write');
});
