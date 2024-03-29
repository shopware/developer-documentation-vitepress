export const optionSrc = {
    name: 's --src <src>',
    description: 'Mount source',
    example: 'docs',
};

export const optionDst = {
    name: 'd --dst <dst>',
    description: 'Mount destination',
    example: 'my-folder',
};
export const optionCI = {
    name: 'ci',
    defaultValue: false
};
export const optionKeep = {
    name: 'keep',
    defaultValue: false
};
export const optionRoot = {
    name: 'ro --root <root>',
    defaultValue: null,
    example: '../..',
};