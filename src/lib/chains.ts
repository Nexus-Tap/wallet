import Web3 from 'web3';

// Define the Chain type to match the structure we need
export interface Chain {
    name: string;
    slug: string;
    icon: {
        url: string;
    };
    rpc: string[];
    chainId: number;
}

// Define our chains
export const Ethereum: Chain = {
    name: 'Ethereum',
    slug: 'ethereum',
    icon: {
        url: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
    },
    rpc: ['https://eth.llamarpc.com'],
    chainId: 1
};

export const Sepolia: Chain = {
    name: 'Sepolia',
    slug: 'sepolia',
    icon: {
        url: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
    },
    rpc: ['https://rpc.sepolia.org'],
    chainId: 11155111
};

export const AvalancheFuji: Chain = {
    name: 'Avalanche Fuji',
    slug: 'avalanche-fuji',
    icon: {
        url: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png'
    },
    rpc: ['https://api.avax-test.network/ext/bc/C/rpc'],
    chainId: 43113
};

export const ArbitrumSepolia: Chain = {
    name: 'Arbitrum Sepolia',
    slug: 'arbitrum-sepolia',
    icon: {
        url: 'https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg'
    },
    rpc: ['https://sepolia-rollup.arbitrum.io/rpc'],
    chainId: 421614
};

export const BaseSepoliaTestnet: Chain = {
    name: 'Base Sepolia',
    slug: 'base-sepolia',
    icon: {
        url: 'https://assets.coingecko.com/coins/images/32375/small/base.jpeg'
    },
    rpc: ['https://sepolia.base.org'],
    chainId: 84532
};

export const OpSepoliaTestnet: Chain = {
    name: 'Optimism Sepolia',
    slug: 'optimism-sepolia',
    icon: {
        url: 'https://assets.coingecko.com/coins/images/25244/small/Optimism.png'
    },
    rpc: ['https://sepolia.optimism.io'],
    chainId: 11155420
};

export const Arbitrum: Chain = {
    name: 'Arbitrum',
    slug: 'arbitrum',
    icon: {
        url: 'https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg'
    },
    rpc: ['https://arbitrum-sepolia.blockpi.network/v1/rpc/public'],
    chainId: 421614
};

export const Optimism: Chain = {
    name: 'Optimism',
    slug: 'optimism',
    icon: {
        url: 'https://assets.coingecko.com/coins/images/25244/small/Optimism.png'
    },
    rpc: ['https://mainnet.optimism.io'],
    chainId: 10
};

// Network type definition
export type NetworkType = {
    name: string;
    network: Chain;
    src: string;
    domain: number;
    tokenMessengerContract: string;
    messageTransmitterContract: string;
    usdcContract: string;
    tokenMinterContract: string;
    api: string;
    web3: Web3;
};

// Network configurations
export const SepoliaTestnet: NetworkType = {
    name: Sepolia.name,
    network: Sepolia,
    src: Ethereum.icon.url,
    domain: 0,
    tokenMessengerContract: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
    messageTransmitterContract: "0x7865fAfC2db2093669d92c0F33AeEF291086BEFD",
    usdcContract: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    tokenMinterContract: "0xE997d7d2F6E065a9A93Fa2175E878Fb9081F1f0A",
    api: "https://iris-api-sandbox.circle.com/attestations",
    web3: new Web3(new Web3.providers.HttpProvider(`https://sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`))
};

export const AvalancheFujiTestnet: NetworkType = {
    name: AvalancheFuji.name,
    network: AvalancheFuji,
    src: AvalancheFuji.icon.url,
    domain: 1,
    tokenMessengerContract: "0xeb08f243e5d3fcff26a9e38ae5520a669f4019d0",
    messageTransmitterContract: "0xa9fb1b3009dcb79e2fe346c16a604b8fa8ae0a79",
    usdcContract: "0x5425890298aed601595a70AB815c96711a31Bc65",
    tokenMinterContract: "0x4ed8867f9947a5fe140c9dc1c6f207f3489f501e",
    api: "https://iris-api-sandbox.circle.com/attestations",
    web3: new Web3(new Web3.providers.HttpProvider(`https://avalanche-fuji.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`))
};

export const ArbitrumTestnet: NetworkType = {
    name: ArbitrumSepolia.name,
    network: ArbitrumSepolia,
    src: Arbitrum.icon.url,
    domain: 3,
    tokenMessengerContract: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
    messageTransmitterContract: "0xaCF1ceeF35caAc005e15888dDb8A3515C41B4872",
    usdcContract: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
    tokenMinterContract: "0xE997d7d2F6E065a9A93Fa2175E878Fb9081F1f0A",
    api: "https://iris-api-sandbox.circle.com/attestations",
    web3: new Web3(new Web3.providers.HttpProvider(`https://arbitrum-sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`))
};

export const BaseSepolia: NetworkType = {
    name: BaseSepoliaTestnet.name,
    network: BaseSepoliaTestnet,
    src: BaseSepoliaTestnet.icon.url,
    domain: 6,
    tokenMessengerContract: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
    messageTransmitterContract: "0x7865fAfC2db2093669d92c0F33AeEF291086BEFD",
    usdcContract: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    tokenMinterContract: "0xE997d7d2F6E065a9A93Fa2175E878Fb9081F1f0A",
    api: "https://iris-api-sandbox.circle.com/attestations",
    web3: new Web3(new Web3.providers.HttpProvider(`https://base-sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`))
};

export const OPSepolia: NetworkType = {
    name: OpSepoliaTestnet.name,
    network: OpSepoliaTestnet,
    src: Optimism.icon.url,
    domain: 2,
    tokenMessengerContract: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
    messageTransmitterContract: "0xaCF1ceeF35caAc005e15888dDb8A3515C41B4872",
    usdcContract: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7",
    tokenMinterContract: "0xE997d7d2F6E065a9A93Fa2175E878Fb9081F1f0A",
    api: "https://iris-api-sandbox.circle.com/attestations",
    web3: new Web3(new Web3.providers.HttpProvider(`https://optimism-sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`))
};

// Networks mapping
export const Networks: Record<string, NetworkType> = {
    [Sepolia.slug]: SepoliaTestnet,
    [AvalancheFuji.slug]: AvalancheFujiTestnet,
    [ArbitrumSepolia.slug]: ArbitrumTestnet,
    [OpSepoliaTestnet.slug]: OPSepolia,
    [BaseSepoliaTestnet.slug]: BaseSepolia,
};

export const NetworkList: NetworkType[] = Object.values(Networks);

const NetworkSlugs = Object.keys(Networks);

export type NetworkSlug = typeof NetworkSlugs[number];