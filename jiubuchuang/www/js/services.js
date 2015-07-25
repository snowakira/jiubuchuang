angular.module('starter.services', ['ngResource', 'starter.cache','ngCordova'])
// exhibition info
.factory('exhibitionInfo', function($http,$q,httpCache) {
  var exhibitionService = {};
  var data = '';
  var exh = [
    {
      'id':'1',
      'subject':'马鞍山第五届Comic·MAS动漫游戏嘉年华 CM5清凉夏日祭',
      'posterURL':'./img/exh/2.jpg',
      'address': '上海剧院',
      'startDate':'2015-08-20',
      'endDate':'2015-08-21',
      'startTime':'2015-08-20 上午 10:10',
      'endTime':'2015-08-21 下午 16:30',
      'ticket':'网络售票（淘宝地址）',
      'contact':'QQ 12333444555',
      'decsription':'本次活动除了动漫角色真人扮演cosplay秀，还有唤醒童心的夏日游园会、精彩纷呈的LIVE舞台表演赛、娱乐至上的精致主题派对，以及勾搭脱团的CP碰碰车、5V5吃货之英雄联盟、吃货大比、心愿墙等互动游戏项目——想想还真有点小激动！'
    }
  ];
  exhibitionService.exhibition = function(id) {

    var deferred = $q.defer();
      deferred.resolve(exh);
    return deferred.promise;
  };

  return exhibitionService;
})
//  mainInfo exhibitions
.factory('mainInfo', function($http, $q, httpCache) {
  var mainService = {};
  var data = '';
  mainService.subscribeExhibitions = function(artCategory) {
    var deferred = $q.defer();
    var baseUrl = 'http://smartgallery.duapp.com/odata/qbookexhi';
    // var filterPara = '?$filter=artCategory.cateName eq ';
    // filterPara = filterPara + "'" + artCategory + "'";
    // baseUrl = baseUrl + filterPara;
    $http({
      method: 'GET',
      url: baseUrl,
      params: {
        'artCategory.cateName': artCategory
      },
      cache: httpCache,
    }).success(function(data) {
      deferred.resolve(data);
    }).error(function() {
      deferred.reject('获取订阅展会信息失败！');
    });
    return deferred.promise;
  };

  return mainService;
})
// adInfo
.factory('adInfo', function($http, $q, httpCache) {
  var adService = {};
  var ads = [
    {'url':'./img/banner/1.jpg'},
    {'url':'../img/banner/2.jpg'},
    {'url':'../img/banner/3.jpg'}

  ];

  var adExhs = [
    {
      'url':['./img/exh/1.jpg','./img/exh/2.jpg','./img/exh/3.jpg'],
      'title':['魔都CP16','马鞍山第五届Comic·MAS动漫游戏嘉年华 CM5清凉夏日祭','青岛幻梦动漫游戏嘉年华DreamCraftCarnival2015'],
      'id':['1','2','3']

    },
    {
      'url':['./img/exh/2.jpg','./img/exh/4.jpg','./img/exh/5.jpg'],
      'title':['2015年成都百合Only','成都2015夏季APO!','第十一次M.Y.COMIC游园会'],
      'id':['4','5','6']

    }
  ];

  var adBooks = [
    {
      'url':['./img/comic/1.jpg','./img/comic/2.jpg','./img/comic/3.jpg'],
      'title':['Marry for love','The ideal Grace','随便想的'],
      'cp':['EC','EC','三日月'],
      'id':['1','2','3']
    },
    {
      'url':['./img/comic/2.jpg','./img/comic/4.jpg','./img/comic/5.jpg'],
      'title':['The ideal grace','我们未能知道那天傍晚发生了什么','将心'],
      'cp':['EC','鸣佐','喻黄'],
      'id':['4','5','6']
    }
  ];

  var adStuffs = [
    {
      'url':['./img/stuff/1.jpg','./img/stuff/2.jpg','./img/stuff/3.jpg'],
      'title':['钥匙链','杯垫','明信片'],
      'cp':['EC','EC','三日月'],
      'id':['1','2','3']
    },
    {
      'url':['./img/stuff/2.jpg','./img/stuff/4.jpg','./img/stuff/5.jpg'],
      'title':['卡套','毛巾','马克杯'],
      'cp':['EC','鸣佐','喻黄'],
      'id':['4','5','6']
    }
  ];

  adService.ad = function() {
    var deferred = $q.defer();
    deferred.resolve(ads);
    return deferred.promise;
  };

  adService.adExhs = function() {
    var deferred = $q.defer();
    deferred.resolve(adExhs);
    return deferred.promise;
  };

  adService.adBooks = function() {
    var deferred = $q.defer();
    deferred.resolve(adBooks);
    return deferred.promise;
  };

  adService.adStuffs = function() {
    var deferred = $q.defer();
    deferred.resolve(adStuffs);
    return deferred.promise;
  };

  return adService;
})

