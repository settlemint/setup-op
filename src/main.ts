import core from '@actions/core'
import tc from '@actions/tool-cache'
import os from 'os'

function mapArch(arch: string): string {
  const mappings: Record<string, string> = {
    arm: 'arm64',
    x64: 'amd64'
  }
  return mappings[arch] || arch
}

function getDownloadObject(version: string) {
  core.info(os.arch())
  core.info(mapArch(os.arch()))
  const filename = `op_linux_${mapArch(os.arch())}_v${version}.zip`
  core.info(filename)
  const url = `https://cache.agilebits.com/dist/1P/op2/pkg/v${version}/${filename}`
  core.info(url)
  return url
}

async function setup() {
  try {
    // Get version of tool to be installed
    const version = core.getInput('version')

    // Download the specific version of the tool, e.g. as a tarball/zipball
    const download = getDownloadObject(version)
    core.info(`Downloading ${download}`)
    const pathToTarball = await tc.downloadTool(download)

    // Extract the tarball/zipball onto host runner
    const extract = download.endsWith('.zip') ? tc.extractZip : tc.extractTar
    const pathToCLI = await extract(pathToTarball)

    // Expose the tool by adding it to the PATH
    core.addPath(pathToCLI)

    // Expose the service account to the environment
    core.exportVariable(
      'OP_SERVICE_ACCOUNT_TOKEN',
      core.getInput('service-account-token')
    )
  } catch (e) {
    core.setFailed(e as Error)
  }
}

module.exports = setup

if (require.main === module) {
  setup()
}
