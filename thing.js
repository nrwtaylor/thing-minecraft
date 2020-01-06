// Updated January 6, 2020

var fs = require('fs');

var Rcon = require('rcon');

const var_dump = require('var_dump');

var gearmanode = require('gearmanode');

// Turn off Gearman node debug
//winston = require('winston');
//for (key in winston.loggers.loggers) {
//    winston.loggers.loggers[key].clear();
//}

const uuidv4 = require('uuid/v4');
//uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

winston = require('winston');
for (key in winston.loggers.loggers) {
    winston.loggers.loggers[key].remove(winston.transports.Console);
}

var conn = new Rcon('localhost', 25575, 'test');
conn.on('auth', function() {
    console.log("Authed!");

}).on('response', function(str) {
    console.log("Got response: " + str);
    var thing = doMeta(null, str);
    doThing(thing);
}).on('end', function() {
    console.log("Rcon Socket closed.");
    process.exit();
});

conn.connect();

const request = require('request')

var time_minecraft;

var tick_interval = 15000; // 15 second tick
var tick_count = 0;
var bar_count = 0;

var magic_word = "merp";

setInterval(function() {
    thing = {
        uuid: uuidv4(),
        subject: "Tick",
        player_name: "edna",
        to: "tick"
    }
    doTick(thing, null);
}, tick_interval) //logs hi every second


var fs = require("fs");
var filePath = "/opt/minecraft/server/logs/latest.log";
var file = fs.readFileSync(filePath);

console.log("Reading minecraft server log. X");

//console.log(file);

Tail = require('tail').Tail;

tail = new Tail(filePath);

//when a new line appears do this
tail.on("line", function(agent_input) {

console.log(agent_input);

    var thing = doMeta(null, agent_input);
console.log(thing);
    doThing(thing, agent_input);

});

function doMeta(thing, agent_input = null) {
console.log(agent_input);
    thing = {};

    if (typeof thing.uuid !== 'undefined') {

    } else {
        thing.uuid = uuidv4();
    }

    var nuuid = thing.uuid.substring(1, 4);

    var scrap = agent_input.split("]: ");

    var player_name = "world";
    var subject = null;

    thing.subject = scrap[0];

    if (scrap[1] != undefined) {

        var a = scrap[1].split(">");

        thing.subject = a[0].substr(0);

        var temp = scrap[1].split(" ");
        thing.player_name = "world";
        if (temp[0] == "[Rcon]") {
            thing.player_name = "rcon";
            thing.subject.replace("[Rcon] ", "");
        }

        var query = a[1];

        if (typeof query !== 'undefined' && query !== null) {
            thing.subject = a[1].substr(1);
            thing.player_name = a[0].substr(1);
        }
    }

    thing.created_at = process.hrtime();

    return thing;

}

