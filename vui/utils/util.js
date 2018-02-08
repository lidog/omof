
export const util = {


    /**
	 * 控制台打印输出
	 * @param {string} info 输出信息
	 */
	debug : function(info){
		try{
			if(console != undefined && console != null && console.info){
				console.info(info);
			}
		}catch (e) {
		}
	},
	
	/**
	 * 将null，undefined类型 转换为空字符串
	 * @param {string} string  输出信息
	 */
	strToString : function(string) {
		if (string == null || string == "null" || string == 'NULL' || string == undefined
				|| str == 'undefined' || str == 'UNDEFINED') {
			return "";
		}
		
		return string;
    },
    
    /**
	 * 获取时间段日期
	 * @param {string} type  时间段  例如：yesterday or thisWeek or thisFullWeek
	 * @param {string} format  返回的日期格式  默认为：yyyy-MM-dd
     */
	getDateTime : function(type, format) {    
		var defaultDateFromat = "yyyy-MM-dd",result = {},desc=[];
		var dateTime = new Array(),  
			bt = new Date(), 
			et = new Date(),
			_weekday = bt.getDay(),
			_monthday = bt.getDate(),
			y = bt.getFullYear(),
			m = bt.getMonth() + 1,
			endDay = new Date(y,m,0).getDate();
		
		if (_weekday == 0) {
			_weekday = 7;
		}   
		desc = getDescByDay();
		if ( obj == 'yesterday') {    
			bt.setDate(bt.getDate() - 1);
			et.setDate(et.getDate() - 1);
			desc = getDescByDay();
		} else if (obj=="thisWeek") {         
			bt.setDate(bt.getDate() - (_weekday - 1));
			desc = getDescByWeek();
		} else if (obj=="thisFullWeek"){
			bt.setDate(bt.getDate() - (_weekday - 1));
			et.setDate(et.getDate() + (7 - _weekday));
			desc = getDescByWeek();
		} else if (obj=="lastWeek") {  
			bt.setDate(bt.getDate() - 7 + (1 - _weekday));
			et.setDate(et.getDate() - _weekday);
			desc = getDescByWeek();
		} else if (obj=="thisMonth") {          
			bt.setDate(bt.getDate() + (1 - _monthday));
			desc = getDescByMonth(endDay);
		} else if(obj=="thisFullMonth"){
			bt.setDate(bt.getDate() + (1 - _monthday));
			et.setDate(endDay);
			desc = getDescByMonth(endDay);
		}else if (obj=="lastMonth") { 
			endDay = new Date(y,m-1,0).getDate();
			bt.setMonth(bt.getMonth() - 1);  
			et.setMonth(et.getMonth());   
			var _dayNum = (et - bt) / ( 24 * 60 * 60 * 1000);
			bt.setDate(bt.getDate() + (1 - _monthday));
			et.setDate(et.getDate() - _monthday);  
			desc = getDescByMonth(endDay);
		} else if (obj=="thisYear") { 
			bt = new Date(et.getFullYear() + "-01-01");
			desc = getDescByYear();
		} 
		
		if (!format){
			format = defaultDateFromat;
		}
		var bT = bt.format(format);    
		var eT = et.format(format);   
		
		if(format == "yyyy-MM-dd HH:mm:ss" ){
			bT = bt.format(defaultDateFromat + ' 00:00:00');
			eT = et.format(defaultDateFromat + ' 23:59:59');
		}
		
		function getDescByMonth( endDay){
			var rest = [];
			for(var i = 1 ; i <= endDay ; i++ ){
				rest.push(i + "号");
			}
			return rest;
		}
		function getDescByDay(){
			var rest = [];
			for(var i = 0 ; i <= 23 ; i++ ){
				rest.push(i + "时");
			}
			return rest;
		}
		function getDescByWeek(){
			var rest = ['周一','周二','周三','周四','周五','周六','周日'];
			return rest;
		}
		function getDescByYear() {
			var rest = [];
			for (var i = 1;i <= 12;i++) {
				rest.push(i + "月");
			}
			return rest;
		}
		result = {
				bT : bT,
				eT : eT,
				desc : desc
			}
		UI.util.debug(result);
		return result;  
    },


    
	isNotNullORBlank : function(args) {
		for (var i = 0; i < args.length; i++) {
		  var argument = args[i];
		  if (argument == null || argument == '' || argument == undefined) {
			return false;
		  }
		}
		return true;
	  },

	removeInArr:function (arr,value) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == value){
                arr.splice(i, 1);
            }
        }
    },
    hasClass(elem, cls) {
        cls = cls || '';
        if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
        return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
    },


	extend(){
        function isPlainObject(obj) {

            // 用来存放 toString 映射结果的对象
            var class2type = {};

            // 相当于 Object.prototype.toString
            var toString = class2type.toString;

            // 相当于 Object.prototype.hasOwnProperty
            var hasOwn = class2type.hasOwnProperty;

            var proto, Ctor;

            // 排除掉明显不是obj的以及一些宿主对象如Window
            if (!obj || toString.call(obj) !== "[object Object]") {
                return false;
            }

            /**
             * getPrototypeOf es5 方法，获取 obj 的原型
             * 以 new Object 创建的对象为例的话
             * obj.__proto__ === Object.prototype
             */
            proto = Object.getPrototypeOf(obj);

            // 没有原型的对象是纯粹的，Object.create(null) 就在这里返回 true
            if (!proto) {
                return true;
            }

            /**
             * 以下判断通过 new Object 方式创建的对象
             * 判断 proto 是否有 constructor 属性，如果有就让 Ctor 的值为 proto.constructor
             * 如果是 Object 函数创建的对象，Ctor 在这里就等于 Object 构造函数
             */
            Ctor = hasOwn.call(proto, "constructor") && proto.constructor;

            // 在这里判断 Ctor 构造函数是不是 Object 构造函数，用于区分自定义构造函数和 Object 构造函数
            return typeof Ctor === "function" && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);
        }

        // 默认不进行深拷贝
        var deep = false;
        var name, options, src, copy, clone, copyIsArray;
        var length = arguments.length;
        // 记录要复制的对象的下标
        var i = 1;
        // 第一个参数不传布尔值的情况下，target 默认是第一个参数
        var target = arguments[0] || {};
        // 如果第一个参数是布尔值，第二个参数是 target
        if (typeof target == 'boolean') {
            deep = target;
            target = arguments[i] || {};
            i++;
        }
        // 如果target不是对象，我们是无法进行复制的，所以设为 {}
        if (typeof target !== "object" && !isFunction(target)) {
            target = {};
        }

        // 循环遍历要复制的对象们
        for (; i < length; i++) {
            // 获取当前对象
            options = arguments[i];
            // 要求不能为空 避免 extend(a,,b) 这种情况
            if (options != null) {
                for (name in options) {
                    // 目标属性值
                    src = target[name];
                    // 要复制的对象的属性值
                    copy = options[name];

                    // 解决循环引用
                    if (target === copy) {
                        continue;
                    }

                    // 要递归的对象必须是 plainObject 或者数组
                    if (deep && copy && (isPlainObject(copy) ||
                        (copyIsArray = Array.isArray(copy)))) {
                        // 要复制的对象属性值类型需要与目标属性值相同
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];

                        } else {
                            clone = src && isPlainObject(src) ? src : {};
                        }

                        target[name] = this.extend(deep, clone, copy);

                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
	}

}
  
  