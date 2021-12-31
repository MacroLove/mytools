const { execSync } = require('child_process');
const path = require('path');

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

var ret = execSync('dir /s /b /a:-D ' + args.pop());
ret = ret.toString('utf8');
var files = ret.split('\n');
var sedArgs = args.join(' ');
var sed = 'ssed.exe';

for (var f of files) {
  if (f.trim()) {
    var f2 = f.trim().replace(/\\/g, '/');
    try {
      execSync(sed + ' ' + sedArgs + ' ' + f2);
    } catch (error) {
      // pass
    }
    try {
      execSync('del ' + f + suffix)
    } catch (error) {
      // pass
    }
  }
}



