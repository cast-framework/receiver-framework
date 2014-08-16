(function() {

    // PRIVATE STUFF
    // (You don't need to worry about any of this junk) //

    // properties
    var self = this,
        namespace = "CastFramework";
    var castReceiverManager,
        messageBus;
    
    // init
    function getInstance() {
        log("Getting CastReceiverManager instance");
        castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
        initListeners();
    }
    function setNamespace(msgNamespace) {
         messageBus = castReceiverManager.getCastMessageBus(msgNamespace);
         initMessageListeners();
    };

    // start / stop
    function start() {
        log('Starting Receiver Manager');
        castReceiverManager.start({
            statusText: "Application is starting"
        });
    }
    function stop() {
        window.close();
    }

    // logging
    function setLogLevel(val) {
        log("Setting log level to: " + val)
        cast.receiver.logger.setLevelValue(val);
    }
    function log(msg) {
        console.log(namespace + ": " + msg);
    }

    // listeners
    function initListeners() {
        castReceiverManager.onReady = function(event) {
            log('Received Ready event: ' + JSON.stringify(event.data));
            castReceiverManager.setApplicationState("Application status is ready...");
        };
        castReceiverManager.onSenderConnected = function(event) {
            log('Received Sender Connected event: ' + event.data);
        };
        castReceiverManager.onSenderDisconnected = function(event) {
            log('Received Sender Disconnected event: ' + event.data);
            if(castReceiverManager.getSenders().length == 0) {
                stop();
            }
        };
    };
    // message listeners
    function initMessageListeners() {
        messageBus.onMessage = function(event) {
            log('Message [' + event.senderId + ']: ' + event.data);
            var data = JSON.parse(event.data) || {command: "evt.err", content:"ERROR"};
            log('Triggering \"' + data.command + '\" event with content: ' + data.content);
            //document.dispatchEvent(new CustomEvent(namespace+"."+data.command, {detail:data.content}));
            $(CastFramework).trigger(data.command, [event.senderId, data.content]);
        };
    }
   
    // PUBLIC STUFF
    
    // start / stop
    self.start = function (msgNamespace) {
        setLogLevel(0);
        getInstance();
        setNamespace(msgNamespace);
        start();
    };
    self.stop = function() {
        stop();
    }

    // messages
    self.sendMessage = function(clientId, command, content) {
        var msgObj = {
            command: command,
            content: content
        };
        messageBus.send(clientId, JSON.stringify(msgObj));
    };
    self.broadcastMessage = function(command, content) {
        var msgObj = {
            command: command,
            content: content
        };
        messageBus.broadcast(JSON.stringify(msgObj));
    };
    
}).apply(window.CastFramework = window.CastFramework || {});