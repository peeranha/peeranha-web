import { MoveCallTransaction, SuiAddress, SuiTransactionResponse, JsonRpcProvider } from '@mysten/sui.js';
import { TransactionProps } from 'containers/NetworkAdapter/networkAdapter';

const ALL_PERMISSION_TYPES = ["viewAccount", "suggestTransactions"] as const;
type AllPermissionsType = typeof ALL_PERMISSION_TYPES;
type PermissionType = AllPermissionsType[number];

interface SuiWallet {
  hasPermissions(permissions: PermissionType[]): Promise<boolean>;
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

const rpc = new JsonRpcProvider('https://fullnode.devnet.sui.io:443');

declare const window: SuiWalletWindow;

export interface WalletCapabilities {


  connected: boolean;
  connecting: boolean;
  account: string | undefined;

  connect: () => Promise<string | undefined>;
  disconnect: () => Promise<void>;
  getAccounts: () => Promise<SuiAddress[]>;
  sendTransaction: (arg0: TransactionProps) => Promise<SuiTransactionResponse>;
  executeSerializedMoveCall: (
    transactionBytes: Uint8Array
  ) => Promise<SuiTransactionResponse>;
}

export class SuiService implements WalletCapabilities {
  userLib: string;
  // commonLib: string;
  communityLib: string;
  // i64Lib: string;
  postLib: string;
  // voteLib: string;

  packageObjectId: string;
  connecting: boolean;
  connected: boolean;
  account: string | undefined;

  sendTransaction({
    libName,
    actor,
    action,
    data,
    confirmations = 1,
  }: TransactionProps): Promise<SuiTransactionResponse>  {
    const moduleAddress = '0xd8d426f14d00ebf3c60c309e2cb1d8ff9d9ed58a';
    // data = 'x"a267530f49f8280200edf313ee7af6b827f2a8bce2897751d06a843f644967b1"'

    const transaction = {
      packageObjectId: this.packageObjectId,
      module: libName,
      function: action,
      typeArguments: [],
      arguments: [moduleAddress, actor, data],
      gasBudget: 0,
    }

    console.log(window.suiWallet.executeMoveCall)
    console.log(transaction)

    return window.suiWallet.executeMoveCall(transaction);
  }

  sendMetaTransaction(transaction: MoveCallTransaction): Promise<any> {
    return window.suiWallet.executeMoveCall(transaction);
  }

  getUserByAddress(address) {
    console.log(address)
    rpc.getObject(this.userLib).then(
      obj => {
        console.log(obj)
        if (obj.status != 'Exists') {
          console.warn('[getBet] Object does not exist. Status:', obj.status);
          return null;
        } else {
          console.log(obj.details.data.fields.users)
          return obj.details.data.fields.users.find(user => user.fields.owner === address);
        }
      }
    )
  }

  getDataWithArgs(libName: string, action: string, args: Array<any>): Promise<any> {
    const moduleAddress = '0xd8d426f14d00ebf3c60c309e2cb1d8ff9d9ed58a';
    console.log(libName)
    console.log(action)
    const transaction = {
      packageObjectId: this.packageObjectId,
      module: libName,
      function: action,
      typeArguments: [],
      arguments: [moduleAddress, ...args],
      gasBudget: 30000,
    }

    rpc.getObject(moduleAddress).then(r => console.log(r.details.data.fields.users))
  }

  getAccounts(): Promise<string[]> {
    return window.suiWallet.getAccounts();
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
    this.packageObjectId = '0x74f61827cc32d0fa08bb5ce710022454e68b10a7';
    this.userLib = '0xd8d426f14d00ebf3c60c309e2cb1d8ff9d9ed58a';
    this.communityLib = '0xcfb59c25dbba8d98f94451a7d2b793735a019cb5';
    this.postLib = '0x0cb9d7586700d078c15fa073d059cd5b25619ea0';

    this.connected = false;
    this.connecting = false;
    this.account = undefined;
  }
}
