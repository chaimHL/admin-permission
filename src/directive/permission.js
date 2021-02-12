import Vue from 'vue'
import router from '@/router/index.js'

Vue.directive('permission', {
  inserted(el, binding) {
    const { action, effect } = binding.value
    if (!router.currentRoute.meta.includes(action)) {
      if (effect === 'disabled') {
        el.disabled = true
        // element-ui 要求disabled的元素要添加is-disabled类名
        el.classList.add('is-disabled')
      } else {
        el.parentNode.removeChild(el)
      }
    }
  }
})
