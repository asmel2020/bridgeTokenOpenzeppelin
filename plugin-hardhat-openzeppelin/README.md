# hardhat-openzeppelin-defender

## Task

plugin created with the purpose of efficiently integrating openzeppelin defender modules with hardhat

## Installation

```bash
yarn add --dev hardhat-openzeppelin-defender
```

or

```bash
npm install --save hardhat-openzeppelin-defender
```

Import the plugin in your `hardhat.config.js`:

```js
require("hardhat-openzeppelin-defender");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "hardhat-openzeppelin-defender";
```

## Environment extensions

This plugin extends the Hardhat Runtime Environment by adding an `OpenzeppelinDefender` which contains all the modules of  [openzepelin defender](https://docs.openzeppelin.com/defender/)

```ts
import { OpenzeppelinDefender } from "hardhat";;
```

## Configuration

put the administration credentials of your openzeppelin defender `OpenzeppelinDefenderCredential`

```js
module.exports = {
  OpenzeppelinDefenderCredential: {
    apiKey: API_KEY,
    apiSecret: API_SECRETE,
  }
};
```
