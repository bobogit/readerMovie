function convertToStarArray(stars){
  var num = stars.toString().substring(0,1);
  var array = [];
  for(var i=1; i<=5; i++){
    if (num>=i){
      array.push(1);
    }else{
      array.push(0);
    }
  }
  return array;
}

function http(url, callback){
  wx.request({
    url: url,
    method: 'GET',
    header:{
      "Content-Type" :"application/json"
    },
    success: function(res) {
      callback(res.data);
    }, 
    fail: function(error) {
      console.log(error);
    }
  })
}

function convertToCastString() {

}

module.exports = {
  convertToStarArray: convertToStarArray,
  http: http,
  convertToCastString: convertToCastString
}