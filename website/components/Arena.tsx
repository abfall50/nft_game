import { LinearProgress, Modal } from "@mui/material";
import { Contract } from "ethers";
import Image from "next/image";
import { Dispatch, useEffect, useState } from "react";
import { transformBossData } from "../utils/constants";
import Loader from "./Loader";

const Arena = (props: {
  pokemon: any;
  setPokemon: Dispatch<any>;
  gameContract: Contract | undefined;
  currentAccount: any;
  boss: any;
  setBoss: Dispatch<any>;
}) => {
  const { pokemon, setPokemon, gameContract, currentAccount, boss, setBoss } = props;

  const [attackState, setAttackState] = useState(false);

  const [open, setOpen] = useState(false);

  const runAttackAction = async () => {
    try {
      if (gameContract) {
        setAttackState(true);
        console.log("Attcking boss...");
        const attackTxn = await gameContract.attackBoss({ gasLimit: 300000 });
        await attackTxn.wait();
        console.log("attackTxn: ", attackTxn);
        setOpen(true);
        setAttackState(false);
		console.log("Done!")
      }
    } catch (error) {
      console.log(error);
      setAttackState(false);
    }
  };

  useEffect(() => {

    const onAttackComplete = async (
      sender: string,
      newBossHp: any,
      newPlayerHp: any
    ) => {
		const bossHp = newBossHp.toNumber()
		const playerHp = newPlayerHp.toNumber()
		const from = sender.toString()

      console.log(
        `AttackComplete - sender: ${from} Boss Hp: ${bossHp} Player Hp: ${playerHp}`
      );

      if (currentAccount === sender.toLowerCase()) {
		  console.log("Current")
        setBoss((prevState: any) => {
          return { ...prevState, hp: bossHp };
        });
        setPokemon((prevState: any) => {
          return { ...prevState, hp: playerHp };
        });
      } else {
        setBoss((prevState: any) => {
          return { ...prevState, hp: bossHp };
        });
      }
    };

    if (gameContract) {
	  gameContract.on("AttackComplete", onAttackComplete)
    }

	return () => {
		if (gameContract) {
			gameContract.off("AttackComplete", onAttackComplete)
		}
	}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameContract]);

  return (
    <main className="w-full h-full grid grid-cols-4 grid-rows-2 bg-[url('../public/battle_bg.png')] bg-cover ">
      <div className="w-full h-full"></div>
      <div className="w-full h-full"></div>
      <div className="w-full h-full flex flex-col justify-end items-center">
        <Image src={boss?.imageURI} alt="Pokemon" width={300} height={300} />
      </div>
      <div className="w-full h-full flex flex-col justify-start items-center">
        <div className="w-[95%] h-1/3 pt-5 flex flex-col justify-start gap-2">
          <div className="flex justify-end items center">
            <span className="font-bold text-2xl">{boss?.name}</span>
          </div>
          <LinearProgress
            variant="determinate"
            value={(boss?.hp * 100) / boss?.maxHp}
            color={
              (boss?.hp * 100) / boss?.maxHp > 70
                ? "success"
                : (boss?.hp * 100) / boss?.maxHp > 30
                ? "warning"
                : "error"
            }
            sx={{ height: 15, borderRadius: "1rem" }}
          />
          <div className="flex justify-between items-center">
            <span className="font-bold text-xl">
              {Math.round(((boss?.hp * 100) / boss?.maxHp))}%
            </span>
            <span className="font-bold text-xl">
              {boss?.hp}/{boss?.maxHp}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-end items-center">
        <div className="w-[95%] h-1/3 flex flex-col justify-end pb-5 gap-2">
          <div className="flex justify-between items-center">
            <span className="text-end font-bold text-xl">
              {Math.round((pokemon.hp * 100) / pokemon.maxHp)}%
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
        <Image src={pokemon.imageURI} alt="Pokemon" width={250} height={250} />
      </div>
      <div className="w-full h-full"></div>
      <div className="w-full h-full flex flex-col justify-end items-center pb-28 pr-10">
        <button
          className="w-[95%] h-[13%] bg-gradient-to-r from-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0.4)] hover:from-[rgba(255,255,255,0.8)] hover:to-[rgba(255,255,255,0.4)] shadow-xl text-white hover:text-black transition-colors duration-500 text-xl font-bold flex justify-center items-center -skew-x-[30deg]"
		  onClick={runAttackAction}
		  disabled={attackState ? true : false}
        >
          {attackState ? (
            <div className="flex justify-center items-center gap-4">
              <span>Attacking</span>
              <Loader />
            </div>
          ) : (
            pokemon.move.name
          )}
        </button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[450px] rounded-3xl shadow-xl border-0 bg-gray-500 flex flex-col justify-center items-center">
          <span className="w-full h-1/3 text-3xl font-bold flex justify-center items-center underline">
            Details:
          </span>
          <span className="w-full h-1/4 text-2xl font-bold flex justify-center items-center text-red-500">
            {boss?.name} current hp: {boss?.hp}
          </span>
          <span className="w-full h-1/4 text-2xl font-bold flex justify-center items-cente text-green-500">
            {pokemon.name} current hp: {pokemon.hp}
          </span>
        </div>
      </Modal>
    </main>
  );
};

export default Arena;
