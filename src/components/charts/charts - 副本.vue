<template>
	<view>

		<div id="customerChart" style="height: 445rpx;width: 700rpx;">

		</div>
	</view>
</template>



<script>
	import {
		onMounted,
		defineComponent
	} from "vue";
	import * as echarts from 'echarts'
	export default defineComponent({
		props: ["tableData", "xZuo"],
		setup(props, {
			emit
		}) {
			const myChart = ref("")
			const tableData = ref([])
			const xZuo = ref([])
			onMounted(() => {
				tableData.value = props.tableData
				xZuo.value = props.xZuo
				myChart.value = echarts.init(document.getElementById("customerChart"));
				myChart.value.setOption(getData())
				// setInterval(()=>{
				// 	changeData()
				// },1000)
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
	// onMounted(() => {
	// 	myChart.value = echarts.init(document.getElementById("customerChart"));
	// 	myChart.value.setOption(getData())
	// 	// setInterval(()=>{
	// 	// 	changeData()
	// 	// },1000)
	// })
	// const initData = () => {
	// 	if (!myChart.value) {
	// 		return false
	// 	}
	// 	myChart.value.setOption(getData())
	// }
	// const tableData = ref([6,6,6,6,6,6,8])
	// const getData = () => {
	// 	const option = {
	// 		color: ['#00DDFF'],
	// 		// title: {
	// 		//   text: 'Gradient Stacked Area Chart'
	// 		// },
	// 		tooltip: {
	// 			trigger: 'axis',
	// 			axisPointer: {
	// 				type: 'cross',
	// 				label: {
	// 					backgroundColor: '#6a7985'
	// 				}
	// 			}
	// 		},
	// 		legend: {
	// 			// data: ['Line 1', ]
	// 		},
	// 		toolbox: {
	// 			feature: {
	// 				// saveAsImage: {}
	// 			}
	// 		},
	// 		grid: {
	// 			left: '0%',
	// 			right: '0%',
	// 			bottom: '0%',
	// 			containLabel: true
	// 		},
	// 		xAxis: [{
	// 			type: 'category',
	// 			boundaryGap: false,
	// 			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	// 		}],
	// 		yAxis: [{
	// 			type: 'value'
	// 		}],
	// 		series: [{
	// 			name: '',
	// 			type: 'line',
	// 			stack: 'Total',
	// 			smooth: true,
	// 			lineStyle: {
	// 				width: 0
	// 			},
	// 			showSymbol: false,
	// 			areaStyle: {
	// 				opacity: 0.8,
	// 				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	// 						offset: 0,
	// 						color: 'rgb(128, 255, 165)'
	// 					},
	// 					{
	// 						offset: 1,
	// 						color: 'rgb(1, 191, 236)'
	// 					}
	// 				])
	// 			},
	// 			emphasis: {
	// 				focus: 'series'
	// 			},
	// 			data: tableData.value
	// 		}, ]
	// 	};
	// 	return option
	// }
</script>
<style lang="scss">
	#customerChart {
		height: 800rpx;
		width: 100%;
	}
</style>
