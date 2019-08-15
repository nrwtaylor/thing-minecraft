//var test = "[23:18:54] [Server thread/INFO]: <InsaneMasquerade> ah";
//var test = "[23:19:06] [Server thread/INFO]: <dragon_willow> ye";
//var test = "[23:19:19] [Server thread/INFO]: <InsaneMasquerade> wanna start making a little village?";
//var test = "[23:19:30] [Server thread/INFO]: <dragon_willow> I was thinking of using it for animals";


//var test = "[01:45:10] [Server thread/INFO]: <dragon_willow> yay";
//var test = "[01:45:13] [Server thread/INFO]: <InsaneMasquerade> eclipse";
var test = "[01:45:19] [Server thread/INFO]: <dragon_willow> Imma start taking Kisa with me";
//var test = "[01:46:35] [Server thread/INFO]: dragon_willow was slain by Zombie";
//var test = "[01:47:22] [Server thread/INFO]: InsaneMasquerade lost connection: Timed out";
//var test = "[01:47:22] [Server thread/INFO]: InsaneMasquerade left the game";
//var test = "[01:47:43] [User Authenticator #8/INFO]: UUID of player InsaneMasquerade is fc8fac7e-62c4-4ebe-9b3e-1b2a876f8ccb";
//var test = "[01:47:43] [Server thread/INFO]: InsaneMasquerade[/24.80.45.81:51100] logged in with entity id 48773 at (45.866407712123284, 78.23152379758702, -137.88292986751827)";
//var test = "[01:47:43] [Server thread/INFO]: InsaneMasquerade joined the game";



//var s = test.split("]");
var datagram = test;
var parts = datagram.split("]: ");

var s = parts[1].split(">");

var query = s[1];

//var subject = "undefined";
var player_name = "world";
var subject = s[0].substr(0);

if (typeof query !== 'undefined' && query !== null){
   var subject = s[1].substr(1);
   var player_name = s[0].substr(2);
}

var s = parts[0].split("] [");

var time_stamp = s[0].substr(1);
var log_text = s[1].substr(0);

console.log(time_stamp);
console.log(log_text);
console.log(player_name);
console.log(subject);
