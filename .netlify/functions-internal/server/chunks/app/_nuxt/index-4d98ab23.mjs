import { _ as __nuxt_component_0 } from './nuxt-link-e97cf304.mjs'
import { u as useRoute } from '../server.mjs'
import {
	ref,
	unref,
	withCtx,
	createTextVNode,
	toDisplayString,
	useSSRContext,
} from 'vue'
import {
	ssrRenderAttrs,
	ssrInterpolate,
	ssrRenderList,
	ssrRenderComponent,
} from 'vue/server-renderer'
import '../../nitro/netlify.mjs'
import 'node:http'
import 'node:https'
import 'fs'
import 'path'
import 'unhead'
import '@unhead/shared'
import 'vue-router'

const _sfc_main = {
	__name: 'index',
	__ssrInlineRender: true,
	setup(__props) {
		useRoute()
		ref()
		const cmsContent = ref()
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = __nuxt_component_0
			if (unref(cmsContent)) {
				_push(
					`<div${ssrRenderAttrs(
						_attrs,
					)}><div>CONTENT ID: ${ssrInterpolate(
						_ctx.$route.query.id,
					)}</div><!--[-->`,
				)
				ssrRenderList(
					unref(cmsContent).childrenData._embedded.content,
					(content, index) => {
						_push(
							`<div><h1 class="text-xl font-bold">${content.name}</h1>`,
						)
						_push(
							ssrRenderComponent(
								_component_NuxtLink,
								{
									to: `${content._url}`,
								},
								{
									default: withCtx(
										(_, _push2, _parent2, _scopeId) => {
											if (_push2) {
												_push2(
													`${ssrInterpolate(
														content._url,
													)}`,
												)
											} else {
												return [
													createTextVNode(
														toDisplayString(
															content._url,
														),
														1,
													),
												]
											}
										},
									),
									_: 2,
								},
								_parent,
							),
						)
						_push(`</div>`)
					},
				)
				_push(`<!--]--></div>`)
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
	).add('pages/documentation/index.vue')
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0
}

export { _sfc_main as default }
//# sourceMappingURL=index-4d98ab23.mjs.map
