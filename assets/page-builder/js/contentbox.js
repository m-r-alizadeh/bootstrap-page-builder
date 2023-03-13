(function (jQuery) {
    var $activeSection;
    var $activeBox;
    var $scriptpath ='assets/page-builder/';
    jQuery.contentbox = function (element, options) {
        var defaults = {
            snippetFile: '',
            snippetOpen: false,
            imageselect: '',
            fileselect: '',
            onRender: function () { },
            onDrop: function () { },
            onCoverImageSelectClick: null,
            onImageBrowseClick: function () { },
            onImageSettingClick: function () { },
            onImageSelectClick: function () { },
            onFileSelectClick: function () { },
            snippetPathReplace: ['', ''],
            coverImageHandler: '',
            largerImageHandler: '',
            customval: '',
            onAddSectionOpen: function () { },
            contentHtmlStart: '<div class="is-container is-builder container"><div class="row clearfix"><div class="column full">',
            contentHtmlEnd: '</div></div></div>',
            enableModule: false,
            enableAnimation: true,
            iconselect: 'assets/page-builder/icons.html',
            colors: ["#ffffc5", "#e9d4a7", "#ffd5d5", "#ffd4df", "#c5efff", "#b4fdff", "#c6f5c6", "#fcd1fe", "#ececec", "#f7e97a", "#d09f5e", "#ff8d8d", "#ff80aa", "#63d3ff", "#7eeaed", "#94dd95", "#ef97f3", "#d4d4d4", "#fed229", "#cc7f18", "#ff0e0e", "#fa4273", "#00b8ff", "#0edce2", "#35d037", "#d24fd7", "#888888", "#ff9c26", "#955705", "#c31313", "#f51f58", "#1b83df", "#0bbfc5", "#1aa71b", "#ae19b4", "#333333"],
            snippetCategories: [
                [0, "فیلتر قالب ها"],
                [-1, "همه"],
                [1, "عنوان"],
                [2, "عنوان, زیرنویس"],
                [3, "اطلاعات, عنوان"],
                [4, "اطلاعات, عنوان, زیرنویس"],
                [5, "عنوانبندی, بند"],
                [6, "بند"],
                [7, "بند, تصویر + متن"],
                [8, "عنوانبندی, بند, تصویر + متن"],
                [33, "دکمه"],
                [34, "کارت"],
                [9, "تصویر + متن"],
                [10, "تصویر + متن طولانی"],
                [11, "تصاویر"],
                [12, "تصویر"],
                [13, "فراخوانی"],
                [14, "لیست"],
                [15, "نقل قول"],
                [16, "مشخصات"],
                [17, "نقشه"],
                [20, "ویدئو"],
                [18, "اجتماعی"],
                [21, "خدمات"],
                [22, "اطلاعات تماس"],
                [23, "قیمت"],
                [24, "مشخصات تیم"],
                [25, "محصولات / نمونه کارها"],
                [26, "نحوه کار"],
                [27, "همکاران / مشتریان"],
                [28, "برجسته"],
                [29, "دستاوردها"],
                [32, "مهارت ها"],
                [30, "به زودی"],
                [31, "صفحه یافت نشد"],
                [19, "جداکننده"]
            ],
            toolbar: 'left',
            photoselect: '',
            customTags: [],
            onColorChanged: function () { }
        };
        this.settings = {};
        var $element = jQuery(element),element = element;
        this.init = function () {
            this.settings = jQuery.extend({}, defaults, options);
            var oScripts = document.getElementsByTagName("script");
            if (jQuery("#divSections").length == 0) {
                var s = '<div id="divSections" style="display:none"></div>' + '' + '<div class="md-modal" id="md-addsection" style="display:none">' +
                    '<div class="md-content">' + '<div class="md-body">' + '<div class="section-list"></div>' + '</div>' + '</div>' + '</div>' + '' +
                    '<div class="md-modal" id="md-delsectionconfirm">' + '<div class="md-content">' + '<div class="md-body">' + '<div style="padding:20px 20px 25px;text-align:center;">' +
                    '<p>آیا از حذف این بخش مطمئن هستید؟</p>' +
                    '<button class="cl-button cl-button-primary uppercase" id="btnDelSectionOk" style="margin-left:12px"> تایید </button>' +
                    '<button class="cl-button uppercase" id="btnDelSectionCancel"> لغو </button>' +
                    '</div>' + '</div>' + '</div>' + '</div>' + '' +
                    '<div class="md-modal md-draggable" id="md-editsection" style="display:none">' + '<div class="md-content">' + '<div class="md-body" style="padding:0 30px 30px">' +
                    '<div class="md-modal-handle" style="padding:30px 30px 0">' + '<div class="md-title" style="margin:0 0 12px;">تنظیمات بخش</div>' + '</div>' + '<div class="clearfix">' +
                    '<div class="is-boxes">' + '<div class="is-box-12">' + '<div style="text-align:center;font-size:16px">' + 'انتقال بخش' + '</div>' + '</div>' + '</div>' +
                    '<div class="is-boxes">' + '<div class="is-box-3">' + '<button class="cl-button cl-button-full cmd-section-top">بالاترین</button>' + '</div>' + '<div class="is-box-3">' +
                    '<button class="cl-button cl-button-full cmd-section-up">بالا</button>' + '</div>' + '<div class="is-box-3">' +
                    '<button class="cl-button cl-button-full cmd-section-down">پایین</button>' + '</div>' + '<div class="is-box-3">' +
                    '<button class="cl-button cl-button-full cmd-section-bottom">پایین ترین</button>' + '</div>' + '</div>' + '<div class="is-boxes"">' +
                    '<div class="is-box-12">' + '<div style="text-align:center;font-size:16px">' + 'ارتفاع' + '</div>' + '</div>' + '</div>' + '<div class="is-boxes">' + '<div class="is-box-3">' +
                    '<button class="cl-button cl-button-full cmd-section-height" data-value="0">خودکار</button>' + '</div>' + '<div class="is-box-3">' +
                    '<button class="cl-button cl-button-full cmd-section-height" data-value="20">20%</button>' + '</div>' + '<div class="is-box-3">' +
                    '<button class="cl-button cl-button-full cmd-section-height" data-value="30">30%</button>' + '</div>' + '<div class="is-box-3">' +
                    '<button class="cl-button cl-button-full cmd-section-height" data-value="40">40%</button>' + '</div>' + '</div>' + '<div class="is-boxes">' +
                    '<div class="is-box-3">' + '<button class="cl-button cl-button-full cmd-section-height" data-value="50">50%</button>' + '</div>' + '<div class="is-box-3">' +
                    '<button class="cl-button cl-button-full cmd-section-height" data-value="60">60%</button>' + '</div>' + '<div class="is-box-3">' +
                    '<button class="cl-button cl-button-full cmd-section-height" data-value="75">75%</button>' + '</div>' + '<div class="is-box-3">' +
                    '<button class="cl-button cl-button-full cmd-section-height" data-value="100">100%</button>' + '</div>' + '</div>' + '<div class="is-boxes">' + '<div class="is-box-6">' +
                    '<div style="text-align:center;margin-top: 20px;">' + '<label for="chkScrollIcon" style="margin:0;"><input id="chkScrollIcon" type="checkbox" /> حرکت آیکون</label>' + '</div>' +
                    '</div>' + '<div class="is-box-3">' + '<button class="cl-button cl-button-full cmd-section-scroll" data-value="light">روشن</button>' + '</div>' + '<div class="is-box-3">' +
                    '<button class="cl-button cl-button-full cmd-section-scroll" data-value="dark">تیره</button>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '' +
                    '<div class="md-modal md-draggable" id="md-customcolor" style="display:none;cursor:move">' +
                    '<div class="md-content">' + '<div class="md-body" style="padding:0">' +
                    '<div class="md-modal-handle" style="padding:0">' + '<div style="margin:0;font-size:15px;line-height:22px;text-align:center;"><i class="cb-icon-dot"></i></div>' + '</div>' +
                    '<input id="md-color-target" type="hidden" value="" />' + '<input class="ltr" style="width: 98%;" type="text" id="inpSectColor" value="rgb(0, 0, 0)"/>' +
                    '<div class="clearfix" style="overflow-y:auto;overflow-x:hidden;height:auto;max-height:575px;">' + '<div class="is-boxes is-colorbuttons">' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FFEBEE" style="background:#FFEBEE"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FFCDD2" style="background:#FFCDD2"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#EF9A9A" style="background:#EF9A9A"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#E57373" style="background:#E57373"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#EF5350" style="background:#EF5350"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#F44336" style="background:#F44336"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#E53935" style="background:#E53935"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#D32F2F" style="background:#D32F2F"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#C62828" style="background:#C62828"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#B71C1C" style="background:#B71C1C"></button></div>' + '</div>' +
                    '<div class="is-boxes is-colorbuttons">' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FCE4EC" style="background:#FCE4EC"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#F8BBD0" style="background:#F8BBD0"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#F48FB1" style="background:#F48FB1"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#F06292" style="background:#F06292"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#EC407A" style="background:#EC407A"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#E91E63" style="background:#E91E63"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#D81B60" style="background:#D81B60"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#C2185B" style="background:#C2185B"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#AD1457" style="background:#AD1457"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#880E4F" style="background:#880E4F"></button></div>' + '</div>' +
                    '<div class="is-boxes is-colorbuttons">' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#F3E5F5" style="background:#F3E5F5"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#E1BEE7" style="background:#E1BEE7"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#CE93D8" style="background:#CE93D8"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#BA68C8" style="background:#BA68C8"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#AB47BC" style="background:#AB47BC"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#9C27B0" style="background:#9C27B0"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#8E24AA" style="background:#8E24AA"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#7B1FA2" style="background:#7B1FA2"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#6A1B9A" style="background:#6A1B9A"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#4A148C" style="background:#4A148C"></button></div>' + '</div>' +
                    '<div class="is-boxes is-colorbuttons">' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#EDE7F6" style="background:#EDE7F6"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#D1C4E9" style="background:#D1C4E9"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#B39DDB" style="background:#B39DDB"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#9575CD" style="background:#9575CD"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#7E57C2" style="background:#7E57C2"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#673AB7" style="background:#673AB7"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#5E35B1" style="background:#5E35B1"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#512DA8" style="background:#512DA8"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#4527A0" style="background:#4527A0"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#311B92" style="background:#311B92"></button></div>' + '</div>' +
                    '<div class="is-boxes is-colorbuttons">' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#E8EAF6" style="background:#E8EAF6"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#C5CAE9" style="background:#C5CAE9"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#9FA8DA" style="background:#9FA8DA"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#7986CB" style="background:#7986CB"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#5C6BC0" style="background:#5C6BC0"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#3F51B5" style="background:#3F51B5"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#3949AB" style="background:#3949AB"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#303F9F" style="background:#303F9F"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#283593" style="background:#283593"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#1A237E" style="background:#1A237E"></button></div>' +
                    '</div>' + '<div class="is-boxes is-colorbuttons">' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#E3F2FD" style="background:#E3F2FD"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#BBDEFB" style="background:#BBDEFB"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#90CAF9" style="background:#90CAF9"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#64B5F6" style="background:#64B5F6"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#42A5F5" style="background:#42A5F5"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#2196F3" style="background:#2196F3"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#1E88E5" style="background:#1E88E5"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#1976D2" style="background:#1976D2"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#1565C0" style="background:#1565C0"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#0D47A1" style="background:#0D47A1"></button></div>' + '</div>' +
                    '<div class="is-boxes is-colorbuttons">' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#E1F5FE" style="background:#E1F5FE"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#B3E5FC" style="background:#B3E5FC"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#81D4FA" style="background:#81D4FA"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#4FC3F7" style="background:#4FC3F7"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#29B6F6" style="background:#29B6F6"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#03A9F4" style="background:#03A9F4"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#039BE5" style="background:#039BE5"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#0288D1" style="background:#0288D1"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#0277BD" style="background:#0277BD"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#01579B" style="background:#01579B"></button></div>' + '</div>' +
                    '<div class="is-boxes is-colorbuttons">' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#E0F7FA" style="background:#E0F7FA"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#B2EBF2" style="background:#B2EBF2"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#80DEEA" style="background:#80DEEA"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#4DD0E1" style="background:#4DD0E1"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#26C6DA" style="background:#26C6DA"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#00BCD4" style="background:#00BCD4"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#00ACC1" style="background:#00ACC1"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#0097A7" style="background:#0097A7"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#00838F" style="background:#00838F"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#006064" style="background:#006064"></button></div>' + '</div>' +
                    '<div class="is-boxes is-colorbuttons">' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#E0F2F1" style="background:#E0F2F1"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#B2DFDB" style="background:#B2DFDB"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#80CBC4" style="background:#80CBC4"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#4DB6AC" style="background:#4DB6AC"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#26A69A" style="background:#26A69A"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#009688" style="background:#009688"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#00897B" style="background:#00897B"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#00796B" style="background:#00796B"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#00695C" style="background:#00695C"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#004D40" style="background:#004D40"></button></div>' + '</div>' +
                    '<div class="is-boxes is-colorbuttons">' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#E8F5E9" style="background:#E8F5E9"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#C8E6C9" style="background:#C8E6C9"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#A5D6A7" style="background:#A5D6A7"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#81C784" style="background:#81C784"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#66BB6A" style="background:#66BB6A"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#4CAF50" style="background:#4CAF50"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#43A047" style="background:#43A047"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#388E3C" style="background:#388E3C"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#2E7D32" style="background:#2E7D32"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#1B5E20" style="background:#1B5E20"></button></div>' + '</div>' +
                    '<div class="is-boxes is-colorbuttons">' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#F1F8E9" style="background:#F1F8E9"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#DCEDC8" style="background:#DCEDC8"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#C5E1A5" style="background:#C5E1A5"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#AED581" style="background:#AED581"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#9CCC65" style="background:#9CCC65"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#8BC34A" style="background:#8BC34A"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#7CB342" style="background:#7CB342"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#689F38" style="background:#689F38"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#558B2F" style="background:#558B2F"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#33691E" style="background:#33691E"></button></div>' + '</div>' +
                    '<div class="is-boxes is-colorbuttons">' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#F9FBE7" style="background:#F9FBE7"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#F0F4C3" style="background:#F0F4C3"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#E6EE9C" style="background:#E6EE9C"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#DCE775" style="background:#DCE775"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#D4E157" style="background:#D4E157"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#CDDC39" style="background:#CDDC39"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#C0CA33" style="background:#C0CA33"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#AFB42B" style="background:#AFB42B"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#9E9D24" style="background:#9E9D24"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#827717" style="background:#827717"></button></div>' + '</div>' +
                    '<div class="is-boxes is-colorbuttons">' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FFFDE7" style="background:#FFFDE7"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FFF9C4" style="background:#FFF9C4"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FFF59D" style="background:#FFF59D"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FFF176" style="background:#FFF176"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FFEE58" style="background:#FFEE58"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FFEB3B" style="background:#FFEB3B"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FDD835" style="background:#FDD835"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FBC02D" style="background:#FBC02D"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#F9A825" style="background:#F9A825"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#F57F17" style="background:#F57F17"></button></div>' + '</div>' +
                    '<div class="is-boxes is-colorbuttons">' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FFF8E1" style="background:#FFF8E1"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FFECB3" style="background:#FFECB3"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FFE082" style="background:#FFE082"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FFD54F" style="background:#FFD54F"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FFCA28" style="background:#FFCA28"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FFC107" style="background:#FFC107"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FFB300" style="background:#FFB300"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FFA000" style="background:#FFA000"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FF8F00" style="background:#FF8F00"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FF6F00" style="background:#FF6F00"></button></div>' +
                    '</div>' + '<div class="is-boxes is-colorbuttons">' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FFF3E0" style="background:#FFF3E0"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FFE0B2" style="background:#FFE0B2"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FFCC80" style="background:#FFCC80"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FFB74D" style="background:#FFB74D"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FFA726" style="background:#FFA726"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FF9800" style="background:#FF9800"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FB8C00" style="background:#FB8C00"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#F57C00" style="background:#F57C00"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#EF6C00" style="background:#EF6C00"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#E65100" style="background:#E65100"></button></div>' + '</div>' + '<div class="is-boxes is-colorbuttons">' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FBE9E7" style="background:#FBE9E7"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FFCCBC" style="background:#FFCCBC"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FFAB91" style="background:#FFAB91"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FF8A65" style="background:#FF8A65"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FF7043" style="background:#FF7043"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FF5722" style="background:#FF5722"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#F4511E" style="background:#F4511E"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#E64A19" style="background:#E64A19"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#D84315" style="background:#D84315"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#BF360C" style="background:#BF360C"></button></div>' + '</div>' +
                    '<div class="is-boxes is-colorbuttons">' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#EFEBE9" style="background:#EFEBE9"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#D7CCC8" style="background:#D7CCC8"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#BCAAA4" style="background:#BCAAA4"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#A1887F" style="background:#A1887F"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#8D6E63" style="background:#8D6E63"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#795548" style="background:#795548"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#6D4C41" style="background:#6D4C41"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#5D4037" style="background:#5D4037"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#4E342E" style="background:#4E342E"></button></div>' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#3E2723" style="background:#3E2723"></button></div>' + '</div>' +
                    '<div class="is-boxes is-colorbuttons">' +
                    '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#ECEFF1" style="background:#ECEFF1"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#CFD8DC" style="background:#CFD8DC"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#B0BEC5" style="background:#B0BEC5"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#90A4AE" style="background:#90A4AE"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#78909C" style="background:#78909C"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#607D8B" style="background:#607D8B"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#546E7A" style="background:#546E7A"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#455A64" style="background:#455A64"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#37474F" style="background:#37474F"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#263238" style="background:#263238"></button></div>' + '</div>' + '<div class="is-boxes is-colorbuttons">' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#FAFAFA" style="background:#FAFAFA"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#F5F5F5" style="background:#F5F5F5"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#EEEEEE" style="background:#EEEEEE"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#E0E0E0" style="background:#E0E0E0"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#BDBDBD" style="background:#BDBDBD"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#9E9E9E" style="background:#9E9E9E"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#757575" style="background:#757575"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#616161" style="background:#616161"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#424242" style="background:#424242"></button></div>' + '<div class="is-box-1"><button class="cl-button cl-button-large cmd-box-customcolor" data-value="#212121" style="background:#212121"></button></div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '' + '<div class="md-modal md-draggable" id="md-editbox" style="display:none">' + '<div class="md-content">' + '<div class="md-body" style="padding:0 30px 30px">' + '<div class="md-modal-handle" style="padding:30px 30px 0">' +
                    '<div class="md-title" style="margin:0 0 12px;">تنظیمات بخش</div>' + '</div>' +
                    '<div class="is-tab-links" style="padding:19px 0 0;text-align:center;">' +
                    '<a id="tab-editbox-1" class="cl-tab active" data-tab-content="tab-content-editbox-1" href="#">اندازه باکس</a> ' +
                    '<a id="tab-editbox-2" class="cl-tab" data-tab-content="tab-content-editbox-2" href="#">زمینه</a> ' +
                    '<a id="tab-editbox-3" class="cl-tab" data-tab-content="tab-content-editbox-3" href="#">استایل </a> ' +
                    '<a id="tab-editbox-4" class="cl-tab" data-tab-content="tab-content-editbox-4" href="#" style="white-space:nowrap">اندازه </a> ' +
                    '<a id="tab-editbox-5" class="cl-tab" data-tab-content="tab-content-editbox-5" href="#" style="white-space:nowrap">موقعیت </a> ' +
                    '<a id="tab-editbox-6" class="cl-tab" data-tab-content="tab-content-editbox-6" href="#">تصویر</a> ' +
                    '<a id="tab-editbox-7" class="cl-tab" data-tab-content="tab-content-editbox-7" href="#">ماژول</a> ' +
                    '<a id="tab-editbox-8" class="cl-tab" data-tab-content="tab-content-editbox-8" href="#">انیمیشن</a> ' +
                    '<a id="tab-editbox-9" class="cl-tab" data-tab-content="tab-content-editbox-9" href="#" style="display:none">HTML</a> ' + '</div>' +
                    '<div class="is-tab-contents" style="margin-top:30px">' + '<div id="tab-content-editbox-1" class="clearfix">' + '<div class="is-boxes">' +
                    '<div class="is-box-6">' + '<button class="cl-button cl-button-full cmd-box-smaller" style="font-size:22px;">-</button>' + '</div>' +
                    '<div class="is-box-6">' + '<button class="cl-button cl-button-full cmd-box-larger" style="font-size:22px;">+</button>' + '</div>' + '</div>' + '</div>' +
                    '<div id="tab-content-editbox-2" class="clearfix">' + '<div class="is-boxes">' + '<div class="is-box-2">' +
                    '<button class="cl-button cl-button-full cmd-box-bgcolor" data-value="">پیش فرض</button>' + '</div>' + '<div class="is-box-2">' +
                    '<button class="cl-button cl-button-full cmd-box-bgcolor" data-value="light">روشن</button>' + '</div>' + '<div class="is-box-2">' +
                    '<button class="cl-button cl-button-full cmd-box-bgcolor" data-value="grey">طوسی</button>' + '</div>' + '<div class="is-box-2">' +
                    '<button class="cl-button cl-button-full cmd-box-bgcolor" data-value="dark">تیره</button>' + '</div>' + '<div class="is-box-2">' +
                    '<button class="cl-button cl-button-full cmd-box-pickbgcolor" data-value="dark"><i class="cb-icon-color"></i></button>' + '</div>' +
                    '<div class="is-box-2" id="divBoxPickPhoto">' + '<button class="cl-button cl-button-full cmd-box-pickphoto" data-value=""><i class="cb-icon-picture"></i></button>' +
                    '</div>' + '</div>' + '</div>' + '<div id="tab-content-editbox-3" class="clearfix">' + '<div class="is-boxes">' + '<div class="is-box-6">' +
                    '<button class="cl-button cl-button-full cmd-box-textcolor" data-value="light">روشن</button>' + '</div>' + '<div class="is-box-6">' +
                    '<button class="cl-button cl-button-full cmd-box-textcolor" data-value="dark">تیره</button>' + '</div>' + '</div>' + '<div class="is-boxes">' + '<div class="is-box-4">' +
                    '<button class="cl-button cl-button-full cmd-box-textalign" data-value="right"><i class="cb-icon-align-right"></i></button>' + '</div>' + '<div class="is-box-4">' +
                    '<button class="cl-button cl-button-full cmd-box-textalign" data-value="center"><i class="cb-icon-align-center"></i></button>' + '</div>' +
                    '<div class="is-box-4">' + '<button class="cl-button cl-button-full cmd-box-textalign" data-value="left"><i class="cb-icon-align-left"></i></button>' + '</div>' + '</div>' +
                    '<div class="is-boxes">' + '<div class="is-box-12">' + '<div style="text-align:center">' + 'شفافیت' + '<br />' + '</div>' + '</div>' + '</div>' + '<div class="is-boxes">' +
                    '<div class="is-box-4">' + '<button class="cl-button cl-button-full cmd-box-textopacity" data-value="+" style="font-size:22px;"> + </button>' + '</div>' + '<div class="is-box-4">' +
                    '<button class="cl-button cl-button-full cmd-box-textopacity" data-value="-" style="font-size:22px;"> - </button>' + '</div>' +
                    '<div class="is-box-4">' +
                    '<button class="cl-button cl-button-full cmd-box-textopacity" data-value="">پیش فرض</button>' + '</div>' + '</div>' + '</div>' +
                    '<div id="tab-content-editbox-4" class="clearfix">' +
                    '<div class="is-boxes">' + '<div class="is-box-3">' +
                    '<button class="cl-button cl-button-full cmd-box-size" data-value="380">380px</button>' + '</div>' +
                    '<div class="is-box-3">' +
                    '<button class="cl-button cl-button-full cmd-box-size" data-value="500">500px</button>' + '</div>' + '<div class="is-box-3">' +
                    '<button class="cl-button cl-button-full cmd-box-size" data-value="640">640px</button>' + '</div>' + '<div class="is-box-3">' +
                    '<button class="cl-button cl-button-full cmd-box-size" data-value="800">800px</button>' + '</div>' + '</div>' + '<div class="is-boxes">' + '<div class="is-box-3">' + '<button class="cl-button cl-button-full cmd-box-size" data-value="980">980px</button>' + '</div>' + '<div class="is-box-3">' + '<button class="cl-button cl-button-full cmd-box-size" data-value="1050">1050px</button>' + '</div>' + '<div class="is-box-3">' + '<button class="cl-button cl-button-full cmd-box-size" data-value="1100">1100px</button>' + '</div>' + '<div class="is-box-3">' + '<button class="cl-button cl-button-full cmd-box-size" data-value="1200">1200px</button>' + '</div>' + '</div>' + '</div>' +

                    '<div id="tab-content-editbox-5" class="clearfix">' + '<div class="is-boxes">' +
                    '<div class="is-box-4">' + '<button class="cl-button cl-button-full cmd-box-content-pos" data-value="topright">&#8599;</button>' + '</div>' +
                     '<div class="is-box-4">' + '<button class="cl-button cl-button-full cmd-box-content-pos" data-value="topcenter">&#8593;</button>' + '</div>' +
                   '<div class="is-box-4">' + '<button class="cl-button cl-button-full cmd-box-content-pos" data-value="topleft">&#8598;</button>' + '</div>' +
                    '</div>' +
                    '<div class="is-boxes">' +
                    '<div class="is-box-4">' + '<button class="cl-button cl-button-full cmd-box-content-pos" data-value="middleright">&#8594;</button>' + '</div>' +
                    '<div class="is-box-4">' + '<button class="cl-button cl-button-full cmd-box-content-pos" data-value="middlecenter">&#9737;</button>' + '</div>' +
                    '<div class="is-box-4">' + '<button class="cl-button cl-button-full cmd-box-content-pos" data-value="middleleft">&#8592;</button>' + '</div>' +
                    '</div>' +
                    '<div class="is-boxes">' +
                    '<div class="is-box-4">' + '<button class="cl-button cl-button-full cmd-box-content-pos" data-value="bottomright">&#8600;</button>' + '</div>' +
                    '<div class="is-box-4">' + '<button class="cl-button cl-button-full cmd-box-content-pos" data-value="bottomcenter">&#8595;</button>' + '</div>' +
                    '<div class="is-box-4">' + '<button class="cl-button cl-button-full cmd-box-content-pos" data-value="bottomleft">&#8601;</button>' + '</div>' +
                    '</div>' +
                    '<div class="is-boxes">' +
                    '<div class="is-box-12">' + '<div style="text-align:center">' + 'فاصله لبه' + '<br />' + '</div>' + '</div>' + '</div>' + '<div class="is-boxes">' +
                    '<div class="is-box-2">' + 'بالا / پایین:' + '</div>' + '<div class="is-box-4">' +
                    '<button class="cl-button cl-button-full cmd-box-content-edge-y" data-value="-">-</button>' + '</div>' +
                    '<div class="is-box-4">' + '<button class="cl-button cl-button-full cmd-box-content-edge-y" data-value="+">+</button>' +
                    '</div>' + '<div class="is-box-2">' + '<button class="cl-button cl-button-full cmd-box-content-edge-y" data-value="">پیش فرض</button>' +
                    '</div>' + '</div>' + '<div class="is-boxes">' + '<div class="is-box-2">' + 'چپ / راست:' + '</div>' + '<div class="is-box-4">' +
                    '<button class="cl-button cl-button-full cmd-box-content-edge-x" data-value="-">-</button>' + '</div>' + '<div class="is-box-4">' +
                    '<button class="cl-button cl-button-full cmd-box-content-edge-x" data-value="+">+</button>' + '</div>' + '<div class="is-box-2">' +
                    '<button class="cl-button cl-button-full cmd-box-content-edge-x" data-value="">پیش فرض</button>' + '</div>' + '</div>' + '</div>' +
                    '<div id="tab-content-editbox-6" class="clearfix">' + '<div class="is-boxes">' +
                    (this.settings.onCoverImageSelectClick != null ? '<div class="is-box-6">' + '<div style="text-align:center">' +
                    '<button class="cl-button cl-button-full cmd-box-selectasset">انتخاب تصویر</button>' + '<br />' + '</div>' + '</div>' +
                    '<div class="is-box-6">' + '<div style="text-align:center">' +
                    '<label for="chkAnimateBg" style="margin:0;"><input id="chkAnimateBg" type="checkbox" />افکت Ken Burns </label>' +
                    '<br />' + '</div>' + '</div>' :
                        '<div class="is-box-12">' + '<div style="text-align:center">' +
                        '<label for="chkAnimateBg" style="margin:0;"><input id="chkAnimateBg" type="checkbox" />افکت Ken Burns</label>' + '<br />' + '</div>' + '</div>') + '</div>' +
                    '<div class="is-boxes">' + '<div class="is-box-12">' + '<div style="text-align:center">' + 'رنگ پوششی' + '<br />' + '</div>' + '</div>' + '</div>' +
                    '<div class="is-boxes">' + '<div class="is-box-3">' + '<button class="cl-button cl-button-full cmd-box-overlaycolor" data-value="#ffffff">سفید</button>' +
                    '</div>' + '<div class="is-box-3">' + '<button class="cl-button cl-button-full cmd-box-overlaycolor" data-value="#000000">سیاه</button>' + '</div>' + '<div class="is-box-3">' +
                    '<button class="cl-button cl-button-full cmd-box-pickoverlaycolor"><i class="cb-icon-color"></i></button>' + '</div>' + '<div class="is-box-3">' +
                    '<button class="cl-button cl-button-full cmd-box-overlaycolor" data-value="">پیش فرض</button>' + '</div>' + '</div>' + '<div class="is-boxes">' +
                    '<div class="is-box-12">' + '<div style="text-align:center">' + 'شفافیت پوشش' + '<br />' + '</div>' + '</div>' + '</div>' + '<div class="is-boxes">' +
                    '<div class="is-box-4">' + '<button class="cl-button cl-button-full cmd-box-overlay" data-value="+" style="font-size:22px">+</button>' + '</div>' +
                    '<div class="is-box-4">' + '<button class="cl-button cl-button-full cmd-box-overlay" data-value="-" style="font-size:22px">-</button>' + '</div>' +
                    '<div class="is-box-4">' + '<button class="cl-button cl-button-full cmd-box-overlay" data-value="0">بدون پوشش</button>' + '</div>' + '</div>' + '</div>' +
                    '<div id="tab-content-editbox-7" class="clearfix">' + '<div class="is-boxes">' + '<div class="is-box-12">' + '<div style="text-align:center">' +
                    '<label for="chkBgModule" style="margin:0;"><input id="chkBgModule" type="checkbox" /> جایگاه ماژول</label>' + '</div>' + '</div>' + '</div>' +
                    '</div>' + '<div id="tab-content-editbox-8" class="clearfix">' + '<div class="is-boxes">' + '<div class="is-box-12">' + '<div style="text-align:center">' +
                    '<select class="cmd-box-animate" style="margin-right:12px">' +
                    '<option value="">بدون انیمیشن</option>' +
                    '<option value="is-pulse">نبض</option>' +
                    '<option value="is-bounceIn">پرش</option>' +
                    '<option value="is-fadeIn">محو</option>' +
                    '<option value="is-fadeInDown">محو از پایین</option>' +
                    '<option value="is-fadeInLeft">محو از چپ</option>' +
                    '<option value="is-fadeInRight">محو از راست</option>' +
                    '<option value="is-fadeInUp">محو از بالا</option>' +
                    '<option value="is-flipInX">چرخش افقی</option>' +
                    '<option value="is-flipInY">چرخش عمودی</option>' +
                    '<option value="is-slideInUp">اسلاید از بالا</option>' +
                    '<option value="is-slideInDown">اسلاید از پایین</option>' +
                    '<option value="is-slideInLeft">اسلاید از چپ</option>' +
                    '<option value="is-slideInRight">اسلاید از راست</option>' +
                    '<option value="is-zoomIn">بزرگنمایی</option>' +
                    '</select>' +
                    '<button class="cl-button cmd-box-animate-test">امتحان</button>' +
                    '<label for="chkAnimOnce" style="margin:10px 0 0;"><input id="chkAnimOnce" type="checkbox" /> یکبار</label>' + '</div>' + '</div>' + '</div>' + '</div>' +
                    '<div id="tab-content-editbox-9" class="clearfix">' + '<div class="is-boxes">' + '<div class="is-box-12">' +
                    '<div style="text-align:center">' + '<textarea id="inpBoxHtml" style="width:100%;height:100%;min-height:200px;max-height:220px;border:#eee 1px solid;"></textarea>' +
                    '<button class="cl-button cl-button-full cmd-box-html">اعمال</button>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '' +
                    '<div class="md-modal md-draggable" id="md-icon-list" style="display:none">' + '<div class="md-content">' + '<div class="md-body">' + '<div class="md-modal-handle">' +
                    '<div style="margin:0;font-size:15px;line-height:22px;text-align:center;"><i class="cb-icon-dot"></i></div>' + '</div>' +
                    '<iframe id="ifrIconList" style="width:100%;height:500px;border:none;" src="' + $scriptpath + 'images/blank.gif"></iframe>' + '</div>' + '</div>' + '</div>' + '' +
                    '<div class="md-modal" id="md-view-html" style="display:none;">' + '<div class="md-content" style="height:100%">' + '<div class="md-body" style="height:100%">' +
                    '<textarea id="inpViewHtml" class="ltr" style="width:100%;height:100%;border-bottom:rgba(0,0,0,0) 50px solid;margin-bottom:-50px;"></textarea>' +
                    '<button class="cl-button cl-button-full cl-button-footer cmd-wrapper-html" style="position:absolute;width:100%;left:0;bottom:0">تایید</button>' + '</div>' + '</div>' +
                    '</div>' + '' + '<div class="md-modal md-draggable" id="md-pickphoto" style="display:none;">' + '<div class="md-content">' + '<div class="md-body">' +
                    '<div class="md-modal-handle">' + '<div style="margin:0;font-size:15px;line-height:22px;text-align:center;"><i class="cb-icon-dot"></i></div>' + '</div>' +
                    '<iframe id="ifrPhotoList" style="width:100%;height:580px;border:none;background:rgba(0,0,0,0.9);" src="' + $scriptpath + 'images/blank.gif"></iframe>' + '</div>' + '</div>' +
                    '</div>' + '';
                jQuery('body').append(s);
                jQuery('#inpSectColor').colorPicker({
                    renderCallback: function ($elm, toggled) {
                        if (toggled === true) { } else if (toggled === false) { } else {
                            $element.data("contentbox").boxCustomColor($elm.text);
                            $element.data('contentbox').settings.onColorChanged($elm.text)
                        }
                    }
                });
                jQuery('#inpSectColor').on('blur', function () {
                    $element.data("contentbox").boxCustomColor($('#inpSectColor').val())
                })
            };
            jQuery.get($scriptpath + 'sections.html', function (data) {
                var htmlData = '';
                var htmlThumbs = '';
                var i = 1;
                jQuery('<div/>').html(data).children('div').each(function () {
                    var block = jQuery(this).html();
                    var sfind = jQuery(this).attr('data-find');
                    var sreplace = jQuery(this).attr('data-replace');
                    var sfind2 = jQuery(this).attr('data-find2');
                    var sreplace2 = jQuery(this).attr('data-replace2');
                    var sfind3 = jQuery(this).attr('data-find2');
                    var sreplace3 = jQuery(this).attr('data-replace2');
                    var thumb = jQuery(this).attr('data-thumb');
                    if (sfind) {
                        block = block.replace('[%CONTAINER_START%]', $element.data("contentbox").settings.contentHtmlStart.replace(sfind, sreplace));
                        block = block.replace('[%CONTAINER_END%]', $element.data("contentbox").settings.contentHtmlEnd)
                    }
                    if (sfind2) {
                        block = block.replace('[%CONTAINER_START%]', $element.data("contentbox").settings.contentHtmlStart.replace(sfind2, sreplace2));
                        block = block.replace('[%CONTAINER_END%]', $element.data("contentbox").settings.contentHtmlEnd)
                    }
                    if (sfind3) {
                        block = block.replace('[%CONTAINER_START%]', $element.data("contentbox").settings.contentHtmlStart.replace(sfind3, sreplace3));
                        block = block.replace('[%CONTAINER_END%]', $element.data("contentbox").settings.contentHtmlEnd)
                    }
                    block = block.replace('[%CONTAINER_START%]', $element.data("contentbox").settings.contentHtmlStart);
                    block = block.replace('[%CONTAINER_END%]', $element.data("contentbox").settings.contentHtmlEnd);
                    block = block.replace(/\[%IMAGE_PATH%\]/g, $scriptpath + 'images/');
                    var blockEncoded = jQuery('<div/>').text(block).html();
                    if (!$element.data("contentbox").settings.enableModule) {
                        if (jQuery(this).find(".is-module").length == 0 && jQuery(this).find(".is-placeholder").length == 0) {
                            htmlData += '<div id="sect' + i + '">' + blockEncoded + '</div>';
                            htmlThumbs += '<div data-sect="' + i + '"><img src="' + $scriptpath + 'images/' + thumb + '"></div>'
                        } else { }
                    } else {
                        htmlData += '<div id="sect' + i + '">' + blockEncoded + '</div>';
                        htmlThumbs += '<div data-sect="' + i + '"><img src="' + $scriptpath + 'images/' + thumb + '"></div>'
                    }
                    i++
                });
                jQuery('.section-list').html(htmlThumbs);
                jQuery('#divSections').html(htmlData)
            });
            this.setup();
            if (jQuery("#divboxtool").length == 0) {
                var s = '<div id="divboxtool" style="display:none;z-index:1;position:absolute;box-sizing: border-box;width: 60px;line-height:30px;outline: none;text-align: center;cursor: pointer;overflow:hidden;">' +
                    '<form id="form-upload-cover" target="frame-upload-cover" method="post" action="' + this.settings.coverImageHandler + '" enctype="multipart/form-data" style="position:relative;width:30px;height: 30px;display:inline-block;float:left;background: rgb(90, 156, 38);">' +
                    '<i class="cb-icon-camera" style="position: relative;display: block;font-size: 16px;color:#fff;cursor:pointer;overflow: hidden;">' + '<input type="file" id="fileCover" name="fileCover" style="position:absolute;top:0;left:-10px;width:45px;height:65px;top:-20px;margin: 0;cursor: pointer;opacity: 0.01;display: inline-block;">' + '</i>' +
                    '<input id="hidcustomval" name="hidcustomval" type="hidden" value="" />' + '<iframe id="frame-upload-cover" name="frame-upload-cover" src="' + $scriptpath + 'images/blank.gif" style="width:1px;height:1px;position:absolute;top:0;right:-100000px"></iframe>' + '</form>' +
                    '<div id="lnkeditbox" style="display:inline-block;width:30px;height:30px;background: rgb(0, 172, 214);"><i class="cb-icon-wrench" style="display:block;font-size: 16px;color:#fff;"></i></div>' + '</div>';
                jQuery('body').append(s)
            }
            jQuery('#hidcustomval').val(this.settings.customval);
            jQuery(".is-tab-links").children().each(function () {
                jQuery(this).click(function () {
                    jQuery(".is-tab-links > a").removeClass("active");
                    jQuery(this).addClass("active");
                    var contentid = jQuery(this).attr("data-tab-content");
                    jQuery("#" + contentid).parent().children().each(function () {
                        jQuery(this).css("display", "none")
                    });
                    jQuery("#" + contentid).css("display", "table");
                    return false
                })
            })
        };
        this.setup = function () {
            var snippetFile = this.settings.snippetFile;
            var snippetOpen = this.settings.snippetOpen;
            var contentRender = this.contentRender;
            var iconselect = this.settings.iconselect;
            var customval = this.settings.customval;
            var largerImageHandler = this.settings.largerImageHandler;
            var snippetCategories = this.settings.snippetCategories;
            var imageselect = this.settings.imageselect;
            var fileselect = this.settings.fileselect;
            var onDrop = this.settings.onDrop;
            var onImageSelectClick = this.settings.onImageSelectClick;
            var onFileSelectClick = this.settings.onFileSelectClick;
            var onImageBrowseClick = this.settings.onImageBrowseClick;
            var onImageSettingClick = this.settings.onImageSettingClick;
            var snippetPathReplace = this.settings.snippetPathReplace;
            var colors = this.settings.colors;
            var imageEmbed = this.settings.imageEmbed;
            var snippetPageSliding = this.settings.snippetPageSliding;
            var scrollHelper = this.settings.scrollHelper;
            var sourceEditor = this.settings.sourceEditor;
            var toolbar = this.settings.toolbar;
            var customTags = this.settings.customTags;
            $element.children().each(function () {
                var $currentSection = jQuery(this);
                if ($currentSection.hasClass('is-static')) return;
                if ($currentSection.find('.is-boxes').length == 0 && !$currentSection.hasClass('is-stretch')) {
                    $currentSection.html('<div class="is-boxes"><div class="is-box-centered">' + $currentSection.html() + '</div></div>');
                    $currentSection.addClass('is-box')
                }
                $currentSection.find('.is-builder').each(function () {
                    if (!jQuery(this).attr('id')) {
                        jQuery(this).attr('id', 'contentarea' + makeid())
                    }
                    var cbid = $element.attr('id');
                    jQuery(this).contentbuilder({
                        toolbar: toolbar,
                        snippetFile: snippetFile,
                        snippetOpen: snippetOpen,
                        iconselect: iconselect,
                        onRender: contentRender,
                        customval: customval,
                        largerImageHandler: largerImageHandler,
                        snippetCategories: snippetCategories,
                        imageselect: imageselect,
                        fileselect: fileselect,
                        onDrop: onDrop,
                        onImageSelectClick: onImageSelectClick,
                        onFileSelectClick: onFileSelectClick,
                        onImageBrowseClick: onImageBrowseClick,
                        onImageSettingClick: onImageSettingClick,
                        snippetPathReplace: snippetPathReplace,
                        colors: colors,
                        imageEmbed: imageEmbed,
                        snippetPageSliding: snippetPageSliding,
                        scrollHelper: scrollHelper,
                        sourceEditor: sourceEditor,
                        customTags: customTags
                    })
                });
                $currentSection.append('<div class="is-section-tool">' + '<div class="is-section-edit"><i class="cb-icon-wrench"></i></div>' + '<div class="is-section-remove"><i class="cb-icon-cancel"></i></div>' + '</div>');
                $currentSection.find(".is-section-edit").click(function () {
                    $activeSection = jQuery(this).parent().parent();
                    $element.data("contentbox").editSection()
                });
                $currentSection.find(".is-section-remove").click(function () {
                    jQuery("#md-delsectionconfirm").css("max-width", "550px");
                    jQuery("#md-delsectionconfirm").simplemodal();
                    jQuery("#md-delsectionconfirm").data("simplemodal").show();
                    $activeSection = jQuery(this).parent().parent();
                    jQuery("#btnDelSectionOk").unbind("click");
                    jQuery("#btnDelSectionOk").bind("click", function (e) {
                        $activeSection.fadeOut(400, function () {
                            if ($activeSection.find(".is-builder").html()) $activeSection.find(".is-builder").data("contentbuilder").destroy();
                            $activeSection.remove();
                            jQuery("#md-delsectionconfirm").data("simplemodal").hide()
                        });
                        return false
                    });
                    jQuery("#btnDelSectionCancel").unbind("click");
                    jQuery("#btnDelSectionCancel").bind("click", function (e) {
                        jQuery("#md-delsectionconfirm").data("simplemodal").hide();
                        return false
                    })
                })
            });
            this.applyBoxBehavior()
        };
        this.loadHtml = function (html) {
            $element.children().each(function () {
                var $currentSection = jQuery(this);
                $currentSection.find('.is-builder').each(function () {
                    jQuery(this).data('contentbuilder').destroy()
                })
            });
            $element.html(html);
            this.setup()
        };
        this.addSection = function () {
            this.settings.onAddSectionOpen();
            jQuery('#md-addsection').css('max-width', '600px');
            jQuery('#md-addsection').simplemodal();
            jQuery('#md-addsection').data('simplemodal').show();
            jQuery('.section-list > div').click(function (e) {
                var newArea = '';
                newArea = jQuery('#sect' + jQuery(this).attr('data-sect')).text().replace('&lt;', '<').replace('&gt;', '>');
                var $newSection;
                if ($element.children().last().hasClass('is-static')) {
                    $element.children().last().before(newArea);
                    $newSection = $element.children().last().prev()
                } else {
                    if (!$element.children().last().hasClass("is-bg-grey")) {
                        $element.append(newArea);
                        $element.children().last().addClass("is-bg-grey")
                    } else {
                        $element.append(newArea)
                    }
                    $newSection = $element.children().last()
                }
                $newSection.find('.is-builder').each(function () {
                    var newId = 'contentarea' + makeid();
                    jQuery(this).attr('id', newId);
                    jQuery('#' + newId).contentbuilder({
                        toolbar: $element.data("contentbox").settings.toolbar,
                        snippetFile: $element.data("contentbox").settings.snippetFile,
                        snippetOpen: $element.data("contentbox").settings.snippetOpen,
                        iconselect: $element.data("contentbox").settings.iconselect,
                        onRender: function () {
                            $element.data("contentbox").contentRender()
                        },
                        customval: $element.data("contentbox").settings.customval,
                        largerImageHandler: $element.data("contentbox").settings.largerImageHandler,
                        snippetCategories: $element.data("contentbox").settings.snippetCategories,
                        imageselect: $element.data("contentbox").settings.imageselect,
                        fileselect: $element.data("contentbox").settings.fileselect,
                        onDrop: $element.data("contentbox").settings.onDrop,
                        onImageSelectClick: $element.data("contentbox").settings.onImageSelectClick,
                        onFileSelectClick: $element.data("contentbox").settings.onFileSelectClick,
                        onImageBrowseClick: $element.data("contentbox").settings.onImageBrowseClick,
                        onImageSettingClick: $element.data("contentbox").settings.onImageSettingClick,
                        snippetPathReplace: $element.data("contentbox").settings.snippetPathReplace,
                        colors: $element.data("contentbox").settings.colors,
                        imageEmbed: $element.data("contentbox").settings.imageEmbed,
                        snippetPageSliding: $element.data("contentbox").settings.snippetPageSliding,
                        scrollHelper: $element.data("contentbox").settings.scrollHelper,
                        sourceEditor: $element.data("contentbox").settings.sourceEditor,
                        customTags: $element.data("contentbox").settings.customTags
                    })
                });
                $newSection.append('<div class="is-section-tool">' + '<div class="is-section-edit"><i class="cb-icon-wrench"></i></div>' + '<div class="is-section-remove"><i class="cb-icon-cancel"></i></div>' + '</div>');
                $newSection.find('.is-section-edit').click(function () {
                    $activeSection = jQuery(this).parent().parent();
                    $element.data("contentbox").editSection()
                });
                $newSection.find('.is-section-remove').click(function () {
                    jQuery('#md-delsectionconfirm').css('max-width', '550px');
                    jQuery('#md-delsectionconfirm').simplemodal();
                    jQuery('#md-delsectionconfirm').data('simplemodal').show();
                    $activeSection = jQuery(this).parent().parent();
                    jQuery('#btnDelSectionOk').unbind('click');
                    jQuery('#btnDelSectionOk').bind('click', function (e) {
                        $activeSection.fadeOut(400, function () {
                            if ($activeSection.find('.is-builder').html()) $activeSection.find('.is-builder').data('contentbuilder').destroy();
                            $activeSection.remove();
                            jQuery('#md-delsectionconfirm').data('simplemodal').hide()
                        });
                        return false
                    });
                    jQuery('#btnDelSectionCancel').unbind('click');
                    jQuery('#btnDelSectionCancel').bind('click', function (e) {
                        jQuery('#md-delsectionconfirm').data('simplemodal').hide();
                        return false
                    })
                });
                $element.data("contentbox").applyBoxBehavior();
                jQuery('#md-addsection').data('simplemodal').hide();
                jQuery('body, html').animate({
                    scrollTop: $newSection.offset().top
                }, 600);
                e.preventDefault();
                e.stopImmediatePropagation();
                return false
            });
            return false
        };
        this.contentRender = function () {
            this.settings = jQuery.extend({}, defaults, options);
            var iconselect = this.settings.iconselect;
            this.settings.onRender()
        };
        this.editSection = function () {
            jQuery(".cmd-section-up").unbind("click");
            jQuery(".cmd-section-up").click(function () {
                $element.data("contentbox").sectionUp();
                return false
            });
            jQuery(".cmd-section-down").unbind("click");
            jQuery(".cmd-section-down").click(function () {
                $element.data("contentbox").sectionDown();
                return false
            });
            jQuery(".cmd-section-top").unbind("click");
            jQuery(".cmd-section-top").click(function () {
                $element.data("contentbox").sectionTop();
                return false
            });
            jQuery(".cmd-section-bottom").unbind("click");
            jQuery(".cmd-section-bottom").click(function () {
                $element.data("contentbox").sectionBottom();
                return false
            });
            jQuery(".cmd-section-height").unbind("click");
            jQuery(".cmd-section-height").click(function () {
                $element.data("contentbox").sectionHeight(jQuery(this).data("value"));
                return false
            });
            jQuery(".cmd-section-scroll").unbind("click");
            jQuery(".cmd-section-scroll").click(function () {
                $element.data("contentbox").sectionScrollIcon(jQuery(this).data("value"));
                return false
            });
            if ($activeSection.find(".is-arrow-down").length > 0) {
                jQuery("#chkScrollIcon").prop("checked", true)
            } else {
                jQuery("#chkScrollIcon").prop("checked", false)
            }
            jQuery("#chkScrollIcon").unbind("click");
            jQuery("#chkScrollIcon").click(function () {
                $element.data("contentbox").sectionUseScroll()
            });
            jQuery("#md-editsection").css("max-width", "350px");
            jQuery("#md-editsection").simplemodal();
            jQuery("#md-editsection").data("simplemodal").show()
        };
        this.applyBoxBehavior = function () {
            jQuery(".is-box").hover(function (e) {
                var $box = jQuery(this);
                var leftadj;
                if ($box.find(".is-overlay-bg").length == 0) {
                    jQuery("#form-upload-cover").css("display", "none");
                    leftadj = 15;
                    jQuery("#divboxtool").css("width", "30px")
                } else {
                    jQuery("#form-upload-cover").css("display", "block");
                    leftadj = 30;
                    jQuery("#divboxtool").css("width", "60px")
                }
                var scrolltop = jQuery(window).scrollTop();
                var offsettop = $box.offset().top;
                var offsetleft = $box.offset().left;
                var top = offsettop + parseInt($box.css('height')) - 30;
                var left = offsetleft + parseInt($box.css('width')) / 2;
                jQuery("#divboxtool").fadeIn(100);
                jQuery("#divboxtool").css("top", top + "px");
                jQuery("#divboxtool").css("left", (left - leftadj) + "px");
                jQuery("#divboxtool").unbind('hover');
                jQuery("#divboxtool").hover(function (e) {
                    jQuery("#divboxtool").stop(true, true).css("display", "block")
                }, function () {
                    jQuery("#divboxtool").stop(true, true).fadeOut(0)
                });
                jQuery("#fileCover").unbind('click');
                jQuery("#fileCover").click(function (e) {
                    $activeBox = $box;
                    $activeSection = $box.parents('is-section')
                });
                jQuery("#lnkeditbox").unbind('click');
                jQuery("#lnkeditbox").click(function (e) {
                    $activeBox = $box;
                    $activeSection = $box.parents('is-section');
                    $element.data("contentbox").editBox()
                });
                jQuery("#fileCover").unbind('change');
                jQuery("#fileCover").change(function (e) {
                    if (jQuery(this).val() == '') return;
                    jQuery("#lblWait").css("display", "block");
                    jQuery("#form-upload-cover").submit();
                    jQuery(this).clearInputs();
                    e.preventDefault();
                    e.stopImmediatePropagation()
                })
            }, function (e) {
                jQuery("#divboxtool").stop(true, true).fadeOut(0)
            });
            if ($element.children('div').not('.is-section').length == 0) {
                $element.append('<div style="height:1px"></div>')
            } else {
                $element.children('div').not('.is-section').remove();
                $element.append('<div style="height:1px"></div>')
            }
        };
        this.editBox = function () {
            if ($activeBox.find(".is-overlay-bg").length == 0) {
                jQuery("#tab-editbox-6").css("display", "none");
                jQuery("#divBoxPickPhoto").css("display", "none");
                jQuery("#tab-editbox-7").css("display", "none")
            } else {
                jQuery("#tab-editbox-6").css("display", "initial");
                if (this.settings.photoselect == '') {
                    jQuery("#divBoxPickPhoto").css("display", "none")
                } else {
                    jQuery("#divBoxPickPhoto").css("display", "table-cell")
                }
                if (!$element.data("contentbox").settings.enableModule) {
                    jQuery("#tab-editbox-7").css("display", "none")
                } else {
                    jQuery("#tab-editbox-7").css("display", "inline")
                }
            }
            if (!$element.data("contentbox").settings.enableAnimation) {
                jQuery("#tab-editbox-8").css("display", "none")
            } else {
                jQuery("#tab-editbox-8").css("display", "inline")
            }
            if ($activeBox.find(".is-container").length == 0) {
                jQuery("#tab-editbox-2").css("display", "none");
                jQuery("#tab-editbox-3").css("display", "none")
            } else {
                jQuery("#tab-editbox-2").css("display", "initial");
                if ($activeBox.find(".is-container .is-module").length > 0) {
                    jQuery("#tab-editbox-3").css("display", "none")
                } else {
                    jQuery("#tab-editbox-3").css("display", "initial")
                }
            }
            if ($activeBox.find(".is-container").length == 0) {
                jQuery("#tab-editbox-4").css("display", "none");
                jQuery("#tab-editbox-5").css("display", "none")
            } else {
                jQuery("#tab-editbox-4").css("display", "initial");
                if ($activeBox.css("display") == "table" || $activeBox.css("display") == "table-cell") {
                    jQuery("#tab-editbox-5").css("display", "initial")
                } else {
                    jQuery("#tab-editbox-5").css("display", "none")
                }
            }
            if ($activeBox.find(".is-module").length > 0) {
                jQuery("#chkBgModule").prop("checked", true);
                jQuery("#tab-editbox-2").css("display", "inline")
            } else {
                jQuery("#chkBgModule").prop("checked", false);
                if ($activeBox.find(".is-container").length > 0) {
                    jQuery("#tab-editbox-2").css("display", "inline")
                } else {
                    jQuery("#tab-editbox-2").css("display", "none")
                }
            }
            if ($activeBox.find(".is-overlay-bg").hasClass("is-scale-animated")) {
                jQuery("#chkAnimateBg").prop("checked", true)
            } else {
                jQuery("#chkAnimateBg").prop("checked", false)
            }
            if ($activeBox.hasClass("is-section")) {
                jQuery("#tab-editbox-1").css("display", "none");
                if (jQuery("#tab-editbox-2").css("display") == "inline") {
                    jQuery("#tab-editbox-2").click()
                } else if (jQuery("#tab-editbox-3").css("display") == "inline") {
                    jQuery("#tab-editbox-3").click()
                } else if (jQuery("#tab-editbox-4").css("display") == "inline") {
                    jQuery("#tab-editbox-4").click()
                } else if (jQuery("#tab-editbox-5").css("display") == "inline") {
                    jQuery("#tab-editbox-5").click()
                } else if (jQuery("#tab-editbox-6").css("display") == "inline") {
                    jQuery("#tab-editbox-6").click()
                } else if (jQuery("#tab-editbox-7").css("display") == "inline") {
                    jQuery("#tab-editbox-7").click()
                }
            } else {
                jQuery("#tab-editbox-1").css("display", "inline");
                jQuery("#tab-editbox-1").click()
            }
            jQuery(".cmd-box-size").unbind("click");
            jQuery(".cmd-box-size").click(function () {
                $element.data("contentbox").boxWidth(jQuery(this).data("value"));
                return false
            });
            jQuery(".cmd-box-bgcolor").unbind("click");
            jQuery(".cmd-box-bgcolor").click(function () {
                $element.data("contentbox").boxBgColor(jQuery(this).data("value"));
                return false
            });
            var photoselect = this.settings.photoselect;
            jQuery(".cmd-box-pickphoto").unbind("click");
            jQuery(".cmd-box-pickphoto").click(function () {
                if (jQuery('#ifrPhotoList').attr('src').indexOf('blank') != -1) {
                    jQuery('#ifrPhotoList').attr('src', photoselect)
                }
                jQuery("#md-pickphoto").css("max-width", "600px");
                jQuery("#md-pickphoto").simplemodal();
                jQuery("#md-pickphoto").data("simplemodal").show();
                return false
            });
            jQuery(".cmd-box-pickbgcolor").unbind("click");
            jQuery(".cmd-box-pickbgcolor").click(function () {
                jQuery("#md-color-target").val("boxbg");
                jQuery("#md-customcolor").css("max-width", "600px");
                jQuery("#md-customcolor").simplemodal();
                jQuery("#md-customcolor").data("simplemodal").show();
                return false
            });
            jQuery(".cmd-box-pickoverlaycolor").unbind("click");
            jQuery(".cmd-box-pickoverlaycolor").click(function () {
                jQuery("#md-color-target").val("boxoverlay");
                jQuery("#md-customcolor").css("max-width", "600px");
                jQuery("#md-customcolor").simplemodal();
                jQuery("#md-customcolor").data("simplemodal").show();
                return false
            });
            jQuery(".cmd-box-customcolor").unbind("click");
            jQuery(".cmd-box-customcolor").click(function () {
                var s = jQuery(this).data("value");
                $element.data("contentbox").boxCustomColor(s);
                $('#inpSectColor').val(s);
                $('#inpSectColor').css('background-color', s);
                return false
            });
            jQuery("#chkBgModule").unbind("click");
            jQuery("#chkBgModule").click(function () {
                $element.data("contentbox").boxModule()
            });
            jQuery(".cmd-box-textcolor").unbind("click");
            jQuery(".cmd-box-textcolor").click(function () {
                $element.data("contentbox").boxTextColor(jQuery(this).data("value"));
                return false
            });
            jQuery(".cmd-box-textalign").unbind("click");
            jQuery(".cmd-box-textalign").click(function () {
                $element.data("contentbox").boxTextAlign(jQuery(this).data("value"));
                return false
            });
            jQuery(".cmd-box-textopacity").unbind("click");
            jQuery(".cmd-box-textopacity").click(function () {
                $element.data("contentbox").boxTextOpacity(jQuery(this).data("value"));
                return false
            });
            jQuery(".cmd-box-smaller").unbind("click");
            jQuery(".cmd-box-smaller").click(function () {
                $element.data("contentbox").boxWidthSmaller(jQuery(this).data("value"));
                return false
            });
            jQuery(".cmd-box-larger").unbind("click");
            jQuery(".cmd-box-larger").click(function () {
                $element.data("contentbox").boxWidthLarger(jQuery(this).data("value"));
                return false
            });
            jQuery(".cmd-box-content-edge-x").unbind("click");
            jQuery(".cmd-box-content-edge-x").click(function () {
                var s = jQuery(this).data("value");
                if (s == "-") {
                    if ($activeBox.find(".is-container").hasClass("edge-x-0")) {
                        return false
                    } else if ($activeBox.find(".is-container").hasClass("edge-x-1")) {
                        $activeBox.find(".is-container").removeClass("edge-x-1");
                        $activeBox.find(".is-container").addClass("edge-x-0")
                    } else if ($activeBox.find(".is-container").hasClass("edge-x-2")) {
                        $activeBox.find(".is-container").removeClass("edge-x-2");
                        $activeBox.find(".is-container").addClass("edge-x-1")
                    } else if ($activeBox.find(".is-container").hasClass("edge-x-3")) {
                        $activeBox.find(".is-container").removeClass("edge-x-3");
                        $activeBox.find(".is-container").addClass("edge-x-2")
                    } else if ($activeBox.find(".is-container").hasClass("edge-x-4")) {
                        $activeBox.find(".is-container").removeClass("edge-x-4");
                        $activeBox.find(".is-container").addClass("edge-x-3")
                    } else if ($activeBox.find(".is-container").hasClass("edge-x-5")) {
                        $activeBox.find(".is-container").removeClass("edge-x-5");
                        $activeBox.find(".is-container").addClass("edge-x-4")
                    } else {
                        $activeBox.find(".is-container").addClass("edge-x-0")
                    }
                }
                if (s == "+") {
                    if ($activeBox.find(".is-container").hasClass("edge-x-0")) {
                        $activeBox.find(".is-container").removeClass("edge-x-0");
                        $activeBox.find(".is-container").addClass("edge-x-1")
                    } else if ($activeBox.find(".is-container").hasClass("edge-x-1")) {
                        $activeBox.find(".is-container").removeClass("edge-x-1");
                        $activeBox.find(".is-container").addClass("edge-x-2")
                    } else if ($activeBox.find(".is-container").hasClass("edge-x-2")) {
                        $activeBox.find(".is-container").removeClass("edge-x-2");
                        $activeBox.find(".is-container").addClass("edge-x-3")
                    } else if ($activeBox.find(".is-container").hasClass("edge-x-3")) {
                        $activeBox.find(".is-container").removeClass("edge-x-3");
                        $activeBox.find(".is-container").addClass("edge-x-4")
                    } else if ($activeBox.find(".is-container").hasClass("edge-x-4")) {
                        $activeBox.find(".is-container").removeClass("edge-x-4");
                        $activeBox.find(".is-container").addClass("edge-x-5")
                    } else if ($activeBox.find(".is-container").hasClass("edge-x-5")) {
                        return false
                    } else {
                        $activeBox.find(".is-container").addClass("edge-x-0")
                    }
                }
                if (s == "") {
                    $activeBox.find(".is-container").removeClass("edge-x-0");
                    $activeBox.find(".is-container").removeClass("edge-x-1");
                    $activeBox.find(".is-container").removeClass("edge-x-2");
                    $activeBox.find(".is-container").removeClass("edge-x-3");
                    $activeBox.find(".is-container").removeClass("edge-x-4");
                    $activeBox.find(".is-container").removeClass("edge-x-5")
                }
                return false
            });
            jQuery(".cmd-box-content-edge-y").unbind("click");
            jQuery(".cmd-box-content-edge-y").click(function () {
                var s = jQuery(this).data("value");
                if (s == "-") {
                    if ($activeBox.find(".is-box-centered").hasClass("edge-y--5")) {
                        return false
                    } else if ($activeBox.find(".is-box-centered").hasClass("edge-y--4")) {
                        $activeBox.find(".is-box-centered").removeClass("edge-y--4");
                        $activeBox.find(".is-box-centered").addClass("edge-y--5")
                    } else if ($activeBox.find(".is-box-centered").hasClass("edge-y--3")) {
                        $activeBox.find(".is-box-centered").removeClass("edge-y--3");
                        $activeBox.find(".is-box-centered").addClass("edge-y--4")
                    } else if ($activeBox.find(".is-box-centered").hasClass("edge-y--2")) {
                        $activeBox.find(".is-box-centered").removeClass("edge-y--2");
                        $activeBox.find(".is-box-centered").addClass("edge-y--3")
                    } else if ($activeBox.find(".is-box-centered").hasClass("edge-y--1")) {
                        $activeBox.find(".is-box-centered").removeClass("edge-y--1");
                        $activeBox.find(".is-box-centered").addClass("edge-y--2")
                    } else if ($activeBox.find(".is-box-centered").hasClass("edge-y-0")) {
                        $activeBox.find(".is-box-centered").removeClass("edge-y-0");
                        $activeBox.find(".is-box-centered").addClass("edge-y--1")
                    } else if ($activeBox.find(".is-box-centered").hasClass("edge-y-1")) {
                        $activeBox.find(".is-box-centered").removeClass("edge-y-1");
                        $activeBox.find(".is-box-centered").addClass("edge-y-0")
                    } else if ($activeBox.find(".is-box-centered").hasClass("edge-y-2")) {
                        $activeBox.find(".is-box-centered").removeClass("edge-y-2");
                        $activeBox.find(".is-box-centered").addClass("edge-y-1")
                    } else if ($activeBox.find(".is-box-centered").hasClass("edge-y-3")) {
                        $activeBox.find(".is-box-centered").removeClass("edge-y-3");
                        $activeBox.find(".is-box-centered").addClass("edge-y-2")
                    } else if ($activeBox.find(".is-box-centered").hasClass("edge-y-4")) {
                        $activeBox.find(".is-box-centered").removeClass("edge-y-4");
                        $activeBox.find(".is-box-centered").addClass("edge-y-3")
                    } else if ($activeBox.find(".is-box-centered").hasClass("edge-y-5")) {
                        $activeBox.find(".is-box-centered").removeClass("edge-y-5");
                        $activeBox.find(".is-box-centered").addClass("edge-y-4")
                    } else {
                        $activeBox.find(".is-box-centered").addClass("edge-y-0")
                    }
                }
                if (s == "+") {
                    if ($activeBox.find(".is-box-centered").hasClass("edge-y--5")) {
                        $activeBox.find(".is-box-centered").removeClass("edge-y--5");
                        $activeBox.find(".is-box-centered").addClass("edge-y--4")
                    } else if ($activeBox.find(".is-box-centered").hasClass("edge-y--4")) {
                        $activeBox.find(".is-box-centered").removeClass("edge-y--4");
                        $activeBox.find(".is-box-centered").addClass("edge-y--3")
                    } else if ($activeBox.find(".is-box-centered").hasClass("edge-y--3")) {
                        $activeBox.find(".is-box-centered").removeClass("edge-y--3");
                        $activeBox.find(".is-box-centered").addClass("edge-y--2")
                    } else if ($activeBox.find(".is-box-centered").hasClass("edge-y--2")) {
                        $activeBox.find(".is-box-centered").removeClass("edge-y--2");
                        $activeBox.find(".is-box-centered").addClass("edge-y--1")
                    } else if ($activeBox.find(".is-box-centered").hasClass("edge-y--1")) {
                        $activeBox.find(".is-box-centered").removeClass("edge-y--1");
                        $activeBox.find(".is-box-centered").addClass("edge-y-0")
                    } else if ($activeBox.find(".is-box-centered").hasClass("edge-y-0")) {
                        $activeBox.find(".is-box-centered").removeClass("edge-y-0");
                        $activeBox.find(".is-box-centered").addClass("edge-y-1")
                    } else if ($activeBox.find(".is-box-centered").hasClass("edge-y-1")) {
                        $activeBox.find(".is-box-centered").removeClass("edge-y-1");
                        $activeBox.find(".is-box-centered").addClass("edge-y-2")
                    } else if ($activeBox.find(".is-box-centered").hasClass("edge-y-2")) {
                        $activeBox.find(".is-box-centered").removeClass("edge-y-2");
                        $activeBox.find(".is-box-centered").addClass("edge-y-3")
                    } else if ($activeBox.find(".is-box-centered").hasClass("edge-y-3")) {
                        $activeBox.find(".is-box-centered").removeClass("edge-y-3");
                        $activeBox.find(".is-box-centered").addClass("edge-y-4")
                    } else if ($activeBox.find(".is-box-centered").hasClass("edge-y-4")) {
                        $activeBox.find(".is-box-centered").removeClass("edge-y-4");
                        $activeBox.find(".is-box-centered").addClass("edge-y-5")
                    } else if ($activeBox.find(".is-box-centered").hasClass("edge-y-5")) {
                        return false
                    } else {
                        $activeBox.find(".is-box-centered").addClass("edge-y-0")
                    }
                }
                if (s == "") {
                    $activeBox.find(".is-box-centered").removeClass("edge-y--5");
                    $activeBox.find(".is-box-centered").removeClass("edge-y--4");
                    $activeBox.find(".is-box-centered").removeClass("edge-y--3");
                    $activeBox.find(".is-box-centered").removeClass("edge-y--2");
                    $activeBox.find(".is-box-centered").removeClass("edge-y--1");
                    $activeBox.find(".is-box-centered").removeClass("edge-y-0");
                    $activeBox.find(".is-box-centered").removeClass("edge-y-1");
                    $activeBox.find(".is-box-centered").removeClass("edge-y-2");
                    $activeBox.find(".is-box-centered").removeClass("edge-y-3");
                    $activeBox.find(".is-box-centered").removeClass("edge-y-4");
                    $activeBox.find(".is-box-centered").removeClass("edge-y-5")
                }
                return false
            });
            jQuery(".cmd-box-content-pos").unbind("click");
            jQuery(".cmd-box-content-pos").click(function () {
                $activeBox.find(".is-box-centered").removeClass("is-content-top");
                $activeBox.find(".is-box-centered").removeClass("is-content-bottom");
                $activeBox.find(".is-container").removeClass("is-content-left");
                $activeBox.find(".is-container").removeClass("is-content-right");
                var s = jQuery(this).data("value");
                if (s == "topleft") {
                    $activeBox.find(".is-box-centered").addClass("is-content-top");
                    $activeBox.find(".is-container").addClass("is-content-left")
                }
                if (s == "topcenter") {
                    $activeBox.find(".is-box-centered").addClass("is-content-top");
                    $activeBox.find(".is-container").removeClass("is-content-left")
                }
                if (s == "topright") {
                    $activeBox.find(".is-box-centered").addClass("is-content-top");
                    $activeBox.find(".is-container").addClass("is-content-right")
                }
                if (s == "middleleft") {
                    $activeBox.find(".is-container").addClass("is-content-left")
                }
                if (s == "middlecenter") { }
                if (s == "middleright") {
                    $activeBox.find(".is-container").addClass("is-content-right")
                }
                if (s == "bottomleft") {
                    $activeBox.find(".is-box-centered").addClass("is-content-bottom");
                    $activeBox.find(".is-container").addClass("is-content-left")
                }
                if (s == "bottomcenter") {
                    $activeBox.find(".is-box-centered").addClass("is-content-bottom")
                }
                if (s == "bottomright") {
                    $activeBox.find(".is-box-centered").addClass("is-content-bottom");
                    $activeBox.find(".is-container").addClass("is-content-right")
                }
                return false
            });
            jQuery("#chkAnimateBg").unbind("click");
            jQuery("#chkAnimateBg").click(function () {
                $element.data("contentbox").boxAnimateBg()
            });
            jQuery(".cmd-box-overlay").unbind("click");
            jQuery(".cmd-box-overlay").click(function () {
                $element.data("contentbox").boxOverlay(jQuery(this).data("value"));
                return false
            });
            jQuery(".cmd-box-overlaycolor").unbind("click");
            jQuery(".cmd-box-overlaycolor").click(function () {
                $element.data("contentbox").boxOverlayColor(jQuery(this).data("value"));
                return false
            });
            jQuery(".cmd-box-selectasset").unbind("click");
            jQuery(".cmd-box-selectasset").click(function () {
                $element.data("contentbox").boxSelectAsset();
                return false
            });
            jQuery('.cmd-box-animate').val('');
            if ($activeBox.hasClass('is-pulse')) jQuery('.cmd-box-animate').val('is-pulse');
            if ($activeBox.hasClass('is-bounceIn')) jQuery('.cmd-box-animate').val('is-bounceIn');
            if ($activeBox.hasClass('is-fadeIn')) jQuery('.cmd-box-animate').val('is-fadeIn');
            if ($activeBox.hasClass('is-fadeInDown')) jQuery('.cmd-box-animate').val('is-fadeInDown');
            if ($activeBox.hasClass('is-fadeInLeft')) jQuery('.cmd-box-animate').val('is-fadeInLeft');
            if ($activeBox.hasClass('is-fadeInRight')) jQuery('.cmd-box-animate').val('is-fadeInRight');
            if ($activeBox.hasClass('is-fadeInUp')) jQuery('.cmd-box-animate').val('is-fadeInUp');
            if ($activeBox.hasClass('is-flipInX')) jQuery('.cmd-box-animate').val('is-flipInX');
            if ($activeBox.hasClass('is-flipInY')) jQuery('.cmd-box-animate').val('is-flipInY');
            if ($activeBox.hasClass('is-slideInUp')) jQuery('.cmd-box-animate').val('is-slideInUp');
            if ($activeBox.hasClass('is-slideInDown')) jQuery('.cmd-box-animate').val('is-slideInDown');
            if ($activeBox.hasClass('is-slideInLeft')) jQuery('.cmd-box-animate').val('is-slideInLeft');
            if ($activeBox.hasClass('is-slideInRight')) jQuery('.cmd-box-animate').val('is-slideInRight');
            if ($activeBox.hasClass('is-zoomIn')) jQuery('.cmd-box-animate').val('is-zoomIn');
            jQuery('.cmd-box-animate').unbind('change');
            jQuery('.cmd-box-animate').change(function (e) {
                $activeBox.removeClass('is-animated');
                $activeBox.removeClass('is-pulse');
                $activeBox.removeClass('is-bounceIn');
                $activeBox.removeClass('is-fadeIn');
                $activeBox.removeClass('is-fadeInDown');
                $activeBox.removeClass('is-fadeInLeft');
                $activeBox.removeClass('is-fadeInRight');
                $activeBox.removeClass('is-fadeInUp');
                $activeBox.removeClass('is-flipInX');
                $activeBox.removeClass('is-flipInY');
                $activeBox.removeClass('is-slideInUp');
                $activeBox.removeClass('is-slideInDown');
                $activeBox.removeClass('is-slideInLeft');
                $activeBox.removeClass('is-slideInRight');
                $activeBox.removeClass('is-zoomIn');
                $activeBox.removeClass('animated');
                $activeBox.removeClass('pulse');
                $activeBox.removeClass('bounceIn');
                $activeBox.removeClass('fadeIn');
                $activeBox.removeClass('fadeInDown');
                $activeBox.removeClass('fadeInLeft');
                $activeBox.removeClass('fadeInRight');
                $activeBox.removeClass('fadeInUp');
                $activeBox.removeClass('flipInX');
                $activeBox.removeClass('flipInY');
                $activeBox.removeClass('slideInUp');
                $activeBox.removeClass('slideInDown');
                $activeBox.removeClass('slideInLeft');
                $activeBox.removeClass('slideInRight');
                $activeBox.removeClass('zoomIn');
                if (jQuery(this).val() != '') {
                    $activeBox.addClass('is-animated');
                    $activeBox.addClass(jQuery(this).val());
                    $activeBox.addClass('animated');
                    $activeBox.addClass(jQuery(this).val().substr(3))
                }
                e.preventDefault();
                e.stopImmediatePropagation()
            });
            jQuery('.cmd-box-animate-test').unbind('click');
            jQuery('.cmd-box-animate-test').click(function (e) {
                $activeBox.removeClass('animated');
                $activeBox.removeClass('pulse');
                $activeBox.removeClass('bounceIn');
                $activeBox.removeClass('fadeIn');
                $activeBox.removeClass('fadeInDown');
                $activeBox.removeClass('fadeInLeft');
                $activeBox.removeClass('fadeInRight');
                $activeBox.removeClass('fadeInUp');
                $activeBox.removeClass('flipInX');
                $activeBox.removeClass('flipInY');
                $activeBox.removeClass('slideInUp');
                $activeBox.removeClass('slideInDown');
                $activeBox.removeClass('slideInLeft');
                $activeBox.removeClass('slideInRight');
                $activeBox.removeClass('zoomIn');
                setTimeout(function () {
                    $activeBox.addClass('animated');
                    $activeBox.addClass(jQuery('.cmd-box-animate').val().substr(3))
                }, 50);
                e.preventDefault();
                e.stopImmediatePropagation()
            });
            if ($activeBox.hasClass('once')) {
                jQuery('#chkAnimOnce').prop("checked", true)
            } else {
                jQuery('#chkAnimOnce').prop("checked", false)
            }
            jQuery('#chkAnimOnce').unbind('click');
            jQuery('#chkAnimOnce').click(function (e) {
                $activeBox.data('animated', '');
                if (jQuery("#chkAnimOnce").prop("checked")) {
                    $activeBox.addClass('once')
                } else {
                    $activeBox.removeClass('once')
                }
            });
            jQuery("#inpBoxHtml").val(jQuery.trim($activeBox.html()));
            jQuery(".cmd-box-html").unbind("click");
            jQuery(".cmd-box-html").click(function () {
                $activeBox.html(jQuery("#inpBoxHtml").val());
                return false
            });
            jQuery("#md-editbox").css("max-width", "590px");
            jQuery("#md-editbox").simplemodal();
            jQuery("#md-editbox").data("simplemodal").show()
        };
        this.boxWidth = function (n) {
            $activeBox.find(".is-container").css("max-width", "");
            $activeBox.find(".is-container").removeClass("is-content-380");
            $activeBox.find(".is-container").removeClass("is-content-500");
            $activeBox.find(".is-container").removeClass("is-content-640");
            $activeBox.find(".is-container").removeClass("is-content-800");
            $activeBox.find(".is-container").removeClass("is-content-970");
            $activeBox.find(".is-container").removeClass("is-content-980");
            $activeBox.find(".is-container").removeClass("is-content-1050");
            $activeBox.find(".is-container").removeClass("is-content-1100");
            $activeBox.find(".is-container").removeClass("is-content-1200");
            if (n != 0) {
                $activeBox.find(".is-container").addClass("is-content-" + n)
            }
            return false
        };
        this.boxCustomColor = function (s) {
            var ctarget = jQuery("#md-color-target").val();
            if (ctarget == "boxoverlay") {
                var $overlay = $activeBox.find(".is-overlay");
                var $overlaycolor = $overlay.find(".is-overlay-color");
                if ($overlaycolor.css("display") == "none" || $overlaycolor.css("opacity") == 0) {
                    $overlaycolor.css("display", "block");
                    $overlaycolor.css("opacity", 0.2)
                }
                $overlaycolor.css("background-color", s)
            }
            if (ctarget == "boxbg") {
                if ($activeBox.find(".is-overlay").length > 0) {
                    var $overlay = $activeBox.find(".is-overlay");
                    if ($overlay.find(".is-overlay-bg").length > 0) {
                        $overlay.find(".is-overlay-bg").css("display", "none");
                        $overlay.find(".is-overlay-color").css("display", "none")
                    }
                }
                $activeBox.removeClass("is-bg-light");
                $activeBox.removeClass("is-bg-grey");
                $activeBox.removeClass("is-bg-dark");
                $activeBox.css("background-color", s)
            }
            return false
        };
        this.boxBgColor = function (s) {
            var $overlay = $activeBox.find(".is-overlay");
            $activeBox.css("background-color", "");
            if ($activeBox.find(".is-overlay").length > 0) {
                var $overlay = $activeBox.find(".is-overlay");
                if ($overlay.find(".is-overlay-bg").length > 0) {
                    if (s == "") {
                        if ($activeBox.find(".is-overlay-content .is-module").length == 0) {
                            $overlay.find(".is-overlay-bg").css("display", "block")
                        }
                        $activeBox.removeClass("is-bg-light");
                        $activeBox.removeClass("is-bg-grey");
                        $activeBox.removeClass("is-bg-dark");
                        $element.data("contentbox").boxTextColor("")
                    } else {
                        $overlay.find(".is-overlay-bg").css("display", "none");
                        $overlay.find(".is-overlay-color").css("display", "none");
                        if (s == "grey") {
                            $activeBox.removeClass("is-bg-dark");
                            $activeBox.removeClass("is-bg-light");
                            $activeBox.addClass("is-bg-grey");
                            $element.data("contentbox").boxTextColor("dark")
                        }
                        if (s == "dark") {
                            $activeBox.removeClass("is-bg-grey");
                            $activeBox.removeClass("is-bg-light");
                            $activeBox.addClass("is-bg-dark");
                            $element.data("contentbox").boxTextColor("light")
                        }
                        if (s == "light") {
                            $activeBox.removeClass("is-bg-grey");
                            $activeBox.removeClass("is-bg-dark");
                            $activeBox.addClass("is-bg-light");
                            $element.data("contentbox").boxTextColor("dark")
                        }
                    }
                }
            } else {
                if (s == "") {
                    $activeBox.removeClass("is-bg-light");
                    $activeBox.removeClass("is-bg-grey");
                    $activeBox.removeClass("is-bg-dark");
                    $element.data("contentbox").boxTextColor("")
                } else {
                    if (s == "grey") {
                        $activeBox.removeClass("is-bg-dark");
                        $activeBox.removeClass("is-bg-light");
                        $activeBox.addClass("is-bg-grey");
                        $element.data("contentbox").boxTextColor("dark")
                    }
                    if (s == "dark") {
                        $activeBox.removeClass("is-bg-grey");
                        $activeBox.removeClass("is-bg-light");
                        $activeBox.addClass("is-bg-dark");
                        $element.data("contentbox").boxTextColor("light")
                    }
                    if (s == "light") {
                        $activeBox.removeClass("is-bg-grey");
                        $activeBox.removeClass("is-bg-dark");
                        $activeBox.addClass("is-bg-light");
                        $element.data("contentbox").boxTextColor("dark")
                    }
                }
            }
            return false
        };
        this.boxModule = function (s) {
            var $overlay = $activeBox.find(".is-overlay");
            if (jQuery("#chkBgModule").prop("checked")) {
                $overlay.find(".is-overlay-content").html("<div class='is-module'></div>");
                jQuery("#tab-editbox-2").css("display", "inline");
                $overlay.find(".is-overlay-bg").css("display", "none");
                $overlay.find(".is-overlay-color").css("display", "none")
            } else {
                $overlay.find(".is-overlay-content").html("");
                if ($activeBox.find(".is-container").length > 0) {
                    jQuery("#tab-editbox-2").css("display", "inline")
                } else {
                    jQuery("#tab-editbox-2").css("display", "none")
                }
                $overlay.find(".is-overlay-bg").css("display", "block")
            }
        };
        this.boxTextColor = function (s) {
            if (s == "light") {
                $activeBox.removeClass("is-dark-text");
                $activeBox.addClass("is-light-text")
            }
            if (s == "dark") {
                $activeBox.removeClass("is-light-text");
                $activeBox.addClass("is-dark-text")
            }
            if (s == "") {
                $activeBox.removeClass("is-dark-text");
                $activeBox.removeClass("is-light-text")
            }
            return false
        };
        this.boxTextAlign = function (s) {
            $activeBox.find(".center").removeClass("center");
            if (s == "right") {
                $activeBox.removeClass("is-align-left");
                $activeBox.removeClass("is-align-center");
                $activeBox.addClass("is-align-right")
            }
            if (s == "center") {
                $activeBox.removeClass("is-align-left");
                $activeBox.removeClass("is-align-right");
                $activeBox.addClass("is-align-center")
            }
            if (s == "left") {
                $activeBox.removeClass("is-align-right");
                $activeBox.removeClass("is-align-center");
                $activeBox.addClass("is-align-left")
            }
            return false
        };
        this.boxTextOpacity = function (s) {
            var $cb = $activeBox.find(".is-box-centered");
            if (s == "+") {
                if ($cb.hasClass("is-opacity-20")) {
                    $cb.removeClass("is-opacity-20");
                    $cb.addClass("is-opacity-25")
                } else if ($cb.hasClass("is-opacity-25")) {
                    $cb.removeClass("is-opacity-25");
                    $cb.addClass("is-opacity-30")
                } else if ($cb.hasClass("is-opacity-30")) {
                    $cb.removeClass("is-opacity-30");
                    $cb.addClass("is-opacity-35")
                } else if ($cb.hasClass("is-opacity-35")) {
                    $cb.removeClass("is-opacity-35");
                    $cb.addClass("is-opacity-40")
                } else if ($cb.hasClass("is-opacity-40")) {
                    $cb.removeClass("is-opacity-40");
                    $cb.addClass("is-opacity-45")
                } else if ($cb.hasClass("is-opacity-45")) {
                    $cb.removeClass("is-opacity-45");
                    $cb.addClass("is-opacity-50")
                } else if ($cb.hasClass("is-opacity-50")) {
                    $cb.removeClass("is-opacity-50");
                    $cb.addClass("is-opacity-55")
                } else if ($cb.hasClass("is-opacity-55")) {
                    $cb.removeClass("is-opacity-55");
                    $cb.addClass("is-opacity-60")
                } else if ($cb.hasClass("is-opacity-60")) {
                    $cb.removeClass("is-opacity-60");
                    $cb.addClass("is-opacity-65")
                } else if ($cb.hasClass("is-opacity-65")) {
                    $cb.removeClass("is-opacity-65");
                    $cb.addClass("is-opacity-70")
                } else if ($cb.hasClass("is-opacity-70")) {
                    $cb.removeClass("is-opacity-70");
                    $cb.addClass("is-opacity-75")
                } else if ($cb.hasClass("is-opacity-75")) {
                    $cb.removeClass("is-opacity-75");
                    $cb.addClass("is-opacity-80")
                } else if ($cb.hasClass("is-opacity-80")) {
                    $cb.removeClass("is-opacity-80");
                    $cb.addClass("is-opacity-85")
                } else if ($cb.hasClass("is-opacity-85")) {
                    $cb.removeClass("is-opacity-85");
                    $cb.addClass("is-opacity-90")
                } else if ($cb.hasClass("is-opacity-90")) {
                    $cb.removeClass("is-opacity-90");
                    $cb.addClass("is-opacity-95")
                } else if ($cb.hasClass("is-opacity-95")) {
                    $cb.removeClass("is-opacity-95")
                }
                return false
            }
            if (s == "-") {
                if ($cb.hasClass("is-opacity-20")) {
                    return false
                } else if ($cb.hasClass("is-opacity-25")) {
                    $cb.removeClass("is-opacity-25");
                    $cb.addClass("is-opacity-20")
                } else if ($cb.hasClass("is-opacity-30")) {
                    $cb.removeClass("is-opacity-30");
                    $cb.addClass("is-opacity-25")
                } else if ($cb.hasClass("is-opacity-35")) {
                    $cb.removeClass("is-opacity-35");
                    $cb.addClass("is-opacity-30")
                } else if ($cb.hasClass("is-opacity-40")) {
                    $cb.removeClass("is-opacity-40");
                    $cb.addClass("is-opacity-35")
                } else if ($cb.hasClass("is-opacity-45")) {
                    $cb.removeClass("is-opacity-45");
                    $cb.addClass("is-opacity-40")
                } else if ($cb.hasClass("is-opacity-50")) {
                    $cb.removeClass("is-opacity-50");
                    $cb.addClass("is-opacity-45")
                } else if ($cb.hasClass("is-opacity-55")) {
                    $cb.removeClass("is-opacity-55");
                    $cb.addClass("is-opacity-50")
                } else if ($cb.hasClass("is-opacity-60")) {
                    $cb.removeClass("is-opacity-60");
                    $cb.addClass("is-opacity-55")
                } else if ($cb.hasClass("is-opacity-65")) {
                    $cb.removeClass("is-opacity-65");
                    $cb.addClass("is-opacity-60")
                } else if ($cb.hasClass("is-opacity-70")) {
                    $cb.removeClass("is-opacity-70");
                    $cb.addClass("is-opacity-65")
                } else if ($cb.hasClass("is-opacity-75")) {
                    $cb.removeClass("is-opacity-75");
                    $cb.addClass("is-opacity-70")
                } else if ($cb.hasClass("is-opacity-80")) {
                    $cb.removeClass("is-opacity-80");
                    $cb.addClass("is-opacity-75")
                } else if ($cb.hasClass("is-opacity-85")) {
                    $cb.removeClass("is-opacity-85");
                    $cb.addClass("is-opacity-80")
                } else if ($cb.hasClass("is-opacity-90")) {
                    $cb.removeClass("is-opacity-90");
                    $cb.addClass("is-opacity-85")
                } else if ($cb.hasClass("is-opacity-95")) {
                    $cb.removeClass("is-opacity-95");
                    $cb.addClass("is-opacity-90")
                } else {
                    $cb.addClass("is-opacity-95")
                }
                return false
            }
            $cb.removeClass("is-opacity-20");
            $cb.removeClass("is-opacity-25");
            $cb.removeClass("is-opacity-30");
            $cb.removeClass("is-opacity-35");
            $cb.removeClass("is-opacity-40");
            $cb.removeClass("is-opacity-45");
            $cb.removeClass("is-opacity-50");
            $cb.removeClass("is-opacity-55");
            $cb.removeClass("is-opacity-60");
            $cb.removeClass("is-opacity-65");
            $cb.removeClass("is-opacity-70");
            $cb.removeClass("is-opacity-75");
            $cb.removeClass("is-opacity-80");
            $cb.removeClass("is-opacity-85");
            $cb.removeClass("is-opacity-90");
            $cb.removeClass("is-opacity-95");
            if (s == "0.7") {
                $cb.addClass("is-opacity-70")
            }
            if (s == "0.75") {
                $cb.addClass("is-opacity-75")
            }
            if (s == "0.8") {
                $cb.addClass("is-opacity-80")
            }
            if (s == "0.85") {
                $cb.addClass("is-opacity-85")
            }
            if (s == "0.90") {
                $cb.addClass("is-opacity-90")
            }
            if (s == "0.95") {
                $cb.addClass("is-opacity-95")
            }
            return false
        };
        this.boxWidthSmaller = function () {
            var $currentBox;
            var $nextBox;
            var ok = false;
            for (i = 1; i <= 12; i++) {
                if ($activeBox.hasClass("is-box-" + i)) {
                    ok = true
                }
            }
            if (ok) {
                $currentBox = $activeBox
            } else {
                $currentBox = $activeBox.parent()
            }
            if ($currentBox.next().length > 0) {
                $nextBox = $currentBox.next();
                this.boxMinus($currentBox);
                this.boxPlus($nextBox);
                return false
            } else if ($currentBox.prev().length > 0) {
                $nextBox = $currentBox.prev();
                this.boxMinus($currentBox);
                this.boxPlus($nextBox);
                return false
            }
        };
        this.boxWidthLarger = function () {
            var $currentBox;
            var $nextBox;
            var ok = false;
            for (i = 1; i <= 12; i++) {
                if ($activeBox.hasClass("is-box-" + i)) {
                    ok = true
                }
            }
            if (ok) {
                $currentBox = $activeBox
            } else {
                $currentBox = $activeBox.parent()
            }
            if ($currentBox.next().length > 0) {
                $nextBox = $currentBox.next();
                this.boxPlus($currentBox);
                this.boxMinus($nextBox);
                return false
            } else if ($currentBox.prev().length > 0) {
                $nextBox = $currentBox.prev();
                this.boxPlus($currentBox);
                this.boxMinus($nextBox);
                return false
            }
        };
        this.boxPlus = function ($box) {
            for (i = 1; i < 12; i++) {
                if ($box.hasClass("is-box-" + i)) {
                    $box.removeClass("is-box-" + i);
                    $box.addClass("is-box-" + (i + 1));
                    return
                }
            }
        };
        this.boxMinus = function ($box) {
            for (i = 12; i > 1; i--) {
                if ($box.hasClass("is-box-" + i)) {
                    $box.removeClass("is-box-" + i);
                    $box.addClass("is-box-" + (i - 1));
                    return
                }
            }
        };
        this.boxAnimateBg = function () {
            var $overlay = $activeBox.find(".is-overlay");
            if (jQuery("#chkAnimateBg").prop("checked")) {
                $overlay.find(".is-overlay-bg").addClass("is-scale-animated");
                $overlay.find(".is-overlay-bg").addClass("is-appeared")
            } else {
                $overlay.find(".is-overlay-bg").removeClass("is-scale-animated");
                $overlay.find(".is-overlay-bg").removeClass("is-appeared")
            }
        };
        this.boxOverlay = function (s) {
            var $overlay = $activeBox.find(".is-overlay");
            var $overlaycolor = $overlay.find(".is-overlay-color");
            if (s == "+") {
                $overlaycolor.css("display", "block");
                if ($overlaycolor.css("opacity") == 0.1) $overlaycolor.css("opacity", 0.15);
                else if ($overlaycolor.css("opacity") == 0.15) $overlaycolor.css("opacity", 0.2);
                else if ($overlaycolor.css("opacity") == 0.2) $overlaycolor.css("opacity", 0.25);
                else if ($overlaycolor.css("opacity") == 0.25) $overlaycolor.css("opacity", 0.3);
                else if ($overlaycolor.css("opacity") == 0.3) $overlaycolor.css("opacity", 0.35);
                else if ($overlaycolor.css("opacity") == 0.35) $overlaycolor.css("opacity", 0.4);
                else if ($overlaycolor.css("opacity") == 0.4) $overlaycolor.css("opacity", 0.45);
                else if ($overlaycolor.css("opacity") == 0.45) $overlaycolor.css("opacity", 0.5);
                else if ($overlaycolor.css("opacity") == 0.5) $overlaycolor.css("opacity", 0.55);
                else if ($overlaycolor.css("opacity") == 0.55) $overlaycolor.css("opacity", 0.6);
                else if ($overlaycolor.css("opacity") == 0.6) $overlaycolor.css("opacity", 0.6);
                else $overlaycolor.css("opacity", 0.1)
            } else if (s == "-") {
                $overlaycolor.css("display", "block");
                if ($overlaycolor.css("opacity") == 0.1) {
                    $overlaycolor.css("opacity", "");
                    $overlaycolor.css("display", "none")
                } else if ($overlaycolor.css("opacity") == 0.15) $overlaycolor.css("opacity", 0.1);
                else if ($overlaycolor.css("opacity") == 0.2) $overlaycolor.css("opacity", 0.15);
                else if ($overlaycolor.css("opacity") == 0.25) $overlaycolor.css("opacity", 0.2);
                else if ($overlaycolor.css("opacity") == 0.3) $overlaycolor.css("opacity", 0.25);
                else if ($overlaycolor.css("opacity") == 0.35) $overlaycolor.css("opacity", 0.3);
                else if ($overlaycolor.css("opacity") == 0.4) $overlaycolor.css("opacity", 0.35);
                else if ($overlaycolor.css("opacity") == 0.45) $overlaycolor.css("opacity", 0.4);
                else if ($overlaycolor.css("opacity") == 0.5) $overlaycolor.css("opacity", 0.45);
                else if ($overlaycolor.css("opacity") == 0.55) $overlaycolor.css("opacity", 0.5);
                else if ($overlaycolor.css("opacity") == 0.6) $overlaycolor.css("opacity", 0.55);
                else {
                    $overlaycolor.css("opacity", "");
                    $overlaycolor.css("display", "none")
                }
            } else if (s == "0") {
                $overlaycolor.css("display", "none");
                $overlaycolor.css("opacity", "")
            } else {
                $overlaycolor.css("display", "block");
                $overlaycolor.css("opacity", n)
            }
            return false
        };
        this.boxOverlayColor = function (s) {
            var $overlay = $activeBox.find(".is-overlay");
            var $overlaycolor = $overlay.find(".is-overlay-color");
            if ($overlaycolor.css("display") == "none" || $overlaycolor.css("opacity") == 0) {
                $overlaycolor.css("display", "block");
                $overlaycolor.css("opacity", 0.2)
            }
            $overlaycolor.css("background-color", s);
            return false
        };
        this.boxSelectAsset = function () {
            var $overlay = $activeBox.find(".is-overlay");
            var $overlaybg = $overlay.find(".is-overlay-bg");
            if (this.settings.onCoverImageSelectClick) {
                this.settings.onCoverImageSelectClick($overlaybg.get(0))
            }
            return false
        };
        this.sectionUseScroll = function () {
            if (jQuery("#chkScrollIcon").prop("checked")) {
                var $refSection = $activeSection.find(".is-section-tool");
                jQuery('<div class="is-arrow-down bounce"><a href="#"><i class="icon ion-ios-arrow-thin-down"></i></a></div>').insertBefore($refSection);
                jQuery('.is-arrow-down a').click(function (e) {
                    if (jQuery(this).parents(".is-section").next().html()) {
                        jQuery('html,body').animate({
                            scrollTop: jQuery(this).parents(".is-section").next().offset().top
                        }, 800)
                    }
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return false
                })
            } else {
                $activeSection.find(".is-arrow-down").remove()
            }
            return false
        };
        this.sectionScrollIcon = function (s) {
            if (s == "light") {
                $activeSection.find(".is-arrow-down").addClass('light')
            } else {
                $activeSection.find(".is-arrow-down").removeClass('light')
            }
            return false
        };
        this.sectionUp = function () {
            if ($activeSection.prev('.is-section').length > 0 && !$activeSection.prev('.is-section').hasClass('is-static')) {
                var $refSection = $activeSection.prev();
                $activeSection.insertBefore($refSection);
                jQuery('html,body').animate({
                    scrollTop: $activeSection.offset().top
                }, 600)
            }
            return false
        };
        this.sectionDown = function () {
            if ($activeSection.next('.is-section').length > 0 && !$activeSection.next('.is-section').hasClass('is-static')) {
                var $refSection = $activeSection.next();
                $activeSection.insertAfter($refSection);
                jQuery('html,body').animate({
                    scrollTop: $activeSection.offset().top
                }, 600)
            }
            return false
        };
        this.sectionTop = function () {
            var $refSection = $element.children('.is-section').not('.is-static').first();
            $activeSection.insertBefore($refSection);
            jQuery('html,body').animate({
                scrollTop: $activeSection.offset().top
            }, 600);
            return false
        };
        this.sectionBottom = function () {
            var $refSection = $element.children('.is-section').not('.is-static').last();
            $activeSection.insertAfter($refSection);
            jQuery('html,body').animate({
                scrollTop: $activeSection.offset().top
            }, 600);
            return false
        };
        this.sectionHeight = function (n) {
            $activeSection.css("height", "");
            $activeSection.removeClass("is-section-auto");
            $activeSection.removeClass("is-section-20");
            $activeSection.removeClass("is-section-30");
            $activeSection.removeClass("is-section-40");
            $activeSection.removeClass("is-section-50");
            $activeSection.removeClass("is-section-60");
            $activeSection.removeClass("is-section-75");
            $activeSection.removeClass("is-section-100");
            if (n == 0) {
                $activeSection.addClass("is-section-auto")
            } else {
                $activeSection.addClass("is-section-" + n)
            }
            jQuery('html,body').animate({
                scrollTop: $activeSection.offset().top
            }, 600);
            return false
        };
        this.html = function () {
            $element.children('div').not('.is-section').remove();
            jQuery('.is-animated').each(function () {
                jQuery(this).removeClass('animated');
                jQuery(this).removeClass('pulse');
                jQuery(this).removeClass('bounceIn');
                jQuery(this).removeClass('fadeIn');
                jQuery(this).removeClass('fadeInDown');
                jQuery(this).removeClass('fadeInLeft');
                jQuery(this).removeClass('fadeInRight');
                jQuery(this).removeClass('fadeInUp');
                jQuery(this).removeClass('flipInX');
                jQuery(this).removeClass('flipInY');
                jQuery(this).removeClass('slideInUp');
                jQuery(this).removeClass('slideInDown');
                jQuery(this).removeClass('slideInLeft');
                jQuery(this).removeClass('slideInRight');
                jQuery(this).removeClass('zoomIn');
                jQuery(this).css('animation-delay', '')
            });
            var sHtml = '';
            $element.children().each(function () {
                var $currentSection = jQuery(this);
                if ($currentSection.hasClass('is-static')) return;
                $currentSection.find(".is-appeared").removeClass("is-appeared");
                $currentSection.find('.is-builder').each(function () {
                    var sContent = '';
                    var $area = jQuery(this);
                    if ($area.html()) {
                        sContent = $area.data('contentbuilder').html();
                        $area.data('contentbuilder').destroy();
                        $area.removeClass('ui-droppable');
                        $area.css('zoom', '');
                        $area.css('-moz-transform', '');
                        $area.html(sContent)
                    }
                });
                var secclass = '';
                var secstyle = '';
                if ($currentSection.attr('class')) secclass = ' class="' + $currentSection.attr('class') + '"';
                if ($currentSection.attr('style')) secstyle = ' style="' + $currentSection.attr('style') + '"';
                var $copySection = $currentSection.clone();
                $copySection.find('.is-section-tool').remove();
                var $s = $copySection.html();
                $s = $s.replace(/style=\'/g, 'style="').replace(/url\("/g, 'url(\'').replace(/"\);\'/g, '\'\);"');
                sHtml += '<div' + secclass + secstyle + '>' + $s + '</div>\n\n'
            });
            sHtml = sHtml.replace('url("', 'url(\'').replace('");', '\');');
            $element.find('.is-builder').each(function () {
                var Id = jQuery(this).attr('id');
                jQuery('#' + Id).contentbuilder({
                    toolbar: $element.data("contentbox").settings.toolbar,
                    snippetFile: $element.data("contentbox").settings.snippetFile,
                    snippetOpen: $element.data("contentbox").settings.snippetOpen,
                    iconselect: $element.data("contentbox").settings.iconselect,
                    onRender: function () {
                        $element.data("contentbox").contentRender()
                    },
                    customval: $element.data("contentbox").settings.customval,
                    largerImageHandler: $element.data("contentbox").settings.largerImageHandler,
                    snippetCategories: $element.data("contentbox").settings.snippetCategories,
                    imageselect: $element.data("contentbox").settings.imageselect,
                    fileselect: $element.data("contentbox").settings.fileselect,
                    onDrop: $element.data("contentbox").settings.onDrop,
                    onImageSelectClick: $element.data("contentbox").settings.onImageSelectClick,
                    onFileSelectClick: $element.data("contentbox").settings.onFileSelectClick,
                    onImageBrowseClick: $element.data("contentbox").settings.onImageBrowseClick,
                    onImageSettingClick: $element.data("contentbox").settings.onImageSettingClick,
                    snippetPathReplace: $element.data("contentbox").settings.snippetPathReplace,
                    colors: $element.data("contentbox").settings.colors,
                    imageEmbed: $element.data("contentbox").settings.imageEmbed,
                    snippetPageSliding: $element.data("contentbox").settings.snippetPageSliding,
                    scrollHelper: $element.data("contentbox").settings.scrollHelper,
                    sourceEditor: $element.data("contentbox").settings.sourceEditor,
                    customTags: $element.data("contentbox").settings.customTags
                })
            });
            if ($element.children('div').not('.is-section').length == 0) {
                $element.append('<div style="height:1px"></div>')
            } else {
                $element.append('<div style="height:1px"></div>')
            }
            return sHtml
        };
        this.viewHtml = function (s) {
            var sHtml = this.html();
            jQuery("#md-view-html").css("max-width", "90%");
            jQuery("#md-view-html").css("height", "90%");
            jQuery("#md-view-html").simplemodal();
            jQuery("#md-view-html").data("simplemodal").show();
            jQuery('#inpViewHtml').val(sHtml);
            jQuery('.cmd-wrapper-html').unbind('click');
            jQuery('.cmd-wrapper-html').click(function () {
                $element.find('.is-builder').each(function () {
                    var $area = jQuery(this);
                    $area.data('contentbuilder').destroy();
                    $area.removeClass('ui-droppable');
                    $area.css('zoom', '');
                    $area.css('-moz-transform', '')
                });
                jQuery('.is-wrapper').html(jQuery('#inpViewHtml').val());
                $element.children().each(function () {
                    var $currentSection = jQuery(this);
                    if ($currentSection.hasClass('is-static')) return;
                    var snippetFile = $element.data("contentbox").settings.snippetFile;
                    var snippetOpen = $element.data("contentbox").settings.snippetOpen;
                    var contentRender = $element.data("contentbox").contentRender;
                    var iconselect = $element.data("contentbox").settings.iconselect;
                    var customval = $element.data("contentbox").settings.customval;
                    var largerImageHandler = $element.data("contentbox").settings.largerImageHandler;
                    var snippetCategories = $element.data("contentbox").settings.snippetCategories;
                    var imageselect = $element.data("contentbox").settings.imageselect;
                    var fileselect = $element.data("contentbox").settings.fileselect;
                    var onDrop = $element.data("contentbox").settings.onDrop;
                    var onImageSelectClick = $element.data("contentbox").settings.onImageSelectClick;
                    var onFileSelectClick = $element.data("contentbox").settings.onFileSelectClick;
                    var onImageBrowseClick = $element.data("contentbox").settings.onImageBrowseClick;
                    var onImageSettingClick = $element.data("contentbox").settings.onImageSettingClick;
                    var snippetPathReplace = $element.data("contentbox").settings.snippetPathReplace;
                    var colors = $element.data("contentbox").settings.colors;
                    var imageEmbed = $element.data("contentbox").settings.imageEmbed;
                    var snippetPageSliding = $element.data("contentbox").settings.snippetPageSliding;
                    var scrollHelper = $element.data("contentbox").settings.scrollHelper;
                    var sourceEditor = $element.data("contentbox").settings.sourceEditor;
                    var toolbar = $element.data("contentbox").settings.toolbar;
                    var customTags = $element.data("contentbox").settings.customTags;
                    $element.find('.is-builder').each(function () {
                        var Id = jQuery(this).attr('id');
                        jQuery('#' + Id).contentbuilder({
                            toolbar: toolbar,
                            snippetFile: snippetFile,
                            snippetOpen: snippetOpen,
                            iconselect: iconselect,
                            onRender: contentRender,
                            customval: customval,
                            largerImageHandler: largerImageHandler,
                            snippetCategories: snippetCategories,
                            imageselect: imageselect,
                            fileselect: fileselect,
                            onDrop: onDrop,
                            onImageSelectClick: onImageSelectClick,
                            onFileSelectClick: onFileSelectClick,
                            onImageBrowseClick: onImageBrowseClick,
                            onImageSettingClick: onImageSettingClick,
                            snippetPathReplace: snippetPathReplace,
                            snippetCategories: snippetCategories,
                            colors: colors,
                            imageEmbed: imageEmbed,
                            snippetPageSliding: snippetPageSliding,
                            scrollHelper: scrollHelper,
                            sourceEditor: sourceEditor,
                            customTags: customTags
                        })
                    });
                    $currentSection.append('<div class="is-section-tool">' + '<div class="is-section-edit"><i class="cb-icon-wrench"></i></div>' + '<div class="is-section-remove"><i class="cb-icon-cancel"></i></div>' + '</div>');
                    $currentSection.find(".is-section-edit").click(function () {
                        $activeSection = jQuery(this).parent().parent();
                        $element.data("contentbox").editSection()
                    });
                    $currentSection.find(".is-section-remove").click(function () {
                        jQuery("#md-delsectionconfirm").css("max-width", "550px");
                        jQuery("#md-delsectionconfirm").simplemodal();
                        jQuery("#md-delsectionconfirm").data("simplemodal").show();
                        $activeSection = jQuery(this).parent().parent();
                        jQuery("#btnDelSectionOk").unbind("click");
                        jQuery("#btnDelSectionOk").bind("click", function (e) {
                            $activeSection.fadeOut(400, function () {
                                if ($activeSection.find(".is-builder").html()) $activeSection.find(".is-builder").data("contentbuilder").destroy();
                                $activeSection.remove();
                                jQuery("#md-delsectionconfirm").data("simplemodal").hide()
                            });
                            return false
                        });
                        jQuery("#btnDelSectionCancel").unbind("click");
                        jQuery("#btnDelSectionCancel").bind("click", function (e) {
                            jQuery("#md-delsectionconfirm").data("simplemodal").hide();
                            return false
                        })
                    })
                });
                $element.data("contentbox").applyBoxBehavior();
                jQuery("#md-view-html").data("simplemodal").hide()
            });
            return false
        };
        this.boxImage = function (s) {
            jQuery("#lblWait").css("display", "none");
            var $overlay = $activeBox.find(".is-overlay");
            $overlay.find(".is-overlay-bg").css("background-image", "url(" + s + ")");
            $activeBox.css("background-color", "");
            if ($activeBox.find(".is-overlay-content .is-module").length == 0) {
                $overlay.find(".is-overlay-bg").css("display", "block")
            }
            $activeBox.removeClass("is-bg-light");
            $activeBox.removeClass("is-bg-grey");
            $activeBox.removeClass("is-bg-dark");
            var $overlaycolor = $overlay.find(".is-overlay-color");
            $overlaycolor.css("display", "block")
        };
        this.destroy = function () {
            if (!$element.data('contentbox')) return;
            var sHTML = $element.data('contentbox').html();
            $element.html(sHTML);
            $element.removeData('contentbox');
            $element.unbind()
        };
        this.init()
    };
    jQuery.fn.contentbox = function (options) {
        return this.each(function () {
            if (undefined == jQuery(this).data('contentbox')) {
                var plugin = new jQuery.contentbox(this, options);
                jQuery(this).data('contentbox', plugin)
            }
        })
    }
})(jQuery);

function applyBoxImage(s) {
    jQuery(".is-wrapper").data("contentbox").boxImage(s)
}