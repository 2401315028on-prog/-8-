var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // 本来はviews/hello.jadeが必要ですが、簡易的に文字列を返します
  res.send('Hello Page');
});

module.exports = router;