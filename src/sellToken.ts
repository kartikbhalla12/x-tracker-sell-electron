import { VersionedTransaction, Connection, Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import axios from "axios";

const RPC_ENDPOINT = "https://solana-rpc.publicnode.com/";
const PUMP_PORTAL_API = "https://pumpportal.fun/api";

export const sellToken = async ({
  publicKey,
  privateKey,
  tokenPublicKey,
  percentage,
}: {
  publicKey: string;
  privateKey: string;
  tokenPublicKey: string;
  percentage: number;
}) => {
  try {
    const response = await axios.post(
      `${PUMP_PORTAL_API}/trade-local`,
      {
        publicKey: publicKey,
        action: "sell",
        mint: tokenPublicKey,
        denominatedInSol: "false",
        amount: `${percentage}%`,
        slippage: 10,
        priorityFee: 0.0005,
      },
      {
        headers: { "Content-Type": "application/json" },
        responseType: "arraybuffer",
      }
    );

    if (response.status === 200) {
      const tx = VersionedTransaction.deserialize(
        new Uint8Array(response.data)
      );
      const signerKeyPair = Keypair.fromSecretKey(bs58.decode(privateKey));
      tx.sign([signerKeyPair]);

      const signature = await web3Connection.sendTransaction(tx);
      console.log("Transaction: https://solscan.io/tx/" + signature);
      
      const appContainer = document.querySelector("body");
      if (appContainer) {
        appContainer.classList.add("success-body");
      }
    } else {
      throw new Error();
    }
  } catch (error) {
    alert("An error occurred while selling the token. Please try again.");
  }
};

const web3Connection = new Connection(RPC_ENDPOINT, "confirmed");
