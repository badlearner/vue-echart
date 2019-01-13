/**
 * 发送给地图的参数数据格式
 *
param:{
    type:'批量企业查询',          //分析类型(string)
    pageName:'重点企业产业分析',  //页面(string)
    data:{
        enterpriseName:'',      //企业名称或资源名称(string)
        timeRange:[2011,2017],  //时间范围(Array)
        street:[],              //街镇（多选）(Array)
        industryType:'',        //产业类型(string)
        companyType:'',         //企业类型(string)
        customArea:'',          //自定义区域(string)
        capitalRange:[5,100000],//注册资本范围(Array)
        capitalRangeUnit:'万',  //注册资本单位(string)
        HY:[],                  //行业类型多选（多选）(Array)
        currentYear:2016        //当前年份(number)
    }
}
 **/

/**
 * 地图返回的数据格式

 **/