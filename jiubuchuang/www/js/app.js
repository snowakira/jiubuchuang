// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.config(function($stateProvider, $urlRouterProvider) {
    // configure menu page navigation
    $stateProvider
        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html"
          //  controller: 'AppCtrl'
        })
        // configure tabs page navigation
        .state('app.tabs', {
            url: "/tabs",
            views: {
                'content': {
                    templateUrl: "templates/tabs.html"
                }
            }
        })
        // configure main page
        .state('app.tabs.main', {
            url: "/main",
            views: {
                'main-tab': {
                    templateUrl: "templates/main.html",
                    controller: 'MainCtrl'
                }
            }
        })
        // configure exhibitions page
        .state('app.tabs.exhibitions', {
            url: "/exhibitions",
            views: {
                'exhibitions-tab': {
                    templateUrl: "templates/exhibitions.html",
                    controller: 'ExhibitionsCtrl'
                }
            }
        })
        // configure books page
        .state('app.tabs.books', {
            url: "/books/:id",
            views: {
                'books-tab': {
                    templateUrl: "templates/books.html",
                    controller: 'BooksCtrl'
                }
            }
        })

        // configure products page
        .state('app.tabs.products', {
            url: "/products/:id",
            views: {
                'books-tab': {
                    templateUrl: "templates/products.html",
                    controller: 'ProductsCtrl'
                }
            }
        })
        // configure profile page
        .state('app.tabs.profile', {
            url: "/profile",
            views: {
                'profile-tab': {
                    templateUrl: "templates/profile.html",
                    controller: 'ProfileCtrl'
                }
            }
        })

        .state('app.Jourlist', {
          url: "/Jourlist",
          views: {
              'content': {
                  templateUrl: "templates/Jourlist.html",
                  controller : 'JourCtrl'
              }
          }
        })
        .state('app.favlist', {
          url: "/favlist",
          views: {
              'content': {
                  templateUrl: "templates/favlist.html",
                  controller : 'FavCtrl'
              }
          }
        })
        .state('app.notificationlist', {
          url: "/notificationlist",
          views: {
              'content': {
                  templateUrl: "templates/notificationlist.html"
              }
          }
        })

    // configure exhibition page
    .state('app.exhibition', {
            url: "/exhibitions/:id",
            views: {
                'content': {
                    templateUrl: "templates/exhibition.html",
                    controller: 'ExhibitionCtrl'
                }
            }
        })
        // configure paint page
        .state('app.paint', {
            url: "/paint/:ex_id/:pa_id/:navigation",
            views: {
                'content': {
                    templateUrl: "templates/paint.html",
                    controller: "PaintCtrl"
                }
            }
        })
        // configure map page
        .state('app.map', {
            url: "/map/:address/:id",
            views: {
                'content': {
                    templateUrl: "templates/map.html",
                    controller : "MapCtrl"
                }
            }
        })
        // configure tickect
        .state('app.tickect', {
            url: "/tickect/:id",
            views: {
                'content': {
                    templateUrl: "templates/tickect.html",
                    controller: "TickectCtrl"
                }
            }
        })
        // configure new
        // .state('app.new', {
        //     url: "/new",
        //     views: {
        //         'menuContent': {
        //             templateUrl: "templates/news.html",
        //             controller: 'MainCtrl'
        //         }
        //     }
        // })
        // configure new
        .state('app.new', {
            url: "/new/:id/:title/:posterURL/:description/:subTitle",
            views: {
                'content': {
                    templateUrl: "templates/news.html",
                    controller: 'NewCtrl'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    // $urlRouterProvider.otherwise('/app/playlists');
    // -------------------------------------------------------
    // |URL                  |         state name            |
    // -------------------------------------------------------
    // |                     |   parent      |     child     |
    // -------------------------------------------------------
    // | /search             |   app         |     search    |
    // -------------------------------------------------------
    // | /browse             |   app         |     browse    |
    // -------------------------------------------------------
    // | /sessions           |   app         |     sessions  |  eg  sessionsabc
    // -------------------------------------------------------
    // | /profile            |   app         |     profile   |
    // -------------------------------------------------------
    // | /session            |   app         |     session   |
    // -------------------------------------------------------
    // | /app                |   app         |               |
    // -------------------------------------------------------
    // state name child is named as any variable
    // $urlRouterProvider.otherwise('/app/main'); //    /app/sessions
    $urlRouterProvider.otherwise('/app/tabs/main');
});
