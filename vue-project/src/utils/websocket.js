import { Base64 } from "js-base64";
import { enc } from "crypto-js";

const APPID = 'd9975a5a'
const API_SECRET = 'ZWRhNWVlZTMyZTMyN2RlNjU3ZmMxMjVj'
const API_KEY = '93644b74d4b368c48aa251e086c4a5cc'

function getWebsocketUrl() {
    return new Promise((resolve, reject) => {
        var apiKey = API_KEY
        var apiSecret = API_SECRET
        var url = 'wss://spark-api.xf-yun.com/v1.1/chat'
        var host = location.host

        var date = new Date().toGMTString()

        var algorithm = 'hmac-sha256'

        var headers = 'host date request-line'

        var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`

        var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)

        var signature = CryptoJS.enc.Base64.stringify(signatureSha)

        var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`

        var authorization = btoa(authorizationOrigin)

        url = `${url}?authorization=${authorization}&date=${date}&host=${host}`
        // resolve(url)
        console.log(url)
    })
}
export default getWebsocketUrl()