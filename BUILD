npm install gearmanode

# Experiencing the io-netty-channel problem
https://gaming.stackexchange.com/questions/316791/how-to-solve-the-io-netty-channel-abstractchannelannotatedconnectexception-co
https://appuals.com/fix-io-netty-channel-abstractchannelannotatedconnectexception-connection-refused-no-further-information-error-on-minecraft/

Rebooted several times. Increased server memory size to 4Gb, Installed 1.15.1.

27 December 2019 - Testing with ncreased memory. 4Gb.

# Install the minecraft server.
 
edna@thing-keybase:/opt/minecraft/server

sudo systemctl status minu


# Create a system service for the node js thing.

/etc/systemd/system/edna.service

[Unit]
Description=Edna Minecraft agent
After=network.target

[Service]
Type=simple
User=minecraft
Group=minecraft
#ProtectSystem=full
#Nice=1
#KillMode=none
#SuccessExitStatus=0 1
#ProtectHome=true
#ProtectSystem=full
#PrivateDevices=true
#NoNewPrivileges=true
#WorkingDirectory=/opt/minecraft/server
ExecStart=/usr/bin/node <path>/thing-minecraft/thing.js
Restart=always
#ExecStart=/opt/minecraft/tools/mcrcon/mcrcon -H 127.0.0.1 -P 25565 -p test start

[Install]
WantedBy=multi-user.target
