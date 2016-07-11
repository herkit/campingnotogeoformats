Vagrant.configure("2") do |config|
    config.vm.box = "trusty64"
    config.vm.box_url = "http://files.vagrantup.com/trusty64.box"
    config.vm.provision :shell, :path => "devenv/node-bootstrap.sh"
    config.vm.network :private_network, ip: '10.0.33.34'

    config.vm.provider :virtualbox do |vb|
        vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
        vb.customize ["modifyvm", :id, "--memory", "512"]
    end
end