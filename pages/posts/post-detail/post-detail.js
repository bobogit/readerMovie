// pages/posts/post-detail/post-detail.js

var postsData = require("../../../data/posts-data.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var postId = options.id;

    this.data.postId = postId;

    var postData = postsData.postList[postId];
    this.setData(postData);

    /*
      var postsCollected = {
        1: "true",
        2: "false",
        3: "true",
        ...
      }

    */

    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      if(postCollected) {
        this.setData({
          collected: postCollected
        })
      }
      
    }else{
      postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }

  },

  onCollectionTap: function(event) {
    var postsCollected = wx.getStorageSync('posts_collected');

    var postId = this.data.postId;

    var postCollected = postsCollected[postId];
    postCollected = !postCollected;
    postsCollected[postId] = postCollected;
    wx.setStorageSync('posts_collected', postsCollected);

    this.setData({
      collected: postCollected
    })
  }


})