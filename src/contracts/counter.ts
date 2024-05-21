import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender } from '@ton/core';

export default class Counter implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell, data: Cell }) {}

    static createForDeploy(code: Cell, initialCounterValue: number): Counter {
        const data = beginCell()
            .storeUint(initialCounterValue, 64)
            .endCell();
        const workchain = 0; // deploy to workchain 0
        const address = contractAddress(workchain, { code, data });
        return new Counter(address, { code, data });
    }

    async sendDeploy(provider: ContractProvider, via: Sender): Promise<void> {
        await provider.internal(via, {
            value: "0.005", // send 0.005 TON to contract for rent
            bounce: false
        });
    }

    async getCounter(provider: ContractProvider): Promise<bigint> {
        const { stack } = await provider.get("counter", []);
        return stack.readBigNumber();
    }

    async sendIncrement(provider: ContractProvider, via: Sender): Promise<void> {
        const messageBody = beginCell()
            .storeUint(1, 32) // op (op #1 = increment)
            .storeUint(0, 64) // query id
            .endCell();
        await provider.internal(via, {
            value: "0.001", // send 0.001 TON for gas
            body: messageBody
        });
    }

    async sendDecrement(provider: ContractProvider, via: Sender): Promise<void> {
        const messageBody = beginCell()
            .storeUint(2, 32) // op (op #2 = decrement)
            .storeUint(0, 64) // query id
            .endCell();
        await provider.internal(via, {
            value: "0.001", // send 0.001 TON for gas
            body: messageBody
        });
    }

    async sendMultiplication(provider: ContractProvider, via: Sender): Promise<void> {
        const messageBody = beginCell()
            .storeUint(3, 32) // op (op #3 = multiplication)
            .storeUint(0, 64) // query id
            .endCell();
        await provider.internal(via, {
            value: "0.001", // send 0.001 TON for gas
            body: messageBody
        });
    }

    async sendDivision(provider: ContractProvider, via: Sender): Promise<void> {
        const messageBody = beginCell()
            .storeUint(4, 32) // op (op #4 = division)
            .storeUint(0, 64) // query id
            .endCell();
        await provider.internal(via, {
            value: "0.001", // send 0.001 TON for gas
            body: messageBody
        });
    }
}
