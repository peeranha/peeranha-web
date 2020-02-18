export default ({ match }) => {
  window.open(decodeURIComponent(match.params.to), '_parent');
  return null;
};
