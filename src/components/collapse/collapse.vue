<template>

	<view v-html="pageData"></view>

</template>
<script>
	import {
		reactive,
		toRefs,
		defineComponent
	} from 'vue';
	export default defineComponent({
		props: ["data"],
		setup(props, {
			emit
		}) {
			const activeNames = reactive([]);
			const data = ref(props.data)
			const pageData = ""
		
			
			return {
				data,
				activeNames,
				...toRefs(title)
			};
		}

	})
</script>
