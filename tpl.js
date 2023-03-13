CKEDITOR.addTemplates("icms", {
    imagesPath: CKEDITOR.getUrl(CKEDITOR.plugins.getPath("templates") + "templates/images/"),
    templates: [{
        id: 1,
        title: "عنوان قالب",
        image: "template1.gif",
        description: "One main image with a title and text that surround the image."
    }, {
        id: 2,
        title: "Strange Template",
        image: "template2.gif",
        description: "A template that defines two columns, each one with a title, and some text."
    }, {
        id: 3,
        title: "Text and Table",
        image: "template3.gif",
        description: "A title with some text and a table."
    }]
});