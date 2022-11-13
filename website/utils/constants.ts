export const CONTRACT_ADDRESS = "0xfb045190dd46fa23d35Fc1717739866F054d028a";

declare let window: any;
export const getEthereumObj = () => window.ethereum;

export const transformCharacterData = (characterData: any) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: characterData.hp.toNumber(),
    maxHp: characterData.maxHp.toNumber(),
    attack: characterData.attack.toNumber(),
    move: {
      name: characterData.move.name,
      power: characterData.move.attack?.toNumber(),
    },
  };
};

export const transformBossData = (bossData: any) => {
  return {
    name: bossData.name,
    imageURI: bossData.imageURI,
    hp: bossData.hp.toNumber(),
    maxHp: bossData.maxHp.toNumber(),
    attackDamage: bossData.attackDamage.toNumber(),
  };
};
