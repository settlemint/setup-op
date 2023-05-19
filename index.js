const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const { getDownloadObject } = require('./lib/utils');

async function setup() {
  try {
    // Get version of tool to be installed
    const version = core.getInput('version');

    // Download the specific version of the tool, e.g. as a tarball/zipball
    const download = getDownloadObject(version);
    console.log(download)
    const pathToTarball = await tc.downloadTool(download.url);

    // Extract the tarball/zipball onto host runner
    const extract = download.url.endsWith('.zip') ? tc.extractZip : tc.extractTar;
    const pathToCLI = await extract(pathToTarball);

    // Expose the tool by adding it to the PATH
    core.addPath(pathToCLI);

    // Expose the service account to the environment
    core.exportVariable('OP_SERVICE_ACCOUNT_TOKEN', core.getInput('service-account-token'));
  } catch (e) {
    core.setFailed(e);
  }
}

module.exports = setup

if (require.main === module) {
  setup();
}