// artInfo
.factory('booksInfo', function($http, $q, httpCache) {
  var bookService = {};
  // var baseUrl = '../data/news-test.json'
  var books = [
    {
      'id':'1',
      'title':'日常',
      'origin':'火影忍者',
      'author':'就是一个蛋',
      'CP':'鸣佐',
      'price':'30 RMB',
      'ThumbnailURL':'./img/comic/1.jpg'
    },
    {
      'id':'2',
      'title':'Crown of Thor',
      'origin':'雷神',
      'author':'AABB',
      'CP':'日影',
      'price':'40 RMB',
      'ThumbnailURL':'./img/comic/2.jpg'
    },




  ];
  bookService.getlist = function() {
    var deferred = $q.defer();
    deferred.resolve(books);
    return deferred.promise;
  };

  return bookService;
})

.factory('artPraiseInfo', function($http, $q, httpCache) {
  var artPraiseService = {};
  // var baseUrl = '../data/news-test.json';
  var artData = '';
  artPraiseService.praise = function(artid) {
    var deferred = $q.defer();
    var baseUrl =  'http://smartgallery.duapp.com/odata/praises';
    var filterPara = '?$filter=Art eq ';
    filterPara = filterPara + "'" + artid+ "'";
    baseUrl = baseUrl + filterPara;
    $http({
      method: 'GET',
      url: baseUrl,
      cache: httpCache,
    }).success(function(data) {
      deferred.resolve(data);
    }).error(function() {
      deferred.reject('获取展品 赞 信息失败！');
    });
    return deferred.promise;
  };

  return artPraiseService;
})

.factory('myPraiseInfo', function($http, $q, httpCache) {
  var myPraiseService = {};
  // var baseUrl = '../data/news-test.json';
  var artData = '';
  myPraiseService.mypraise = function(userid, artid) {
    var deferred = $q.defer();
    var baseUrl =  'http://smartgallery.duapp.com/odata/praises';
    var filterPara = '?$filter=Art eq ';
    filterPara = filterPara + "'" + artid + "' and user eq '" + userid + "'";
    baseUrl = baseUrl + filterPara;
    $http({
      method: 'GET',
      url: baseUrl,
      cache: httpCache,
    }).success(function(data) {
      deferred.resolve(data);
    }).error(function() {
      deferred.reject('获取展品 赞数 信息失败！');
    });
    return deferred.promise;
  };

  return myPraiseService;
})

.factory('myFavInfo', function($http, $q, httpCache) {
  var myFavService = {};
  // var baseUrl = '../data/news-test.json';
  var artData = '';
  myFavService.myfav = function(userid, artid) {
    var deferred = $q.defer();
    var baseUrl =  'http://smartgallery.duapp.com/odata/favorites';
    var filterPara = '?$filter=Art eq ';
    filterPara = filterPara + "'" + artid + "' and user eq '" + userid + "'";
    baseUrl = baseUrl + filterPara;
    $http({
      method: 'GET',
      url: baseUrl,
      cache: httpCache,
    }).success(function(data) {
      deferred.resolve(data);
    }).error(function() {
      deferred.reject('获取展品 收藏 信息失败！');
    });
    return deferred.promise;
  };

  return myFavService;
})

.factory('addPraise', function($http) {
  var addPraise = {};

  addPraise.post = function(userid,artid) {
    // var deferred = $q.defer();
    $http({
      method: 'post',
      url: "http://smartgallery.duapp.com/odata/praises",
      // cache: httpCache,
      data: {
        'user': userid,
        'Art': artid
      }
    });

  };

  return addPraise;
})

.factory('removePraise', function($http) {
  var removePraise = {};

  removePraise.remove = function(userid,artid) {
    // var deferred = $q.defer();
    $http({
      method: 'delete',
      url: "http://smartgallery.duapp.com/odata/praises",
      // cache: httpCache,
      data: {
        'user': userid,
        'Art':artid
      }
    });

  };

  return removePraise;
})

.factory('addFav', function($http) {
  var addFav = {};

  addFav.post = function(userid,artid) {
    // var deferred = $q.defer();
    $http({
      method: 'post',
      url: "http://smartgallery.duapp.com/odata/favorites",
      // cache: httpCache,
      data: {
        'user': userid,
        'Art': artid
      }
    });

  };

  return addFav;
})

.factory('removeFav', function($http) {
  var removeFav = {};

  removeFav.remove = function(userid,artid) {
    // var deferred = $q.defer();
    $http({
      method: 'delete',
      url: "http://smartgallery.duapp.com/odata/favorites",
      // cache: httpCache,
      data: {
        '_id': 'a2494f6e-34bb-4c01-830d-a4b060f68c7f'
      }
    });

  };

  return removeFav;
})

