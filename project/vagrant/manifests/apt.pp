stage { 'first':
  before => Stage['main'],
} 

class {['apt', 'apt_flag']:
  stage => first,
}

class apt_flag {
  file {
    '/home/vagrant/puppet_apt':
      ensure => file,
      notify => Exec['apt_update'],
  }
}