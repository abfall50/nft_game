const main = async () => {
	const gameContractFactory = await hre.ethers.getContractFactory(
	  "MyPokemonGame"
	);
	
	const gameContract = await gameContractFactory.deploy(
	  ["Bulbasaur", "Charmander", "Squirtle", "Pikachu"],
	  [
		"QmUrtCAojLjhphsQEw9WhVtXvUS9UEZJBhTviAopC8Co56",
		"QmXmQxs7Ad8sptkXpDPTTUWFZ5auSd8jcGoigbFcneTVte",
		"QmSYhv8sQKMLbuLquqjhgdMgd2BHYLEX2uYFtHcXNqDYpN",
		"QmRB1SZjyF6UGBKMmNwYEzzSVyLfN4yRS2LzFDNihLz7fU"
	  ],
	  [294, 282, 292, 200],
	  [197, 203, 195, 300],
	  [
		  { name: "Vine Whip", power: 45 },
		  { name: "Ember", power: 40 },
		  { name: "Water Gun", power: 40 },
		  { name: "Thunder Shock", power: 40 }
	  ],
	  "Mewtwo",
	  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/150.png",
	  1000000,
	  40
	);

	await gameContract.deployed();
	console.log("Contract deployed to:", gameContract.address);
    
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
  