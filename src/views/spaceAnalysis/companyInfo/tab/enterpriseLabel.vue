<template>
    <div class="base-info">
        <div>
            <h5><strong><span>|&nbsp;企业标签</span></strong></h5>
            <table class="info-table">
                <table class="info-table">
                    <thead>
                        <tr>
                            <th v-for="item in labelName">{{item.name}}</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td v-for="item in labelName">{{item.status}}</td>
                    </tr>
                    </tbody>
                </table>
            </table>
            <h5><strong><span>|&nbsp;关联公司（以法人身份证关联）</span></strong></h5>
            <p v-for="item in companyData">{{item}}</p>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            companyLabel: {type: Object}
        },
        watch: {
            companyLabel: function(val){
                this.labelName[0].status=val.enterpriseLabel[0].punishmentCount;
                this.labelName[1].status=val.enterpriseLabel[0].reportCount;
                this.labelName[2].status=val.enterpriseLabel[0].exceptionCount;
                this.labelName[3].status=val.enterpriseLabel[0].iab;
                this.labelName[4].status=val.enterpriseLabel[0].nem;
                this.labelName[5].status=val.enterpriseLabel[0].yyqy;
                this.companyData=val.enterpriseRelation;
            },
        },
        data() {
            return {
                labelName:[{name:'行政处罚次数（次）',status:'是(5)'},
                    {name:'投诉举报（次）',status:'否'},
                    {name:'经营异常',status:'是'},
                    {name:'IAB企业',status:'否'},
                    {name:'NEM企业',status:'是'},
                    {name:'亿元企业',status:'否'}
                ],
                companyData:[]
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
    .base-info .float-l {
        float: left;
    }
</style>