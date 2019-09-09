# Thing-Minecraft

A tool to connect a Minecraft server to the either a local instance of the a Stack-Agent-Thing implementation. Or connect to a cloud-based Stack.

## Getting Started

These instructions will get you a daemon running which will monitor Minecraft chat channel and world traffic.

### Prerequisites

Assumes you have NodeJS installed and Minecraft Server. And that you have set up an RCON port in the Minecraft server.properties file.

```
broadcast-rcon-to-ops=true
server-ip=
rcon.port=25575
enable-command-block=false
enable-rcon=true
```

### Installing

A step by step series of examples that tell you how to get a development env running.  In this case with an agent called "edna".

```
sudo nano /etc/systemd/system/edna.service
```

```
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
ExecStart=/usr/bin/node <PATH TO>/thing.js
Restart=on-failure
#ExecStart=/opt/minecraft/tools/mcrcon/mcrcon -H 127.0.0.1 -P 25565 -p test start

[Install]
WantedBy=multi-user.target
```

```
sudo systemctl start edna
```


Connect into Minecraft. Open then chat channel (with "t").
```
edna hey
```

Or try a random teleport.
```
edna tp
```


## Test

Watch output and confirm RCON connection is established. Run in a terminal window.
```
sudo node thing.js
```

Watch for this message to confirm edna is ticking.

```
[Rcon] Ticking.
```


## Deployment

Warn users of edna / rcon traffic through the chat channel.

## Built With

* [![npm](https://img.shields.io/npm/v/rcon.svg)](https://www.npmjs.com/package/rcon) - RCON connection
* [Stackr](https://stackr.ca/) - Privacy Management

## Contributing

Contact the author.

## Versioning

This is the first version.

## Authors

* **Nick Taylor** - *Initial work* - [NRW Taylor](https://github.com/nrwtaylor)

See also the list of [contributors](https://github.com/nrwtaylor/contributors) who participated in this project.

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thank you Notch.
