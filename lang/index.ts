import {
	createI18n
} from 'vue-i18n'
import langEn from './en';
import langIn from './in';
// import langPt from './pt';

// import 

const messages = {
	'en': langEn,
	'in': langIn,
	// 'pt': langPt,

}
if (!uni.getStorageSync('lang')) {
	uni.setStorageSync('lang', 'en')
}
let cur_lang = uni.getStorageSync('lang')

if(cur_lang == 'ar'){
	let eles = document.querySelector("html")
	document.querySelector("html").setAttribute("dir",'rtl')
}

	
const i18n = createI18n({
	globalInjection: true, //全局$t 生效
	locale: uni.getStorageSync('lang') || 'en',
	messages,
	legacy: false
})

export default i18n
