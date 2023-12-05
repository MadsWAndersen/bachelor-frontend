import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer'
import { ref, useSSRContext } from 'vue'

const _sfc_main = {
	__name: 'index',
	__ssrInlineRender: true,
	setup(__props) {
		ref(null)
		ref(null)
		return (_ctx, _push, _parent, _attrs) => {
			_push(
				`<div${ssrRenderAttrs(_attrs)}><pre>dwa:${ssrInterpolate(
					_ctx.x,
				)}</pre></div>`,
			)
		}
	},
}
const _sfc_setup = _sfc_main.setup
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext()
	;(
		ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())
	).add('pages/test/index.vue')
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0
}

export { _sfc_main as default }
//# sourceMappingURL=index-f46fe5c0.mjs.map
