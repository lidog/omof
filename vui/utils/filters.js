import Vue from 'vue'

const FILTERS = 'filters';

const filters = {

    /**
     * 格式化数字  如：1435454   格式化后：1,435,454
     * @param {string} num  数字
     * */
    renderNumber  : function(num){
        var ret = "";
        ret += num;
        if(num!=null && num!=''){
        ret = ret.split("").reverse().join("").replace(/(\d{3})(?=[^$])/g, "$1,").split("").reverse().join("");
        }
        return ret; 
    },
    /**
     * 将null，undefined类型 转换为空字符串
     * @param {string} string  输出信息
     */
    strToString  : function(string) {
        if (string == null || string == "null" || string == 'NULL' || string == undefined
            || str == 'undefined' || str == 'UNDEFINED') {
        return "";
        }
        
        return string;
    },

}

for(let key in filters){
    Vue.filter(`${FILTERS}.${key}`, filters[key]);
}


