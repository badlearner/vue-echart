<template>
    <div class="base-info">
            <h5><strong><span>用地面积：</span><span>{{area}}{{areaUnit}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>片区房价（元）</span></strong></h5>
            <table class="info-table">
                <thead>
                <tr>
                    <th>片区</th>
                    <th v-for="item in year">{{item}}</th>
                    <th>片区</th>
                    <th v-for="item in year">{{item}}</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="item in areaData">
                        <td>{{item.areaName}}</td>
                        <td v-for="items in item.data">{{items}}</td>
                        <td>{{item.areaName}}</td>
                        <td v-for="items in item.data">{{items}}</td>
                    </tr>
                </tbody>
            </table>
            <h5><strong><span>土地利用现状数据2014（平方米）</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>现状建设用地面积469393.30</span></strong></h5>
            <h5><strong><span>基准地价（元）</span></strong></h5>
            <table class="info-table">
                <thead>
                <tr>
                    <th>分类</th>
                    <th v-for="item in year">{{item}}</th>
                    <th>分类</th>
                    <th v-for="item in year">{{item}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in landPriceData">
                    <td>{{item.areaName}}</td>
                    <td v-for="items in item.data">{{items}}</td>
                    <td>{{item.areaName}}</td>
                    <td v-for="items in item.data">{{items}}</td>
                </tr>
                </tbody>
            </table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                area:'456784',
                areaUnit:'(平方米)',
                year:[2012,2011,2013,2014,2015],
                areaData:[{areaName:'江高片',data:[2334,4556,34567,54332,7665]},{areaName:'海珠片',data:[2334,4556,34567,54332,7665]}],
                landPriceData:[{areaName:'商业',data:[2334,4556,34567,54332,7665]},{areaName:'住宅',data:[2334,4556,34567,54332,7665]}]

            }
        },
        methods:{
            tabClick(){

            }
        },
        created() {

        },
        mounted() {

        }
    }
</script>
<style>
    .base-info .info-table {
        margin-top: 10px;
        font-size: 12px;
        width: 100%;
    }

    .base-info .info-table thead tr {
        background: #dddddd;
    }

    .base-info .info-table thead th {
        border: 1px solid #fff;
        text-align: center;
        padding: 1px 6px;
    }

    .base-info .info-table tbody td {
        border: 1px solid #fff;
        text-align: center;
        padding: 1px 6px;
    }

    .base-info .info-table tbody tr {
        background: #f1f1f1;
    }

    .base-info .info-table tbody tr:hover {
        background: #e0e0e0;
    }
</style>