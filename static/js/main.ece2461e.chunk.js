(this.webpackJsonpnotes=this.webpackJsonpnotes||[]).push([[0],{109:function(e,t,n){e.exports={TitleInput:"Title_TitleInput__3JHxB"}},110:function(e,t,n){e.exports={ColorContainer:"ColorContainer_ColorContainer__1L_ju"}},111:function(e,t,n){e.exports={AddButton:"AddButton_AddButton__3qbta"}},112:function(e,t,n){e.exports={OpenMenuButton:"OpenMenuButton_OpenMenuButton__7gbcs"}},113:function(e,t,n){e.exports={ConfirmationModal:"ConfirmationModal_ConfirmationModal__1pH55"}},120:function(e,t,n){},125:function(e,t,n){},17:function(e,t,n){e.exports={ButtonContainer:"EditorButtonContainer_ButtonContainer__veloK",ButtonWithMenuContainer:"EditorButtonContainer_ButtonWithMenuContainer__2gIUb",EditorButton:"EditorButtonContainer_EditorButton__2XgRm",EditorSubButton:"EditorButtonContainer_EditorSubButton__3rbRw",active:"EditorButtonContainer_active__2GX6w",CategoryMenu:"EditorButtonContainer_CategoryMenu__TeFFf"}},19:function(e,t,n){e.exports={Note:"Note_Note__2FwFU",blue:"Note_blue__3WIEK",green:"Note_green__1XbtZ",pink:"Note_pink__1P1-l",NoteEditorContainer:"Note_NoteEditorContainer__6q758",NoteGrabContainer:"Note_NoteGrabContainer__3XDGp",NoteButtonContainer:"Note_NoteButtonContainer__1SQfp",right:"Note_right__1grwx",bottom:"Note_bottom__ymkgG",NoteMenuButton:"Note_NoteMenuButton__23o6K"}},222:function(e,t,n){"use strict";n.r(t);var o,r=n(0),a=n(1),c=n.n(a),i=n(21),u=n.n(i),d=(n(120),n(3)),s=n(4),l=(n(125),n(68)),b=n.n(l),j=n(109),O=n.n(j),f=function(e){var t=Object(s.d)((function(t){return""!==t.page.currentPageId?t.page.pages.filter((function(t){return t.id===e.id}))[0].title:""!==t.board.currentBoardId?t.board.boards[e.id].title:void 0})),n=Object(s.d)((function(e){return""!==e.page.currentPageId?"page":""!==e.board.currentBoardId?"board":void 0})),o=Object(s.c)(),c=Object(a.useState)(t||"Untitled"),i=Object(d.a)(c,2),u=i[0],l=i[1],b=Object(a.useRef)(null);return Object(r.jsx)("input",{ref:b,id:O.a.TitleInput,type:"text",value:u,onChange:function(t){l(t.target.value),"page"===n&&o({type:"SAVE_PAGE_TITLE",id:e.id,title:t.target.value}),"board"===n&&o({type:"SAVE_BOARD_TITLE",title:t.target.value})},placeholder:"Untitled",onBlur:function(){b.current&&(b.current.scrollLeft=0)}})},p=function(){var e=Object(s.d)((function(e){return""!==e.page.currentPageId?e.page.currentPageId:""!==e.board.currentBoardId?e.board.currentBoardId:""}));return Object(r.jsx)("header",{id:b.a.MainHeader,children:Object(r.jsx)("div",{id:b.a.TitleContainer,children:""!==e?Object(r.jsx)(f,{id:e},e):Object(r.jsx)("p",{children:"Notes"})})})},g=n(2),_=n(16),m=n(8),h=n(24),S=n(41),E=n(17),C=n.n(E),v=n(110),y=n.n(v),I=function(e){return Object(r.jsx)("div",{className:y.a.ColorContainer,children:Object(r.jsx)("ul",{children:h.basic.map((function(t){return Object(r.jsxs)("li",{onClick:function(n){return function(t,n){t.preventDefault(),e.changeColor(e.type,n),e.showButton(e.type)}(n,t.name)},children:[Object(r.jsx)("div",{style:{background:t.color}}),t.name]},t.name)}))})})},B=function(e){var t=Object(a.useState)(!1),n=Object(d.a)(t,2),o=n[0],c=n[1],i=Object(a.useState)(e.editorState.getSelection()),u=Object(d.a)(i,2),s=u[0],l=u[1],b=Object(a.useState)({}),j=Object(d.a)(b,2),O=j[0],f=j[1];Object(a.useEffect)((function(){if("inline"===e.styleType&&(c(e.editorState.getCurrentInlineStyle().has(e.type)),e.hasMenu)){var t,n=Object(_.a)(h.basic);try{for(n.s();!(t=n.n()).done;){var o=t.value;if(e.editorState.getCurrentInlineStyle().has("".concat(o.name,"-").concat(e.type)))return void f({color:o.color});f({})}}catch(a){n.e(a)}finally{n.f()}}if("block"===e.styleType&&"unstyled"!==e.type){var r=e.editorState.getCurrentContent().getBlockForKey(s.getAnchorKey());c(r&&r.getType()===e.type)}}),[e.editorState,e.type,s,e.styleType,e.hasMenu]),Object(a.useEffect)((function(){l(e.editorState.getSelection())}),[e.editorState]);var p=Object(r.jsx)("button",{className:[C.a.EditorButton,"fas fa-".concat(e.icon),o?C.a.active:null].join(" "),onMouseDown:function(t){t.preventDefault(),e.fn(e.type)},"aria-label":e.type.toLowerCase(),style:O});return e.hasMenu&&(p=Object(r.jsxs)("div",{className:C.a.ButtonWithMenuContainer,children:[p,Object(r.jsx)("button",{onMouseDown:function(){return e.showButton(e.type)},className:C.a.EditorSubButton,"aria-label":"Dropdown",children:Object(r.jsx)("div",{})}),e.showValue?Object(r.jsx)(I,{type:e.type,changeColor:e.fn,showButton:e.showButton}):null]})),p},x=function(e){var t=Object(a.useState)(e.default),n=Object(d.a)(t,2),o=n[0],c=n[1],i=Object(a.useState)(e.editorState.getSelection()),u=Object(d.a)(i,2),s=u[0],l=u[1],b=Object(a.useCallback)((function(t){var n,o=Object(_.a)(e.options);try{for(o.s();!(n=o.n()).done;){var r=n.value;if(t.getCurrentInlineStyle().has("".concat(r,"-FONTSIZE")))return void c(r);c(e.default)}}catch(a){o.e(a)}finally{o.f()}}),[e.options,e.default]),j=Object(a.useCallback)((function(t,n){var o,r=t.getCurrentContent().getBlockForKey(n.getAnchorKey()),a=Object(_.a)(e.options);try{for(a.s();!(o=a.n()).done;){var i=o.value;if(r&&r.getType()===i)return void c(i);c("")}}catch(u){a.e(u)}finally{a.f()}}),[e.options]);return Object(a.useEffect)((function(){b(e.editorState),l(e.editorState.getSelection())}),[e.editorState,b]),Object(a.useEffect)((function(){"block"===e.styleType&&j(e.editorState,s)}),[s,e.editorState,j,e.styleType]),Object(r.jsxs)("select",{"aria-label":e.type.toLowerCase(),value:o,onChange:function(e){c(e.target.value)},children:[Object(r.jsx)("option",{value:"",children:"---"}),e.options.map((function(t){return Object(r.jsx)("option",{onClick:function(){return e.fn(t)},value:t,children:t},t)}))]})},N=function(e){var t=Object(a.useState)(!1),n=Object(d.a)(t,2),o=n[0],c=n[1];return Object(r.jsxs)(r.Fragment,{children:[o?Object(r.jsx)("div",{className:C.a.CategoryMenu,children:e.children}):null,Object(r.jsx)("button",{onClick:function(){c((function(e){return!e}))},className:[C.a.EditorButton,"fas fa-".concat(e.icon)].join(" ")},e.name)]})},T=[],M=[],w=S.sizes.map((function(e){return"".concat(e,"-FONTSIZE")})),k=Object(_.a)(h.basic);try{for(k.s();!(o=k.n()).done;){var A=o.value;T.push("".concat(A.name,"-TEXTCOLOR")),M.push("".concat(A.name,"-HIGHLIGHT"))}}catch(lt){k.e(lt)}finally{k.f()}var P,R=["header-one","header-two","header-three","header-four","header-five","header-six"],D=function(e){var t=Object(a.useState)(!1),n=Object(d.a)(t,2),o=n[0],c=n[1],i=Object(a.useState)(!1),u=Object(d.a)(i,2),s=u[0],l=u[1],b=function(e){"TEXTCOLOR"===e?c((function(e){return!e})):l((function(e){return!e}))},j=function(t){e.setEditorState(m.RichUtils.toggleInlineStyle(e.editorState,t)),e.removeComponentLoadedState()},O=function(t){var n=t.reduce((function(t,n){return m.Modifier.removeInlineStyle(t,e.editorState.getSelection(),n)}),e.contentState);return m.EditorState.push(e.editorState,n,"change-inline-style")},f=function(t,n){var o="TEXTCOLOR"===t?T:M;if("TEXTCOLOR"===t&&"black"===n||"HIGHLIGHT"===t&&"white"===n)e.setEditorState(O(o));else{var r=m.Modifier.applyInlineStyle(O(o).getCurrentContent(),e.editorState.getSelection(),"".concat(n,"TEXTCOLOR"===t?"-TEXTCOLOR":"-HIGHLIGHT"));e.setEditorState(m.EditorState.push(e.editorState,r,"change-inline-style"))}e.removeComponentLoadedState()},p=function(t){if(16===t)e.setEditorState(O(w));else{var n=m.Modifier.applyInlineStyle(O(w).getCurrentContent(),e.editorState.getSelection(),"".concat(t,"-FONTSIZE"));e.setEditorState(m.EditorState.push(e.editorState,n,"change-inline-style"))}e.removeComponentLoadedState()},g=function(t){var n="SUPERSCRIPT"===t?"SUBSCRIPT":"SUPERSCRIPT",o=e.editorState;e.editorState.getCurrentInlineStyle().has(n)&&(o=m.RichUtils.toggleInlineStyle(e.editorState,n)),e.setEditorState(m.RichUtils.toggleInlineStyle(o,t)),e.removeComponentLoadedState()},_=function(t){e.setEditorState(m.RichUtils.toggleBlockType(e.editorState,t)),e.removeComponentLoadedState()},h=function(){e.setEditorState(m.EditorState.undo(e.editorState))},E=function(){e.setEditorState(m.EditorState.redo(e.editorState))},v=function(t){return"utility"===t.type?(n=t,Object(r.jsx)(B,{type:n.name,icon:n.icon,fn:"UNDO"===n.name?h:E,editorState:e.editorState,styleType:n.type},n.name)):"select"===t.btnType?function(t){var n,o,a;return"inline"===t.type?(n=p,o=S.sizes,a=16..toString()):(n=_,o=R,a="headerone"),Object(r.jsx)(x,{options:o,fn:n,type:t.name,default:a,editorState:e.editorState,styleType:t.type},t.name)}(t):"inline"===t.type?function(t){var n="color"in t?f:"SUPERSCRIPT"===t.name||"SUBSCRIPT"===t.name?g:j,a="TEXTCOLOR"===t.name?o:s;return Object(r.jsx)(B,{type:t.name,icon:t.icon,hasMenu:t.hasMenu,fn:n,showValue:a,showButton:b,editorState:e.editorState,styleType:"inline"},t.name)}(t):function(t){return Object(r.jsx)(B,{type:t.name,icon:t.icon,fn:_,editorState:e.editorState,styleType:"block"},t.name)}(t);var n};return Object(r.jsx)("div",{className:[C.a.ButtonContainer,e.editorButtonClass].join(" "),children:e.editorButtonSelection.map((function(e){return"categoryName"in e?Object(r.jsx)(N,{name:e.categoryName,icon:e.icon,children:e.contents.map((function(e){return v(e)}))},e.categoryName):v(e)}))})},F=(n(221),{}),L={},H={},U=Object(_.a)(h.basic);try{for(U.s();!(P=U.n()).done;){var G=P.value;F["".concat(G.name,"-TEXTCOLOR")]={color:G.color},L["".concat(G.name,"-HIGHLIGHT")]={backgroundColor:G.color}}}catch(lt){U.e(lt)}finally{U.f()}var X,z=Object(_.a)(S.sizes);try{for(z.s();!(X=z.n()).done;){var Z=X.value;H["".concat(Z,"-FONTSIZE")]={fontSize:Z}}}catch(lt){z.e(lt)}finally{z.f()}var K=function(e){var t=e.id,n=e.saveNote,o=e.content,c=e.editorButtonClass,i=e.editorClass,u=e.showButtons,s=e.editorButtonSelection,l=e.lockEditor,b=Object(a.useState)(o?function(){return m.EditorState.createWithContent(Object(m.convertFromRaw)(JSON.parse(o)))}:function(){return m.EditorState.createEmpty()}),j=Object(d.a)(b,2),O=j[0],f=j[1],p=O.getCurrentContent(),_=Object(a.useRef)(null),h=Object(a.useState)(!0),S=Object(d.a)(h,2),E=S[0],C=S[1],v=Object(a.useState)(!1),y=Object(d.a)(v,2),I=y[0],B=y[1],x=Object(a.useRef)(null),N=Object(g.a)(Object(g.a)(Object(g.a)({STRIKETHROUGH:{textDecoration:"line-through"},SUPERSCRIPT:{fontSize:".83em",verticalAlign:"super"},SUBSCRIPT:{fontSize:".83em",verticalAlign:"sub"}},F),L),H);Object(a.useEffect)((function(){B(!1);var e=setTimeout((function(){n(t,JSON.stringify(Object(m.convertToRaw)(p))),E||B(!0)}),2e3);return function(){clearTimeout(e)}}),[p,E,n,t]),Object(a.useEffect)((function(){var e=function(){return C(!1)},t=_.current;return t.addEventListener("keydown",e),function(){t.removeEventListener("keydown",e)}}),[]),Object(a.useEffect)((function(){var e=setTimeout((function(){!0===I&&B(!1)}),2500);return function(){clearTimeout(e)}}),[I]);return Object(r.jsxs)(r.Fragment,{children:[void 0===u||u?Object(r.jsx)(D,{editorState:O,setEditorState:f,contentState:p,removeComponentLoadedState:function(){E&&C(!1)},editorButtonClass:c,editorButtonSelection:s}):null,Object(r.jsx)("div",{ref:_,className:i,onClick:function(){x.current&&x.current.focus()},children:Object(r.jsx)(m.Editor,{ref:x,handleKeyCommand:function(e){var t=m.RichUtils.handleKeyCommand(O,e);return"on-tab"===e?"handled":t?(f(t),"handled"):"not-handled"},customStyleMap:N,editorState:O,onChange:f,keyBindingFn:function(e){if("Tab"===e.key){var t=O.getSelection(),n=O.getCurrentContent().getBlockForKey(t.getStartKey()).getType();if("unordered-list-item"===n||"ordered-list-item"===n){var o=m.RichUtils.onTab(e,O,4);f(o)}else{var r=m.Modifier.replaceText(O.getCurrentContent(),t,"\t");f(m.EditorState.push(O,r,"insert-characters"))}return"on-tab"}return Object(m.getDefaultKeyBinding)(e)},readOnly:void 0!==l&&l})})]})},W=n(54),V=n.n(W),Y=n(42),J=[{icon:"undo-alt",name:"UNDO",type:"utility"},{icon:"redo-alt",name:"REDO",type:"utility"}],q=[{icon:"bold",name:"BOLD",type:"inline"},{icon:"italic",name:"ITALIC",type:"inline"},{icon:"underline",name:"UNDERLINE",type:"inline"},{icon:"strikethrough",name:"STRIKETHROUGH",type:"inline"},{icon:"superscript",name:"SUPERSCRIPT",type:"inline"},{icon:"subscript",name:"SUBSCRIPT",type:"inline"}],Q=[{icon:"font",name:"TEXTCOLOR",type:"inline",color:!0,hasMenu:!0},{icon:"highlighter",name:"HIGHLIGHT",type:"inline",color:!0,hasMenu:!0}],$=[].concat(q,Q),ee=[{btnType:"select",name:"FONTSIZE",type:"inline"},{btnType:"select",name:"headers",type:"block"}],te=[{icon:"list-ul",name:"unordered-list-item",type:"block"},{icon:"list-ol",name:"ordered-list-item",type:"block"}],ne=[].concat(te,[{icon:"quote-right",name:"blockquote",type:"block"},{icon:"code",name:"code-block",type:"block"},{icon:"remove-format",name:"unstyled",type:"block"}]),oe=[].concat(J,q,te),re=[].concat(J,Object(Y.a)($),ee,Object(Y.a)(ne)),ae={categoryName:"colors",icon:"paint-brush",contents:Q},ce={categoryName:"size",icon:"font",contents:ee},ie={categoryName:"block",icon:"list-ul",contents:ne},ue=[].concat(J,[{categoryName:"base",icon:"bold",contents:q},ae,ce,ie]),de=[].concat(J,q,[ae,ce,ie]),se=function(){var e=Object(a.useState)([]),t=Object(d.a)(e,2),n=t[0],o=t[1],c=Object(s.d)((function(e){return e.page.currentPageId})),i=Object(s.d)((function(e){return e.page.pages.filter((function(e){return e.id===c}))[0].content})),u=Object(s.c)();Object(a.useEffect)((function(){var e=function(){return o((e=window.innerWidth)>=900?re:e<900&&e>=500?de:ue);var e};return e(),window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}}),[]);var l=Object(a.useCallback)((function(e,t){u({type:"SAVE_PAGE",id:e,content:t})}),[u]);return Object(r.jsx)("div",{id:V.a.PageContainer,children:Object(r.jsx)(K,{id:c,editorClass:V.a.PageEditorContainer,editorButtonClass:V.a.PageEditorButtonContainer,saveNote:l,content:i,editorButtonSelection:n})})},le=n(226),be=n(111),je=n.n(be),Oe=function(e){var t=Object(s.c)();return Object(r.jsxs)("button",{className:je.a.AddButton,onClick:function(){t({type:"CREATE_".concat(e.type.toUpperCase())})},children:["Create ",e.type]})},fe=n(112),pe=n.n(fe),ge=function(e){return Object(r.jsx)("button",{onClick:e.click,className:[pe.a.OpenMenuButton,e.menuClass].join(" "),children:Object(r.jsxs)("svg",{viewBox:"0 0 515.555 515.555","aria-labelledby":"menuTitle menuDesc",role:"menu",children:[Object(r.jsx)("title",{id:"menuTitle",children:"Menu Button"}),Object(r.jsx)("desc",{id:"menuDesc",children:"Opens menu for the corresponding item"}),Object(r.jsx)("path",{d:"M303.347 18.875c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0M303.347 212.209c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0M303.347 405.541c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0"})]})})},_e=n(31),me=n.n(_e),he=function(e){var t=Object(a.useState)(!1),n=Object(d.a)(t,2),o=n[0],c=n[1],i=Object(s.c)();return Object(r.jsxs)("div",{onMouseLeave:function(){c(!1)},className:me.a.MenuItem,onClick:e.click,children:[Object(r.jsx)("div",{className:"page"===e.type?me.a.MenuPageImage:me.a.MenuBoardImage}),Object(r.jsx)("p",{children:e.title}),Object(r.jsx)(ge,{menuClass:me.a.MenuItemButton,click:function(e){e.stopPropagation(),c((function(e){return!e}))}}),o?Object(r.jsx)("div",{onClick:function(t){t.stopPropagation(),i(e.delete)},className:me.a.SubMenu,children:"Delete"}):null]})},Se=n(53),Ee=n.n(Se),Ce=function(e){var t=Object(s.d)((function(e){return e.page.pages})),n=Object(s.d)((function(e){return e.page.currentPageId})),o=Object(s.c)();return Object(r.jsx)("div",{className:Ee.a.Menu,children:Object(r.jsxs)("ul",{children:[Object(r.jsx)(Oe,{type:"Page"}),t.filter((function(e){return e.id!==n})).map((function(t){return Object(r.jsx)("li",{children:Object(r.jsx)(he,{title:t.title||"Untitled",click:function(){return n=t.id,e.toggle(),o({type:"SHOW_PAGE",id:n}),void o({type:"HIDE_BOARD",id:n});var n},delete:{type:"DELETE_PAGE",id:t.id},type:"page"})},t.id)}))]})})},ve=function(e){var t=Object(s.d)((function(e){return e.board.boards})),n=Object(s.d)((function(e){return e.board})),o=Object(s.c)();return Object(r.jsx)("div",{className:Ee.a.Menu,children:Object(r.jsxs)("ul",{children:[Object(r.jsx)(Oe,{type:"Board"}),Object.keys(t).filter((function(e){return t[e].id!==n.currentBoardId})).map((function(n){return Object(r.jsx)("li",{children:Object(r.jsx)(he,{title:t[n].title||"Untitled",click:function(){return r=t[n].id,e.toggle(),o({type:"SHOW_BOARD",id:r}),void o({type:"HIDE_PAGE"});var r},delete:{type:"DELETE_BOARD",id:t[n].id},type:"board"})},t[n].id)}))]})})},ye=n(25),Ie=n.n(ye),Be=function(){var e=Object(a.useState)(!0),t=Object(d.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)(!1),i=Object(d.a)(c,2),u=i[0],s=i[1],l=function(){o(!0)},b=function(){o(!1)},j=Object(a.useRef)(null),O={entering:{transform:"translateY(300px)"},entered:{transform:"translateY(300px)"},exited:{visibility:"hidden"}},f={transition:"transform ".concat(500," ease-in"),transform:"translateY(0)"},p=function(){s((function(e){return!e}))};return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(le.a,{in:u,timeout:500,nodeRef:j,children:function(e){return Object(r.jsxs)("div",{style:Object(g.a)(Object(g.a)({},f),O[e]),id:Ie.a.MenuContainer,ref:j,children:[Object(r.jsxs)("div",{id:Ie.a.MenuButtonContainer,children:[Object(r.jsx)("button",{className:n?Ie.a.active:void 0,onClick:l,children:"Pages"}),Object(r.jsx)("button",{className:n?void 0:Ie.a.active,onClick:b,children:"Board"})]}),n?Object(r.jsx)(Ce,{toggle:p}):Object(r.jsx)(ve,{toggle:p})]})}}),Object(r.jsx)("div",{id:Ie.a.MenuToggle,className:u?Ie.a.expanded:Ie.a.collapsed,onClick:p,"aria-label":u?"Collapse Menu":"Expand Menu"})]})},xe=n(32),Ne=n.n(xe),Te=n(19),Me=n.n(Te),we=n(33),ke=n.n(we),Ae=n(55),Pe=n.n(Ae),Re=function(e){return Object(r.jsx)("button",{onClick:e.clickFunction,className:[Pe.a.NoteMenuItem,e.subMenuItem&&Pe.a.NoteSubMenuItem,e.addedClasses?e.addedClasses.map((function(e){return Pe.a[e]})).join(" "):null].join(" "),children:e.children})},De=n(113),Fe=n.n(De),Le=function(e){return Object(r.jsxs)("div",{onClick:e.bodyFunction,className:[Fe.a.ConfirmationModal,e.modalClass].join(" "),children:[Object(r.jsx)("p",{children:e.children}),Object(r.jsx)("button",{onClick:e.confirmFunction,children:"Yes"}),Object(r.jsx)("button",{onClick:e.cancelFunction,children:"No"})]})},He=[{name:"Original",color:""},{name:"Blue",color:"blue"},{name:"Green",color:"green"},{name:"Pink",color:"pink"}],Ue=["editor","position","delete"],Ge=function(e){var t=Object(s.c)(),n=Object(s.d)((function(t){return t.board.boards[t.board.currentBoardId].notes[e.id].locks})),o=Object(a.useState)(!1),c=Object(d.a)(o,2),i=c[0],u=c[1],l=Object(a.useState)(!1),b=Object(d.a)(l,2),j=b[0],O=b[1],f=Object(a.useState)(!1),p=Object(d.a)(f,2),g=p[0],_=p[1],m=function(e){e.stopPropagation(),_(!1)};return Object(r.jsxs)("div",{className:ke.a.NoteMenu,children:[Object(r.jsx)(Re,{clickFunction:function(e){m(e),u((function(e){return!e}))},children:"Change Note Color"}),i?Object(r.jsx)("div",{className:ke.a.NoteSubMenu,children:He.map((function(n){return Object(r.jsx)(Re,{clickFunction:function(o){return function(n,o){m(o),t({type:"CHANGE_NOTE_COLOR",noteId:e.id,color:n})}(n.color,o)},subMenuItem:!0,children:n.name},n.name)}))}):null,Object(r.jsx)(Re,{clickFunction:function(e){m(e),O((function(e){return!e}))},children:"Lock"}),j?Object(r.jsx)("div",{className:ke.a.NoteSubMenu,children:Ue.map((function(o){return Object(r.jsx)(Re,{clickFunction:function(n){return function(n,o){m(o),t({type:"TOGGLE_NOTE_LOCK",noteId:e.id,lockType:n})}(o,n)},subMenuItem:!0,children:n[o]?Object(r.jsxs)("div",{className:ke.a.LockMenuItem,children:[Object(r.jsx)("div",{className:"fas fa-lock"}),Object(r.jsx)("p",{children:o})]}):o},o)}))}):null,Object(r.jsx)(Re,{clickFunction:function(e){e.stopPropagation(),n.delete||_((function(e){return!e}))},addedClasses:["delete",n.delete?"disabled":""],children:"Delete"}),g?Object(r.jsx)(Le,{modalClass:ke.a.DeleteModal,bodyFunction:function(e){return e.stopPropagation()},confirmFunction:function(){t({type:"DELETE_NOTE",id:e.id})},cancelFunction:function(e){e.stopPropagation(),_(!1)},children:"Confirm Note Deletion?"}):null]})},Xe=function(e){var t=Object(s.d)((function(e){return e.board.currentBoardId})),n=Object(s.d)((function(n){return n.board.boards[t].notes[e.id]})),o=Object(a.useState)(0),c=Object(d.a)(o,2),i=c[0],u=c[1],l=Object(a.useState)(0),b=Object(d.a)(l,2),j=b[0],O=b[1],f=Object(a.useState)(!1),p=Object(d.a)(f,2),_=p[0],m=p[1],h=Object(s.d)((function(){return n.zIndex})),S=Object(s.d)((function(){return n.color})),E=Object(a.useState)({zIndex:h,top:e.top||20,left:e.left||20}),C=Object(d.a)(E,2),v=C[0],y=C[1],I=Object(s.d)((function(){return n.locks})),B=Object(a.useState)(I.position?{cursor:"default"}:{cursor:"grab"}),x=Object(d.a)(B,2),N=x[0],T=x[1],M=Object(s.c)(),w=Object(a.useState)(!1),k=Object(d.a)(w,2),A=k[0],P=k[1],R=Object(a.useState)(!1),D=Object(d.a)(R,2),F=D[0],L=D[1],H=Object(a.useState)(!1),U=Object(d.a)(H,2),G=U[0],X=U[1],z=Object(a.useState)(Me.a.NoteButtonContainer),Z=Object(d.a)(z,2),W=Z[0],V=Z[1],Y=Object(a.useCallback)((function(){I.editor?P(!1):P(!0)}),[I.editor]);Object(a.useEffect)((function(){e.noteFocus.inFocus&&e.noteFocus.id===n.id?(Y(),L(!0)):(P(!1),L(!1),X(!1))}),[e.noteFocus,n.id,I.editor,Y]),Object(a.useEffect)((function(){I.position?T({cursor:"default"}):T({cursor:"grab"})}),[I.position]);var J=function(){h!==e.zIndex&&(M({type:"UPDATE_NOTE_ZINDEX",noteId:e.id,zIndex:e.zIndex+1}),M({type:"UPDATE_BOARD_ZINDEX",zIndex:e.zIndex+1}),y(Object(g.a)(Object(g.a)({},v),{},{zIndex:e.zIndex+1})))},q=Object(a.useCallback)((function(e,t){M({type:"SAVE_NOTE_CONTENT",noteId:e,content:t})}),[M]);return Object(r.jsxs)("div",Object(g.a)(Object(g.a)({className:[Me.a.Note,Me.a[S]].join(" "),style:v},e.dragging&&_&&{onMouseMove:function(e){if(!I.position){var t=e.screenY-j-85+window.scrollY,n=e.screenX-i+window.scrollX;t<40&&(t=40),n<20&&(n=20),P(!1),L(!1),X(!1),y(Object(g.a)(Object(g.a)({},v),{},{left:n,top:t}))}}}),{},{onMouseUp:function(t){if(!I.position){var o=t.currentTarget.getBoundingClientRect().right+window.scrollX,r=t.currentTarget.getBoundingClientRect().bottom+window.scrollY;!function(){var e=Object(g.a)({},v);delete e.width,y(e)}(),function(e,t){var n=[Me.a.NoteButtonContainer];e>.75*window.innerWidth+window.scrollX&&n.push(Me.a.right),t<.1*(window.innerHeight-105)+window.scrollY&&n.push(Me.a.bottom),V(n.join(" "))}(o-window.scrollX,v.top),m(!1),e.setDraggingState(!1),T({cursor:"grab"}),function(t,n){n>=e.containerHeight+80&&M({type:"UPDATE_BOARD_SIZE",direction:"height",size:n-80}),t>=e.containerWidth-20&&M({type:"UPDATE_BOARD_SIZE",direction:"width",size:t+20})}(o,r),function(t,o){if(v.left!==n.left||v.top!==n.top||t!==n.right||o!==n.bottom){var r={left:v.left,top:v.top,right:t,bottom:o};M({type:"UPDATE_NOTE_POSITION",noteId:e.id,position:r})}}(o,r)}},onClick:function(t){t.stopPropagation(),e.setNoteFocus({id:n.id,inFocus:!0}),G&&X(!1),J()},children:[Object(r.jsx)("div",{className:Me.a.NoteGrabContainer,onMouseDown:function(t){I.position||(t.stopPropagation(),u(t.screenX-t.target.getBoundingClientRect().left),O(t.screenY-t.target.getBoundingClientRect().top),e.setDraggingState(!0),m(!0),T({cursor:"grabbing"}),J(),y(Object(g.a)(Object(g.a)({},v),{},{width:t.target.getBoundingClientRect().width})))},style:N,children:Object(r.jsx)("div",{})}),Object(r.jsx)(K,{id:e.id,content:n.content,editorButtonClass:W,editorClass:Me.a.NoteEditorContainer,saveNote:q,showButtons:A,editorButtonSelection:oe,lockEditor:I.editor}),F?Object(r.jsx)(ge,{click:function(){X((function(e){return!e}))},menuClass:Me.a.NoteMenuButton}):null,G?Object(r.jsx)(Ge,{id:e.id,hideMenu:function(){return X(!1)}}):null]}))},ze=function(e){var t=Object(a.useState)(!1),n=Object(d.a)(t,2),o=n[0],c=n[1],i=Object(s.d)((function(t){return t.board.boards[e.id].maxZIndex})),u=Object(s.d)((function(t){return t.board.boards[e.id].width})),l=Object(s.d)((function(t){return t.board.boards[e.id].height})),b=Object(a.useState)({width:u,height:l}),j=Object(d.a)(b,2),O=j[0],f=j[1],p=Object(s.c)(),g=Object(s.d)((function(t){return t.board.boards[e.id].notes})),_=Object(s.d)((function(){return Object.keys(g)})),m=Object(a.useState)({id:"",inFocus:!1}),h=Object(d.a)(m,2),S=h[0],E=h[1],C=function(e){c(e)};Object(a.useEffect)((function(){var e=l,t=u;e<window.innerHeight-105&&(e="calc(100% - 105px)"),t<window.innerWidth&&(t="100%"),f({height:e,width:t})}),[l,u]);return Object(r.jsxs)("div",{id:Ne.a.NoteBoard,style:O,onClick:function(){return E({id:"",inFocus:!1})},children:[_.map((function(e){return Object(r.jsx)(Xe,{id:g[e].id,left:g[e].left,top:g[e].top,dragging:o,setDraggingState:C,zIndex:i,containerWidth:u,containerHeight:l,noteFocus:S,setNoteFocus:E},g[e].id)})),0===Object.keys(g).length?Object(r.jsxs)("div",{id:Ne.a.AddButtonArrowContainer,children:[Object(r.jsx)("div",{id:Ne.a.AddButtonArrowBody,children:"Add Note"}),Object(r.jsx)("div",{id:Ne.a.AddButtonArrow})]}):null,Object(r.jsx)("button",{id:Ne.a.AddButton,onClick:function(){p({type:"CREATE_NOTE"}),p({type:"UPDATE_BOARD_ZINDEX",zIndex:i+1})},"aria-label":"Add Note",children:"+"})]})},Ze=Object(s.b)((function(e){return{currentPageId:e.page.currentPageId,showEditor:e.page.showEditor,showBoard:e.board.showBoard,currentBoardId:e.board.currentBoardId}}))((function(e){var t=Object(a.useState)(["App"]),n=Object(d.a)(t,2),o=n[0],c=n[1];return Object(a.useEffect)((function(){var t=["App"];e.showBoard?c(t.concat("Board")):e.showEditor?c(t.concat("Page")):c(t)}),[e.showBoard,e.showEditor]),Object(r.jsxs)("div",{className:o.join(" "),children:[Object(r.jsx)(p,{}),Object(r.jsx)(Be,{}),e.showEditor&&""!==e.currentPageId&&Object(r.jsx)(se,{},e.currentPageId),e.showBoard&&""!==e.currentBoardId&&Object(r.jsx)(ze,{id:e.currentBoardId},e.currentBoardId)]})})),Ke=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,227)).then((function(t){var n=t.getCLS,o=t.getFID,r=t.getFCP,a=t.getLCP,c=t.getTTFB;n(e),o(e),r(e),a(e),c(e)}))},We=n(225),Ve=function(e,t){localStorage.setItem(e,JSON.stringify(t))},Ye={pages:JSON.parse(localStorage.getItem("pages")||"[]"),currentPageId:"",showEditor:!1},Je=function(e,t){var n=Object(d.a)(t,3),o=n[0],r=n[1],a=void 0===r?"":r,c=n[2],i=void 0===c?"":c;return e.pages.map((function(e){return e.id===o&&(i&&(e.content=i),a&&(e.title=a)),e}))},qe=function(e,t){var n=Object(Y.a)(e.pages);return n.splice(function(e,t){for(var n=0;n<e.pages.length;n++)if(e.pages[n].id===t)return n;return 0}(e,t),1),n},Qe=function(e,t,n){var o=t(e,n);return Ve("pages",o),Object(g.a)(Object(g.a)({},e),{},{pages:o})},$e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ye,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CREATE_PAGE":var n=e.pages.concat({id:Object(We.a)(),title:"",content:""});return Ve("pages",n),Object(g.a)(Object(g.a)({},e),{},{pages:n});case"SAVE_PAGE":return Qe(e,Je,[t.id,null,t.content]);case"SAVE_PAGE_TITLE":return Qe(e,Je,[t.id,t.title,null]);case"DELETE_PAGE":return Qe(e,qe,t.id);case"SHOW_PAGE":return Object(g.a)(Object(g.a)({},e),{},{currentPageId:t.id,showEditor:!0});case"HIDE_PAGE":return Object(g.a)(Object(g.a)({},e),{},{currentPageId:"",showEditor:!1});default:return e}},et=n(18),tt={boards:JSON.parse(localStorage.getItem("boards")||"{}"),showBoard:!1,currentBoardId:""},nt=function(e){var t=Object(We.a)(),n=e.boards[e.currentBoardId].maxZIndex+1,o=Object(g.a)({},e.boards);return o[e.currentBoardId].notes[t]={id:t,content:"",left:20+window.scrollX,top:40+window.scrollY,right:0,bottom:0,zIndex:n,color:"",locks:{editor:!1,position:!1,delete:!1}},o},ot=function(e,t,n){return Object(g.a)(Object(g.a)({},t),{},Object(et.a)({},e.currentBoardId,Object(g.a)(Object(g.a)({},t[e.currentBoardId]),n)))},rt=function(e,t){return Ve("boards",t),Object(g.a)(Object(g.a)({},e),{},{boards:t})},at=function(e,t,n){var o=function(e,t,n){return Object(g.a)(Object(g.a)({},e.boards),{},Object(et.a)({},e.currentBoardId,Object(g.a)(Object(g.a)({},e.boards[e.currentBoardId]),{},{notes:Object(g.a)(Object(g.a)({},e.boards[e.currentBoardId].notes),{},Object(et.a)({},t,Object(g.a)({},n)))})))}(e,t,function(e,t,n){return Object(g.a)(Object(g.a)({},e.boards[e.currentBoardId].notes[t]),n)}(e,t,n));return rt(e,o)},ct=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:tt,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CREATE_NOTE":return rt(e,nt(e));case"UPDATE_NOTE_POSITION":return at(e,t.noteId,Object(g.a)({},t.position));case"UPDATE_NOTE_ZINDEX":return at(e,t.noteId,{zIndex:t.zIndex});case"SAVE_NOTE_CONTENT":return at(e,t.noteId,{content:t.content});case"CHANGE_NOTE_COLOR":return at(e,t.noteId,{color:t.color});case"TOGGLE_NOTE_LOCK":var n=e.boards[e.currentBoardId].notes[t.noteId].locks;return at(e,t.noteId,{locks:Object(g.a)(Object(g.a)({},n),{},Object(et.a)({},t.lockType,!n[t.lockType]))});case"DELETE_NOTE":var o=Object(g.a)({},e.boards[e.currentBoardId].notes);delete o[t.id];var r=Object(g.a)(Object(g.a)({},e.boards),{},Object(et.a)({},e.currentBoardId,Object(g.a)(Object(g.a)({},e.boards[e.currentBoardId]),{},{notes:o})));return rt(e,r);default:return e}},it=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:tt,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CREATE_BOARD":if(Object.keys(e.boards).length>=2)return e;var n=Object(We.a)(),o=Object(g.a)({},e.boards);return o[n]={title:"",notes:{},id:n,width:0,height:0,maxZIndex:1},rt(e,o);case"SAVE_BOARD_TITLE":var r=Object(g.a)(Object(g.a)({},e.boards),{},Object(et.a)({},e.currentBoardId,Object(g.a)(Object(g.a)({},e.boards[e.currentBoardId]),{},{title:t.title})));return rt(e,r);case"UPDATE_BOARD_ZINDEX":return rt(e,ot(e,e.boards,{maxZIndex:t.zIndex}));case"UPDATE_BOARD_SIZE":return rt(e,ot(e,e.boards,Object(et.a)({},t.direction,t.size)));case"SHOW_BOARD":return Object(g.a)(Object(g.a)({},e),{},{currentBoardId:t.id,showBoard:!0});case"HIDE_BOARD":return Object(g.a)(Object(g.a)({},e),{},{currentBoardId:"",showBoard:!1});case"DELETE_BOARD":var a=Object(g.a)({},e.boards);return delete a[t.id],rt(e,a);default:return ct(e,t)}},ut=n(40),dt=Object(ut.b)({page:$e,board:it}),st=Object(ut.c)(dt,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());u.a.render(Object(r.jsx)(s.a,{store:st,children:Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(Ze,{})})}),document.getElementById("root")),Ke()},24:function(e){e.exports=JSON.parse('{"basic":[{"name":"white","color":"#FFFFFF"},{"name":"silver","color":"#C0C0C0"},{"name":"gray","color":"#808080"},{"name":"black","color":"#000000"},{"name":"red","color":"#FF0000"},{"name":"maroon","color":"#800000"},{"name":"yellow","color":"#FFFF00"},{"name":"olive","color":"#808000"},{"name":"lime","color":"#00FF00"},{"name":"green","color":"#008000"},{"name":"aqua","color":"#00FFFF"},{"name":"teal","color":"#008080"},{"name":"blue","color":"#0000FF"},{"name":"navy","color":"#000080"},{"name":"fuchsia","color":"#FF00FF"},{"name":"purple","color":"#800080"}]}')},25:function(e,t,n){e.exports={MenuToggle:"MenuContainer_MenuToggle__8D7uP",expanded:"MenuContainer_expanded__32-Br",collapsed:"MenuContainer_collapsed__2SHcZ",MenuContainer:"MenuContainer_MenuContainer__2Y2IC",MenuButtonContainer:"MenuContainer_MenuButtonContainer__2kwCO",active:"MenuContainer_active__qGZgx"}},31:function(e,t,n){e.exports={MenuItem:"MenuItem_MenuItem__1pw6P",MenuPageImage:"MenuItem_MenuPageImage__2JOSw",MenuBoardImage:"MenuItem_MenuBoardImage__2Bzdo",MenuItemButton:"MenuItem_MenuItemButton__3v7da",SubMenu:"MenuItem_SubMenu__1orS-"}},32:function(e,t,n){e.exports={NoteBoard:"NoteBoard_NoteBoard__3CFqR",AddButton:"NoteBoard_AddButton__fHatq",AddButtonArrowContainer:"NoteBoard_AddButtonArrowContainer__2P4jZ","arrow-move":"NoteBoard_arrow-move__WW3vD",AddButtonArrowBody:"NoteBoard_AddButtonArrowBody__tGEls",AddButtonArrow:"NoteBoard_AddButtonArrow__30w_A"}},33:function(e,t,n){e.exports={NoteMenu:"NoteMenu_NoteMenu__g5tSX",NoteSubMenu:"NoteMenu_NoteSubMenu__1BGB5",LockMenuItem:"NoteMenu_LockMenuItem__99Mr4",DeleteModal:"NoteMenu_DeleteModal__3drPo"}},41:function(e){e.exports=JSON.parse('{"sizes":[8,9,10,11,12,14,16,18,24,28,30,36,48,60,72,96]}')},53:function(e,t,n){e.exports={Menu:"Menu_Menu__1GXh2",btn:"Menu_btn__wbnRX"}},54:function(e,t,n){e.exports={PageEditorContainer:"PageContainer_PageEditorContainer__Ypac8",PageContainer:"PageContainer_PageContainer__15tHX",PageEditorButtonContainer:"PageContainer_PageEditorButtonContainer__1H76s"}},55:function(e,t,n){e.exports={NoteMenuItem:"NoteMenuItem_NoteMenuItem__22r3_",NoteSubMenuItem:"NoteMenuItem_NoteSubMenuItem__3nrUp",delete:"NoteMenuItem_delete__2Tzg6",disabled:"NoteMenuItem_disabled__3e5iK"}},68:function(e,t,n){e.exports={MainHeader:"Header_MainHeader__1dx0c",TitleContainer:"Header_TitleContainer__3bySe"}}},[[222,1,2]]]);
//# sourceMappingURL=main.ece2461e.chunk.js.map