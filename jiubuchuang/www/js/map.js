(function Map(){
		//Inital Baidu MAP Api

		this.oMap = new Object();

		this.oMap.TYPE = {
			BaiduMap  : 'Baidu',
			GoogleMap : 'Google',
			BingMap  : "Bing"};

	    this.oMap.TRAVEL_MODE = {
			DRIVING: 'DRIVING',
			BICYCLING: 'BICYCLING',
			TRANSIT: 'TRANSIT',
			WALKING: 'WALKING'
	    };

		this.oMap.sApi   = null;
		this.oMap.oPoint = new Object();

		this.oMap._includeMapApi   = 	function (){
				var oHead = document.getElementsByTagName("head")[0];
				var oMapAPI = document.createElement("script");
				oMapAPI.setAttribute('language','javascript');
				oMapAPI.setAttribute('type', "text/javascript");
				oMapAPI.setAttribute('src',this.sApi);
				oMapAPI.setAttribute('id','MapApi');
				oHead.appendChild(oMapAPI);
		};
		this.oMap._removeMapApi = function(){
			var oHead   = document.getElementsByTagName("head")[0];
			var oMapAPI = document.getElementById('MapApi');
			oHead.removeChild(oMapAPI);
		};

		/**
		*    inital MapApi
		**/
		this.oMap._initBaiduMapApi 		= 	function(){
			var sApiKey = "1yk4DALUQxjS72x76ocnSL0a";
			this.sApi = "http://api.map.baidu.com/api?v=2.0&ak=" + sApiKey +'&callback=oMap._createBaiduMap';
			
		};


		/**
		*    inital Map
		**/
		this.oMap.initBaiduMap  		=	function(oAddress){	
			this.oPoint = oAddress;
			this._initBaiduMapApi();
			this._includeMapApi();
			//window.onload = this._includeMapApi;
		};

		/**
		*    create Map
		**/
		this.oMap._createBaiduMap	=  	function(){

			//var CurrentLocation = new BMap.Point(this.oPoint.CurrentLocation.coords.latitude,this.oPoint.CurrentLocation.coords.longitude)
			var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});
			var top_left_navigation = new BMap.NavigationControl(); 

			this.oBaiduMap = new BMap.Map("map");
			this.oBaiduMap.enableScrollWheelZoom(true); 

			//add Control
			this.oBaiduMap.addControl(top_left_control);        
			this.oBaiduMap.addControl(top_left_navigation);

			this.RouteInBaiduMap(this.oPoint.CurrentLocation,this.oPoint.TargetAddress,this.oBaiduMap)
		};

		/**
		*   get latitue & Longtitude from Address 
		**/
		this.oMap._getGeofromBaidu   = 	function(sAdress){
			var oBaduGeo   = new BMap.Geocoder();
			var fnCallBack = function(oPoint){
				if(oPoint){
					this.oPoint = oPoint;
				}else{
					console.error("地址解析失败");
				}
			};

			oBaduGeo.getPoint(sAdress,fnCallBack);
			return that.oPoint;
		};

		/**
		*  Show driving route in BaiduMap
		**/
		this.oMap.RouteInBaiduMap   	= 	function(oCurrentLocation, oDestinaion, oMap){
			var options = {
				renderOptions:{
				map 		 : oMap,
				autoViewport : true
			}};
			var oDrivingRoute = new BMap.DrivingRoute(oMap,options);
			oDrivingRoute.search(oCurrentLocation,oDestinaion);
		};

		/**
		*   destroyBaiduMap
		**/
		this.oMap.destroyBaiduMap = function(){
			delete this.oBaiduMap;
			delete this.api;
			this._removeMapApi();
		};
}());