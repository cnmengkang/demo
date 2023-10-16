// myPlugin.js

export default {
    install(app, options) {
        // 插件逻辑
        console.log('My custom plugin is installed with options:', options);

        // 在 Vue 3 中，你可以在 app 上访问全局 API 和配置
        app.config.globalProperties.$myPlugin = 'This is a custom plugin value';
    },
};
