/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */
CKEDITOR.editorConfig = function (config) {
    config.toolbarGroups = [
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        '/',
        { name: 'tools', groups: ['tools'] },
        { name: 'insertIcmsTmpl', groups: ['tools'] },
        { name: 'about', groups: ['about'] }
    ];

    config.removeButtons = 'Source,Save,Cut,Undo,Find,SelectAll,Scayt,Form,Bold,CopyFormatting,NumberedList,Outdent,Blockquote,JustifyLeft,BidiLtr,Link,Image,Styles,TextColor,Maximize,About,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Timestamp,Unlink,Anchor,Language,BidiRtl,JustifyCenter,JustifyRight,CreateDiv,JustifyBlock,Indent,BulletedList,RemoveFormat,Italic,Underline,Strike,Subscript,Superscript,Replace,Redo,Copy,Paste,PasteText,PasteFromWord,Print,Preview,NewPage';

	// Define changes to default configuration here. For example:
	 config.language = 'fa';
	// config.uiColor = '#AADC6E';
     config.extraPlugins = 'IcmsTmpl';
};
