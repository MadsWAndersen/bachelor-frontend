import { defineComponent, createVNode } from 'vue'
import { c as createError } from '../server.mjs'
import '../../nitro/netlify.mjs'
import 'node:http'
import 'node:https'
import 'fs'
import 'path'
import 'unhead'
import '@unhead/shared'
import 'vue-router'
import 'vue/server-renderer'

const components_islands = {}
const islandComponents = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	default: components_islands,
})
const islandRenderer = defineComponent({
	props: {
		context: {
			type: Object,
			required: true,
		},
	},
	setup(props) {
		const component = islandComponents[props.context.name]
		if (!component) {
			throw createError({
				statusCode: 404,
				statusMessage: `Island component not found: ${props.context.name}`,
			})
		}
		return () =>
			createVNode(component || 'span', {
				...props.context.props,
				'nuxt-ssr-component-uid': '',
			})
	},
})

export { islandRenderer as default }
//# sourceMappingURL=island-renderer-28e4f834.mjs.map
