source /home/ec2-user/.bash_profile
cd /var/www/spaceShare
node server/index.js > stdout.txt 2> stderr.txt &
