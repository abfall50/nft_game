export const CONTRACT_ADDRESS = "0xb1E47F708CB1679289Ab6b6c5E0C2BB4FE694f37";

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
