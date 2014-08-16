Setup
==================

The receiver component of our cast framework is a single file. (js/framework/CastFramework.js)

You can easily include it in your own HTML page just like you would include any javascript file:
```
<script src="path/to/CastFramework.js"></script>
```
Then, you need to add the following javascript to your page (or include it in a separate file):
```js
$(CastFramework).ready(function() {
    CastFramework.start('urn:x-cast:com.yourpackage.name');
});
```
At this point, you will have a working chromecast receiver....except it won't actually do anything.

Listening for commands
======================

Our framework works using commands. All messages between the devices and the chromecast are json objects that look like this:
```js
{
  command: 'doSomething',
  content: {} // arbitrary JSON obj
}
```
Inside the ready function we made earlier, add the following to listen for the 'doSomething' command:
```js
$(CastFramework).on("doSomething", function(event, clientId, content) {
  // clientId is the device that sent the message
  // content is the arbitrary JSON obj sent in the original message
  // your logic goes here
}
```
Just add one of these event listeners for each command the receiver is listening for, and you're good to go!

Sending/Broadcasting Messages
=============================

Send a message to a particular device:
```js
CastFramework.sendMessage(clientId, "doSomething", content);
// clientId is the device you are sending the message to
// the second argument is the command
// content is the arbitrary JSON obj that you are sending
```
Or send to all connected devices:
```js
CastFramework.broadcastMessage('doSomething', content);
```

And that's it! Yes, it is really that simple. Take a look at our sample applications to see it in action.
