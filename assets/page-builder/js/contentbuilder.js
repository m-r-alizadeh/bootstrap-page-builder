﻿/*
ContentBuilder.js ver.1.9.4
*/
var cb_list = '';
var cb_edit = true;
var cb_snippetList = '#divSnippetList';
var cb_snippetPageSliding = false;
var oScripts = document.getElementsByTagName("script");
var sScriptPath ='assets/page-builder/';

var sc = document.createElement('script');
sc.src = sScriptPath + 'js/load-image.all.min.js';
document.getElementsByTagName('head')[0].appendChild(sc);
(function (jQuery) {
    var $activeRow;
    jQuery.contentbuilder = function (element, options) {
        var defaults = {
            zoom: '1',
            selectable: "h1,h2,h3,h4,h5,h6,p,blockquote,ul,ol,small,.edit,td,i",
            editMode: 'default',
            onRender: function () { },
            onDrop: function () { },
            onImageBrowseClick: function () { },
            onImageSettingClick: function () { },
            snippetFile: sScriptPath+ 'snippets.html',
            snippetPathReplace: ['', ''],
            hiquality: false,
            snippetTool: 'right',
            snippetOpen: false,
            snippetPageSliding: false,
            scrollHelper: false,
            snippetCategories: [
                [0, "Default"],
                [-1, "All"],
                [1, "Title"],
                [2, "Title, Subtitle"],
                [3, "Info, Title"],
                [4, "Info, Title, Subtitle"],
                [5, "Heading, Paragraph"],
                [6, "Paragraph"],
                [7, "Paragraph, Images + Caption"],
                [8, "Heading, Paragraph, Images + Caption"],
                [33, "Buttons"],
                [34, "Cards"],
                [9, "Images + Caption"],
                [10, "Images + Long Caption"],
                [11, "Images"],
                [12, "Single Image"],
                [13, "Call to Action"],
                [14, "List"],
                [15, "Quotes"],
                [16, "Profile"],
                [17, "Map"],
                [20, "Video"],
                [18, "Social"],
                [21, "Services"],
                [22, "Contact Info"],
                [23, "Pricing"],
                [24, "Team Profile"],
                [25, "Products/Portfolio"],
                [26, "How It Works"],
                [27, "Partners/Clients"],
                [28, "As Featured On"],
                [29, "Achievements"],
                [32, "Skills"],
                [30, "Coming Soon"],
                [31, "Page Not Found"],
                [19, "Separator"]
            ],
            imageselect: '',
            fileselect: '',
            onImageSelectClick: function () { },
            onFileSelectClick: function () { },
            iconselect: '',
            imageEmbed: true,
            sourceEditor: true,
            enableZoom: false,
            colors: ["#ffffc5", "#e9d4a7", "#ffd5d5", "#ffd4df", "#c5efff", "#b4fdff", "#c6f5c6", "#fcd1fe", "#ececec", "#f7e97a", "#d09f5e", "#ff8d8d", "#ff80aa", "#63d3ff", "#7eeaed", "#94dd95", "#ef97f3", "#d4d4d4", "#fed229", "#cc7f18", "#ff0e0e", "#fa4273", "#00b8ff", "#0edce2", "#35d037", "#d24fd7", "#888888", "#ff9c26", "#955705", "#c31313", "#f51f58", "#1b83df", "#0bbfc5", "#1aa71b", "#ae19b4", "#333333"],
            snippetList: '#divSnippetList',
            toolbar: 'top',
            toolbarDisplay: 'auto',
            axis: '',
            hideDragPreview: false,
            customval: 0,
            largerImageHandler: ''
        };
        this.settings = {};
        var $element = jQuery(element),
            element = element;
        this.init = function () {
            this.settings = jQuery.extend({}, defaults, options);
            if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
                this.settings.enableZoom = false
            }
            var is_edge = detectEdge();
            if (is_edge) {
                this.settings.enableZoom = false
            }
            if (!this.settings.enableZoom) {
                localStorage.removeItem("zoom");
                this.settings.zoom = 1;
                localStorage.zoom = 1
            }
            if (localStorage.getItem("zoom") != null) {
                this.settings.zoom = localStorage.zoom
            } else {
                localStorage.zoom = this.settings.zoom
            }
            $element.css('zoom', this.settings.zoom);
            $element.css('-moz-transform', 'scale(' + this.settings.zoom + ')');
            $element.addClass('connectSortable');
            this.settings.zoom = this.settings.zoom + '';
            if (this.settings.zoom.indexOf('%') != -1) {
                this.settings.zoom = this.settings.zoom.replace('%', '') / 100;
                localStorage.zoom = this.settings.zoom
            }
            if (this.settings.zoom == 'NaN') {
                this.settings.zoom = 1;
                localStorage.zoom = 1
            }
            if (cb_list == '') {
                cb_list = '#' + $element.attr('id')
            } else {
                cb_list = cb_list + ',#' + $element.attr('id')
            }
            cb_snippetList = this.settings.snippetList;
            cb_snippetPageSliding = this.settings.snippetPageSliding;
            $element.css({
                'min-height': '50px'
            });
            if (jQuery('#divCb').length == 0) {
                jQuery('body').append('<div id="divCb"></div>')
            }
            if (jQuery('#divSnippets').length == 0) {
                jQuery('#divCb').append('<div id="divSnippets" style="display:none"></div>');
                var html_catselect = '';
                for (var i = 0; i < this.settings.snippetCategories.length; i++) {
                    html_catselect += '<option value="' + this.settings.snippetCategories[i][0] + '">' + this.settings.snippetCategories[i][1] + '</option>'
                }
                html_catselect = '<select id="selSnips" class="form-control">' + html_catselect + '</select>';
                var s = '<div id="divTool">' + html_catselect + '<div id="divToolWait" style="position:absolute;top:0;left:0;width:100%;height:100%;display:table;background:rgba(255,255,255,0.2);z-index:1;">' + '<div style="display:table-cell;vertical-align:middle;text-align:center;background:rgb(217, 217, 217);"><div class="loading">' + '<div class="dot"></div>' + '<div class="dot"></div>' + '<div class="dot"></div>' + '</div></div>' + '</div>';
                s += '<div id="divSnippetList"></div>';
                s += '';
                s += '<br><div id="divRange"><input type="range" id="inpZoom" min="80" max="100" value="100"></div>';
                s += '';
                s += '<a id="lnkToolOpen" href="#"><i class="cb-icon-left-open-big" style="font-size: 15px;"></i></a></div>';
                s += '<div id="divSnippetScrollUp" style="display:none;background:rgba(0,0,0,0.3);width:45px;height:45px;line-height:45px;color:#eee;position:fixed;z-index:100000;text-align:center;font-size:12px;cursor:pointer;font-family:sans-serif;">&#9650;</div>' + '<div id="divSnippetScrollDown" style="display:none;background:rgba(0,0,0,0.3);width:45px;height:45px;line-height:45px;color:#eee;position:fixed;z-index:100000;text-align:center;font-size:12px;cursor:pointer;font-family:sans-serif;">&#9660;</div>';
                jQuery('#divCb').append(s);
                jQuery('#inpZoom').val(this.settings.zoom * 100);
                jQuery('#divCb input[type="range"]').rangeslider({
                    onSlide: function (position, value) { },
                    polyfill: false
                });
                var val = jQuery('#inpZoom').val() / 100;
                this.zoom(val);
                jQuery('#inpZoom').on('change', function () {
                    if ($element.data('contentbuilder').settings.enableZoom == true) {
                        var val = jQuery('#inpZoom').val() / 100;
                        $element.data('contentbuilder').zoom(val)
                    }
                });
                jQuery.get(this.settings.snippetFile, function (data) {
                    var htmlData = '';
                    var htmlThumbs = '';
                    var i = 1;
                    var bUseSnippetsFilter = false;
                    if ($element.data('contentbuilder').settings.snippetPathReplace[0] != '') {
                        var regex = new RegExp($element.data('contentbuilder').settings.snippetPathReplace[0], 'g');
                        data = data.replace(regex, $element.data('contentbuilder').settings.snippetPathReplace[1])
                    }
                    var $currentDataChildren = jQuery('<div/>').html(data).children('div');
                   
                    for (var i = 1; $currentDataChildren.length >= i; i++) {
                        var $this = jQuery($currentDataChildren[i - 1]);
                        var block = $this.html();
                        var blockEncoded = jQuery('<div/>').text(block).html();
                        htmlData += '<div id="snip' + i + '">' + blockEncoded + '</div>';
                        if ($this.data("cat") != null) bUseSnippetsFilter = true;
                        var thumb = $this.data("thumb");
                       
                        if (bUseSnippetsFilter) {
                            htmlThumbs += '<div style="display:none" title="Snippet ' + i + '" data-snip="' + i + '" data-cat="' + $this.data("cat") + '"><img src="' + thumb + '" /></div>'
                        } else {
                            htmlThumbs += '<div title="Snippet ' + i + '" data-snip="' + i + '" data-cat="' + $this.data("cat") + '"><img src="' + thumb + '" /></div>'
                        }
                    }
                    jQuery('#divSnippets').html(htmlData);
                    jQuery(cb_snippetList).html(htmlThumbs);
                    if (bUseSnippetsFilter) {
                        var cats = [];
                        var defaultExists = false;
                        var $cbSnippetListDivs = jQuery(cb_snippetList + ' > div');
                        for (var cbs = 0; $cbSnippetListDivs.length > cbs; cbs++) {
                            var $this = jQuery($cbSnippetListDivs[cbs]);
                            var catSplit = $this.attr('data-cat').split(',');
                            for (var j = 0; j < catSplit.length; j++) {
                                var catid = $this.attr('data-cat').split(',')[j];
                                if (catid == 0) {
                                    $this.fadeIn(400);
                                    defaultExists = true
                                }
                                if (jQuery.inArray(catid, cats) == -1) {
                                    cats.push(catid)
                                }
                            }
                        }
                        var $selSnips = jQuery('#selSnips');
                        var $selSnipsOption = jQuery('#selSnips option');
                        for (var sso = 0; $selSnipsOption.length > sso; sso++) {
                            var catid = jQuery($selSnipsOption[sso]).attr('value');
                            if (jQuery.inArray(catid, cats) == -1) {
                                if (catid != 0 && catid != -1) {
                                    $selSnips.find("[value='" + catid + "']").remove()
                                }
                            }
                        }
                        if (!defaultExists) {
                            jQuery(cb_snippetList + ' > div').css('display', 'block');
                            jQuery("#selSnips option[value='0']").remove()
                        }
                        jQuery('#selSnips').css('display', 'block');
                        jQuery("#selSnips").on("change", function (e) {
                            var optionSelected = jQuery("option:selected", this);
                            var valueSelected = this.value;
                            var $cbSnippetList = jQuery(cb_snippetList + ' > div');
                            if (valueSelected == '-1') {
                                $cbSnippetList.fadeIn(200)
                            } else {
                                $cbSnippetList.fadeOut(200, function () {
                                    var $this = jQuery(this);
                                    var $catSplit = $this.attr('data-cat').split(',');
                                    for (var j = 0; j < $catSplit.length; j++) {
                                        if (valueSelected == $catSplit[j]) {
                                            $this.fadeIn(400)
                                        }
                                    }
                                })
                            }
                        })
                    }
                    if (cb_snippetList == '#divSnippetList') {
                        if ($element.data('contentbuilder').settings.enableZoom) {
                            jQuery('#divSnippetList').css('margin-bottom', '-50px');
                            jQuery('#divSnippetList').css('border-bottom', 'rgba(0,0,0,0) 50px solid')
                        } else {
                            jQuery('#divRange').css('display', 'none')
                        }
                        if (bUseSnippetsFilter) {
                            jQuery('#divSnippetList').css('border-top', 'rgba(0,0,0,0) 5px solid')
                        }
                    }
                    $element.data('contentbuilder').applyDraggable();
                    jQuery('#divToolWait').remove()
                })
            } else {
                this.applyDraggable()
            }
            var maxScroll = 100000000;
            jQuery('#divSnippetScrollUp').css('display', 'none');
            jQuery('#divSnippetScrollUp').bind("click touchup", function () {
                jQuery("#divSnippetList").animate({
                    scrollTop: (jQuery("#divSnippetList").scrollTop() - (jQuery("#divSnippetList").height() - 150)) + "px"
                }, 300, function () {
                    if (jQuery("#divSnippetList").scrollTop() != 0) {
                        jQuery('#divSnippetScrollUp').fadeIn(300)
                    } else {
                        jQuery('#divSnippetScrollUp').fadeOut(300)
                    }
                    if (jQuery("#divSnippetList").scrollTop() != maxScroll) {
                        jQuery('#divSnippetScrollDown').fadeIn(300)
                    } else {
                        jQuery('#divSnippetScrollDown').fadeOut(300)
                    }
                });
                e.preventDefault();
                e.stopImmediatePropagation();
                return false
            });
            jQuery('#divSnippetScrollDown').bind("click touchup", function () {
                jQuery("#divSnippetList").animate({
                    scrollTop: (jQuery("#divSnippetList").scrollTop() + (jQuery("#divSnippetList").height() - 150)) + "px"
                }, 300, function () {
                    if (jQuery("#divSnippetList").scrollTop() != 0) {
                        jQuery('#divSnippetScrollUp').fadeIn(300)
                    } else {
                        jQuery('#divSnippetScrollUp').fadeOut(300)
                    }
                    if (maxScroll == 100000000) {
                        maxScroll = jQuery('#divSnippetList').prop('scrollHeight') - jQuery('#divSnippetList').height() - 10
                    }
                    if (jQuery("#divSnippetList").scrollTop() != maxScroll) {
                        jQuery('#divSnippetScrollDown').fadeIn(300)
                    } else {
                        jQuery('#divSnippetScrollDown').fadeOut(300)
                    }
                });
                e.preventDefault();
                e.stopImmediatePropagation();
                return false
            });
            $element.children("*").wrap("<div class='ui-draggable'></div>");
            $element.children("*").append('<div class="row-tool">' + '<div class="row-handle"><i class="cb-icon-move"></i></div>' + '<div class="row-html"><i class="cb-icon-code"></i></div>' + '<div class="row-copy"><i class="cb-icon-plus"></i></div>' + '<div class="row-remove"><i class="cb-icon-cancel"></i></div>' + '</div>');
            if (jQuery('#temp-contentbuilder').length == 0) {
                jQuery('#divCb').append('<div id="temp-contentbuilder" style="display: none"></div>')
            }
            var $window = jQuery(window);
            var windowsize = $window.width();
            var toolwidth = 260;
            if (windowsize < 600) {
                toolwidth = 150
            }
            if (windowsize <= 320) {
                $element.css("margin-left", "35px");
                $element.css("margin-right", "35px");
                $element.css("width", "80%")
            }
            var bUseScrollHelper = this.settings.scrollHelper;
            if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
                bUseScrollHelper = true
            }
            if (this.settings.snippetTool == 'right') {
                jQuery('#divSnippetScrollUp').css('right', '10px');
                jQuery('#divSnippetScrollDown').css('right', '10px');
                if (jQuery('#divTool').css('right') != '0px') {
                    jQuery('#divTool').css('width', toolwidth + 'px');
                    jQuery('#divTool').css('right', '-' + toolwidth + 'px')
                }
                jQuery("#lnkToolOpen").unbind('click');
                jQuery("#lnkToolOpen").click(function (e) {
                    jQuery('.row-tool').stop(true, true).fadeOut(0);
                    jQuery(".ui-draggable").removeClass('code');
                    jQuery(".ui-draggable").removeClass('ui-dragbox-outlined');
                    jQuery('#rte-toolbar').css('display', 'none');
                    jQuery('.rte-pop').css('display', 'none');
                    if (cb_snippetPageSliding || ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)))) {
                        if (parseInt(jQuery('#divTool').css('right')) == 0) {
                            jQuery('#divTool').animate({
                                right: '-=' + toolwidth + 'px'
                            }, 200);
                            jQuery('body').animate({
                                marginRight: '-=' + toolwidth + 'px'
                            }, 250);
                            jQuery('#rte-toolbar').animate({
                                paddingRight: '-=' + toolwidth + 'px'
                            }, 250);
                            jQuery('#lnkToolOpen i').attr('class', 'cb-icon-left-open-big');
                            jQuery('#divSnippetScrollUp').fadeOut(300);
                            jQuery('#divSnippetScrollDown').fadeOut(300)
                        } else {
                            jQuery('#divTool').animate({
                                right: '+=' + toolwidth + 'px'
                            }, 200);
                            jQuery('body').animate({
                                marginRight: '+=' + toolwidth + 'px'
                            }, 250);
                            jQuery('#rte-toolbar').animate({
                                paddingRight: '+=' + toolwidth + 'px'
                            }, 250);
                            jQuery('#lnkToolOpen i').attr('class', 'cb-icon-right-open-big');
                            if (bUseScrollHelper) {
                                var ypos = jQuery('#divSnippetList').height() / 2 - 60;
                                jQuery('#divSnippetScrollUp').css('top', ypos);
                                jQuery('#divSnippetScrollDown').css('top', ypos + 60);
                                if (jQuery("#divSnippetList").scrollTop() != 0) {
                                    jQuery('#divSnippetScrollUp').fadeIn(300)
                                } else {
                                    jQuery('#divSnippetScrollUp').fadeOut(300)
                                }
                                jQuery('#divSnippetScrollDown').fadeIn(300)
                            }
                        }
                        jQuery('#rte-toolbar').css('display', 'none')
                    } else {
                        if (parseInt(jQuery('#divTool').css('right')) == 0) {
                            jQuery('#divTool').animate({
                                right: '-=' + toolwidth + 'px'
                            }, 200);
                            jQuery('#lnkToolOpen i').attr('class', 'cb-icon-left-open-big');
                            jQuery('#divSnippetScrollUp').css('display', 'none');
                            jQuery('#divSnippetScrollDown').css('display', 'none')
                        } else {
                            jQuery('#divTool').animate({
                                right: '+=' + toolwidth + 'px'
                            }, 200);
                            jQuery('#lnkToolOpen i').attr('class', 'cb-icon-right-open-big');
                            if (bUseScrollHelper) {
                                var ypos = jQuery('#divSnippetList').height() / 2 - 60;
                                jQuery('#divSnippetScrollUp').css('top', ypos);
                                jQuery('#divSnippetScrollDown').css('top', ypos + 60);
                                if (jQuery("#divSnippetList").scrollTop() != 0) {
                                    jQuery('#divSnippetScrollUp').fadeIn(300)
                                } else {
                                    jQuery('#divSnippetScrollUp').fadeOut(300)
                                }
                                jQuery('#divSnippetScrollDown').fadeIn(300)
                            }
                        }
                    }
                    e.preventDefault()
                });
                jQuery('.row-tool').css('right', 'auto');
                if (windowsize < 600) {
                    jQuery('.row-tool').css('left', '-30px')
                } else {
                    jQuery('.row-tool').css('left', '-37px')
                }
                if (this.settings.snippetOpen) {
                    if (jQuery('#divTool').attr('data-snip-open') != 1) {
                        jQuery('#divTool').attr('data-snip-open', 1);
                        jQuery('#divTool').animate({
                            right: '+=' + toolwidth + 'px'
                        }, 900);
                        jQuery("#lnkToolOpen i").attr('class', 'cb-icon-right-open-big')
                    }
                }
            } else {
                jQuery("#lnkToolOpen i").attr('class', 'cb-icon-right-open-big');
                jQuery('#divSnippetScrollUp').css('left', '10px');
                jQuery('#divSnippetScrollDown').css('left', '10px');
                jQuery('#divTool').css('width', toolwidth + 'px');
                jQuery('#divTool').css('left', '-' + toolwidth + 'px');
                jQuery('#lnkToolOpen').addClass('leftside');
                jQuery("#lnkToolOpen").unbind('click');
                jQuery("#lnkToolOpen").click(function (e) {
                    jQuery('.row-tool').stop(true, true).fadeOut(0);
                    jQuery(".ui-draggable").removeClass('code');
                    jQuery(".ui-draggable").removeClass('ui-dragbox-outlined');
                    jQuery('#rte-toolbar').css('display', 'none');
                    jQuery('.rte-pop').css('display', 'none');
                    if (cb_snippetPageSliding || ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)))) {
                        if (parseInt(jQuery('#divTool').css('left')) == 0) {
                            jQuery('#divTool').animate({
                                left: '-=' + (toolwidth + 0) + 'px'
                            }, 200);
                            jQuery('body').animate({
                                marginLeft: '-=' + toolwidth + 'px'
                            }, 250);
                            jQuery('#rte-toolbar').animate({
                                paddingLeft: '-=' + toolwidth + 'px'
                            }, 250);
                            jQuery("#lnkToolOpen i").attr('class', 'cb-icon-right-open-big');
                            jQuery('#divSnippetScrollUp').fadeOut(300);
                            jQuery('#divSnippetScrollDown').fadeOut(300)
                        } else {
                            jQuery('#divTool').animate({
                                left: '+=' + (toolwidth + 0) + 'px'
                            }, 200);
                            jQuery('body').animate({
                                marginLeft: '+=' + toolwidth + 'px'
                            }, 250);
                            jQuery('#rte-toolbar').animate({
                                paddingLeft: '+=' + toolwidth + 'px'
                            }, 250);
                            jQuery("#lnkToolOpen i").attr('class', 'cb-icon-left-open-big');
                            if (bUseScrollHelper) {
                                var ypos = jQuery('#divSnippetList').height() / 2 - 60;
                                jQuery('#divSnippetScrollUp').css('top', ypos);
                                jQuery('#divSnippetScrollDown').css('top', ypos + 60);
                                if (jQuery("#divSnippetList").scrollTop() != 0) {
                                    jQuery('#divSnippetScrollUp').fadeIn(300)
                                } else {
                                    jQuery('#divSnippetScrollUp').fadeOut(300)
                                }
                                jQuery('#divSnippetScrollDown').fadeIn(300)
                            }
                        }
                        jQuery('#rte-toolbar').css('display', 'none');
                        jQuery('.rte-pop').css('display', 'none')
                    } else {
                        if (parseInt(jQuery('#divTool').css('left')) == 0) {
                            jQuery('#divTool').animate({
                                left: '-=' + (toolwidth + 0) + 'px'
                            }, 200);
                            jQuery("#lnkToolOpen i").attr('class', 'cb-icon-right-open-big');
                            jQuery('#divSnippetScrollUp').css('display', 'none');
                            jQuery('#divSnippetScrollDown').css('display', 'none')
                        } else {
                            jQuery('#divTool').animate({
                                left: '+=' + (toolwidth + 0) + 'px'
                            }, 200);
                            jQuery("#lnkToolOpen i").attr('class', 'cb-icon-left-open-big');
                            if (bUseScrollHelper) {
                                var ypos = jQuery('#divSnippetList').height() / 2 - 60;
                                jQuery('#divSnippetScrollUp').css('top', ypos);
                                jQuery('#divSnippetScrollDown').css('top', ypos + 60);
                                if (jQuery("#divSnippetList").scrollTop() != 0) {
                                    jQuery('#divSnippetScrollUp').fadeIn(300)
                                } else {
                                    jQuery('#divSnippetScrollUp').fadeOut(300)
                                }
                                jQuery('#divSnippetScrollDown').fadeIn(300)
                            }
                        }
                    }
                    e.preventDefault()
                });
                jQuery('.row-tool').css('left', 'auto');
                if (windowsize < 600) {
                    jQuery('.row-tool').css('right', '-30px')
                } else {
                    jQuery('.row-tool').css('right', '-37px')
                }
                if (this.settings.snippetOpen) {
                    if (jQuery('#divTool').attr('data-snip-open') != 1) {
                        jQuery('#divTool').attr('data-snip-open', 1);
                        jQuery('#divTool').animate({
                            left: '+=' + toolwidth + 'px'
                        }, 900);
                        jQuery("#lnkToolOpen i").attr('class', 'cb-icon-left-open-big')
                    }
                }
            }
            this.applyBehavior();
            this.blockChanged();
            this.settings.onRender();
            $element.sortable({
                helper: function (event, ui) {
                    var $clone = jQuery(ui).clone();
                    $clone.css('position', 'absolute');
                    $clone.addClass('cloned-handler');
                    if ($element.data('contentbuilder').settings.zoom == 1 && $element.data('contentbuilder').settings.axis == '') {
                        if (!$clone.parent().is('body')) {
                            $clone.appendTo(jQuery('body'))
                        }
                    }
                    return $clone.get(0)
                },
                sort: function (event, ui) {
                    if ($element.data('contentbuilder').settings.hideDragPreview) {
                        ui.helper.css({
                            'display': 'none'
                        })
                    }
                },
                items: '.ui-draggable',
                connectWith: '.connectSortable',
                'distance': 5,
                tolerance: 'pointer',
                handle: '.row-handle',
                delay: 200,
                cursor: 'move',
                placeholder: 'block-placeholder',
                start: function (e, ui) {
                    jQuery(ui.placeholder).hide();
                    jQuery(ui.placeholder).slideUp(80);
                    cb_edit = false
                },
                change: function (e, ui) {
                    jQuery(ui.placeholder).hide().slideDown(80)
                },
                beforeStop: function (e, ui) {
                    jQuery(ui.placeholder).hide()
                },
                deactivate: function (event, ui) {
                    jQuery(".cloned-handler").remove();
                    if (!$element.data('contentbuilder')) return;
                    cb_edit = true;
                    var bDrop = false;
                    if (ui.item.find('.row-tool').length == 0) {
                        bDrop = true
                    }
                    if (ui.item.parent().attr('id') == $element.attr('id')) {
                        ui.item.replaceWith(ui.item.html());
                        var nItm = jQuery(ui.item.html());
                        ui.item.replaceWith(nItm);
                        ui.item = nItm;
                        $element.children("*").each(function () {
                            if (!jQuery(this).hasClass('ui-draggable')) {
                                jQuery(this).wrap("<div class='ui-draggable'></div>")
                            }
                        });
                        $element.children('.ui-draggable').each(function () {
                            if (jQuery(this).find('.row-tool').length == 0) {
                                jQuery(this).append('<div class="row-tool">' + '<div class="row-handle"><i class="cb-icon-move"></i></div>' + '<div class="row-html"><i class="cb-icon-code"></i></div>' + '<div class="row-copy"><i class="cb-icon-plus"></i></div>' + '<div class="row-remove"><i class="cb-icon-cancel"></i></div>' + '</div>')
                            }
                        });
                        $element.children('.ui-draggable').each(function () {
                            if (jQuery(this).children('*').length == 1) {
                                jQuery(this).remove()
                            }
                            if (jQuery(this).children('*').length == 2) {
                                if (jQuery(this).children(0).prop("tagName").toLowerCase() == 'img' && jQuery(this).children(0).attr('src').indexOf('thumbnails/') != -1) {
                                    jQuery(this).remove()
                                }
                            }
                        });
                        $element.data('contentbuilder').settings.onDrop(event, ui)
                    } else { }
                    $element.data('contentbuilder').applyBehavior();
                    $element.data('contentbuilder').blockChanged();
                    $element.data('contentbuilder').settings.onRender()
                }
            });
            if (cb_list.indexOf(',') != -1) {
                jQuery(cb_list).sortable('option', 'axis', false)
            }
            if (this.settings.axis != '') {
                jQuery(cb_list).sortable('option', 'axis', this.settings.axis)
            }
            jQuery.ui.isOverAxis2 = function (x, reference, size) {
                return (x >= reference) && (x < (reference + size))
            };
            jQuery.ui.isOver = function (y, x, top, left, height, width) {
                return jQuery.ui.isOverAxis2(y, top, height) && jQuery.ui.isOverAxis(x, left, width)
            };
            $element.droppable({
                drop: function (event, ui) {
                    if (jQuery(ui.draggable).data('snip')) {
                        var snip = jQuery(ui.draggable).data('snip');
                        var snipHtml = jQuery('#snip' + snip).text();
                        jQuery(ui.draggable).data('snip', null);
                        return ui.draggable.html(snipHtml);
                        event.preventDefault()
                    }
                },
                tolerance: 'pointer',
                greedy: true,
                hoverClass: 'drop-zone',
                activeClass: 'drop-zone',
                deactivate: function (event, ui) {
                    jQuery(cb_list).each(function () {
                        var $cb = jQuery(this);
                        $cb.children('.ui-draggable').each(function () {
                            if (jQuery(this).find('.row-tool').length == 0) {
                                jQuery(this).append('<div class="row-tool">' + '<div class="row-handle"><i class="cb-icon-move"></i></div>' + '<div class="row-html"><i class="cb-icon-code"></i></div>' + '<div class="row-copy"><i class="cb-icon-plus"></i></div>' + '<div class="row-remove"><i class="cb-icon-cancel"></i></div>' + '</div>')
                            }
                        });
                        $cb.data('contentbuilder').applyBehavior()
                    })
                }
            });
            jQuery(document).bind('mousedown', function (event) {
                var $active_element;
                if (jQuery(event.target).parents(".ui-draggable").length > 0) {
                    if (jQuery(event.target).parents(".ui-draggable").parent().data('contentbuilder')) {
                        $active_element = jQuery(event.target).parents(".ui-draggable").parent()
                    }
                }
                if (jQuery(event.target).attr("class") == 'ovl') {
                    jQuery(event.target).css('z-index', '-1')
                }
                if (jQuery(event.target).parents('.ui-draggable').length > 0 && jQuery(event.target).parents(cb_list).length > 0) {
                    var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                    jQuery(".ui-draggable").removeClass('code');
                    if (jQuery(event.target).parents("[data-mode='code']").length > 0) {
                        jQuery(event.target).parents(".ui-draggable").addClass('code')
                    }
                    if (jQuery(event.target).parents("[data-mode='readonly']").length > 0) {
                        jQuery(event.target).parents(".ui-draggable").addClass('code')
                    }
                    jQuery(".ui-draggable").removeClass('ui-dragbox-outlined');
                    jQuery(event.target).parents(".ui-draggable").addClass('ui-dragbox-outlined');
                    if (is_firefox) jQuery(event.target).parents(".ui-draggable").addClass('firefox');
                    jQuery('.row-tool').stop(true, true).fadeOut(0);
                    if ($active_element) {
                        if (jQuery(event.target).parents(".ui-draggable").find("[data-html-edit='off']").length > 0 || !$active_element.data('contentbuilder').settings.sourceEditor) {
                            jQuery(event.target).parents(".ui-draggable").find('.row-tool .row-html').css({
                                display: 'none'
                            })
                        }
                    }
                    jQuery(event.target).parents(".ui-draggable").find('.row-tool').stop(true, true).css({
                        display: 'none'
                    }).fadeIn(300);
                    return
                }
                if (jQuery(event.target).parent().attr('id') == 'rte-toolbar' || jQuery(event.target).parent().parent().attr('id') == 'rte-toolbar' || jQuery(event.target).parent().hasClass('rte-pop') || jQuery(event.target).parent().parent().hasClass('rte-pop')) {
                    return
                }
                if (jQuery(event.target).is('[contenteditable]') || jQuery(event.target).css('position') == 'absolute' || jQuery(event.target).css('position') == 'fixed') {
                    return
                }
                jQuery(event.target).parents().each(function (e) {
                    if (jQuery(this).is('[contenteditable]') || jQuery(this).css('position') == 'absolute' || jQuery(this).css('position') == 'fixed') {
                        return
                    }
                });
                jQuery('.row-tool').stop(true, true).fadeOut(0);
                jQuery(".ui-draggable").removeClass('code');
                jQuery(".ui-draggable").removeClass('ui-dragbox-outlined');
                jQuery('#rte-toolbar').css('display', 'none');
                jQuery('.rte-pop').css('display', 'none')
            })
        };
        this.applyDraggable = function (obj) {
            var bJUIStable = false;
            if (jQuery.ui.version == '1.11.0') {
                bJUIStable = true
            }
            if (bJUIStable) {
                jQuery(cb_snippetList + ' > div').draggable({
                    cursor: 'move',
                    helper: function () {
                        return jQuery("<div class='dynamic'></div>")[0]
                    },
                    delay: 200,
                    connectToSortable: cb_list,
                    stop: function (event, ui) {
                        jQuery(cb_list).each(function () {
                            var $cb = jQuery(this);
                            $cb.children("div").each(function () {
                                if (jQuery(this).children("img").length == 1) {
                                    jQuery(this).remove()
                                }
                            })
                        })
                    }
                })
            } else {
                jQuery(cb_snippetList + ' > div').draggable({
                    cursor: 'move',
                    helper: "clone",
                    drag: function (event, ui) {
                        jQuery(ui.helper).css("overflow", "hidden");
                        jQuery(ui.helper).css("padding-top", "60px");
                        jQuery(ui.helper).css("box-sizing", "border-box");
                        jQuery(ui.helper).css("width", "150px");
                        jQuery(ui.helper).css("height", "60px");
                        jQuery(ui.helper).css("border", "rgba(225,225,225,0.9) 5px solid");
                        jQuery(ui.helper).css("background", "rgba(225,225,225,0)");
                        if ($element.data('contentbuilder').settings.zoom != 1) {
                            jQuery(ui.helper).css('position', 'absolute');
                            if (!ui.helper.parent().is('body')) {
                                ui.helper.appendTo(jQuery('body'))
                            }
                        }
                    },
                    connectToSortable: cb_list,
                    stop: function (event, ui) {
                        jQuery(cb_list).each(function () {
                            var $cb = jQuery(this);
                            $cb.children("div").each(function () {
                                if (jQuery(this).children("img").length == 1) {
                                    jQuery(this).remove()
                                }
                            })
                        })
                    }
                })
            }
        };
        this.html = function () {
            var selectable = this.settings.selectable;
            jQuery('#temp-contentbuilder').html($element.html());
            jQuery('#temp-contentbuilder').find('.row-tool').remove();
            jQuery('#temp-contentbuilder').find('.ovl').remove();
            jQuery('#temp-contentbuilder').find('[contenteditable]').removeAttr('contenteditable');
            jQuery('*[class=""]').removeAttr('class');
            jQuery('#temp-contentbuilder').find('.ui-draggable').replaceWith(function () {
                return jQuery(this).html()
            });
            jQuery("#temp-contentbuilder").find("[data-mode='code']").each(function () {
                if (jQuery(this).attr("data-html") != undefined) {
                    jQuery(this).html(decodeURIComponent(jQuery(this).attr("data-html")))
                }
            });
            var html = jQuery('#temp-contentbuilder').html().trim();
            html = html.replace(/<font/g, '<span').replace(/<\/font/g, '</span');
            return html
        };
        this.zoom = function (n) {
            this.settings.zoom = n;
            jQuery(cb_list).css('zoom', n);
            jQuery(cb_list).css('-moz-transform', 'scale(' + n + ')');
            localStorage.zoom = n;
            jQuery('.row-tool').stop(true, true).fadeOut(0);
            jQuery(".ui-draggable").removeClass('code');
            jQuery(".ui-draggable").removeClass('ui-dragbox-outlined');
            jQuery('#rte-toolbar').css('display', 'none');
            jQuery('.rte-pop').css('display', 'none')
        };
        this.clearControls = function () {
            jQuery('.row-tool').stop(true, true).fadeOut(0);
            jQuery(".ui-draggable").removeClass('code');
            jQuery(".ui-draggable").removeClass('ui-dragbox-outlined');
            var selectable = this.settings.selectable;
            $element.find(selectable).blur()
        };
        this.viewHtml = function () {
            jQuery('#md-html').css('width', '45%');
            jQuery('#md-html').simplemodal();
            jQuery('#md-html').data('simplemodal').show();
            jQuery('#txtHtml').val(this.html());
            jQuery('#btnHtmlOk').unbind('click');
            jQuery('#btnHtmlOk').bind('click', function (e) {
                $element.html(jQuery('#txtHtml').val());
                jQuery('#md-html').data('simplemodal').hide();
                $element.children("*").wrap("<div class='ui-draggable'></div>");
                $element.children("*").append('<div class="row-tool">' + '<div class="row-handle"><i class="cb-icon-move"></i></div>' + '<div class="row-html"><i class="cb-icon-code"></i></div>' + '<div class="row-copy"><i class="cb-icon-plus"></i></div>' + '<div class="row-remove"><i class="cb-icon-cancel"></i></div>' + '</div>');
                $element.data('contentbuilder').applyBehavior();
                $element.data('contentbuilder').blockChanged();
                $element.data('contentbuilder').settings.onRender()
            })
        };
        this.loadHTML = function (html) {
            $element.html(html);
            $element.children("*").wrap("<div class='ui-draggable'></div>");
            $element.children("*").append('<div class="row-tool">' + '<div class="row-handle"><i class="cb-icon-move"></i></div>' + '<div class="row-html"><i class="cb-icon-code"></i></div>' + '<div class="row-copy"><i class="cb-icon-plus"></i></div>' + '<div class="row-remove"><i class="cb-icon-cancel"></i></div>' + '</div>');
            $element.data('contentbuilder').applyBehavior();
            $element.data('contentbuilder').blockChanged();
            $element.data('contentbuilder').settings.onRender()
        };
        this.applyBehavior = function () {
            $element.find('a').click(function () {
                return false
            });
            $element.find("[data-mode='code']").each(function () {
                if (jQuery(this).attr("data-html") != undefined) {
                    jQuery(this).html(decodeURIComponent(jQuery(this).attr("data-html")))
                }
            });
            var selectable = this.settings.selectable;
            var hq = this.settings.hiquality;
            var imageEmbed = this.settings.imageEmbed;
            var colors = this.settings.colors;
            var editMode = this.settings.editMode;
            var toolbar = this.settings.toolbar;
            var toolbarDisplay = this.settings.toolbarDisplay;
            var onImageSelectClick = this.settings.onImageSelectClick;
            var onFileSelectClick = this.settings.onFileSelectClick;
            var onImageBrowseClick = this.settings.onImageBrowseClick;
            var onImageSettingClick = this.settings.onImageSettingClick;
            var imageselect = this.settings.imageselect;
            var fileselect = this.settings.fileselect;
            var iconselect = this.settings.iconselect;
            var customval = this.settings.customval;
            var largerImageHandler = this.settings.largerImageHandler;
            $element.contenteditor({
                fileselect: fileselect,
                iconselect: iconselect,
                editable: selectable,
                colors: colors,
                editMode: editMode,
                toolbar: toolbar,
                toolbarDisplay: toolbarDisplay,
                onFileSelectClick: onFileSelectClick
            });
            $element.data('contenteditor').render();
            $element.find('img').each(function () {
                if (jQuery(this).parents("[data-mode='code']").length > 0) return;
                if (jQuery(this).parents("[data-mode='readonly']").length > 0) return;
                jQuery(this).imageembed({
                    hiquality: hq,
                    imageselect: imageselect,
                    fileselect: fileselect,
                    imageEmbed: imageEmbed,
                    onImageBrowseClick: onImageBrowseClick,
                    onImageSettingClick: onImageSettingClick,
                    onImageSelectClick: onImageSelectClick,
                    onFileSelectClick: onFileSelectClick,
                    largerImageHandler: largerImageHandler,
                    customval: customval
                });
                if (jQuery(this).parents('figure').length != 0) {
                    if (jQuery(this).parents('figure').find('figcaption').css('position') == 'absolute') {
                        jQuery(this).parents('figure').imageembed({
                            hiquality: hq,
                            imageselect: imageselect,
                            fileselect: fileselect,
                            imageEmbed: imageEmbed,
                            onImageBrowseClick: onImageBrowseClick,
                            onImageSettingClick: onImageSettingClick,
                            onImageSelectClick: onImageSelectClick,
                            onFileSelectClick: onFileSelectClick,
                            largerImageHandler: largerImageHandler,
                            customval: customval
                        })
                    }
                }
            });
            $element.find(".embed-responsive").each(function () {
                if (jQuery(this).parents("[data-mode='code']").length > 0) return;
                if (jQuery(this).parents("[data-mode='readonly']").length > 0) return;
                if (jQuery(this).find('.ovl').length == 0) {
                    jQuery(this).append('<div class="ovl" style="position:absolute;background:#fff;opacity:0.2;cursor:pointer;top:0;left:0px;width:100%;height:100%;z-index:-1"></div>')
                }
            });
            $element.find(".embed-responsive").hover(function () {
                if (jQuery(this).parents("[data-mode='code']").length > 0) return;
                if (jQuery(this).parents("[data-mode='readonly']").length > 0) return;
                if (jQuery(this).parents(".ui-draggable").css('outline-style') == 'none') {
                    jQuery(this).find('.ovl').css('z-index', '1')
                }
            }, function () {
                jQuery(this).find('.ovl').css('z-index', '-1')
            });
            $element.find(selectable).unbind('focus');
            $element.find(selectable).focus(function () {
                var zoom = $element.data('contentbuilder').settings.zoom;
                var selectable = $element.data('contentbuilder').settings.selectable;
                var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                jQuery(".ui-draggable").removeClass('code');
                if (jQuery(this).parents("[data-mode='code']").length > 0) {
                    jQuery(this).parents(".ui-draggable").addClass('code')
                }
                if (jQuery(this).parents("[data-mode='readonly']").length > 0) {
                    jQuery(this).parents(".ui-draggable").addClass('code')
                }
                jQuery(".ui-draggable").removeClass('ui-dragbox-outlined');
                jQuery(this).parents(".ui-draggable").addClass('ui-dragbox-outlined');
                if (is_firefox) jQuery(this).parents(".ui-draggable").addClass('firefox');
                jQuery('.row-tool').stop(true, true).fadeOut(0);
                if (jQuery(this).parents(".ui-draggable").find("[data-html-edit='off']").length > 0 || !$element.data('contentbuilder').settings.sourceEditor) {
                    jQuery(this).parents(".ui-draggable").find('.row-tool .row-html').css({
                        display: 'none'
                    })
                }
                jQuery(this).parents(".ui-draggable").find('.row-tool').stop(true, true).css({
                    display: 'none'
                }).fadeIn(300)
            });
            $element.children("div").find('.row-remove').unbind();
            $element.children("div").find('.row-remove').click(function () {
                jQuery('#md-delrowconfirm').css('max-width', '550px');
                jQuery('#md-delrowconfirm').simplemodal();
                jQuery('#md-delrowconfirm').data('simplemodal').show();
                $activeRow = jQuery(this).parents('.ui-draggable');
                jQuery('#btnDelRowOk').unbind('click');
                jQuery('#btnDelRowOk').bind('click', function (e) {
                    jQuery('#md-delrowconfirm').data('simplemodal').hide();
                    $activeRow.fadeOut(400, function () {
                        jQuery("#divToolImg").stop(true, true).fadeOut(0);
                        jQuery("#divToolImgSettings").stop(true, true).fadeOut(0);
                        jQuery("#divRteLink").stop(true, true).fadeOut(0);
                        jQuery("#divFrameLink").stop(true, true).fadeOut(0);
                        $activeRow.remove();
                        $element.data('contentbuilder').blockChanged();
                        $element.data('contentbuilder').settings.onRender()
                    })
                });
                jQuery('#btnDelRowCancel').unbind('click');
                jQuery('#btnDelRowCancel').bind('click', function (e) {
                    jQuery('#md-delrowconfirm').data('simplemodal').hide()
                })
            });
            $element.children("div").find('.row-copy').unbind();
            $element.children("div").find('.row-copy').click(function () {
                $activeRow = jQuery(this).parents('.ui-draggable');
                jQuery('#temp-contentbuilder').html($activeRow.html());
                jQuery('#temp-contentbuilder').find('[contenteditable]').removeAttr('contenteditable');
                jQuery('#temp-contentbuilder *[class=""]').removeAttr('class');
                jQuery('#temp-contentbuilder *[style=""]').removeAttr('style');
                jQuery('#temp-contentbuilder .ovl').remove();
                jQuery('#temp-contentbuilder .row-tool').remove();
                var html = jQuery('#temp-contentbuilder').html().trim();
                $activeRow.after(html);
                $element.children("*").each(function () {
                    if (!jQuery(this).hasClass('ui-draggable')) {
                        jQuery(this).wrap("<div class='ui-draggable'></div>")
                    }
                });
                $element.children('.ui-draggable').each(function () {
                    if (jQuery(this).find('.row-tool').length == 0) {
                        jQuery(this).append('<div class="row-tool">' + '<div class="row-handle"><i class="cb-icon-move"></i></div>' + '<div class="row-html"><i class="cb-icon-code"></i></div>' + '<div class="row-copy"><i class="cb-icon-plus"></i></div>' + '<div class="row-remove"><i class="cb-icon-cancel"></i></div>' + '</div>')
                    }
                });
                $element.children('.ui-draggable').each(function () {
                    if (jQuery(this).children('*').length == 1) {
                        jQuery(this).remove()
                    }
                });
                $element.data('contentbuilder').applyBehavior();
                $element.data('contentbuilder').blockChanged();
                $element.data('contentbuilder').settings.onRender()
            });
            $element.children("div").find('.row-html').unbind();
            $element.children("div").find('.row-html').click(function () {
                jQuery('#md-html').css('width', '45%');
                jQuery('#md-html').simplemodal();
                jQuery('#md-html').data('simplemodal').show();
                $activeRow = jQuery(this).parents('.ui-draggable').children('*').not('.row-tool');
                if ($activeRow.data('mode') == 'code' && $activeRow.attr('data-html') != undefined) {
                    jQuery('#txtHtml').val(decodeURIComponent($activeRow.attr('data-html')))
                } else {
                    jQuery('#temp-contentbuilder').html($activeRow.html());
                    jQuery('#temp-contentbuilder').find('[contenteditable]').removeAttr('contenteditable');
                    jQuery('#temp-contentbuilder *[class=""]').removeAttr('class');
                    jQuery('#temp-contentbuilder *[style=""]').removeAttr('style');
                    jQuery('#temp-contentbuilder .ovl').remove();
                    var html = jQuery('#temp-contentbuilder').html().trim();
                    html = html.replace(/<font/g, '<span').replace(/<\/font/g, '</span');
                    jQuery('#txtHtml').val(html)
                }
                jQuery('#btnHtmlOk').unbind('click');
                jQuery('#btnHtmlOk').bind('click', function (e) {
                    if ($activeRow.data('mode') == 'code') {
                        $activeRow.attr('data-html', encodeURIComponent(jQuery('#txtHtml').val()));
                        $activeRow.html('')
                    } else {
                        $activeRow.html(jQuery('#txtHtml').val())
                    }
                    jQuery('#md-html').data('simplemodal').hide();
                    $element.data('contentbuilder').applyBehavior();
                    $element.data('contentbuilder').blockChanged();
                    $element.data('contentbuilder').settings.onRender()
                })
            })
        };
        this.blockChanged = function () {
            if ($element.children().length == 0) {
                $element.addClass('empty')
            } else {
                $element.removeClass('empty')
            }
        };
        this.destroy = function () {
            if (!$element.data('contentbuilder')) return;
            var sHTML = $element.data('contentbuilder').html();
            $element.html(sHTML);
            $element.sortable("destroy");
            var cbarr = cb_list.split(","),
                newcbarr = [];
            for (var i = 0; i < cbarr.length; i++) {
                if (cbarr[i] != "#" + $element.attr("id")) {
                    newcbarr.push(cbarr[i])
                }
            }
            cb_list = newcbarr.join(",");
            $element.removeClass('connectSortable');
            $element.css({
                'min-height': ''
            });
            if (cb_list == "") {
                jQuery('#divCb').remove();
                jQuery(document).unbind('mousedown')
            }
            $element.removeData('contentbuilder');
            $element.removeData('contenteditor');
            $element.unbind()
        };
        this.init()
    };
    jQuery.fn.contentbuilder = function (options) {
        return this.each(function () {
            if (undefined == jQuery(this).data('contentbuilder')) {
                var plugin = new jQuery.contentbuilder(this, options);
                jQuery(this).data('contentbuilder', plugin)
            }
        })
    }
})(jQuery);
var ce_toolbarDisplay = 'auto';
var ce_outline = false;
(function (jQuery) {
    var $activeLink;
    var $activeElement;
    var $activeFrame;
    var instances = [];

    function instances_count() { };
    jQuery.fn.count = function () { };
    jQuery.contenteditor = function (element, options) {
        var defaults = {
            editable: "h1,h2,h3,h4,h5,h6,p,ul,ol,small,.edit,td",
            editMode: "default",
            hasChanged: false,
            onRender: function () { },
            outline: false,
            fileselect: '',
            iconselect: '',
            onFileSelectClick: function () { },
            toolbar: 'top',
            toolbarDisplay: 'auto',
            colors: ["#ffffc5", "#e9d4a7", "#ffd5d5", "#ffd4df", "#c5efff", "#b4fdff", "#c6f5c6", "#fcd1fe", "#ececec", "#f7e97a", "#d09f5e", "#ff8d8d", "#ff80aa", "#63d3ff", "#7eeaed", "#94dd95", "#ef97f3", "#d4d4d4", "#fed229", "#cc7f18", "#ff0e0e", "#fa4273", "#00b8ff", "#0edce2", "#35d037", "#d24fd7", "#888888", "#ff9c26", "#955705", "#c31313", "#f51f58", "#1b83df", "#0bbfc5", "#1aa71b", "#ae19b4", "#333333"]
        };
        this.settings = {};
        var $element = jQuery(element),
            element = element;
        this.init = function () {
            this.settings = jQuery.extend({}, defaults, options);
            var bUseCustomFileSelect = false;
            if (this.settings.fileselect != '') bUseCustomFileSelect = true;
            var sFunc = (this.settings.onFileSelectClick + '').replace(/\s/g, '');
            if (sFunc != 'function(){}') {
                bUseCustomFileSelect = true
            }
            if (jQuery('#divCb').length == 0) {
                jQuery('body').append('<div id="divCb"></div>')
            }
            ce_toolbarDisplay = this.settings.toolbarDisplay;
            ce_outline = this.settings.outline;
            var toolbar_attr = '';
            if (this.settings.toolbar == 'left') toolbar_attr = ' class="rte-side"';
            if (this.settings.toolbar == 'right') toolbar_attr = ' class="rte-side right"';
            var icon_button = '';
            if (this.settings.iconselect != '') icon_button = '<button data-rte-cmd="icon" title="Icon"> <i class="cb-icon-smile"></i> </button>';
            var html_rte = '<div id="rte-toolbar"' + toolbar_attr + '>' +
                '<button href="#" data-rte-cmd="bold" title="درشت"> <i class="cb-icon-bold"></i> </button>' +
                '<button data-rte-cmd="italic" title="خمیده"> <i class="cb-icon-italic"></i> </button>' +
                '<button data-rte-cmd="underline" title="زیرخط‌دار"> <i class="cb-icon-underline"></i> </button>' +
                '<button data-rte-cmd="strikethrough" title="خط‌خورده"> <i class="cb-icon-strike"></i> </button>' +
                '<button data-rte-cmd="color" title="رنگ"> <i class="cb-icon-color"></i> </button>' +
                '<button data-rte-cmd="fontsize" title="اندازه قلم"> <i class="cb-icon-fontsize"></i> </button>' +
                '<button data-rte-cmd="removeFormat" title="برداشتن فرمت"> <i class="cb-icon-eraser"></i> </button>' +
                '<button data-rte-cmd="formatPara" title="بند"> <i class="cb-icon-header"></i> </button>' +
                '<button data-rte-cmd="font" title="قلم"> <i class="cb-icon-font"></i> </button>' +
                '<button data-rte-cmd="align" title="چینش"> <i class="cb-icon-align-justify"></i> </button>' +
                '<button data-rte-cmd="list" title="فهرست"> <i class="cb-icon-list-bullet"></i> </button>' +
                '<button data-rte-cmd="createLink" title="پیوند"> <i class="cb-icon-link"></i> </button>' +
                '<button data-rte-cmd="unlink" title="برداشتن پیوند"> <i class="cb-icon-unlink"></i> </button>' + icon_button +
                '<button data-rte-cmd="html" title="HTML"> <i class="cb-icon-code"></i> </button>' + '</div>' + '' + '<div id="divRteLink">' +
                '<i class="cb-icon-link"></i> ویرایش پیوند' + '</div>' + '' +
                '<div id="divFrameLink">' + '<i class="cb-icon-link"></i> ویرایش پیوند' + '</div>' + '' +
                '<div class="md-modal" id="md-createlink">' +

                '<div class="md-content">' + '<div class="md-body">' +
                '<div class="md-label">پیوند:</div>' +
                (bUseCustomFileSelect ?
                '<input type="text" id="txtLink" class="inptxt ltr" style="float:right;width:50%;" value="http:/' +
                '/"></input><i class="cb-icon-link md-btnbrowse" id="btnLinkBrowse" style="width:10%;"></i>' :
                    '<input type="text" id="txtLink" class="inptxt ltr" value="http:/' + '/" style="float:left;width:60%"></input>') + '<br style="clear:both">' +
                '<div class="md-label">متن:</div>' +
                '<input type="text" id="txtLinkText" class="inptxt" style="float:right;width:60%"></input>' + '<br style="clear:both">' +
                '<div class="md-label">عنوان:</div>' + '<input type="text" id="txtLinkTitle" class="inptxt" style="float:right;width:60%"></input>' +
                '<br style="clear:both">' +
                '<div class="md-label">مقصد:</div>' +
                '<label style="float:right;" for="chkNewWindow" class="inpchk"><input type="checkbox" id="chkNewWindow"></input> پنجره جدید</label>' +
                '<br style="clear:both">' + '</div>' + '<div class="md-footer">' + '<button id="btnLinkOk"> تایید </button>' + '</div>' + '</div>' + '</div>' + '' +
                '<div class="md-modal" id="md-createsrc">' +

                '<div class="md-content">' + '<div class="md-body">' +
                '<input type="text" id="txtSrc" class="inptxt" value="http:/' + '/"></input>' +
                '</div>' + '<div class="md-footer">' + '<button id="btnSrcOk"> تایید </button>' + '</div>' + '</div>' + '</div>' + '' +
                '<div class="rte-pop" id="pop-align">' +

                '<button class="md-pickalign" data-align="left" title="چپ"> <i class="cb-icon-align-left"></i> </button>' +
                '<button class="md-pickalign" data-align="center" title="وسط"> <i class="cb-icon-align-center"></i> </button>' +
                '<button class="md-pickalign" data-align="right" title="راسط"> <i class="cb-icon-align-right"></i> </button>' +
                '<button class="md-pickalign" data-align="justify" title="بلوک چین"> <i class="cb-icon-align-justify"></i> </button>' + '</div>' + '' +
                '<div class="rte-pop" id="pop-list">' +
                '<button class="md-picklist half" data-list="indent" title="افزایش تورفتگی" style="margin-right:0px"> <i class="cb-icon-indent-right"></i> </button>' +
                '<button class="md-picklist half" data-list="outdent" title="کاهش تورفتگی"> <i class="cb-icon-indent-left"></i> </button>' +
                '<button class="md-picklist" data-list="insertUnorderedList" title="فهرست نقطه​ای"> <i class="cb-icon-list-bullet"></i> </button>' +
                '<button class="md-picklist" data-list="insertOrderedList" title="فهرست شماره​دار"> <i class="cb-icon-list-numbered"></i> </button>' +
                '<button class="md-picklist" data-list="normal" title="حذف فهرست"> <i class="cb-icon-eraser"></i> </button>' + '</div>' + '' +
                '<div class="md-modal" id="md-fonts" style="">' + '<div class="md-content" style="">' + '<div class="md-body">' +
                '<iframe id="ifrFonts" style="width:100%;height:371px;border: none;display: block;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAFElEQVQYV2P8DwQMBADjqCKiggAAmZsj5vuXmnUAAAAASUVORK5CYII="></iframe>' +
                '<button class="md-pickfontfamily" data-font-family="" data-provider="" style="display:none"></button>' + '</div>' + '</div>' + '</div>' + '' +
                '<div class="md-modal" id="md-fontsize" style="">' + '<div class="md-content" style="">' + '<div class="md-body">' +
                '<iframe id="ifrFontSize" style="width:100%;height:319px;border: none;display: block;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAFElEQVQYV2P8DwQMBADjqCKiggAAmZsj5vuXmnUAAAAASUVORK5CYII="></iframe>' +
                '<button class="md-pickfontsize" data-font-size="" style="display:none"></button>' + '</div>' + '</div>' + '</div>' + '' +
                '<div class="md-modal" id="md-headings" style="">' + '<div class="md-content" style="">' + '<div class="md-body">' +
                '<iframe id="ifrHeadings" style="width:100%;height:335px;border: none;display: block;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAFElEQVQYV2P8DwQMBADjqCKiggAAmZsj5vuXmnUAAAAASUVORK5CYII="></iframe>' +
                '<button class="md-pickheading" data-heading="" style="display:none"></button>' + '</div>' + '</div>' + '</div>' + '' +
                '<div class="md-modal" id="md-color" style="background:#fff;">' +

                '<div class="md-content">' + '<div class="md-body">' +
                '<div style="padding:15px 10px;">' + '<div style="width:100%">' +
                '<select id="selColorApplyTo" style="width:120px;"><option value="1">رنگ متن</option><option value="2">زمینه</option><option value="3">زمینه بلوک</option></select>' +
                '<input type="text" class="ltr" id="inpTextColor"/>' +
                '<button id="btnTextColorClear" style="margin-left:9px;margin-bottom: 2px;padding:0 12px;width:42px;"> <i class="cb-icon-eraser"></i> </button>' +
                '<button id="btnTextColorOk" style="margin-left:9px;margin-bottom: 2px;padding:0 12px;width:82px;"> تایید </button>' + '</div>' +
                '<div style="margin-top:5px;overflow:hidden;display:inline-block;border-right:rgba(165, 165, 165, 0.5) 1px solid;border-bottom: rgba(165, 165, 165, 0.5) 1px solid">' +
                '[COLORS]' + '</div>' + '<br style="clear:both" />' + '</div>' + '</div>' + '</div>' + '</div>' + '' +
                '<div class="md-modal" id="md-html">' +

                '<div class="md-content">' + '<div class="md-body">' +
                '<textarea id="txtHtml" class="inptxt ltr" style="height:350px;"></textarea>' + '</div>' + '<div class="md-footer">' +
                '<button id="btnHtmlOk"> Ok </button>' + '</div>' + '</div>' + '</div>' + '' + '<div class="md-modal" id="md-fileselect">' +

                '<div class="md-content">' + '<div class="md-body">' +
                (bUseCustomFileSelect ? '<iframe id="ifrFileBrowse" style="width:100%;height:400px;border: none;display: block;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAFElEQVQYV2P8DwQMBADjqCKiggAAmZsj5vuXmnUAAAAASUVORK5CYII="></iframe>' : '') +
                '</div>' + '</div>' + '</div>' + '<input type="hidden" id="active-input" />' + '' +
                '<div class="md-modal" id="md-delrowconfirm">' +

                '<div class="md-content">' + '<div class="md-body">' +
                '<div style="padding:20px 20px 25px;text-align:center;">' + '<p>آیا از حذف این بخش بلوک هستید؟</p>' +
                '<button id="btnDelRowOk" style="margin-left:12px"> تایید </button>' +
                '<button id="btnDelRowCancel"> لغو </button>' +
                '</div>' + '</div>' + '</div>' + '</div>' + '' +
                '<div class="md-modal md-draggable" id="md-icon-select">' +

                '<div class="md-content">' + '<div class="md-body md-settings">' + '<div class="md-modal-handle">' +
                '<div style="margin:0;font-size:15px;line-height:22px;text-align:center;"><i class="cb-icon-dot"></i></div>' + '</div>' +
                '<iframe id="ifrIconSelect" style="width:100%;height:500px;hidden;border:none;float:left;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAFElEQVQYV2P8DwQMBADjqCKiggAAmZsj5vuXmnUAAAAASUVORK5CYII="></iframe>' +
                '</div>' + '</div>' + '</div>' + '' + '<div id="temp-contenteditor"></div>' + '';
            var html_colors = '';
            arrC = new Array("#0000ff", "#3300ff", "#6600ff", "#9900ff", "#cc00ff", "#ff00ff", "#ff0099", "#cc0099", "#990099", "#660099", "#330099", "#000099", "#000033", "#330033", "#660033", "#990033", "#cc0033", "#ff0033", "#000000", "|", "#0066ff", "#3366ff", "#6666ff", "#9966ff", "#cc66ff", "#ff66ff", "#ff6699", "#cc6699", "#996699", "#666699", "#336699", "#006699", "#006633", "#336633", "#666633", "#996633", "#cc6633", "#ff6633", "#444", "|", "#0099ff", "#3399ff", "#6699ff", "#9999ff", "#cc99ff", "#ff99ff", "#ff9999", "#cc9999", "#999999", "#669999", "#339999", "#009999", "#009933", "#339933", "#669933", "#999933", "#cc9933", "#ff9933", "#888", "|", "#00ccff", "#33ccff", "#66ccff", "#99ccff", "#ccccff", "#ffccff", "#ffcc99", "#cccc99", "#99cc99", "#66cc99", "#33cc99", "#00cc99", "#00cc33", "#33cc33", "#66cc33", "#99cc33", "#cccc33", "#ffcc33", "#ccc", "|", "#00ffff", "#33ffff", "#66ffff", "#99ffff", "#ccffff", "#ffffff", "#ffff99", "#ccff99", "#99ff99", "#66ff99", "#33ff99", "#00ff99", "#00ff33", "#33ff33", "#66ff33", "#99ff33", "#ccff33", "#ffff33", "#ffffff");
            html_colors += '<div style="clear:both">';
            for (var i = 0; i < arrC.length; i++) {
                if (arrC[i] != '|') {
                    var whitecell = '';
                    if (arrC[i] == '#ffffff' && i == 98) whitecell = '';
                    html_colors += '<button class="md-pick" style="background:' + arrC[i] + whitecell + ';"></button>'
                } else {
                    html_colors += '</div><div style="clear:both">'
                }
            }
            html_colors += '</div>';
            html_rte = html_rte.replace('[COLORS]', html_colors);
            if (jQuery('#rte-toolbar').length == 0) {
                jQuery('#divCb').append(html_rte);
                this.prepareRteCommand('bold');
                this.prepareRteCommand('italic');
                this.prepareRteCommand('underline');
                this.prepareRteCommand('strikethrough');
                this.prepareRteCommand('undo');
                this.prepareRteCommand('redo')
            }
            var isCtrl = false;
            $element.bind('keyup', function (e) {
                $element.data('contenteditor').realtime()
            });
            $element.bind('mouseup', function (e) {
                $element.data('contenteditor').realtime()
            });
            jQuery(document).on("paste", '#' + $element.attr('id'), function (e) {
                pasteContent($activeElement)
            });
            $element.bind('keydown', function (e) {
                if (e.which == 46 || e.which == 8) {
                    var el;
                    try {
                        if (window.getSelection) {
                            el = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode
                        } else if (document.selection) {
                            el = document.selection.createRange().parentElement()
                        }
                        if (el.nodeName.toLowerCase() == 'p') {
                            var t = '';
                            if (window.getSelection) {
                                t = window.getSelection().toString()
                            } else if (document.getSelection) {
                                t = document.getSelection().toString()
                            } else if (document.selection) {
                                t = document.selection.createRange().text
                            }
                            if (t == el.innerText) {
                                jQuery(el).html('<br>');
                                return false
                            }
                        }
                    } catch (e) { }
                }
                if (e.which == 17) {
                    isCtrl = true;
                    return
                }
                if ((e.which == 86 && isCtrl == true) || (e.which == 86 && e.metaKey)) {
                    pasteContent($activeElement)
                }
                if (e.ctrlKey) {
                    if (e.keyCode == 65 || e.keyCode == 97) {
                        e.preventDefault();
                        var is_ie = detectIE();
                        var el;
                        try {
                            if (window.getSelection) {
                                el = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode
                            } else if (document.selection) {
                                el = document.selection.createRange().parentElement()
                            }
                        } catch (e) {
                            return
                        }
                        if (is_ie) {
                            var range = document.body.createTextRange();
                            range.moveToElementText(el);
                            range.select()
                        } else {
                            var range = document.createRange();
                            range.selectNodeContents(el);
                            var oSel = window.getSelection();
                            oSel.removeAllRanges();
                            oSel.addRange(range)
                        }
                    }
                }
            }).keyup(function (e) {
                if (e.which == 17) {
                    isCtrl = false
                }
            });
            jQuery(document).on('mousedown', function (event) {
                var $active_element;
                if (jQuery(event.target).parents(".ui-draggable").length > 0) {
                    if (jQuery(event.target).parents(".ui-draggable").parent().data('contentbuilder')) {
                        $active_element = jQuery(event.target).parents(".ui-draggable").parent()
                    }
                }
                var bEditable = false;
                if (jQuery('#rte-toolbar').css('display') == 'none') return;
                var el = jQuery(event.target).prop("tagName").toLowerCase();
                jQuery(event.target).parents().each(function (e) {
                    if (jQuery(this).is('[contenteditable]') || jQuery(this).hasClass('md-modal') || jQuery(this).attr('id') == 'divCb') {
                        bEditable = true;
                        return
                    }
                });
                if (jQuery(event.target).is('[contenteditable]')) {
                    bEditable = true;
                    return
                }
                if (!bEditable) {
                    $activeElement = null;
                    if (ce_toolbarDisplay == 'auto') {
                        var el;
                        if (window.getSelection) {
                            el = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode
                        } else if (document.selection) {
                            el = document.selection.createRange().parentElement()
                        }
                        var found = false;
                        jQuery(el).parents().each(function () {
                            if (jQuery(this).data('contentbuilder')) {
                                found = true
                            }
                        });
                        if (!found) jQuery('#rte-toolbar').css('display', 'none');
                        jQuery('.rte-pop').css('display', 'none')
                    }
                    if (ce_outline) {
                        for (var i = 0; i < instances.length; i++) {
                            jQuery(instances[i]).css('outline', '');
                            jQuery(instances[i]).find('*').css('outline', '')
                        }
                    }
                    jQuery('.row-tool').stop(true, true).fadeOut(0);
                    jQuery(".ui-draggable").removeClass('code');
                    jQuery(".ui-draggable").removeClass('ui-dragbox-outlined');
                    jQuery('#rte-toolbar').css('display', 'none');
                    jQuery('.rte-pop').css('display', 'none')
                }
            })
        };
        this.contentRender = function () {
            this.settings = jQuery.extend({}, defaults, options);
            var iconselect = this.settings.iconselect;
            if (iconselect != '') {
                $element.find('.ui-draggable > div:first-child i').each(function () {
                    if (jQuery(this).html() == '') {
                        jQuery(this).unbind('click');
                        jQuery(this).click(function () {
                            $activeIcon = jQuery(this);
                            if (jQuery('#ifrIconSelect').attr('src').indexOf('.html') == -1) {
                                jQuery('#ifrIconSelect').attr('src', iconselect)
                            }
                            jQuery('#md-icon-select').css('max-width', '775px');
                            jQuery('#md-icon-select').simplemodal();
                            jQuery('#md-icon-select').data('simplemodal').show()
                        })
                    }
                })
            }
        };
        this.realtime = function () {
            var is_ie = detectIE();
            var el;
            var curr;
            try {
                if (window.getSelection) {
                    curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                    el = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode
                } else if (document.selection) {
                    curr = document.selection.createRange();
                    el = document.selection.createRange().parentElement()
                }
            } catch (e) {
                return
            }
            if (jQuery(el).parents("[data-mode='code']").length > 0) return;
            if (jQuery(el).parents("[data-mode='readonly']").length > 0) return;
            if (el.nodeName.toLowerCase() == 'a') {
                if (is_ie) { } else { }
                jQuery("#divRteLink").addClass('forceshow')
            } else {
                jQuery("#divRteLink").removeClass('forceshow')
            }
            if (curr) {
                if (jQuery(curr).is('[contenteditable]')) {
                    jQuery("#rte-toolbar").stop(true, true).fadeIn(200)
                }
            }
            if (jQuery(el).is('[contenteditable]')) {
                jQuery("#rte-toolbar").stop(true, true).fadeIn(200)
            }
            if (jQuery(el).parents('[contenteditable]').length > 0) {
                jQuery("#rte-toolbar").stop(true, true).fadeIn(200)
            }
            jQuery('.rte-pop').css('display', 'none');
            var editable = $element.data('contenteditor').settings.editable;
            if (editable == '') { } else {
                $element.find(editable).unbind('mousedown');
                $element.find(editable).bind('mousedown', function (e) {
                    $activeElement = jQuery(this);
                    jQuery("#rte-toolbar").stop(true, true).fadeIn(200);
                    if (ce_outline) {
                        for (var i = 0; i < instances.length; i++) {
                            jQuery(instances[i]).css('outline', '');
                            jQuery(instances[i]).find('*').css('outline', '')
                        }
                        jQuery(this).css('outline', 'rgba(0, 0, 0, 0.43) dashed 1px')
                    }
                });
                $element.find('.edit').find(editable).removeAttr('contenteditable')
            }
        };
        this.render = function () {
            var zoom;
            if (localStorage.getItem("zoom") != null) {
                zoom = localStorage.zoom
            } else {
                zoom = $element.css('zoom')
            }
            if (zoom == undefined) zoom = 1;
            localStorage.zoom = zoom;
            var editable = $element.data('contenteditor').settings.editable;
            if (editable == '') {
                $element.attr('contenteditable', 'true');
                $element.unbind('mousedown');
                $element.bind('mousedown', function (e) {
                    $activeElement = jQuery(this);
                    jQuery("#rte-toolbar").stop(true, true).fadeIn(200);
                    if (ce_outline) {
                        for (var i = 0; i < instances.length; i++) {
                            jQuery(instances[i]).css('outline', '');
                            jQuery(instances[i]).find('*').css('outline', '')
                        }
                        jQuery(this).css('outline', 'rgba(0, 0, 0, 0.43) dashed 1px')
                    }
                })
            } else {
                $element.find(editable).each(function () {
                    if (jQuery(this).parents("[data-mode='code']").length > 0) return;
                    if (jQuery(this).parents("[data-mode='readonly']").length > 0) return;
                    var editMode = $element.data('contenteditor').settings.editMode;
                    if (editMode == 'default') { } else {
                        var attr = jQuery(this).attr('contenteditable');
                        if (typeof attr !== typeof undefined && attr !== false) { } else {
                            jQuery(this).attr('contenteditable', 'true')
                        }
                    }
                });
                $element.find(editable).unbind('mousedown');
                $element.find(editable).bind('mousedown', function (e) {
                    $activeElement = jQuery(this);
                    if (ce_outline) {
                        for (var i = 0; i < instances.length; i++) {
                            jQuery(instances[i]).css('outline', '');
                            jQuery(instances[i]).find('*').css('outline', '')
                        }
                        jQuery(this).css('outline', 'rgba(0, 0, 0, 0.43) dashed 1px')
                    }
                });
                $element.find('.edit').find(editable).removeAttr('contenteditable')
            }
            $element.find('a').each(function () {
                if (jQuery(this).parents("[data-mode='code']").length > 0) return;
                if (jQuery(this).parents("[data-mode='readonly']").length > 0) return;
                jQuery(this).attr('contenteditable', 'true')
            });
            var editMode = $element.data('contenteditor').settings.editMode;
            if (editMode == 'default') {
                $element.find("h1,h2,h3,h4,h5,h6").unbind('keydown');
                $element.find("h1,h2,h3,h4,h5,h6").bind('keydown', function (e) {
                    if (e.keyCode == 13) {
                        var is_ie = detectIE();
                        if (is_ie && is_ie <= 10) {
                            var oSel = document.selection.createRange();
                            if (oSel.parentElement) {
                                oSel.pasteHTML('<br>');
                                e.cancelBubble = true;
                                e.returnValue = false;
                                oSel.select();
                                oSel.moveEnd("character", 1);
                                oSel.moveStart("character", 1);
                                oSel.collapse(false);
                                return false
                            }
                        } else {
                            var oSel = window.getSelection();
                            var range = oSel.getRangeAt(0);
                            range.extractContents();
                            range.collapse(true);
                            var docFrag = range.createContextualFragment('<br>');
                            var lastNode = docFrag.lastChild;
                            range.insertNode(docFrag);
                            range.setStartAfter(lastNode);
                            range.setEndAfter(lastNode);
                            if (range.endContainer.nodeType == 1) {
                                if (range.endOffset == range.endContainer.childNodes.length - 1) {
                                    range.insertNode(range.createContextualFragment("<br />"));
                                    range.setStartAfter(lastNode);
                                    range.setEndAfter(lastNode)
                                }
                            }
                            var comCon = range.commonAncestorContainer;
                            if (comCon && comCon.parentNode) {
                                try {
                                    comCon.parentNode.normalize()
                                } catch (e) { }
                            }
                            oSel.removeAllRanges();
                            oSel.addRange(range);
                            return false
                        }
                    }
                });
                $element.children('div.ui-draggable').each(function () {
                    jQuery(this).children().first().children().each(function () {
                        if (jQuery(this).parents("[data-mode='code']").length > 0) return;
                        if (jQuery(this).parents("[data-mode='readonly']").length > 0) return;
                        jQuery(this).attr('contenteditable', true)
                    })
                });
                $element.find("div").unbind('keyup');
                $element.find("div").bind('keyup', function (e) {
                    var el;
                    var curr;
                    if (window.getSelection) {
                        curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                        el = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode
                    } else if (document.selection) {
                        curr = document.selection.createRange();
                        el = document.selection.createRange().parentElement()
                    }
                    if (e.keyCode == 13 && !e.shiftKey) {
                        var is_ie = detectIE();
                        if (is_ie > 0) { } else {
                            var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
                            var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
                            var isOpera = window.opera;
                            var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                            if (isChrome || isOpera) {
                                if (jQuery(el).prop("tagName").toLowerCase() == 'p' || jQuery(el).prop("tagName").toLowerCase() == 'div') {
                                    document.execCommand('formatBlock', false, '<p>')
                                }
                            }
                            if (isFirefox) {
                                if (!jQuery(curr).html()) document.execCommand('formatBlock', false, '<p>')
                            }
                        }
                    }
                });
                $element.find("div").unbind('keydown');
                $element.find("div").bind('keydown', function (e) {
                    var el;
                    var curr;
                    if (window.getSelection) {
                        curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                        el = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode
                    } else if (document.selection) {
                        curr = document.selection.createRange();
                        el = document.selection.createRange().parentElement()
                    }
                    if (e.keyCode == 8 || e.keyCode == 46) {
                        if (jQuery(curr).html()) {
                            var currTag = jQuery(curr).prop("tagName").toLowerCase();
                            if (currTag == 'h1' || currTag == 'h1' || currTag == 'h2' || currTag == 'h3' || currTag == 'h4' || currTag == 'h5' || currTag == 'h6' || currTag == 'p') {
                                if (jQuery(curr).text() == '') {
                                    document.execCommand('removeFormat', false, null);
                                    jQuery(curr).remove();
                                    var oSel = window.getSelection();
                                    var range = oSel.getRangeAt(0);
                                    range.extractContents();
                                    range.collapse(true);
                                    oSel.removeAllRanges();
                                    oSel.addRange(range);
                                    e.preventDefault();
                                    e.stopImmediatePropagation()
                                }
                            }
                        }
                    }
                })
            } else {
                $element.find("p").unbind('keydown');
                $element.find("p").bind('keydown', function (e) {
                    if (e.keyCode == 13 && $element.find("li").length == 0) {
                        var UA = navigator.userAgent.toLowerCase();
                        var LiveEditor_isIE = (UA.indexOf('msie') >= 0) ? true : false;
                        if (LiveEditor_isIE) {
                            var oSel = document.selection.createRange();
                            if (oSel.parentElement) {
                                oSel.pasteHTML('<br>');
                                e.cancelBubble = true;
                                e.returnValue = false;
                                oSel.select();
                                oSel.moveEnd("character", 1);
                                oSel.moveStart("character", 1);
                                oSel.collapse(false);
                                return false
                            }
                        } else {
                            var oSel = window.getSelection();
                            var range = oSel.getRangeAt(0);
                            range.extractContents();
                            range.collapse(true);
                            var docFrag = range.createContextualFragment('<br>');
                            var lastNode = docFrag.lastChild;
                            range.insertNode(docFrag);
                            range.setStartAfter(lastNode);
                            range.setEndAfter(lastNode);
                            if (range.endContainer.nodeType == 1) {
                                if (range.endOffset == range.endContainer.childNodes.length - 1) {
                                    range.insertNode(range.createContextualFragment("<br />"));
                                    range.setStartAfter(lastNode);
                                    range.setEndAfter(lastNode)
                                }
                            }
                            var comCon = range.commonAncestorContainer;
                            if (comCon && comCon.parentNode) {
                                try {
                                    comCon.parentNode.normalize()
                                } catch (e) { }
                            }
                            oSel.removeAllRanges();
                            oSel.addRange(range);
                            return false
                        }
                    }
                })
            }
            jQuery('#rte-toolbar *[data-rte-cmd="removeElement"]').unbind('click');
            jQuery('#rte-toolbar *[data-rte-cmd="removeElement"]').click(function (e) {
                $activeElement.remove();
                $element.data('contenteditor').settings.hasChanged = true;
                $element.data('contenteditor').render();
                e.preventDefault()
            });
            jQuery('#rte-toolbar *[data-rte-cmd="color"]').unbind('click');
            jQuery('#rte-toolbar *[data-rte-cmd="color"]').click(function (e) {
                var savedSel = saveSelection();
                jQuery('#md-color').css('max-width', '487px');
                jQuery('#md-color').simplemodal();
                jQuery('#md-color').data('simplemodal').show();
                e.preventDefault();
                var text = getSelected();
                jQuery('.md-pick').unbind('click');
                jQuery('.md-pick').click(function () {
                    var s = jQuery(this).css("background-color");
                    $('#inpTextColor').val(s);
                    $('#inpTextColor').css('background-color', s);
                    $('#inpTextColor').contrastingText()
                });
                $('#inpTextColor').colorPicker({
                    renderCallback: function ($elm, toggled) {
                        if (toggled === true) { } else if (toggled === false) { } else { }
                    }
                });
                $('#inpTextColor').contrastingText();
                jQuery('#btnTextColorOk').unbind('click');
                jQuery('#btnTextColorOk').click(function () {
                    var s = $('#inpTextColor').val();
                    restoreSelection(savedSel);
                    $element.data('contenteditor').applyColor(s, text);
                    jQuery('#md-color').data('simplemodal').hide()
                });
                jQuery('#btnTextColorClear').unbind('click');
                jQuery('#btnTextColorClear').click(function () {
                    restoreSelection(savedSel);
                    var el;
                    var curr;
                    if (window.getSelection) {
                        curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                        if (curr.nodeType == 3) {
                            el = curr.parentNode
                        } else {
                            el = curr
                        }
                    } else if (document.selection) {
                        curr = document.selection.createRange();
                        el = document.selection.createRange().parentElement()
                    }
                    var selColMode = jQuery('#selColorApplyTo').val();
                    if (jQuery.trim(text) != '' && jQuery(el).text() != text) {
                        if (selColMode == 1) {
                            document.execCommand("ForeColor", false, '')
                        }
                        if (selColMode == 2) {
                            document.execCommand("BackColor", false, '')
                        }
                        var fontElements = document.getElementsByTagName("font");
                        for (var i = 0, len = fontElements.length; i < len; ++i) {
                            var s = fontElements[i].color;
                            fontElements[i].removeAttribute("color");
                            fontElements[i].style.color = s
                        }
                    } else if (jQuery(el).text() == text) {
                        if (selColMode == 1) {
                            if (jQuery(el).html()) {
                                jQuery(el).css('color', '')
                            } else {
                                jQuery(el).parent().css('color', '')
                            }
                        }
                        if (selColMode == 2) {
                            if (jQuery(el).html()) {
                                jQuery(el).css('background-color', '')
                            } else {
                                jQuery(el).parent().css('background-color', '')
                            }
                        }
                    } else {
                        if (selColMode == 1) {
                            jQuery(el).css('color', '')
                        }
                        if (selColMode == 2) {
                            jQuery(el).css('background-color', '')
                        }
                    };
                    if (selColMode == 3) {
                        jQuery(el).parents('.ui-draggable').children().first().css('background-color', '')
                    }
                    jQuery('#md-color').data('simplemodal').hide()
                })
            });
            jQuery('#rte-toolbar *[data-rte-cmd="fontsize"]').unbind('click');
            jQuery('#rte-toolbar *[data-rte-cmd="fontsize"]').click(function (e) {
                var savedSel = saveSelection();
                jQuery('#md-fontsize').css('max-width', '190px');
                jQuery('#md-fontsize').simplemodal();
                jQuery('#md-fontsize').data('simplemodal').show();
                e.preventDefault();
                if (jQuery('#ifrFontSize').attr('src').indexOf('fontsize.html') == -1) {
                    jQuery('#ifrFontSize').attr('src',  'assets/page-builder/fontsize.html')
                }
                var text = getSelected();
                jQuery('.md-pickfontsize').unbind('click');
                jQuery('.md-pickfontsize').click(function () {
                    restoreSelection(savedSel);
                    var el;
                    var curr;
                    if (window.getSelection) {
                        curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                        if (curr.nodeType == 3) {
                            el = curr.parentNode
                        } else {
                            el = curr
                        }
                    } else if (document.selection) {
                        curr = document.selection.createRange();
                        el = document.selection.createRange().parentElement()
                    }
                    var s = jQuery(this).attr('data-font-size');
                    if (jQuery.trim(text) != '' && jQuery(el).text() != text) {
                        document.execCommand("fontSize", false, "7");
                        var fontElements = document.getElementsByTagName("font");
                        for (var i = 0, len = fontElements.length; i < len; ++i) {
                            if (fontElements[i].size == "7") {
                                fontElements[i].removeAttribute("size");
                                fontElements[i].style.fontSize = s
                            }
                        }
                    } else if (jQuery(el).text() == text) {
                        if (jQuery(el).html()) {
                            jQuery(el).css('font-size', s)
                        } else {
                            jQuery(el).parent().css('font-size', s)
                        }
                    } else {
                        jQuery(el).css('font-size', s)
                    };
                    jQuery(this).blur();
                    $element.data('contenteditor').settings.hasChanged = true;
                    e.preventDefault();
                    jQuery('#md-fontsize').data('simplemodal').hide()
                })
            });
            jQuery('#rte-toolbar *[data-rte-cmd="formatPara"]').unbind('click');
            jQuery('#rte-toolbar *[data-rte-cmd="formatPara"]').click(function (e) {
                var savedSel = saveSelection();
                jQuery('#md-headings').css('max-width', '225px');
                jQuery('#md-headings').simplemodal();
                jQuery('#md-headings').data('simplemodal').show();
                e.preventDefault();
                if (jQuery('#ifrHeadings').attr('src').indexOf('headings.html') == -1) {
                    jQuery('#ifrHeadings').attr('src', 'assets/page-builder/headings.html')
                }
                jQuery('.md-pickheading').unbind('click');
                jQuery('.md-pickheading').click(function () {
                    restoreSelection(savedSel);
                    var s = jQuery(this).attr('data-heading');
                    $element.attr('contenteditable', true);
                    document.execCommand('formatBlock', false, '<' + s + '>');
                    $element.removeAttr('contenteditable');
                    $element.data('contenteditor').render();
                    jQuery(this).blur();
                    $element.data('contenteditor').settings.hasChanged = true;
                    e.preventDefault();
                    jQuery('#md-headings').data('simplemodal').hide()
                })
            });
            jQuery('#rte-toolbar *[data-rte-cmd="removeFormat"]').unbind('click');
            jQuery('#rte-toolbar *[data-rte-cmd="removeFormat"]').click(function (e) {
                document.execCommand('removeFormat', false, null);
                document.execCommand('removeFormat', false, null);
                jQuery(this).blur();
                $element.data('contenteditor').settings.hasChanged = true;
                e.preventDefault()
            });
            jQuery('#rte-toolbar *[data-rte-cmd="unlink"]').unbind('click');
            jQuery('#rte-toolbar *[data-rte-cmd="unlink"]').click(function (e) {
                document.execCommand('unlink', false, null);
                jQuery("#divRteLink").removeClass('forceshow');
                jQuery(this).blur();
                $element.data('contenteditor').settings.hasChanged = true;
                e.preventDefault()
            });
            var storedEl;
            jQuery('#rte-toolbar *[data-rte-cmd="html"]').unbind('click');
            jQuery('#rte-toolbar *[data-rte-cmd="html"]').click(function (e) {
                var el;
                if (window.getSelection) {
                    el = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode
                } else if (document.selection) {
                    el = document.selection.createRange().parentElement()
                }
                var found = false;
                jQuery(el).parents().each(function () {
                    if (jQuery(this).data('contentbuilder')) {
                        jQuery(this).data('contentbuilder').viewHtml();
                        found = true;
                        storedEl = el
                    }
                });
                if (!found && storedEl) {
                    el = storedEl;
                    jQuery(el).parents().each(function () {
                        if (jQuery(this).data('contentbuilder')) {
                            jQuery(this).data('contentbuilder').viewHtml()
                        }
                    })
                }
                e.preventDefault()
            });
            jQuery('#rte-toolbar *[data-rte-cmd="font"]').unbind('click');
            jQuery('#rte-toolbar *[data-rte-cmd="font"]').click(function (e) {
                var savedSel = saveSelection();
                jQuery('#md-fonts').css('max-width', '300px');
                jQuery('#md-fonts').simplemodal();
                jQuery('#md-fonts').data('simplemodal').show();
                e.preventDefault();
                if (jQuery('#ifrFonts').attr('src').indexOf('fonts.html') == -1) {
                    jQuery('#ifrFonts').attr('src', 'assets/page-builder/fonts.html')
                }
                var text = getSelected();
                jQuery('.md-pickfontfamily').unbind('click');
                jQuery('.md-pickfontfamily').click(function () {
                    restoreSelection(savedSel);
                    var el;
                    var curr;
                    if (window.getSelection) {
                        curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                        if (curr.nodeType == 3) {
                            el = curr.parentNode
                        } else {
                            el = curr
                        }
                        if (el.nodeName != 'H1' && el.nodeName != 'H2' && el.nodeName != 'H3' && el.nodeName != 'H4' && el.nodeName != 'H5' && el.nodeName != 'H6' && el.nodeName != 'P') {
                            el = el.parentNode
                        }
                    } else if (document.selection) {
                        curr = document.selection.createRange();
                        el = document.selection.createRange().parentElement();
                        if (el.nodeName != 'H1' && el.nodeName != 'H2' && el.nodeName != 'H3' && el.nodeName != 'H4' && el.nodeName != 'H5' && el.nodeName != 'H6' && el.nodeName != 'P') {
                            el = el.parentElement()
                        }
                    }
                    var s = jQuery(this).attr('data-font-family');
                    if (jQuery.trim(text) != '' && jQuery(el).text() != text) {
                        document.execCommand("fontName", false, s);
                        var fontElements = document.getElementsByTagName("font");
                        for (var i = 0, len = fontElements.length; i < len; ++i) {
                            if (fontElements[i].face == s) {
                                fontElements[i].removeAttribute("face");
                                fontElements[i].style.fontFamily = s
                            }
                        }
                    } else if (jQuery(el).text() == text) {
                        if (jQuery(el).html()) {
                            jQuery(el).css('font-family', s)
                        } else {
                            jQuery(el).parent().css('font-family', s)
                        }
                    } else {
                        jQuery(el).css('font-family', s)
                    };
                    var o = jQuery(this).attr('data-font-style');
                    if (!o) {
                        o = ''
                    } else {
                        o = ':' + o
                    };
                    var fontname = s.split(',')[0];
                    var provider = jQuery(this).attr('data-provider');
                    if (provider == 'google') {
                        var bExist = false;
                        var links = document.getElementsByTagName("link");
                        for (var i = 0; i < links.length; i++) {
                            var sSrc = links[i].href.toLowerCase();
                            sSrc = sSrc.replace(/\+/g, ' ').replace(/%20/g, ' ');
                            if (sSrc.indexOf(fontname.toLowerCase()) != -1) bExist = true
                        }
                        if (!bExist) {
                            jQuery(el).parents().each(function () {
                                if (jQuery(this).data('contentbuilder')) {
                                    jQuery(this).append('<link href="//fonts.googleapis.com/css?family=' + fontname + o + '" rel="stylesheet" property="stylesheet" type="text/css">')
                                }
                            })
                        }
                    }
                    jQuery(cb_list).each(function () {
                        var $cb = jQuery(this);
                        $cb.find('link').each(function () {
                            var sSrc = jQuery(this).attr('href').toLowerCase();
                            if (sSrc.indexOf('googleapis') != -1) {
                                sSrc = sSrc.replace(/\+/g, ' ').replace(/%20/g, ' ');
                                var fontname = sSrc.substr(sSrc.indexOf('family=') + 7);
                                if (fontname.indexOf(':') != -1) {
                                    fontname = fontname.split(':')[0]
                                }
                                if (fontname.indexOf('|') != -1) {
                                    fontname = fontname.split('|')[0]
                                }
                                var tmp = $cb.data('contentbuilder').html().toLowerCase();
                                var count = tmp.split(fontname).length;
                                if (count < 3) {
                                    jQuery(this).attr('rel', '_del')
                                }
                            }
                        })
                    });
                    $element.find('[rel="_del"]').remove();
                    jQuery(this).blur();
                    $element.data('contenteditor').settings.hasChanged = true;
                    e.preventDefault();
                    jQuery('#md-fonts').data('simplemodal').hide()
                })
            });
            jQuery('#rte-toolbar *[data-rte-cmd="align"]').unbind('click');
            jQuery('#rte-toolbar *[data-rte-cmd="align"]').click(function (e) {
                var savedSel = saveSelection();
                jQuery('.rte-pop').css('display', 'none');
                jQuery('#pop-align').css('display', 'block');
                if (jQuery('#rte-toolbar').hasClass('rte-side')) {
                    jQuery('#pop-align').addClass('rte-side')
                }
                if (jQuery('#rte-toolbar').hasClass('right')) {
                    jQuery('#pop-align').addClass('right')
                }
                e.preventDefault();
                jQuery('.md-pickalign').unbind('click');
                jQuery('.md-pickalign').click(function () {
                    restoreSelection(savedSel);
                    var el;
                    var curr;
                    if (window.getSelection) {
                        curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                        if (curr.nodeType == 3) {
                            el = curr.parentNode
                        } else {
                            el = curr
                        }
                    } else if (document.selection) {
                        curr = document.selection.createRange();
                        el = document.selection.createRange().parentElement()
                    }
                    var s = jQuery(this).data('align');
                    var sTagName = jQuery(el).prop("tagName").toLowerCase();
                    if (sTagName == 'h1' || sTagName == 'h2' || sTagName == 'h3' || sTagName == 'h4' || sTagName == 'h5' || sTagName == 'h6' || sTagName == 'p') {
                        jQuery(el).css('text-align', s)
                    } else {
                        jQuery(el).parents('h1,h2,h3,h4,h5,h6,p').css('text-align', s)
                    }
                    jQuery(this).blur();
                    $element.data('contenteditor').settings.hasChanged = true;
                    e.preventDefault()
                })
            });
            jQuery('#rte-toolbar *[data-rte-cmd="list"]').unbind('click');
            jQuery('#rte-toolbar *[data-rte-cmd="list"]').click(function (e) {
                var savedSel = saveSelection();
                jQuery('.rte-pop').css('display', 'none');
                jQuery('#pop-list').css('display', 'block');
                if (jQuery('#rte-toolbar').hasClass('rte-side')) {
                    jQuery('#pop-list').addClass('rte-side')
                }
                if (jQuery('#rte-toolbar').hasClass('right')) {
                    jQuery('#pop-list').addClass('right')
                }
                e.preventDefault();
                jQuery('.md-picklist').unbind('click');
                jQuery('.md-picklist').click(function () {
                    restoreSelection(savedSel);
                    var s = jQuery(this).data('list');
                    try {
                        if (s == 'normal') {
                            document.execCommand('outdent', false, null);
                            document.execCommand('outdent', false, null);
                            document.execCommand('outdent', false, null)
                        } else {
                            document.execCommand(s, false, null)
                        }
                    } catch (e) {
                        $activeElement.parents('div').addClass('edit');
                        var el;
                        if (window.getSelection) {
                            el = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode;
                            el = el.parentNode
                        } else if (document.selection) {
                            el = document.selection.createRange().parentElement();
                            el = el.parentElement()
                        }
                        el.setAttribute('contenteditable', true);
                        if (s == 'normal') {
                            document.execCommand('outdent', false, null);
                            document.execCommand('outdent', false, null);
                            document.execCommand('outdent', false, null)
                        } else {
                            document.execCommand(s, false, null)
                        }
                        el.removeAttribute('contenteditable');
                        $element.data('contenteditor').render()
                    }
                    jQuery(this).blur();
                    $element.data('contenteditor').settings.hasChanged = true;
                    e.preventDefault();
                    jQuery('#md-list').data('simplemodal').hide()
                })
            });
            jQuery('#rte-toolbar *[data-rte-cmd="createLink"]').unbind('click');
            jQuery('#rte-toolbar *[data-rte-cmd="createLink"]').click(function (e) {
                var html = "";
                if (typeof window.getSelection != "undefined") {
                    var sel = window.getSelection();
                    if (sel.rangeCount) {
                        var container = document.createElement("div");
                        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                            container.appendChild(sel.getRangeAt(i).cloneContents())
                        }
                        html = container.innerHTML
                    }
                } else if (typeof document.selection != "undefined") {
                    if (document.selection.type == "Text") {
                        html = document.selection.createRange().htmlText
                    }
                }
                if (html == '') {
                    alert('Please select some text.');
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return
                }
                var el;
                if (window.getSelection) {
                    el = window.getSelection().getRangeAt(0).commonAncestorContainer
                } else if (document.selection) {
                    el = document.selection.createRange()
                }
                if (el.nodeName.toLowerCase() == 'a') {
                    $activeLink = jQuery(el)
                } else {
                    document.execCommand('createLink', false, 'http://dummy');
                    $activeLink = jQuery("a[href='http://dummy']").first();
                    $activeLink.attr('href', 'http://')
                }
                jQuery('#md-createlink').css('max-width', '800px');
                jQuery('#md-createlink').simplemodal({
                    onCancel: function () {
                        if ($activeLink.attr('href') == 'http://') $activeLink.replaceWith($activeLink.html())
                    }
                });
                jQuery('#md-createlink').data('simplemodal').show();
                jQuery('#txtLink').val($activeLink.attr('href'));
                jQuery('#txtLinkText').val($activeLink.html());
                jQuery('#txtLinkTitle').val($activeLink.attr('title'));
                if ($activeLink.attr('target') == '_blank') {
                    jQuery('#chkNewWindow').prop('checked', true)
                } else {
                    jQuery('#chkNewWindow').removeAttr('checked')
                }
                jQuery('#btnLinkOk').unbind('click');
                jQuery('#btnLinkOk').bind('click', function (e) {
                    $activeLink.attr('href', jQuery('#txtLink').val());
                    if (jQuery('#txtLink').val() == 'http://' || jQuery('#txtLink').val() == '') {
                        $activeLink.replaceWith($activeLink.html())
                    }
                    $activeLink.html(jQuery('#txtLinkText').val());
                    $activeLink.attr('title', jQuery('#txtLinkTitle').val());
                    if (jQuery('#chkNewWindow').is(":checked")) {
                        $activeLink.attr('target', '_blank')
                    } else {
                        $activeLink.removeAttr('target')
                    }
                    jQuery('#md-createlink').data('simplemodal').hide();
                    for (var i = 0; i < instances.length; i++) {
                        jQuery(instances[i]).data('contenteditor').settings.hasChanged = true;
                        jQuery(instances[i]).data('contenteditor').render()
                    }
                });
                e.preventDefault()
            });
            jQuery('#rte-toolbar *[data-rte-cmd="icon"]').unbind('click');
            jQuery('#rte-toolbar *[data-rte-cmd="icon"]').click(function (e) {
                $savedSel = saveSelection();
                $activeIcon = null;
                var iconselect = $element.data('contenteditor').settings.iconselect;
                if (jQuery('#ifrIconSelect').attr('src').indexOf('.html') == -1) {
                    jQuery('#ifrIconSelect').attr('src', iconselect)
                }
                jQuery('#md-icon-select').css('max-width', '775px');
                jQuery('#md-icon-select').simplemodal();
                jQuery('#md-icon-select').data('simplemodal').show();
                e.preventDefault();
                return
            });
            $element.find(".embed-responsive").unbind('hover');
            $element.find(".embed-responsive").hover(function (e) {
                if (jQuery(this).parents("[data-mode='code']").length > 0) return;
                if (jQuery(this).parents("[data-mode='readonly']").length > 0) return;
                var zoom = localStorage.zoom;
                if (zoom == 'normal') zoom = 1;
                if (zoom == undefined) zoom = 1;
                zoom = zoom + '';
                if (zoom.indexOf('%') != -1) {
                    zoom = zoom.replace('%', '') / 100
                }
                if (zoom == 'NaN') {
                    zoom = 1
                }
                zoom = zoom * 1;
                var _top;
                var _left;
                var scrolltop = jQuery(window).scrollTop();
                var offsettop = jQuery(this).offset().top;
                var offsetleft = jQuery(this).offset().left;
                var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                var is_ie = detectIE();
                var browserok = true;
                if (is_firefox || is_ie) browserok = false;
                if (browserok) {
                    _top = ((offsettop - 20) * zoom) + (scrolltop - scrolltop * zoom);
                    _left = offsetleft * zoom
                } else {
                    if (is_ie) {
                        var space = $element.getPos().top;
                        var adjy_val = (-space / 1.1) * zoom + space / 1.1;
                        var space2 = $element.getPos().left;
                        var adjx_val = -space2 * zoom + space2;
                        var p = jQuery(this).getPos();
                        _top = ((p.top - 20) * zoom) + adjy_val;
                        _left = (p.left * zoom) + adjx_val
                    }
                    if (is_firefox) {
                        _top = offsettop - 20;
                        _left = offsetleft
                    }
                }
                jQuery("#divFrameLink").css("top", _top + "px");
                jQuery("#divFrameLink").css("left", _left + "px");
                jQuery("#divFrameLink").stop(true, true).css({
                    display: 'none'
                }).fadeIn(20);
                $activeFrame = jQuery(this).find('iframe');
                jQuery("#divFrameLink").unbind('click');
                jQuery("#divFrameLink").bind('click', function (e) {
                    jQuery('#md-createsrc').css('max-width', '800px');
                    jQuery('#md-createsrc').simplemodal();
                    jQuery('#md-createsrc').data('simplemodal').show();
                    jQuery('#txtSrc').val($activeFrame.attr('src'));
                    jQuery('#btnSrcOk').unbind('click');
                    jQuery('#btnSrcOk').bind('click', function (e) {
                        var srcUrl = jQuery('#txtSrc').val();
                        var youRegex = /^http[s]?:\/\/(((www.youtube.com\/watch\?(feature=player_detailpage&)?)v=)|(youtu.be\/))([^#\&\?]*)/;
                        var vimeoRegex = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/)|(video\/))?([0-9]+)\/?/;
                        var youRegexMatches = youRegex.exec(srcUrl);
                        var vimeoRegexMatches = vimeoRegex.exec(srcUrl);
                        if (youRegexMatches != null || vimeoRegexMatches != null) {
                            if (youRegexMatches != null && youRegexMatches.length >= 7) {
                                var youMatch = youRegexMatches[6];
                                srcUrl = '//www.youtube.com/embed/' + youMatch + '?rel=0'
                            }
                            if (vimeoRegexMatches != null && vimeoRegexMatches.length >= 7) {
                                var vimeoMatch = vimeoRegexMatches[6];
                                srcUrl = '//player.vimeo.com/video/' + vimeoMatch
                            }
                        }
                        $activeFrame.attr('src', srcUrl);
                        if (jQuery('#txtSrc').val() == '') {
                            $activeFrame.attr('src', '')
                        }
                        jQuery('#md-createsrc').data('simplemodal').hide();
                        for (var i = 0; i < instances.length; i++) {
                            jQuery(instances[i]).data('contenteditor').settings.hasChanged = true;
                            jQuery(instances[i]).data('contenteditor').render()
                        }
                    })
                });
                jQuery("#divFrameLink").hover(function (e) {
                    jQuery(this).stop(true, true).css("display", "block")
                }, function () {
                    jQuery(this).stop(true, true).fadeOut(0)
                })
            }, function (e) {
                jQuery("#divFrameLink").stop(true, true).fadeOut(0)
            });
            $element.find('a').not('.not-a').unbind('hover');
            $element.find('a').not('.not-a').hover(function (e) {
                if (jQuery(this).parents("[data-mode='code']").length > 0) return;
                if (jQuery(this).parents("[data-mode='readonly']").length > 0) return;
                if (jQuery(this).children('img').length == 1 && jQuery(this).children().length == 1) return;
                var zoom = localStorage.zoom;
                if (zoom == 'normal') zoom = 1;
                if (zoom == undefined) zoom = 1;
                zoom = zoom + '';
                if (zoom.indexOf('%') != -1) {
                    zoom = zoom.replace('%', '') / 100
                }
                if (zoom == 'NaN') {
                    zoom = 1
                }
                zoom = zoom * 1;
                var _top;
                var _left;
                var scrolltop = jQuery(window).scrollTop();
                var offsettop = jQuery(this).offset().top;
                var offsetleft = jQuery(this).offset().left;
                var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                var is_ie = detectIE();
                var browserok = true;
                if (is_firefox || is_ie) browserok = false;
                if (browserok) {
                    _top = ((offsettop - 27) * zoom) + (scrolltop - scrolltop * zoom);
                    _left = offsetleft * zoom
                } else {
                    if (is_ie) {
                        var space = $element.getPos().top;
                        var adjy_val = (-space / 1.1) * zoom + space / 1.1;
                        var space2 = $element.getPos().left;
                        var adjx_val = -space2 * zoom + space2;
                        var p = jQuery(this).getPos();
                        _top = ((p.top - 25) * zoom) + adjy_val;
                        _left = (p.left * zoom) + adjx_val
                    }
                    if (is_firefox) {
                        _top = offsettop - 25;
                        _left = offsetleft
                    }
                }
                jQuery("#divRteLink").css("top", _top + "px");
                jQuery("#divRteLink").css("left", _left + "px");
                jQuery("#divRteLink").stop(true, true).css({
                    display: 'none'
                }).fadeIn(20);
                $activeLink = jQuery(this);
                jQuery("#divRteLink").unbind('click');
                jQuery("#divRteLink").bind('click', function (e) {
                    jQuery('#md-createlink').css('max-width', '550px');
                    jQuery('#md-createlink').simplemodal({
                        onCancel: function () {
                            if ($activeLink.attr('href') == 'http://') $activeLink.replaceWith($activeLink.html())
                        }
                    });
                    jQuery('#md-createlink').data('simplemodal').show();
                    jQuery('#txtLink').val($activeLink.attr('href'));
                    jQuery('#txtLinkText').val($activeLink.html());
                    jQuery('#txtLinkTitle').val($activeLink.attr('title'));
                    if ($activeLink.attr('target') == '_blank') {
                        jQuery('#chkNewWindow').prop('checked', true)
                    } else {
                        jQuery('#chkNewWindow').removeAttr('checked')
                    }
                    jQuery('#btnLinkOk').unbind('click');
                    jQuery('#btnLinkOk').bind('click', function (e) {
                        $activeLink.attr('href', jQuery('#txtLink').val());
                        if (jQuery('#txtLink').val() == 'http://' || jQuery('#txtLink').val() == '') {
                            $activeLink.replaceWith($activeLink.html())
                        }
                        $activeLink.html(jQuery('#txtLinkText').val());
                        $activeLink.attr('title', jQuery('#txtLinkTitle').val());
                        if (jQuery('#chkNewWindow').is(":checked")) {
                            $activeLink.attr('target', '_blank')
                        } else {
                            $activeLink.removeAttr('target')
                        }
                        jQuery('#md-createlink').data('simplemodal').hide();
                        for (var i = 0; i < instances.length; i++) {
                            jQuery(instances[i]).data('contenteditor').settings.hasChanged = true;
                            jQuery(instances[i]).data('contenteditor').render()
                        }
                    })
                });
                jQuery("#divRteLink").hover(function (e) {
                    jQuery(this).stop(true, true).css("display", "block")
                }, function () {
                    jQuery(this).stop(true, true).fadeOut(0)
                })
            }, function (e) {
                jQuery("#divRteLink").stop(true, true).fadeOut(0)
            });
            jQuery("#btnLinkBrowse").unbind('click');
            jQuery("#btnLinkBrowse").bind('click', function (e) {
                jQuery("#divToolImg").stop(true, true).fadeOut(0);
                jQuery("#divToolImgSettings").stop(true, true).fadeOut(0);
                jQuery("#divRteLink").stop(true, true).fadeOut(0);
                jQuery("#divFrameLink").stop(true, true).fadeOut(0);
                var sFunc = ($element.data('contenteditor').settings.onFileSelectClick + '').replace(/\s/g, '');
                if (sFunc != 'function(){}') {
                    $element.data('contenteditor').settings.onFileSelectClick({
                        targetInput: jQuery("#txtLink").get(0),
                        theTrigger: jQuery("#btnLinkBrowse").get(0)
                    })
                } else {
                    jQuery('#ifrFileBrowse').attr('src', $element.data('contenteditor').settings.fileselect);
                    jQuery('#active-input').val('txtLink');
                    jQuery('#md-fileselect').css('width', '65%');
                    jQuery('#md-fileselect').simplemodal();
                    jQuery('#md-fileselect').data('simplemodal').show()
                }
            });
            $element.data('contenteditor').settings.onRender();
            $element.data('contenteditor').contentRender()
        };
        this.prepareRteCommand = function (s) {
            jQuery('#rte-toolbar *[data-rte-cmd="' + s + '"]').unbind('click');
            jQuery('#rte-toolbar *[data-rte-cmd="' + s + '"]').click(function (e) {
                try {
                    document.execCommand(s, false, null)
                } catch (e) {
                    $element.attr('contenteditable', true);
                    document.execCommand(s, false, null);
                    $element.removeAttr('contenteditable');
                    $element.data('contenteditor').render()
                }
                jQuery(this).blur();
                $element.data('contenteditor').settings.hasChanged = true;
                e.preventDefault()
            })
        };
        this.applyColor = function (s, text) {
            var el;
            var curr;
            if (window.getSelection) {
                curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                if (curr.nodeType == 3) {
                    el = curr.parentNode
                } else {
                    el = curr
                }
            } else if (document.selection) {
                curr = document.selection.createRange();
                el = document.selection.createRange().parentElement()
            }
            var selColMode = jQuery('#selColorApplyTo').val();
            if (jQuery.trim(text) != '' && jQuery(el).text() != text) {
                if (selColMode == 1) {
                    document.execCommand("ForeColor", false, s)
                }
                if (selColMode == 2) {
                    document.execCommand("BackColor", false, s)
                }
                var fontElements = document.getElementsByTagName("font");
                for (var i = 0, len = fontElements.length; i < len; ++i) {
                    var s = fontElements[i].color;
                    if (s != '') {
                        fontElements[i].removeAttribute("color");
                        fontElements[i].style.color = s
                    }
                }
                var is_ie = detectIE();
                if (is_ie) {
                    $activeElement.find('span').each(function () {
                        if (jQuery(this).find('span').length == 1) {
                            if (jQuery(this).text() == jQuery(this).find('span:first').text()) {
                                var innerspanstyle = jQuery(this).find('span:first').attr('style');
                                jQuery(this).html(jQuery(this).find('span:first').html());
                                var newstyle = jQuery(this).attr('style') + ';' + innerspanstyle;
                                jQuery(this).attr('style', newstyle)
                            }
                        }
                    })
                }
            } else if (jQuery(el).text() == text) {
                if (selColMode == 1) {
                    if (jQuery(el).html()) {
                        jQuery(el).css('color', s)
                    } else {
                        jQuery(el).parent().css('color', s)
                    }
                }
                if (selColMode == 2) {
                    if (jQuery(el).html()) {
                        jQuery(el).css('background-color', s)
                    } else {
                        jQuery(el).parent().css('background-color', s)
                    }
                }
            } else {
                if (selColMode == 1) {
                    jQuery(el).css('color', s)
                }
                if (selColMode == 2) {
                    jQuery(el).css('background-color', s)
                }
            };
            if (selColMode == 3) {
                jQuery(el).parents('.ui-draggable').children().first().css('background-color', s)
            }
        };
        this.init()
    };
    jQuery.fn.contenteditor = function (options) {
        return this.each(function () {
            instances.push(this);
            if (undefined == jQuery(this).data('contenteditor')) {
                var plugin = new jQuery.contenteditor(this, options);
                jQuery(this).data('contenteditor', plugin)
            }
        })
    }
})(jQuery);

