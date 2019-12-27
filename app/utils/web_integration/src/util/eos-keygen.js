const { Keygen } = require('eosjs-keygen');

async function generateKeys() {
  const keys = await Keygen.generateMasterKeys();
  return {
    activeKey: {
      private: keys.privateKeys.active,
      public: keys.publicKeys.active,
    },
    ownerKey: {
      private: keys.privateKeys.owner,
      public: keys.publicKeys.owner,
    },
  };
}

module.exports = {
  generateKeys,
};
