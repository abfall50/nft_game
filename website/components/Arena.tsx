import { LinearProgress } from "@mui/material";
import Image from "next/image";


const Arena = (props: { pokemon: any }) => {
  const { pokemon } = props;

  return (
    <main className="w-full h-full grid grid-cols-4 grid-rows-2 bg-[url('../public/battle_bg.png')] bg-cover ">
      <div className="w-full h-full"></div>
      <div className="w-full h-full"></div>
      <div className="w-full h-full flex flex-col justify-end items-center">
        <Image src={pokemon.imageURI} alt="Pokemon" width={200} height={200} />
      </div>
      <div className="w-full h-full flex flex-col justify-start items-center">
        <div className="w-[95%] h-1/3 pt-5 flex flex-col justify-start gap-2">
          <div className="flex justify-end items center">
            <span className="font-bold text-2xl">{pokemon.name}</span>
          </div>
          <LinearProgress
            variant="determinate"
            value={(pokemon.hp * 100) / pokemon.maxHp}
            color={
              (pokemon.hp * 100) / pokemon.maxHp > 70
                ? "success"
                : (pokemon.hp * 100) / pokemon.maxHp > 30
                ? "warning"
                : "error"
            }
            sx={{ height: 15, borderRadius: "1rem" }}
          />
          <div className="flex justify-between items-center">
            <span className="font-bold text-xl">
              {(pokemon.hp * 100) / pokemon.maxHp}%
            </span>
            <span className="font-bold text-xl">
              {pokemon.hp}/{pokemon.maxHp}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-end items-center">
        <div className="w-[95%] h-1/3 flex flex-col justify-end pb-5 gap-2">
          <div className="flex justify-between items-center">
            <span className="text-end font-bold text-xl">
              {(pokemon.hp * 100) / pokemon.maxHp}%
            </span>
            <span className="text-end font-bold text-xl">
              {pokemon.hp}/{pokemon.maxHp}
            </span>
          </div>
          <LinearProgress
            variant="determinate"
            value={(pokemon.hp * 100) / pokemon.maxHp}
            color={
              (pokemon.hp * 100) / pokemon.maxHp > 70
                ? "success"
                : (pokemon.hp * 100) / pokemon.maxHp > 30
                ? "warning"
                : "error"
            }
            sx={{ height: 15, borderRadius: "1rem" }}
          />
          <div className="flex justify-start items center">
            <span className="font-bold text-2xl">{pokemon.name}</span>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-start items-center">
        <Image src={pokemon.imageURI} alt="Pokemon" width={200} height={200} />
      </div>
      <div className="w-full h-full"></div>
      <div className="w-full h-full flex flex-col justify-end items-center pb-28 pr-10">
        <button
          className={
            "w-[95%] h-[13%] bg-gradient-to-r from-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0.4)] hover:from-[rgba(255,255,255,0.8)] hover:to-[rgba(255,255,255,0.4)] shadow-xl text-white hover:text-black transition-all duration-300 text-xl font-bold flex justify-center items-center -skew-x-[30deg]"
          }
        >
          {pokemon.move.name}
        </button>
      </div>
    </main>
  );
};

export default Arena;
