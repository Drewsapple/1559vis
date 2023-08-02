import { createPublicClient, webSocket } from 'viem';
import { mainnet } from 'viem/chains';

export const client = createPublicClient({
	chain: mainnet,
	transport: webSocket(`wss://eth-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`)
});
