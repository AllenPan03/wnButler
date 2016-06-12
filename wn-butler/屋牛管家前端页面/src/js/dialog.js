/**
 * Created by Allen Pan on 2016/4/15.
 */
(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function (e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    1: [
        function (require, module, exports) {
            (function (global) {
                'use strict';

                var $ = (typeof window !== "undefined" ? window.jQuery : typeof global !==
                    "undefined" ? global.jQuery : null);

                require('./core');
                require('./ui.dimmer');
                require('./ui.modal');

                module.exports = $.AMUI;

            }).call(this, typeof global !== "undefined" ? global : typeof self !==
                    "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {
            "./core": 2,
            "./ui.dimmer": 3,
            "./ui.modal": 4
        }
    ],
    2: [
        function (require, module, exports) {
            (function (global) {
                'use strict';

                /* jshint -W040 */

                var $ = (typeof window !== "undefined" ? window.jQuery : typeof global !==
                    "undefined" ? global.jQuery : null);


                var UI = $.AMUI || {};
                var $win = $(window);
                var doc = window.document;
                var $html = $('html');

                UI.VERSION = '2.0.0';

                UI.support = {};

                UI.support.transition = (function () {
                    var transitionEnd = (function () {
                        var element = doc.body || doc.documentElement;
                        var transEndEventNames = {
                            WebkitTransition: 'webkitTransitionEnd',
                            MozTransition: 'transitionend',
                            OTransition: 'oTransitionEnd otransitionend',
                            transition: 'transitionend'
                        };

                        for (var name in transEndEventNames) {
                            if (element.style[name] !== undefined) {
                                return transEndEventNames[name];
                            }
                        }
                    })();

                    return transitionEnd && {
                        end: transitionEnd
                    };
                })();

                UI.support.animation = (function () {
                    var animationEnd = (function () {
                        var element = doc.body || doc.documentElement;
                        var animEndEventNames = {
                            WebkitAnimation: 'webkitAnimationEnd',
                            MozAnimation: 'animationend',
                            OAnimation: 'oAnimationEnd oanimationend',
                            animation: 'animationend'
                        };

                        for (var name in animEndEventNames) {
                            if (element.style[name] !== undefined) {
                                return animEndEventNames[name];
                            }
                        }
                    })();

                    return animationEnd && {
                        end: animationEnd
                    };
                })();

                /* jshint -W069 */
                UI.support.touch = (
                    ('ontouchstart' in window &&
                        navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
                    (window.DocumentTouch && document instanceof window.DocumentTouch) ||
                    (window.navigator['msPointerEnabled'] &&
                        window.navigator['msMaxTouchPoints'] > 0) || //IE 10
                    (window.navigator['pointerEnabled'] &&
                        window.navigator['maxTouchPoints'] > 0) || //IE >=11
                    false);

                // https://developer.mozilla.org/zh-CN/docs/DOM/MutationObserver
                UI.support.mutationobserver = (window.MutationObserver ||
                    window.WebKitMutationObserver || null);

                // https://github.com/Modernizr/Modernizr/blob/924c7611c170ef2dc502582e5079507aff61e388/feature-detects/forms/validation.js#L20
                UI.support.formValidation = (typeof document.createElement('form').checkValidity ===
                    'function');

                UI.utils = {};

                /**
                 * Debounce function
                 * @param {function} func  Function to be debounced
                 * @param {number} wait Function execution threshold in milliseconds
                 * @param {bool} immediate  Whether the function should be called at
                 *                          the beginning of the delay instead of the
                 *                          end. Default is false.
                 * @desc Executes a function when it stops being invoked for n seconds
                 * @via  _.debounce() http://underscorejs.org
                 */
                UI.utils.debounce = function (func, wait, immediate) {
                    var timeout;
                    return function () {
                        var context = this;
                        var args = arguments;
                        var later = function () {
                            timeout = null;
                            if (!immediate) {
                                func.apply(context, args);
                            }
                        };
                        var callNow = immediate && !timeout;

                        clearTimeout(timeout);
                        timeout = setTimeout(later, wait);

                        if (callNow) {
                            func.apply(context, args);
                        }
                    };
                };

                UI.utils.isInView = function (element, options) {
                    var $element = $(element);
                    var visible = !!($element.width() || $element.height()) &&
                        $element.css('display') !== 'none';

                    if (!visible) {
                        return false;
                    }

                    var windowLeft = $win.scrollLeft();
                    var windowTop = $win.scrollTop();
                    var offset = $element.offset();
                    var left = offset.left;
                    var top = offset.top;

                    options = $.extend({
                        topOffset: 0,
                        leftOffset: 0
                    }, options);

                    return (top + $element.height() >= windowTop &&
                        top - options.topOffset <= windowTop + $win.height() &&
                        left + $element.width() >= windowLeft &&
                        left - options.leftOffset <= windowLeft + $win.width());
                };

                /* jshint -W054 */
                UI.utils.parseOptions = UI.utils.options = function (string) {
                    if ($.isPlainObject(string)) {
                        return string;
                    }

                    var start = (string ? string.indexOf('{') : -1);
                    var options = {};

                    if (start != -1) {
                        try {
                            options = (new Function('',
                                    'var json = ' + string.substr(start) +
                                    '; return JSON.parse(JSON.stringify(json));'))();
                        } catch (e) {
                        }
                    }

                    return options;
                };

                /* jshint +W054 */

                UI.utils.generateGUID = function (namespace) {
                    var uid = namespace + '-' || 'am-';

                    do {
                        uid += Math.random().toString(36).substring(2, 7);
                    } while (document.getElementById(uid));

                    return uid;
                };

                // http://blog.alexmaccaw.com/css-transitions
                $.fn.emulateTransitionEnd = function (duration) {
                    var called = false;
                    var $el = this;

                    $(this).one(UI.support.transition.end, function () {
                        called = true;
                    });

                    var callback = function () {
                        if (!called) {
                            $($el).trigger(UI.support.transition.end);
                        }
                        $el.transitionEndTimmer = undefined;
                    };
                    this.transitionEndTimmer = setTimeout(callback, duration);
                    return this;
                };

                $.fn.redraw = function () {
                    $(this).each(function () {
                        /* jshint unused:false */
                        var redraw = this.offsetHeight;
                    });
                    return this;
                };

                /* jshint unused:true */

                $.fn.transitionEnd = function (callback) {
                    var endEvent = UI.support.transition.end;
                    var dom = this;

                    function fireCallBack(e) {
                        callback.call(this, e);
                        endEvent && dom.off(endEvent, fireCallBack);
                    }

                    if (callback && endEvent) {
                        dom.on(endEvent, fireCallBack);
                    }

                    return this;
                };

                $.fn.removeClassRegEx = function () {
                    return this.each(function (regex) {
                        var classes = $(this).attr('class');

                        if (!classes || !regex) {
                            return false;
                        }

                        var classArray = [];
                        classes = classes.split(' ');

                        for (var i = 0, len = classes.length; i < len; i++) {
                            if (!classes[i].match(regex)) {
                                classArray.push(classes[i]);
                            }
                        }

                        $(this).attr('class', classArray.join(' '));
                    });
                };

                //
                $.fn.alterClass = function (removals, additions) {
                    var self = this;

                    if (removals.indexOf('*') === -1) {
                        // Use native jQuery methods if there is no wildcard matching
                        self.removeClass(removals);
                        return !additions ? self : self.addClass(additions);
                    }

                    var classPattern = new RegExp('\\s' +
                        removals.replace(/\*/g, '[A-Za-z0-9-_]+').split(' ').join(
                            '\\s|\\s') +
                        '\\s', 'g');

                    self.each(function (i, it) {
                        var cn = ' ' + it.className + ' ';
                        while (classPattern.test(cn)) {
                            cn = cn.replace(classPattern, ' ');
                        }
                        it.className = $.trim(cn);
                    });

                    return !additions ? self : self.addClass(additions);
                };

                // handle multiple browsers for requestAnimationFrame()
                // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
                // https://github.com/gnarf/jquery-requestAnimationFrame
                UI.utils.rAF = (function () {
                    return window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        // if all else fails, use setTimeout
                        function (callback) {
                            return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
                        };
                })();

                // handle multiple browsers for cancelAnimationFrame()
                UI.utils.cancelAF = (function () {
                    return window.cancelAnimationFrame ||
                        window.webkitCancelAnimationFrame ||
                        window.mozCancelAnimationFrame ||
                        window.oCancelAnimationFrame ||
                        function (id) {
                            window.clearTimeout(id);
                        };
                })();

                // via http://davidwalsh.name/detect-scrollbar-width
                UI.utils.measureScrollbar = function () {
                    if (document.body.clientWidth >= window.innerWidth) {
                        return 0;
                    }

                    // if ($html.width() >= window.innerWidth) return;
                    // var scrollbarWidth = window.innerWidth - $html.width();
                    var $measure = $('<div ' +
                        'style="width: 100px;height: 100px;overflow: scroll;' +
                        'position: absolute;top: -9999px;"></div>');

                    $(document.body).append($measure);

                    var scrollbarWidth = $measure[0].offsetWidth - $measure[0].clientWidth;

                    $measure.remove();

                    return scrollbarWidth;
                };


                /**
                 * https://github.com/cho45/micro-template.js
                 * (c) cho45 http://cho45.github.com/mit-license
                 */
                /* jshint -W109 */
                UI.template = function (id, data) {
                    var me = UI.template;

                    if (!me.cache[id]) {
                        me.cache[id] = (function () {
                            var name = id;
                            var string = /^[\w\-]+$/.test(id) ?
                                me.get(id) : (name = 'template(string)', id); // no warnings

                            var line = 1;
                            var body = ('try { ' + (me.variable ?
                                'var ' + me.variable + ' = this.stash;' :
                                'with (this.stash) { ') +
                                "this.ret += '" +
                                string.replace(/<%/g, '\x11').replace(/%>/g, '\x13'). // if you want other tag, just edit this line
                                    replace(/'(?![^\x11\x13]+?\x13)/g, '\\x27').replace(
                                    /^\s*|\s*$/g, '').replace(/\n/g, function () {
                                        return "';\nthis.line = " + (++line) +
                                            "; this.ret += '\\n";
                                    }).replace(/\x11-(.+?)\x13/g, "' + ($1) + '").replace(
                                    /\x11=(.+?)\x13/g, "' + this.escapeHTML($1) + '").replace(
                                    /\x11(.+?)\x13/g, "'; $1; this.ret += '") +
                                "'; " + (me.variable ? "" : "}") + "return this.ret;" +
                                "} catch (e) { throw 'TemplateError: ' + e + ' (on " +
                                name +
                                "' + ' line ' + this.line + ')'; } " +
                                "//@ sourceURL=" + name + "\n" // source map
                                ).replace(/this\.ret \+= '';/g, '');
                            /* jshint -W054 */
                            var func = new Function(body);
                            var map = {
                                '&': '&amp;',
                                '<': '&lt;',
                                '>': '&gt;',
                                '\x22': '&#x22;',
                                '\x27': '&#x27;'
                            };
                            var escapeHTML = function (string) {
                                return ('' + string).replace(/[&<>\'\"]/g, function (_) {
                                    return map[_];
                                });
                            };

                            return function (stash) {
                                return func.call(me.context = {
                                    escapeHTML: escapeHTML,
                                    line: 1,
                                    ret: '',
                                    stash: stash
                                });
                            };
                        })();
                    }

                    return data ? me.cache[id](data) : me.cache[id];
                };
                /* jshint +W109 */
                /* jshint +W054 */

                UI.template.cache = {};

                UI.template.get = function (id) {
                    if (id) {
                        var element = document.getElementById(id);
                        return element && element.innerHTML || '';
                    }
                };

                // Dom mutation watchers
                UI.DOMWatchers = [];
                UI.DOMReady = false;
                UI.ready = function (callback) {
                    UI.DOMWatchers.push(callback);
                    if (UI.DOMReady) {
                        console.log('ready call');
                        callback(document);
                    }
                };

                UI.DOMObserve = function (elements, options, callback) {
                    var Observer = UI.support.mutationobserver;
                    if (!Observer) {
                        return;
                    }

                    options = $.isPlainObject(options) ?
                        options : {
                        childList: true,
                        subtree: true
                    };

                    callback = typeof callback === 'function' && callback || function () {
                    };

                    $(elements).each(function () {
                        var element = this;
                        var $element = $(element);

                        if ($element.data('am.observer')) {
                            return;
                        }

                        try {
                            var observer = new Observer(UI.utils.debounce(
                                function (mutations, instance) {
                                    callback.call(element, mutations, instance);
                                    // trigger this event manually if MutationObserver not supported
                                    $element.trigger('changed.dom.amui');
                                }, 50));

                            observer.observe(element, options);

                            $element.data('am.observer', observer);
                        } catch (e) {
                        }
                    });
                };

                $.fn.DOMObserve = function (options, callback) {
                    return this.each(function () {
                        UI.DOMObserve(this, options, callback);
                    });
                };

                // Attach FastClick on touch devices
                if (UI.support.touch) {
                    $html.addClass('am-touch');

                    $(function () {
                        var FastClick = $.AMUI.FastClick;
                        FastClick && FastClick.attach(document.body);
                    });
                }

                $(document).on('changed.dom.amui', function (e) {
                    var element = e.target;

                    // TODO: just call changed element's watcher
                    //       every watcher callback should have a key
                    //       use like this: <div data-am-observe='key1, key2'>
                    //       get keys via $(element).data('amObserve')
                    //       call functions store with these keys
                    $.each(UI.DOMWatchers, function (i, watcher) {
                        watcher(element);
                    });
                });

                $(function () {
                    var $body = $('body');

                    UI.DOMReady = true;

                    // Run default init
                    $.each(UI.DOMWatchers, function (i, watcher) {
                        watcher(document);
                    });

                    // watches DOM
                    UI.DOMObserve('[data-am-observe]');

                    $html.removeClass('no-js').addClass('js');

                    UI.support.animation && $html.addClass('cssanimations');

                    // iOS standalone mode
                    if (window.navigator.standalone) {
                        $html.addClass('am-standalone');
                    }

                    $('.am-topbar-fixed-top').length &&
                    $body.addClass('am-with-topbar-fixed-top');

                    $('.am-topbar-fixed-bottom').length &&
                    $body.addClass('am-with-topbar-fixed-bottom');

                    // Remove responsive classes in .am-layout
                    var $layout = $('.am-layout');
                    $layout.find('[class*="md-block-grid"]').alterClass(
                        'md-block-grid-*');
                    $layout.find('[class*="lg-block-grid"]').alterClass(
                        'lg-block-grid');

                    // widgets not in .am-layout
                    $('[data-am-widget]').each(function () {
                        var $widget = $(this);
                        // console.log($widget.parents('.am-layout').length)
                        if ($widget.parents('.am-layout').length === 0) {
                            $widget.addClass('am-no-layout');
                        }
                    });
                });

                $.AMUI = UI;

                module.exports = UI;

            }).call(this, typeof global !== "undefined" ? global : typeof self !==
                    "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {}
    ],
    3: [
        function (require, module, exports) {
            (function (global) {
                'use strict';

                var $ = (typeof window !== "undefined" ? window.jQuery : typeof global !==
                    "undefined" ? global.jQuery : null);
                var UI = require('./core');
                var $doc = $(document);
                var transition = UI.support.transition;

                var Dimmer = function () {
                    this.id = UI.utils.generateGUID('am-dimmer');
                    this.$element = $(Dimmer.DEFAULTS.tpl, {
                        id: this.id
                    });

                    this.inited = false;
                    this.scrollbarWidth = 0;
                    this.used = $([]);
                };

                Dimmer.DEFAULTS = {
                    tpl: '<div class="am-dimmer" data-am-dimmer></div>'
                };

                Dimmer.prototype.init = function () {
                    if (!this.inited) {
                        $(document.body).append(this.$element);
                        this.inited = true;
                        $doc.trigger('init.dimmer.amui');
                    }

                    return this;
                };

                Dimmer.prototype.open = function (relatedElement) {
                    if (!this.inited) {
                        this.init();
                    }

                    var $element = this.$element;

                    // 用于多重调用
                    if (relatedElement) {
                        this.used = this.used.add($(relatedElement));
                    }

                    this.checkScrollbar().setScrollbar();

                    $element.show().trigger('open.dimmer.amui');

                    setTimeout(function () {
                        $element.addClass('am-active');
                    }, 0);

                    return this;
                };

                Dimmer.prototype.close = function (relatedElement, force) {
                    this.used = this.used.not($(relatedElement));

                    if (!force && this.used.length) {
                        return this;
                    }

                    var $element = this.$element;

                    $element.removeClass('am-active').trigger('close.dimmer.amui');

                    function complete() {
                        this.resetScrollbar();
                        $element.hide();
                    }

                    transition ? $element.one(transition.end, $.proxy(complete, this)) :
                        complete.call(this);

                    return this;
                };

                Dimmer.prototype.checkScrollbar = function () {
                    this.scrollbarWidth = UI.utils.measureScrollbar();

                    return this;
                };

                Dimmer.prototype.setScrollbar = function () {
                    var $body = $(document.body);
                    var bodyPaddingRight = parseInt(($body.css('padding-right') || 0),
                        10);

                    if (this.scrollbarWidth) {
                        $body.css('padding-right', bodyPaddingRight + this.scrollbarWidth);
                    }

                    $body.addClass('am-dimmer-active');

                    return this;
                };

                Dimmer.prototype.resetScrollbar = function () {
                    $(document.body).css('padding-right', '').removeClass(
                        'am-dimmer-active');

                    return this;
                };

                var dimmer = new Dimmer();

                $.AMUI.dimmer = dimmer;

                module.exports = dimmer;

            }).call(this, typeof global !== "undefined" ? global : typeof self !==
                    "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {
            "./core": 2
        }
    ],
    4: [
        function (require, module, exports) {
            (function (global) {
                'use strict';

                var $ = (typeof window !== "undefined" ? window.jQuery : typeof global !==
                    "undefined" ? global.jQuery : null);
                var UI = require('./core');
                var dimmer = require('./ui.dimmer');
                var $doc = $(document);
                var supportTransition = UI.support.transition;

                /**
                 * @reference https://github.com/nolimits4web/Framework7/blob/master/src/js/modals.js
                 * @license https://github.com/nolimits4web/Framework7/blob/master/LICENSE
                 */

                var Modal = function (element, options) {
                    this.options = $.extend({}, Modal.DEFAULTS, options || {});
                    this.$element = $(element);
                    this.$dialog = this.$element.find('.am-modal-dialog');

                    if (!this.$element.attr('id')) {
                        this.$element.attr('id', UI.utils.generateGUID('am-modal'));
                    }

                    this.isPopup = this.$element.hasClass('am-popup');
                    this.isActions = this.$element.hasClass('am-modal-actions');
                    this.active = this.transitioning = this.relatedTarget = null;

                    this.events();
                };

                Modal.DEFAULTS = {
                    className: {
                        active: 'am-modal-active',
                        out: 'am-modal-out'
                    },
                    selector: {
                        modal: '.am-modal',
                        active: '.am-modal-active'
                    },
                    closeViaDimmer: true,
                    cancelable: true,
                    onConfirm: function () {
                    },
                    onCancel: function () {
                    },
                    height: undefined,
                    width: undefined,
                    duration: 300, // must equal the CSS transition duration
                    transitionEnd: supportTransition && supportTransition.end +
                        '.modal.amui'
                };

                Modal.prototype.toggle = function (relatedTarget) {
                    return this.active ? this.close() : this.open(relatedTarget);
                };

                Modal.prototype.open = function (relatedTarget) {
                    var $element = this.$element;
                    var options = this.options;
                    var isPopup = this.isPopup;

                    var width = options.width;
                    var height = options.height;
                    var style = {};

                    if (this.active) {
                        return;
                    }

                    if (!this.$element.length) {
                        return;
                    }

                    // callback hook
                    relatedTarget && (this.relatedTarget = relatedTarget);

                    // 判断如果还在动画，就先触发之前的closed事件
                    if (this.transitioning) {
                        clearTimeout($element.transitionEndTimmer);
                        $element.transitionEndTimmer = null;
                        $element.trigger(options.transitionEnd).off(options.transitionEnd);
                    }

                    isPopup && this.$element.show();

                    this.active = true;

                    $element.trigger($.Event('open.modal.amui', {
                        relatedTarget: relatedTarget
                    }));

                    dimmer.open($element);

                    $element.show().redraw();

                    // apply Modal width/height if set
                    if (!isPopup && !this.isActions) {

                        if (width) {
                            width = parseInt(width, 10);

                            style.width = width + 'px';
                            style.marginLeft = -parseInt(width / 2) + 'px';
                        }

                        if (height) {

                            height = parseInt(height, 10);

                            // style.height = height + 'px';
                            style.marginTop = -parseInt(height / 2) + 'px';

                            // the background color is styled to $dialog
                            // so the height should set to $dialog
                            this.$dialog.css({
                                height: height + 'px'
                            });
                        } else {
                            style.marginTop = -parseInt($element.height() / 2, 10) + 'px';
                        }

                        $element.css(style);
                    }

                    $element.
                        removeClass(options.className.out).
                        addClass(options.className.active);

                    this.transitioning = 1;

                    var complete = function () {
                        $element.trigger($.Event('opened.modal.amui', {
                            relatedTarget: relatedTarget
                        }));
                        this.transitioning = 0;
                    };

                    if (!supportTransition) {
                        return complete.call(this);
                    }

                    $element.
                        one(options.transitionEnd, $.proxy(complete, this)).
                        emulateTransitionEnd(options.duration);
                };

                Modal.prototype.close = function (relatedTarget) {
                    if (!this.active) {
                        return;
                    }

                    var $element = this.$element;
                    var options = this.options;
                    var isPopup = this.isPopup;

                    // 判断如果还在动画，就先触发之前的opened事件
                    if (this.transitioning) {
                        clearTimeout($element.transitionEndTimmer);
                        $element.transitionEndTimmer = null;
                        $element.trigger(options.transitionEnd).off(options.transitionEnd);
                        dimmer.close($element, true);
                    }

                    this.$element.trigger($.Event('close.modal.amui', {
                        relatedTarget: relatedTarget
                    }));

                    this.transitioning = 1;

                    var complete = function () {
                        $element.trigger('closed.modal.amui');
                        isPopup && $element.removeClass(options.className.out);
                        $element.hide();
                        this.transitioning = 0;
                        // 不强制关闭 Dimmer，以便多个 Modal 可以共享 Dimmer
                        dimmer.close($element, false);
                        this.active = false;
                    };

                    $element.removeClass(options.className.active).
                        addClass(options.className.out);

                    if (!supportTransition) {
                        return complete.call(this);
                    }

                    $element.one(options.transitionEnd, $.proxy(complete, this)).
                        emulateTransitionEnd(options.duration);
                };

                Modal.prototype.events = function () {
                    var that = this;
                    var $element = this.$element;
                    var $ipt = $element.find('.am-modal-prompt-input');
                    var getData = function () {
                        var data = [];
                        $ipt.each(function () {
                            data.push($(this).val());
                        });

                        return (data.length === 0) ? undefined :
                            ((data.length === 1) ? data[0] : data);
                    };

                    // close via Esc key
                    if (this.options.cancelable) {
                        $element.on('keyup.modal.amui', function (e) {
                            if (that.active && e.which === 27) {
                                $element.trigger('cancel.modal.amui');
                                that.close();
                            }
                        });
                    }

                    // Close Modal when dimmer clicked
                    if (this.options.closeViaDimmer) {
                        dimmer.$element.on('click.dimmer.modal.amui', function (e) {
                            that.close();
                        });
                    }

                    // Close Modal when button clicked
                    $element.find('[data-am-modal-close], .am-modal-btn').
                        on('click.close.modal.amui', function (e) {
                            e.preventDefault();
                            that.close();
                        });

                    $element.find('[data-am-modal-confirm]').on(
                        'click.confirm.modal.amui',
                        function () {
                            $element.trigger($.Event('confirm.modal.amui', {
                                trigger: this
                            }));
                        });

                    $element.find('[data-am-modal-cancel]').
                        on('click.cancel.modal.amui', function () {
                            $element.trigger($.Event('cancel.modal.amui', {
                                trigger: this
                            }));
                        });

                    $element.on('confirm.modal.amui', function (e) {
                        e.data = getData();
                        that.options.onConfirm.call(that, e);
                    }).on('cancel.modal.amui', function (e) {
                        e.data = getData();
                        that.options.onCancel.call(that, e);
                    });
                };

                function Plugin(option, relatedTarget) {
                    return this.each(function () {
                        var $this = $(this);
                        var data = $this.data('amui.modal');
                        var options = $.extend({},
                            Modal.DEFAULTS, typeof option == 'object' && option);

                        if (!data) {
                            $this.data('amui.modal', (data = new Modal(this, options)));
                        }

                        if (typeof option == 'string') {
                            data[option] && data[option](relatedTarget);
                        } else {
                            data.toggle(option && option.relatedTarget || undefined);
                        }
                    });
                }

                $.fn.modal = Plugin;

                // Init
                $doc.on('click.modal.amui.data-api', '[data-am-modal]', function () {
                    var $this = $(this);
                    var options = UI.utils.parseOptions($this.attr('data-am-modal'));
                    var $target = $(options.target ||
                        (this.href && this.href.replace(/.*(?=#[^\s]+$)/, '')));
                    var option = $target.data('amui.modal') ? 'toggle' : options;

                    Plugin.call($target, option, this);
                });

                $.AMUI.modal = Modal;

                module.exports = Modal;

            }).call(this, typeof global !== "undefined" ? global : typeof self !==
                    "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {
            "./core": 2,
            "./ui.dimmer": 3
        }
    ]
}, {}, [1]);
// 公共封装dialog弹出框
function dialog(msg) {
    var dialog = $("#dialog_modal");
    if (dialog.length > 0) {
        $("#dialog_msg").html(msg);
    } else {
        var dialogBox = "<div class='am-modal am-modal-no-btn' tabindex='-1' id='dialog_modal'>"
            + "<div class='am-modal-dialog'>"
            + "<a href='javascript: void(0)' class='am-close am-close-spin' data-am-modal-close>&times;</a>"
            + "<div class='am-modal-bd' id='dialog_msg'>"
            + msg
            + "</div></div></div>";
        $("body").append(dialogBox);
    }
    $("#dialog_modal").modal();
}
//有返回首页按钮
function directdialog(msg,info_msg1,info_msg2,url){
    var dialog = $("#dialog_direct");
    if (dialog.length > 0) {
        $("#dialog_direct_msg").html(msg);
    } else {
        var dialogBox = "<div class='am-modal am-modal-confirm' tabindex='-1' id='dialog_direct'>" +
            "<div class='am-modal-dialog tc'>" +
            "<div class='am-modal-hd' id='dialog_direct_msg'>"+msg+"</div>" +
            "<div class='am-modal-info' id='dialog_info_msg'>"+info_msg1+
            "</br>"+info_msg2+
            "</div>" +
            "<span class='am-modal-btn back_yellow' data-am-modal-confirm>返回首页</span></div></div>";
        $("body").append(dialogBox);
    }
    $('#dialog_direct').modal({
        relatedTarget: this,
        onConfirm: function(options) {
            window.location.href = url;
        }
    });
}
//自动关闭弹出框（5秒后自动关闭）
function autoclosedialog(msg,info_msg1,info_msg2){
    var dialog = $("#auto_dialog_modal");
    if (dialog.length > 0) {
        $("#dialog_direct_msg").html(msg);
    } else {
        var autodialogBox = "<div class='am-modal am-modal-no-btn' tabindex='-1' id='auto_dialog_modal'>"
            + "<div class='am-modal-dialog'>" +
            "<div class='am-modal-hd' id='dialog_direct_msg'>" + msg + "</div>" +
            "<div class='am-modal-info ' id='dialog_info_msg'>" + info_msg1 +
            "</br>" + info_msg2 + "</div></div>";
        $("body").append(autodialogBox);
    }
    $("#auto_dialog_modal").modal("open");
    setTimeout("closedialog()",5000);
}
//关闭弹窗
function closedialog(){
    $("#auto_dialog_modal").modal("close");
}
//跳回到微信窗口
function closewxwindow(){
    WeixinJSBridge.call('closeWindow');
}
//带保留删除按钮
function confirmdialog(msg,func){
    var dialog = $("#dialog_confirm");
    if (dialog.length > 0) {
        $("#dialog_confirm_msg").html(msg);
    } else {
        var dialogBox = "<div class='am-modal am-modal-confirm' tabindex='-1' id='dialog_confirm'>" +
            "<div class='am-modal-dialog'>" +
            "<div class='am-modal-hd' id='dialog_confirm_msg'>"+msg+"</div>" +
            "<div class='am-modal-footer'>" +
            "<span class='am-modal-btn fz17' data-am-modal-cancel><i class='iconfont yellow fz20'>&#xe604</i> 保留</span>" +
            "<span class='am-modal-btn fz17' data-am-modal-confirm><i class='iconfont yellow fz20'>&#xe605</i> 删除</span></div></div></div>";
        $("body").append(dialogBox);
    }
    $('#dialog_confirm').modal({
        relatedTarget: this,
        onConfirm: function(options) {
            func;
            alert("删除成功")
        },
        //closeOnConfirm: false,
        onCancel: function() {
            //取消之后操作
        }
    });
}