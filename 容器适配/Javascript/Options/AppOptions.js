/**
 * @class AppOptions
 * @description :设置容器的appID和appSecret
  */
function AppOptions(appId, appSecret) {
    this.appId = "";
    this.appSecret = "";

    if (appId) this.appId = appId;
    if (appSecret) this.appSecret = appSecret;
}