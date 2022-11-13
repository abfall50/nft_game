import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import Arena from "../components/Arena";
import Connection from "../components/Connection";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Main from "../components/Main";
import {
  CONTRACT_ADDRESS,
  getEthereumObj,
  transformCharacterData,
} from "../utils/constants";
import myPokemonGame from "../utils/MyPokemonGame.json";

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [pokemonNFT, setPokemonNFT] = useState<any>(null);

  const [pokemons, setPokemons] = useState([]);
  const [gameContract, setGameContract] = useState<Contract>();

  const [minting, setMinting] = useState(false);
  const [loading, setLoading] = useState(true);

  const mintPokemonNFTAction = async (pokemonId: number) => {
    try {
      setMinting(true);
      if (gameContract) {
        console.log("Minting pokemon in progress...");

        const mintTxn = await gameContract.mintPokemonNFT(pokemonId);
        await mintTxn.wait();

        console.log("mintTxn:", mintTxn);
        setMinting(false);
      }
    } catch (error) {
      console.log("MintPokemonAction Error:", error);
      setMinting(false);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const ethereum = getEthereumObj();

      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      } else {
        console.log("We have the ethereum object: ", ethereum);

        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length !== 0) {
          const account = accounts[0];
          setCurrentAccount(account);
          console.log("Found an authorized account:", account);
        } else {
          console.log("No authorized account found");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWalletAction = async () => {
    try {
      const ethereum = getEthereumObj();

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected to", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();

    const getPokemonNFT = async (gameContract: Contract) => {
      const pokemonNFT = await gameContract.checkIfUserHasNFT();
      console.log("PokemonNFT: ", pokemonNFT);
      setPokemonNFT(transformCharacterData(pokemonNFT));
    };
    try {
      const ethereum = getEthereumObj();

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const gameContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myPokemonGame.abi,
          signer
        );

        setGameContract(gameContract);
        getPokemonNFT(gameContract);
      } else {
        console.log("Ethereum object not found!");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    const interval = setInterval(() => {
      setLoading(false)
    }, 2000)

    return () => clearInterval(interval)
  }, []);

  useEffect(() => {
    const getPokemons = async () => {
      try {
        console.log("Getting contract pokemons to mint");

        let pokemonsTxn = await gameContract?.getAllDefaultPokemons();
        console.log("pokemonsTxn:", pokemonsTxn);

        const pokemons = pokemonsTxn.map((pokemonData: any) =>
          transformCharacterData(pokemonData)
        );

        setPokemons(pokemons);
      } catch (error) {
        console.log("Something went wrong fetching characters:", error);
      }
    };

    const onPokemonMint = async (
      sender: string,
      tokenId: number,
      pokemonIndex: number
    ) => {
      console.log(
        `PokemonNFTMinted - sender: ${sender} tokenId: ${tokenId} pokemonIndex: ${pokemonIndex}`
      );

      if (gameContract) {
        const pokemonNFT = await gameContract.checkIfUserHasNFT();
        console.log("PokemonNFT: ", pokemonNFT);
        setPokemonNFT(transformCharacterData(pokemonNFT));
      }
    };

    if (gameContract) {
      getPokemons();

      gameContract.on("PokemonNFTMinted", onPokemonMint);
    }

    return () => {
      if (gameContract) {
        gameContract.off("PokemonNFTMinted", onPokemonMint);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameContract]);

  return (
    <div className="w-screen h-screen">
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <>
          {currentAccount ? (
            <>
              {pokemonNFT?.name ? (
                <Arena pokemon={pokemonNFT} />
              ) : (
                <Main
                  pokemons={pokemons}
                  mintPokemonNFTAction={mintPokemonNFTAction}
                  minting={minting}
                />
              )}
            </>
          ) : (
            <Connection onClick={connectWalletAction} />
          )}
        </>
      )}
    </div>
  );
}
