export interface Style {
    icon?: string;
    name: string;
    btnType?: string | 'button';
    color?: boolean;
    hasMenu?: boolean;
    type: 'inline' | 'block' | 'utility';
};

export const undo: Style = { icon: 'undo-alt', name: 'UNDO', type: 'utility' };
export const redo: Style = { icon: 'redo-alt', name: 'REDO', type: 'utility' };

export const bold: Style = { icon: 'bold', name: 'BOLD', type: 'inline' };
export const italic: Style = { icon: 'italic', name: 'ITALIC', type: 'inline' };
export const underline: Style = { icon: 'underline', name: 'UNDERLINE', type: 'inline' };
export const strikethrough: Style = { icon: 'strikethrough', name: 'STRIKETHROUGH', type: 'inline' };
export const superscript: Style = { icon: 'superscript', name: 'SUPERSCRIPT', type: 'inline' };
export const subscript: Style = { icon: 'subscript', name: 'SUBSCRIPT', type: 'inline' };
export const textColor: Style = { icon: 'font', name: 'TEXTCOLOR', type: 'inline', color: true, hasMenu: true };
export const highlight: Style = { icon: 'highlighter', name: 'HIGHLIGHT', type: 'inline', color: true, hasMenu: true };

export const fontSize: Style = { btnType: 'select', name: 'FONTSIZE', type: 'inline' };
export const headers: Style = { btnType: 'select', name: 'headers', type: 'block' };

export const unorderedListItem: Style = { icon: 'list-ul', name: 'unordered-list-item', type: 'block' };
export const orderedListItem: Style = { icon: 'list-ol', name: 'ordered-list-item', type: 'block' };
export const blockQuote: Style = { icon: 'quote-right', name: 'blockquote', type: 'block' };
export const code: Style = { icon: 'code', name: 'code-block', type: 'block' };
export const unstyled: Style = { icon: 'remove-format', name: 'unstyled', type: 'block' };
