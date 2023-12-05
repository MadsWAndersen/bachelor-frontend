import { ref, mergeProps, unref, useSSRContext } from 'vue'
import { u as useUserStore } from './user-ae9c2965.mjs'
import { u as useFetch } from './fetch-d19c2885.mjs'
import {
	ssrRenderAttrs,
	ssrRenderComponent,
	ssrInterpolate,
} from 'vue/server-renderer'
import Editor from '@tinymce/tinymce-vue'
import '../server.mjs'
import '../../nitro/netlify.mjs'
import 'node:http'
import 'node:https'
import 'fs'
import 'path'
import 'unhead'
import '@unhead/shared'
import 'vue-router'

function useRedirect() {
	useUserStore()
	return {}
}
function useApi(urlPath = '') {
	const baseUrl = 'https://api.umbraco.io/'
	const completeUrl = urlPath ? `${baseUrl}${urlPath}` : baseUrl
	const { data, pending, error, refresh } = useFetch(
		completeUrl,
		{
			headers: {
				'umb-project-alias': 'pba-webdev',
				'Accept-Language': 'en-US',
				Authorization: 'Basic elFJZk50eEpCYWFidFFDSTNweDg6',
			},
		},
		'$UqgiltlUfE',
	)
	return { data, pending, error, refresh }
}
const _sfc_main = {
	__name: 'index',
	__ssrInlineRender: true,
	setup(__props) {
		useRedirect()
		const { data } = useApi('/forms/01760615-f419-40be-9b1f-2d32f38790fb')
		const Data = ref('')
		return (_ctx, _push, _parent, _attrs) => {
			_push(
				`<div${ssrRenderAttrs(
					mergeProps({ class: 'container' }, _attrs),
				)}><div class="container-row"><div class="col-span-full">`,
			)
			_push(
				ssrRenderComponent(
					unref(Editor),
					{
						'api-key':
							'ftvcr0z9nxcc2ozxsls3xowr1dtmrwm2atafqvcxtkw0mob4',
						init: {
							plugins:
								'lists link image table code help wordcount code',
						},
					},
					null,
					_parent,
				),
			)
			_push(
				`</div><button class="col-span-full mr-auto ml-auto bg-slate-700 rounded-sm text-white w-12"> Test console Editor data </button><div class="border-2 col-span-full">${ssrInterpolate(
					unref(Data),
				)}</div><pre>${ssrInterpolate(unref(data))}</pre></div></div>`,
			)
		}
	},
}
const _sfc_setup = _sfc_main.setup
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext()
	;(
		ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())
	).add('pages/form/index.vue')
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0
}

export { _sfc_main as default }
//# sourceMappingURL=index-31e21aa1.mjs.map
