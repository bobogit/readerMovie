// pages/movies/movies.js
var app = getApp();
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var globalData = app.globalData;
    var doubanBase = globalData.doubanBase;

    var inTheatersUrl = doubanBase + "/v2/movie/in_theaters?start=0&count=3";
    var comingSoonUrl = doubanBase + "/v2/movie/coming_soon?start=0&count=3";
    var top250Url = doubanBase + "/v2/movie/top250?start=0&count=3";

    this.getMovieListData(inTheatersUrl, "正在热映", "inTheaters");
    this.getMovieListData(comingSoonUrl, "即将上映", "comingSoon");
    this.getMovieListData(top250Url, "TOP250", "top250");
  },

  getMovieListData: function(url, title, key) {

    var that = this;

    util.http(url, function(data){
      that.processDoubanData(data, title, key);
    })
  },

  processDoubanData: function(moviesDouban, t, key) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];

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

    var tempData = [];
    tempData[key] = {
      title: t,
      movies: movies
    };

    this.setData(tempData);
  },

  onMoreTap: function(e){
    var category = e.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category,
    })
  }
})