# pkg="aws"
# which $pkg > /dev/null 2>&1
# if [ $? != 0 ];
# then
# echo "aws-cli installing..."

# curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
# unzip awscli-bundle.zip
# ./awscli-bundle/install -b ~/bin/aws
# rm -f awscli-bundle.zip

# echo "aws-cli installing has finished"
# else
# echo "aws-cli is already installed"
# fi

# echo "aws configuring..."
# aws configure

# npm install

if [ "$1" == "prod" ];
then
bucket="prod.peeranha.io"
npm run build
else
bucket="test.peeranha.io"
npm run build:test
fi

# clear bucket
aws s3 rm s3://$bucket/ --recursive

# upload files from ./build
aws s3 cp ./build s3://$bucket/ --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --recursive

# delete build folder
rm -r ./build
