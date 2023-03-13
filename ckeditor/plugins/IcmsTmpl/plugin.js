CKEDITOR.plugins.add('IcmsTmpl', {
    icons: 'IcmsTmpl',
    init: function (editor) {

        editor.addCommand('insertIcmsTmpl', new CKEDITOR.dialogCommand('IcmsTmplDialog'));
        CKEDITOR.dialog.add('IcmsTmplDialog', this.path + 'dialogs/IcmsTmpl.js');
        editor.ui.addButton('IcmsTmpl', {
            label: 'Insert IcmsTmpl',
            command: 'insertIcmsTmpl',
            toolbar: 'insertIcmsTmpl'
        });
    }
});