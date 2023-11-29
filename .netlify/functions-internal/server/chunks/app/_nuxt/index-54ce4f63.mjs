import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useUserStore } from './user-ae9c2965.mjs';
import { _ as _export_sfc } from '../server.mjs';
import '../../nitro/netlify.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const userData = useUserStore();
    let fetchResult = ref("");
    let username = ref("testing1234");
    let password = ref("testing1234");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-8b6decdf><div class="container-row" data-v-8b6decdf>`);
      if (!unref(userData).loading) {
        _push(`<div class="col-span-full" data-v-8b6decdf><div class="w-full max-w-xs" data-v-8b6decdf><form class="bg-white shadow-md px-8 pt-6 pb-8 mb-4" data-v-8b6decdf><div class="mb-4" data-v-8b6decdf><label class="block text-gray-700 text-sm font-bold mb-2" for="username" data-v-8b6decdf> Username </label><input${ssrRenderAttr("value", unref(username))} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" data-v-8b6decdf></div><div class="mb-6" data-v-8b6decdf><label class="block text-gray-700 text-sm font-bold mb-2" for="password" data-v-8b6decdf> Password </label><input${ssrRenderAttr("value", unref(password))} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="string" placeholder="******************" data-v-8b6decdf>`);
        if (!unref(fetchResult).access_token) {
          _push(`<p class="text-red-500 text-xs italic" data-v-8b6decdf>${ssrInterpolate(!unref(fetchResult).error_description ? unref(fetchResult).error : unref(fetchResult).error_description)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex items-center justify-between" data-v-8b6decdf><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" data-v-8b6decdf> Sign In </button><div class="btn_logout" data-v-8b6decdf><button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" data-v-8b6decdf> Logout </button></div></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(userData).loading) {
        _push(`<div class="spinnerContainer" data-v-8b6decdf><div class="spinner" data-v-8b6decdf></div><div class="loader" data-v-8b6decdf><p data-v-8b6decdf>loading</p><div class="words" data-v-8b6decdf><span class="word" data-v-8b6decdf></span><span class="word" data-v-8b6decdf>Insights</span><span class="word" data-v-8b6decdf>Tools</span><span class="word" data-v-8b6decdf>Workshops</span><span class="word" data-v-8b6decdf>Documentation</span></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8b6decdf"]]);

export { index as default };
//# sourceMappingURL=index-54ce4f63.mjs.map
