// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./librairies/Base64.sol";

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";

import "../node_modules/hardhat/console.sol";

contract MyPokemonGame is ERC721 {
    struct PokemonMove {
        string name;
        uint256 power;
    }

    struct PokemonAttributes {
        uint256 pokemonIndex;
        string name;
        string imageURI;
        uint256 hp;
        uint256 maxHp;
        uint256 attack;
        PokemonMove move;
    }

    struct BigBoss {
        string name;
        string imageURI;
        uint256 hp;
        uint256 maxHp;
        uint256 attackDamage;
    }

    BigBoss public bigBoss;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    PokemonAttributes[] defaultPokemons;

    mapping(uint256 => PokemonAttributes) public nftHolderAttributes;
    mapping(address => uint256) public nftHolders;

	event PokemonNFTMinted(address sender, uint256 tokenId, uint256 pokemonIndex);
	event AttackComplete(address sender, uint256 newBossHp, uint256 newPlayerHp);

    uint256 randomNonce = 0;

    constructor(
        string[] memory pokemonNames,
        string[] memory pokemonImageURIs,
        uint256[] memory pokemonHp,
        uint256[] memory pokemonAttacks,
        PokemonMove[] memory pokemonMoves,
        string memory bigBossName,
        string memory bigBossImageURI,
        uint256 bigBossHp,
        uint256 bigBossAttackDamage
    ) ERC721("Pokemon", "POKE") {
        bigBoss = BigBoss({
            name: bigBossName,
            imageURI: bigBossImageURI,
            hp: bigBossHp,
            maxHp: bigBossHp,
            attackDamage: bigBossAttackDamage
        });

        console.log(
            "Done initializing boss %s with %d HP, img %s",
            bigBoss.name,
            bigBoss.hp,
            bigBoss.imageURI
        );

        for (uint256 i; i < pokemonNames.length; i++) {
            defaultPokemons.push(
                PokemonAttributes({
                    pokemonIndex: i,
                    name: pokemonNames[i],
                    imageURI: pokemonImageURIs[i],
                    hp: pokemonHp[i],
                    maxHp: pokemonHp[i],
                    attack: pokemonAttacks[i],
                    move: pokemonMoves[i]
                })
            );

            PokemonAttributes memory c = defaultPokemons[i];
            console.log(
                "Done initializing %s with HP %d, img %s",
                c.name,
                c.hp,
                c.imageURI
            );
        }

        _tokenIds.increment();
    }

    function mintPokemonNFT(uint256 _pokemonIndex) external {
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);

        nftHolderAttributes[newItemId] = PokemonAttributes({
            pokemonIndex: _pokemonIndex,
            name: defaultPokemons[_pokemonIndex].name,
            imageURI: defaultPokemons[_pokemonIndex].imageURI,
            hp: defaultPokemons[_pokemonIndex].hp,
            maxHp: defaultPokemons[_pokemonIndex].maxHp,
            attack: defaultPokemons[_pokemonIndex].attack,
            move: defaultPokemons[_pokemonIndex].move
        });

        console.log(
            "Minted NFT with tokenId %d and pokemonIndex %d",
            newItemId,
            _pokemonIndex
        );

        nftHolders[msg.sender] = newItemId;

        _tokenIds.increment();

		emit PokemonNFTMinted(msg.sender, newItemId, _pokemonIndex);
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        PokemonAttributes memory pokAttributes = nftHolderAttributes[_tokenId];

        string memory strHp = Strings.toString(pokAttributes.hp);
        string memory strMaxHp = Strings.toString(pokAttributes.maxHp);
        string memory strAttack = Strings.toString(pokAttributes.attack);
        string memory strMovePower = Strings.toString(pokAttributes.move.power);

        string memory json = Base64.encode(
            abi.encodePacked(
                '{"name": "',
                pokAttributes.name,
                " -- NFT #: ",
                Strings.toString(_tokenId),
                '", "description": "This is an NFT that lets people play in the game Pokemon Rush!", "image": "',
                pokAttributes.imageURI,
                '", "attributes": [ { "trait_type": "Health Point", "value": ',
                strHp,
                ', "max_value": ',
                strMaxHp,
                '}, { "display_type": "number", "trait_type": "Attack", "value": ',
                strAttack,
                ', "max_value": ',
                strAttack,
                '}, { "display_type": "number", "trait_type": "',
                pokAttributes.move.name,
                '", "value": ',
                strMovePower,
                ', "max_value": ',
                strMovePower,
                "} ] }"
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return output;
    }

    function attackBoss() public {
        uint256 nftTokenIdOfPlayer = nftHolders[msg.sender];
        PokemonAttributes storage player = nftHolderAttributes[
            nftTokenIdOfPlayer
        ];

        uint256 playerAD = player.attack * player.move.power;

        console.log(
            "\nPlayer with pokemon %s about to attack. Has %d HP and %d AD",
            player.name,
            player.hp,
            playerAD
        );
        console.log(
            "Boss %s has %d HP and %d AD",
            bigBoss.name,
            bigBoss.hp,
            bigBoss.attackDamage
        );

        require(player.hp > 0, "Error: pokemon must have hp to attack boss.");
        require(bigBoss.hp > 0, "Error: boss must have hp to attack pokemon.");

        if (randomInt(10) > 0) {
            console.log("%s hit ", player.name, bigBoss.name);
            if (bigBoss.hp < playerAD) {
                bigBoss.hp = 0;
                console.log("%s is dead", bigBoss.name);
            } else {
                bigBoss.hp -= playerAD;
                console.log("%s hp: %d", bigBoss.name, bigBoss.hp);
            }
        } else {
            console.log("%s missed!", player.name);
        }

        if (randomInt(10) >= 3) {
            console.log("%s hit %s", bigBoss.name, player.name);
            if (player.hp < bigBoss.attackDamage) {
                player.hp = 0;
                console.log("%s is dead\n", player.name);
            } else {
                player.hp -= bigBoss.attackDamage;
                console.log("%s hp: %d\n", player.name, player.hp);
            }
        } else {
            console.log("%s missed!\n", bigBoss.name);
        }

		emit AttackComplete(msg.sender, bigBoss.hp, player.hp);
    }

    function randomInt(uint256 _modulus) internal returns (uint256) {
        randomNonce++;
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, randomNonce)
                )
            ) % _modulus;
    }

	function checkIfUserHasNFT() public view returns(PokemonAttributes memory) {

		uint256 userNftTokenId = nftHolders[msg.sender];

		if (userNftTokenId > 0) {
			return nftHolderAttributes[userNftTokenId];
		} else {
			PokemonAttributes memory empty;
			return empty;
		}
	}

	function getAllDefaultPokemons() public view returns(PokemonAttributes[] memory) {
		return defaultPokemons;
	}

	function getBoss() public view returns(BigBoss memory) {
		return bigBoss;
	}
}
