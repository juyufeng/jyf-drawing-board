import { ColorMatchers, NamedColors } from '../consts';
import { fromHex, HSLAtoHSVA, HSVAtoRGBA, RGBAtoHex, RGBAtoHSVA, valueToDecimal } from '../helpers';

export class ColorModel {
    static create(color) {
        if (!color) {
            return ColorModel.fromWhite();
        }

        let trimmedColor = color.replace(/^\s+/, '').replace(/\s+$/, '').toLowerCase();

        if (NamedColors[trimmedColor]) {
            trimmedColor = NamedColors[trimmedColor];
        } else if (trimmedColor === 'transparent') {
            return ColorModel.fromTransparent();
        }

        const rgbMatch = ColorMatchers.RGB.exec(trimmedColor) || ColorMatchers.RGBA.exec(trimmedColor);

        if (rgbMatch) {
            const alpha = rgbMatch[4] === undefined ? 1 : rgbMatch[4];

            return ColorModel.fromRgba({
                r: Number.parseInt(rgbMatch[1]),
                g: Number.parseInt(rgbMatch[2]),
                b: Number.parseInt(rgbMatch[3]),
                a: Number.parseFloat(alpha)
            });
        }

        const hslMatch = ColorMatchers.HSL.exec(trimmedColor) || ColorMatchers.HSLA.exec(trimmedColor);

        if (hslMatch) {
            const alpha = hslMatch[4] === undefined ? 1 : hslMatch[4];

            return ColorModel.fromHsla({
                h: Number.parseInt(hslMatch[1]),
                s: Number.parseFloat(hslMatch[2]),
                l: Number.parseFloat(hslMatch[3]),
                a: Number.parseFloat(alpha)
            });
        }

        const hsvMatch = ColorMatchers.HSV.exec(trimmedColor) || ColorMatchers.HSVA.exec(trimmedColor);

        if (hsvMatch) {
            const alpha = hsvMatch[4] === undefined ? 1 : hsvMatch[4];

            return ColorModel.fromHsva({
                h: Number.parseInt(hsvMatch[1]),
                s: Number.parseFloat(hsvMatch[2]),
                v: Number.parseFloat(hsvMatch[3]),
                a: Number.parseFloat(alpha)
            });
        }

        const hexMatch = ColorMatchers.HEX8.exec(trimmedColor) || ColorMatchers.HEX6.exec(trimmedColor) || ColorMatchers.HEX4.exec(trimmedColor) || ColorMatchers.HEX3.exec(trimmedColor);

        if (hexMatch) {
            return ColorModel.fromHex(trimmedColor);
        }

        return ColorModel.fromWhite();
    }

    static fromHex(hexColor) {
        const { rgba } = fromHex(hexColor);

        return new ColorModel(rgba);
    }

    static fromRgba({ r, g, b, a }) {
        const decimalAlpha = valueToDecimal(a);

        return new ColorModel({ r, g, b, a: decimalAlpha });
    }

    static fromHsla({ h, s, l, a }) {
        const decimalS = valueToDecimal(s);
        const decimalL = valueToDecimal(l);
        const decimalAlpha = valueToDecimal(a);

        return ColorModel.fromHsva(HSLAtoHSVA({
            h,
            s: decimalS,
            l: decimalL,
            a: decimalAlpha
        }));
    }

    static fromHsva({ h, s, v, a }) {
        const decimalS = valueToDecimal(s);
        const decimalV = valueToDecimal(v);
        const decimalAlpha = valueToDecimal(a);

        const rgba = HSVAtoRGBA({
            h,
            s: decimalS,
            v: decimalV,
            a: decimalAlpha
        });

        return new ColorModel(rgba);
    }

    static fromTransparent() {
        const rgba = { r: 0, g: 0, b: 0, a: 0 };

        return new ColorModel(rgba);
    }

    static fromWhite() {
        const rgba = { r: 255, g: 255, b: 255, a: 1 };

        return new ColorModel(rgba);
    }

    static fromBlack() {
        const rgba = { r: 0, g: 0, b: 0, a: 1 };

        return new ColorModel(rgba);
    }

    static isTransparent(color) {
        return ColorModel.create(color).isTransparent();
    }

    static isDark(color) {
        return ColorModel.create(color).isDark();
    }

    constructor(rgba) {
        this._rgba = rgba;
        this._hsva = this._calcHsva();
        this._alpha = rgba.a;
    }

    get hex() {
        return this.toHexString();
    }

    get r() {
        return this._rgba.r;
    }

    get b() {
        return this._rgba.b;
    }

    get g() {
        return this._rgba.g;
    }

    get h() {
        return this._hsva.h;
    }

    get s() {
        return this._hsva.s;
    }

    get v() {
        return this._hsva.v;
    }

    get alpha() {
        return this._alpha;
    }

    setAlpha(value) {
        this._alpha = value;
        return this;
    }

    toHexString() {
        return RGBAtoHex({
            r: this.r,
            g: this.g,
            b: this.b,
            a: this.alpha
        });
    }

    toRgbaString() {
        const alphaValue = `${Math.floor(this.alpha * 100)}%`;
        const components = [this.r, this.g, this.b, alphaValue].join(', ');

        return `rgba(${components})`;
    }

    get rgba() {
        return this._rgba;
    }

    updateRgb(rgb) {
        this._rgba = { ...this._rgba, ...rgb };
        this._hsva = this._calcHsva();
    }

    get hsva() {
        return this._hsva;
    }

    updateHsv(hsv) {
        this._hsva = { ...this._hsva, ...hsv };
        this._rgba = this._calcRgba();
    }

    isTransparent() {
        return this.alpha === 0;
    }

    isDark() {
        return this.getBrightness() < 128;
    }

    getBrightness() {
        return (this.rgba.r * 299 + this.rgba.g * 587 + this.rgba.b * 114) / 1000;
    }

    _calcHsva() {
        return RGBAtoHSVA(this.rgba);
    }

    _calcRgba() {
        return HSVAtoRGBA(this.hsva);
    }
}