function doThing(thing, agent_input = null) {

    var magic_word = "merp";
    console.log(thing);

    if (typeof thing.uuid !== 'undefined') {
        //    if (!isset(thing.uuid)) {
    } else {
        thing.uuid = uuidv4();
    }

    var subject = thing.subject;
    var player_name = thing.nom_from;

    console.log(thing.uuid);
    thing.nuuid = thing.uuid.substring(1, 4);

    console.log("subject " + thing.subject);
    console.log("player_name " + thing.player_name);

    if (thing.player_name == "rcon") {


        if (!thing.subject.includes(magic_word)) {
            console.log("Ignored a rcon command.");
            //    console.log('Test command spotted.');
            //     rcon.send('say TJoined.');
            return;
        }
    }
    if (thing.player_name == null) {
        thing.player_name = "world";
    }

    if (thing.subject == null) {
        return;
    }

    console.log("Datagram forwarded to Agent.");


    if (thing.player_name == "world") {

if (thing.subject) {
doGearman(thing, "minecraft quiet " +thing.subject);
}

        if (thing.subject.includes('UUID of ')) {

            //           matches = subject.match(/listings\/([A-F\d-]+)\?/);
            matches = thing.subject.match(/([0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12})/);

            var player_uuid = matches[1];

            console.log('Saw uuid ' + player_uuid);
            doCommand(thing, 'say heard entity id');
            doPlayer(thing, player_uuid);
            //    doLog(player_uuid);
            return;
        }


        if (thing.subject.includes('lost connection: Timed out')) {
            //console.log('login spotted');
            //rcon.send('say logged in');
            return;
        }

        if (thing.subject.includes('The time is')) {
            console.log('time spotted');
time_minecraft = thing.subject.replace('The time is ', '');

//doGearman(thing, "minecraft " + time_minecraft);
//            doCommand(thing, 'say ' + time_minecraft);
            return;
        }

//There are 1 of a max 20 players online: dragon_willow
        if (thing.subject.includes('players online')) {
console.log('saw player list');
            console.log(thing.subject);
//doGearman(thing, "minecraft " +thing.subject);
            //doCommand(thing, 'say Left.');
            return;
        }



        if (thing.subject.includes('lost connection: Disconnected')) {
            //console.log('login spotted');
            //rcon.send('say logged in');
            return;
        }


        if (thing.subject.includes('logged in with entity id')) {
            console.log('login spotted');
            doLog(thing, player_name);
            doCommand(thing,'say logged in');
            return;
        }

        if (thing.subject.includes('joined the game')) {
            console.log('joined the game');
            doCommand(thing,'say Joined.');
            return;
        }

        if (thing.subject.includes('Gave')) {
            console.log('Saw ' + subject);
            doCommand(thing,'say Gift made.');
            return;
        }

        if (thing.subject.includes('Teleported')) {
            console.log('Saw ' + subject);
            doCommand(thing,'say Teleportation heard.');
            return;
        }


        if (thing.subject.includes('Summoned')) {
            console.log('Saw ' + subject);
            doCommand(thing, 'say Summoned.');
            return;
        }


        if (thing.subject.includes('was burnt to a crisp whilst fighting')) {
            doCommand(thing, 'say Still smouldering.');
            return;
        }

        if (thing.subject.includes('was shot by')) {
            doCommand(thing, 'say Ouch.');
            return;
        }


        if (thing.subject.includes('was slain by')) {
            doCommand(thing, 'say That is unfortunate.');
            return;
        }

        if (thing.subject.includes('was shot by')) {
            doCommand(thing, 'say That makes me sad.');
            return;
        }


        if (thing.subject.includes('left the game')) {
            console.log('left the game');
            doCommand(thing, 'say Left.');
            return;
        }

        // Check the magic word.
        if (!thing.subject.includes(magic_word)) {
            console.log("Ignored a world message. - " + thing.subject);
            return;
        }

    }

    // Do we recognize this user.

    //

    console.log("Processing subject - " + thing.subject);

        console.log(thing);

    // Spot keywords in messages.
    var match = false

    if (thing.subject.toLowerCase().includes('edna')) {
        console.log("Saw a request for edna");
        var filtered_input = thing.subject.replace(/edna/g, '');
        match = true;
    }

    if (thing.subject.toLowerCase().includes('ednabot')) {
        console.log("Saw a request for ednabot");
        var filtered_input = thing.subject.replace(/edna/g, '');
        match = true;
    }

    if (this.player_name == "rcon") {

        if (!thing.subject.includes(magic_word)) {
            console.log("Saw a Rcon message. And ignored it.");
            return;
        }

        //        var filtered_input = subject.replace(/[Rcon]/g,'');
        var filtered_input = thing.subject.replace('[Rcon]', '');

    }


    if (match == false) {
        return;
    }

    console.log("Responding to subject: " + thing.subject);

    // Used https://www.uuidgenerator.net/version4 for the UUID.
    /* Check for system 
    [00:44:38] [Server thread/INFO]: Player2 lost connection: Disconnected
    [00:44:38] [Server thread/INFO]: Player2 left the game
    [00:52:02] [Server thread/INFO]: player1 lost connection: Disconnected
    [00:52:02] [Server thread/INFO]: player1 left the game
    [01:24:21] [User Authenticator #18/INFO]: UUID of player player1 is e9b607a1-4b28-471b-973e-426e15209add
    [01:24:21] [Server thread/INFO]: player1[/192.168.0.1:12345] logged in with entity id 543249 at (-43.329160948779915, 60.0, -117.72683698862112)
    */


    filtered_input = filtered_input.trim();

    if (thing.player_name == "world") {
        doWorld(thing, agent_input);
        console.log('Hook for world messages needing a response.');



        // magic word for testing from rcon
        if (!thing.subject.includes(magic_word)) {
            return;
        }

        var filtered_input = subject.replace(magic_word, '');

    }

    filtered_input = filtered_input.trim();

    //console.log("Preparing response to " + filtered_input);

    thing.response = "say heard " + filtered_input;

    console.log("filtered_input " + filtered_input);

    var ngrams = getNgrams(filtered_input, 3);
    ngrams = ngrams.concat(getNgrams(filtered_input, 2));
    ngrams = ngrams.concat(getNgrams(filtered_input, 1));


    //console.log(ngrams);
    var match = false;
    ngrams.forEach(function(ngram) {
        //console.log("Checking " + ngram);


        switch (ngram) {

            case "call crow":
                callCrow(thing);
                match = true;
                break;

            case "call bob":
                callCrow(thing);
                match = true;
                break;

            case "crow":
                doCrow(thing);
                match = true;
                break;

            case "select":
                doSelect(thing);
                match = true;
                break;

            case "time":
                doTime(thing);
                match = true;
                break;

            case "tp":
                doCommand(thing, "spreadplayers ~ ~ 1 1000 true @p");
                match = true;
                break;


            default:
                // code block
        }

    });

    if (match != true) {

        console.log("Sent message to stack - " + filtered_input);
        //thing.response = doStack(thing, filtered_input);
        thing.response = doGearman(thing, filtered_input);

        console.log(thing.response);
    }
}


