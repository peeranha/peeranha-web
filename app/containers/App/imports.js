import React from 'react';

const HomePage = React.lazy(
  /* istanbul ignore next */ () => import('containers/HomePage'),
);
const FaqFull = React.lazy(
  /* istanbul ignore next */ () => import('containers/HomePage/FaqFull'),
);

const Faq = React.lazy(
  /* istanbul ignore next */ () => import('containers/Faq'),
);
const Users = React.lazy(
  /* istanbul ignore next */ () => import('containers/Users'),
);
const EditQuestion = React.lazy(
  /* istanbul ignore next */ () => import('containers/EditQuestion'),
);
const EditProfilePage = React.lazy(
  /* istanbul ignore next */ () => import('containers/EditProfilePage'),
);
const ViewProfilePage = React.lazy(
  /* istanbul ignore next */ () => import('containers/ViewProfilePage'),
);
const NotFoundPage = React.lazy(
  /* istanbul ignore next */ () => import('containers/NotFoundPage'),
);
const Questions = React.lazy(
  /* istanbul ignore next */ () => import('containers/Questions'),
);
const AskQuestion = React.lazy(
  /* istanbul ignore next */ () => import('containers/AskQuestion'),
);
const ViewQuestion = React.lazy(
  /* istanbul ignore next */ () => import('containers/ViewQuestion'),
);
const EditAnswer = React.lazy(
  /* istanbul ignore next */ () => import('containers/EditAnswer'),
);
const CreateCommunity = React.lazy(
  /* istanbul ignore next */ () => import('containers/CreateCommunity'),
);
const TagsOfCommunity = React.lazy(
  /* istanbul ignore next */ () => import('containers/TagsOfCommunity'),
);
const TagsCollection = React.lazy(
  /* istanbul ignore next */ () => import('containers/TagsCollection'),
);
const CreateTag = React.lazy(
  /* istanbul ignore next */ () => import('containers/CreateTag'),
);
const SuggestedTags = React.lazy(
  /* istanbul ignore next */ () => import('containers/SuggestedTags'),
);
const NoAccess = React.lazy(
  /* istanbul ignore next */ () => import('components/NoAccess'),
);
const Feed = React.lazy(
  /* istanbul ignore next */ () => import('components/Feed'),
);
const Communities = React.lazy(
  /* istanbul ignore next */ () => import('components/ExistingCommunities'),
);
const SuggestedCommunities = React.lazy(
  /* istanbul ignore next */ () => import('components/SuggestedCommunities'),
);

export {
  HomePage,
  FaqFull,
  Faq,
  Users,
  EditQuestion,
  EditProfilePage,
  ViewProfilePage,
  NotFoundPage,
  Questions,
  AskQuestion,
  ViewQuestion,
  EditAnswer,
  CreateCommunity,
  TagsOfCommunity,
  TagsCollection,
  CreateTag,
  SuggestedTags,
  NoAccess,
  Feed,
  Communities,
  SuggestedCommunities,
};
