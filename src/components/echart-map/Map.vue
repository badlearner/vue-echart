<template>
    <chart :options="chartOption" ref="map" auto-resize/>
</template>
<script>
    import ECharts from 'vue-echarts/components/ECharts'
    import axios from 'axios'
    import localStorageUtil from '@/utils/localStorageUtil'
    export default {
        props: {
            src: {type: String},
            mapName: {type: String},
            chartOption: {type: Object}
        },
        data () {
            return {
                isLoading: true,
                isExistData: false,
                isLoadingFail: false,
                option: null
            }
        },
        methods: {
            mergeOptions (option) {
                this.option = option
                this.isExistData = true

                if (this.isLoadingFail) {
                    this.getMapJson()
                } else if (!this.isLoading) {
                    this.$refs.map.mergeOptions(option)
                }
            },
            getMapJson () {
              axios.get(this.src).then((response) => {
                ECharts.registerMap(this.mapName, response.data);
                this.isLoading = false;
                this.isExistData && this.$refs.map.mergeOptions(this.option);
              }, (response) => {
                this.isLoadingFail = true;
                console.log(response);
              });
            }
        },
        mounted () {
          this.getMapJson()
        }
    }
</script>
