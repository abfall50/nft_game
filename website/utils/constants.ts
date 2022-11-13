export const CONTRACT_ADDRESS = "0xED2b67Bb6ee8B96D4c1a490E4B0E770e3a8cAd76";

declare let window: any;
export const getEthereumObj = () => window.ethereum;

export const transformCharacterData = (characterData: any) => {
    return {
        name: characterData.name,
        imageURI: characterData.imageURI,
        hp: characterData.hp.toNumber(),
        maxHp: characterData.maxHp.toNumber(),
        attack: characterData.attack.toNumber(),
		move: characterData.move
    };
};