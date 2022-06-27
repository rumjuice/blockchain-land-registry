# Blockchain Land Registry

Land registration system using Hyperledger Fabric

### Contributors:

- Ravshan: [LinkedIn](https://www.linkedin.com/in/rmakhmadaliev/) [GitHub](https://github.com/Ravshann)

- Jainam: [LinkedIn](https://www.linkedin.com/in/jainmshah/) [GitHub](https://github.com/naxer-12)

- Hossein: [LinkedIn](https://www.linkedin.com/in/hossein-hesami-5a565b78/) [GitHub](https://github.com/DarioHesami)

- Ramdhani: [LinkedIn](https://www.linkedin.com/in/ramdhaniharis/) [GitHub](https://github.com/rumjuice)

### This project is part of dApp 1 - Enterprise Blockchain assignment

---

## Project Description

This project is an example project in Hyperledger Fabric for land registry use case. The system tries to imitate processes in real life and real estate transfers are at the core of the system.

## Requirements

The system should have at least 2 types of entities:

1. Real estate property
2. Property owner(government, private companies, individuals)

The system should allow locking mechanism of the real estate property by the government, if necessary. If the property is not locked by the government, then it should be tranferable at any moment to any owner entity.

## Architecture Diagram

![](assets/architecture-diagram.jpg)

## State Machine Diagram

![](assets/state-diagram.jpg)

We named real estate property as 'asset' objects within the system. This diagram shows all possible states of asset.

## Transition Descriptions

Any asset is unregistered initially. The government should register the asset and set asset owner during the registration. Once registered, owner of the asset can transfer it to another owner entity. Sometimes due to tax problems, law suits and different kinds or sanctions/restrictions government can lock the asset. Locked asset is not transferable by the owner. Only the government can unlock the asset and make it transferable again.

## State Data Descriptions

## Role Descriptions

Admin - can register all kinds owners, asset, organization.

Government Worker - can register/lock assets and register owners.

Owner - can transfer assets (that belong to them) to another owner.

## Prerequisites

1. Ubuntu-18.0(8GB RAM and 10+ GB disk storage)
2. Docker
3. Node
4. Yarn

## Step by step setup instructions

1. Install docker if not installed
2. Pull this repository from GitHub
3. Go to apps folder and run to avoid permission related problems:  
   `sudo chmod -R +x fabric-network`
4. Go to apps/fabric-network and run to pull fabric images from docker hub:  
   `./pullFabricImages.sh`
5. Go to apps/fabric-network/test-network and run to build network up:  
   `./network.sh down`  
   `./network.sh up createChannel -ca -s couchdb`

6. From the same location run to deploy the chaincode:  
   `./network.sh deployCC -ccn basic -ccp ../../chaincode/ -ccl javascript`
7. Go to project root folder and run the whole app with:
   `yarn start`  
   _OR_
8. Go to project root folder and run to install all dependencies for frontend and backend:  
   `yarn install`
9. From project root folder run following to start backend application at port 8080:  
   `yarn backend start`
10. From project root folder run following to start backend application at port 3000:  
    `yarn frontend start`  
    TODO some more steps

## Screenshots

![Home Empty](assets/sc-4.png)

![Home](assets/sc-3.png)

![Create Asset Form](assets/sc-2.png)

![Transfer Asset Form](assets/sc-1.png)
