bucket=null
cd peeranha-web
rm -rf ./build
rm -rf ./storybook-static
if [ "$1" == "prod" ];
then
  bucket="prod.peeranha.io"
  npm run build:prod
elif [ "$1" == "staging" ];
then
  bucket="testpeeranha.io"
  npm run build:staging
elif [ "$1" == "dev1" ];
then
  bucket="dev1.testpeeranha.io"
  npm run build:test
elif [ "$1" == "dev2" ];
then
  bucket="dev2.testpeeranha.io"
  npm run build:test
elif [ "$1" == "dev3" ];
then
  bucket="dev3.testpeeranha.io"
  npm run build:test
elif [ "$1" == "storybook" ];
then
  bucket="storybook.testpeeranha.io"
  npm run build-storybook
elif [ "$1" == "test" ];
then
  bucket="test--website-bucket"
  npm run build:test
fi
if [ ! -d "./build" ] && [ "$bucket" != "storybook.testpeeranha.io" ];
then
  echo 'Build error'
  exit 1;
fi
if [ "$bucket" != null ] && [ "$bucket" != "storybook.testpeeranha.io" ];
then
  aws s3 rm s3://$bucket/ --recursive
  aws s3 cp ./build s3://$bucket/ --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --recursive
  rm -rf ./build
elif [ "$bucket" == "storybook.testpeeranha.io" ];
then
  aws s3 rm s3://$bucket/ --recursive
  aws s3 cp ./storybook-static s3://$bucket/ --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --recursive
  rm -rf ./storybook-static
else
  echo 'Operation is failed. You should pass argument(prod or test) to upload files into prod or test environment'
fi
