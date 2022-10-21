export interface NetworkProvider {
  connect(): string;
  disconnect(): boolean;
  //TODO make promise specific
  sendTransaction(): Promise<any>;
  sendMetaTransaction(): Promise<any>;
}

export class NetworkAdapter {
  private provider: NetworkProvider;
  private connectedAccount: string | undefined;

  connect() {
    this.connectedAccount = this.provider.connect();
  }

  disconnect() {
    this.provider.disconnect();
  }

  sendTransaction(): Promise<any> {
    return this.provider.sendTransaction();
  }

  sendMetaTransaction(): Promise<any> {
    return this.provider.sendMetaTransaction();
  }

  getConnectedAccount(): string | undefined {
    return this.connectedAccount;
  }

  constructor(provider: NetworkProvider) {
    this.provider = provider;
  }
}
