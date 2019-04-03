// pages/movies/more-movie/more-movie.js

var app = getApp();
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var category = options.category;
    this.setData({
      category: category
    });

    var url = app.globalData.doubanBase;

    switch (category) {
      case "正在热映":
        url += "/v2/movie/in_theaters";
        break;
      case "即将上映":
        url += "/v2/movie/coming_soon";
        break;
      case "TOP250":
        url += "/v2/movie/top250";
        break;
    }

    var that = this;

    util.http(url, function(data){
      var movies = [];
      for (var idx in data.subjects) {
        var subject = data.subjects[idx];

        var title = subject.title;
        if (title.length >= 6) {
          title = title.substring(0, 6) + "..."
        }

        var temp = {
          title: title,
          average: subject.rating.average,
          coverageUrl: subject.images.large,
          movieId: subject.id,
          stars: util.convertToStarArray(subject.rating.stars)
        }
        movies.push(temp);
      }     

      that.setData({ movies: movies});

    })

  },

  onReady: function(event) {
    wx.setNavigationBarTitle({
      title: this.data.category
    })
  }
})