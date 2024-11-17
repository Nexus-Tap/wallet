import Web3 from 'web3';
import { Networks, NetworkType } from './chains';
import { HaloWallet } from './HaloWallet';
import { ethers } from 'ethers';

// Types and Interfaces
interface AttestationResponse {
    status: string;
    attestation?: string;
}

interface TransactionConfig {
    nonce: string;
    gasPrice: string;
    gasLimit: string;
    to: string;
    value: string;
    data: string;
    // chainId: number;
}

// Contract ABIs
const TOKEN_MESSENGER_ABI = [
    {
        "inputs": [
            { "type": "uint256", "name": "amount" },
            { "type": "uint32", "name": "destinationDomain" },
            { "type": "bytes32", "name": "recipient" },
            { "type": "address", "name": "token" }
        ],
        "name": "depositForBurn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const USDC_ABI = [
    {
        "inputs": [
            { "type": "address", "name": "spender" },
            { "type": "uint256", "name": "amount" }
        ],
        "name": "approve",
        "outputs": [{ "type": "bool" }],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const MESSAGE_TRANSMITTER_ABI = [
    {
        "inputs": [
            { "type": "bytes", "name": "message" },
            { "type": "bytes", "name": "attestation" }
        ],
        "name": "receiveMessage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

interface TransactionConfig {
    nonce: string;
    to: string;
    value: string;
    data: string;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
    gasLimit: string;
    type: '0x2';  // EIP-1559 transaction type
}

export async function createRawTransaction(
    web3: Web3,
    fromAddress: string,
    toAddress: string,
    data: string,
    chainId: number,
    gasLimit: number
): Promise<TransactionConfig> {
    // Get latest block to calculate fees
    const block = await web3.eth.getBlock('latest');
    const baseFeePerGas = BigInt(block.baseFeePerGas || 0);

    // Calculate maxPriorityFeePerGas (tip)
    // Set to 2 gwei
    const maxPriorityFeePerGas = BigInt(web3.utils.toWei('2', 'gwei'));

    // Calculate maxFeePerGas
    // Formula: (baseFeePerGas * 2) + maxPriorityFeePerGas
    const maxFeePerGas = (baseFeePerGas * BigInt(2)) + maxPriorityFeePerGas;

    // Estimate gas limit if not provided
    let estimatedGasLimit = gasLimit;
    try {
        const estimatedGas = await web3.eth.estimateGas({
            from: fromAddress,
            to: toAddress,
            data,
            value: '0x0'
        });
        // Add 20% buffer to estimated gas
        estimatedGasLimit = Math.ceil(Number(estimatedGas) * 1.2);
    } catch (error) {
        console.warn('Gas estimation failed, using provided gas limit:', gasLimit);
    }

    // Log fee information for debugging
    console.log('Gas Fee Parameters:', {
        baseFeePerGas: web3.utils.fromWei(baseFeePerGas.toString(), 'gwei') + ' gwei',
        maxPriorityFeePerGas: web3.utils.fromWei(maxPriorityFeePerGas.toString(), 'gwei') + ' gwei',
        maxFeePerGas: web3.utils.fromWei(maxFeePerGas.toString(), 'gwei') + ' gwei',
        estimatedGasLimit
    });

    return {
        to: toAddress,
        value: '0x0',
        data: data,
        maxFeePerGas: web3.utils.toHex(maxFeePerGas),
        maxPriorityFeePerGas: web3.utils.toHex(maxPriorityFeePerGas),
        gasLimit: web3.utils.toHex(estimatedGasLimit),
    };

}


// Core Bridge Functions
export async function approveUSDC(
    halo: HaloWallet,
    sourceNetwork: NetworkType,
    walletAddress: string,
    amount: string
): Promise<string> {
    const web3 = sourceNetwork.web3;
    const usdcContract = new web3.eth.Contract(
        USDC_ABI,
        sourceNetwork.usdcContract
    );

    const approveData = usdcContract.methods.approve(
        sourceNetwork.tokenMessengerContract,
        amount
    ).encodeABI();

    const rawTx = await createRawTransaction(
        web3,
        walletAddress,
        sourceNetwork.usdcContract,
        approveData,
        sourceNetwork.network.chainId,
        200000
    );

    let tx = await halo?.sendTransaction(rawTx)
    return tx.hash!;
}

export async function burnUSDC(
    halo: HaloWallet,
    sourceNetwork: NetworkType,
    destinationNetwork: NetworkType,
    walletAddress: string,
    amount: number
): Promise<{
    transactionHash: string,
    messageBytes: any,
    messageHash: string
}> {
    const web3 = sourceNetwork.web3;
    const tokenMessengerContract = new web3.eth.Contract(
        TOKEN_MESSENGER_ABI,
        sourceNetwork.tokenMessengerContract
    );

    const destinationAddressInBytes32 = web3.eth.abi.encodeParameters(
        ['address'],
        [walletAddress]
    );

    const burnData = tokenMessengerContract.methods.depositForBurn(
        amount,
        destinationNetwork.domain,
        destinationAddressInBytes32,
        sourceNetwork.usdcContract
    ).encodeABI();

    const rawTx = await createRawTransaction(
        web3,
        walletAddress,
        sourceNetwork.tokenMessengerContract,
        burnData,
        sourceNetwork.network.chainId,
        300000
    );

    let tx = await halo?.sendTransaction(rawTx)

    const receipt = await web3.eth.getTransactionReceipt(tx.hash)

    // Get message bytes from logs
    const eventTopic = ethers.keccak256(
        ethers.toUtf8Bytes("MessageSent(bytes)")
    );

    const log = receipt.logs.find(
        (l: any) => l.topics[0] === eventTopic
    );

    const messageBytes = new ethers.AbiCoder().decode(
        ["bytes"],
        log?.data!
    )[0];

    const messageHash = ethers.keccak256(messageBytes);

    // const messageBytes = web3.eth.abi.decodeParameters(['bytes'], logs[0].toString())[0];
    // const messageHash = web3.utils.keccak256(messageBytes);

    return {
        transactionHash: tx.hash,
        messageBytes: messageBytes,
        messageHash: messageHash
    };
}

export async function waitForAttestation(messageHash: string): Promise<string> {
    let attestationResponse: AttestationResponse = { status: "pending" };

    while (attestationResponse.status !== "complete") {
        const response = await fetch(
            `https://iris-api-sandbox.circle.com/attestations/${messageHash}`
        );
        attestationResponse = await response.json();
        console.log("Attestation Status:", attestationResponse.status || "sent");
        await new Promise((r) => setTimeout(r, 2000));
    }

    return attestationResponse.attestation!;
}

export async function mintUSDC(
    halo: HaloWallet,
    destinationNetwork: NetworkType,
    walletAddress: string,
    messageBytes: string,
    attestationSignature: string
): Promise<string> {
    const web3 = destinationNetwork.web3;
    const messageTransmitterContract = new web3.eth.Contract(
        MESSAGE_TRANSMITTER_ABI,
        destinationNetwork.messageTransmitterContract
    );

    const receiveData = messageTransmitterContract.methods.receiveMessage(
        messageBytes,
        attestationSignature
    ).encodeABI();

    const rawTx = await createRawTransaction(
        web3,
        walletAddress,
        destinationNetwork.messageTransmitterContract,
        receiveData,
        destinationNetwork.network.chainId,
        300000
    );

    let tx = await halo?.sendTransaction(rawTx)

    return tx.hash;
}

// Example usage
export async function bridgeUSDC(
    halo: HaloWallet,
    sourceChain: string,
    destinationChain: string,
    walletAddress: string,
    amountToTransfer: string
) {
    const sourceNetwork = Networks[sourceChain];
    const destinationNetwork = Networks[destinationChain];
    const amount = ethers.parseUnits(amountToTransfer, 6); // USDC has 6 decimals


    console.log(sourceChain, destinationChain,amount, "chain")

    try {


        console.log(`Starting USDC bridge from ${sourceNetwork.name} to ${destinationNetwork.name}, chain: {}`);

        // Step 1: Approve
        console.log("Approving USDC transfer...");
        const approveTxHash = await approveUSDC(halo, sourceNetwork, walletAddress, amount);
        console.log("Approved - txHash:", approveTxHash);

        // Step 2: Burn
        console.log("Burning USDC...");
        const burnResult = await burnUSDC(halo, sourceNetwork, destinationNetwork, walletAddress, amount);
        console.log("Burned - txHash:", burnResult);

        // // Step 3: Wait for attestation
        console.log("Waiting for attestation...");
        const attestationSignature = await waitForAttestation(burnResult.messageHash);
        console.log("Attestation received", attestationSignature);

        
        // Step 4: Mint
        console.log("Minting USDC on destination chain...");
        const mintTxHash = await mintUSDC(
            halo,
            destinationNetwork,
            walletAddress,
            burnResult.messageBytes,
            attestationSignature
        );

        // console.log("Minting USDC on destination chain...");
        // const mintTxHash = await mintUSDC(
        //     halo,
        //     destinationNetwork,
        //     walletAddress,
        //     "0x000000000000000300000002000000000001dfce0000000000000000000000009f3b8679c73c2fef8b59b4f3444d4e156fb70aa50000000000000000000000009f3b8679c73c2fef8b59b4f3444d4e156fb70aa500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000075faf114eafb1bdbe2f0316df893fd58ce46aa4d000000000000000000000000375c11fd30fdc95e10aad66bdce590e1bccc6afa00000000000000000000000000000000000000000000000000000000000186a000000000000000000000000047953690507505a74ac416a02971b676fc0c3db2",
        //     '0x568b58819c1ff68313ab9489a2238edf7cf424bbd0de1dd7987bee6d72e6b3287bb2c283affc9dcfc1e57d8a22bbadb9ea27b581f17fca38f0c690667d4a2fa61c3cde8be56f0015705247dba3576b24bc7da9eaf48ce428b4fbe2eabac2657fc74b787bc9a0b260cf5032ac5ad79b89ea2328870ee6fba43943a5d96a0332cbb51b'
        // );
        console.log("Minted - txHash:", mintTxHash);
    }

    catch (e: any) {
        console.log(e);
    }
}

// Example usage:
// bridgeUSDC(
//     "avalanche-fuji",
//     "sepolia",
//     "YOUR_WALLET_ADDRESS",
//     0.1 // amount in USDC
// );