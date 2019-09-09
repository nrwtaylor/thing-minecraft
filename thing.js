/*
var Rcon = require('simple-rcon');


var client = new Rcon({
  host: '127.0.0.1',
  port: '25575',
  password: 'test'
}).exec('say hello', function(res) {
  console.log('Server status', res.body);
}).exec('sm_kick somebody', function() {
  client.close();
}).connect();
*/

var fs = require('fs');

var Rcon = require('rcon');

var conn = new Rcon('localhost', 25575, 'test');
conn.on('auth', function() {
  console.log("Authed!");

}).on('response', function(str) {
  console.log("Got response: " + str);

}).on('end', function() {
  console.log("Socket closed!");
  process.exit();

});

conn.connect();

//const rcon = require('rcon-srcds');
/*
const server = new rcon({ host: 'localhost', port:'25575' });


server.authenticate('test')
    .then(() => {
        console.log('Authenticated');
        return server.execute('say Edna connected.');
    })
    .then(() => {
       server.disconnect();
    })
    .then(console.log)
    .catch(console.error);

*/

/*
server.authenticate('test')
    .then(() => {
        console.log('Authenticated');
        return server.execute('status');
    })
    .then(console.log)
    .catch(console.error);
*/
const request = require('request')

//const Rcon = require('modern-rcon');
//const rcon = new Rcon('localhost', 'test', 10000);

var tick_interval = 15000; // 15 second tick
var tick_count = 0;
var bar_count = 0;

var magic_word = "merp";

setInterval(function(){ doTick();},tick_interval) //logs hi every second


var fs = require("fs");
var filePath = "/opt/minecraft/server/logs/latest.log";
var file = fs.readFileSync(filePath);

console.log("Reading minecraft server log.");

//console.log(file);

Tail = require('tail').Tail;

tail = new Tail(filePath);

