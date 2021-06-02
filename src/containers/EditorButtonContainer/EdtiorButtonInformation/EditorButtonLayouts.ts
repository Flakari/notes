import * as btnInfo from './EditorButtonInfo';

export interface CategoryLayout {
    categoryName: string;
    icon: string;
    contents: btnInfo.Style[];
}

// Basic Button Layouts
export const utility = [
    btnInfo.undo, btnInfo.redo
];

export const basicInlineLayout = [
    btnInfo.bold, btnInfo.italic, btnInfo.underline, btnInfo.strikethrough, btnInfo.superscript, btnInfo.subscript
];

export const colorInlineLayout = [
    btnInfo.textColor, btnInfo.highlight
];

export const fullInlineLayout = [
    ...basicInlineLayout, ...colorInlineLayout
];

export const selectLayout = [
    btnInfo.fontSize, btnInfo.headers
];

export const basicBlockLayout = [
    btnInfo.unorderedListItem, btnInfo.orderedListItem
];

export const fullBlockLayout = [
    ...basicBlockLayout, btnInfo.blockQuote, btnInfo.code, btnInfo.unstyled
];

export const basicOveralLayout = [
    ...utility, ...basicInlineLayout, ...basicBlockLayout
];

export const fullOverallLayout = [
    ...utility, ...fullInlineLayout, ...selectLayout, ...fullBlockLayout
];


// Compact Category Layouts

const baseCategory: CategoryLayout = {
    categoryName: 'base',
    icon: 'bold',
    contents: basicInlineLayout
};

const colorsCategory: CategoryLayout = {
    categoryName: 'colors',
    icon: 'paint-brush',
    contents: colorInlineLayout
};

const sizeCategory: CategoryLayout = {
    categoryName: 'size',
    icon: 'font',
    contents: selectLayout
};

const blockCategory: CategoryLayout = {
    categoryName: 'block',
    icon: 'list-ul',
    contents: fullBlockLayout
};

// Compact Layouts

export const smallCompactLayout = [
    ...utility, baseCategory, colorsCategory, sizeCategory, blockCategory
];

export const mediumCompactLayout = [
    ...utility, ...basicInlineLayout, colorsCategory, sizeCategory, blockCategory
];