function pasteContent($activeElement) {
    var savedSel = saveSelection();
    jQuery('#idContentWord').remove();
    var tmptop = $activeElement.offset().top;
    jQuery('#divCb').append("<div style='position:absolute;z-index:-1000;top:" + tmptop + "px;left:-1000px;width:1px;height:1px;overflow:auto;' name='idContentWord' id='idContentWord' contenteditable='true'></div>");
    var pasteFrame = document.getElementById("idContentWord");
    pasteFrame.focus();
    setTimeout(function () {
        try {
            restoreSelection(savedSel);
            var $node = jQuery(getSelectionStartNode());
            if (jQuery('#idContentWord').length == 0) return;
            var sPastedText = '';
            var bRichPaste = false;
            if (jQuery('#idContentWord table').length > 0 || jQuery('#idContentWord img').length > 0 || jQuery('#idContentWord p').length > 0 || jQuery('#idContentWord a').length > 0) {
                bRichPaste = true
            }
            if (bRichPaste) {
                sPastedText = jQuery('#idContentWord').html();
                sPastedText = cleanHTML(sPastedText);
                jQuery('#idContentWord').html(sPastedText);
                if (jQuery('#idContentWord').children('p,h1,h2,h3,h4,h5,h6,ul,li').length > 1) {
                    jQuery('#idContentWord').contents().filter(function () {
                        return (this.nodeType == 3 && jQuery.trim(this.nodeValue) != '')
                    }).wrap("<p></p>").end().filter("br").remove()
                }
                sPastedText = '<div class="edit">' + jQuery('#idContentWord').html() + '</div>'
            } else {
                jQuery('#idContentWord').find('p,h1,h2,h3,h4,h5,h6').each(function () {
                    jQuery(this).html(jQuery(this).html() + ' ')
                });
                sPastedText = jQuery('#idContentWord').text()
            }
            jQuery('#idContentWord').remove();
            var oSel = window.getSelection();
            var range = oSel.getRangeAt(0);
            range.extractContents();
            range.collapse(true);
            var docFrag = range.createContextualFragment(sPastedText);
            var lastNode = docFrag.lastChild;
            range.insertNode(docFrag);
            range.setStartAfter(lastNode);
            range.setEndAfter(lastNode);
            range.collapse(false);
            var comCon = range.commonAncestorContainer;
            if (comCon && comCon.parentNode) {
                try {
                    comCon.parentNode.normalize()
                } catch (e) { }
            }
            oSel.removeAllRanges();
            oSel.addRange(range)
        } catch (e) {
            jQuery('#idContentWord').remove()
        }
    }, 200)
}
var savedSel;

