<template>
    <div class="year-next" v-if="yearStep">
        <el-tooltip :content="btnText" placement="top" effect="light">
            <button type="button" class="btn btn-primary btn-xs stop" @click="stopYearInterval(btnStop)"><i class="fa fa-pause" :class="{'fa-pause' : btnStop,'fa-forward' : !btnStop }"></i></button>
        </el-tooltip>
        <el-steps value="true" :active="active" align-center>
            <el-step v-for="item in yearList" :title="item+''" :key="item"></el-step>
        </el-steps>
        <el-tooltip content="设置时间间隔" placement="top" effect="light">
            <button type="button" class="btn btn-default btn-xs start" @click="setIntervalTime()" ><i class="fa fa-clock-o"></i></button>
        </el-tooltip>
        <div class="second-div" v-if="visible">
            <input  type="number" placeholder="秒" v-model="secondTime" />
            <button type="button" class="btn btn-primary btn-xs" @click="setIntervalTimeSure()" >确定</button>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import * as types from '@/store/mutation-types';
    import {Steps,Step,Tooltip,Popover} from 'element-ui';
    Vue.use(Steps)
    Vue.use(Step)
    Vue.use(Tooltip)
    Vue.use(Popover)
    export default {
        props: {
            subData: {type: Object}
        },
        data() {
            return {
                btnText:'开始',
                btnStop:false,
                yearStep:true,
                active:0,
                visible:false,
                secondTime:null,
                yearList:[],
            }
        },
        methods: {
            yearChange(currentYear){
                let startYear=parseInt(this.$store.state.spaceAnalysisSearch.startYear),endYear=parseInt(this.$store.state.spaceAnalysisSearch.endYear),yearList=[],active_item;
                for(var i=0;i<(endYear-startYear)+1;i++){
                    yearList[i]=startYear+i;
                }
                for(var j=0;j<yearList.length;j++){
                    if(yearList[j]==parseInt(currentYear)){
                        active_item=j;
                    }
                }
                this.yearList= yearList;
                this.active= active_item;
                //this.yearSetInterval();
            },
            //循环年
            yearSetInterval(value){
                var secondTime=value ? value: 5000;
                this.yearClearInterval();
                this.intervals=setInterval(()=> {
                    this.active=this.active+1;
                    if(this.active>this.yearList.length||this.active==this.yearList.length){
                        this.active=0;
                    }
                    this.subData.currentYear=this.yearList[this.active];
                    this.$store.commit(types.SET_CURRENT_YEAR, this.subData.currentYear);
                    this.$parent.$refs.emphasis.mapSearch({type:'时间演变'});
                },secondTime);
            },
            //是否停止循环
            stopYearInterval(type){
                if(type){
                    this.yearClearInterval();
                    this.btnText='开始';
                }else{
                    this.startYearInterval();
                    this.btnText='暂停';
                }
                this.btnStop =!type;
            },
            //开始循环
            startYearInterval(){
                this.yearSetInterval();
            },
            //清除
            yearClearInterval(){
                clearInterval(this.intervals);
            },
            //设置时间
            setIntervalTime(){
                this.visible=!this.visible;
            },
            setIntervalTimeSure(){
                var self=this;
                if(this.secondTime&&this.secondTime>0){
                    this.$message({
                        showClose: false,
                        type:'success',
                        message:'设置成功!',
                        onClose:function(){
                            self.visible=false;
                            self.yearSetInterval(self.secondTime*1000);
                        }
                    });
                }else{
                    this.$message({
                        showClose: false,
                        type:'error',
                        message:'数据格式不对!',
                    });
                }
            }
        },
        created() {

        },
        mounted() {

        },
        deactivated() {
            this.yearClearInterval();
        }
    }
</script>
<style>
    .i-frame .map-right .year-next {
        position: absolute;
        z-index: 100;
        left: 10px;
        bottom: 5px;
        width: 50%;
        height: 60px;
    }

    .year-next .start {
        position: absolute;
        z-index: 100;
        right: 10px;
        top: 1px;
    }

    .year-next .stop {
        position: absolute;
        z-index: 100;
        left: 10px;
        top: 1px;
    }

    .year-next .second-div {
        width: 110px;
        height: 30px;
        position: absolute;
        z-index: 100;
        right: -115px;
        top: 1px;
    }

    .year-next .second-div input {
        vertical-align: top;
        width: 60px;
        height: 22px;
        padding-left: 2px;
    }

    .year-next .is-finish {
        color: #c0c4cc;
        border-color: #c0c4cc;
    }

    .year-next .is-process {
        color: #409eff;
        border-color: #409eff;
    }

    .darkblue .el-tooltip__popper.is-light {
        background: #1e6ec3;
    }

    .darkblue .el-tooltip__popper.is-light[x-placement^=top] .popper__arrow::after {
        border-top-color: #1e6ec3;
    }

    .darkgray .el-tooltip__popper.is-light {
        background: #313e4f;
    }

    .darkgray .el-tooltip__popper.is-light[x-placement^=top] .popper__arrow:after {
        border-top-color: #313e4f;
    }

    .year-next .el-step__title {
        font-size: 12px;
        line-height: 20px;
    }
</style>