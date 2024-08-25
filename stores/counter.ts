import { ref } from 'vue'
import { defineStore } from 'pinia'

interface State {
    count: number
}

// export const useCounterStore = defineStore('counter', {
//     state: (): State => ({ count: 0 }),
//     actions: {
//         increment() {
//             this.count++
//         },
//     },
// persist: true,
// })

export const useCounterStore = defineStore(
    'counter',
    () => {
        const count = ref(0)
        const increment = () => {
            count.value += 2
        }
        return {
            count,
            increment,
        }
    },
    {
        persist: {
            storage: {
                getItem(key) {
                    return uni.getStorageSync(key)
                },
                setItem(key, value) {
                    uni.setStorageSync(key, value)
                },
            },
        },
    },
)
