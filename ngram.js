
var text = "[Rcon] edna crow";

var ngrams = getNgrams(text, 3);
ngrams = ngrams.concat( getNgrams(text, 2) );
ngrams = ngrams.concat( getNgrams(text, 1) );
//var t = getNgrams("this is a test message", 1);

console.log(ngrams);
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

