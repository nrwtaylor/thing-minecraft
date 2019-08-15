//const rcon = require('rcon-srcds');
//const server = new Rcon({ port: 25575 });
 
//server.authenticate('test')
//    .then(() => {
//        console.log('Authenticated');
//        return server.execute('status');
//    })
//    .then(console.log)
//    .catch(console.error);

const request = require('request')

const Rcon = require('modern-rcon');
const rcon = new Rcon('localhost', 'test');

var tick_interval = 15000; // 15 second tick
var tick_count = 0;
var bar_count = 0;

setInterval(function(){ doTick();},tick_interval) //logs hi every second

rcon.connect().then(() => {
  return rcon.send('say Edna has connected.'); // That's a command for Minecraft
}).then(res => {
  console.log(res);
}).then(() => {
  //return rcon.disconnect();
});

var fs = require("fs");
var filePath = "/opt/minecraft/server/logs/latest.log";
var file = fs.readFileSync(filePath);

console.log(file);

Tail = require('tail').Tail;

tail = new Tail(filePath);

//when a new line appears do this
tail.on("line", function(data) {
    //  console.log(data);
    //rcon.send('say Greetings');

    var  scrap = data.split("]: ");
    var a =scrap[1].split(">");
    var player_name = "world";
    var subject = a[0].substr(0);
    var query = a[1];

    if (typeof query !== 'undefined' && query !== null){
        var subject = a[1].substr(1);
        var player_name = a[0].substr(1);
    }

    console.log("subject " + subject);
    console.log("player_name " + player_name);

    if (player_name == "Rcon") {return;} 

    if (player_name == "world") {

        if (subject.includes('UUID of ')) {
            rcon.send('say heard entity id');
            return;
        }

        if (subject.includes('logged in with entity id')) {
            console.log('login spotted');
            rcon.send('say logged in');
            return;
        }

        if (subject.includes('joined the game')) {
            console.log('joined the game');
            rcon.send('say Joined.');
            return;
        }

        if (subject.includes('was slain by')) {
            rcon.send('say That is unfortunate.');
            return;
        }


        if (subject.includes('left the game')) {
            console.log('left the game');
            rcon.send('say Left.');
            return;
        }

        //rcon.send('say heard world chatter');
        return;
    }

    // Spot keywords in messages.
    var match = false

    if (subject.toLowerCase().includes('edna')) {
      console.log("Saw a request for edna");
      var ret = subject.replace(/edna/g,'');
      match = true;
    }

    if (subject.toLowerCase().includes('ednabot')) {
      console.log("Saw a request for ednabot");
      var ret = subject.replace(/edna/g,'');
      match = true;
    }

    if (subject.includes('[Rcon]')) {
      // Ignore instructions from Rcon.
      // Since these will be from this code.
      return;
    }



    if (match == false) {return;}

/* Check for system 
[00:44:38] [Server thread/INFO]: Player2 lost connection: Disconnected
[00:44:38] [Server thread/INFO]: Player2 left the game
[00:52:02] [Server thread/INFO]: player1 lost connection: Disconnected
[00:52:02] [Server thread/INFO]: player1 left the game
[01:24:21] [User Authenticator #18/INFO]: UUID of player player1 is a4e3ac12-3e18-4a9b-b554-5519572227f6
[01:24:21] [Server thread/INFO]: player1[/192.168.0.1:12345] logged in with entity id 543249 at (-43.329160948779915, 60.0, -117.72683698862112)
*/


    ret = ret.trim();

    if (player_name == "world") {
        rcon.send('say world message heard');
        return;
    }



    var response = "say heard " + ret;

    console.log("ret" + ret);

    switch(true) {
        case (ret == ""):
            rcon.send('say hey');
            return;

        case (ret == "call crow"):
            callCrow();
            return;

        case (ret == "call bob"):
            callCrow();
            return;

        case (ret == "crow"):
            doCrow();
            rcon.send('say Bob appeared. Somewhere.');
            return;

        case (ret == "select"):
            doSelect();
            return;

        default:
            // code block
    }

    callStack(ret);

});

function doCrow() {

    makeCrow();

}

function doSpawn() {
    $type = "friend";
    rcon.send("say Welcome " + $type + ".");
}

function makeCrow() {

    rcon.send('summon parrot ~ ~1 ~ {CustomName:"\"Bob\"", CustomNameVisible:1, NoAI:0, Variant: 4}');
    // tp @e[name=Bob] ~ ~ ~1

}

// effect give @p wither 99999
function doNuuid() {


}


function callStack(command, callback) {
    command = command.trim();
    request.get('https://stackr.ca/api/redpanda/thing', {
    }, (error, res, body) => {
        if (error) {
            console.log("Error getting stackr");
            return
        }

  var jsonObject = JSON.parse(body);
  var thing_uuid = jsonObject['thing']['uuid'];
//console.log(command);
  parse(thing_uuid , command, function( val ) {
         newData = val;

rcon.send("say " + val);

//callback(val);
console.log(val);

//         callback(val);

         //console.log( "newData : " , newData );
         //console.log( "this happens last" );
         // if you need to return anything, return it here. Do everything else you want to do inside this parse function.
        // return res.sendStatus( 200 );
    } );
})


function parse( out , command, callback ){

  request.get('https://stackr.ca/thing/' + out + '/to/agent/subject/' + command, {
//  json: {
//    msisdn: 'null',
//    to: 'null',
//    text: 'Buy the milk',
//  }
  }, (error, res, body) => {
    if (error) {
      console.error(error)
      return
    }

  $search_string = '<div class="blob">sms<br>';
  var  scrap = body.split($search_string);
//console.log(scrap);
  var a =scrap[1].split("<br>");
  console.log(a[0]);
  callback(a[0]);
  })
}

}

function callCrow() {

    rcon.send("tp @e[name=Bob] @p");
    rcon.send("say Called Bob.");

}


function doSelect() {

    // devstack
    // Select entities within the radius of a specific entity.

    rcon.send("scoreboard objectives add selectMe dummy");

//rcon.send("say selected");
//Then, on a fast redstone clock, give all entities a selectMe score of 1:
//rcon.send("scoreboard players set @e selectMe 1");
//Give all players and items a selectMe score of 0 with these two command blocks:
//rcon.send("scoreboard players set @e[type=Player] selectMe 0");
//rcon.send("scoreboard players set @e[type=Item] selectMe 0");
//Now, you can select them by targeting all entities within a 50 block radius that have a selectMe score of 1:
//rcon.send("say @e[score_selectMe_min=1,r=50]");

     rcon.send("say Selected.");
}

function doStart() {

    rcon.send("say Ticking.");

}

function doTick() {

if (tick_count == 0) {
    // Start
    doStart();
}


tick_count +=1;
if (tick_count > 4) {tick_count = 1; doBar();}

}

function doBar() {

bar_count += 1;
//rcon.send("say Bar " + bar_count + ".");
var announcements = ['Merp.', 'Foo.','Bar.','Meh.','Ping.'];
var announcement = announcements[Math.floor(Math.random()*announcements.length)];

if ((bar_count % 7) == 0) {
   // doAnnouncement(announcement);
    callStack(announcement);
}

//bar_count += 1;
if (bar_count > 80) {bar_count = 0;}

}

function doAnnouncement(text) {

rcon.send("say " +text);

}
