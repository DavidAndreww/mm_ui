const { exec } = require('child_process')

const moleculaController = async (req, res) => {
  console.log('Molecula Router')
  let params = req.body.params;
  let returnObj = {}

  let baseurl = "http://3.82.174.132:10101"; 
  let idx = "snowidx";
  let fname = "Count(All())";
  let cmd = "curl -s -k "+baseurl+"/index/"+idx+"/query -X POST --data-binary @"+fname;

  const ls = exec(cmd, function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: '+error.code);
      console.log('Signal received: '+error.signal);
    }
    //console.log('Child Process STDOUT: '+stdout);
    console.log(stdout);
    //console.log('Child Process STDERR: '+stderr);
  });


  ls.on('exit', function (code) {
    console.log('Child process exited with exit code '+code);
  });
}

module.exports = { moleculaController }