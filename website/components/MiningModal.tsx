import { Modal } from "@mui/material";
import { useState } from "react";
import Loader from "./Loader";

const MiningModal = (props: {
  onClick: (index: number) => void;
  index: number;
  loading: boolean
}) => {
  const { onClick, index, loading } = props;

  return (
    <>
      <button
        className="w-1/3 h-[13%] bg-yellow-500 rounded-2xl border-4 border-blue-500 transition-all duration-300 hover:bg-yellow-100"
        onClick={() => onClick(index)}
      >
        <span className="text-xl font-semibold">Mint</span>
      </button>
      <Modal open={loading}>
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[200px] h-[75px] bg-yellow-500 border-2 border-blue-500 rounded-3xl shadow-xl flex justify-center items-center gap-4">
			<span className="text-2xl font-semibold">Minting...</span>
			<Loader />
		</div>
      </Modal>
    </>
  );
};

export default MiningModal;
