const express=require('express');

const routes=express.Router();

const postCtl=require('../controllers/postctl')

const post_model=require('../models/post_model')

routes.get('/add_post',postCtl.add_post)

routes.post('/postsInsertData',post_model.postimage,postCtl.postsInsertData)

routes.get('/view_post',postCtl.view_post)

routes.get("/deletePostRecord/:id",postCtl.deletePostRecord)


module.exports= routes