//  exhibitionsInfo exhibitions
.factory('exhibitionsInfo', function($http, $q, httpCache) {
  var exhibitionService = {};
  var baseUrl = 'http://smartgallery.duapp.com/odata/exhibitions';
  var data = '';
  var exhs = [
    {
      'id':'1',
      'subject':'魔都CP16',
      'posterURL':'./img/exh/1.jpg',
      'venue': '上海剧院',
      'startDate':'2015-08-20',
      'endDate':'2015-08-21'
    },
    {
      'id':'2',
      'subject':'马鞍山第五届Comic·MAS动漫游戏嘉年华 CM5清凉夏日祭',
      'posterURL':'./img/exh/2.jpg',
      'venue': '马鞍山人民广场',
      'startDate':'2015-08-20',
      'endDate':'2015-08-21'
    },
    {
      'id':'3',
      'subject':'青岛幻梦动漫游戏嘉年华DreamCraftCarnival2015',
      'posterURL':'./img/exh/3.jpg',
      'venue': '青岛',
      'startDate':'2015-08-20',
      'endDate':'2015-08-21'
    },
    {
      'id':'4',
      'subject':'2015年成都百合Only',
      'posterURL':'./img/exh/4.jpg',
      'venue': '春熙路',
      'startDate':'2015-08-20',
      'endDate':'2015-08-21'
    },
    {
      'id':'5',
      'subject':'成都2015夏季APO!',
      'posterURL':'./img/exh/5.jpg',
      'venue': '春熙路',
      'startDate':'2015-08-20',
      'endDate':'2015-08-21'
    },
    {
      'id':'6',
      'subject':'第十一次M.Y.COMIC游园会',
      'posterURL':'./img/exh/5.jpg',
      'venue': '春熙路',
      'startDate':'2015-08-20',
      'endDate':'2015-08-21'
    },





  ];

  exhibitionService.exhibitions = function() {
    var deferred = $q.defer();
      deferred.resolve(exhs);
    return deferred.promise;
  };

  return exhibitionService;
})


.factory('userInfo', function($http, $q, httpCache) {
  var userService = {};
  var baseUrl = 'http://smartgallery.duapp.com/odata/users';
  var data = '';
  //var filterPara1 = '?$filter=(user eq ';
  var filterPara1 = '?$filter=user eq ';
  var filterPara2 = ' and password eq ';


  userService.login = function(user,password) {
    var deferred = $q.defer();
    baseUrl = 'http://smartgallery.duapp.com/odata/users';
    filterPara = filterPara1 + "'" + user + "'" + filterPara2 + "'" + password + "'";
    //    filterPara = filterPara1 + "'" + user + "'";
    baseUrl = baseUrl + filterPara;
    $http({
      method: 'GET',
      url: baseUrl,
      cache: httpCache,
    }).success(function(data) {
      deferred.resolve(data);
    }).error(function() {
      deferred.reject('用户不存在！');

    });
    return deferred.promise;
  };

  userService.post = function(user,password) {
    // var deferred = $q.defer();
    $http({
      method: 'post',
      url: baseUrl,
      // cache: httpCache,
      data: {
        'user': user,
        'password': password,
        'name': user
      }
    });

  };

  return userService;
})

.factory('addPlan', function($http, $cordovaCalendar) {
  var addPlan = {};


  addPlan.post = function(user,planDate,id) {
    // var deferred = $q.defer();
    $http({
      method: 'post',
      url: "http://smartgallery.duapp.com/odata/journeys",
      // cache: httpCache,
      data: {
        'user': user,
        'date': planDate,
        'exhibition': id
      }
    });

  };
  addPlan.addPhone = function(planDate, planLocal, planSub){
    $cordovaCalendar.createEvent({
      title: planSub,
      location: planLocal,
      notes: 'From Smart Gallery',
      startDate: planDate,
      endDate: planDate
    }).then(function (result) {
      alert("Event created successfully");
    }, function (err) {
      alert("There was an error: " + err);
    });

  }



  return addPlan;
})

.factory('getFavlist', function($http, $q) {
  var oGetFavList = new Object();
  var baseUrl = 'http://smartgallery.duapp.com/odata/qfavorite?user=';
  var data = '';

  oGetFavList.get = function(userID) {
    var sServiceUrl = baseUrl + userID +'&populate=true';
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: sServiceUrl
    }).success(function(data) {
      deferred.resolve(data);
    }).error(function() {
      deferred.reject('获取收藏信息失败');
    });

    return deferred.promise;
  };

  return oGetFavList;
})

.factory('getJourlist', function($http, $q) {
  var oGetJourlist = new Object();
  var baseUrl = 'http://smartgallery.duapp.com/odata/qjourney?user=';
  var data = '';

  oGetJourlist.get = function(userID) {
    var sServiceUrl = baseUrl + userID ;
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: sServiceUrl
    }).success(function(data) {
      deferred.resolve(data);
    }).error(function() {
      deferred.reject('获取行程信息失败');
    });
    return deferred.promise;
  };
  return oGetJourlist;
})
.factory('GetUser', function($http, $q) {
  var oGetUser = new Object();
  var baseUrl = 'http://smartgallery.duapp.com/odata/users';
  var data = '';

  oGetUser.get = function(userID) {
    var sServiceUrl = baseUrl + '?$filter=user eq ' +userID ;
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: sServiceUrl
    }).success(function(data) {
      deferred.resolve(data);
    }).error(function() {
      deferred.reject('获取用户信息失败');
    });
    return deferred.promise;
  };
  oGetUser.postfav = function(user, sFav) {
    $http({
      method: 'post',
      url: baseUrl,
      // cache: httpCache,
      data: {
        'user': user,
        'favorCategory': sFav
      }
    });};
    return oGetUser;
  });
