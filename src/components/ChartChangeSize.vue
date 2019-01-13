<template>
    <div style="position: relative;  top: -100%;">
        <div class="chart-title">
        <span @click.stop="showChangeSize">{{ title }} {{ currSize }}
            <i class="fa fa-caret-square-o-down"></i></span>
        </div>
        <ul class="chart-change-size" v-show="show" @click="chartSizeBubble($event)">
            <li>
                <span>显示前：</span>
                <select class="chart-size select" @change="changeSize($event)" v-model="currSize">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                </select>
            </li>
        </ul>
    </div>
</template>
<script>
	import Vue from 'vue';
	import {addHandler} from '@/utils/iframeUtil';

	export default {
		props: {
			name: {
				type: String,
				default: ''
			},
			title: {
				type: String
			},
			size: {
				type: Number,
				default: 20
			}
		},
		data() {
			return {
				show: false,
				isIn: false,
				currSize: this.size
			}
		},
		methods: {
			isInContainer(isIn) {
				this.isIn = isIn;
			},
			showChangeSize() {
				this.show = !this.show;
			},
			changeSize(event) {
				event.stopPropagation();
				this.show = false;
				this.$emit('sizeChange', this.currSize);
			},
			documentClick() {
				addHandler(document, 'click', () => {
					if (this.isIn === false) {
						this.show = false;
					}
				})
			},
			chartSizeBubble(event) {
				event.stopPropagation();
			}
		},
		mounted() {
			this.documentClick();
		}
	}
</script>
<style lang="less">
    .chart-title {
        position: relative;
        top: -100%;
        margin-top: 5px;
        text-align: center;
    }

    .chart-title > span {
        height: 18px;
        cursor: pointer;
        margin: 0 auto;
        font-size: 15px;
        font-weight: 700;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .skin-one .chart-title > span {
        color: #585858;
    }

    .skin-two .chart-title > span {
        color: #fff;
    }

    .chart-change-size:after {
        border: 10px solid transparent;
        border-bottom: 10px solid #3fb7e0;
        content: '';
        position: relative;
        top: -85px;
    }

    .chart-change-size > li {
        padding: 5px 0;
        line-height: 41px;
    }

    .chart-change-size {
        border: 1px solid #3fb7e0;
        background: #fff;
        border-radius: 3px;
        margin: 10px auto 0;
        width: 280px;
        padding: 5px 0;
        z-index: 1000;
        position: relative;
        text-align: center;
        top: -100%;
        height: 63px;
    }

    .chart-size {
        width: 140px;
    }
</style>
