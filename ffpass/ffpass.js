module.exports = function (RED) {
    "use strict";

    const fordApi = require('ffpass')

    function ffpassConfigNode(config) {
        RED.nodes.createNode(this, config);
        this.ford_username = config.ford_username;
        this.ford_password = config.ford_password;
        this.vin = config.vin;
    }
    RED.nodes.registerType("ffpass_config", ffpassConfigNode);

    function ffpassStatus(config) {
        RED.nodes.createNode(this, config);
        this.config = RED.nodes.getNode(config.config);
        const car = new fordApi.vehicle(this.config.ford_username, this.config.ford_password, this.config.vin)

        var node = this;
        node.on('input', async function (msg, send, done) {
            try {
                await car.auth()
            } catch (err) {
                node.warn(err);
                this.status({ fill: "red", shape: "ring", text: "Auth failed" });
                // TODO: Add support for node < 1.0
                done(err)
            }
            this.status({ fill: "green", shape: "dot", text: "Auth successful" });

            try {
                var vehicleData = await car.status()
            } catch (err) {
                node.warn(err);
                this.status({ fill: "red", shape: "ring", text: "Status failed" });
                done(err)
            }
            this.status({ fill: "green", shape: "dot", text: "Status received" });

            msg.payload = vehicleData;
            send(msg);
            /*
            try {
                car.auth().then(() => {
                    node.warn("Auth successful")
                    this.status({fill:"green",shape:"dot",text:"Auth successful"});
                },
                () => {
                    node.warn("Auth failed")
                    this.status({fill:"red",shape:"dot",text:"Auth failed"});
                }).catch((error) => {
                    node.warn(error);
                    this.status({fill:"red",shape:"dot",text:"Auth failed"});
                }).then(() => {
                    car.status().then(vehicleData => {
                        node.warn(vehicleData)
                        this.status({fill:"green",shape:"dot",text:"status successful"});
                        node.send(JSON.stringify(vehicleData));
                    }, status => {
                        node.warn(status)
                        this.status({fill:"red",shape:"dot",text:"Fetching status failed: " + status});
                        node.send(JSON.stringify(status));
                    }).catch((error) => {
                        node.warn(error);
                        this.status({fill:"red",shape:"dot",text:"Fetching status failed"});
                    })
                });
            } catch (error) {
                node.warn(error);
            }
            
            */
        });
    }

    function ffpassIssueCommand(config) {
        RED.nodes.createNode(this, config);
        this.config = RED.nodes.getNode(config.config);
        const car = new fordApi.vehicle(this.config.ford_username, this.config.ford_password, this.config.vin)

        var node = this;
        node.on('input', async function (msg) {
            var command = msg.payload.toLowerCase()
            if (["start", "stop", "lock", "unlock"].indexOf(command) >= 0) {
                // Command is available
                this.status({ fill: "green", shape: "dot", text: "'" + command + "' received." });

                try {
                    await car.auth()
                } catch (err) {
                    node.warn(err);
                    this.status({ fill: "red", shape: "ring", text: "Auth failed" });
                    // TODO: Add support for node < 1.0
                    done(err)
                }
                this.status({ fill: "green", shape: "dot", text: "Auth successful" });

                try {
                    var result = await car.issueCommand(command)
                } catch (err) {
                    node.warn(err);
                    this.status({ fill: "red", shape: "ring", text: "Command failed" });
                    // TODO: Add support for node < 1.0
                    done(err)
                }
                this.status({ fill: "green", shape: "dot", text: "'" + command + "' issued!" });
                
                msg.payload = result;
                node.send(msg);
            } else {
                node.warn(`Command '${command}' is not available! Please use any of ["start", "stop", "lock", "unlock"].`);
            }
        });
    }

    function ffpassLock(config) {
        RED.nodes.createNode(this, config);
        this.config = RED.nodes.getNode(config.config);
        const car = new fordApi.vehicle(this.config.ford_username, this.config.ford_password, this.config.vin)

        var node = this;
        node.on('input', async function (msg) {
            try {
                await car.auth()
            } catch (err) {
                node.warn(err);
                this.status({ fill: "red", shape: "ring", text: "Auth failed" });
                // TODO: Add support for node < 1.0
                done(err)
            }
            this.status({ fill: "green", shape: "dot", text: "Auth successful" });

            try {
                var result = await car.issueCommand("lock")
            } catch (err) {
                node.warn(err);
                this.status({ fill: "red", shape: "ring", text: "Command failed" });
                // TODO: Add support for node < 1.0
                done(err)
            }
            this.status({ fill: "green", shape: "dot", text: "'lock' issued!" });

            msg.payload = result;
            node.send(msg);
        });
    }

    function ffpassUnlock(config) {
        RED.nodes.createNode(this, config);
        this.config = RED.nodes.getNode(config.config);
        const car = new fordApi.vehicle(this.config.ford_username, this.config.ford_password, this.config.vin)

        var node = this;
        node.on('input', async function (msg) {
            try {
                await car.auth()
            } catch (err) {
                node.warn(err);
                this.status({ fill: "red", shape: "ring", text: "Auth failed" });
                // TODO: Add support for node < 1.0
                done(err)
            }
            this.status({ fill: "green", shape: "dot", text: "Auth successful" });

            try {
                var result = await car.issueCommand("unlock")
            } catch (err) {
                node.warn(err);
                this.status({ fill: "red", shape: "ring", text: "Command failed" });
                // TODO: Add support for node < 1.0
                done(err)
            }
            this.status({ fill: "green", shape: "dot", text: "'unlock' issued!" });

            msg.payload = result;
            node.send(msg);
        });
    }

    function ffpassStart(config) {
        RED.nodes.createNode(this, config);
        this.config = RED.nodes.getNode(config.config);
        const car = new fordApi.vehicle(this.config.ford_username, this.config.ford_password, this.config.vin)

        var node = this;
        node.on('input', async function (msg) {
            try {
                await car.auth()
            } catch (err) {
                node.warn(err);
                this.status({ fill: "red", shape: "ring", text: "Auth failed" });
                // TODO: Add support for node < 1.0
                done(err)
            }
            this.status({ fill: "green", shape: "dot", text: "Auth successful" });

            try {
                var result = await car.issueCommand("start")
            } catch (err) {
                node.warn(err);
                this.status({ fill: "red", shape: "ring", text: "Command failed" });
                // TODO: Add support for node < 1.0
                done(err)
            }
            this.status({ fill: "green", shape: "dot", text: "'start' issued!" });

            msg.payload = result;
            node.send(msg);
        });
    }

    function ffpassStop(config) {
        RED.nodes.createNode(this, config);
        this.config = RED.nodes.getNode(config.config);
        const car = new fordApi.vehicle(this.config.ford_username, this.config.ford_password, this.config.vin)

        var node = this;
        node.on('input', async function (msg) {
            try {
                await car.auth()
            } catch (err) {
                node.warn(err);
                this.status({ fill: "red", shape: "ring", text: "Auth failed" });
                // TODO: Add support for node < 1.0
                done(err)
            }
            this.status({ fill: "green", shape: "dot", text: "Auth successful" });

            try {
                var result = await car.issueCommand("stop")
            } catch (err) {
                node.warn(err);
                this.status({ fill: "red", shape: "ring", text: "Command failed" });
                // TODO: Add support for node < 1.0
                done(err)
            }
            this.status({ fill: "green", shape: "dot", text: "'stop' issued!" });

            msg.payload = result;
            node.send(msg);
        });
    }

    RED.nodes.registerType("ffpass-status", ffpassStatus);
    RED.nodes.registerType("ffpass-command", ffpassIssueCommand);
    RED.nodes.registerType("ffpass-lock", ffpassLock);
    RED.nodes.registerType("ffpass-unlock", ffpassUnlock);
    RED.nodes.registerType("ffpass-start", ffpassStart);
    RED.nodes.registerType("ffpass-stop", ffpassStop);
}
