const {getDefaultConfig} = require('metro-config');
module.exports = (async () => {
  const {
    resolver: {assetExts},
  } = await getDefaultConfig();

  return {
    resolver: {
      assetExts: [
        ...assetExts,
        'obj',
        'mtl',
        'stl',
        'JPG',
        'vrx',
        'hdr',
        'gltf',
        'glb',
        'bin',
        'arobject',
        'gif',
      ],
    },
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
  };
})();
