var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");

// 【重要】ご自身のMongoDB接続文字列に変更してください
const uri = "mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

router.get('/', async (req, res) => {
    // データベース名'notes'、コレクション名'notes'を指定
    const database = client.db('notes');
    const notes = database.collection('notes');

    // idが2のドキュメントを取得する例
    const query = { id: 2 }; 
    const note = await notes.findOne(query);

    res.json(note);
});

module.exports = router;