import { defaultModifiers, popperGenerator } from '@popperjs/core/lib/popper-lite';
import { flip, offset, preventOverflow } from '@popperjs/core/lib/modifiers';

function getModifiers() {
    return [
        {
            name: 'offset',
            options: {
                offset: [0, 4]
            }
        },
        {
            name: 'preventOverflow',
            options: {
                padding: {
                    top: 4,
                    bottom: 4,
                    left: 4,
                    right: 4
                }
            }
        }
    ];
}

export function popperCreator(reference, popper, position) {
    const createPopper = popperGenerator({
        defaultModifiers: [...defaultModifiers, flip, offset, preventOverflow]
    });

    const modifiers = getModifiers();

    return createPopper(reference, popper, {
        placement: position,
        modifiers
    });
}
