<template>
	<view>

		<div id="customerChart" style="height: 445rpx;width: 700rpx;">

		</div>
	</view>
</template>



<script>
	import {
		onMounted,watch,
		defineComponent
	} from "vue";
	import request from '../../../comm/request.ts';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	import * as echarts from 'echarts'
	export default defineComponent({
		props: [],
		setup(props, {
			emit
		}) {
			const myChart = ref("")
			const tableData = ref([])
			const xZuo = ref([])
			
			
			const getTableData = ()=>{
				request({
					url: 'machine/index',
					methods: 'get',
					data: {}
				}).then(res => {
					
					let newTale1 = []
					let newTale2 = []
					for (let i = 0; i < res.panel_arr.length; i++) {
						newTale1.push(res.panel_arr[i].panel)
						newTale2.push(res.panel_arr[i].date)
					}
				
					tableData.value = newTale1
					xZuo.value = newTale2
					myChart.value = echarts.init(document.getElementById("customerChart"));
					myChart.value.setOption(getData())
				})
			}
			// watch(tableData, (newVal, oldVal) => {
			// 	if(oldVal){
			// 		myChart.value = echarts.init(document.getElementById("customerChart"));
			// 		myChart.value.setOption(getData())
			// 	}
			// })
			onShow(() => {
				getTableData()
			})
			const getData = () => {
				const option = {
					color: ['#00DDFF'],
					// title: {
					//   text: 'Gradient Stacked Area Chart'
					// },
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},
					legend: {
						// data: ['Line 1', ]
					},
					textStyle: {
						color: "#000",
						// fontWeight:"bold",
						// fontFamily:"Microsoft YaHei"
						fontFamily: "PingFangSC"
					},

					toolbox: {
						feature: {
							// saveAsImage: {}
						}
					},
					grid: {
						left: '0%',
						right: '5%',
						bottom: '0%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						data: xZuo.value,
						show: true
					}],
					yAxis: [{
						type: 'value',
					}],
					series: [{
						name: '',
						type: 'line',
						stack: 'Total',
						smooth: true,
						// clip:true,
						lineStyle: {
							width: 1,
							color: "#39c255",
							label: {
								show: true // 在折线拐点上显示数据
							},
							lineStyle: {
								width: 3, // 设置虚线宽度
								type: 'dotted' // 虚线'dotted' 实线'solid'
							}
						},
						showSymbol: false,
						areaStyle: {
							opacity: 0.8,
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#8ddc9d',
								},
								{
									offset: 1,
									color: 'rgb(255,255,255)'
								}
							])
						},
						emphasis: {
							focus: 'series'
						},
						data: tableData.value,

					}, ]
				};
				return option
			}

		}

	})
</script>
<style lang="scss">
	#customerChart {
		height: 800rpx;
		width: 100%;
	}
</style>
