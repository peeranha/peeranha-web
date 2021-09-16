export const REGISTER_ACC = 'createUser';
export const UPDATE_ACC = 'updateUser';
export const GET_USER_BY_ADDRESS = 'getUserByAddress';
export const GET_USERS_COUNT = 'getUsersCount';

export const usersQuery = `
      query(
        $first: Int,
        $skip: Int,
        $orderBy: BigInt,
      ) {
        users(
          first: $first,
          skip: $skip,
          orderBy: $orderBy,
          orderDirection: desc,
        ) {
          id
          rating
          displayName
          company
          position
          location
          about
          avatar
          creationTime
          ipfsHash
          ipfsHash2
        }
      }`;

export const userQuery = `
      query(
        $id: ID!,
      ) {
        user(
          id: $id
        ) {
          id
          rating
          displayName
          company
          position
          location
          about
          avatar
          creationTime
          ipfsHash
          ipfsHash2
        }
      }`;
