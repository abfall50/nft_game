export const CONTRACT_ADDRESS = "0x79B314311B004bCB79E896D7dbB7B4159E4C9910";

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
