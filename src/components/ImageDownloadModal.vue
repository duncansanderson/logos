<template>
    <div :class="[ { open: sharedState.isModalOpen }, 'image-download-modal' ]" @click="closeModal">
        <button class="close-modal-button" @click="closeModal">
            <img src="../assets/close.svg" alt="close modal button">
        </button>
        <div class="image-download">
            <div class="image-download__preview">
                <div class="preview-height">
                    <div class="preview-height__amount">{{ sharedState.imageHeight }} px</div>
                </div>
                <div class="preview-width">
                    <div class="preview-width__amount">{{ sharedState.imageWidth }} px</div>
                </div>
                <canvas id="canvas" width="324" height="324"></canvas>
            </div>
            <div class="image-download__options">
                <label for="size">Size</label>
                <select
                    name="size"
                    id="size"
                    v-model="sharedState.selectedSize"
                    @change="updateSize(sharedState.selectedSize)"
                >
                    <option
                        v-for="size in sharedState.presetSizes"
                        :key="size.name"
                        :value="size.name"
                    >{{ size.name }}</option>
                </select>
                <div class="image-size-controls">
                    <label for="width-adjust">
                        W
                        <input 
                            type="text"
                            id="width-adjust"
                            :value="sharedState.imageWidth"
                            @keyup="handleKeyup"
                        >
                        px
                    </label>
                    <label for="height-adjust">
                        H
                        <input
                            type="text"
                            id="height-adjust"
                            :value="sharedState.imageHeight"
                            @keyup="handleKeyup"
                        >
                        px
                    </label>
                </div>
                <div class="size-error" v-if="sharedState.imageTooBig">Too big. Try a size smaller than 10,000px</div>
                <div class="size-error" v-if="sharedState.imageTooSmall">Too small. Try a size larger than 50px</div>
                <label for="backgroundColour">Background</label>
                <select
                    name="backgroundColour"
                    id="backgroundColour"
                    v-model="sharedState.backgroundColourHex"
                    @change="colourChange(sharedState.backgroundColourHex)"
                >
                    <option 
                        v-for="colour in sharedState.colours"
                        :key="colour.name"
                        :value="colour.hex"
                    >{{ colour.name }}</option>
                </select>
                <label for="foregroundColour">Foreground</label>
                <select
                    name="foregroundColour"
                    id="foregroundColour"
                    v-model="sharedState.foregroundColourHex"
                    @change="updateForegroundColour(sharedState.foregroundColourHex)"
                >
                    <option 
                        v-for="colour in colourFilter"
                        :key="colour.name"
                        :value="colour.hex"
                    >{{ colour.name }}</option>
                </select>
                <div class="image-download_buttons">
                    <a
                        :href="sharedState.svgDownloadLink"
                        class="image-download__button svg-download"
                        download="logo.svg"
                    >SVG</a>
                    <a
                        :href="sharedState.pngDownloadLink"
                        class="image-download__button png-download"
                        download="logo.png"
                    >PNG</a>
                    <a
                        v-if="sharedState.backgroundColourHex != 'transparent'"
                        :href="sharedState.jpgDownloadLink"
                        class="image-download__button jpg-download" 
                        download="logo.jpg"
                    >JPG</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from "../store.js"

