import { MoveCallTransaction, SuiAddress, SuiTransactionResponse } from '@mysten/sui.js';
import { WalletCapabilities } from './suiInterfaces';

const ALL_PERMISSION_TYPES = ["viewAccount", "suggestTransactions"] as const;
type AllPermissionsType = typeof ALL_PERMISSION_TYPES;
type PermissionType = AllPermissionsType[number];

interface SuiWallet {
  hasPermissions(permissions: readonly PermissionType[]): Promise<boolean>;
  requestPermissions(): Promise<boolean>;
  getAccounts(): Promise<SuiAddress[]>;
  executeMoveCall: (
    transaction: MoveCallTransaction
  ) => Promise<SuiTransactionResponse>;
  executeSerializedMoveCall: (
    transactionBytes: Uint8Array
  ) => Promise<SuiTransactionResponse>;
}

interface SuiWalletWindow {
  suiWallet: SuiWallet;
}

declare const window: SuiWalletWindow;

export class SuiService implements WalletCapabilities {
  connecting: boolean;
  connected: boolean;
  account: string | undefined;

  getAccounts(): Promise<string[]> {
    return window.suiWallet.getAccounts();
  }
  executeMoveCall(
    transaction: MoveCallTransaction
  ): Promise<SuiTransactionResponse> {
    console.log(window.suiWallet.executeMoveCall)
    console.log(transaction)
    return window.suiWallet.executeMoveCall(transaction);
  }
  executeSerializedMoveCall(
    transactionBytes: Uint8Array
  ): Promise<SuiTransactionResponse> {
    return window.suiWallet.executeSerializedMoveCall(transactionBytes);
  }

  async connect(): Promise<string | undefined> {
    this.connecting = true;
    if (window.suiWallet) {
      const wallet = window.suiWallet;
      try {
        let given = await wallet.requestPermissions();
        const newLocal: readonly PermissionType[] = ["viewAccount"];
        let perms = await wallet.hasPermissions(newLocal);
        this.account = (await this.getAccounts())[0];
        this.connected = true;
        return this.account
      } catch (err) {
        console.error(err);
      } finally {
        this.connecting = false;
      }
    }
    return undefined;
  }

  // Come back to this later
  async disconnect(): Promise<void> {
    if (this.connected) {
      this.connected = false;
    }
    console.log("disconnected");
  }

  constructor() {
    this.connected = false;
    this.connecting = false;
    this.account = undefined;
  }
}
