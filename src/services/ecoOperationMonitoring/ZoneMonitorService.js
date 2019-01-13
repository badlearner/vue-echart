'use strict';

import axios from 'axios';
import Base from '../base';

class ZoneMonitor extends Base {
  constructor() {
    super();
  }

  getEnterpriseDataByIndustry(option) {
    return axios.get('/api/IndustryMonitor/IndustryOverall', option);
  }

  getHighTechnologyData(option) {
    return axios.get('/api/IndustryMonitor/GetHighTechnology', option);
  }


  getOnLineShopData(option) {
    return axios.get('/api/IndustryMonitor/getOnLineShopData', option);
  }

  getLogisticsData(option) {
    return axios.get('/api/IndustryMonitor/GetLogisticsData', option);
  }

  /**
   * 外商投资
   * @param {Object} ctx Vue的实例
   * @param {Object} option 需要的url 参数
   **/
  getForeignInvestmentData(option) {
    return axios.get('/api/IndustryMonitor/GetForeignInvestmentData', option);
  }

  /**
   * 外商投资额排名数据
   * @param {Object} option 需要的url 参数
   **/
  getForeignInvestmentRankingData(option) {
    return axios.get('/api/industryMonitor/getForeignInvestmentDetail', option);
  }

  /**
   * 外资企业(二期地图)
   **/
  getZoneForeignInvestmentData() {
    return axios.get('/api/IndustryMonitor/GetStreetForeignInvestmentData');
  }


  /**
   * 留用地
   * @param {Object} option 需要的url 参数
   **/
  getDataRetained(option) {
    return axios.get('/api/IndustryMonitor/IndustryReserveLand', option);
  }


  /**
   * 工业园区（二期接口）
   * @param {Object} option 需要的url 参数
   **/
  getDataIndustrydistrict2(option) {
    return axios.get('/api/IndustryMonitor/IndustrialAreaV2', option);
  }

  /**
   * 工业园区）各种图表 可选Top排名
   * @param {Object} option 需要的url 参数
   **/
  getChartDataByIndustryDisType(option) {
    return axios.get('/api/IndustryMonitor/IndustrialAreaWarp', option);
  }

  /**
   * @param {Object} ctx Vue的实例
   * @param {Object} option 需要的url 参数
   **/
  getDataIndustrymap2(option) {
    return axios.get('/api/IndustryMonitor/IndustrialAreaStreetTownList', option);
  }

  /**
   * 扶持项目
   * @param {Object} option 需要的url 参数
   **/
  getDataSupport(option) {
    return axios.get('/api/IndustryMonitor/GetSupportPolicyData', option);
  }

  /**
   * 招商资源监测
   * @param {Object} option 需要的url 参数
   **/
  getInvestmentCarrierData(option) {
    return axios.get('/api/IndustryMonitor/GetInvestmentDataNew', option);
  }

  /**
   * 招商资源监测 -- 画像
   * @param {Object} option 需要的url 参数
   **/
  getInvestmentCarrierPortraitById(option) {
    return axios.get('/api/InvestmentMonitor/ResourcePortrayal', option);
  }

  /**
   * 招商资源监测 (地图)
   * @param {Object} option 需要的url 参数
   **/
  getInvestmentCarrierDataByZone(option) {
    return axios.get('/api/industryMonitor/getInvestmentCarrierData', option);
  }

  /**
   * 招商项目监测 (地图)
   * @param {Object} option 需要的url 参数
   **/
  getInvestmentProjectMapData(option) {
    return axios.get('/api/InvestmentMonitor/ProjectMapChart', option);
  }

  /**
   * 招商项目监测 (地图)
   * @param {Object} option 需要的url 参数
   **/
  getInvestmentProjectChartsData(option) {
    return axios.get('/api/InvestmentMonitor/ProjectChart', option);
  }

  /**
   * 招商项目监测 -- 画像
   * @param {Object} option 需要的url 参数
   **/
  getInvestmentProjectPortraitById(option) {
    return axios.get('/api/InvestmentMonitor/ProjectPortrayal', option);
  }

  /**
   * 转型升级
   * @param {Object} option 需要的url 参数
   **/
  getDataUpgrading(option) {
    return axios.get('/api/IndustryMonitor/TransUpdateProgram', option);
  }

  /**
   * 行业监测 (工业, 服务业, 建筑业, 房地产) 公用接口
   * @param {Object} option 需要的url 参数
   **/
  getDataWithIndustry(option) {
    return axios.get('/api/IndustryMonitor/IndustryMonitor', option);
  }

  /**
   * 行业监测 (工业, 服务业, 建筑业, 房地产) 公用接口
   * @param {Object} option 需要的url 参数
   **/
  getIndustrialMapDataByType(option) {
    return axios.get('/api/IndustryMonitor/getIndustrialEnterpriseDataByType', option);
  }

