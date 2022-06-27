## Directory descriptions

This a mono-repo project structured using `yarn workspace`. The `node_modules` is shared across all apps to improve performance. There are 4 folders in this directory, each for specific part of the system: frontend, backend, chaincode, test-network.

1. Frontend is written in React.js, Typescript, and Tailwind.
2. Backend is written in Node.js and Express.js, uses some dependencies related to Hyperledger Fabric.
3. Chaincode is an analog of smart-contract in Hyperledger Fabric, without chaincode, the network is useless. We wrote chaincode in the language we are most comfortable, JavaScript.
4. Test-network folder contains fabric network setup. This folder is also the core of the system, without network our backend and frontend does not work.
