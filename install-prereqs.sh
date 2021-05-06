#install mongodb and other components

sudo apt-install update -y
sudo apt-install upgrade -y
#sudo apt-get install mongodb -y
sudo apt-get install nodejs -y
sudo apt-get install npm -y
npm install mongodb
sudo service mongodb start
echo "Prereqs installed, my guy!"