//when a new line appears do this
tail.on("line", function(data) {

    console.log("\n" + "datagram " + data);
    //  console.log(data);
    //rcon.send('say Greetings');

    var  scrap = data.split("]: ");

var player_name = null;
var subject = data;


if (scrap[1] != undefined) {

    var a =scrap[1].split(">");

    var subject = a[0].substr(0);


    var temp =scrap[1].split(" ");
    var player_name = "world";
    if (temp[0] =="[Rcon]") {
       player_name = "rcon";
       subject = subject.replace("[Rcon] ", "");
    }



//    var subject = a[0].substr(0);
    var query = a[1];

    if (typeof query !== 'undefined' && query !== null){
        var subject = a[1].substr(1);
        var player_name = a[0].substr(1);
    }

}

    console.log("subject " + subject);
    console.log("player_name " + player_name);

    if (player_name == "rcon") {


        if (!subject.includes(magic_word)) {
           console.log("Ignored a rcon command.");
        //    console.log('Test command spotted.');
        
       //     rcon.send('say TJoined.');
            return;
        }


//return;
} 

if (subject == null) {return;}

console.log("Datagram forwarded to Agent.");


// Recognize fingerprints.



    if (player_name == "world") {

        if (subject.includes('UUID of ')) {

//           matches = subject.match(/listings\/([A-F\d-]+)\?/);
              matches = subject.match(/([0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12})/);

            var player_uuid = matches[1];

            console.log('Saw uuid '+ player_uuid);
            doCommand('say heard entity id');
doPlayer(player_uuid);
        //    doLog(player_uuid);
            return;
        }


        if (subject.includes('lost connection: Timed out')) {
            //console.log('login spotted');
            //rcon.send('say logged in');
            return;
        }

 //       if (subject.includes('time is')) {
 //           //console.log('login spotted');
 //           //rcon.send('say logged in');
 //           doMessage("say " + subject);
 //           return;
 //       }


        if (subject.includes('lost connection: Disconnected')) {
            //console.log('login spotted');
            //rcon.send('say logged in');
            return;
        }



        if (subject.includes('logged in with entity id')) {
            console.log('login spotted');
            doLog(player_name);
            doCommand('say logged in');
            return;
        }

        if (subject.includes('joined the game')) {
            console.log('joined the game');
            doCommand('say Joined.');
            return;
        }

        if (subject.includes('Gave')) {
            console.log('Saw ' + subject);
            doCommand('say Gift made.');
            return;
        }

        if (subject.includes('was burnt to a crisp whilst fighting')) {
            doCommand('say Still smouldering.');
            return;
        }

        if (subject.includes('was shot by')) {
            doCommand('say Ouch.');
            return;
        }


        if (subject.includes('was slain by')) {
            doCommand('say That is unfortunate.');
            return;
        }

        if (subject.includes('was shot by')) {
            doCommand('say That makes me sad.');
            return;
        }


        if (subject.includes('left the game')) {
            console.log('left the game');
            doCommand('say Left.');
            return;
        }

        // Check the magic word.
        if (!subject.includes(magic_word)) {
            console.log("Ignored a world message.");
            return;
        }

    }

    // Do we recognize this user.

    //

    console.log("Processing subject.");

    // Spot keywords in messages.
    var match = false

    if (subject.toLowerCase().includes('edna')) {
      console.log("Saw a request for edna");
      var filtered_input = subject.replace(/edna/g,'');
      match = true;
    }

    if (subject.toLowerCase().includes('ednabot')) {
      console.log("Saw a request for ednabot");
      var filtered_input = subject.replace(/edna/g,'');
      match = true;
    }

    if (player_name == "rcon") {

        if (!subject.includes(magic_word)) {
           console.log("Saw a Rcon message. And ignored it.");
            return;
        }

//        var filtered_input = subject.replace(/[Rcon]/g,'');
        var filtered_input = subject.replace('[Rcon]','');

    }


    if (match == false) {return;}

    console.log("Responding to subject: "+ subject);

// Used https://www.uuidgenerator.net/version4 for the UUID.
/* Check for system 
[00:44:38] [Server thread/INFO]: Player2 lost connection: Disconnected
[00:44:38] [Server thread/INFO]: Player2 left the game
[00:52:02] [Server thread/INFO]: player1 lost connection: Disconnected
[00:52:02] [Server thread/INFO]: player1 left the game
[01:24:21] [User Authenticator #18/INFO]: UUID of player player1 is e9b607a1-4b28-471b-973e-426e15209add
[01:24:21] [Server thread/INFO]: player1[/192.168.0.1:12345] logged in with entity id 543249 at (-43.329160948779915, 60.0, -117.72683698862112)
*/
/*
rcon.connect().then(() => {
    return;
//  return rcon.send('say Edna has connected.'); // That's a command for Minecraft
}).then(res => {
  console.log(res);
}).then(() => {
//  return rcon.disconnect();
}).catch(function(error) {
  console.log(error);
});
*/


    filtered_input = filtered_input.trim();

    if (player_name == "world") {
        doWorld();
//        doCommand('say world message heard');
        console.log('Hook for world messages needing a response.');
        //return;

        // magic word for testing from rcon
        if (!subject.includes(magic_word)) {
            return;
        }

        var filtered_input = subject.replace(magic_word,'');

    }

    filtered_input = filtered_input.trim();

    //console.log("Preparing response to " + filtered_input);

    var response = "say heard " + filtered_input;

    console.log("filtered_input " + filtered_input);

    var ngrams = getNgrams(filtered_input, 3);
    ngrams = ngrams.concat( getNgrams(filtered_input, 2) );
    ngrams = ngrams.concat( getNgrams(filtered_input, 1) );


//console.log(ngrams);
var match = false;
  ngrams.forEach(function(ngram) {
  //console.log("Checking " + ngram);


    switch(ngram) {
//        case (ngram == ""):
//            rcon.send('say hey');
//            return;

        case "call crow":
            callCrow();
match = true;
            break;

        case "call bob":
            callCrow();
match = true;
            break;

        case "crow":
            doCrow();
match = true;
            //doMessage('say Bob appeared. Somewhere.');
            break;

        case "select":
            doSelect();
match = true;
            break;

        case "time":
            doTime();
match = true;
//            doCommand("say asked for the time");
            break;

        case "tp":
            doCommand("spreadplayers ~ ~ 1 1000 true @p");
match = true;
            break;


        default:
            // code block
    }

});

if (match != true) {

    console.log("Sent message to stack.");
    var response = doStack(filtered_input);
    console.log(response);
}
});


    function getNgrams(input, n = 3) {
        //$words = explode(' ', $input);
        var words = input.split(" ");
        ngrams = [];

       for (var key = 0, len = words.length; key < len; key++) {

  //someFn(arr[i]);

//}
//        words.forEach(function (value) {
//  someFn(item);
//})

//        foreach (words as $key=>$value) {

            //if ($key < count($words) - ($n - 1)) {
            if (key < ( words.length - (n - 1) ) ) {
                ngram = "";
                for (var i = 0; i < n; i++) {
if (i != 0) {ngram += " ";}
                    ngram +=  words[key + i] ;
                }
//ngram.trim();
//console.log("- " + ngram);
                ngrams.push(ngram);
            }
        }
        return ngrams;
    }

