var https = require('https');

exports.handler = function (event, context, callback) {
  // Send the entire raw message to Pushover.
  // Real code would use an RFC2822 parser such as 
  // https://github.com/andris9/mailparser
  var message = event.data;
  
  var options = {
    hostname: "api.pushover.net",
    port: 443,
    path: "/1/messages.json?token=<MYTOKEN>&user=<MYUSER>" 
      + "&message=" + encodeURIComponent(message)
      + "&title=" + encodeURIComponent("HAProxy Alert"),
    method: "POST"
  };
  var req = https.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function () {});
    res.on('end', function () {
      callback(res.statusCode == 200 ? null : "Error");
    });
  });
  req.on('error', callback);
  req.end();
};
