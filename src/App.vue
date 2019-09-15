<template>
  	<div id="app">
		<div class="colour-combo">
			<ImageBox />
    		<ColourPicker />
		</div>
		<ImageDownloadModal />
  	</div>
</template>

<script>
import ColourPicker from './components/ColourPicker'
import ImageBox from './components/ImageBox'
import ImageDownloadModal from './components/ImageDownloadModal'

export default {
  	name: "App",
  	components: {
		ColourPicker,
		ImageBox,
		ImageDownloadModal
  	}
}
</script>

<style lang="scss">
#app {
  	font-family: "Avenir", Helvetica, Arial, sans-serif;
  	-webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;
  	color: #2c3e50;
  	margin-top: 20px;
	max-width: 1100px;
    margin-left: auto;
	margin-right: auto;
	padding-left: 15px;
	padding-right: 15px;

	@media (min-width: 700px) {
		margin-top: 50px;
	}
}

.sr-only {
	border: 0 !important;
	clip: rect(1px, 1px, 1px, 1px) !important;
	-webkit-clip-path: inset(50%) !important;
		clip-path: inset(50%) !important;
	height: 1px !important;
	margin: -1px !important;
	overflow: hidden !important;
	padding: 0 !important;
	position: absolute !important;
	width: 1px !important;
	white-space: nowrap !important;
}

.colour-combo {
	display: grid;
	grid-gap: 50px;

	@media (min-width: 700px) {
		grid-template-columns: 1fr 300px;
	}
}
</style>
