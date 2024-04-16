import "@nomiclabs/hardhat-ethers"
const color = require("cli-color")
var msg = color.xterm(39).bgXterm(128)
import hre, { ethers, network } from "hardhat"

export default async ({ getNamedAccounts, deployments }: any) => {
    const { deploy } = deployments

    function wait(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    const { deployer } = await getNamedAccounts()
    console.log("deployer:", deployer)

    const registry = await deploy("Registry", {
        from: deployer,
        args: [deployer.address],
        log: true
    })

    console.log(
        "registry.receipt.contractAddress:",
        registry.receipt.contractAddress
    )
    console.log("hre.network.name:", hre.network.name)

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
                    address: registry.receipt.contractAddress,
                    constructorArguments: []
                })
                console.log("Etherscan verification done. ✅")
            } catch (error) {
                console.error(error)
            }
            break
        case "op-sepolia":
            try {
                console.log(
                    "Registry contract deployed:",
                    msg(registry.receipt.contractAddress)
                )
                console.log("\nEtherscan verification in progress...")
                console.log(
                    "\nWaiting for 6 block confirmations (you can skip this part)"
                )
                await wait(20 * 1000)

                await hre.run("verify:verify", {
                    network: network.name,
                    address: registry.receipt.contractAddress,
                    constructorArguments: []
                })
                console.log("Etherscan verification done. ✅")
            } catch (error) {
                console.error(error)
            }
            break
    }
    const [signer] = await ethers.getSigners()
    const Registry = await ethers.getContractFactory("Registry")
    const registryInstance = new ethers.Contract(
        // registry.receipt.contractAddress,
        "0x5E91C2EF95965Ab359D3682339229Dbc7eBB9f21",
        Registry.interface,
        signer
    )
    const init = await registryInstance.addEntry(
        0,
        "0x0000000000000000000000000000000000000000",
        0,
        "",
        "0x0000000000000000000000000000000000000000",
        0,
        false,
        false,
        0,
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000",
        "init"
    )
    const receiptInit = await init.wait()
    console.log("\nInitialization done. ✅", msg(receiptInit.hash))
}
export const tags = ["Registry"]
