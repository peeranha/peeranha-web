export default ({ match, history }) => {
  window.open(decodeURIComponent(match.params.to), '_blank');
  history.goBack();
  return null;
};
