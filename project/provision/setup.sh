#!/usr/bin/env bash

echo "----------Provisioning virtual machine----------"
export MYSQL_PWD=Gho2Dq4lb # this variable should be exported to work properly from sudo
DB_NAME=boards
APP_PATH=/var/www/project

is_installed() {
  result=0
  for pkg in "$@"; do
    if sudo dpkg --get-selections | grep -q "^$pkg\(:i386\)\?[[:space:]]*install$" > /dev/null; then
      result=$(( result || 0 ))
    else
      result=1
    fi
  done
  return $result
}

sudo DEBIAN_FRONTEND=noninteractive apt-get update > /dev/null


# mc, git, curl
if is_installed mc git curl imagemagick; then
  echo "++++++++++Mc, git, curl and imagemagick are already installed++++++++++"
else
  echo "----------Installing utilities (mc, git, curl, imagemagick)----------"
  sudo DEBIAN_FRONTEND=noninteractive apt-get -y install mc git curl imagemagick > /dev/null
fi

# MySQL
if is_installed mysql-server; then
  echo "++++++++++MySQL is already installed++++++++++"
else
  echo "----------Preparing MySQL----------"
  sudo DEBIAN_FRONTEND=noninteractive apt-get -y install debconf-utils > /dev/null
  sudo debconf-set-selections <<< "mysql-server mysql-server/root_password password $MYSQL_PWD"
  sudo debconf-set-selections <<< "mysql-server mysql-server/root_password_again password $MYSQL_PWD"

  echo "----------Installing MySQL----------"
  sudo DEBIAN_FRONTEND=noninteractive apt-get -y install mysql-server > /dev/null

  # Allow access to mysql from outside world
  sudo sed -i -e 's/bind-address\s\+=\s\+127\.0\.0\.1/bind-address = 0.0.0.0/' /etc/mysql/my.cnf
fi

DB_SEARCH_RESULT=`mysqlshow --user=root --password=$MYSQL_PWD $DB_NAME| grep -v Wildcard | grep -o $DB_NAME`
if [ "$DB_SEARCH_RESULT" == "$DB_NAME" ]; then
  echo "++++++++++MySQL database already exists++++++++++"
else
  # Create database
  echo "----------Creating mysql database and granting access----------"
  mysql -u root -e "CREATE DATABASE $DB_NAME DEFAULT CHARACTER SET utf8;"
  # Grant root access to any db from any host
  mysql -u root -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '$MYSQL_PWD'; FLUSH PRIVILEGES;"
fi

# PHP
if is_installed php5-common php5-dev php5-cli php5-fpm; then
  echo "++++++++++PHP is already installed++++++++++"
else
  echo "----------Installing PHP----------"
  sudo DEBIAN_FRONTEND=noninteractive apt-get -y install php5-common php5-dev php5-cli php5-fpm > /dev/null
fi

if is_installed php5-curl php5-gd php5-mcrypt php5-mysqlnd php5-xdebug php5-imagick; then
  echo "++++++++++PHP extensions are already installed++++++++++"
else
  echo "----------Installing PHP extensions----------"
  sudo DEBIAN_FRONTEND=noninteractive apt-get -y install php5-curl php5-gd php5-mcrypt php5-mysqlnd php5-xdebug php5-imagick > /dev/null
  sudo php5enmod curl gd mcrypt mysqlnd xdebug imagick > /dev/null
fi

# Nodejs
if [ -d ~/.nvm ]; then
  echo "++++++++++Nodejs is already installed++++++++++"
  source ~/.nvm/nvm.sh
else
  echo "----------Installing nodejs----------"
  # installing node through nvm (in userspace, without sudo)
  curl -s https://raw.githubusercontent.com/creationix/nvm/v0.24.0/install.sh | bash > /dev/null
  source ~/.nvm/nvm.sh
  nvm install stable 2>/dev/null
  nvm use stable
  nvm alias default stable
fi

# Nginx
if is_installed nginx; then
  echo "++++++++++Nginx is already installed++++++++++"
else
  echo "----------Installing Nginx----------"
  sudo DEBIAN_FRONTEND=noninteractive apt-get -y install nginx > /dev/null
fi

# Apply configuration files
echo "----------Applying configuration files (nginx, php5, php5-fpm)----------"
# copy all configs over existing configs
sudo cp -frp /vagrant/provision/configs/etc/* /etc

# remove nginx default site ocnfig
sudo rm -f /etc/nginx/sites-available/default
# disable all currently enabled sites
sudo rm -f /etc/nginx/sites-enabled/*
# enable all available sites
sudo ln -sf /etc/nginx/sites-available/* /etc/nginx/sites-enabled/

# Symlink web app
echo "----------Symlinking web app----------"
sudo mkdir -p /var/www
sudo chown vagrant:vagrant /var/www
ln -nsf /vagrant $APP_PATH

# Initialize web app
echo "----------Installing and running composer----------"
cd $APP_PATH
php -r "readfile('https://getcomposer.org/installer');" | php
php composer.phar install --no-progress
php composer.phar update --no-progress

# bower packages
echo "----------Installing and running bower, npm, grunt----------"
npm install -g bower
npm install -g grunt-cli

cd $APP_PATH/admin/frontend
# --no-bin-links is required for windows,
# because creating symlinks to binaries will cause errors on Windows
npm install --no-bin-links
bower install --config.interactive=false -allow
bower update --config.interactive=false
grunt built

# Init web app
echo "----------Initializing web app----------"
cd $APP_PATH
php init --env=Development --overwrite=Yes
php yii migrate --interactive=0

# Restart nginx, php5-fpm for the config to take effect
echo "----------Restarting services (nginx, php5-fpm, mysql)----------"
sudo service nginx restart
sudo service php5-fpm restart
sudo service mysql restart

echo "----------Provisioning is finished. System restart may be required----------"
