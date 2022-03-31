const { execSync } = require('child_process');
const FS = require('fs');

var args = process.argv;
args.shift();
args.shift();


var configFileNomarl = '.git/config';
var configFileEnc = '.git/bconfig';
var gitDirEnc = '.dot-git';

// move .git
if (FS.existsSync(gitDirEnc)) {
  execSync('move .dot-git .git');
}

// dec
try {
  if (FS.existsSync(configFileEnc)) {
    var enc = FS.readFileSync(configFileEnc, {encoding: 'ascii'});
    var dec = Buffer.from(enc, 'base64').toString('ascii');
    FS.writeFileSync(configFileNomarl, dec, {encoding: 'utf8'});
  }
  var ret = execSync('git ' + args.join(' '));
  console.log(ret.toString('utf8'));
} catch (error) {
  if (error.stderr) console.error(error.stderr.toString());
}

// rewrite bconfig
if (FS.existsSync(configFileNomarl)) {
  var dec = FS.readFileSync(configFileNomarl, {encoding: 'utf8'});
  var enc = Buffer.from(dec).toString('base64');
  FS.writeFileSync(configFileEnc, enc, {encoding: 'utf8'});
}

// delete origin
if (FS.existsSync(configFileNomarl)) {
  FS.rmSync(configFileNomarl, {force: true});
}

// move .git
if (FS.existsSync('.git')) {
  execSync('move .git .dot-git');
}