export default {
    name: 'ImageDownloadModal',
    data () {
        return {
            sharedState: store.state,
            typingTimer: null,
        }
    },
    methods: {
        // Close the download modal when the close button or the modal background is clicked.
        closeModal: function (e) {
            if ( e.currentTarget == e.target || e.currentTarget.className == 'close-modal-button' ) {
                store.closeModal()
            }
        },
        // Update the selected background and / or foreground colours when the background colour selector are changed.
        colourChange: function ( colourHex ) {
            store.updateColours( colourHex )
            setTimeout(() => {
                store.createDownloadLinks()
            }, 10)
        },
        // Wait for user to stop typing before processing the size change.
        handleKeyup: function(e) {
            if (this.typingTimer) { 
                clearTimeout(this.typingTimer)
                this.typingTimer = null
            }
            this.typingTimer = setTimeout(function() {
                store.doneTyping(e)
            }, 800)
        },
        // Update the foreground colour when foreground colour selector is changed.
        updateForegroundColour: function ( colourHex ) {
            store.updateForegroundColour( colourHex )
            setTimeout(() => {
                store.createDownloadLinks()
            }, 10)
        },
        // Update the image size when the pre-defined image sizes selector is changed.
        updateSize: (selectedSize) => {
            store.updateSize(selectedSize)
        }
    },
    mounted () {
        store.createDownloadLinks()
        store.calcColourRatio()
    },
    computed: {
        colourFilter () {
            return store.colourFilter()
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';

.image-download-modal {
    align-items: center;
    background-color: rgba( $pink, .8 );
    display: grid;
    height: 100vh;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateY(100%);
    transition: transform .5s ease-in-out;
    width: 100vw;

    &.open {
        transform: translateY(0);
        transition: transform .5s ease-in-out;
    }

    .close-modal-button {
        background: transparent;
        border: 0;
        cursor: pointer;
        height: 0;
        position: absolute;
        top: 10px;
        right: 30px;
        width: 0;

        @media (min-width: 700px) {
            top: 30px;
            width: 50px;
        }

        img {
            height: 25px;
            width: 25px;

            @media (min-width: 700px) {
                height: 40px;
                width: 40px;
            }
        }
    }

    .image-download {
        background: $white;
        display: grid;
        grid-gap: 50px;
        grid-template-rows: 1fr auto;
        padding: 50px;

        @media (min-width: 769px) {
            grid-gap: 80px;
            grid-template-columns: 1fr 1fr;
            row-gap: 0;
        }

        .image-download__preview {
            align-items: center;
            display: flex;
            justify-content: center;
            min-width: 324px;
            position: relative;

            .preview-height, .preview-width {
                align-items: center;
                display: flex;
                justify-content: center;
                width: 90%;
            }

            .preview-height {
                transform: rotate(90deg);
                transform-origin: top left;
                position: absolute;
                top: 7%;
                left: 107%;

                @media (min-width: 700px) {
                    left: 110%;
                }
            }
        
            .preview-width {
                height: 1.5rem;
                position: absolute;
                bottom: -10%;
                left: 5%;
            }

            .preview-height__amount, .preview-width__amount {
                background-color: $white;
                line-height: 1;
                padding: 0 10px;
                position: relative;
            }

            .preview-height::before, .preview-width::before {
                border-top: 2px solid #cccccc;
                content: "";
                position: absolute;
                width: 100%;
            }
        }

        .image-download__options {
            display: flex;
            flex-direction: column;

            label {
                margin-bottom: 10px;
            }

            .image-size-controls label {
                margin-right: 30px;
            }

            select {
                border: 1px solid #cccccc;
                cursor: pointer;
                font-size: 16px;
                height: 38px;
                margin-bottom: 20px;
                padding-left: 5px;
                width: 100%;

                @media (min-width: 769px) {
                    width: 300px;
                }
            }

            input {
                border: none;
                border-bottom: 1px solid #cccccc;
                font-size: 16px;
                margin-bottom: 20px;
                width: 30%;

                @media (min-width: 700px) {
                    width: 75px;
                }
            }

            .image-download_buttons {
                display: flex;
                justify-content: space-between;
                margin-top: 20px;

                 @media (min-width: 769px) {
                     justify-content: flex-start;
                     margin-top: 0;
                 }

                .image-download__button {
                    border: 1px solid $black;
                    color: $black;
                    font-weight: bold;
                    margin: 5px;
                    padding: 5px 25px;
                    text-decoration: none;

                    &:first-child {
                        margin-left: 0;
                    }
                }
            }
        }
    }

    .size-error {
        color: $rust-belt;
        font-weight: bold;
        margin-top: -10px;
        margin-bottom: 20px;
    }
}
</style>