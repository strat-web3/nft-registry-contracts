import "@nomiclabs/hardhat-ethers"
const color = require("cli-color")
var msg = color.xterm(39).bgXterm(128)
import hre, { ethers, network } from "hardhat"

export default async ({ getNamedAccounts, deployments }: any) => {
    const { deploy } = deployments

    const { deployer } = await getNamedAccounts()
    console.log("deployer:", deployer)

    // const registry = await deploy("Registry", {
    //     from: deployer,
    //     args: [],
    //     log: true
    // })

    // console.log(
    //     "registry.receipt.contractAddress:",
    //     registry.receipt.contractAddress
    // )
    // console.log("hre.network.name:", hre.network.name)

    // await registry.deployTransaction.wait(5)

    switch (hre.network.name) {
        case "arthera-testnet":
            // console.log(
            //     "Basic ERC-20 token contract deployed:",
            //     msg(registry.receipt.contractAddress)
            // )

            try {
                // Please use `pnpm sourcify:arthera` after the deployment instead.

                // console.log("\nEtherscan verification in progress...")
                // console.log(
                //     "\nWaiting for 6 block confirmations (you can skip this part)"
                // )
                // await basic.deploymentTransaction()?.wait(6)
                // await hre.run("verify:verify", {
                //     network: network.name,
                //     address: basic.receipt.contractAddress,
                //     constructorArguments: [initialMint]
                // })

                console.log(
                    "Please use `pnpm sourcify:arthera` to verify your contract."
                )
            } catch (error) {
                console.error(error)
            }

            break
        case "sepolia":
            try {
                // console.log(
                //     "Basic ERC-20 token contract deployed:",
                //     msg(registry.receipt.contractAddress)
                // )
                console.log("\nEtherscan verification in progress...")
                console.log(
                    "\nWaiting for 6 block confirmations (you can skip this part)"
                )
                // await basic.deploymentTransaction()?.wait(6)
                await hre.run("verify:verify", {
                    network: network.name,
                    address: "0x32a6e4cD44f38D15860E4c24d40a1004E9dCb436",
                    constructorArguments: []
                })
                console.log("Etherscan verification done. ✅")
            } catch (error) {
                console.error(error)
            }
            break

        case "op-sepolia":
            try {
                // console.log(
                //     "Basic ERC-20 token contract deployed:",
                //     msg(registry.receipt.contractAddress)
                // )
                console.log("\nEtherscan verification in progress...")
                console.log(
                    "\nWaiting for 6 block confirmations (you can skip this part)"
                )
                // await basic.deploymentTransaction()?.wait(6)
                // await hre.run("verify:verify", {
                //     network: network.name,
                //     address: registry.receipt.contractAddress,
                //     constructorArguments: []
                // })
                console.log("Etherscan verification done. ✅")
            } catch (error) {
                console.error(error)
            }
            break
    }
    const [signer] = await ethers.getSigners()
    const Registry = await ethers.getContractFactory("Registry")
    // const registryInstance = new ethers.Contract(
    //     registry.receipt.contractAddress,
    //     Registry.interface,
    //     signer
    // )
    // const init = await registryInstance.addEntry(
    //     0,
    //     "0x0000000000000000000000000000000000000000",
    //     0,
    //     "",
    //     "0x0000000000000000000000000000000000000000",
    //     0,
    //     false,
    //     false,
    //     0,
    //     "0x0000000000000000000000000000000000000000",
    //     "0x0000000000000000000000000000000000000000",
    //     "0x0000000000000000000000000000000000000000",
    //     ""
    // )
    // const receiptInit = await init.wait()
    // console.log("\nInitialization done. ✅", msg(receiptInit.hash))
}
export const tags = ["Registry"]