  /**
   * 专业批发市场
   * @param {Object} option 需要的url 参数
   **/
  getDataProfessional(option) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode !== this.MOCK) {
        return this.processRequest(axios.get('mock/professionMarket'));
      }
    }
    return this.processRequest(axios.get('/EnterpriseBigData/a/api/qyjjxxkz/ebdQyjbxxkz/getAllJzInfo'));
  }

  /**
   * 专业批发市场zonechart数据
   * @param {Object} option 需要的url 参数
   **/
  getProMarketMapData(option) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode !== this.MOCK) {
        return this.processRequest(axios.get('mock/professionMarketMap'));
      }
    }
    return this.processRequest(axios.get('/EnterpriseBigData/a/api/qyjjxxkz/ebdQyjbxxkz/getAllJzInfo'));
  }

  /**
   * 工业技改
   * @param {Object} option 需要的url 参数
   **/
  getTechnicalTransformationData(option) {
    return axios.get('/api/IndustryMonitor/TechnologyReformDataNew', option);
  }

  /**
   * 销售数量 新版-电商企业监测
   * @param {Object} option 需要的url 参数
   **/
  getOnLineShopDataForSalesVolume(option) {
    return axios.get('/api/IndustryMonitor/GetOnLineShopDataSalesVolume', option)
  }

  /**
   * 电商地图
   * @param {Object} option 需要的url 参数
   **/
  getOnLineShopAmountByZone() {
    return axios.get('/api/IndustryMonitor/GetStreetTownNameOnLineShopAmount')
  }


  /**
   * 销售额 新版-电商企业监测
   * @param {Object} option 需要的url 参数
   **/
  getOnLineShopDataForSales(option) {
    return axios.get('/api/IndustryMonitor/GetOnLineShopDataSalesAmount', option)
  }

  /**
   * 专业批发市场
   * @param {Object} option 需要的url 参数
   **/
  getProMarketData(option) {
    return axios.get('/api/IndustryMonitor/GetSpecializedMarketSummaryPicture', option);
  }


  /**
   * 留用地map地图表格数据
   **/
  getRetainedData() {
    return axios.get('/api/IndustryMonitor/StreetIndustryReserveLand');
  }

  /**
   * 高新技术企业map地图表格数据
   **/
  getHighTechnologyEnterpriseOfNumByZone() {
    return axios.get('/api/IndustryMonitor/HighTechStreetTownList');
  }

  /**
   * 物流企业监测map地图表格数据
   **/
  getLogisticsEnterpriseOfNumByZone() {
    return axios.get('/api/industryMonitor/getStreetTownNameLogistics');
  }

  /**
   * 物流站场监测map地图表格数据
   **/
  getLogisticsStationEnterpriseOfNumByZone() {
    return axios.get('/api/industryMonitor/GetStreetTownNameLogisticsStation');
  }

  /**
   * 物流站场监测详细信息数据
   **/
  getLogisticsStationEnterpriseOfDetail(option) {
    return axios.get('/api/industryMonitor/GetLogisticsStationById', option);
  }

  /**
   * 四上商业监测 数据
   * @param {Object} ctx Vue的实例
   **/
  getFourCapsBusinessData(option) {
    return axios.get('/api/industryMonitor/getFourCapsBusinessData', option);
  }

  /**
   * 四上商业监测  (echart 地图)数据
   * @param {Object} option 需要的url 参数
   **/
  getBusinessMapData(option) {
    return axios.get('/api/IndustryMonitor/QuotaBusinessIndexMap', option);
  }

  /**
   * 专项监测 - 总体指标地图 数据
   * @param {Object} option 需要的url 参数
   **/
  getIndustryIndexMapData(option) {
    return axios.get('/api/IndustryMonitor/IndustryIndexMap', option);
  }

  /**
   * 民科园画像 - 经济指标数据
   * @param {Object} option 需要的url 参数
   **/
  getEcoIndicators(option) {
    return axios.get('/api/AreaMonitor/GetEconomicIndexBySSYQ', option);
  }

  /**
   * 民科园画像 - 入驻企业数据
   * @param {Object} option 需要的url 参数
   **/
  getNumCompanies(option) {
    return axios.get('/api/AreaMonitor/GetRZEnterpriseInfo', option);
  }

  /**
   * 民科园画像 - 园区产值地位数据
   * @param {Object} option 需要的url 参数
   **/
  getChildrenZoneOutput(option) {
    return axios.get('/api/AreaMonitor/GetYQCZCompare', option);
  }

  /**
   * 民科园画像 - echart行业数据
   * @param {Object} option 需要的url 参数
   **/
  getIndustryData(option) {
    return axios.get('/api/AreaMonitor/GetEnterpriseProportion', option);
  }

  /**
   * 行业监测 - 子行业数据
   * @param {Object} ctx Vue的实例
   **/
  getIndustryType(option) {
    return axios.get('/api/IndustryMonitor/GetIndustryByName', option);
  }
}

export default new ZoneMonitor();
