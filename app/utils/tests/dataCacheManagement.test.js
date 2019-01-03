import { getAllCommunities, getTagScope } from '../dataCacheManagement';

import { TAGS_COMMUNITIES_TABLE, ALL_COMMUNITIES_SCOPE } from '../constants';

describe('getAllCommunities', () => {
  const community = {
    id: 1,
    name: 'com1',
  };

  const eos = {
    getTableRows: jest.fn().mockImplementation(() => [community]),
  };

  getAllCommunities(eos);

  it('eos', () => {
    expect(eos.getTableRows).toHaveBeenCalledWith(
      TAGS_COMMUNITIES_TABLE,
      ALL_COMMUNITIES_SCOPE,
      0,
    );

    expect(eos.getTableRows).toHaveBeenCalledWith(
      TAGS_COMMUNITIES_TABLE,
      getTagScope(community.id),
      0,
    );
  });
});
