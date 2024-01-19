import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { expect } from "chai"
import { ethers } from "hardhat"

describe("Registry", function () {
    async function deployContracts() {
        const [deployer, admin, creator, acquirer] = await ethers.getSigners()
        const Registry = await ethers.getContractFactory("Registry")
        const registry = await Registry.deploy()
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
                    "3519fe5ad2c596efe3e276a6f351b8fc0b03db861782490d45f7598ebd0ab5fd5520ed102f38c4a5ec834e98668035fc",
                    "https://bafkreidrrwa6eckvudnokxsttfayckjvilqpote6xn3fc5beler76py57u.ipfs.w3s.link/",
                    0,
                    false,
                    false,
                    0,
                    creator.address,
                    admin.address,
                    acquirer.address,
                    "info"
                )

            expect((await registry.assets(1)).contractAddress).to.be.equal(
                "0xCf2678482b7cfA144E88ba75B813f328e78CC273"
            )
        })
    })
})
