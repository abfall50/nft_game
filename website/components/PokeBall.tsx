import Image, { StaticImageData } from "next/image";
import Pokeball from "../public/pokeball.png";
import { Modal } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import MiningModal from "./MiningModal";

const PokeBall = (props: {
  index: number;
  setOpen: Dispatch<SetStateAction<boolean[]>>;
  open: boolean[];
  pokemon: any;
  loading: boolean;
  onClick: (index: number) => void;
}) => {
  const { index, setOpen, open, pokemon, loading, onClick } =
    props;

  const handleOpen = (index: number) => {
    setOpen((prevState) => {
      return prevState.map((item: boolean, i: number) => {
        return i === index ? true : item;
      });
    });
  };

  const handleClose = (index: number) => {
    setOpen((prevState) => {
      return prevState.map((item: boolean, i: number) => {
        return i === index ? false : item;
      });
    });
  };

  return (
    <>
      <button onClick={() => handleOpen(index)}>
        <Image src={Pokeball} alt="PokeBall" width={100} height={100} />
      </button>
      <Modal open={open[index]} onClose={() => handleClose(index)}>
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[450px] rounded-3xl shadow-xl flex flex-col justify-start items-center gap-4 bg-[url('../public/grass_bg.png')] bg-cover ">
          <span className="h-1/6 w-full flex justify-center items-center text-4xl font-bold bg-yellow-500 rounded-t-3xl">
            {pokemon?.name}
          </span>
          <Image
            src={pokemon?.imageURI}
            alt={pokemon?.name}
            width={250}
            height={250}
          />
          <MiningModal onClick={onClick} index={index} loading={loading} />
        </div>
      </Modal>
    </>
  );
};

export default PokeBall;
