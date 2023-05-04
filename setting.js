import themeNum1 from './color/themeNum1.js';
import {
	userStore
} from "@/store/themeNum.js";
const store = userStore();

let dev = 3
let COUNTRY = {
	url: '',
	qianzhui: '',
	lang: "",
	title: "",
	icon: "",
	indexLogo: "",
	lotterImg:"",
	indexTitle:"",
	indexLotterylogo:"/static/act/indexLotteryIcon.png" //转盘icon
}

// /api  切换page.jsonZhong  title  
if (dev == 1) {
	COUNTRY.url = 'hldev.task777.com'
	COUNTRY.lang = "en"
	COUNTRY.title = ""
	COUNTRY.icon = ""
	COUNTRY.indexLogo = ""
	COUNTRY.lotterImg = "url('/static/act/999.png')"
	
} else if (dev == 2) {
	COUNTRY.url = 'api.nigeria999.com'
	COUNTRY.lang = "en"
	COUNTRY.title = "Crown Club"
	COUNTRY.icon = "/static/titleIcon/niri.png"
	COUNTRY.indexLogo = "/static/titleIcon/niriLang.png"
	COUNTRY.lotterImg = "url('/static/act/go.png')"
} else if (dev == 3) {
	COUNTRY.url = 'api.369club.vip'
	COUNTRY.lang = "in"
	COUNTRY.title = ""
	COUNTRY.icon = ""
	COUNTRY.indexTitle = "369club"
	COUNTRY.indexLogo = ""
	COUNTRY.lotterImg = "url('/static/act/go.png')"
} else if (dev == 4) {
	COUNTRY.url = 'api.999clubs.in'
	COUNTRY.lang = "in"
	COUNTRY.title = "999CLUB"
	COUNTRY.icon = "/static/titleIcon/999.jpg"
	COUNTRY.indexLogo = "/static/titleIcon/999Lang.png"
	COUNTRY.lotterImg = "url('/static/act/999.png')"
} 


COUNTRY.HOST = `https://${COUNTRY.url}` + '/api/'


export default COUNTRY
