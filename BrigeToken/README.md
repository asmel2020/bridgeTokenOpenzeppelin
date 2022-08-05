# Brigde token

sistema construido sobre la infraestructura de oppenzepelin defender para facilitar la interoperabilidad de tokens entre cadenas basadas en la maquina virtual de ethereum y con ayuda del plugin de [hardhat para defender](https://github.com/asmel2020/hardhat-openzeppelin-defender) el sistema se despliega de forma automatica en sistema defender

# Instalacion

`$ npm install`

#variables de entorno

introduzca las siguiente variables de entrono para que el sistema corra de forma correcta

		BSC_TESTNET_RPC_URL=
		AVALANCHE_TESTNET_RPC_URL=
		DEPLOYER_PRIVATE_KEY_TESTNET=
		 //Wallet de la private key o su wallet EOA
		WALLET=
		//Openzeppelin Defender Credential
		API_KEY=
		API_SECRET=

## despliege el sistema

para desplegar el sistema ejecute el comando 

`$ yarn deploy:allSystem`