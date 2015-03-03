include php

class {
    # Base packages
    ['php::cli', 'php::fpm']:
      settings => [
        'set PHP/short_open_tag On',
      ];

    # PHP extensions
    [
      'php::extension::curl', 'php::extension::gd', 'php::extension::mcrypt', 'php::extension::mysql', 'php::extension::opcache'
    ]:
      ensure => installed;

    # xdebug
    'php::extension::xdebug': 
      ensure => installed,
      settings => [
        "set .anon/zend_extension 'xdebug.so'",
        "set .anon/xdebug.remote_enable '1'",   
        "set .anon/xdebug.remote_connect_back '1'",   
      ];    

}

# Fixing ubuntu bug
file {'/etc/php5/cli/conf.d/20-mcrypt.ini':
    ensure => link,
    target => '../../mods-available/mcrypt.ini',
    require => Package['php5-mcrypt'],
}

file {'/etc/php5/fpm/conf.d/20-mcrypt.ini':
    notify => Service['php5-fpm'],
    ensure => link,
    target => '../../mods-available/mcrypt.ini',
    require => Package['php5-mcrypt'],
}

Package[$php::cli::params::package] -> File['/etc/php5/cli/conf.d/20-mcrypt.ini']
Package[$php::fpm::params::package] -> File['/etc/php5/fpm/conf.d/20-mcrypt.ini']