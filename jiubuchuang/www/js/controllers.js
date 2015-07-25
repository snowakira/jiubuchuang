angular.module('starter.controllers', ['ionic', 'starter.services'])
.controller('ExhibitionCtrl', function($scope, $stateParams, $state, $rootScope, exhibitionInfo, $ionicModal, addPlan, $rootScope,$ionicHistory) {

    $scope.user = $rootScope.user;
    $scope.adBooks = $rootScope.adBooks;



    exhibitionInfo.exhibition($stateParams.id)
        .then(function(data) {
            $scope.exhibition = data;
        }, function(data) {
            alert(data);
        });

  $scope.myAlert = function(){
          alert("test");
        };

    $scope.go = function(state) {
        $state.go(state, {
            'id': null,
            'navigation': 'tabs.exhibition'
        });
    };
    $scope.goback = function(){
      $ionicHistory.goBack();
    };
    // $rootScope.navigation = 'app.exhibition';
    //code for planning
    $scope.myModal = {
        addCalendar: false,
        planDate: new Date()
    };

    $ionicModal.fromTemplateUrl("templates/plan.html", {
        scope: $scope,
        animation: "slide-in-up"
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.postData = function() {
        addPlan.post($rootScope.user, $scope.myModal.planDate, $stateParams.id);
        if ($scope.myModal.addCalendar === true) {

            addPlan.addPhone($scope.myModal.planDate, $scope.exhibition.value[0].address, $scope.exhibition.value[0].subject);
        }


    };

    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.addPlan = function() {
        $scope.postData();
        $scope.modal.hide();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    // $scope.myToggle=function(){
    // $timeout(function() {
    // }, 0);
})

.controller('MainCtrl', function($scope, mainInfo, adInfo, $state, $rootScope) {
  adInfo.ad()
  .then(function(data) {
    $scope.ads = data;
  }, function(data) {
    alert(data);
  });

  adInfo.adExhs()
  .then(function(data) {
    $scope.adExhs = data;
  }, function(data) {
    alert(data);
  });

  adInfo.adBooks()
  .then(function(data) {
    $scope.adBooks = data;
    $rootScope.adBooks = data;
  }, function(data) {
    alert(data);
  });

  adInfo.adStuffs()
  .then(function(data) {
    $scope.adStuffs = data;
  }, function(data) {
    alert(data);
  });

    $scope.go = function(state, ad) {
        // $state.go(state);
        // $scope.ad = ad;
        $state.go(state, {
            'id': ad.id,
            'title': ad.title,
            'posterURL': ad.posterURL,
            'description': ad.description,
            'subTitle': ad.subTitle
        });
    };
})

.controller('ExhibitionsCtrl', function($scope, $ionicListDelegate, $state, exhibitionsInfo) {

    $scope.cities = [
      {'name':'北京'},
      {'name': '上海'},
      {'name': '成都'}
    ];

    exhibitionsInfo.exhibitions()
        .then(function(data) {
            $scope.exhibitions = data;
        }, function(data) {
            alert(data);
        });

    $scope.move_item = function(item, fromIndex, toIndex) {
        $scope.items.splice(fromIndex, 1);
        $scope.items.splice(toIndex, 0, item);
    };
    $scope.show_reorder = function() {
        $ionicListDelegate.showReorder(true);
    };
    $scope.go = function(state) {
        $state.go(state);
    };
})

.controller('PaintCtrl', function($scope, $ionicPopover, $state, $ionicPopup, $rootScope, $stateParams, artInfo, addPraise, removePraise, artPraiseInfo, addFav, removeFav, myPraiseInfo, myFavInfo) {
    // $stateParams.ex_id = '55af5630e2afd6337d6bd64c';

    artInfo.art($stateParams.pa_id)
        .then(function(data) {
            $scope.paint = data;
        }, function(data) {
            alert(data);
        });

    artPraiseInfo.praise($stateParams.pa_id)
        .then(function(data) {
            $scope.praise = data;
            $scope.praiseno = data.value.length;
        }, function(data) {
            alert(data);
        });


    myPraiseInfo.mypraise($rootScope.user, $stateParams.pa_id)
        .then(function(data) {

            if (data.value.length) {
                $scope.lik = 'tab-item active';
            } else {
                $scope.lik = 'tab-item';
            }

        }, function(data) {
            alert(data);
        });

    myFavInfo.myfav($rootScope.user, $stateParams.pa_id)
        .then(function(data) {

            if (data.value.length) {
                $scope.fav = 'tab-item active';
            } else {
                $scope.fav = 'tab-item';
            }

        }, function(data) {
            alert(data);
        });


    $scope.navigation = $stateParams.navigation;
    $scope.pa_id = $stateParams.pa_id;
    $scope.ex_id = $stateParams.ex_id;
    $scope.go = function() {
        $state.go($scope.navigation, {
            'id': $scope.ex_id
        });
    };

    $ionicPopover.fromTemplateUrl("templates/share.html", {
            scope: $scope
        })
        .then(function(popover) {
            $scope.popover = popover;
        });
    $scope.openPopover = function($event) {
        $scope.popover.show($event);
    };
    $scope.closePopover = function() {
        $scope.popover.hide();
    };
    //销毁事件回调处理：清理popover对象
    $scope.$on("$destroy", function() {
        $scope.popover.remove();
    });
    // 隐藏事件回调处理
    $scope.$on("popover.hidden", function() {
        // Execute action
    });
    //删除事件回调处理
    $scope.$on("popover.removed", function() {
        // Execute action
    });

    /*
    $scope.data = {
      selectedScene: 0,
      selectedSceneLabel: "会话"
    };

    $scope.scenes = [{
      label: "会话",
      value: 0
    }, {
      label: "朋友圈",
      value: 1
    }, {
      label: "收藏",
      value: 2
    }];

    $scope.buttons = [{
      id: "check-installed",
      label: "是否安装了微信"
    }, {
      id: "send-text",
      label: "发送Text消息给微信"
    }, {
      id: "send-photo",
      label: "发送Photo消息给微信"
    }, {
      id: "send-link",
      label: "发送Link消息给微信"
    }, {
      id: "send-music",
      label: "发送Music消息给微信"
    }, {
      id: "send-video",
      label: "发送Video消息给微信"
    }, {
      id: "send-app",
      label: "发送App消息给微信"
    }, {
      id: "send-nongif",
      label: "发送非gif消息给微信"
    }, {
      id: "send-gif",
      label: "发送gif消息给微信"
    }, {
      id: "send-file",
      label: "发送文件消息给微信"
    }, {
      id: "auth",
      label: "微信授权登录"
    }, {
      id: "test-url",
      label: "测试URL长度"
    }, {
      id: "open-profile",
      label: "打开Profile"
    },

    {
      id: "open-mp",
      label: "打开mp网页"
    }, {
      id: "add-card",
      label: "添加单张卡券至卡包"
    }, {
      id: "add-cards",
      label: "添加多张卡券至卡包"
    }
  ];
  */

    $scope.handle = function(id, sc) {
        var params = {
            scene: sc //1: 朋友圈 0：对话
        };

        if (id == 'send-text') {
            params.text = $scope.paint.value[0].title;
        } else {
            params.message = {
                title: $scope.paint.value[0].title,
                description: $scope.paint.value[0].decsription,
                thumb: $scope.paint.value[0].posterThumbnailURL,
                mediaTagName: "TEST-TAG-001",
                //messageExt: "这幅作品非常的不错，分享给你",
                //messageAction: "<action>dotalist</action>",
                media: {}
            };

            switch (id) {
                case 'check-installed':
                    Wechat.isInstalled(function(installed) {
                        alert("Wechat installed: " + (installed ? "Yes" : "No"));
                    });
                    return;

                case 'send-photo':
                    params.message.thumb = $scope.paint.value[0].posterThumbnailURL;
                    params.message.media.type = Wechat.Type.IMAGE;
                    params.message.media.image = $scope.paint.value[0].posterURL;
                    break;

                case 'send-link':
                    params.message.thumb = $scope.paint.value[0].posterThumbnailURL;
                    params.message.media.type = Wechat.Type.LINK;
                    params.message.media.webpageUrl = "http://tech.qq.com/zt2012/tmtdecode/252.htm";
                    break;

                case 'send-music':
                    params.message.thumb = $scope.paint.value[0].posterThumbnailURL;
                    params.message.media.type = Wechat.Type.MUSIC;
                    params.message.media.musicUrl = "http://y.qq.com/i/song.html#p=7B22736F6E675F4E616D65223A22E4B880E697A0E68980E69C89222C22736F6E675F5761704C69766555524C223A22687474703A2F2F74736D7573696334382E74632E71712E636F6D2F586B30305156342F4141414130414141414E5430577532394D7A59344D7A63774D4C6735586A4C517747335A50676F47443864704151526643473444442F4E653765776B617A733D2F31303130333334372E6D34613F7569643D3233343734363930373526616D703B63743D3026616D703B636869643D30222C22736F6E675F5769666955524C223A22687474703A2F2F73747265616D31342E71716D757369632E71712E636F6D2F33303130333334372E6D7033222C226E657454797065223A2277696669222C22736F6E675F416C62756D223A22E4B880E697A0E68980E69C89222C22736F6E675F4944223A3130333334372C22736F6E675F54797065223A312C22736F6E675F53696E676572223A22E5B494E581A5222C22736F6E675F576170446F776E4C6F616455524C223A22687474703A2F2F74736D757369633132382E74632E71712E636F6D2F586C464E4D313574414141416A41414141477A4C36445039536A457A525467304E7A38774E446E752B6473483833344843756B5041576B6D48316C4A434E626F4D34394E4E7A754450444A647A7A45304F513D3D2F33303130333334372E6D70333F7569643D3233343734363930373526616D703B63743D3026616D703B636869643D3026616D703B73747265616D5F706F733D35227D";
                    params.message.media.musicDataUrl = "http://stream20.qqmusic.qq.com/32464723.mp3";
                    break;

                case 'send-video':
                    params.message.thumb = $scope.paint.value[0].posterThumbnailURL;
                    params.message.media.type = Wechat.Type.VIDEO;
                    params.message.media.videoUrl = "http://v.youku.com/v_show/id_XNTUxNDY1NDY4.html";
                    break;

                case 'send-app':
                    params.message.thumb = $scope.paint.value[0].posterThumbnailURL;
                    params.message.media.type = Wechat.Type.APP;
                    params.message.media.extInfo = "<xml>extend info</xml>";
                    params.message.media.url = "http://weixin.qq.com";
                    break;

                case 'send-nongif':
                    params.message.thumb = $scope.paint.value[0].posterThumbnailURL;
                    params.message.media.type = Wechat.Type.EMOTION;
                    params.message.media.emotion = "$scope.paint.value[0].posterURL";
                    break;

                case 'send-gif':
                    params.message.thumb = $scope.paint.value[0].posterThumbnailURL;
                    params.message.media.type = Wechat.Type.EMOTION;
                    params.message.media.emotion = "www/resources/res6.gif";
                    break;

                case 'send-file':
                    params.message.thumb = $scope.paint.value[0].posterThumbnailURL;
                    params.message.media.type = Wechat.Type.FILE;
                    params.message.media.file = "www/resources/iphone4.pdf";
                    break;

                case 'auth':
                    Wechat.auth("snsapi_userinfo", function(response) {
                        // you may use response.code to get the access token.
                        alert(JSON.stringify(response));
                    }, function(reason) {
                        alert("Failed: " + reason);
                    });
                    return;

                default:
                    $ionicPopup.alert({
                        title: 'Not supported!',
                        template: 'Keep patient, young man.'
                    });

                    return;
            }
        }


        Wechat.share(params, function() {
            alert("Success");
        }, function(reason) {
            alert("Failed: " + reason);
        });

    };

    $scope.fav = 'tab-item';
    $scope.lik = 'tab-item';

    $scope.dofav = function(item) {


        if ($scope.fav == 'tab-item') {
            $scope.fav = 'tab-item active';
            /*
            $ionicPopup.alert({
                title: "嘿嘿!",
                template: "感谢您 " + item + "！"
            });*/
            addFav.post($rootScope.user, $stateParams.pa_id); //$rootScope.id


        } else {
            $scope.fav = 'tab-item';
            /*
            $ionicPopup.alert({
                title: "哎呀!",
                template: "您怎么取消 " + item + "？"
            });
    */
            removeFav.remove($rootScope.user, $stateParams.pa_id); //$rootScope.id
        }
    }



    $scope.dolik = function(item) {


        if ($scope.lik == 'tab-item') {
            $scope.lik = 'tab-item active';
            /*
            $ionicPopup.alert({
                title: "嘿嘿!",
                template: "感谢您点 " + item + "！"

            });
    */
            $scope.praiseno = $scope.praiseno + 1;

            addPraise.post($rootScope.user, $stateParams.pa_id); //$rootScope.id

        } else {
            $scope.lik = 'tab-item';
            /*
            $ionicPopup.alert({
                title: "哎呀!",
                template: "您怎么取消 " + item + "？"
            });
*/
            $scope.praiseno = $scope.praiseno - 1;

            removePraise.remove($rootScope.user, $stateParams.pa_id); //$rootScope.id
        }

    };
})


.controller('BooksCtrl', function($scope, $state, $rootScope, $stateParams, booksInfo, exhibitionInfo,$ionicPopover) {


        // $scope.go = function(state, paint) {
        //     $state.go(state, {
        //         'ex_id': $scope.exhibition.value[0].id,
        //         'pa_id': paint._id,
        //         'navigation': 'app.tabs.books'
        //     });
        // };
        $scope.myAlert = function(){
          alert("test");
        };

        booksInfo.getlist()
        .then(function(data) {
          $scope.books = data;
        }, function(data) {
          alert(data);
        });


        $ionicPopover.fromTemplateUrl("templates/sort1.html", {
                scope: $scope
            })
            .then(function(popover) {
                $scope.sort1 = popover;
            });

        $ionicPopover.fromTemplateUrl("templates/sort2.html", {
                    scope: $scope
                })
                .then(function(popover) {
                    $scope.sort2 = popover;
                });
        $scope.openSort1 = function($event) {
            $scope.sort1.show($event);
        };
        $scope.closeSort1 = function() {
            $scope.sort1.hide();
        };

        $scope.openSort2 = function($event) {
            $scope.sort2.show($event);
        };
        $scope.closeSort2 = function() {
            $scope.sort2.hide();
        };
        //销毁事件回调处理：清理popover对象
        $scope.$on("$destroy", function() {
            $scope.sort1.remove();
            $scope.sort2.remove();

        });
        // 隐藏事件回调处理
        $scope.$on("popover.hidden", function() {
            // Execute action
        });
        //删除事件回调处理
        $scope.$on("popover.removed", function() {
            // Execute action
        });


    })
    .controller('MapCtrl', function($scope, $location, $stateParams) {
        $scope.ID = $stateParams.id;
        var sGallaryAddress = $stateParams.address;

        var fnSuccess = function(position) {
            var sGallaryAddress = $stateParams.address;
            var oAddress = {
                CurrentLocation: position,
                TargetAddress: sGallaryAddress
            }
            this.oMap.initBaiduMap(oAddress);

        };
        var fnError = function(error) {
            //test page
            var oAddress = {
                CurrentLocation: "成都",
                TargetAddress: '阆中'
            }
            this.oMap.initBaiduMap(oAddress);
            //console.error(error.message);
        };
        navigator.geolocation.getCurrentPosition(fnSuccess, fnError);
    })

.controller('ProfileCtrl', function($scope, $stateParams, GetUser, getFavlist, getJourlist, $rootScope, $ionicPopup) {
    var userID = $rootScope.user;
    //userID = '15378177988';
    $scope.user = new Object();

    var subscribers = [{
        id: 1,
        description: '山水'
    }, {
        id: 2,
        description: '人物'
    }, {
        id: 3,
        description: '花鸟'
    }, {
        id: 4,
        description: '油画'
    }, {
        id: 5,
        description: '水墨画'
    }, {
        id: 6,
        description: '国画'
    }];

    $scope.setSubscribe = function(id) {
        $scope.user.favorCategory = subscribers[id].description;
        //GetUser.postfav(userID,subscribers[id].description);
    }

    //get JourNo & Fav Info

    getJourlist.get(userID)
        .then(function(data) {
            $scope.user.JourNo = data.length;
            //get Fav No
            getFavlist.get(userID)
                .then(function(data) {
                    $scope.user.favNo = data.length;
                    //Get user Info
                    GetUser.get(userID)
                        .then(function(data) {
                            $scope.user.favorCategory = data.value[0].favorCategory;
                            $scope.user.NotificationNo = '7';
                        }, function(data) {
                            alert(data);
                        });


                }, function(data) {
                    $ionicPopup.alert({
                        title: "获取收藏信息",
                        template: data
                    });
                    alert(data);
                });

        }, function(data) {
            alert(data);
        });
})

.controller('FavCtrl', function($scope, $stateParams, getFavlist, $rootScope) {
    var userID = $rootScope.user;
    getFavlist.get(userID)
        .then(function(data) {
            $scope.favorites = data;
        }, function(data) {
            alert(data);
        });
})

.controller('JourCtrl', function($scope, $stateParams, getJourlist, exhibitionInfo, $rootScope) {
    var userID = $rootScope.user;
    var journeys = new Object();
    getJourlist.get(userID)
        .then(function(data) {
            //$scope.journeys = data;
            journeys = data;
            $scope.journeys = [];

            for (var jourey in journeys) {
                exhibitionInfo.exhibition(journeys[jourey].exhibition)
                    .then(function(data) {
                        $scope.journeys.push(data.value[0]);
                    }, function(data) {
                        alert(data);
                    });
            };

        }, function(data) {
            alert(data);
        });
})

.controller('TickectCtrl', function($scope, $stateParams) {
    $scope.navid = $stateParams.id;
})


.controller('NewCtrl', function($scope, $state, $stateParams) {
    $scope.id = $stateParams.id;
    $scope.title = $stateParams.title;
    $scope.posterURL = $stateParams.posterURL;
    $scope.description = $stateParams.description;
    $scope.subTitle = $stateParams.subTitle;
});
