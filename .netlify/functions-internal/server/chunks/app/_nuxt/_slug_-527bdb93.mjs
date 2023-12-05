import { u as useRoute } from '../server.mjs'
import { ref, unref, useSSRContext } from 'vue'
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer'
import '../../nitro/netlify.mjs'
import 'node:http'
import 'node:https'
import 'fs'
import 'path'
import 'unhead'
import '@unhead/shared'
import 'vue-router'

const _sfc_main = {
	__name: '[slug]',
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute()
		ref()
		const cmsContent = ref()
		const realData = ref()
		console.log(route.params.slug.replace('-', ' '))
		console.log(cmsContent)
		return (_ctx, _push, _parent, _attrs) => {
			if (unref(realData)) {
				_push(
					`<div${ssrRenderAttrs(_attrs)}>${ssrInterpolate(
						unref(realData).name,
					)} ${ssrInterpolate(unref(realData))}</div>`,
				)
			} else {
				_push(`<!---->`)
			}
		}
	},
}
const _sfc_setup = _sfc_main.setup
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext()
	;(
		ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())
	).add('pages/documentation/[parrentSlug]/[slug].vue')
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0
}

export { _sfc_main as default }
//# sourceMappingURL=_slug_-527bdb93.mjs.map