function saveSelection() {
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            var ranges = [];
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                ranges.push(sel.getRangeAt(i))
            }
            return ranges
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange()
    }
    return null
};

function restoreSelection(savedSel) {
    if (savedSel) {
        if (window.getSelection) {
            sel = window.getSelection();
            sel.removeAllRanges();
            for (var i = 0, len = savedSel.length; i < len; ++i) {
                sel.addRange(savedSel[i])
            }
        } else if (document.selection && savedSel.select) {
            savedSel.select()
        }
    }
};

function getSelectionStartNode() {
    var node, selection;
    if (window.getSelection) {
        selection = getSelection();
        node = selection.anchorNode
    }
    if (!node && document.selection) {
        selection = document.selection;
        var range = selection.getRangeAt ? selection.getRangeAt(0) : selection.createRange();
        node = range.commonAncestorContainer ? range.commonAncestorContainer : range.parentElement ? range.parentElement() : range.item(0)
    }
    if (node) {
        return (node.nodeName == "#text" ? node.parentNode : node)
    }
};
var getSelectedNode = function () {
    var node, selection;
    if (window.getSelection) {
        selection = getSelection();
        node = selection.anchorNode
    }
    if (!node && document.selection) {
        selection = document.selection;
        var range = selection.getRangeAt ? selection.getRangeAt(0) : selection.createRange();
        node = range.commonAncestorContainer ? range.commonAncestorContainer : range.parentElement ? range.parentElement() : range.item(0)
    }
    if (node) {
        return (node.nodeName == "#text" ? node.parentNode : node)
    }
};

