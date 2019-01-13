<template>
  <div class="row sets-data-table" v-loading="loading">
    <div class="col-sm-8 col-md-8 col-lg-8" style="height:100%;">
      <div class="well well-sm well-light" style="background: #fff;height:100%;">
        <!--          <ul class="nav nav-tabs in" id="myTab">
                    <li class="active">
                      <a data-toggle="tab" href="" aria-expanded="true"><span class="hidden-tablet">套表</span></a>
                    </li>
                  </ul>-->
        <form>
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12">
              <div class="col-sm-12 col-md-2 col-lg-2">
                <span>套表类型:</span>
                <select class="form-control validBox" name="level" v-model="form.level"
                        @change="chooseLevel(form.level)">
                  <option v-for="item in levelOption" v-bind:value="item.value">{{item.name}}</option>
                </select>
              </div>
              <div class="col-sm-12 col-md-10 col-lg-10">
                <div class="row">
                  <div class="col-sm-12 col-md-3 col-lg-3">
                    <span>省</span>
                    <select id="province" class="form-control validBox" name="province" v-model="form.province">
                      <option value="nochoose">-请选择-</option>
                      <option v-for="item in selProvinceData" v-bind:value="item.Name" v-bind:data-value="item.Id">
                        {{item.Name}}
                      </option>
                    </select>
                  </div>
                  <div class="col-sm-12 col-md-3 col-lg-3">
                    <span>市</span>
                    <select id="city" class="form-control validBox" name="city" v-model="form.city">
                      <option value="nochoose">-请选择-</option>
                      <option v-for="item in selCityData" v-bind:value="item.Name" v-bind:data-value="item.Id">
                        {{item.Name}}
                      </option>
                    </select>
                  </div>
                  <div class="col-sm-12 col-md-3 col-lg-3">
                    <span>区</span>
                    <select id="area" class="form-control validBox" name="area" v-model="form.area">
                      <option value="nochoose">-请选择-</option>
                      <option v-for="item in selAreaData" v-bind:value="item.Name" v-bind:data-value="item.Id">
                        {{item.Name}}
                      </option>
                    </select>
                  </div>
                  <div class="col-sm-12 col-md-3 col-lg-3" v-if="streetShow">
                    <span>街镇</span>
                    <select id="street" class="form-control validBox" v-model="form.street" name="StreetId">
                      <option v-for="items in selStreetData" v-bind:value="items.Name" v-bind:data-value="items.Id">
                        {{items.Name}}
                      </option>
                      <option value="-请选择-" data-value="">-请选择-</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12">
              <div class="col-sm-12 col-md-2 col-lg-2">
                <span>年份:</span>
                <select class="form-control validBox" v-model="form.year" name="year">
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                </select>
              </div>
              <div class="col-sm-12 col-md-10 col-lg-10">
                <div class="row">
                  <div class="col-sm-12 col-md-3 col-lg-3">
                    <span>月份:</span>
                    <select class="form-control validBox" name="month" v-model="form.month">
                      <option value="1-3">1-3</option>
                      <option value="1-6">1-6</option>
                      <option value="1-9">1-9</option>
                      <option value="1-12">1-12</option>
                    </select>
                  </div>
                  <div class="col-sm-12 col-md-3 col-lg-3">
                    <span>科室</span>
                    <select id="branch" class="form-control validBox" name="branch" v-model="form.branch">
                      <option value="审批科" data-value="spk" selected="selected">审批科</option>
                      <option value="信息科" data-value="xxk">信息科</option>
                      <option value="局长办公室" data-value="jzbgs">局长办公室</option>
                    </select>
                  </div>
                  <div class="col-sm-12 col-md-3 col-lg-3">
                    <span>模板年份</span>
                    <select class="form-control validBox" name="moduleyear" v-model="form.moduleyear">
                      <option value="2016">2016</option>
                      <option value="2017">2017</option>
                      <option value="2018">2018</option>
                    </select>
                  </div>
                  <div class="col-sm-12 col-md-3 col-lg-3">
                    <span>模板类型</span>
                    <select class="form-control validBox" name="ReportType" v-model="form.ReportType">
                      <option value="YearReport" selected="selected">年度</option>
                      <option value="QuarterReport">季度</option>
                      <option value="MonthReport">月度</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12">
              <div class="col-sm-12 col-md-2 col-lg-2">
                <span>版型</span>
                <select class="form-control validBox" name="VersionType" v-model="form.VersionType">
                  <option value="SimpleReport" selected="selected">简版</option>
                  <option value="DetailReport">详版</option>
                </select>
              </div>
              <div class="col-sm-12 col-md-10 col-lg-10" style="text-align:right">
                <button class="btn btn-primary btn-sm" type="button" style="margin-top:17px;" @click="search()"><i
                  class="fa fa-search"></i>查询
                </button>
                <button class="btn btn-success btn-sm" type="button" style="margin-top:17px;" @click="allPutIn()"><i
                  class="fa fa-arrow-circle-right"></i>全选放入下载篮
                </button>
              </div>
            </div>
          </div>
        </form>
        <div class="typelist">
          <ul class="dd-list" style="margin:0 5px;">
            <li class="dd-item" v-for="item in listData">
              <div class="dd-handle">
                <p class="dd-text">{{item.text}}</p>
              </div>
              <button class="btn btn-sm btn-warning pull-right" type="button" @click="showLook(item)">
                <i class="fa fa-camera"></i>预览
              </button>
              <button class="btn btn-sm btn-success pull-right" style="margin-right: 5px;" type="button"
                      @click="singleDownload(item)">
                <i class="fa fa-arrow-dowm"></i>下载
              </button>
              <button class="btn btn-sm btn-primary pull-right" style="margin-right: 5px;" type="button"
                      @click="addDownloading(item)">
                <i class="fa fa-external-link"></i>加入
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-sm-4 col-md-4 col-lg-4">
      <div class="well well-sm well-light pos-fixed">
        <div class="jarviswidget " id="wid-id-2">
          <header style="border-bottom: 1px solid #ddd;line-height: 22px">
            <span class="widget-icon"><i class="fa fa-table"></i></span>
            <strong>下载篮</strong>
          </header>
          <!-- widget div-->
          <div class="widget-ztree">
            <!-- widget content -->
            <div class="widget-body no-padding" style="overflow:auto;max-height:430px;min-height: 200px">
              <div class="down-data" v-for="item in downData">
                <p class="alert alert-info"><strong>{{item.type}}</strong><span class="pull-right txt-color-red clean"
                                                                                @click="areaDelete(item)"><i
                  class="fa fa-trash-o"></i>清空</span></p>
                <ul class="dd-list" style="margin:0 5px;">
                  <li class="dd-item" v-for="items in item.listData" v-bind:key="items.text">
                    <div class="dd-handle">
                      <p class="dd-text">{{items.text}}</p>
                    </div>
                    <i class="fa fa-times txt-color-red cleanself" @click="subDelete(items, item)"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="widget-footer">
            <button class="btn btn-sm btn-primary pull-right" type="button" @click="downloadAll">批量下载</button>
            <select class="form-control pull-right" name="downloadtype" style="width:120px;margin-right: 5px;">
              <option>单独下载</option>
              <option>成册下载</option>
            </select>
            <button class="btn btn-sm btn-danger pull-left" type="button" @click="allDelete">清空</button>
          </div>
        </div>
      </div>
    </div>
    <form ref="fromSubmit" method="GET" action="/api/tabledemo/NewExcelDownloadFile">
      <input type="hidden" name="tableLevel" v-model="downloadFrom.tableLevel"/>
      <input type="hidden" name="TableType" v-model="downloadFrom.TableType"/>
      <input type="hidden" name="selProvince" v-model="downloadFrom.selProvince"/>
      <input type="hidden" name="selCity" v-model="downloadFrom.selCity"/>
      <input type="hidden" name="selArea" v-model="downloadFrom.selArea"/>
      <input type="hidden" name="StreetId" v-model="downloadFrom.StreetId"/>
      <input type="hidden" name="StreetTownName" v-model="downloadFrom.StreetTownName"/>

      <input type="hidden" name="Year" v-model="downloadFrom.Year"/>
      <input type="hidden" name="Month" v-model="downloadFrom.Month"/>
      <input type="hidden" name="branch" v-model="downloadFrom.branch"/>
      <input type="hidden" name="moduleyear" v-model="downloadFrom.moduleyear"/>
      <input type="hidden" name="ReportType" v-model="downloadFrom.ReportType"/>
      <input type="hidden" name="VersionType" v-model="downloadFrom.VersionType"/>
    </form>
    <el-dialog
      title="套表预览"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose">
      <iframe :src="FileOutPath" style="width:900px;height:400px;border:none"></iframe>
    </el-dialog>
  </div>
