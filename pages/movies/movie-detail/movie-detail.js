// pages/movies/movie-detail/movie-detail.js

var app = getApp();
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = app.globalData.doubanBase + '/v2/movie/subject/' + options.idx;
    util.http(url, this.processDoubanData);
  },

  processDoubanData: function(data) {

      console.log(data);

      var director = {
        avatar : "",
        name: "",
        id: ""
      }

      if(data.director[0] != null) {
        if(data.director[0].avatars != null) {
          director.avatar = data.director[0].avatars.large;
        }
        director.name = data.director[0].name;
        director.id = data.director[0].id;
      }

      var movie = {
        movieImg: data.images ? data.images.large : "",
        country: data.countries[0],
        title: data.title,
        originalTitle: data.original_title,
        wishCount: data.wish_count,
        commentsCount: data.comments_count,
        year: data.year,
        genres: data.genres.join(","),
        stars : util.convertToStarArray(data.rating.stars),
        score: data.rating.average,
        director: director,
        // casts:
        summary: data.summary
      }
      this.setData({
        movie: movie
      })
  }

  
})