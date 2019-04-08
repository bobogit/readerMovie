// pages/movies/more-movie/more-movie.js

var app = getApp();
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: "",
    url: '',
    totalCount: 0,
    isEmpty: true
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

    this.setData({
      url: url
    })

    util.http(url, this.processDoubanData);

  },

  processDoubanData: function(data) {
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

    //绑定新数据,需要累加数据
    var totalMovies = {};
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies)
    } else {
      this.data.isEmpty = false;
      totalMovies = movies;
    }

    this.data.totalCount += data.count;

    this.setData({
      movies: totalMovies
    });

    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  onScrollLower: function(e) {

    var nextUrl = this.data.url + '?start=' + this.data.totalCount + '&count=20';
    wx.showNavigationBarLoading();
    util.http(nextUrl, this.processDoubanData);
   
  },

  onReady: function(event) {
    wx.setNavigationBarTitle({
      title: this.data.category
    })
  },

  onPullDownRefresh: function(e){
    var refreshUrl = this.data.url + '?start0&count=20';
    wx.showNavigationBarLoading();
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    util.http(refreshUrl, this.processDoubanData);
  },

  onMovieDetailTap: function (e) {
    wx.navigateTo({
      url: '../movie-detail/movie-detail?idx=' + e.currentTarget.dataset.idx,
    })
  }
})