</template>
<script>
  import EcoService from '@/services/ecoDataManagement/services';
  import qs from 'qs';

  export default {
    data() {
      return {
        levelOption: [{
          value: 'Province',
          name: '省级'
        }, {
          value: 'City',
          name: '市级'
        }, {
          value: 'Area',
          name: '区级'
        }, {
          value: 'TownStreet',
          name: '镇街'
        }],
        typeName: '区级',
        form: {
          level: 'Area',
          province: '广东省',
          city: '广州市',
          area: '海珠区',
          street: '-请选择-',
          year: '2017',
          month: '1-12',
          branch: '审批科',
          moduleyear: '2017',
          ReportType: 'YearReport',
          VersionType: 'SimpleReport'
        },
        loading: false,
        streetShow: false,
        dialogVisible: false,
        FileOutPath: '',
        selProvinceData: [],
        selCityData: [],
        selAreaData: [],
        selStreetData: [],
        listData: [],
        downloadFrom: {
          tableLevel: 'Area',
          TableType: '',
          selProvince: '',
          selCity: '',
          selArea: '',
          StreetId: 'nochoose',
          StreetTownName: '',
          Year: '',
          Month: '',
          branch: '',
          moduleyear: '',
          ReportType: '',
          VersionType: ''
        },
        downData: [],
        provinceId: '',
        CityId: '',
        AreaId: '',
        StreetId: '',
        branch: '',
      }
    },
    methods: {
      chooseLevel(val) {
        if (val === 'TownStreet') {
          this.streetShow = true;
        } else {
          this.streetShow = false;
        }
        switch (val) {
          case 'TownStreet':
            this.typeName = '镇街级';
            break;
          case 'Province':
            this.typeName = '省级';
            break;
          case 'City':
            this.typeName = '市级';
            break;
          case 'Area':
            this.typeName = '区级';
            break;
        }
      },
      search() {
        this.listData = [];
        EcoService.getTableListData(this.form).then((response) => {
          if (response.data && response.data.status === 1) {
            if (response.data.Data) {
              for (var i = 0; i < response.data.Data.length; i++) {
                var object = {
                  level: this.form.level,
                  text: response.data.Data[i],
                  year: this.form.year,
                  month: this.form.month,
                  street: this.form.street,
                  branch: this.form.branch,
                  moduleyear: this.form.moduleyear,
                  ReportType: this.form.ReportType,
                  VersionType: this.form.VersionType,
                };
                this.listData.push(object);
              }
            }
          }
          console.info(this.streetData);
          //this.$Progress.finish();
        }, (response) => {
          console.log(response);
          //this.$Progress.fail();
        })
      },
      singleDownload(item) {
        var objProvince = document.getElementById("province");
        var indexProvince = objProvince.selectedIndex;
        this.provinceId = objProvince.options[indexProvince].getAttribute("data-value");

        var objCity = document.getElementById("city");
        var indexCity = objCity.selectedIndex;
        this.CityId = objCity.options[indexCity].getAttribute("data-value");

        var objArea = document.getElementById("area");
        var indexArea = objArea.selectedIndex;
        this.AreaId = objArea.options[indexArea].getAttribute("data-value");

        var objStreet = document.getElementById("street");
        this.StreetId = '';
        if (objStreet) {
          var indexStreet = objStreet.selectedIndex;
          this.StreetId = objStreet.options[indexStreet].getAttribute("data-value");
        }

        var objBranch = document.getElementById("branch");
        var indexBranch = objBranch.selectedIndex;
        this.branch = objBranch.options[indexBranch].getAttribute("data-value");

        this.downloadFrom.tableLevel = this.form.level;
        this.downloadFrom.TableType = item.text;
        this.downloadFrom.selProvince = this.provinceId;
        this.downloadFrom.selCity = this.CityId;
        this.downloadFrom.selArea = this.AreaId;
        this.downloadFrom.StreetId = this.StreetId;
        this.downloadFrom.StreetTownName = this.form.street;
        this.downloadFrom.Year = this.form.year;
        this.downloadFrom.Month = this.form.month;
        this.downloadFrom.branch = this.branch;
        this.downloadFrom.moduleyear = this.form.moduleyear;
        this.downloadFrom.ReportType = this.form.ReportType;
        this.downloadFrom.VersionType = this.form.VersionType;
        location.href = "/api/tabledemo/NewExcelDownloadFile?" + "tableLevel=" + this.downloadFrom.tableLevel
          + "&TableType=" + this.downloadFrom.TableType
          + "&selProvince=" + this.downloadFrom.selProvince
          + "&selCity=" + this.downloadFrom.selCity
          + "&selArea=" + this.downloadFrom.selArea
          + "&StreetId=" + this.downloadFrom.StreetId
          + "&StreetTownName=" + this.downloadFrom.StreetTownName
          + "&Year=" + this.downloadFrom.Year
          + "&Month=" + this.downloadFrom.Month
          + "&branch=" + this.downloadFrom.branch
          + "&moduleyear=" + this.downloadFrom.moduleyear
          + "&ReportType=" + this.downloadFrom.ReportType
          + "&VersionType=" + this.downloadFrom.VersionType
        ;
        console.info(this.downloadFrom);
        // this.$refs.fromSubmit.submit();
      },
      downloadAll() {
        var objProvince = document.getElementById("province");
        var indexProvince = objProvince.selectedIndex;
        this.provinceId = objProvince.options[indexProvince].getAttribute("data-value");

        var objCity = document.getElementById("city");
        var indexCity = objCity.selectedIndex;
        this.CityId = objCity.options[indexCity].getAttribute("data-value");

        var objArea = document.getElementById("area");
        var indexArea = objArea.selectedIndex;
        this.AreaId = objArea.options[indexArea].getAttribute("data-value");

        var objBranch = document.getElementById("branch");
        var indexBranch = objBranch.selectedIndex;
        this.branch = objBranch.options[indexBranch].getAttribute("data-value");

        var objStreet = document.getElementById("street");
        this.StreetId = '';
        if (objStreet) {
          var indexStreet = objStreet.selectedIndex;
          this.StreetId = objStreet.options[indexStreet].getAttribute("data-value");
        }

        if (this.downData.length > 0) {
          var objlist = [];
          for (var i = 0; i < this.downData.length; i++) {
            if (this.downData[i].listData) {
              for (var j = 0; j < this.downData[i].listData.length; j++) {
                var objs = {};
                objs.StreetId = this.StreetId;
                objs.tableLevel = this.downData[i].level;
                objs.Year = this.downData[i].listData[j].year;
                objs.Month = this.downData[i].listData[j].month;
                objs.keshi = this.branch;
                objs.moduleyear = this.downData[i].listData[j].moduleyear;
                objs.selArea = this.AreaId;
                objs.province = this.provinceId;
                objs.city = this.CityId;
                objs.TableType = this.downData[i].listData[j].text;
                objs.VersionType = this.downData[i].listData[j].VersionType;
                objs.ReportType = this.downData[i].listData[j].ReportType;
                objs.StreetTownName = this.form.street;
                objlist.push(objs);
              }
            }
          }
          console.info(objlist);
          var param = {"data": JSON.stringify(objlist)};
          this.loading = true;
          EcoService.getDownData(qs.stringify(param)).then((response) => {
            if (response.data && response.data.status === 1) {
              location.href = "/api/tabledemo/NewExcelBatchDownloadFile?zipName=" + response.data.Data;
            }
            this.loading = false;
          });
        } else {
          this.$message({
            showClose: true,
            message: '下载篮中为空，请加入要下载的套表!',
            type: 'warning'
          });
        }
      },
      handleClose() {
        this.dialogVisible = false;
      },
      showLook(item) {
        this.loading = true;
        var objProvince = document.getElementById("province");
        var indexProvince = objProvince.selectedIndex;
        this.provinceId = objProvince.options[indexProvince].getAttribute("data-value");

        var objCity = document.getElementById("city");
        var indexCity = objCity.selectedIndex;
        this.CityId = objCity.options[indexCity].getAttribute("data-value");

        var objArea = document.getElementById("area");
        var indexArea = objArea.selectedIndex;
        this.AreaId = objArea.options[indexArea].getAttribute("data-value");

        var objStreet = document.getElementById("street");
        this.StreetId = '';
        if (objStreet) {
          var indexStreet = objStreet.selectedIndex;
          this.StreetId = objStreet.options[indexStreet].getAttribute("data-value");
        }

        var objBranch = document.getElementById("branch");
        var indexBranch = objBranch.selectedIndex;
        this.branch = objBranch.options[indexBranch].getAttribute("data-value");

        this.downloadFrom.tableLevel = this.form.level;
        this.downloadFrom.TableType = item.text;
        this.downloadFrom.selProvince = this.provinceId;
        this.downloadFrom.selCity = this.CityId;
        this.downloadFrom.selArea = this.AreaId;
        this.downloadFrom.StreetId = this.StreetId;
        this.downloadFrom.StreetTownName = this.form.street;
        this.downloadFrom.Year = this.form.year;
        this.downloadFrom.Month = this.form.month;
        this.downloadFrom.branch = this.branch;
        this.downloadFrom.moduleyear = this.form.moduleyear;
        this.downloadFrom.ReportType = this.form.ReportType;
        this.downloadFrom.VersionType = this.form.VersionType;
        EcoService.getLook(qs.stringify(this.downloadFrom)).then((response) => {
          if (response.data && response.data.status === 1) {
            this.dialogVisible = true;
            this.FileOutPath = response.data.Data.FileOutPath;
          } else {
            this.$message({
              showClose: true,
              message: '预览失败!',
              type: 'error'
            });
          }
          this.loading = false;
        });
      },
      addDownloading(item) {
        var isNew = true, subIsNew = true;
        for (var i = 0; i < this.levelOption.length; i++) {
          if (this.form.level === this.levelOption[i].value) {
            this.typeName = this.levelOption[i].name;
            break;
          }
        }
        for (var i = 0; i < this.downData.length; i++) {
          if (this.form.level == this.downData[i].level) {
            for (var j = 0; j < this.downData[i].listData.length; j++) {
              if (item.text == this.downData[i].listData[j].text) {
                subIsNew = false;
                this.$message({
                  showClose: true,
                  message: '已添加该条信息',
                  type: 'warning'
                });
                break;
              }
            }
            if (subIsNew) {
              this.downData[i].listData.push(item);
            }
            isNew = false;
            break;
          }
        }
        if (isNew) {
          var newobject = {
            level: this.form.level,
            type: this.typeName,
            listData: []
          }
          newobject.listData.push(item);
          this.downData.push(newobject);
        }
      },
      allPutIn() {
        var isNew = true;
        for (var i = 0; i < this.downData.length; i++) {
          if (this.form.level === this.downData[i].level) {
            isNew = false;
            this.$message({
              showClose: true,
              message: '已添加该级信息',
              type: 'warning'
            });
            break;
          }
        }
        if (isNew && this.listData.length > 0) {
          var newobject = {
            level: this.form.level,
            type: this.typeName,
            listData: []
          }
          newobject.listData = [].concat(this.listData);
          this.downData.push(newobject);
        }
      },
      allDelete() {
        this.downData = [];
      },
      areaDelete(param) {
        for (var i = 0; i < this.downData.length; i++) {
          if (param.level === this.downData[i].level) {
            this.downData.splice(i, 1);
            break;
          }
        }
      },
      subDelete(item, listData) {
        for (var i = 0; i < listData.listData.length; i++) {
          if (item.text === listData.listData[i].text) {
            listData.listData.splice(i, 1);
            break;
          }
        }
      },
      getStreetTowns() {
        EcoService.getHaizhuStreetData().then((response) => {
          if (response.data && response.data.status === 1) {
            this.selProvinceData = response.data.Data.Province;
            this.selCityData = response.data.Data.Province[0].City;
            this.selAreaData = response.data.Data.Province[0].City[0].Area;
            this.selStreetData = response.data.Data.Province[0].City[0].Area[0].Street;
          }
          //this.$Progress.finish();
        }, (response) => {
          console.log(response);
          //this.$Progress.fail();
        })
      }
    },
    created() {
      this.getStreetTowns();
    }
  }