function getSelected() {
    if (window.getSelection) {
        return window.getSelection()
    } else if (document.getSelection) {
        return document.getSelection()
    } else {
        var selection = document.selection && document.selection.createRange();
        if (selection.text) {
            return selection.text
        }
        return false
    }
    return false
};

function pasteHtmlAtCaret(html, selectPastedContent) {
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(),
                node, lastNode;
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node)
            }
            var firstNode = frag.firstChild;
            range.insertNode(frag);
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                if (selectPastedContent) {
                    range.setStartBefore(firstNode)
                } else {
                    range.collapse(true)
                }
                sel.removeAllRanges();
                sel.addRange(range)
            }
        }
    } else if ((sel = document.selection) && sel.type != "Control") {
        var originalRange = sel.createRange();
        originalRange.collapse(true);
        sel.createRange().pasteHTML(html);
        if (selectPastedContent) {
            range = sel.createRange();
            range.setEndPoint("StartToStart", originalRange);
            range.select()
        }
    }
}
var $savedSel;
var $activeIcon;

function applyIconClass(s) {
    if ($activeIcon) {
        var sClassSize = "";
        if ($activeIcon.hasClass('size-12')) sClassSize = 'size-12';
        if ($activeIcon.hasClass('size-14')) sClassSize = 'size-14';
        if ($activeIcon.hasClass('size-16')) sClassSize = 'size-16';
        if ($activeIcon.hasClass('size-18')) sClassSize = 'size-18';
        if ($activeIcon.hasClass('size-21')) sClassSize = 'size-21';
        if ($activeIcon.hasClass('size-24')) sClassSize = 'size-24';
        if ($activeIcon.hasClass('size-32')) sClassSize = 'size-32';
        if ($activeIcon.hasClass('size-48')) sClassSize = 'size-48';
        if ($activeIcon.hasClass('size-64')) sClassSize = 'size-64';
        if ($activeIcon.hasClass('size-80')) sClassSize = 'size-80';
        if ($activeIcon.hasClass('size-96')) sClassSize = 'size-96';
        $activeIcon.css('font-size', '');
        if (s.indexOf('size-') == -1 && s != '') {
            $activeIcon.attr('class', s);
            if (sClassSize != '') $activeIcon.addClass(sClassSize)
        } else {
            $activeIcon.removeClass('size-12');
            $activeIcon.removeClass('size-14');
            $activeIcon.removeClass('size-16');
            $activeIcon.removeClass('size-18');
            $activeIcon.removeClass('size-21');
            $activeIcon.removeClass('size-24');
            $activeIcon.removeClass('size-32');
            $activeIcon.removeClass('size-48');
            $activeIcon.removeClass('size-64');
            $activeIcon.removeClass('size-80');
            $activeIcon.removeClass('size-96');
            $activeIcon.addClass(s)
        }
    } else {
        restoreSelection($savedSel);
        pasteHtmlAtCaret(' <i class="' + s + '"></i> ', true);
        jQuery(cb_list).each(function () {
            jQuery(this).data('contenteditor').contentRender()
        })
    }
}
var $imgActive;
(function (jQuery) {
    var tmpCanvas;
    var nInitialWidth;
    var nInitialHeight;
    jQuery.imageembed = function (element, options) {
        var defaults = {
            hiquality: false,
            imageselect: '',
            fileselect: '',
            imageEmbed: true,
            linkDialog: true,
            zoom: 0,
            customval: 0,
            largerImageHandler: '',
            onChanged: function () { },
            onImageBrowseClick: function () { },
            onImageSettingClick: function () { },
            onImageSelectClick: function () { },
            onFileSelectClick: function () { }
        };
        this.settings = {};
        var $element = jQuery(element),
            element = element;
        this.init = function () {
            this.settings = jQuery.extend({}, defaults, options);
            if (jQuery('#divCb').length == 0) {
                jQuery('body').append('<div id="divCb"></div>')
            }
            var html_photo_file = '';
            var html_photo_file2 = '';
            if (navigator.appName.indexOf('Microsoft') != -1) {
                html_photo_file = '<div id="divToolImg"><div class="fileinputs"><input type="file" name="fileImage" id="fileImage" class="my-file" /><div class="fakefile"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAC+klEQVRoQ+2au24aQRSGz+ySkEvPA9AQubNEhXgCSogEShmZGkSQpTS8AjUNSAjXlCRNStpQ8QK8AI6UOLazM5lZvGRvswsz43hYz0iWZe3uzPnOf25rQOVymcAzWsgAZ1xto3DGBQajsFE4Yx4wIZ0xQSM4RmGjcMY8YEI6Y4LKFy0H/9TCJ7b1VsiOo0PaAAv5Wf4ho/CBPjQhneYokRyezWZQKpW4WzuOA71eD5bLZdrx++vahnSz2YRutwu5XC4RZrPZQL1eP33g4XAI1Wo1FeRYlbVQ+FA1U+kfblitVtBut2Nvf3LgQqEAk8kE2G9VC2MM4/EYRqNRZMsnBy4WizCdTiGfz6vidffhqaw98Ha7hU6nA+v1OuCQfr8PLBV46ySB/bAeoL8qJ0GfHLA/D8P9OOmap/jJAXvq1mq12NB1lW404LL/GVqtD5QTPfwwZEJz+DtcXHwEDPf0z3+f+2mbw17oxvZjhIBgGz71LqFSqcQ6xK8wgT+AyZ0L/t+AMflNz3MiNYZXpXkKI2SDhfKw3V67xYwXAdGQJhT6lj77SqgbHP3ywMLMITeB8GIn84C9PJ3P5/s+vYPdGbxYLGAwGABv3k4aPkSIBYAZMg0tfBs4L6kP+yvy7OoKzt6dg3+UTJrQtABmpOHQThs8PGjbeuMrSuDmbdLLhTbAYZXTgJmTEMrBj+sbbs6yPb1KzMIewOJOWiLh7Nog85UH/7vxobO0bb12QYJrV4jCxZA56OuXb26Oq1pSwOGwTgtPz2gLvaRqv9gzOORXpAiyiywN3jdagXtlwaWACbnf9UWBxdRjbWmnLA1l3qK92kYs79UsOeCYaq3GrOAuokNGnC1SwLRWg4NpT37kpREwHUIwzb9HXs8LWKccZsKK/Nv24IBwYdkIGm5jB+8QuVEyh+WA2XDBqjVygfyvheJAaU9KA6cdoNt1A6ybIqrtMQqr9qhu+xmFdVNEtT1GYdUe1W0/o7Buiqi2xyis2qO67WcU1k0R1fb8BZv85KDCNGIQAAAAAElFTkSuQmCC" /></div></div></div>';
                html_photo_file2 = ''
            } else {
                html_photo_file = '<div style="display:none"><input type="file" name="fileImage" id="fileImage" class="my-file"></div>';
                html_photo_file2 = '<div id="divToolImg">' + '<i id="lnkEditImage" class="cb-icon-camera"></i>' + '</div>'
            }
            var html_photo_tool = '<div id="divTempContent" style="display:none"></div>' + '<div class="overlay-bg" style="position:fixed;top:0;left:0;width:1;height:1;z-index:10000;zoom 1;background:#fff;opacity:0.8"></div>' + '<div id="divImageEdit" style="position:absolute;display:none;z-index:10000">' + '<div id="my-mask" style="width:200px;height:200px;overflow:hidden;">' + '<img id="my-image" src="" style="max-width:none" /><img id="my-image-nocrop" src="" style="max-width:none" />' + '</div>' + '<div id="img-control" style="margin-top:1px;position:absolute;top:-27px;left:0px;width:235px;opacity:0.8">' + '<button id="btnImageCancel" type="button" value="Cancel" ><i class="cb-icon-back"></i></button>' + '<button id="btnZoomOut" type="button" value="-" ><i class="cb-icon-minus"></i></button>' + '<button id="btnZoomIn" type="button" value="+" ><i class="cb-icon-plus"></i></button>' + '<button id="btnChangeImage" type="button" value="Ok" ><i class="cb-icon-ok"></i> Ok</button>' + '<button id="btnChangeImageNoCrop" type="button" value="No Crop" ><i class="cb-icon-ok"></i> No Crop</button>' + '</div>' + '</div>' + '<div style="display:none">' + '<canvas id="myCanvas"></canvas>' + '<canvas id="myTmpCanvas"></canvas>' + '<canvas id="myTmpCanvasNoCrop"></canvas>' + '</div>' + '<form id="canvasform" name="canvasform" method="post" action="" target="canvasframe" enctype="multipart/form-data">' + html_photo_file + '<input id="hidRefId" name="hidRefId" type="hidden" value="' + this.settings.customval + '" />' + '</form>' + '<iframe id="canvasframe" name="canvasframe" style="width:1px;height:1px;border:none;visibility:hidden;position:absolute"></iframe>';
            var bUseCustomImageSelect = false;
            if (this.settings.imageselect != '') bUseCustomImageSelect = true;
            var sFunc = (this.settings.onImageSelectClick + '').replace(/\s/g, '');
            if (sFunc != 'function(){}') {
                bUseCustomImageSelect = true
            }
            var bUseCustomFileSelect = false;
            if (this.settings.fileselect != '') bUseCustomFileSelect = true;
            var sFunc = (this.settings.onFileSelectClick + '').replace(/\s/g, '');
            if (sFunc != 'function(){}') {
                bUseCustomFileSelect = true
            }
            var imageEmbed = this.settings.imageEmbed;
            var html_hover_icons = html_photo_file2 + '<div id="divToolImgSettings">' + '<i id="lnkImageSettings" class="cb-icon-link"></i>' + '</div>' + '<div id="divToolImgLoader">' + '<i id="lnkImageLoader" class="cb-icon-spin animate-spin"></i>' + '</div>' + '' + '<div class="md-modal" id="md-img">' + '<div class="md-content">' + '<div class="md-body">' + '<div class="md-tabs">' + '<span id="tabImgLnk" class="active">IMAGE</span>' + '<span id="tabImgPl">BLANK PLACEHOLDER</span>' + '</div>' + '<div id="divImgPl" style="overflow-y:auto;overflow-x:hidden;display:none;box-sizing:border-box;padding:10px 10px 10px">';
            html_hover_icons += '<div style="padding:12px 20px 20px;width:100%;text-align:center;">';
            html_hover_icons += 'DIMENSION (WxH): &nbsp; <select id="selImgW">';
            var valW = 50;
            for (var i = 0; i < 231; i++) {
                var selected = '';
                if (i == 90) selected = ' selected="selected"';
                html_hover_icons += '<option value="' + valW + '"' + selected + '>' + valW + 'px</option>';
                valW += 5
            }
            html_hover_icons += '</select> &nbsp; ';
            html_hover_icons += '<select id="selImgH">';
            var valH = 50;
            for (var i = 0; i < 111; i++) {
                var selected = '';
                if (i == 40) selected = ' selected="selected"';
                html_hover_icons += '<option value="' + valH + '"' + selected + '>' + valH + 'px</option>';
                valH += 5
            }
            html_hover_icons += '</select> &nbsp; ';
            html_hover_icons += '<select id="selImgStyle">';
            html_hover_icons += '<option value="square">Square</option>';
            html_hover_icons += '<option value="circle">Circle</option>';
            html_hover_icons += '</select>';
            html_hover_icons += '<button id="btnInsertPlh" style="margin-left:12px"> REPLACE </button>';
            html_hover_icons += '</div>' + '</div>' + '<div id="divImgLnk">' + '<div class="md-label">Source:</div>' + (bUseCustomImageSelect ? '<input type="text" id="txtImgUrl" class="inptxt" style="float:left;width:50%"></input><i class="cb-icon-link md-btnbrowse" id="btnImageBrowse" style="width:10%;"></i>' : '<input type="text" id="txtImgUrl" class="inptxt" style="float:left;width:60%"></input>') + '<br style="clear:both">' + '<div class="md-label">Title:</div>' + '<input type="text" id="txtAltText" class="inptxt" style="float:right;width:60%"></input>' + '<br style="clear:both">' + '<div class="md-label">Link:</div>' + (bUseCustomFileSelect ? '<input type="text" id="txtLinkUrl" class="inptxt" style="float:left;width:50%"></input><i class="cb-icon-link md-btnbrowse" id="btnFileBrowse" style="width:10%;"></i>' : '<input type="text" id="txtLinkUrl" class="inptxt" style="float:left;width:60%"></input>') + '<br style="clear:both">' + '<div id="divEmbedOriginal">' + '<div class="md-label">&nbsp;</div>' + '<label style="float:left;" for="chkCrop" class="inpchk"><input type="checkbox" id="chkCrop"></input> Crop</label>' + '<br style="clear:both" />' + '</div>' + '</div>' + '</div>' + '<div id="divImgLnkOk" class="md-footer">' + '<button id="btnImgOk"> Ok </button>' + '</div>' + '</div>' + '</div>' + '' + '<div class="md-modal" id="md-imageselect">' + '<div class="md-content">' + '<div class="md-body">' + (bUseCustomImageSelect ? '<iframe id="ifrImageBrowse" style="width:100%;height:400px;border: none;display: block;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAFElEQVQYV2P8DwQMBADjqCKiggAAmZsj5vuXmnUAAAAASUVORK5CYII="></iframe>' : '') + '</div>' + '</div>' + '</div>' + '';
            if (jQuery('#md-fileselect').length == 0) {
                html_hover_icons += '<div class="md-modal" id="md-fileselect">' + '<div class="md-content">' + '<div class="md-body">' + (bUseCustomFileSelect ? '<iframe id="ifrFileBrowse" style="width:100%;height:400px;border: none;display: block;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAFElEQVQYV2P8DwQMBADjqCKiggAAmZsj5vuXmnUAAAAASUVORK5CYII="></iframe>' : '') + '</div>' + '</div>' + '</div>'
            }
            if (jQuery('#active-input').length == 0) {
                html_hover_icons += '<input type="hidden" id="active-input" />'
            }
            if (jQuery('#divToolImg').length == 0) {
                jQuery('#divCb').append(html_photo_tool);
                jQuery('#divCb').append(html_hover_icons)
            }
            tmpCanvas = document.getElementById('myTmpCanvas');
            $element.hover(function (e) {
                var zoom;
                if (localStorage.getItem("zoom") != null) {
                    zoom = localStorage.zoom
                } else {
                    zoom = $element.parents('[style*="zoom"]').css('zoom');
                    if (zoom == 'normal') zoom = 1;
                    if (zoom == undefined) zoom = 1
                }
                var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                zoom = zoom + '';
                if (zoom.indexOf('%') != -1) {
                    zoom = zoom.replace('%', '') / 100
                }
                if (zoom == 'NaN') {
                    zoom = 1
                }
                localStorage.zoom = zoom;
                zoom = zoom * 1;
                if (cb_list == '') zoom = 1;
                if ($element.data("imageembed").settings.zoom == 1) {
                    zoom = 1
                }
                var _top;
                var _top2;
                var _left;
                var scrolltop = jQuery(window).scrollTop();
                var offsettop = jQuery(this).offset().top;
                var offsetleft = jQuery(this).offset().left;
                var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                var is_ie = detectIE();
                var is_edge = detectEdge();
                var browserok = true;
                if (is_firefox || is_ie || is_edge) browserok = false;
                var _top_adj = !jQuery(this).data("imageembed").settings.imageEmbed ? 9 : -35;
                if (browserok) {
                    _top = ((offsettop + parseInt(jQuery(this).css('height')) / 2) - 15) * zoom + (scrolltop - scrolltop * zoom);
                    _left = ((offsetleft + parseInt(jQuery(this).css('width')) / 2) - 15) * zoom;
                    _top2 = _top + _top_adj
                } else {
                    if (is_edge) { }
                    if (is_ie) {
                        var space = 0;
                        var space2 = 0;
                        $element.parents().each(function () {
                            if (jQuery(this).data('contentbuilder')) {
                                space = jQuery(this).getPos().top;
                                space2 = jQuery(this).getPos().left
                            }
                        });
                        var adjy_val = -space * zoom + space;
                        var adjx_val = -space2 * zoom + space2;
                        var p = jQuery(this).getPos();
                        _top = ((p.top - 15 + parseInt(jQuery(this).css('height')) / 2)) * zoom + adjy_val;
                        _left = ((p.left - 15 + parseInt(jQuery(this).css('width')) / 2)) * zoom + adjx_val;
                        _top2 = _top + _top_adj
                    }
                    if (is_firefox) {
                        var imgwidth = parseInt(jQuery(this).css('width'));
                        var imgheight = parseInt(jQuery(this).css('height'));
                        _top = offsettop - 15 + imgheight * zoom / 2;
                        _left = offsetleft - 15 + imgwidth * zoom / 2;
                        _top2 = _top + _top_adj
                    }
                }
                var fixedimage = false;
                $imgActive = jQuery(this);
                if ($imgActive.attr('data-fixed') == 1) {
                    fixedimage = true
                }
                if (cb_edit && !fixedimage) {
                    jQuery("#divToolImg").css("top", _top + "px");
                    jQuery("#divToolImg").css("left", _left + "px");
                    if (jQuery(this).data("imageembed").settings.imageEmbed) {
                        jQuery("#divToolImg").stop(true, true).css({
                            display: 'none'
                        }).fadeIn(20)
                    }
                    if (jQuery(this).data("imageembed").settings.linkDialog) {
                        jQuery("#divToolImgSettings").css("top", _top2 + "px");
                        jQuery("#divToolImgSettings").css("left", _left + "px");
                        jQuery("#divToolImgSettings").stop(true, true).css({
                            display: 'none'
                        }).fadeIn(20)
                    } else {
                        jQuery("#divToolImgSettings").css("top", "-10000px")
                    }
                }
                if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
                    jQuery("#lnkImageSettings").on('touchstart mouseenter focus', function (e) {
                        if (e.type == 'touchstart') {
                            e.stopImmediatePropagation();
                            e.preventDefault()
                        }
                        jQuery("#lnkImageSettings").click();
                        e.preventDefault();
                        e.stopImmediatePropagation()
                    })
                }
                jQuery("#divToolImg").unbind('click');
                jQuery("#divToolImg").bind('click', function (e) {
                    jQuery("#divToolImg").data('image', $imgActive);
                    var sFunc = ($element.data('imageembed').settings.onImageBrowseClick + '').replace(/\s/g, '');
                    if (sFunc != 'function(){}') {
                        $element.data('imageembed').settings.onImageBrowseClick()
                    } else {
                        jQuery('input.my-file[type=file]').click()
                    }
                    e.preventDefault();
                    e.stopImmediatePropagation()
                });
                jQuery("#divToolImg").unbind('hover');
                jQuery("#divToolImg").hover(function (e) {
                    if (imageEmbed) {
                        jQuery("#divToolImg").stop(true, true).css("display", "block")
                    }
                    jQuery("#divToolImgSettings").stop(true, true).css("display", "block")
                }, function () {
                    jQuery("#divToolImg").stop(true, true).fadeOut(0);
                    jQuery("#divToolImgSettings").stop(true, true).fadeOut(0)
                });
                $element.find('figcaption').unbind('hover');
                $element.find('figcaption').hover(function (e) {
                    if (imageEmbed) {
                        jQuery("#divToolImg").stop(true, true).css("display", "block")
                    }
                    jQuery("#divToolImgSettings").stop(true, true).css("display", "block")
                }, function () {
                    jQuery("#divToolImg").stop(true, true).fadeOut(0);
                    jQuery("#divToolImgSettings").stop(true, true).fadeOut(0)
                });
                jQuery("#divToolImgSettings").unbind('hover');
                jQuery("#divToolImgSettings").hover(function (e) {
                    if (imageEmbed) {
                        jQuery("#divToolImg").stop(true, true).css("display", "block")
                    }
                    jQuery("#divToolImgSettings").stop(true, true).css("display", "block")
                }, function () {
                    jQuery("#divToolImg").stop(true, true).fadeOut(0);
                    jQuery("#divToolImgSettings").stop(true, true).fadeOut(0)
                });
                jQuery("#lnkImageSettings").unbind('click');
                jQuery("#lnkImageSettings").bind('click', function (e) {
                    jQuery("#divToolImg").data('image', $imgActive);
                    jQuery("#divToolImg").stop(true, true).fadeOut(0);
                    jQuery("#divToolImgSettings").stop(true, true).fadeOut(0);
                    var sFunc = ($element.data('imageembed').settings.onImageSettingClick + '').replace(/\s/g, '');
                    if (sFunc != 'function(){}') {
                        $element.data('imageembed').settings.onImageSettingClick();
                        return
                    }
                    jQuery('#md-img').css('max-width', '800px');
                    jQuery('#md-img').simplemodal();
                    jQuery('#md-img').data('simplemodal').show();
                    var $img = $element;
                    if ($element.prop("tagName").toLowerCase() == 'figure') {
                        $img = $element.find('img:first')
                    }
                    if ($img.attr('src').indexOf('base64') == -1) {
                        jQuery('#txtImgUrl').val($img.attr('src'))
                    } else {
                        jQuery('#txtImgUrl').val('[Image Data]')
                    }
                    jQuery('#txtAltText').val($img.attr('alt'));
                    jQuery('#txtLinkUrl').val('');
                    if ($img.parents('a:first') != undefined) {
                        jQuery('#txtLinkUrl').val($img.parents('a:first').attr('href'))
                    }
                    if (!$element.data('imageembed').settings.imageEmbed) {
                        jQuery('#divEmbedOriginal').css("display", "none")
                    }
                    jQuery('#chkCrop').removeAttr('checked');
                    jQuery('#btnImgOk').unbind('click');
                    jQuery('#btnImgOk').bind('click', function (e) {
                        var builder;
                        $element.parents().each(function () {
                            if (jQuery(this).data('contentbuilder')) {
                                builder = jQuery(this).data('contentbuilder')
                            }
                        });
                        var insertOri = false;
                        if (jQuery('#chkCrop').is(":checked")) { } else {
                            insertOri = true
                        }
                        if (insertOri == false) {
                            if (jQuery('#txtImgUrl').val().indexOf("http") != -1) {
                                insertOri = true
                            }
                        }
                        if ($img.attr('src') != jQuery('#txtImgUrl').val()) {
                            if (insertOri) {
                                if ($img.attr('src').indexOf(sScriptPath + 'image.png') != -1 && jQuery('#txtImgUrl').val().indexOf(sScriptPath + 'image.png') == -1) {
                                    $img.css('width', '');
                                    $img.css('height', '')
                                }
                                if (jQuery('#txtImgUrl').val().indexOf('[Image Data]') == -1) {
                                    $img.attr('src', jQuery('#txtImgUrl').val())
                                } else { }
                            } else {
                                processImage(jQuery('#txtImgUrl').val())
                            }
                        }
                        $img.attr('alt', jQuery('#txtAltText').val());
                        if (jQuery('#txtLinkUrl').val() == 'http://' || jQuery('#txtLinkUrl').val() == '') {
                            $img.parents('a:first').replaceWith($img.parents('a:first').html())
                        } else {
                            var imagelink = jQuery('#txtLinkUrl').val();
                            if ($img.parents('a:first').length == 0) {
                                $img.wrap('<a href="' + imagelink + '"></a>')
                            } else {
                                $img.parents('a:first').attr('href', imagelink)
                            }
                            $img.parents('a:first').attr('title', jQuery('#txtAltText').val());
                            if (imagelink.toLowerCase().indexOf('.jpg') != -1 || imagelink.toLowerCase().indexOf('.jpeg') != -1 || imagelink.toLowerCase().indexOf('.png') != -1 || imagelink.toLowerCase().indexOf('.gif') != -1) {
                                $img.parents('a:first').addClass('is-lightbox');
                                $img.parents('a:first').attr('target', '_blank')
                            } else {
                                $img.parents('a:first').removeClass('is-lightbox');
                                $img.parents('a:first').removeAttr('target')
                            }
                        }
                        if (builder) builder.applyBehavior();
                        jQuery('#md-img').data('simplemodal').hide()
                    });
                    var actualW = $img[0].naturalWidth;
                    var actualH = $img[0].naturalHeight;
                    if ($img.attr('src').indexOf(sScriptPath + 'image.png') != -1) {
                        for (var i = 0; i < $img.attr("style").split(";").length; i++) {
                            var cssval = $img.attr("style").split(";")[i];
                            if (jQuery.trim(cssval.split(":")[0]) == "width") {
                                actualW = parseInt(jQuery.trim(cssval.split(":")[1]))
                            }
                            if (jQuery.trim(cssval.split(":")[0]) == "height") {
                                actualH = parseInt(jQuery.trim(cssval.split(":")[1]))
                            }
                        }
                    }
                    var valW = 50;
                    for (var i = 0; i < 231; i++) {
                        if (valW >= actualW) {
                            i = 231;
                            jQuery('#selImgW').val(valW)
                        }
                        valW += 5
                    }
                    var valH = 50;
                    for (var i = 0; i < 111; i++) {
                        if (valH >= actualH) {
                            i = 111;
                            jQuery('#selImgH').val(valH)
                        }
                        valH += 5
                    }
                    if (parseInt($img.css('border-radius')) == 500) {
                        jQuery('#selImgStyle').val('circle');
                        jQuery('#selImgH').css('display', 'none')
                    } else {
                        jQuery('#selImgStyle').val('square');
                        jQuery('#selImgH').css('display', 'inline')
                    }
                    jQuery('#selImgStyle').unbind('change');
                    jQuery('#selImgStyle').bind('change', function (e) {
                        if (jQuery('#selImgStyle').val() == 'circle') {
                            jQuery('#selImgH').css('display', 'none');
                            jQuery('#selImgH').val(jQuery('#selImgW').val())
                        } else {
                            jQuery('#selImgH').css('display', 'inline');
                            jQuery('#selImgH').val(jQuery('#selImgW').val())
                        }
                    });
                    jQuery('#selImgW').unbind('change');
                    jQuery('#selImgW').bind('change', function (e) {
                        if (jQuery('#selImgStyle').val() == 'circle') {
                            jQuery('#selImgH').val(jQuery('#selImgW').val())
                        }
                    });
                    jQuery('#btnInsertPlh').unbind('click');
                    jQuery('#btnInsertPlh').bind('click', function (e) {
                        var builder;
                        $element.parents().each(function () {
                            if (jQuery(this).data('contentbuilder')) {
                                builder = jQuery(this).data('contentbuilder')
                            }
                        });
                        $img.attr('src', sScriptPath + 'image.png');
                        $img.attr('alt', jQuery('#txtAltText').val());
                        if (jQuery('#selImgStyle').val() == 'circle') {
                            $img.css('border-radius', '500px');
                            jQuery('#selImgH').val(jQuery('#selImgW').val())
                        } else {
                            $img.css('border-radius', '');
                            $img.removeClass('circle')
                        }
                        $img.css('width', jQuery('#selImgW').val() + 'px');
                        $img.css('height', jQuery('#selImgH').val() + 'px');
                        if (builder) builder.applyBehavior();
                        jQuery('#md-img').data('simplemodal').hide()
                    });
                    e.preventDefault();
                    e.stopImmediatePropagation()
                });
                jQuery("#btnImageBrowse").unbind('click');
                jQuery("#btnImageBrowse").bind('click', function (e) {
                    jQuery("#divToolImg").stop(true, true).fadeOut(0);
                    jQuery("#divToolImgSettings").stop(true, true).fadeOut(0);
                    jQuery("#divRteLink").stop(true, true).fadeOut(0);
                    jQuery("#divFrameLink").stop(true, true).fadeOut(0);
                    var sFunc = ($element.data('imageembed').settings.onImageSelectClick + '').replace(/\s/g, '');
                    if (sFunc != 'function(){}') {
                        $element.data('imageembed').settings.onImageSelectClick({
                            targetInput: jQuery("#txtImgUrl").get(0),
                            theTrigger: jQuery("#btnImageBrowse").get(0)
                        })
                    } else {
                        jQuery('#ifrImageBrowse').attr('src', $element.data('imageembed').settings.imageselect);
                        jQuery('#active-input').val('txtImgUrl');
                        jQuery('#md-imageselect').css('width', '65%');
                        jQuery('#md-imageselect').simplemodal();
                        jQuery('#md-imageselect').data('simplemodal').show()
                    }
                });
                jQuery("#btnFileBrowse").unbind('click');
                jQuery("#btnFileBrowse").bind('click', function (e) {
                    jQuery("#divToolImg").stop(true, true).fadeOut(0);
                    jQuery("#divToolImgSettings").stop(true, true).fadeOut(0);
                    jQuery("#divRteLink").stop(true, true).fadeOut(0);
                    jQuery("#divFrameLink").stop(true, true).fadeOut(0);
                    var sFunc = ($element.data('imageembed').settings.onFileSelectClick + '').replace(/\s/g, '');
                    if (sFunc != 'function(){}') {
                        $element.data('imageembed').settings.onFileSelectClick({
                            targetInput: jQuery("#txtLinkUrl").get(0),
                            theTrigger: jQuery("#btnFileBrowse").get(0)
                        })
                    } else {
                        jQuery('#ifrFileBrowse').attr('src', $element.data('imageembed').settings.fileselect);
                        jQuery('#active-input').val('txtLinkUrl');
                        jQuery('#md-fileselect').css('width', '65%');
                        jQuery('#md-fileselect').simplemodal();
                        jQuery('#md-fileselect').data('simplemodal').show()
                    }
                });
                jQuery('.my-file[type=file]').unbind('change');
                jQuery('.my-file[type=file]').bind('change', function (e) {
                    changeImage(e);
                    jQuery('#my-image').attr('src', '');
                    if ($imgActive.parent().hasClass("is-lightbox")) { } else {
                        jQuery(this).clearInputs()
                    }
                });
                jQuery('#tabImgLnk').unbind('click');
                jQuery('#tabImgLnk').bind('click', function (e) {
                    jQuery('#tabImgLnk').addClass('active');
                    jQuery('#tabImgPl').removeClass('active');
                    jQuery('#divImgPl').fadeOut(300, function () {
                        jQuery('#divImgLnk').fadeIn(0);
                        jQuery('#divImgLnkOk').fadeIn(0)
                    })
                });
                jQuery('#tabImgPl').unbind('click');
                jQuery('#tabImgPl').bind('click', function (e) {
                    jQuery('#tabImgLnk').removeClass('active');
                    jQuery('#tabImgPl').addClass('active');
                    jQuery('#divImgLnk').fadeOut(0);
                    jQuery('#divImgLnkOk').fadeOut(0, function () {
                        jQuery('#divImgPl').fadeIn(300)
                    })
                })
            }, function (e) {
                jQuery("#divToolImg").stop(true, true).fadeOut(0);
                jQuery("#divToolImgSettings").stop(true, true).fadeOut(0)
            })
        };
        var changeImage = function (e) {
            if (typeof FileReader == "undefined") return true;
            var file = e.target.files[0];
            var extension = file.name.substr((file.name.lastIndexOf('.') + 1)).toLowerCase();
            if (extension != 'jpg' && extension != 'jpeg' && extension != 'png' && extension != 'gif' && extension != 'bmp') {
                alert('Please select an image');
                return
            }
            jQuery("#divToolImg").stop(true, true).fadeOut(0);
            jQuery("#divToolImgSettings").stop(true, true).fadeOut(0);
            jQuery('.overlay-bg').css('width', '100%');
            jQuery('.overlay-bg').css('height', '100%');
            jQuery("#divToolImgLoader").css('top', jQuery('#divToolImg').css('top'));
            jQuery("#divToolImgLoader").css('left', jQuery('#divToolImg').css('left'));
            jQuery("#divToolImgLoader").css('display', 'block');
            processImage(file)
        };
        var processImage = function (file) {
            var imgname, extension;
            if (!file.name) {
                imgname = file.substr((file.lastIndexOf('/') + 1));
                extension = file.substr((file.lastIndexOf('.') + 1)).toLowerCase()
            } else {
                imgname = file.name;
                extension = file.name.substr((file.name.lastIndexOf('.') + 1)).toLowerCase()
            }
            var hiquality = false;
            try {
                hiquality = $element.data('imageembed').settings.hiquality
            } catch (e) { };
            var type, quality;
            if (hiquality == false) {
                if (extension == 'jpg' || extension == 'jpeg') {
                    type = 'image/jpeg';
                    quality = 0.92
                } else {
                    type = 'image/png';
                    quality = 1
                }
            } else {
                type = 'image/png';
                quality = 1
            }
            loadImage.parseMetaData(file, function (data) {
                var orientation_num;
                if (data.exif) {
                    orientation_num = data.exif.get('Orientation')
                }
                loadImage(file, function (img) {
                    var cW, cH;
                    if (img.width > 3200 || img.height > 3200) {
                        cW = img.width / 2;
                        cH = img.height / 2
                    } else if (img.width > 2500 || img.height > 2500) {
                        cW = img.width / 1.25;
                        cH = img.height / 1.25
                    } else {
                        cW = img.width;
                        cH = img.height
                    }
                    if (orientation_num == 5 || orientation_num == 6 || orientation_num == 7 || orientation_num == 8) {
                        tmpCanvas.width = cH;
                        tmpCanvas.height = cW;
                        nInitialWidth = cH;
                        nInitialHeight = cW
                    } else {
                        tmpCanvas.width = cW;
                        tmpCanvas.height = cH;
                        nInitialWidth = cW;
                        nInitialHeight = cH
                    }
                    var oW;
                    var oH;
                    var imageNoCrop;
                    var tmpCanvasNoCrop = document.getElementById('myTmpCanvasNoCrop');
                    if (orientation_num == 5 || orientation_num == 6 || orientation_num == 7 || orientation_num == 8) {
                        tmpCanvasNoCrop.width = cH;
                        tmpCanvasNoCrop.height = cW;
                        var context = tmpCanvasNoCrop.getContext('2d');
                        context.drawImage(img, 0, 0, cH, cW);
                        imageNoCrop = tmpCanvasNoCrop.toDataURL(type, quality);
                        if (cH <= $imgActive.width() && cW <= $imgActive.height()) {
                            oW = cH;
                            oH = cW
                        } else if ($imgActive.width() < 70) {
                            oW = ($imgActive.parent().width() / cH) * cW;
                            oH = $imgActive.parent().width()
                        } else {
                            oW = ($imgActive.width() / cH) * cW;
                            oH = $imgActive.width()
                        }
                        jQuery("#my-image-nocrop").css('width', oH + 'px');
                        jQuery("#my-image-nocrop").css('height', oW + 'px')
                    } else {
                        tmpCanvasNoCrop.width = cW;
                        tmpCanvasNoCrop.height = cH;
                        var context = tmpCanvasNoCrop.getContext('2d');
                        context.drawImage(img, 0, 0, cW, cH);
                        imageNoCrop = tmpCanvasNoCrop.toDataURL(type, quality);
                        if (cW <= $imgActive.width() && cH <= $imgActive.height()) {
                            oW = cW;
                            oH = cH
                        } else if ($imgActive.width() < 70) {
                            oH = ($imgActive.parent().width() / cW) * cH;
                            oW = $imgActive.parent().width()
                        } else {
                            oH = ($imgActive.width() / cW) * cH;
                            oW = $imgActive.width()
                        }
                        jQuery("#my-image-nocrop").css('width', oW + 'px');
                        jQuery("#my-image-nocrop").css('height', oH + 'px')
                    }
                    var contextNoCrop = tmpCanvasNoCrop.getContext('2d');
                    if (orientation_num == 1) {
                        contextNoCrop.transform(1, 0, 0, 1, 0, 0)
                    } else if (orientation_num == 2) {
                        contextNoCrop.transform(-1, 0, 0, 1, oW, 0)
                    } else if (orientation_num == 3) {
                        contextNoCrop.transform(-1, 0, 0, -1, oW, oH)
                    } else if (orientation_num == 4) {
                        contextNoCrop.transform(1, 0, 0, -1, 0, oH)
                    } else if (orientation_num == 5) {
                        contextNoCrop.transform(0, 1, 1, 0, 0, 0)
                    } else if (orientation_num == 6) {
                        contextNoCrop.transform(0, 1, -1, 0, oH, 0)
                    } else if (orientation_num == 7) {
                        contextNoCrop.transform(0, -1, -1, 0, oH, oW)
                    } else if (orientation_num == 8) {
                        contextNoCrop.transform(0, -1, 1, 0, 0, oW)
                    } else { }
                    var nW;
                    var nH;
                    jQuery('#my-image-nocrop').attr('src', imageNoCrop);
                    jQuery('#my-image-nocrop').on('load', function () {
                        var imageObj = jQuery("#my-image-nocrop")[0];
                        var tmp = new Image(),
                            canvas;
                        nW = nInitialWidth;
                        nH = nInitialHeight;
                        tmp.src = imageObj.src;
                        tmp.onload = function () {
                            nW /= 2;
                            nH /= 2;
                            if (nW < imageObj.width) nW = imageObj.width;
                            if (nH < imageObj.height) nH = imageObj.height;
                            tmpCanvasNoCrop.width = nW;
                            tmpCanvasNoCrop.height = nH;
                            context = tmpCanvasNoCrop.getContext('2d');
                            context.drawImage(tmp, 0, 0, nW, nH);
                            if (nW <= imageObj.width || nH <= imageObj.height) {
                                return
                            }
                            tmp.src = tmpCanvasNoCrop.toDataURL(type, quality)
                        }
                    });
                    var context = tmpCanvas.getContext('2d');
                    if (orientation_num == 1) {
                        context.transform(1, 0, 0, 1, 0, 0)
                    } else if (orientation_num == 2) {
                        context.transform(-1, 0, 0, 1, cW, 0)
                    } else if (orientation_num == 3) {
                        context.transform(-1, 0, 0, -1, cW, cH)
                    } else if (orientation_num == 4) {
                        context.transform(1, 0, 0, -1, 0, cH)
                    } else if (orientation_num == 5) {
                        context.transform(0, 1, 1, 0, 0, 0)
                    } else if (orientation_num == 6) {
                        context.transform(0, 1, -1, 0, cH, 0)
                    } else if (orientation_num == 7) {
                        context.transform(0, -1, -1, 0, cH, cW)
                    } else if (orientation_num == 8) {
                        context.transform(0, -1, 1, 0, 0, cW)
                    } else { }
                    context.drawImage(img, 0, 0, cW, cH);
                    var image = tmpCanvas.toDataURL(type, quality);
                    $imgActive = jQuery("#divToolImg").data('image');
                    var zoom = localStorage.zoom;
                    if ($element.data('imageembed').settings.zoom == 1) {
                        zoom = 1
                    }
                    var enlarge;
                    if ($imgActive.prop("tagName").toLowerCase() == 'img') {
                        enlarge = $imgActive[0].naturalWidth / $imgActive.width()
                    } else if ($imgActive.prop("tagName").toLowerCase() == 'figure') {
                        enlarge = $imgActive.find('img')[0].naturalWidth / $imgActive.find('img').width()
                    }
                    var specifiedCssWidth = 0;
                    var specifiedCssHeight = 0;
                    if ($imgActive.prop("tagName").toLowerCase() == 'img') {
                        if ($imgActive.attr("src").indexOf(sScriptPath + "image.png") != -1) {
                            for (var i = 0; i < $imgActive.attr("style").split(";").length; i++) {
                                var cssval = $imgActive.attr("style").split(";")[i];
                                if (jQuery.trim(cssval.split(":")[0]) == "width") {
                                    specifiedCssWidth = parseInt(jQuery.trim(cssval.split(":")[1]));
                                    enlarge = specifiedCssWidth / $imgActive.width()
                                }
                                if (jQuery.trim(cssval.split(":")[0]) == "height") {
                                    specifiedCssHeight = parseInt(jQuery.trim(cssval.split(":")[1]))
                                }
                            }
                        }
                    } else if ($imgActive.prop("tagName").toLowerCase() == 'figure') {
                        if ($imgActive.find('img').attr("src").indexOf(sScriptPath + "image.png") != -1) {
                            for (var i = 0; i < $imgActive.find('img').attr("style").split(";").length; i++) {
                                var cssval = $imgActive.find('img').attr("style").split(";")[i];
                                if (jQuery.trim(cssval.split(":")[0]) == "width") {
                                    specifiedCssWidth = parseInt(jQuery.trim(cssval.split(":")[1]));
                                    enlarge = specifiedCssWidth / $imgActive.find('img').width()
                                }
                                if (jQuery.trim(cssval.split(":")[0]) == "height") {
                                    specifiedCssHeight = parseInt(jQuery.trim(cssval.split(":")[1]))
                                }
                            }
                        }
                    }
                    var maskAdj = 0;
                    if ($imgActive.prop("tagName").toLowerCase() == 'img') {
                        jQuery("#my-mask").css('width', ($imgActive.width() * enlarge) - maskAdj + 'px');
                        jQuery("#my-mask").css('height', ($imgActive.height() * enlarge) - maskAdj + 'px')
                    } else {
                        jQuery("#my-mask").css('width', ($imgActive.innerWidth() * enlarge) - maskAdj + 'px');
                        jQuery("#my-mask").css('height', ($imgActive.innerHeight() * enlarge) - maskAdj + 'px')
                    }
                    if (specifiedCssWidth != 0) jQuery("#my-mask").css('width', specifiedCssWidth + 'px');
                    if (specifiedCssHeight != 0) jQuery("#my-mask").css('height', specifiedCssHeight + 'px');
                    jQuery("#my-mask").css('zoom', zoom / enlarge);
                    jQuery("#my-mask").css('-moz-transform', 'scale(' + zoom / enlarge + ')');
                    var newW;
                    var newY;
                    var maskWidth = $imgActive.width();
                    var maskHeight = $imgActive.height();
                    var photoAspectRatio = nInitialWidth / nInitialHeight;
                    var canvasAspectRatio = maskWidth / maskHeight;
                    if (photoAspectRatio < canvasAspectRatio) {
                        newW = maskWidth;
                        newY = (nInitialHeight * maskWidth) / nInitialWidth
                    } else {
                        newW = (nInitialWidth * maskHeight) / nInitialHeight;
                        newY = maskHeight
                    }
                    newW = newW * enlarge;
                    newY = newY * enlarge;
                    jQuery('#my-image').attr('src', image);
                    jQuery('#my-image').on('load', function () {
                        jQuery('.overlay-bg').css('width', '100%');
                        jQuery('.overlay-bg').css('height', '100%');
                        $imgActive = jQuery("#divToolImg").data('image');
                        jQuery("#my-image").css('top', '0px');
                        jQuery("#my-image").css('left', '0px');
                        jQuery("#my-image").css('width', newW + 'px');
                        jQuery("#my-image").css('height', newY + 'px');
                        var zoom = localStorage.zoom;
                        zoom = zoom * 1;
                        if ($element.data('imageembed').settings.zoom == 1) {
                            zoom = 1
                        }
                        var _top;
                        var _left;
                        var _top_polaroid;
                        var _left_polaroid;
                        var scrolltop = jQuery(window).scrollTop();
                        var offsettop = $imgActive.offset().top;
                        var offsetleft = $imgActive.offset().left;
                        var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                        var is_ie = detectIE();
                        var browserok = true;
                        if (is_firefox || is_ie) browserok = false;
                        if (browserok) {
                            _top = (offsettop * zoom) + (scrolltop - scrolltop * zoom);
                            _left = offsetleft * zoom;
                            _top_polaroid = ((offsettop + 5) * zoom) + (scrolltop - scrolltop * zoom);
                            _left_polaroid = (offsetleft + 5) * zoom
                        } else {
                            if (is_ie) {
                                var space = 0;
                                var space2 = 0;
                                $element.parents().each(function () {
                                    if (jQuery(this).data('contentbuilder')) {
                                        space = jQuery(this).getPos().top;
                                        space2 = jQuery(this).getPos().left
                                    }
                                });
                                var adjy_val = -space * zoom + space;
                                var adjx_val = -space2 * zoom + space2;
                                var p = $imgActive.getPos();
                                _top = (p.top * zoom) + adjy_val;
                                _left = (p.left * zoom) + adjx_val;
                                _top_polaroid = ((p.top + 5) * zoom) + adjy_val;
                                _left_polaroid = ((p.left + 5) * zoom) + adjx_val
                            }
                            if (is_firefox) {
                                var imgwidth = parseInt($imgActive.css('width'));
                                var imgheight = parseInt($imgActive.css('height'));
                                var adjx_val = imgwidth / 2 - (imgwidth / 2) * zoom;
                                var adjy_val = imgheight / 2 - (imgheight / 2) * zoom;
                                jQuery('#img-control').css('top', 5 + adjy_val + 'px');
                                jQuery('#img-control').css('left', 7 + adjx_val + 'px');
                                _top = offsettop - adjy_val;
                                _left = offsetleft - adjx_val;
                                _top_polaroid = offsettop - adjy_val + 5;
                                _left_polaroid = offsetleft - adjx_val + 5
                            }
                        }
                        jQuery('#divImageEdit').css('display', 'inline-block');
                        if ($imgActive.attr('class') == 'img-polaroid') {
                            jQuery("#divImageEdit").css("top", _top_polaroid + "px");
                            jQuery("#divImageEdit").css("left", _left_polaroid + "px")
                        } else {
                            jQuery("#divImageEdit").css("top", _top + "px");
                            jQuery("#divImageEdit").css("left", _left + "px")
                        }
                        if (parseInt(jQuery("#divImageEdit").css("top")) < 25) {
                            jQuery('#img-control').css('top', 'auto');
                            jQuery('#img-control').css('bottom', "-24px")
                        }
                        panSetup();
                        tmpCanvas.width = newW;
                        tmpCanvas.height = newY;
                        var imageObj = jQuery("#my-image")[0];
                        var context = tmpCanvas.getContext('2d');
                        var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                        if (is_firefox) sleep(700);
                        var tmp = new Image(),
                            canvas;
                        cW = nInitialWidth;
                        cH = nInitialHeight;
                        tmp.src = imageObj.src;
                        tmp.onload = function () {
                            cW /= 2;
                            cH /= 2;
                            if (cW < imageObj.width) cW = imageObj.width;
                            if (cH < imageObj.height) cH = imageObj.height;
                            tmpCanvas.width = cW;
                            tmpCanvas.height = cH;
                            context = tmpCanvas.getContext('2d');
                            context.drawImage(tmp, 0, 0, cW, cH);
                            if (cW <= imageObj.width || cH <= imageObj.height) {
                                panSetup();
                                crop();
                                return
                            }
                            tmp.src = tmpCanvas.toDataURL(type, quality)
                        };
                        crop();
                        if ($imgActive.attr('class') == 'img-circle') {
                            jQuery('#my-mask').css('-webkit-border-radius', '500px');
                            jQuery('#my-mask').css('-moz-border-radius', '500px');
                            jQuery('#my-mask').css('border-radius', '500px')
                        } else {
                            jQuery('#my-mask').css('-webkit-border-radius', '0px');
                            jQuery('#my-mask').css('-moz-border-radius', '0px');
                            jQuery('#my-mask').css('border-radius', '0px')
                        }
                        jQuery('#my-image').unbind('load');
                        if ($imgActive.prop("tagName").toLowerCase() == 'img') { } else {
                            jQuery('#btnZoomIn').click();
                            jQuery('#btnZoomIn').click()
                        }
                        jQuery("#divToolImgLoader").css('display', 'none')
                    });
                    jQuery('#btnChangeImageNoCrop').unbind('click');
                    jQuery('#btnChangeImageNoCrop').bind('click', function () {
                        var canvasNoCrop = document.getElementById('myTmpCanvasNoCrop');
                        var image;
                        if (hiquality == false) {
                            if (extension == 'jpg' || extension == 'jpeg') {
                                image = canvasNoCrop.toDataURL("image/jpeg", 0.92)
                            } else {
                                image = canvasNoCrop.toDataURL("image/png", 1)
                            }
                        } else {
                            image = canvasNoCrop.toDataURL("image/png", 1)
                        }
                        if ($imgActive.prop("tagName").toLowerCase() == 'img') {
                            $imgActive.attr('src', image);
                            $imgActive.data('filename', imgname)
                        } else if ($imgActive.prop("tagName").toLowerCase() == 'figure') {
                            $imgActive.find('img').attr('src', image);
                            $imgActive.find('img').data('filename', imgname)
                        } else {
                            $imgActive.css('background-image', 'url(data:' + image + ')');
                            $imgActive.data('filename', imgname)
                        }
                        if ($imgActive.parent().hasClass("is-lightbox")) {
                            jQuery('#canvasform').attr('action', $element.data('imageembed').settings.largerImageHandler);
                            jQuery('#canvasform').submit()
                        } else { }
                        jQuery('#divImageEdit').css('display', 'none');
                        jQuery('.overlay-bg').css('width', '1px');
                        jQuery('.overlay-bg').css('height', '1px');
                        jQuery('body').css('overflow', '');
                        if ($imgActive.prop("tagName").toLowerCase() == 'img') {
                            $imgActive.css('width', '');
                            $imgActive.css('height', '')
                        } else if ($imgActive.prop("tagName").toLowerCase() == 'figure') {
                            $imgActive.find('img').css('width', '');
                            $imgActive.find('img').css('height', '')
                        }
                        $element.data('imageembed').settings.onChanged();
                        jQuery("#divToolImgLoader").css('display', 'none')
                    });
                    jQuery('#btnChangeImage').unbind('click');
                    jQuery('#btnChangeImage').bind('click', function () {
                        var canvas = document.getElementById('myCanvas');
                        $imgActive = jQuery("#divToolImg").data('image');
                        var image;
                        if (hiquality == false) {
                            if (extension == 'jpg' || extension == 'jpeg') {
                                image = canvas.toDataURL("image/jpeg", 0.92)
                            } else {
                                image = canvas.toDataURL("image/png", 1)
                            }
                        } else {
                            image = canvas.toDataURL("image/png", 1)
                        }
                        if ($imgActive.prop("tagName").toLowerCase() == 'img') {
                            $imgActive.attr('src', image);
                            $imgActive.data('filename', imgname)
                        } else if ($imgActive.prop("tagName").toLowerCase() == 'figure') {
                            $imgActive.find('img').attr('src', image);
                            $imgActive.find('img').data('filename', imgname)
                        } else {
                            $imgActive.css('background-image', 'url(data:' + image + ')');
                            $imgActive.data('filename', imgname)
                        }
                        if ($imgActive.parent().hasClass("is-lightbox")) {
                            jQuery('#canvasform').attr('action', $element.data('imageembed').settings.largerImageHandler);
                            jQuery('#canvasform').submit()
                        } else { }
                        jQuery('#divImageEdit').css('display', 'none');
                        jQuery('.overlay-bg').css('width', '1px');
                        jQuery('.overlay-bg').css('height', '1px');
                        jQuery('body').css('overflow', '');
                        if ($imgActive.prop("tagName").toLowerCase() == 'img') {
                            $imgActive.css('width', '');
                            $imgActive.css('height', '')
                        } else if ($imgActive.prop("tagName").toLowerCase() == 'figure') {
                            $imgActive.find('img').css('width', '');
                            $imgActive.find('img').css('height', '')
                        }
                        $element.data('imageembed').settings.onChanged()
                    });
                    jQuery('#btnImageCancel').unbind('click');
                    jQuery('#btnImageCancel').bind('click', function () {
                        var canvas = document.getElementById('myCanvas');
                        $imgActive = jQuery("#divToolImg").data('image');
                        jQuery('#divImageEdit').css('display', 'none');
                        jQuery('.overlay-bg').css('width', '1px');
                        jQuery('.overlay-bg').css('height', '1px');
                        jQuery('body').css('overflow', '')
                    });
                    jQuery('#btnZoomIn').unbind('click');
                    jQuery('#btnZoomIn').bind('click', function () {
                        var nCurrentWidth = parseInt(jQuery("#my-image").css('width'));
                        var nCurrentHeight = parseInt(jQuery("#my-image").css('height'));
                        jQuery("#my-image").css('width', (nCurrentWidth / 0.9) + 'px');
                        jQuery("#my-image").css('height', (nCurrentHeight / 0.9) + 'px');
                        panSetup();
                        tmpCanvas.width = (nCurrentWidth / 0.9);
                        tmpCanvas.height = (nCurrentHeight / 0.9);
                        var imageObj = jQuery("#my-image")[0];
                        var context = tmpCanvas.getContext('2d');
                        var tmp = new Image(),
                            context, cW, cH;
                        cW = nInitialWidth;
                        cH = nInitialHeight;
                        tmp.src = imageObj.src;
                        tmp.onload = function () {
                            cW /= 2;
                            cH /= 2;
                            if (cW < imageObj.width) cW = (nCurrentWidth / 0.9);
                            if (cH < imageObj.height) cH = (nCurrentHeight / 0.9);
                            tmpCanvas.width = cW;
                            tmpCanvas.height = cH;
                            context = tmpCanvas.getContext('2d');
                            context.drawImage(tmp, 0, 0, cW, cH);
                            if (cW <= (nCurrentWidth / 0.9) || cH <= (nCurrentHeight / 0.9)) {
                                panSetup();
                                crop();
                                return
                            }
                            tmp.src = tmpCanvas.toDataURL(type, quality)
                        };
                        crop()
                    });
                    jQuery('#btnZoomOut').unbind('click');
                    jQuery('#btnZoomOut').bind('click', function () {
                        var nCurrentWidth = parseInt(jQuery("#my-image").css('width'));
                        var nCurrentHeight = parseInt(jQuery("#my-image").css('height'));
                        if ((nCurrentWidth / 1.1) < jQuery("#my-mask").width()) return;
                        if ((nCurrentHeight / 1.1) < jQuery("#my-mask").height()) return;
                        jQuery("#my-image").css('width', (nCurrentWidth / 1.1) + 'px');
                        jQuery("#my-image").css('height', (nCurrentHeight / 1.1) + 'px');
                        panSetup();
                        tmpCanvas.width = (nCurrentWidth / 1.1);
                        tmpCanvas.height = (nCurrentHeight / 1.1);
                        var imageObj = jQuery("#my-image")[0];
                        var context = tmpCanvas.getContext('2d');
                        var tmp = new Image(),
                            context, cW, cH;
                        cW = nInitialWidth;
                        cH = nInitialHeight;
                        tmp.src = imageObj.src;
                        tmp.onload = function () {
                            cW /= 2;
                            cH /= 2;
                            if (cW < imageObj.width) cW = (nCurrentWidth / 1.1);
                            if (cH < imageObj.height) cH = (nCurrentHeight / 1.1);
                            tmpCanvas.width = cW;
                            tmpCanvas.height = cH;
                            context = tmpCanvas.getContext('2d');
                            context.drawImage(tmp, 0, 0, cW, cH);
                            if (cW <= (nCurrentWidth / 1.1) || cH <= (nCurrentHeight / 1.1)) {
                                panSetup();
                                crop();
                                return
                            }
                            tmp.src = tmpCanvas.toDataURL(type, quality)
                        };
                        crop()
                    })
                }, {
                        canvas: false
                    })
            })
        };
        var crop = function () {
            var maskAdj = 1.1;
            var x = parseInt(jQuery("#my-image").css('left')) - maskAdj;
            var y = parseInt(jQuery("#my-image").css('top')) - maskAdj;
            var dw = parseInt(jQuery("#my-mask").css('width'));
            var dh = parseInt(jQuery("#my-mask").css('height'));
            var canvas = document.getElementById('myCanvas');
            var context = canvas.getContext('2d');
            canvas.width = dw;
            canvas.height = dh;
            var sourceX = -1 * x;
            var sourceY = -1 * y;
            if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
                var iosAdj = 0.7;
                sourceX = -1 * x + (x - x / iosAdj);
                sourceY = -1 * y + (y - y / iosAdj)
            }
            if (sourceY > (tmpCanvas.height - dh)) {
                sourceY = tmpCanvas.height - dh
            }
            if (sourceX > (tmpCanvas.width - dw)) {
                sourceX = tmpCanvas.width - dw
            }
            context.drawImage(tmpCanvas, sourceX, sourceY, dw, dh, 0, 0, dw, dh)
        };
        var panSetup = function () {
            jQuery("#my-image").css({
                top: 0,
                left: 0
            });
            var maskWidth = jQuery("#my-mask").width();
            var maskHeight = jQuery("#my-mask").height();
            var imgPos = jQuery("#my-image").offset();
            var imgWidth = jQuery("#my-image").width();
            var imgHeight = jQuery("#my-image").height();
            var x1 = (imgPos.left + maskWidth) - imgWidth;
            var y1 = (imgPos.top + maskHeight) - imgHeight;
            var x2 = imgPos.left;
            var y2 = imgPos.top;
            jQuery("#my-image").draggable({
                revert: false,
                containment: [x1, y1, x2, y2],
                scroll: false,
                drag: function () {
                    crop()
                }
            });
            jQuery("#my-image").css({
                cursor: 'move'
            })
        };
        this.init()
    };
    jQuery.fn.imageembed = function (options) {
        return this.each(function () {
            if (undefined == jQuery(this).data('imageembed')) {
                var plugin = new jQuery.imageembed(this, options);
                jQuery(this).data('imageembed', plugin)
            }
        })
    }
})(jQuery);

