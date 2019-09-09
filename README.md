# Thing-Minecraft

A tool to connect a Minecraft server to the either a local instance of the a Stack-Agent-Thing implementation. Or connect to a cloud-based Stack.

## Getting Started

These instructions will get you a daemon running whihc will monitor Minecraft chat channel and world traffic.

### Prerequisites

Install NodeJS.
Install Minecraft Server.

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running

```
sudo nano /etc/systemd/system/<NAME OF>.service
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

Connect into Minecraft and type 'edna tp'.

## Running the tests

sudo node thing.js
Watch output and confirm RCON connection is established.

### Break down into end to end tests

Connects to the localhost RCON and sends a Minecraft command. Outputs minecraft chat channel traffic.

```
[Rcon] Ticking.
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [![npm](https://img.shields.io/npm/v/rcon.svg)](https://www.npmjs.com/package/rcon) - RCON connection
* [Stackr](https://stackr.ca/) - Privacy Management

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

This is the first version.

## Authors

* **Nick Taylor** - *Initial work* - [NRW Taylor](https://github.com/nrwtaylor)

See also the list of [contributors](https://github.com/nrwtaylor/contributors) who participated in this project.

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thank you Notch.

