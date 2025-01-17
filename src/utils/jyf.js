//工具类配置
export default {
    OSnow() {
        let agent = navigator.userAgent.toLowerCase();
        let isMac = /macintosh|mac os x/i.test(navigator.userAgent);
        if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
            return 'windows';
        } else if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
            return 'windows';
        } else if (isMac) {
            return 'mac';
        } else {
            return 'windows';
        }
    },
    mainColor() {
        return '#ff4d4d'
    },
    px(PX) {
        if (this.isPhone()) {
            let w =
                window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth;
            return ((w + 1) * PX / 375).toFixed(3);
        } else {
            return PX;
        }
    },
    weight(PX) {
        let wt = 400;
        if (this.isPhone()) {
            let w =
                window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth;
            wt = ((w + 1) * PX / 375).toFixed(3);
        } else {
            wt = PX;
        }
        if (wt >= 450 && wt < 500) {
            wt = 500;
        } else if (wt >= 500 && wt < 550) {
            wt = 500;
        } else if (wt >= 550 && wt < 600) {
            wt = 600;
        } else if (wt >= 600 && wt < 650) {
            wt = 600;
        } else if (wt >= 650 && wt < 700) {
            wt = 700;
        } else if (wt >= 700 && wt < 750) {
            wt = 700;
        } else if (wt >= 750 && wt < 800) {
            wt = 800;
        } else if (wt >= 800 && wt < 850) {
            wt = 800;
        } else if (wt >= 850 && wt < 900) {
            wt = 900;
        } else if (wt >= 900 && wt < 950) {
            wt = 900;
        }
        return wt;
    },
    Random_String(Randoms) {
        return Randoms[this.random_IntFrom(0, Randoms.length - 1)];
    },
    LogStr(str) {
        if (this.isLocalhost()) {
            console.log('仅在isLocalhost-----> \n' + str);
        }
    },
    LogObj(obj) {
        if (this.isLocalhost()) {
            console.log('仅在isLocalhost-----> \n' + JSON.stringify(obj));
        }
    },
    random_IntFrom(min, max) {
        let rand = Math.floor(Math.random() * (max - min + 1)) + min;
        return rand;
    },
    Debounce(func, wait, immediate) {
        let timeout, args, context, timestamp, result

        const later = function () {
            // 据上一次触发时间间隔
            const last = +new Date() - timestamp

            // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
            if (last < wait && last > 0) {
                timeout = setTimeout(later, wait - last)
            } else {
                timeout = null
                // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
                if (!immediate) {
                    result = func.apply(context, args)
                    if (!timeout) context = args = null
                }
            }
        }

        return function (...args) {
            context = this
            timestamp = +new Date()
            const callNow = immediate && !timeout
            // 如果延时不存在，重新设定延时
            if (!timeout) timeout = setTimeout(later, wait)
            if (callNow) {
                result = func.apply(context, args)
                context = args = null
            }

            return result
        }
    },
    DeepClone(source) {
        if (!source && typeof source !== 'object') {
            throw new Error('error arguments', 'DeepClone')
        }
        const targetObj = source.constructor === Array ? [] : {}
        Object.keys(source).forEach(keys => {
            if (source[keys] && typeof source[keys] === 'object') {
                targetObj[keys] = this.DeepClone(source[keys])
            } else {
                targetObj[keys] = source[keys]
            }
        })
        return targetObj
    },
    Base64_Safe(str) {
        return str.replace('+', '-').replace('/', '_')
    },
    Base64_Encode(str) {
        let BASE64_ENCODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        let c1, c2, c3, i = 0,
            len = str.length,
            out = [];
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out.push(BASE64_ENCODE_CHARS.charAt(c1 >> 2));
                out.push(BASE64_ENCODE_CHARS.charAt((c1 & 0x3) << 4));
                out.push('==');
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out.push(BASE64_ENCODE_CHARS.charAt(c1 >> 2));
                out.push(BASE64_ENCODE_CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4)));
                out.push(BASE64_ENCODE_CHARS.charAt((c2 & 0xF) << 2));
                out.push('=');
                break;
            }
            c3 = str.charCodeAt(i++);
            out.push(BASE64_ENCODE_CHARS.charAt(c1 >> 2));
            out.push(BASE64_ENCODE_CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4)));
            out.push(BASE64_ENCODE_CHARS.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6)));
            out.push(BASE64_ENCODE_CHARS.charAt(c3 & 0x3F));
        }
        return out.join('');
    },
    Base64_Decode(input) {
        let _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        let output = "";
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = this.utf8_decode(output);
        return output;
    },
    // UTF-8 encoding 
    utf8_encode(string) {
        string = string.replace(/\r\n/g, "\n");
        let utftext = "";
        for (let n = 0; n < string.length; n++) {
            let c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },
    // UTF-8 decoding 
    utf8_decode(utftext) {
        let string = "";
        let i = 0;
        let c = 0;
        let c1 = 0;
        let c2 = 0;
        let c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    },
    // 返回字节长度
    Base64_ImageSize(base64Str) {
        const indexBase64 = base64Str.indexOf('base64,');
        if (indexBase64 < 0) return -1;
        const str = base64Str.substr(indexBase64 + 6);
        return (str.length * 0.75).toFixed(2);
    },
    url_queryObjByHref(href) {
        let query = href.substring(href.indexOf('?') + 1);
        let vars = query.split("&");
        let obj = {}
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            obj[pair[0]] = pair[1]
        }
        return obj;
    },
    isAndroid() {
        let ran = navigator.userAgent
        let isAndroid = ran.indexOf('Android') > -1 || ran.indexOf('Linux') > -1
        if (isAndroid) {
            return true;
        } else {
            return false;
        }
    },
    isPhone() {
        const ua = navigator.userAgent.toLowerCase();
        if (/android|webos|iphone|ipod|balckberry/i.test(ua)) {
            return true;
        } else {
            return false;
        }
    },
    isIOS() {
        let ran = navigator.userAgent
        let isIOS = !!ran.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        if (isIOS) {
            return true;
        } else {
            return false;
        }
    },
    isWechat() {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger" && ua.match(/wxwork/i) != "wxwork") {
            return true
        } else {
            return false
        }
    },
    isWecom() {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) != "micromessenger" && ua.match(/wxwork/i) == "wxwork") {
            return true
        } else {
            return false
        }
    },
    isWechatAndWecom() {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) != "micromessenger" && ua.match(/wxwork/i) == "wxwork") {
            return false;
        }
        if (ua.match(/MicroMessenger/i) == "micromessenger" && ua.match(/wxwork/i) != "wxwork") {
            return false;
        }
        if (ua.match(/MicroMessenger/i) == "micromessenger" && ua.match(/wxwork/i) == "wxwork") {
            return true
        } else {
            return false
        }
    },
    keyboardKeyToKeyCode(key){
      return {
        '0': 48,
        '1': 49,
        '2': 50,
        '3': 51,
        '4': 52,
        '5': 53,
        '6': 54,
        '7': 55,
        '8': 56,
        '9': 57,

        'a': 65,
        'b': 66,
        'c': 67,
        'd': 68,
        'e': 69,
        'f': 70,
        'g': 71,

        'h': 72,
        'i': 73,
        'j': 74,
        'k': 75,
        'l': 76,
        'm': 77,
        'n': 78,

        'o': 79,
        'p': 80,
        'q': 81,
        'r': 82,
        's': 83,
        't': 84,

        'u': 85,
        'v': 86,
        'w': 87,

        'x': 88,
        'y': 89,
        'z': 90,
      }[key.toString()];
    },
    isLocalhost() {
        return location.href.indexOf('localhost') !== -1;
    },
    timeHumanFul(str) {
        let now = new Date().getTime()
        let oldTime = new Date(str).getTime()
        let difference = now - oldTime
        let result = ''
        let minute = 1000 * 60
        let hour = minute * 60
        let day = hour * 24
        let month = day * 30
        let year = month * 12
        let _year = difference / year
        let _month = difference / month
        let _week = difference / (7 * day)
        let _day = difference / day
        let _hour = difference / hour
        let _min = difference / minute

        if (_year >= 1) {
            result = ~~(_year) + ' 年前'
        } else if (_month >= 1) {
            result = ~~(_month) + ' 个月前'
        } else if (_week >= 1) {
            result = ~~(_week) + ' 周前'
        } else if (_day >= 1) {
            result = ~~(_day) + ' 天前'
        } else if (_hour >= 1) {
            result = ~~(_hour) + ' 个小时前'
        } else if (_min >= 1) {
            result = ~~(_min) + ' 分钟前'
        } else {
            result = '刚刚'
        }
        return result
    },
    // base64参数就是图像字符串，
    // w宽度 
    // rate是压缩率0~1 一般是0.6较好
    // minkb
    // maxkb
    // callback是回调方法
    cutImageBase64(base64, w, rate, minkb, maxkb, callback) {
        let newImage = new Image();
        let quality = rate; //压缩系数0-1之间
        newImage.src = base64;
        newImage.setAttribute("crossOrigin", "Anonymous"); //url为外域时需要
        let imgWidth, imgHeight;
        newImage.onload = function () {
            imgWidth = this.width;
            imgHeight = this.height;
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            if (Math.max(imgWidth, imgHeight) > w) {
                if (imgWidth > imgHeight) {
                    canvas.width = w;
                    canvas.height = (w * imgHeight) / imgWidth;
                } else {
                    canvas.height = w;
                    canvas.width = (w * imgWidth) / imgHeight;
                }
            } else {
                canvas.width = imgWidth;
                canvas.height = imgHeight;
                quality = rate;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
            let base64 = canvas.toDataURL("image/jpeg", quality); //压缩语句
            // 如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
            while (base64.length / 1024 > maxkb) {
                quality -= 0.01;
                base64 = canvas.toDataURL("image/jpeg", quality);
            }
            // 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
            while (base64.length / 1024 < minkb) {
                quality += 0.001;
                base64 = canvas.toDataURL("image/jpeg", quality);
            }
            callback(base64); //必须通过回调函数返回，否则无法及时拿到该值
        }
    }


}