<template>
    <component
        :is="isGroup ? 'transition-group' : 'transition'"
        :tag="tag"
        :name="disabled ? '' : name"
        @after-enter="$emit('after-enter')"
        @after-leave="$emit('after-leave')"
    >
        <!-- transition を即座に適用する vue-router の遷移に使用 -->
        <template v-if="show === null">
            <slot />
        </template>

        <template v-else>
            <!-- v-if を使う -->
            <template v-if="mode === 'generate'">
                <template v-if="show">
                    <slot />
                </template>
            </template>

            <!-- v-show を使う -->
            <template v-else-if="mode === 'display'">
                <div v-show="show">
                    <slot />
                </div>
            </template>

            <!-- visibility で制御する -->
            <template v-else-if="mode === 'visible'">
                <div
                    :class="[
                        show ? 'visible' : 'hidden',
                        name,
                        'visible-transition',
                    ]"
                >
                    <slot />
                </div>
            </template>
        </template>
    </component>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

type TransitionType =
    | ''
    | 'fade'
    | 'switch-page'
    | 'switch-page-fade'
    | 'fade-thin'
    | 'slide-up'
    | 'slide-down'
    | 'slide-left'
    | 'slide-right'
    | 'toast'
    | 'scale'

type Mode = 'generate' | 'display' | 'visible'

type Props = {
    name: TransitionType
    show: boolean | null
    mode: Mode
    isGroup: boolean
    tag: string
}

export default defineComponent({
    props: {
        name: {
            default: '',
        },
        show: {
            default: null,
        },
        mode: {
            default: 'generate',
        },
        disabled: {
            default: false,
        },
        isGroup: {
            default: false,
        },
        tag: {
            default: 'div',
        },
    },
    setup(_: Props) {
        return {}
    },
})
</script>

<style lang="scss">
$linear: cubic-bezier(0, 0, 1, 1);
$easeInSine: cubic-bezier(0.47, 0, 0.745, 0.715);
$easeOutSine: cubic-bezier(0.39, 0.575, 0.565, 1);
$easeInOutSine: cubic-bezier(0.445, 0.05, 0.55, 0.95);

$easeInQuad: cubic-bezier(0.55, 0.085, 0.68, 0.53);
$easeOutQuad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
$easeInOutQuad: cubic-bezier(0.455, 0.03, 0.515, 0.955);

$easeInCubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);
$easeOutCubic: cubic-bezier(0.215, 0.61, 0.355, 1);
$easeInOutCubic: cubic-bezier(0.645, 0.045, 0.355, 1);

$easeInQuart: cubic-bezier(0.895, 0.03, 0.685, 0.22);
$easeOutQuart: cubic-bezier(0.165, 0.84, 0.44, 1);
$easeInOutQuart: cubic-bezier(0.77, 0, 0.175, 1);

$easeInQuint: cubic-bezier(0.755, 0.05, 0.855, 0.06);
$easeOutQuint: cubic-bezier(0.23, 1, 0.32, 1);
$easeInOutQuint: cubic-bezier(0.86, 0, 0.07, 1);

$easeInExpo: cubic-bezier(0.95, 0.05, 0.795, 0.035);
$easeOutExpo: cubic-bezier(0.19, 1, 0.22, 1);
$easeInOutExpo: cubic-bezier(1, 0, 0, 1);

$easeInCirc: cubic-bezier(0.6, 0.04, 0.98, 0.335);
$easeOutCirc: cubic-bezier(0.075, 0.82, 0.165, 1);
$easeInOutCirc: cubic-bezier(0.785, 0.135, 0.15, 0.86);

$easeInBack: cubic-bezier(0.6, -0.28, 0.735, 0.045);
$easeOutBack: cubic-bezier(0.175, 0.885, 0.32, 1.275);
$easeInOutBack: cubic-bezier(0.68, -0.55, 0.265, 1.55);

.linear {
    transition-timing-function: $linear;
}

