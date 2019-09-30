if [ "$1" == "prod" ];
then
bucket="prod.peeranha.io"
npm run build:prod
elif [ "$1" == "test" ];
then
bucket="test.peeranha.io"
npm run build:test
fi

aws s3 rm s3://$bucket/ --recursive
aws s3 cp ./build s3://$bucket/ --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --recursive

rm -r ./build
