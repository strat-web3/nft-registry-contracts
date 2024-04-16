import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { expect } from "chai"
import { ethers } from "hardhat"

describe("Registry", function () {
    async function deployContracts() {
        const [deployer, admin, creator, acquirer] = await ethers.getSigners()
        const Registry = await ethers.getContractFactory("Registry")
        console.log("deployer", deployer)
        console.log("deployer.address", deployer.address)
        const registry = await Registry.deploy(String(deployer.address))
        await registry.connect(deployer).transferOwnership(admin.address)
        await registry
            .connect(admin)
            .addEntry(
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
                ""
            )
        return { registry, deployer, admin, creator, acquirer }
    }

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { admin, registry } = await loadFixture(deployContracts)
            expect(await registry.owner()).to.equal(admin.address)
        })
        it("Should be initialized", async function () {
            const { admin, registry } = await loadFixture(deployContracts)
            expect((await registry.assets(0)).contractAddress).to.equal(
                "0x0000000000000000000000000000000000000000"
            )
        })
    })

    describe("Interactions", function () {
        it("Should register an asset", async function () {
            const { admin, registry, creator, acquirer } = await loadFixture(
                deployContracts
            )
            await registry
                .connect(admin)
                .addEntry(
                    11155111,
                    "0xCf2678482b7cfA144E88ba75B813f328e78CC273",
                    0,
                    "mediaFileHash",
                    "https://bafkreidrrwa6eckvudnokxsttfayckjvilqpote6xn3fc5beler76py57u.ipfs.w3s.link/",
                    0,
                    false,
                    false,
                    0,
                    "0xd63ed6E274bedb34D9666B8f62ed32a73C43DD9e",
                    "0xd63ed6E274bedb34D9666B8f62ed32a73C43DD9e",
                    "0xd63ed6E274bedb34D9666B8f62ed32a73C43DD9e",
                    "Some info"
                )

            expect((await registry.assets(1)).contractAddress).to.be.equal(
                "0xCf2678482b7cfA144E88ba75B813f328e78CC273"
            )
            await registry
                .connect(admin)
                .addEntry(
                    11155111,
                    "0xCf2678482b7cfA144E88ba75B813f328e78CC273",
                    0,
                    "mediaFileHash",
                    "https://bafkreidrrwa6eckvudnokxsttfayckjvilqpote6xn3fc5beler76py57u.ipfs.w3s.link/",
                    0,
                    false,
                    false,
                    0,
                    "0xd63ed6E274bedb34D9666B8f62ed32a73C43DD9e",
                    "0xd63ed6E274bedb34D9666B8f62ed32a73C43DD9e",
                    "0xd63ed6E274bedb34D9666B8f62ed32a73C43DD9e",
                    "Some info"
                )

            // console.log("length:", await registry.assetsLength())
        })
    })
})
