include apt

$ppas = [ 'ppa:brightbox/ruby-ng-experimental', 'ppa:chris-lea/node.js', 'ppa:chris-lea/node.js-devel' ]
apt::ppa{ $ppas: }

$packages = [ 'git', 'mc', 'npm', 'php5', 'php5-mysql', 'php5-xdebug', 'php5-mcrypt', 'php5-imagick', 'imagemagick']
package { $packages: ensure => installed, }

class { '::mysql::server':
  root_password    => 'test123123',
}

class { 'apache':
  default_vhost => false,
  mpm_module => 'prefork',
  sendfile => 'Off',
}

include apache::mod::php
include apache::mod::rewrite

apache::vhost {'rspp':
      docroot => '/var/www/app',
      override => ['All'],
      port    => '80',
  }
  
augeas { 'php.ini':
  notify  => Service[apache2],
  require => Package[php5],
  context => '/files/etc/php5/apache2/php.ini/PHP',
  changes => [
    'set display_errors On',
    'set display_startup_errors On',
    'set short_open_tag On',
  ];
}

augeas { 'xdebug.ini':
  notify  => Service[apache2],
  require => Package[php5-xdebug],
  context => '/files/etc/php5/mods-available/xdebug.ini/PHP',
  changes => [
    'set xdebug.remote_enable On',
    'set xdebug.remote_connect_back On',
    'set xdebug.idekey vagrant',
  ];
}

class { 'ruby':
  version => '1.9.3',
  gems_version => 'latest',
} -> package { 'sass':
  ensure => 'installed',
  provider => 'gem',
}

$npm_packages = ['grunt', 'grunt-cli', 'bower' ]

class { 'nodejs':
  dev_package => true,
} -> file { '/usr/bin/node':
  ensure => 'link',
  target => '/usr/bin/nodejs',
} -> package { $npm_packages:
  ensure   => present,
  provider => 'npm',
  require => Package['npm'],
}
