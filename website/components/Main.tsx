import Image from "next/image";
import PokeBallTitle from "../public/pokeball_title.png";
import Title from "../public/title.png";
import { useState } from "react";
import PokeBall from "./PokeBall";

const Main = (props: {
  pokemons: any;
  mintPokemonNFTAction: (pokemonId: number) => Promise<void>;
  minting: boolean
}) => {
  const { pokemons, mintPokemonNFTAction, minting } = props;

  const [open, setOpen] = useState([false, false, false]);

  const onClick = (index: number) => {
    mintPokemonNFTAction(index)
  } 

  return (
    <main className="w-full h-full flex flex-col justify-start items-center bg-[url('../public/bg_landing.jpg')] bg-cover ">
      <section className="w-full flex justify-center items-center gap-10 pt-10">
        <Image src={PokeBallTitle} alt="PokeBall" width={70} height={70} />
        <Image src={Title} alt="POKEMON RUSH" width={400} height={300} />
        <Image src={PokeBallTitle} alt="PokeBall" width={70} height={70} />
      </section>

      <section className="w-2/5 flex flex-col justify-center items-center gap-4 pt-20">
        <p className="text-black font-normal text-3xl text-center">
          Welcome to Pokemon Rush!
        </p>
        <p className="text-black font-normal text-2xl text-center">
          Mint your NFT Pokemon and be ready to challenge Mewtwo with the world!
        </p>
        <p className="text-black font-normal text-xl text-center italic">
          Be careful! You can only own one NFT Pokemon!
        </p>
      </section>

      <section className="w-full pt-20">
        <p className="text-black font-normal text-3xl text-center">
          Select your NFT Pokemon:
        </p>

        <div className="w-full flex justify-center items-center gap-36 pt-16">
          <PokeBall
            index={0}
            setOpen={setOpen}
            open={open}
            pokemon={pokemons[0]}
            loading={minting}
            onClick={onClick}
          />
          <PokeBall
            index={1}
            setOpen={setOpen}
            open={open}
            pokemon={pokemons[1]}
            loading={minting}
            onClick={onClick}
          />
          <PokeBall
            index={2}
            setOpen={setOpen}
            open={open}
            pokemon={pokemons[2]}
            loading={minting}
            onClick={onClick}
          />
        </div>
      </section>
    </main>
  );
};

export default Main;
