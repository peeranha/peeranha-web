export interface NetworkProvider {
  connect(): Promise<string>;
  disconnect(): boolean;
  //TODO make promise specific
  sendTransaction(arg0: TransactionProps): Promise<any>;
  sendMetaTransaction(arg0: TransactionProps): Promise<any>;
  getDataWithArgs(
    libName: string,
    action: string,
    args: Array<any>,
  ): Promise<any>;
}

export type TransactionProps = {
  libName: string;
  actor: string;
  action: string;
  data: string;
  confirmations: number;
};

export class NetworkAdapter {
  private provider: NetworkProvider;
  private connectedAccount: string | undefined;

  constructor(provider: NetworkProvider) {
    this.provider = provider;
  }

  connect = async () => {
    this.connectedAccount = await this.provider.connect();
  };

  disconnect = async () => {
    this.provider.disconnect();
  };

  sendTransaction = async ({
    libName,
    actor,
    action,
    data,
    confirmations,
  }: TransactionProps): Promise<any> => {
    return this.provider.sendTransaction({
      libName,
      actor,
      action,
      data,
      confirmations,
    });
  };

  sendMetaTransaction = async ({
    libName,
    actor,
    action,
    data,
    confirmations,
  }: TransactionProps): Promise<any> => {
    return this.provider.sendMetaTransaction({
      libName,
      actor,
      action,
      data,
      confirmations,
    });
  };

  getDataWithArgs = async (
    libName: string,
    action: string,
    args: Array<any>,
  ): Promise<any> => {
    return this.provider.getDataWithArgs(libName, action, args);
  };

  getConnectedAccount = (): string | undefined => {
    return this.connectedAccount;
  };

  getUserByAddress = (address): any => {
    console.log(address);
    return this.provider.getUserByAddress(address);
  };
}
