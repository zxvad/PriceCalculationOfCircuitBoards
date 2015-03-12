#!/usr/bin/env bash

echo "----------Provisioning virtual machine----------"
apt-get update && apt-get -y upgrade
isInstalled() {
  dpkg --get-selections | grep -q "^$1[[:space:]]*install$" >/dev/null;
}

# mc, git, curl
if isInstalled "mc" && isInstalled "git" && isInstalled "curl"; then
  echo "++++++++++Mc, git, curl are already installed++++++++++"
else
  echo "----------Installing utilities (mc, git, curl)----------"
  DEBIAN_FRONTEND=noninteractive apt-get -y install mc git curl > /dev/null
fi

# MySQL
if isInstalled "mysql-server"; then
  echo "++++++++++MySQL already installed++++++++++"
else
  echo "----------Preparing MySQL----------"
  export MYSQL_PWD=Gho2Dq4lb
  apt-get -y install debconf-utils > /dev/null
  debconf-set-selections <<< "mysql-server mysql-server/root_password password $MYSQL_PWD"
  debconf-set-selections <<< "mysql-server mysql-server/root_password_again password $MYSQL_PWD"

  echo "----------Installing MySQL----------"
  DEBIAN_FRONTEND=noninteractive apt-get -y install mysql-server > /dev/null

  # Create database
  echo "----------Creating mysql database and granting access----------"
  mysql -u root -e "CREATE DATABASE boards DEFAULT CHARACTER SET utf8;"
  # Grant root access to any db from any host
  mysql -u root -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '$MYSQL_PWD'; FLUSH PRIVILEGES;"
fi

# PHP
if isInstalled "php5-common" && isInstalled "php5-dev" && isInstalled "php5-cli" && isInstalled "php5-fpm"; then
  echo "++++++++++PHP already installed++++++++++"
else
  echo "----------Installing PHP----------"
  DEBIAN_FRONTEND=noninteractive apt-get -y install php5-common php5-dev php5-cli php5-fpm > /dev/null
fi

if isInstalled "php5-curl" && isInstalled "php5-gd" && isInstalled "php5-mcrypt" && isInstalled "php5-mysqlnd" && isInstalled "php5-xdebug"; then
  echo "++++++++++PHP extensions already installed++++++++++"
else
  echo "----------Installing PHP extensions----------"
  DEBIAN_FRONTEND=noninteractive apt-get -y install php5-curl php5-gd php5-mcrypt php5-mysqlnd php5-xdebug > /dev/null
  php5enmod curl gd mcrypt mysqlnd xdebug imagick
fi

# Nodejs
if isInstalled "nodejs"; then
  echo "++++++++++Nodejs already installed++++++++++"
else
  echo "----------Installing nodejs----------"
  curl -sL https://deb.nodesource.com/setup | bash -
  DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs
fi

# Nginx
if isInstalled "nginx"; then
  echo "++++++++++Nginx already installed++++++++++"
else
  echo "----------Installing Nginx----------"
  DEBIAN_FRONTEND=noninteractive apt-get -y install nginx > /dev/null
fi

# Apply configuration files
echo "----------Applying configuration files (nginx, php5, php5-fpm)----------"
cp -frp /vagrant/provision/configs/etc/* /etc
ln -sf /etc/nginx/sites-available/my.boards.com /etc/nginx/sites-enabled/

rm -f /etc/nginx/sites-enabled/default
rm -f /etc/nginx/sites-available/default

# Symlink web app
echo "----------Symlinking web app----------"
mkdir -p /var/www
ln -sf /vagrant /var/www/PriceCalculationOfCircuitBoards

# Initialize web app
echo "----------Installing and running composer----------"
cd /var/www/PriceCalculationOfCircuitBoards
php -r "readfile('https://getcomposer.org/installer');" | php
php composer.phar install

# bower packages
echo "----------Installing and running bower, nmp, grunt----------"
cd /var/www/PriceCalculationOfCircuitBoards/admin/frontend
npm install -g bower
npm install -g grunt-cli
npm install --no-bin-links
bower update --config.interactive=false --allow-root
grunt built

# Init web app
echo "----------Initializing web app----------"
cd /var/www/PriceCalculationOfCircuitBoards
php init --env=Development --overwrite=No
php yii migrate --interactive=0

# Restart nginx, php5-fpm for the config to take effect
echo "----------Restarting services (nginx, php5-fpm, mysql)----------"
service nginx restart
service php5-fpm restart
service mysql restart

echo "Finished provisioning."
