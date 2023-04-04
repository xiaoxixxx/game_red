import {
	defineStore
} from 'pinia'

export const userStore = defineStore({
	id: 'themeNum', // 命名，唯一
	state: () => {
		return {
			contentColor: '#16B739',
			btnDis: "#ccc",
			secondColor: "",
			imgObj: {
				backIcon:"/static/themeNum1/back.png",
				left:"/static/themeNum1/icon/left.png"
			},
			index:{
				red:{
					'background': "url('/static/themeNum1/img/indexRed.png') no-repeat 100%/100%",
					 "height": "213rpx"
				}
			},
			my: {},
			wr: {
				reBox:{
					background:"url('/static/themeNum1/img/reBox.png') repeat-y 100%/100%",
					
				}
			},
			task: {},
			countryCode: []
		}
	},
	actions: {
		setThemenum(data) {
			// 可直接通过this访问state属性
			this.themeNum = data;
		},
		setCountryCode(data) {
			// 可直接通过this访问state属性
			this.countryCode = data;
		},
		setContentColor(data) {
			this.contentColor = data
		},
		setSecondColor(data) {
			this.secondColor = data
		},
		setImgObj(data) {
			this.imgObj = data
		},
		setMy(data) {
			this.my = data
		},
		setWr(data) {
			this.wr = data
		},
		setTask(data) {
			this.task = data
		}
	},
	// 持久化存储
	// persist:{
	// 	enabled:false,
	// 	strategies:[{
	// 		key:'themeNum',
	// 		storage:localStorage
	// 	}]
	// }
})
