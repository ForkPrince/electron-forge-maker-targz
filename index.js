const { MakerBase } = require("@electron-forge/maker-base");
const path = require("path");
const tar = require("tar");

class MakerTarGz extends MakerBase {
  name = "maker-targz";

  isSupportedOnCurrentPlatform() {
    return process.platform === 'linux';
  }

  async make({ dir, makeDir, targetPlatform, targetArch, packageJSON }) {
    const output = path.join(makeDir, `${packageJSON.productName || packageJSON.name}-${targetPlatform}-${targetArch}-${packageJSON.version}.tar.gz`);

    await tar.c(
      {
        file: output,
        cwd: dir,
        gzip: true,
        portable: true,
      },
      ["."]
    );

    return [output];
  }
}

module.exports = MakerTarGz;