function applyLargerImage(s) {
    $imgActive.parents("a").attr("href", s);
    jQuery('.my-file[type=file]').clearInputs()
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break
        }
    }
}
jQuery.fn.clearFields = jQuery.fn.clearInputs = function (includeHidden) {
    var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
    return this.each(function () {
        var t = this.type,
            tag = this.tagName.toLowerCase();
        if (re.test(t) || tag == 'textarea') {
            this.value = ''
        } else if (t == 'checkbox' || t == 'radio') {
            this.checked = false
        } else if (tag == 'select') {
            this.selectedIndex = -1
        } else if (t == "file") {
            if (/MSIE/.test(navigator.userAgent)) {
                jQuery(this).replaceWith(jQuery(this).clone(true))
            } else {
                jQuery(this).val('')
            }
        } else if (includeHidden) {
            if ((includeHidden === true && /hidden/.test(t)) || (typeof includeHidden == 'string' && jQuery(this).is(includeHidden))) this.value = ''
        }
    })
};
var zindex = 10000;
(function (jQuery) {
    jQuery.simplemodal = function (element, options) {
        var defaults = {
            onCancel: function () { }
        };
        this.settings = {};
        var $element = jQuery(element),
            element = element;
        var $ovlid;
        this.init = function () {
            this.settings = jQuery.extend({}, defaults, options);
            if (jQuery('#divCb').length == 0) {
                jQuery('body').append('<div id="divCb"></div>')
            }
        };
        this.hide = function () {
            $element.css('display', 'none');
            $element.removeClass('md-show');
            $ovlid.remove();
            zindex = zindex - 2
        };
        this.show = function () {
            zindex = zindex + 1;
            var rnd = makeid();
            var html_overlay = '<div id="md-overlay-' + rnd + '" class="md-overlay" style="z-index:' + zindex + '"></div>';
            jQuery('#divCb').append(html_overlay);
            $ovlid = jQuery('#md-overlay-' + rnd);
            zindex = zindex + 1;
            $element.css('z-index', zindex);
            $element.addClass('md-show');
            $element.stop(true, true).css('display', 'none').fadeIn(200);
            if ($element.hasClass('md-draggable')) {
                var mw = parseInt($element.css("width"));
                var mh = parseInt($element.css("height"));
                $element.css("top", Math.max(0, (jQuery(window).height() - mh) / 2) + "px");
                $element.css("left", Math.max(0, (jQuery(window).width() - mw) / 2) + "px");
                if ($element.find('.md-modal-handle').length > 0) {
                    $element.find('.md-modal-handle').css("cursor", "move");
                    $element.draggable({
                        handle: ".md-modal-handle"
                    })
                } else {
                    $element.draggable()
                }
            }
            jQuery('#md-overlay-' + rnd).unbind();
            jQuery('#md-overlay-' + rnd).click(function () {
                $element.stop(true, true).fadeOut(100, function () {
                    $element.removeClass('md-show')
                });
                $ovlid.remove();
                zindex = zindex - 2;
                $element.data('simplemodal').settings.onCancel()
            })
        };
        this.init()
    };
    jQuery.fn.simplemodal = function (options) {
        return this.each(function () {
            if (undefined == jQuery(this).data('simplemodal')) {
                var plugin = new jQuery.simplemodal(this, options);
                jQuery(this).data('simplemodal', plugin)
            }
        })
    }
})(jQuery);
jQuery.fn.getPos = function () {
    var o = this[0];
    var left = 0,
        top = 0,
        parentNode = null,
        offsetParent = null;
    offsetParent = o.offsetParent;
    var original = o;
    var el = o;
    while (el.parentNode != null) {
        el = el.parentNode;
        if (el.offsetParent != null) {
            var considerScroll = true;
            if (window.opera) {
                if (el == original.parentNode || el.nodeName == "TR") {
                    considerScroll = false
                }
            }
            if (considerScroll) {
                if (el.scrollTop && el.scrollTop > 0) {
                    top -= el.scrollTop
                }
                if (el.scrollLeft && el.scrollLeft > 0) {
                    left -= el.scrollLeft
                }
            }
        }
        if (el == offsetParent) {
            left += o.offsetLeft;
            if (el.clientLeft && el.nodeName != "TABLE") {
                left += el.clientLeft
            }
            top += o.offsetTop;
            if (el.clientTop && el.nodeName != "TABLE") {
                top += el.clientTop
            }
            o = el;
            if (o.offsetParent == null) {
                if (o.offsetLeft) {
                    left += o.offsetLeft
                }
                if (o.offsetTop) {
                    top += o.offsetTop
                }
            }
            offsetParent = o.offsetParent
        }
    }
    return {
        left: left,
        top: top
    }
};

