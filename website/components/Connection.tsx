import Image from "next/image";
import PokeBallTitle from "../public/pokeball_title.png";
import Title from "../public/title.png";
import PikachuGIF from "../public/pikachu_gif.gif";

const Connection = (props: { onClick: () => Promise<void> }) => {
  const { onClick } = props;

  return (
    <main className="w-full h-full flex flex-col justify-start items-center bg-[url('../public/bg_landing.jpg')] bg-cover ">
      <section className="w-full flex justify-center items-center gap-10 pt-10">
        <Image src={PokeBallTitle} alt="PokeBall" width={70} height={70} />
        <Image src={Title} alt="POKEMON RUSH" width={400} height={300} />
        <Image src={PokeBallTitle} alt="PokeBall" width={70} height={70} />
      </section>

      <section className="w-full h-full flex flex-col justify-center items-center gap-10">
        <Image src={PikachuGIF} alt="Pikachu GIF" width={400} height={400} />
        <button
          className="w-2/5 h-1/6 bg-yellow-400 rounded-2xl border-8 border-blue-500 text-center text-3xl font-bold text-blue-500 transition-all duration-300 hover:w-1/2 hover:h-1/5 hover:text-4xl"
          onClick={onClick}
        >
          Connect your Wallet
        </button>
      </section>
    </main>
  );
};

export default Connection;
