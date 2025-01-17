export function HSVAtoRGBA (hsva) {
    const { h, s, v, a } = hsva;
    const f = (n) => {
        const k = (n + (h / 60)) % 6;

        return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    };

    const rgb = [f(5), f(3), f(1)].map(v => Math.round(v * 255));

    return { r: rgb[0], g: rgb[1], b: rgb[2], a };
}

export function HSLAtoHSVA (hsl) {
    const { h, s, l, a } = hsl;
    const v = l + s * Math.min(l, 1 - l);
    const sprime = v === 0 ? 0 : 2 - (2 * l / v);

    return { h, s: sprime, v, a };
}

export function RGBAtoHex (rgba) {
    const toHex = (v) => {
        const h = Math.round(v).toString(16);

        return ('00'.substr(0, 2 - h.length) + h).toUpperCase();
    };

    const components = [
        toHex(rgba.r),
        toHex(rgba.g),
        toHex(rgba.b)
    ];

    return `#${components.join('')}`;
}

export function RGBAtoHSVA (rgba) {
    if (!rgba) return { h: 0, s: 1, v: 1, a: 1 };

    const r = rgba.r / 255;
    const g = rgba.g / 255;
    const b = rgba.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h = 0;

    if (max !== min) {
        if (max === r) {
            h = 60 * (0 + ((g - b) / (max - min)));
        } else if (max === g) {
            h = 60 * (2 + ((b - r) / (max - min)));
        } else if (max === b) {
            h = 60 * (4 + ((r - g) / (max - min)));
        }
    }

    if (h < 0) h = h + 360;

    const s = max === 0 ? 0 : (max - min) / max;
    const hsv = [h, s, max];

    return { h: hsv[0], s: hsv[1], v: hsv[2], a: rgba.a };
}

export function HSVAtoHSLA (hsva) {
    const { h, s, v, a } = hsva;
    const l = v - (v * s / 2);
    const sprime = l === 1 || l === 0 ? 0 : (v - l) / Math.min(l, 1 - l);

    return { h, s: sprime, l, a };
}

export function fromHexa (hexa) {
    // eslint-disable-next-line no-use-before-define
    const hsva = HexToHSVA(hexa);
    const hsla = HSVAtoHSLA(hsva);
    const rgba = HSVAtoRGBA(hsva);

    return {
        alpha: hsva.a,
        hex: hexa.substr(0, 7),
        hexa,
        hsla,
        hsva,
        hue: hsva.h,
        rgba
    };
}

export function padEnd (str, length, char = '0') {
    return str + char.repeat(Math.max(0, length - str.length));
}

export function parseHex (hexString) {
    let hex = hexString;

    if (hex.startsWith('#')) {
        hex = hex.slice(1);
    }

    hex = hex.replace(/([^0-9a-f])/gi, 'F');

    if (hex.length === 3 || hex.length === 4) {
        hex = hex.split('').map(x => x + x).join('');
    }

    if (hex.length === 6) {
        hex = padEnd(hex, 8, 'F');
    } else {
        hex = padEnd(padEnd(hex, 6), 8, 'F');
    }

    return `#${hex}`.toUpperCase().substr(0, 9);
}

export function fromHex (hex) {
    return fromHexa(parseHex(hex));
}

export function HexToHSVA (hex) {
    // eslint-disable-next-line no-use-before-define
    const rgb = HexToRGBA(hex);

    return RGBAtoHSVA(rgb);
}

export function chunk (str, size = 1) {
    const chunked = [];
    let index = 0;

    while (index < str.length) {
        chunked.push(str.substr(index, size));
        index += size;
    }
    return chunked;
}

export function HexToRGBA (hex) {
    const rgba = chunk(hex.slice(1), 2).map((c) => parseInt(c, 16));

    return {
        r: rgba[0],
        g: rgba[1],
        b: rgba[2],
        a: Math.round((rgba[3] / 255) * 100) / 100
    };
}
