
import euvUpload from './components/upload';
import locale from './locale/index';
import './styles/common/iconfont/material-icons.css'

const components = {
    euvUpload
};

const euvui = {
    ...components,
};

const install = function(Vue, opts = {}) {
    if (install.installed) return;
    locale.use(opts.locale);
    locale.i18n(opts.i18n);

    Object.keys(euvui).forEach(key => {
        Vue.component(key, euvui[key]);
    });

    // Vue.prototype.$Loading = LoadingBar;
    // Vue.prototype.$Message = Message;
    // Vue.prototype.$Modal = Modal;
    // Vue.prototype.$Notice = Notice;
    // Vue.prototype.$Spin = Spin;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const API = {
    version: process.env.VERSION, // eslint-disable-line no-undef
    locale: locale.use,
    i18n: locale.i18n,
    install,
    // Circle,
    // Switch,
    ...components
};

API.lang = (code) => {
    console.log('lang', code)
    const langObject = window['euvui/locale'].default;
    console.log('lang',langObject)
    if (code === langObject.i.locale) locale.use(langObject);
    else console.log(`The ${code} language pack is not loaded.`); // eslint-disable-line no-console
};

module.exports.default = module.exports = API;   // eslint-disable-line no-undef
