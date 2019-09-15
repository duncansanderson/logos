<template>
    <div class="image-box" :style="{ backgroundColor: sharedState.backgroundColourHex, color: sharedState.foregroundColourHex }">
        <!-- <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="glass-whiskey" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-glass-whiskey fa-w-16 fa-7x" :style="{ backgroundColor: sharedState.backgroundColourHex, color: sharedState.foregroundColourHex }">
            <path fill="currentColor" d="M480 32H32C12.5 32-2.4 49.2.3 68.5l56 356.5c4.5 31.5 31.5 54.9 63.4 54.9h273c31.8 0 58.9-23.4 63.4-54.9l55.6-356.5C514.4 49.2 499.5 32 480 32zm-37.4 64l-30 192h-313L69.4 96h373.2z"></path>
        </svg> -->
        <svg id="Download" x="0px" y="0px" viewBox="0 0 2000 2000" xml:space="preserve" :style="{ backgroundColor: sharedState.backgroundColourHex, color: sharedState.foregroundColourHex }">
            <g>
                <path fill="currentColor" d="M697.6,936.6c-27.5-0.6-46.2-0.6-69.3,0c0,26-0.1,54.8-0.1,80.7c23.1-1.5,46.2-2.8,69.3-4c5.5-0.3,7.4-2,7.5-8 c0-20,0.1-40.1,0.1-60.1C705,939.2,703.1,936.5,697.6,936.6z"></path>
                <path fill="currentColor" d="M490.9,808.8v474.9c0,1.3,1.3,2.2,2.5,1.7c106.1-40.8,293.4-68,506.9-68c212.2,0,398.7,26.8,505.1,67.3 c1.2,0.5,2.5-0.4,2.5-1.7V808.8c0-1-0.8-1.9-1.9-1.9H492.8C491.8,806.9,490.9,807.7,490.9,808.8z M770,1012 c-0.1,36.8-17.8,54.9-54.2,57.5c-29.2,2-58.5,4.4-87.7,7c0,30.7-0.1,61.3-0.1,92c0,0.9-0.7,1.7-1.6,1.8c-20.3,2.8-40.7,5.7-61,8.9 c-1.1,0.2-2.2-0.7-2.2-1.8V882.1c0-1,0.8-1.9,1.9-1.9h151c36.4,0.1,54,17.3,54,54.1C770.1,960.2,770,986.1,770,1012z M992.9,882.6 l-14.3,52.6c-0.2,0.8-1,1.4-1.8,1.4c-35,0.1-71.8-0.3-106.8,0c0,16.2,0.4,30.7,0.4,46.9c34.2,0.1,61.5-0.5,92.9-0.7 c1.2,0,2.1,1.1,1.8,2.3c-2.2,8.1-9.5,35-14.3,50.4c-0.2,0.7-0.9,1.2-1.7,1.2c-26.3,0.3-52.9,0.8-79.2,1.6c0,18.2-0.1,36.5-0.1,54.7 c40.3-1.5,80.6-2.3,121-2.5c1.2,0,2.1,1.2,1.8,2.4l-13.8,50.8c-0.2,0.8-0.9,1.4-1.8,1.4c-56.3,0.6-114.3,2.8-170.5,6.7 c-1.1,0.1-2-0.8-2-1.9c0.2-89.3,0.3-178.6,0.5-267.9c0-1,0.8-1.9,1.9-1.9h184.2C992.4,880.3,993.3,881.4,992.9,882.6z  M1222.2,934.8c0,1-0.8,1.9-1.9,1.9c-34.3,0.2-50.3-0.2-69.3,0c0.1,70.4,0.2,140,0.3,210.4c0,1.1-0.9,1.9-2,1.9 c-20.5-1.1-41-1.9-61.4-2.5c-1,0-1.8-0.9-1.8-1.9c-0.1-69.7-0.1-138.1-0.2-207.8c-23.2-0.1-46.4,0-69.5,0c-1,0-1.8-0.8-1.8-1.8 c0-17.2,0-35.6,0-52.7c0-1,0.8-1.8,1.8-1.8l204,0c1,0,1.9,0.8,1.9,1.9V934.8z M1440.6,882.6l-14.3,52.7c-0.2,0.8-1,1.4-1.8,1.4 c-52.3,0.1-63.7,0.1-109.5,0c0,17.1,0.1,37.7,0.1,54.8c29,1.8,55.8,3.2,91.4,5.4c1.2,0.1,2,1.2,1.7,2.3l-13.3,51.8 c-0.2,0.9-1.1,1.5-2,1.4c-31.8-3.7-42.9-4.3-77.7-7.3c0,19.2,0.1,40.7,0.1,59.9c42.6,4.5,81.5,9.1,118.3,15.1 c1.1,0.2,1.8,1.3,1.5,2.3l-14.1,52c-0.2,0.9-1.1,1.5-2.1,1.4c-54.9-8.2-111.7-14.7-166.9-19.6c-1-0.1-1.7-0.9-1.7-1.8 c-0.2-90.7-0.3-181.4-0.5-272.2c0-1,0.8-1.9,1.9-1.9h187.1C1440,880.3,1440.9,881.4,1440.6,882.6z"></path>
            </g>
        </svg>
        <div class="open-modal-wrapper">
            <button 
                class="open-modal-button"
                @click="openModal"
                @mouseover="downloadButtonHover = true"
                @mouseleave="downloadButtonHover = false"
                :style="{ 
                    backgroundColor: ( downloadButtonHover ? sharedState.foregroundColourHex : sharedState.backgroundColourHex ),
                    color: ( downloadButtonHover ? sharedState.backgroundColourHex == 'transparent' ? '#fff' : sharedState.backgroundColourHex : sharedState.foregroundColourHex )
                }"
            >Download</button>
        </div>
    </div>
    <!-- https://jsfiddle.net/mfye45r0/
        Create downloadable SVG - https://jsfiddle.net/h6bu2L8p/1/
        Create resizeable and downloadable SVG - https://jsfiddle.net/o39g0e21/
        Create downloadable PNG and JPG - https://jsfiddle.net/s6ufoLy3/4/
        Create downloadable SVG, PNG and JPG - https://jsfiddle.net/h6bu2L8p/2/
        Create resizeable and downloadable SVS, PNG and JPG - https://jsfiddle.net/nh1gt7vp/
        Update viewBox - https://jsfiddle.net/np1Ldhu8/
    -->
</template>

<script>
import { store } from "../store.js"

export default {
    name: 'ImageBox',
     data () {
        return {
            sharedState: store.state,
            downloadButtonHover: false
        }
    },
    methods: {
        // Open the download modal when the "Download" button is clicked.
        openModal: () => {
            store.openModal()
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';

.image-box  {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    max-height: 436px;
    position: relative;
    width: 100%;

    .open-modal-wrapper {
        align-items: center;
        display: flex;
        justify-content: center;
        width: 100%;

        .open-modal-button {
            border: 0;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            padding: 10px;
            position: absolute;
            bottom: 0;
            text-transform: uppercase;
        }
    }
}

@media (min-width: 700px) {
	svg {
        height: 80%;
    }
}
</style>