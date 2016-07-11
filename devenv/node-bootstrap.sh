#!/usr/bin/env bash

# Get root up in here
sudo su

# Add MongoDB to apt
apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/10gen.list

# Update and begin installing some utility tools
apt-get -y update

if [ $(dpkg -s build-essential | egrep -c "ok installed") -eq 0 ]; then
    echo "Installing utilty tools"
    apt-get install -y python-software-properties
    apt-get install -y vim git subversion curl
    apt-get install -y memcached build-essential
fi

# Add nodejs repo
if [ $(dpkg -s nodejs | egrep -c "ok installed") -eq 0 ]; then
    echo "Installing node"
    add-apt-repository -y ppa:chris-lea/node.js
    apt-get -y update

    # Install nodejs
    apt-get install -y nodejs
fi

if [ $(dpkg -s mongodb-10gen | egrep -c "ok installed") -eq 0 ]; then
    echo "Installing MongoDB"
    # Install latest stable version of MongoDB
    apt-get install -y mongodb-10gen
fi
# Victory!

if [ ! -d "/var/run/forever" ]; then
    npm install -g forever
    mkdir /var/run/forever
fi

if [ ! -d "/var/app" ]; then
    ln -s /vagrant/app /var/app 
    cd /var/app
    npm install --no-bin-links
    echo "Setting up Nodemon daemon..."
    ln -s /vagrant/devenv/campinginfo /etc/init.d
    chmod +x /etc/init.d/campinginfo
fi

service campinginfo start