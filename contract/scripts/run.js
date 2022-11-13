const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory(
    "MyPokemonGame"
  );
  const gameContract = await gameContractFactory.deploy(
    ["Bulbasaur", "Charmander", "Squirtle"],
    [
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/7.png",
    ],
	[294, 282, 292],
	[197, 203, 195],
	[
		{ name: "Vine Whip", power: 45 },
		{ name: "Ember", power: 40 },
		{ name: "Water Gun", power: 40 }
	],
	"Mewtwo",
	"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/150.png",
	1000000,
	40
  );
  await gameContract.deployed();

  console.log("Contract deployed to:", gameContract.address);

  let txn;

  txn = await gameContract.mintPokemonNFT(1)
  await txn.wait()

  txv = await gameContract.attackBoss();
  await txn.wait()

  txv = await gameContract.attackBoss();
  await txn.wait()

  txv = await gameContract.attackBoss();
  await txn.wait()

  txv = await gameContract.attackBoss();
  await txn.wait()

  console.log("Done!")

};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
