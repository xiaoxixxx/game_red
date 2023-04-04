import themeNum1 from './color/themeNum1.js';
import {
	userStore
} from "@/store/themeNum.js";
const store = userStore();

let dev = 1
let COUNTRY = {
	url: '',
	qianzhui: '',
	lang: "",
	title: "",
	icon: ""
}

// /api
if (dev == 1) {
	COUNTRY.url='neapi.aamocb.com',
	COUNTRY.lang="en",
	COUNTRY.title="",
	COUNTRY.icon=""
}


// if (COUNTRY.themeNum == 1) {
// 	store.setContentColor(themeNum1.contentColor)
// 	store.setSecondColor(themeNum1.secondColor)
// 	store.setImgObj(themeNum1.imgObj)
// 	store.setMy(themeNum1.my)
// 	store.setWr(themeNum1.wr)
// 	store.setTask(themeNum1.task)
// }

COUNTRY.HOST = `https://${COUNTRY.url}` + '/api/'


export default COUNTRY
