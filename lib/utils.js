const os = require('os');

// arch in [arm, x32, x64...] (https://nodejs.org/api/os.html#os_os_arch)
// return value in [amd64, 386, arm]
function mapArch(arch) {
  const mappings = {
    arm: 'arm64',
    x64: 'amd64'
  };
  return mappings[arch] || arch;
}

// os in [darwin, linux, win32...] (https://nodejs.org/api/os.html#os_os_platform)
// return value in [darwin, linux, windows]
function mapOS(os) {
  if(os !== 'linux'){
    throw new Error(`Unsupported OS: ${os}`);
  }
  return os;
}

function getDownloadObject(version) {
  const platform = os.platform();
  const filename = `op_${ mapOS(platform) }_${ mapArch(os.arch()) }_v${ version }.zip`;
  return `https://cache.agilebits.com/dist/1P/op2/pkg/v${ version }/${ filename }`;
}

module.exports = { getDownloadObject }
