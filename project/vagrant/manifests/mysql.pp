class { 'mysql::server':
  root_password    => 'root',
  override_options => {
    'mysqld' => {
        'bind-address' => '0.0.0.0',
    }
  }
}

mysql::db { 'imported':
  user     => 'user1',
  password => 'user1',
  host     => 'localhost',
  grant    => ['ALL'],
  sql      => '/vagrant/puppet/data/import.sql'
}   


mysql_user{ 'root@%':
  ensure        => present,
  password_hash => mysql_password('root'),
}

mysql_grant{'root@%/*.*':
    user       => 'root@%',
    table      => '*.*',
    privileges => ['ALL'],
    options    => ['GRANT'],
}