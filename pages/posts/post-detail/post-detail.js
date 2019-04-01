// pages/posts/post-detail/post-detail.js

var postsData = require("../../../data/posts-data.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic : false
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
      if (postCollected) {
        this.setData({
          collected: postCollected
        })
      }

    } else {
      postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }

    var that = this;
    wx.onBackgroundAudioPlay(function(){
      that.setData({
        isPlayingMusic: true
      })
    });

    wx.onBackgroundAudioPause(function(){
      that.setData({
        isPlayingMusic: false
      })
    });

    wx.onBackgroundAudioStop(function(){
      that.setData({
        isPlayingMusic: false
      })
    });

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

    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      duration: 2000
    })

  },

  onShareTap: function(event) {

    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ];

    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405F80",
      success: function(res) {
        //res.tabIndex 数组元素的序号,从0开始
        //res.cancel 用户是否点击了取消按钮
        wx.showModal({
          title: '用户分享到了' + itemList[res.tapIndex],
          content: '现在无法实现分享功能',
        })
      }
    })
  },

  onMusicTap: function(event){

    var isPlayingMusic = this.data.isPlayingMusic;
  
    if(isPlayingMusic) {
      wx.pauseBackgroundAudio();

    }else{
      wx.playBackgroundAudio({
        dataUrl: this.data.music.url,
        title: this.data.music.title,
        coverImgUrl: this.data.music.coverImg
      })
    }
  
    this.setData({
      isPlayingMusic: !isPlayingMusic
    })
   
  }


})