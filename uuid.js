var url = '[18:11:29] [User Authenticator #2/INFO]: UUID of player player3 is 30fe7541-4666-466a-bb32-59cd3a905b3c';



       // var pattern = "|[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}|";

        //preg_match_all($pattern, $input, $m);


//    matches = url.match(/listings\/([A-F\d-]+)\?/),

    matches = url.match(/([0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12})/);
    UUID = matches[1];

console.log(UUID); // F7B519E8-135C-43D0-A35F-764B582EDC48

