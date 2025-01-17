const TILE_SIZE = 8;
const TILE_COLOR_LIGHT = '#fff';
const TILE_COLOR_DARK = '#e6e6e6';

export function renderTransparentBg() {
    const canvas = document.createElement('canvas');

    canvas.width = canvas.height = TILE_SIZE * 2;

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        return null;
    }

    ctx.fillStyle = TILE_COLOR_LIGHT;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = TILE_COLOR_DARK;
    ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);
    ctx.translate(TILE_SIZE, TILE_SIZE);
    ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);

    return canvas.toDataURL();
}
