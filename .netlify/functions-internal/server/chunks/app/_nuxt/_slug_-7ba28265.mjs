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
	ssrRenderList,
	ssrRenderComponent,
	ssrInterpolate,
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
	__name: '[slug]',
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute()
		console.log(`${route.params.slug}`)
		const localStorageContent = ref()
		const cmsContent = ref()
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = __nuxt_component_0
			if (unref(localStorageContent)) {
				_push(
					`<div${ssrRenderAttrs(
						_attrs,
					)}><div class="container"><div class="container-row"><div class="col-span-2"></div><div class="col-span-5"><!--[-->`,
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
				_push(
					`<!--]--> ${ssrInterpolate(
						unref(cmsContent),
					)}</div></div></div></div>`,
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
	).add('pages/documentation/[slug].vue')
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0
}

export { _sfc_main as default }
//# sourceMappingURL=_slug_-7ba28265.mjs.map
