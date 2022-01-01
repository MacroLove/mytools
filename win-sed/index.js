const { execSync } = require('child_process');

var args = process.argv;
args.shift();
args.shift();
console.log(args);

var suffix = '';
for (const a of args) {
  if (a.indexOf('-i') == 0) {
    suffix = a.replace('-i', '');
  }
}
if (!suffix) {
  suffix = 'bkp';
}

try {
  
var ret = execSync('dir /s /b /a:-D ' + args.pop());
ret = ret.toString('utf8');
var files = ret.split('\n');
var sedArgs = args.join(' ');
var sed = 'ssed.exe';

for (var f of files) {
  if (f.trim()) {
    var f2 = f.trim().replace(/\\/g, '/');
    try {
      execSync('chcp 65001; ' + sed + ' ' + sedArgs + ' ' + f2);
    } catch (error) {
      // pass
    }
    try {
      execSync('chcp 65001; del ' + f + suffix)
    } catch (error) {
      // pass
    }
  }
}


} catch (error) {
  if (error.stderr) console.error(error.stderr.toString('utf-8'));
  console.error('Command failed!');
}

