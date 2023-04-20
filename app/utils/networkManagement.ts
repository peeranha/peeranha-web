import { TransactionBlock, JsonRpcProvider, testnetConnection } from '@mysten/sui.js';
export const isSuiBlockchain: () => boolean = () => process.env.BLOCKCHAIN === 'sui';

export const handleMoveCall = async (
  wallet: {
    signAndExecuteTransactionBlock: (arg0: { transactionBlock: TransactionBlock }) => any;
  },
  packageObjectId: any,
  UsersRatingCollection: string,
  data: any,
) => {
  // getData(UsersRatingCollection, wallet.account?.address)
  const tx = new TransactionBlock();
  tx.moveCall({
    target: `${packageObjectId}::userLib::createUser`,
    arguments: [tx.pure(UsersRatingCollection), tx.pure(data)],
  });
  try {
    // execute the programmable transaction
    const resData = await wallet.signAndExecuteTransactionBlock({
      transactionBlock: tx,
    });
    console.log(resData);

    console.log('successfully!', resData);
  } catch (e) {
    console.error('failed', e);
  }
};

const getData = (userLib, address) => {
  // console.log(userLib);
  console.log(address);
  const rpc = new JsonRpcProvider(testnetConnection);
  // console.log(rpc);
  rpc.getObject({ owner: address }).then((obj) => {
    console.log(obj);
    if (obj.status != 'Exists') {
      console.warn('[getBet] Object does not exist. Status:', obj.status);
      return null;
    }

    console.log(obj.details.data.fields.users);
    // return obj.details.data.fields.users.find((user) => user.fields.owner === address);
  });

  rpc.getOwnedObjects({ owner: address }).then((obj) => {
    console.log(obj);
    if (obj.status != 'Exists') {
      console.warn('[getBet] Object does not exist. Status:', obj.status);
      return null;
    }

    console.log(obj.details.data.fields.users);
    // return obj.details.data.fields.users.find((user) => user.fields.owner === address);
  });
};
