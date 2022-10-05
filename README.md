# node-red-contrib-ffpass
[![npm](https://img.shields.io/npm/v/node-red-contrib-ffpass)](https://www.npmjs.com/package/node-red-contrib-ffpass)

This module enables you to control your Ford car via the FordPass API within [Node-RED](https://nodered.org/).
You can find the module in the [Node-RED library](https://flows.nodered.org/node/node-red-contrib-ffpass).

## Nodes
### ffpass_config
You can configure your FordPass login details within this node. It's created automatically in the background as soon as you add one of the following nodes. You configure it by double clicking any of said nodes and editing the "config" parameter. There you can also create new configurations. 

### ffpass-status
Doesn't take any input. Fetches the status of the given car via the API and outputs it as `msg.payload`. The status received by the FordPass API is a big json object that contains a lot of data. This could be split into multiple individual nodes in the future to provide easy access to certain fields.

### ffpass-command
This node reads a command from the `msg.payload` dynamically and executes it. The command must be any of `lock, unlock, start, stop`. The output of the command will be written back to `msg.payload`. Not everyone is happy with providing the command dynamically, so there are also individual nodes for each command.

### ffpass-lock
Doesn't take any input. Runs the `lock` command and hence locks the car. The output of the command will be written back to `msg.payload`.

### ffpass-unlock
Doesn't take any input. Runs the `unlock` command and hence unlocks the car. The output of the command will be written back to `msg.payload`.

### ffpass-start
Doesn't take any input. Runs the `start` command and hence starts the engine. The output of the command will be written back to `msg.payload`.

### ffpass-stop
Doesn't take any input. Runs the `lock` command and hence stops the engine. The output of the command will be written back to `msg.payload`.

## ⚠ Important note
This module needs at least Node 14.x to run. Make sure your Node-Red is up to date and runs on a node version >=14.
