Screeninvader-theme
===================

Screeninvader Web interface

# Setup Screeninvader Server

 - [General setup instructions](https://github.com/Metalab/ScreenInvader/wiki/Testing-in-a-VM)
 - wget https://dl.dropboxusercontent.com/u/90533294/screeninvader_0.9.dd.xz
 - Extract image with xzcat screeninvader_0.9.dd.xz > /dev/sdX // xz-utils 

## Starting VM with qemu

 - qemu-system-x86_64 -sdl -soundhw ac97 -sdl -enable-kvm -hda screeninvader_0.9.dd -net user,hostfwd=tcp::5555-:80,hostfwd=tcp::5556-:22 -net nic -m 256
 - sshfs -o sshfs_debug root@localhost:/ screeninvader -p 5556 // mount image 
 
# Client Side Development requirements
 - npm install -g yo 
 - Change working directory to screeninvader-theme
 - npm install
 - bower install 
 - grunt serve // Starts client side server
 - Chrome extension for [Cross-origin resource sharing]( https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) for Client side Development 

Change the server IP in /app/scripts/services/janoshdriver.js