.easeInSine {
    transition-timing-function: $easeInSine;
}
.easeOutSine {
    transition-timing-function: $easeOutSine;
}
.easeInOutSine {
    transition-timing-function: $easeInOutSine;
}
.easeInQuad {
    transition-timing-function: $easeInQuad;
}
.easeOutQuad {
    transition-timing-function: $easeOutQuad;
}
.easeInOutQuad {
    transition-timing-function: $easeInOutQuad;
}
.easeInCubic {
    transition-timing-function: $easeInCubic;
}
.easeOutCubic {
    transition-timing-function: $easeOutCubic;
}
.easeInOutCubic {
    transition-timing-function: $easeInOutCubic;
}
.easeInQuart {
    transition-timing-function: $easeInQuart;
}
.easeOutQuart {
    transition-timing-function: $easeOutQuart;
}
.easeInOutQuart {
    transition-timing-function: $easeInOutQuart;
}
.easeInQuint {
    transition-timing-function: $easeInQuint;
}
.easeOutQuint {
    transition-timing-function: $easeOutQuint;
}
.easeInOutQuint {
    transition-timing-function: $easeInOutQuint;
}
.easeInExpo {
    transition-timing-function: $easeInExpo;
}
.easeOutExpo {
    transition-timing-function: $easeOutExpo;
}
.easeInOutExpo {
    transition-timing-function: $easeInOutExpo;
}
.easeInCirc {
    transition-timing-function: $easeInCirc;
}
.easeOutCirc {
    transition-timing-function: $easeOutCirc;
}
.easeInOutCirc {
    transition-timing-function: $easeInOutCirc;
}
.easeInBack {
    transition-timing-function: $easeInBack;
}
.easeOutBack {
    transition-timing-function: $easeOutBack;
}
.easeInOutBack {
    transition-timing-function: $easeInOutBack;
}
.switch-page-enter-active {
    transition: all 0.3s ease-out;
}
.switch-page-enter,
.switch-page-leave-to {
    opacity: 0;
    transform: translate(0, 3px);
}
.switch-page-fade-enter-active {
    transition: all 0.3s ease-out;
}
.switch-page-fade-enter,
.switch-page-fade-leave-to {
    opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease-out;
    position: absolute;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.fade-thin-enter-active {
    transition: all 0.1s ease-out;
}
.fade-thin-enter {
    opacity: 0.5;
}
.fade-thin-leave-active {
    transition: all 0.1s ease-out;
    position: absolute;
}
.fade-thin-leave-to {
    opacity: 0.5;
}
.slide-up-enter,
.slide-up-leave-to {
    transform: translate(0, 100vh);
}
.slide-down-enter,
.slide-down-leave-to {
    transform: translate(0, -100vh);
}
.slide-left-enter,
.slide-left-leave-to {
    transform: translate(-100vw, 0);
}
.slide-right-enter,
.slide-right-leave-to {
    transform: translate(100vw, 0);
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active,
.slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active {
    transition-duration: 0.5s;
    transition-timing-function: $easeOutExpo;
}
.scale-enter-active,
.scale-leave-active {
    transition-duration: 0.5s;
    transition-timing-function: $easeOutExpo;
}
.scale-enter,
.scale-leave-to {
    transform: scale(0);
    transform-origin: center;
}
.toast-enter-active {
    animation: toast-in-out 5s ease-out;
}
.toast-leave-active {
    animation: toast-in-out 3s reverse;
}
/* mode: visible */
.visible-transition {
    transition: all 0.5s ease;
}
.visible-transition.visible {
    opacity: 1;
}
.visible-transition.hidden {
    opacity: 0 /* mode: visible */;
}
.visible-transition {
    transition: all 0.5s ease;
}
.visible-transition.visible {
    opacity: 1;
}
.visible-transition.hidden {
    opacity: 0;
}
@-moz-keyframes toast-in-out {
    0% {
        transform: translate(100vw, 0);
    }
    20% {
        transform: translate(0, 0);
    }
    70% {
        transform: translate(0, 0);
    }
    80% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(100vw, 0);
    }
}
@-webkit-keyframes toast-in-out {
    0% {
        transform: translate(100vw, 0);
    }
    20% {
        transform: translate(0, 0);
    }
    70% {
        transform: translate(0, 0);
    }
    80% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(100vw, 0);
    }
}
@-o-keyframes toast-in-out {
    0% {
        transform: translate(100vw, 0);
    }
    20% {
        transform: translate(0, 0);
    }
    70% {
        transform: translate(0, 0);
    }
    80% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(100vw, 0);
    }
}
@keyframes toast-in-out {
    0% {
        transform: translate(100vw, 0);
    }
    20% {
        transform: translate(0, 0);
    }
    70% {
        transform: translate(0, 0);
    }
    80% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(100vw, 0);
    }
}
</style>