function getNgrams(input, n = 3) {
    //$words = explode(' ', $input);
    var words = input.split(" ");
    ngrams = [];

    for (var key = 0, len = words.length; key < len; key++) {

        if (key < (words.length - (n - 1))) {
            ngram = "";
            for (var i = 0; i < n; i++) {
                if (i != 0) {
                    ngram += " ";
                }
                ngram += words[key + i];
            }
            ngrams.push(ngram);
        }
    }
    return ngrams;
}

function doLog(thing, agent_input = null) {
return;
    var stream = fs.createWriteStream("users.txt", {
        flags: 'a'
    });
    console.log(new Date().toISOString());
    [...Array(10000)].forEach(function(item, index) {
        //	    stream.write(index + "\n");
        stream.write(agent_input + "\n");

    });
    console.log(new Date().toISOString());
    stream.end();

}

function doCrow(thing, agent_input = "Bob") {

    makeCrow(thing, agent_input);

}

function doSpawn(thing, agent_input = null) {
    $type = "friend";
    doCommand(thing, "say Welcome " + $type + ".");
    console.log("Did spawn.");
}

function makeCrow(thing, agent_input = "Bob") {

    console.log("Made crow.");

    var name = thing.nuuid; // nuuid
    var tags = "Bob"; // nuuid 

    //    var customname = '\{"text":"Bob"\}';
    var customname = '\{"text":"' + agent_input + '"\}';


    //    var command = "summon minecraft:parrot ~ ~ ~ {Invulnerable:0b,CustomNameVisible:0b,Tags:[\"4fe3\"],CustomName:\"{\"text\":\"Bob\"}\"}";
    var command = 'summon minecraft:parrot ~ ~ ~ {Invulnerable:0b, CustomNameVisible:0b, Tags:["' + tags + '"]' + ', CustomName:' + customname + '}';

    doCommand(thing, command);


    //    console.log("end makeCrow: " + t);

}

// effect give @p wither 99999
function doNuuid(thing, agent_input) {


}

function doCommand(thing, agent_input) {

    //var text = "say \"hello\"";

    conn.send(agent_input);

}

// Non local stack
function doStack(thing, agent_input, callback) {
    command = agent_input.trim();
    request.get('https://stackr.ca/api/redpanda/thing', {}, (error, res, body) => {
        if (error) {
            console.log("Error getting stackr");
            return
        }

        var jsonObject = JSON.parse(body);
        var thing_uuid = jsonObject['thing']['uuid'];

        parse(thing_uuid, command, function(val) {
            newData = val;
            if (val == null) {
                return;
            }
            doCommand(thing, "say " + val);
        })

    })

    function parse(out, command, callback) {

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
            var scrap = body.split($search_string);


            if (scrap[1] === undefined) {
                callback(null);
                return;
            }



            var a = scrap[1].split("<br>");
            callback(a[0]);
        })
    }

}

function doGearman(thing, agent_input, callback) {
    var command = agent_input.trim();

    var agent_name = "edna";

    var client = gearmanode.client();
    var match = true;

    var from = "agent"
    var to =  "<private>"
    var subject = command

    console.log('Heard, "' + subject + '"')


    console.log("to " + to + " from " + from + " subject " + subject + " agent_input " + agent_input + " match " + match);

    if (match == false) {return;}

    var arr = {"from":from,"to":to,"subject":subject} 
    var datagram = JSON.stringify(arr) 

    try {
        var job = client.submitJob('call_agent', datagram);
    }

    catch (e) {
        console.log(e);


       var sms = "quiet"
       var message = "Quietness. Just quietness."
    }


    job.on('workData', function(data) {
    //    console.log('WORK_DATA >>> ' + data);
    });

    job.on('complete', function() {
//console.log("Gearman response completed.");
      sms = "sms"
      message = "sms"

      try {
        var thing_report = JSON.parse(job.response);
        var sms = thing_report.sms
        var message = thing_report.message
      }

      catch (e) {
        console.log("Error parsing Gearman response.");
        var sms = "quiet"
        var message = "Quietness. Just quietness."
      }

//      var sms = thing_report.sms
//      var message = thing_report.message
console.log("to " + to);
console.log("sms " + sms);

//sms = linkifyHtml(sms, {
//  defaultProtocol: 'http'
//});

if (sms == null) {sms = agent_name.toUpperCase() + " | ?";}

//var response = [[0, sms]]; 
//var response = [[sms]]; 
//var_dump(response);

    if (!sms.toLowerCase().includes('no response.')) {

//    if (!response[0][0].toLowerCase().includes('ack.')) {

//    doCommand(thing, "say " + response);

    doCommand(thing, "say " + sms);

}


    client.close();

      return

    });



//    console.log(sms);
//    console.log(message);

//if (sms == null) {sms = agent_name.toUpperCase() + " | ?";}
//var response = [[0, sms]]; 
//var_dump(response);


//    doCommand(thing, "say " + response);

//    client.close();

}


