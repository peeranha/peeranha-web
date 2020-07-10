bucket=null
cd peeranha-web
rm -rf ./build
if [ "$1" == "prod" ];
then
bucket="prod.peeranha.io"
npm run build:prod
elif [ "$1" == "test" ];
then
bucket="testpeeranha.io"
npm run build:test
fi
if [ ! -d "./build" ];
then
echo 'Build error'
exit 1;
fi
if [ "$bucket" != null ];
then
aws s3 rm s3://$bucket/ --recursive
aws s3 cp ./build s3://$bucket/ --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --recursive
rm -rf ./build
else
echo 'Operation is failed. You should pass argument(prod or test) to upload files into prod or test environment'
fi
