import React from 'react';

import Toast from 'containers/Toast';
import EmailEnteringForm from 'containers/SignUp/EmailEnteringForm';
import EmailVerificationForm from 'containers/SignUp/EmailVerificationForm';
import EthereumWalletGenerationForm from 'containers/SignUp/EthereumWalletGenerationForm';
import SignUpViaEmail from 'containers/SignUp/SignUpViaEmail';
import WalletsSignUpForm from 'containers/SignUp/WalletsSignUpForm';
import RegistrationAlmostDoneWithAccount from 'components/SignUpWrapper/AlmostDoneWithAccount';
import RegistrationAlmostDoneNoAccount from 'components/SignUpWrapper/AlmostDoneNoAccount';
import Login from 'containers/Login';
import MetaTransactionAgreement from 'containers/MetaTransactionAgreement';
import ForgotPassword from 'containers/ForgotPassword';

const HomePage = React.lazy(() => import('containers/HomePage'));
const EditCommunity = React.lazy(() => import('containers/EditCommunity'));
const Faq = React.lazy(() => import('containers/Faq'));
const Tutorial = React.lazy(() => import('containers/Tutorial'));
const TermsOfService = React.lazy(() => import('containers/TermsOfService'));
const Users = React.lazy(() => import('containers/Users'));
const EditQuestion = React.lazy(() => import('containers/EditQuestion'));
const EditProfilePage = React.lazy(() => import('containers/EditProfilePage'));
const ViewProfilePage = React.lazy(() => import('containers/ViewProfilePage'));
const NotFoundPage = React.lazy(() => import('containers/NotFoundPage'));
const ErrorPage = React.lazy(() => import('containers/ErrorPage'));
const Questions = React.lazy(() => import('containers/Questions'));
const AskQuestion = React.lazy(() => import('containers/AskQuestion'));
const ViewQuestion = React.lazy(() => import('containers/ViewQuestion'));
const EditAnswer = React.lazy(() => import('containers/EditAnswer'));
const CreateCommunity = React.lazy(() => import('containers/CreateCommunity'));
const TagsOfCommunity = React.lazy(() => import('containers/TagsOfCommunity'));
const TagsCollection = React.lazy(() => import('containers/TagsCollection'));
const CreateTag = React.lazy(() => import('containers/CreateTag'));
const EditTag = React.lazy(() => import('containers/EditTag'));
const Wallet = React.lazy(() => import('containers/Wallet'));
const Boost = React.lazy(() => import('containers/Boost'));
const Search = React.lazy(() => import('containers/Search'));
const Support = React.lazy(() => import('containers/Support'));
const PrivacyPolicy = React.lazy(() => import('containers/PrivacyPolicy'));

const NoAccess = React.lazy(() => import('components/NoAccess'));
const Home = React.lazy(() => import('containers/Home'));
const Feed = React.lazy(() => import('components/Feed'));
const Communities = React.lazy(() => import('components/ExistingCommunities'));
const FullWidthPreloader = React.lazy(() =>
  import('components/LoadingIndicator/FullWidthPreloader'),
);

const DeleteFacebookData = React.lazy(() =>
  import('containers/DeleteFacebookData'),
);

export {
  EditCommunity,
  HomePage,
  Faq,
  Tutorial,
  Users,
  EditQuestion,
  EditProfilePage,
  ViewProfilePage,
  NotFoundPage,
  ErrorPage,
  Questions,
  AskQuestion,
  ViewQuestion,
  EditAnswer,
  CreateCommunity,
  TagsOfCommunity,
  TagsCollection,
  CreateTag,
  EditTag,
  NoAccess,
  Home,
  Feed,
  Communities,
  EmailEnteringForm,
  EmailVerificationForm,
  EthereumWalletGenerationForm,
  SignUpViaEmail,
  WalletsSignUpForm,
  RegistrationAlmostDoneWithAccount,
  RegistrationAlmostDoneNoAccount,
  Login,
  ForgotPassword,
  Toast,
  Wallet,
  Boost,
  Search,
  Support,
  PrivacyPolicy,
  FullWidthPreloader,
  TermsOfService,
  DeleteFacebookData,
  MetaTransactionAgreement,
};
