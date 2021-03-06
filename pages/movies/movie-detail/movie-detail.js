import { Movie } from 'class/Movie.js';
var app = getApp();
// var util = require('../../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = app.globalData.doubanBase + '/v2/movie/subject/' + options.idx;
    var movie = new Movie(url);
    var that = this;
    // movie.getMovieData(function (movie){
    //   that.setData({
    //     movie: movie
    //   })
    // })
    // util.http(url, this.processDoubanData);

    movie.getMovieData((movie) => {
      this.setData({
        movie: movie
      })
    })
  }

  // processDoubanData: function(data) {

  //     if(!data){
  //       return;
  //     }

  //     var director = {
  //       avatar : "",
  //       name: "",
  //       id: ""
  //     }

  //     if(data.directors[0] != null) {
  //       if(data.directors[0].avatars != null) {
  //         director.avatar = data.directors[0].avatars.large;
  //       }
  //       director.name = data.directors[0].name;
  //       director.id = data.directors[0].id;
  //     }

  //     var movie = {
  //       movieImg: data.images ? data.images.large : "",
  //       country: data.countries[0],
  //       title: data.title,
  //       originalTitle: data.original_title,
  //       wishCount: data.wish_count,
  //       commentsCount: data.comments_count,
  //       year: data.year,
  //       genres: data.genres.join(","),
  //       stars : util.convertToStarArray(data.rating.stars),
  //       score: data.rating.average,
  //       director: director,
  //       casts: util.convertToCastString(data.casts),
  //       castsInfo: util.convertToCastInfos(data.casts),
  //       summary: data.summary
  //     }

  //     this.setData({
  //       movie: movie
  //     })
  // }

  
})