function callCrow(thing) {

    //doStack(thing, "crow");
doGearman(thing, "crow");
    doCommand(thing, "tp @e[name=Bob] @p");
    doCommand(thing, "say Called Bob.");

}


function doSelect(thing) {

    // devstack
    // Select entities within the radius of a specific entity.

    doCommand(thing, "scoreboard objectives add selectMe dummy");

    //rcon.send("say selected");
    //Then, on a fast redstone clock, give all entities a selectMe score of 1:
    //rcon.send("scoreboard players set @e selectMe 1");
    //Give all players and items a selectMe score of 0 with these two command blocks:
    //rcon.send("scoreboard players set @e[type=Player] selectMe 0");
    //rcon.send("scoreboard players set @e[type=Item] selectMe 0");
    //Now, you can select them by targeting all entities within a 50 block radius that have a selectMe score of 1:
    //rcon.send("say @e[score_selectMe_min=1,r=50]");

    doCommand(thing, "say Selected.");
}

function doStart(thing, agent_input = null) {

    doCommand(thing, "say Ticking.");
    //
    doPlayer(thing, thing.player_uuid);

}

function doTick(thing, agent_input = null) {
console.log("Tick " + tick_count);
doGearman(thing, "minecraft thing tick " + tick_count);
    if (tick_count == 0) {
        // Start
        doStart(thing, agent_input);
    }

    tick_count += 1;
    if (tick_count > 4) {
        tick_count = 1;
        doBar(thing, agent_input);
    }

}

function doTime(thing, agent_input = null) {

    //Asked for the time: undefined
    //Got response: The time is 21308


    var t = doCommand(thing, "time query daytime");
    doCommand(thing, "say " + t);

    console.log("Asked for the time: " + t);
    return;

}

function doBar(thing, agent_input = null) {
console.log("Bar " + bar_count);
doGearman(thing, "minecraft thing bar " + bar_count);

    bar_count += 1;
    //rcon.send("say Bar " + bar_count + ".");
    var announcements = ['Merp.', 'Foo.', 'Bar.', 'Meh.', 'Ping.'];
    var announcement = announcements[Math.floor(Math.random() * announcements.length)];

doCommand(thing, 'list');
doCommand(thing, "time query daytime");
doGearman(thing, "THING " + "66ad");

//doCommand(thing, "locate");
//doCommand(thing, "me");



    if ((bar_count % 7) == 0) {

      //  doStack(thing, announcement);
doGearman(thing, announcement);
    }

    //bar_count += 1;
    if (bar_count > 80) {
        doCommand(thing, "say Ticking.");

        bar_count = 0;
    }

}

function doAnnouncement(thing, agent_input = null) {
    doCommand(thing, "say " + agent_input);
}

// State pattern. Edna is awake. Edna is working. Edna is on their way home. Edna is at Place.

// Need to check the uuid to assign trust.

function doWorld(thing, agent_input) {

    doCommand(thing, 'say world message heard');

}

function doPlayer(thing, agent_input) {

$file = '/home/nick/codebase/thing-minecraft/STACK';
    fs.readFile($file, 'utf8', function(err, contents) {
        if (err) throw err;
        var array = contents.toString().split("\n");
        for (i in array) {
            if (agent_input == array[i]) {
                console.log("Trusted.");
            }
            //console.log(array[i]);
        }
        console.log("Printing STACK.");
        console.log(contents);
    });

    var data = "\n!" + agent_input;
    // append data to file
    fs.appendFile($file, data, 'utf8',
        // callback function
        function(err) {
            if (err) {
 console.log("Stack error." );
return;
}
//if (err) throw err;
            // if no error
            console.log("Added thing to stack.")
        });




    console.log('after calling readFile');

    // For now expect a UUID.
    // Check that against seen UUIDs
    // Say either "Trusted." or "Walking."
    doLog(thing, agent_input);

}