</script>
<style lang="less">
  .sets-data-table {
    overflow: hidden;
    & .widget-footer {
      padding: 5px 10px;
      height: 35px;
    }
    & .form-control {
      padding: 2px 5px;
    }
    & .typelist {
      max-height: 70%;
      overflow: auto;
      padding: 5px 0;
      & .dd-item {
        display: block;
        margin: 5px;
        padding: 5px 10px;
        font-size: 13px;
        border: 1px solid #cfcfcf;
        background: #fbfbfb;
        height: 42px;
        & .dd-handle {
          display: inline-block;
          width: 72%;
          line-height: 30px;
          color: #333;
          text-decoration: none;
          & .dd-text {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
    & .dd-item:hover {
      background: #FDDFB3 !important;
      border: 1px solid #FAA937;
      color: #333 !important;
    }
    & .down-data {
      border: 1px solid #bce8f1;
      border-radius: 4px;
      padding-bottom: 5px;
      margin-bottom: 10px;
      & .txt-color-red {
        color: #d2322d;
      }
      & .dd-item {
        position: relative;
        display: block;
        margin: 5px;
        padding: 3px;
        font-size: 13px;
        border: 1px solid #cfcfcf;
        background: #fbfbfb;
      }
      & .dd-handle {
        display: inline-block;
        width: 90%;
        line-height: 1.5;
        color: #333;
        text-decoration: none;
        & .dd-text {
          width: 100%;
        }
      }
      & .cleanself {
        cursor: pointer;
        position: absolute;
        right: 7px;
        top: 12px;
      }
      & .clean {
        cursor: pointer;
      }
      & .alert {
        padding: 5px 10px;
      }
    }
  }

  .pos-fixed {
    background: #fff;
  }
</style>
