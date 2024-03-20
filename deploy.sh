echo "Building the App..."
npm run build

echo "Deploying to the server..."
scp -i "cc.pem" -r dist/* ubuntu@ec2-52-90-144-118.compute-1.amazonaws.com:/var/www/html

echo "Done!"