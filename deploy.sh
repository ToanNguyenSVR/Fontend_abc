# echo "Switching to branch master..."
# git checkout master

echo "Building app..."
npm run build

echo "Deploy files to server..."
scp -r -i ~/.ssh/referity build/* root@178.128.84.51:/var/www/referity.online/


echo "Done!"