const express = require('express');
const app = express();
const port = process.env.PORT || 2000
const { proxy } = require('rtsp-relay')(app);
const handler = proxy({
  // url: `rtsp://syno:1ac0e225a919fadde57f5a9907b6654f@87.104.221.50:555/Sms=3.unicast`,
  url: `rtsp://syno:1ac0e225a919fadde57f5a9907b6654f@10.249.57.5:554/Sms=3.unicast`,
  verbose: false,
  transport: 'tcp',
  additionalFlags: ['-q', '1']
});
app.ws('/api/stream', handler);

app.listen(port, ()=> console.log("Express RTSP server started"));