function cleanHTML(input) {
    var stringStripper = /(\n|\r| class=(")?Mso[a-zA-Z]+(")?)/g;
    var output = input.replace(stringStripper, ' ');
    var commentSripper = new RegExp('<!--(.*?)-->', 'g');
    var output = output.replace(commentSripper, '');
    var tagStripper = new RegExp('<(/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>', 'gi');
    output = output.replace(tagStripper, '');
    var badTags = ['style', 'script', 'applet', 'embed', 'noframes', 'noscript'];
    for (var i = 0; i < badTags.length; i++) {
        tagStripper = new RegExp('<' + badTags[i] + '.*?' + badTags[i] + '(.*?)>', 'gi');
        output = output.replace(tagStripper, '')
    }
    var badAttributes = ['style', 'start'];
    for (var i = 0; i < badAttributes.length; i++) {
        var attributeStripper = new RegExp(' ' + badAttributes[i] + '="(.*?)"', 'gi');
        output = output.replace(attributeStripper, '')
    }
    return output
}

function detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');
    var edge = ua.indexOf('Edge/');
    if (msie > 0) {
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
    }
    if (edge > 0) {
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
    }
    if (trident > 0) {
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
    }
    return false
}

function detectEdge() {
    var ua = window.navigator.userAgent;
    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
    }
    return false
} (function ($) {
    $.fn.contrastingText = function () {
        var el = this,
            transparent;
        transparent = function (c) {
            var m = c.match(/[0-9]+/g);
            if (m !== null) {
                return !!m[3]
            } else return false
        };
        while (transparent(el.css('background-color'))) {
            el = el.parent()
        }
        parts = el.css('background-color').match(/[0-9]+/g);
        this.lightBackground = !!Math.round((parseInt(parts[0], 10) + parseInt(parts[1], 10) + parseInt(parts[2], 10)) / 765);
        if (this.lightBackground) {
            this.css('color', 'black')
        } else {
            this.css('color', 'white')
        }
        return this
    }
}(jQuery));