function doLog(text) {

	var stream = fs.createWriteStream("users.txt", {flags:'a'});
	console.log(new Date().toISOString());
	[...Array(10000)].forEach( function (item,index) {
//	    stream.write(index + "\n");
            stream.write(text + "\n");

	});
	console.log(new Date().toISOString());
	stream.end();

}

function doCrow() {

    makeCrow();

}

function doSpawn() {
    $type = "friend";
    doCommand("say Welcome " + $type + ".");
}

function makeCrow() {

    console.log("start makecrow");

//    var command = "summon minecraft:parrot ~ ~ ~ {Invulnerable:0b,CustomNameVisible:0b,Tags:[\"4fe3\"],CustomName:\"{\"text\":\"Bob\"}\"}";
    var command = "summon minecraft:parrot ~ ~ ~";

    doCommand(command);


//    console.log("end makeCrow: " + t);

}

// effect give @p wither 99999
function doNuuid() {


}

function doCommand(text) {

//var text = "say \"hello\"";

   conn.send(text);

}

function doStack(command, callback) {
    command = command.trim();
    request.get('https://stackr.ca/api/redpanda/thing', {
    }, (error, res, body) => {
        if (error) {
            console.log("Error getting stackr");
            return
        }

    var jsonObject = JSON.parse(body);
    var thing_uuid = jsonObject['thing']['uuid'];

    parse(thing_uuid , command, function( val ) {
        newData = val;
        if (val == null) {return;}
        doCommand("say " + val);
    })

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


    if (scrap[1] === undefined){
        callback(null);
        return;
    }



  var a =scrap[1].split("<br>");
  callback(a[0]);
  })
}

}

function callCrow() {

    doStack("crow");
    doCommand("tp @e[name=Bob] @p");
    doCommand("say Called Bob.");

}


function doSelect() {

    // devstack
    // Select entities within the radius of a specific entity.

    doCommand("scoreboard objectives add selectMe dummy");

//rcon.send("say selected");
//Then, on a fast redstone clock, give all entities a selectMe score of 1:
//rcon.send("scoreboard players set @e selectMe 1");
//Give all players and items a selectMe score of 0 with these two command blocks:
//rcon.send("scoreboard players set @e[type=Player] selectMe 0");
//rcon.send("scoreboard players set @e[type=Item] selectMe 0");
//Now, you can select them by targeting all entities within a 50 block radius that have a selectMe score of 1:
//rcon.send("say @e[score_selectMe_min=1,r=50]");

     doCommand("say Selected.");
}

function doStart() {

    doCommand("say Ticking.");
    //
    doPlayer("e9b607a1-4b28-471b-973e-426e15209add");

}

function doTick() {

if (tick_count == 0) {
    // Start
    doStart();
}

tick_count +=1;
if (tick_count > 4) {tick_count = 1; doBar();}

}

function doTime() {

   var t = doCommand("time query daytime");
   doCommand("say " + t);
//t.then(function(value) {
//  console.log("do Time " +value);
//  rcon.send("say " + value);
  // expected output: "foo"
//});


//   doCommand("time query daytime").then(function(value) {

//  console.log("do Time " +value);
//  rcon.send("say " + value);
  // expected output: "foo"
//});

   console.log("Asked for the time: " + t);
   return;

}

function doBar() {

bar_count += 1;
//rcon.send("say Bar " + bar_count + ".");
var announcements = ['Merp.', 'Foo.','Bar.','Meh.','Ping.'];
var announcement = announcements[Math.floor(Math.random()*announcements.length)];

if ((bar_count % 7) == 0) {
   // doAnnouncement(announcement);
//   rcon.send("time query daytime");


    doStack(announcement);
}

//bar_count += 1;
if (bar_count > 80) {bar_count = 0;}

}

function doAnnouncement(text) {
    doCommand("say " +text);
}

// State pattern. Edna is awake. Edna is working. Edna is on their way home. Edna is at Place.

// Need to check the uuid to assign trust.

function doWorld(text) {

        doCommand('say world message heard');

}

function doPlayer(text) {

fs.readFile('STACK', 'utf8', function(err, contents) {
    if (err) throw err;
    var array = contents.toString().split("\n");
    for(i in array) {
        if (text == array[i]) {console.log("Trusted.");}
        //console.log(array[i]);
    }
    console.log("Printing STACK.");
    console.log(contents);
});

var data = "\n!" + text;
// append data to file
fs.appendFile('STACK',data, 'utf8',
    // callback function
    function(err) { 
        if (err) throw err;
        // if no error
        console.log("Data is appended to file successfully.")
});



 
console.log('after calling readFile');

    // For now expect a UUID.
    // Check that against seen UUIDs
    // Say either "Trusted." or "Walking."
    doLog(text);

}
