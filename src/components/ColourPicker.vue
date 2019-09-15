<template>
    <div class="colour-controls">
        <div class="colour-picker">
            <div class="colour-picker__label">Background</div>
            <div class="colour-picker__colours">
                <template v-for="colour in sharedState.colours">
                    <div
                        :class="[ { active: sharedState.backgroundColourHex == colour.hex }, 'colour-picker__colour' ]"
                        v-if="colour.background"
                        :key="colour.name + 'bg'"
                    >
                        <button
                            @click="updateColours( colour.hex )"
                            :class="colour.name"
                        ><span class="sr-only">{{ colour.name }}</span></button>
                    </div>
                </template>
            </div>
        </div>
        <div class="colour-picker">
            <div class="colour-picker__label">Foreground</div>
            <div class="colour-picker__colours">
                <template v-for="colour in colourFilter">
                    <div
                        :class="[ { active: sharedState.foregroundColourHex == colour.hex }, 'colour-picker__colour' ]"
                        :key="colour.name + 'fg'"
                    >
                        <button
                            @click="updateForegroundColour( colour.hex )"
                            :class="colour.name"
                        ><span class="sr-only">{{ colour.name }}</span></button>
                    </div>
                </template>
            </div>
        </div>
        <div class="colour-contrast" v-if="sharedState.backgroundColourHex != 'transparent'">
            <div class="colour-contrast__label">Colour contrast</div>
            <div class="colour-contrast__ratio">
                <div class="ratio__value">{{ sharedState.contrastRatio }}</div>
                <div class="ratio__small">
                    <svg v-if="sharedState.readabilityTests[1].result" width="17px" height="18px" viewBox="0 0 17 18" stroke="green">
                        <polyline points="2.8,9.4 6.5,14.1 14.2,3.3 " fill="none"></polyline>
                    </svg>
                    <svg v-else width="17" height="18" viewBox="0 0 17 18" stroke="red">
                        <line x1="2.6" y1="14.9" x2="14.4" y2="3.1"></line>
                        <line x1="14.4" y1="14.9" x2="2.6" y2="3.1"></line>
                    </svg>
                    Small text
                </div>
                <div class="ratio__large">
                    <svg v-if="sharedState.readabilityTests[0].result" width="17px" height="18px" viewBox="0 0 17 18" stroke="green">
                        <polyline points="2.8,9.4 6.5,14.1 14.2,3.3 " fill="none"></polyline>
                    </svg>
                    <svg v-else width="17" height="18" viewBox="0 0 17 18" stroke="red">
                        <line x1="2.6" y1="14.9" x2="14.4" y2="3.1"></line>
                        <line x1="14.4" y1="14.9" x2="2.6" y2="3.1"></line>
                    </svg>
                    Large text
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from "../store.js"

export default {
    name: "ColourPicker",
    data () {
        return {
            sharedState: store.state
        }
    },
    methods: {
        // Update the selected background colour and available foreground colours when a background colour is clicked.
        updateColours( colourHex ) {
            store.updateColours( colourHex )
        },
        // Update the selected foreground colour when a foreground colour is clicked.
        updateForegroundColour( colourHex ) {
            store.updateForegroundColour( colourHex )
        }
    },
    computed: {
        // Update the available foreground colours based on the selected background colour.
        colourFilter () {
            return store.colourFilter()
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';

.colour-controls {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr;
}

@media (min-width: 700px) {
    .colour-controls {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
    }
}

.colour-picker {
    &__label {
        margin-bottom: 16px;
    }

    &__colours {
        display: flex;
        flex-wrap: wrap;
    }

    &__colour {
        align-items: center;
        border: 2px solid transparent;
        border-radius: 50%;
        display: flex;
        height: 70px;
        justify-content: center;
        width: 70px;

        &.active {
            border: 2px solid black;
        }

        button {
            border: none;
            border-radius: 50%;
            cursor: pointer;
            height: 60px;
            width: 60px;

            &:focus {
                outline: 0;
                border: 2px solid blue;
            }

            &.transparent {
                background-image: url(../assets/transparent.png)
            }
        }
    }
}

.colour-contrast {
    grid-column: span 2;

    @media (min-width: 700px) {
        grid-column: span 1;
    }

    &__label {
        margin-bottom: 16px;
    }
    
    &__ratio {
        display: grid;
        grid-gap: 30px;
        grid-template-columns: auto auto auto;
        justify-content: space-between;

        @media (min-width: 700px) {
            grid-template-columns: auto auto 1fr;
        }

        .ratio__small, .ratio__large {
            
            svg {
                margin-top: -4px;
                position: relative;
                top: 3px;
            }
        }
    }
}
</style>