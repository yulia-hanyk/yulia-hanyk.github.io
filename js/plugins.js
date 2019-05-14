// Verde.io plugins

(function ($) {
    $.fn.coverImages = function (callback) {
        return this.each(function () {

            var $obj = $(this);
            var $imgs = $(this).find(".big-img, video");

            $imgs.each(function () {

                var $img = $(this);

                var $container = $img.parent();
                var $containerParent = $container.parent();

                $img.removeAttr("style");
                $container.removeAttr("style");
                $containerParent.removeAttr("style");

                var imageAspect = $img.data("ratio");
                var containerW = $container.width();
                var containerH = $container.outerHeight();
                var containerAspect = containerW / containerH;

                if (containerAspect < imageAspect) {
                    $img.css({
                        width: Math.ceil(containerH * imageAspect),
                        height: Math.ceil(containerH),
                        top: 0,
                        left: -Math.round((containerH * imageAspect - containerW) / 2)
                    });
                } else if (containerAspect > imageAspect) {
                    $img.css({
                        width: Math.ceil(containerW),
                        height: Math.ceil(containerW / imageAspect),
                        top: -Math.round((containerW / imageAspect - containerH) / 2),
                        left: 0
                    });
                }
            });

            if (typeof callback === 'function') {
                callback.apply(this);
            }
        });
    };
}(jQuery));

(function ($) {
    $.fn.fitImages = function (callback) {
        return this.each(function () {

            var $obj = $(this);
            var placement = $obj.data("placement");
            var $imgs = $(this).find(".big-img, video");
            var windowWidth = $(window).width();

            $imgs.each(function () {

                var $img = $(this);

                var $sizer = $img.parent();
                var $container = $sizer.parent();
                var inSlider = $sizer.is(".bg");
                var rightAligned = $container.parent().is(".right-aligned");

                $img.removeAttr("style");
                $container.removeAttr("style");
                $sizer.removeAttr("style");

                var imageAspect = $img.data("ratio");
                var containerW = $container.width();
                var containerH = $container.outerHeight();
                var containerAspect = containerW / containerH;

                if (containerAspect > imageAspect && windowWidth >= 768) {
                    if (placement == "medium-left-top" || placement == "medium-left-middle" || placement == "medium-left-bottom" || placement == "small-left-top" || placement == "small-left-middle" || placement == "small-left-bottom" || placement == "fit-height-left" || (inSlider && !rightAligned))
                        $sizer.css({
                            width: Math.ceil(containerH * imageAspect),
                            height: Math.ceil(containerH),
                            top: 0,
                            left: 0
                        });
                    else if (placement == "medium-right-top" || placement == "medium-right-middle" || placement == "medium-right-bottom" || placement == "small-right-top" || placement == "small-right-middle" || placement == "small-right-bottom" || placement == "fit-height-right" || (inSlider && rightAligned))
                        $sizer.css({
                            width: Math.ceil(containerH * imageAspect),
                            height: Math.ceil(containerH),
                            top: 0,
                            right: 0
                        });
                    else
                        $sizer.css({
                            width: Math.ceil(containerH * imageAspect),
                            height: Math.ceil(containerH),
                            top: 0,
                            left: -Math.round((containerH * imageAspect - containerW) / 2)
                        });
                    /*else if(placement == "medium-left-middle")
						$sizer.css({
			            	width: Math.ceil(containerH*imageAspect),
							height: Math.ceil(containerH),
							top: 0,
							left: -Math.round((containerH*imageAspect-containerW)/2)
			            });
			        else if(placement == "medium-left-bottom")
						$sizer.css({
			            	width: Math.ceil(containerH*imageAspect),
							height: Math.ceil(containerH),
							bottom: 0,
							left: -Math.round((containerH*imageAspect-containerW)/2)
			            });*/
                } else if (containerAspect < imageAspect && windowWidth >= 768) {

                    if (placement == "medium-left-top" || placement == "small-left-top" || placement == "medium-center-top" || placement == "small-center-top")
                        $sizer.css({
                            width: Math.ceil(containerW),
                            height: Math.ceil(containerW / imageAspect),
                            top: 0,
                            left: 0
                        });
                    else if (placement == "medium-left-middle" || placement == "small-left-middle" || placement == "medium-center-middle" || placement == "small-center-middle" || placement == "fit-width-middle" || (inSlider && !rightAligned))
                        $sizer.css({
                            width: Math.ceil(containerW),
                            height: Math.ceil(containerW / imageAspect),
                            top: -Math.round((containerW / imageAspect - containerH) / 2),
                            left: 0
                        });
                    else if (placement == "medium-left-bottom" || placement == "small-left-bottom" || placement == "medium-center-bottom" || placement == "small-center-bottom" || placement == "fit-width-bottom")
                        $sizer.css({
                            width: Math.ceil(containerW),
                            height: Math.ceil(containerW / imageAspect),
                            bottom: 0,
                            left: 0
                        });
                    else if (placement == "medium-right-top" || placement == "small-right-top" || placement == "fit-width-top")
                        $sizer.css({
                            width: Math.ceil(containerW),
                            height: Math.ceil(containerW / imageAspect),
                            top: 0,
                            right: 0
                        });
                    else if (placement == "medium-right-middle" || placement == "small-right-middle" || (inSlider && rightAligned))
                        $sizer.css({
                            width: Math.ceil(containerW),
                            height: Math.ceil(containerW / imageAspect),
                            top: -Math.round((containerW / imageAspect - containerH) / 2),
                            right: 0
                        });
                    else if (placement == "medium-right-bottom" || placement == "small-right-bottom")
                        $sizer.css({
                            width: Math.ceil(containerW),
                            height: Math.ceil(containerW / imageAspect),
                            bottom: 0,
                            right: 0
                        });
                    else
                        $sizer.css({
                            width: Math.ceil(containerW),
                            height: Math.ceil(containerW / imageAspect),
                            top: -Math.round((containerW / imageAspect - containerH) / 2),
                            left: 0
                        });
                } else {
                    $sizer.removeAttr("style");
                }
            });

            if (typeof callback === 'function') {
                callback.apply(this);
            }
        });
    };
}(jQuery));

(function ($) {
    $.fn.fitToBrowser = function () {
        return this.each(function () {

            var $obj = $(this);
            var windowWidth = $(window).width();

            if (windowWidth < 768)
                var left = -10;
            else if (windowWidth < 1024)
                var left = -8;
            else
                var left = -(windowWidth - 930) / 2

            $obj.css({
                width: windowWidth,
                height: windowWidth * $obj.data("ratio"),
                left: left
            });

        });
    };
}(jQuery));


(function ($) {
    $.fn.loadImage = function (callback) {
        return this.each(function () {

            var $imgs = $(this).find("img");

            $imgs.each(function () {

                var $img = $(this);
                var obj = this;

                if (Modernizr.mousehover || (!Modernizr.mousehover && $(window).width() >= 768 && window.devicePixelRatio >= 1.5))
                    var toLoad = $img.data("large");
                else
                    var toLoad = $img.data("medium");

                $("<img />").attr("src", toLoad).imagesLoaded(function () {
                    var $parent = $img.parent();

                    $img.attr("src", toLoad);
                    $parent.removeClass("loading");
                    //if($parent.is("#bg")) { setTimeout(function(){$img.gray();}, 0); }

                    setTimeout(function () {
                        $parent.addClass("loaded");
                    }, 500);

                    if (typeof callback === 'function') {
                        callback.apply(obj);
                    }
                });
            });
        });
    };
}(jQuery));

(function ($) {
    $.fn.unLoadImages = function () {
        return this.each(function (index) {
            $("img", this).attr("src", "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
            $(this).removeClass("loaded");
        });
    };
}(jQuery));

// Avoid errors for console.log
(function () {
    var method;
    var noop = function () {};
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
jQuery.easing["jswing"] = jQuery.easing["swing"];
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (e, t, n, r, i) {
        return jQuery.easing[jQuery.easing.def](e, t, n, r, i)
    },
    easeInQuad: function (e, t, n, r, i) {
        return r * (t /= i) * t + n
    },
    easeOutQuad: function (e, t, n, r, i) {
        return -r * (t /= i) * (t - 2) + n
    },
    easeInOutQuad: function (e, t, n, r, i) {
        if ((t /= i / 2) < 1) return r / 2 * t * t + n;
        return -r / 2 * (--t * (t - 2) - 1) + n
    },
    easeInCubic: function (e, t, n, r, i) {
        return r * (t /= i) * t * t + n
    },
    easeOutCubic: function (e, t, n, r, i) {
        return r * ((t = t / i - 1) * t * t + 1) + n
    },
    easeInOutCubic: function (e, t, n, r, i) {
        if ((t /= i / 2) < 1) return r / 2 * t * t * t + n;
        return r / 2 * ((t -= 2) * t * t + 2) + n
    },
    easeInQuart: function (e, t, n, r, i) {
        return r * (t /= i) * t * t * t + n
    },
    easeOutQuart: function (e, t, n, r, i) {
        return -r * ((t = t / i - 1) * t * t * t - 1) + n
    },
    easeInOutQuart: function (e, t, n, r, i) {
        if ((t /= i / 2) < 1) return r / 2 * t * t * t * t + n;
        return -r / 2 * ((t -= 2) * t * t * t - 2) + n
    },
    easeInQuint: function (e, t, n, r, i) {
        return r * (t /= i) * t * t * t * t + n
    },
    easeOutQuint: function (e, t, n, r, i) {
        return r * ((t = t / i - 1) * t * t * t * t + 1) + n
    },
    easeInOutQuint: function (e, t, n, r, i) {
        if ((t /= i / 2) < 1) return r / 2 * t * t * t * t * t + n;
        return r / 2 * ((t -= 2) * t * t * t * t + 2) + n
    },
    easeInSine: function (e, t, n, r, i) {
        return -r * Math.cos(t / i * (Math.PI / 2)) + r + n
    },
    easeOutSine: function (e, t, n, r, i) {
        return r * Math.sin(t / i * (Math.PI / 2)) + n
    },
    easeInOutSine: function (e, t, n, r, i) {
        return -r / 2 * (Math.cos(Math.PI * t / i) - 1) + n
    },
    easeInExpo: function (e, t, n, r, i) {
        return t == 0 ? n : r * Math.pow(2, 10 * (t / i - 1)) + n
    },
    easeOutExpo: function (e, t, n, r, i) {
        return t == i ? n + r : r * (-Math.pow(2, -10 * t / i) + 1) + n
    },
    easeInOutExpo: function (e, t, n, r, i) {
        if (t == 0) return n;
        if (t == i) return n + r;
        if ((t /= i / 2) < 1) return r / 2 * Math.pow(2, 10 * (t - 1)) + n;
        return r / 2 * (-Math.pow(2, -10 * --t) + 2) + n
    },
    easeInCirc: function (e, t, n, r, i) {
        return -r * (Math.sqrt(1 - (t /= i) * t) - 1) + n
    },
    easeOutCirc: function (e, t, n, r, i) {
        return r * Math.sqrt(1 - (t = t / i - 1) * t) + n
    },
    easeInOutCirc: function (e, t, n, r, i) {
        if ((t /= i / 2) < 1) return -r / 2 * (Math.sqrt(1 - t * t) - 1) + n;
        return r / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
    },
    easeInElastic: function (e, t, n, r, i) {
        var s = 1.70158;
        var o = 0;
        var u = r;
        if (t == 0) return n;
        if ((t /= i) == 1) return n + r;
        if (!o) o = i * .3;
        if (u < Math.abs(r)) {
            u = r;
            var s = o / 4
        } else var s = o / (2 * Math.PI) * Math.asin(r / u);
        return -(u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o)) + n
    },
    easeOutElastic: function (e, t, n, r, i) {
        var s = 1.70158;
        var o = 0;
        var u = r;
        if (t == 0) return n;
        if ((t /= i) == 1) return n + r;
        if (!o) o = i * .3;
        if (u < Math.abs(r)) {
            u = r;
            var s = o / 4
        } else var s = o / (2 * Math.PI) * Math.asin(r / u);
        return u * Math.pow(2, -10 * t) * Math.sin((t * i - s) * 2 * Math.PI / o) + r + n
    },
    easeInOutElastic: function (e, t, n, r, i) {
        var s = 1.70158;
        var o = 0;
        var u = r;
        if (t == 0) return n;
        if ((t /= i / 2) == 2) return n + r;
        if (!o) o = i * .3 * 1.5;
        if (u < Math.abs(r)) {
            u = r;
            var s = o / 4
        } else var s = o / (2 * Math.PI) * Math.asin(r / u);
        if (t < 1) return -.5 * u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) + n;
        return u * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) * .5 + r + n
    },
    easeInBack: function (e, t, n, r, i, s) {
        if (s == undefined) s = 1.70158;
        return r * (t /= i) * t * ((s + 1) * t - s) + n
    },
    easeOutBack: function (e, t, n, r, i, s) {
        if (s == undefined) s = 1.70158;
        return r * ((t = t / i - 1) * t * ((s + 1) * t + s) + 1) + n
    },
    easeInOutBack: function (e, t, n, r, i, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= i / 2) < 1) return r / 2 * t * t * (((s *= 1.525) + 1) * t - s) + n;
        return r / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + n
    },
    easeInBounce: function (e, t, n, r, i) {
        return r - jQuery.easing.easeOutBounce(e, i - t, 0, r, i) + n
    },
    easeOutBounce: function (e, t, n, r, i) {
        if ((t /= i) < 1 / 2.75) {
            return r * 7.5625 * t * t + n
        } else if (t < 2 / 2.75) {
            return r * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n
        } else if (t < 2.5 / 2.75) {
            return r * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n
        } else {
            return r * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
        }
    },
    easeInOutBounce: function (e, t, n, r, i) {
        if (t < i / 2) return jQuery.easing.easeInBounce(e, t * 2, 0, r, i) * .5 + n;
        return jQuery.easing.easeOutBounce(e, t * 2 - i, 0, r, i) * .5 + r * .5 + n
    }
});

/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
(function () {
    function e() {}

    function t(e, t) {
        for (var n = e.length; n--;)
            if (e[n].listener === t) return n;
        return -1
    }

    function n(e) {
        return function () {
            return this[e].apply(this, arguments)
        }
    }
    var i = e.prototype,
        r = this,
        o = r.EventEmitter;
    i.getListeners = function (e) {
        var t, n, i = this._getEvents();
        if ("object" == typeof e) {
            t = {};
            for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n])
        } else t = i[e] || (i[e] = []);
        return t
    }, i.flattenListeners = function (e) {
        var t, n = [];
        for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
        return n
    }, i.getListenersAsObject = function (e) {
        var t, n = this.getListeners(e);
        return n instanceof Array && (t = {}, t[e] = n), t || n
    }, i.addListener = function (e, n) {
        var i, r = this.getListenersAsObject(e),
            o = "object" == typeof n;
        for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : {
            listener: n,
            once: !1
        });
        return this
    }, i.on = n("addListener"), i.addOnceListener = function (e, t) {
        return this.addListener(e, {
            listener: t,
            once: !0
        })
    }, i.once = n("addOnceListener"), i.defineEvent = function (e) {
        return this.getListeners(e), this
    }, i.defineEvents = function (e) {
        for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
        return this
    }, i.removeListener = function (e, n) {
        var i, r, o = this.getListenersAsObject(e);
        for (r in o) o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1));
        return this
    }, i.off = n("removeListener"), i.addListeners = function (e, t) {
        return this.manipulateListeners(!1, e, t)
    }, i.removeListeners = function (e, t) {
        return this.manipulateListeners(!0, e, t)
    }, i.manipulateListeners = function (e, t, n) {
        var i, r, o = e ? this.removeListener : this.addListener,
            s = e ? this.removeListeners : this.addListeners;
        if ("object" != typeof t || t instanceof RegExp)
            for (i = n.length; i--;) o.call(this, t, n[i]);
        else
            for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
        return this
    }, i.removeEvent = function (e) {
        var t, n = typeof e,
            i = this._getEvents();
        if ("string" === n) delete i[e];
        else if ("object" === n)
            for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
        else delete this._events;
        return this
    }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function (e, t) {
        var n, i, r, o, s = this.getListenersAsObject(e);
        for (r in s)
            if (s.hasOwnProperty(r))
                for (i = s[r].length; i--;) n = s[r][i], n.once === !0 && this.removeListener(e, n.listener), o = n.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, n.listener);
        return this
    }, i.trigger = n("emitEvent"), i.emit = function (e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(e, t)
    }, i.setOnceReturnValue = function (e) {
        return this._onceReturnValue = e, this
    }, i._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, i._getEvents = function () {
        return this._events || (this._events = {})
    }, e.noConflict = function () {
        return r.EventEmitter = o, e
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
        return e
    }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
}).call(this),
    function (e) {
        function t(t) {
            var n = e.event;
            return n.target = n.target || n.srcElement || t, n
        }
        var n = document.documentElement,
            i = function () {};
        n.addEventListener ? i = function (e, t, n) {
            e.addEventListener(t, n, !1)
        } : n.attachEvent && (i = function (e, n, i) {
            e[n + i] = i.handleEvent ? function () {
                var n = t(e);
                i.handleEvent.call(i, n)
            } : function () {
                var n = t(e);
                i.call(e, n)
            }, e.attachEvent("on" + n, e[n + i])
        });
        var r = function () {};
        n.removeEventListener ? r = function (e, t, n) {
            e.removeEventListener(t, n, !1)
        } : n.detachEvent && (r = function (e, t, n) {
            e.detachEvent("on" + t, e[t + n]);
            try {
                delete e[t + n]
            } catch (i) {
                e[t + n] = void 0
            }
        });
        var o = {
            bind: i,
            unbind: r
        };
        "function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o
    }(this),
    function (e, t) {
        "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function (n, i) {
            return t(e, n, i)
        }) : "object" == typeof exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
    }(window, function (e, t, n) {
        function i(e, t) {
            for (var n in t) e[n] = t[n];
            return e
        }

        function r(e) {
            return "[object Array]" === d.call(e)
        }

        function o(e) {
            var t = [];
            if (r(e)) t = e;
            else if ("number" == typeof e.length)
                for (var n = 0, i = e.length; i > n; n++) t.push(e[n]);
            else t.push(e);
            return t
        }

        function s(e, t, n) {
            if (!(this instanceof s)) return new s(e, t);
            "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = o(e), this.options = i({}, this.options), "function" == typeof t ? n = t : i(this.options, t), n && this.on("always", n), this.getImages(), a && (this.jqDeferred = new a.Deferred);
            var r = this;
            setTimeout(function () {
                r.check()
            })
        }

        function f(e) {
            this.img = e
        }

        function c(e) {
            this.src = e, v[e] = this
        }
        var a = e.jQuery,
            u = e.console,
            h = u !== void 0,
            d = Object.prototype.toString;
        s.prototype = new t, s.prototype.options = {}, s.prototype.getImages = function () {
            this.images = [];
            for (var e = 0, t = this.elements.length; t > e; e++) {
                var n = this.elements[e];
                "IMG" === n.nodeName && this.addImage(n);
                var i = n.nodeType;
                if (i && (1 === i || 9 === i || 11 === i))
                    for (var r = n.querySelectorAll("img"), o = 0, s = r.length; s > o; o++) {
                        var f = r[o];
                        this.addImage(f)
                    }
            }
        }, s.prototype.addImage = function (e) {
            var t = new f(e);
            this.images.push(t)
        }, s.prototype.check = function () {
            function e(e, r) {
                return t.options.debug && h && u.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0
            }
            var t = this,
                n = 0,
                i = this.images.length;
            if (this.hasAnyBroken = !1, !i) return this.complete(), void 0;
            for (var r = 0; i > r; r++) {
                var o = this.images[r];
                o.on("confirm", e), o.check()
            }
        }, s.prototype.progress = function (e) {
            this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
            var t = this;
            setTimeout(function () {
                t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
            })
        }, s.prototype.complete = function () {
            var e = this.hasAnyBroken ? "fail" : "done";
            this.isComplete = !0;
            var t = this;
            setTimeout(function () {
                if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
                    var n = t.hasAnyBroken ? "reject" : "resolve";
                    t.jqDeferred[n](t)
                }
            })
        }, a && (a.fn.imagesLoaded = function (e, t) {
            var n = new s(this, e, t);
            return n.jqDeferred.promise(a(this))
        }), f.prototype = new t, f.prototype.check = function () {
            var e = v[this.img.src] || new c(this.img.src);
            if (e.isConfirmed) return this.confirm(e.isLoaded, "cached was confirmed"), void 0;
            if (this.img.complete && (!!this.img.src.match(/.svg$/) || !!this.img.src.match(/.svgz$/))) {
                this.confirm(true, false);
                return
            };
            if (this.img.complete && void 0 !== this.img.naturalWidth) return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0;
            var t = this;
            e.on("confirm", function (e, n) {
                return t.confirm(e.isLoaded, n), !0
            }), e.check()
        }, f.prototype.confirm = function (e, t) {
            this.isLoaded = e, this.emit("confirm", this, t)
        };
        var v = {};
        return c.prototype = new t, c.prototype.check = function () {
            if (!this.isChecked) {
                var e = new Image;
                n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0
            }
        }, c.prototype.handleEvent = function (e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, c.prototype.onload = function (e) {
            this.confirm(!0, "onload"), this.unbindProxyEvents(e)
        }, c.prototype.onerror = function (e) {
            this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
        }, c.prototype.confirm = function (e, t) {
            this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
        }, c.prototype.unbindProxyEvents = function (e) {
            n.unbind(e.target, "load", this), n.unbind(e.target, "error", this)
        }, s
    });

/*!
Waypoints - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
! function () {
    "use strict";

    function t(o) {
        if (!o) throw new Error("No options passed to Waypoint constructor");
        if (!o.element) throw new Error("No element option passed to Waypoint constructor");
        if (!o.handler) throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, o), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = o.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, e += 1
    }
    var e = 0,
        i = {};
    t.prototype.queueTrigger = function (t) {
        this.group.queueTrigger(this, t)
    }, t.prototype.trigger = function (t) {
        this.enabled && this.callback && this.callback.apply(this, t)
    }, t.prototype.destroy = function () {
        this.context.remove(this), this.group.remove(this), delete i[this.key]
    }, t.prototype.disable = function () {
        return this.enabled = !1, this
    }, t.prototype.enable = function () {
        return this.context.refresh(), this.enabled = !0, this
    }, t.prototype.next = function () {
        return this.group.next(this)
    }, t.prototype.previous = function () {
        return this.group.previous(this)
    }, t.invokeAll = function (t) {
        var e = [];
        for (var o in i) e.push(i[o]);
        for (var n = 0, r = e.length; r > n; n++) e[n][t]()
    }, t.destroyAll = function () {
        t.invokeAll("destroy")
    }, t.disableAll = function () {
        t.invokeAll("disable")
    }, t.enableAll = function () {
        t.invokeAll("enable")
    }, t.refreshAll = function () {
        t.Context.refreshAll()
    }, t.viewportHeight = function () {
        return window.innerHeight || document.documentElement.clientHeight
    }, t.viewportWidth = function () {
        return document.documentElement.clientWidth
    }, t.adapters = [], t.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
    }, t.offsetAliases = {
        "bottom-in-view": function () {
            return this.context.innerHeight() - this.adapter.outerHeight()
        },
        "right-in-view": function () {
            return this.context.innerWidth() - this.adapter.outerWidth()
        }
    }, window.Waypoint = t
}(),
function () {
    "use strict";

    function t(t) {
        window.setTimeout(t, 1e3 / 60)
    }

    function e(t) {
        this.element = t, this.Adapter = n.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
        }, this.waypoints = {
            vertical: {},
            horizontal: {}
        }, t.waypointContextKey = this.key, o[t.waypointContextKey] = this, i += 1, this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
    }
    var i = 0,
        o = {},
        n = window.Waypoint,
        r = window.onload;
    e.prototype.add = function (t) {
        var e = t.options.horizontal ? "horizontal" : "vertical";
        this.waypoints[e][t.key] = t, this.refresh()
    }, e.prototype.checkEmpty = function () {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
            e = this.Adapter.isEmptyObject(this.waypoints.vertical);
        t && e && (this.adapter.off(".waypoints"), delete o[this.key])
    }, e.prototype.createThrottledResizeHandler = function () {
        function t() {
            e.handleResize(), e.didResize = !1
        }
        var e = this;
        this.adapter.on("resize.waypoints", function () {
            e.didResize || (e.didResize = !0, n.requestAnimationFrame(t))
        })
    }, e.prototype.createThrottledScrollHandler = function () {
        function t() {
            e.handleScroll(), e.didScroll = !1
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function () {
            (!e.didScroll || n.isTouch) && (e.didScroll = !0, n.requestAnimationFrame(t))
        })
    }, e.prototype.handleResize = function () {
        n.Context.refreshAll()
    }, e.prototype.handleScroll = function () {
        var t = {},
            e = {
                horizontal: {
                    newScroll: this.adapter.scrollLeft(),
                    oldScroll: this.oldScroll.x,
                    forward: "right",
                    backward: "left"
                },
                vertical: {
                    newScroll: this.adapter.scrollTop(),
                    oldScroll: this.oldScroll.y,
                    forward: "down",
                    backward: "up"
                }
            };
        for (var i in e) {
            var o = e[i],
                n = o.newScroll > o.oldScroll,
                r = n ? o.forward : o.backward;
            for (var s in this.waypoints[i]) {
                var a = this.waypoints[i][s],
                    l = o.oldScroll < a.triggerPoint,
                    h = o.newScroll >= a.triggerPoint,
                    p = l && h,
                    u = !l && !h;
                (p || u) && (a.queueTrigger(r), t[a.group.id] = a.group)
            }
        }
        for (var c in t) t[c].flushTriggers();
        this.oldScroll = {
            x: e.horizontal.newScroll,
            y: e.vertical.newScroll
        }
    }, e.prototype.innerHeight = function () {
        return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight()
    }, e.prototype.remove = function (t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty()
    }, e.prototype.innerWidth = function () {
        return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth()
    }, e.prototype.destroy = function () {
        var t = [];
        for (var e in this.waypoints)
            for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
        for (var o = 0, n = t.length; n > o; o++) t[o].destroy()
    }, e.prototype.refresh = function () {
        var t, e = this.element == this.element.window,
            i = e ? void 0 : this.adapter.offset(),
            o = {};
        this.handleScroll(), t = {
            horizontal: {
                contextOffset: e ? 0 : i.left,
                contextScroll: e ? 0 : this.oldScroll.x,
                contextDimension: this.innerWidth(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left",
                offsetProp: "left"
            },
            vertical: {
                contextOffset: e ? 0 : i.top,
                contextScroll: e ? 0 : this.oldScroll.y,
                contextDimension: this.innerHeight(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up",
                offsetProp: "top"
            }
        };
        for (var r in t) {
            var s = t[r];
            for (var a in this.waypoints[r]) {
                var l, h, p, u, c, d = this.waypoints[r][a],
                    f = d.options.offset,
                    w = d.triggerPoint,
                    y = 0,
                    g = null == w;
                d.element !== d.element.window && (y = d.adapter.offset()[s.offsetProp]), "function" == typeof f ? f = f.apply(d) : "string" == typeof f && (f = parseFloat(f), d.options.offset.indexOf("%") > -1 && (f = Math.ceil(s.contextDimension * f / 100))), l = s.contextScroll - s.contextOffset, d.triggerPoint = y + l - f, h = w < s.oldScroll, p = d.triggerPoint >= s.oldScroll, u = h && p, c = !h && !p, !g && u ? (d.queueTrigger(s.backward), o[d.group.id] = d.group) : !g && c ? (d.queueTrigger(s.forward), o[d.group.id] = d.group) : g && s.oldScroll >= d.triggerPoint && (d.queueTrigger(s.forward), o[d.group.id] = d.group)
            }
        }
        return n.requestAnimationFrame(function () {
            for (var t in o) o[t].flushTriggers()
        }), this
    }, e.findOrCreateByElement = function (t) {
        return e.findByElement(t) || new e(t)
    }, e.refreshAll = function () {
        for (var t in o) o[t].refresh()
    }, e.findByElement = function (t) {
        return o[t.waypointContextKey]
    }, window.onload = function () {
        r && r(), e.refreshAll()
    }, n.requestAnimationFrame = function (e) {
        var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
        i.call(window, e)
    }, n.Context = e
}(),
function () {
    "use strict";

    function t(t, e) {
        return t.triggerPoint - e.triggerPoint
    }

    function e(t, e) {
        return e.triggerPoint - t.triggerPoint
    }

    function i(t) {
        this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), o[this.axis][this.name] = this
    }
    var o = {
            vertical: {},
            horizontal: {}
        },
        n = window.Waypoint;
    i.prototype.add = function (t) {
        this.waypoints.push(t)
    }, i.prototype.clearTriggerQueues = function () {
        this.triggerQueues = {
            up: [],
            down: [],
            left: [],
            right: []
        }
    }, i.prototype.flushTriggers = function () {
        for (var i in this.triggerQueues) {
            var o = this.triggerQueues[i],
                n = "up" === i || "left" === i;
            o.sort(n ? e : t);
            for (var r = 0, s = o.length; s > r; r += 1) {
                var a = o[r];
                (a.options.continuous || r === o.length - 1) && a.trigger([i])
            }
        }
        this.clearTriggerQueues()
    }, i.prototype.next = function (e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints),
            o = i === this.waypoints.length - 1;
        return o ? null : this.waypoints[i + 1]
    }, i.prototype.previous = function (e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null
    }, i.prototype.queueTrigger = function (t, e) {
        this.triggerQueues[e].push(t)
    }, i.prototype.remove = function (t) {
        var e = n.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1)
    }, i.prototype.first = function () {
        return this.waypoints[0]
    }, i.prototype.last = function () {
        return this.waypoints[this.waypoints.length - 1]
    }, i.findOrCreate = function (t) {
        return o[t.axis][t.name] || new i(t)
    }, n.Group = i
}(),
function () {
    "use strict";

    function t(t) {
        this.$element = e(t)
    }
    var e = window.jQuery,
        i = window.Waypoint;
    e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function (e, i) {
        t.prototype[i] = function () {
            var t = Array.prototype.slice.call(arguments);
            return this.$element[i].apply(this.$element, t)
        }
    }), e.each(["extend", "inArray", "isEmptyObject"], function (i, o) {
        t[o] = e[o]
    }), i.adapters.push({
        name: "jquery",
        Adapter: t
    }), i.Adapter = t
}(),
function () {
    "use strict";

    function t(t) {
        return function () {
            var i = [],
                o = arguments[0];
            return t.isFunction(arguments[0]) && (o = t.extend({}, arguments[1]), o.handler = arguments[0]), this.each(function () {
                var n = t.extend({}, o, {
                    element: this
                });
                "string" == typeof n.context && (n.context = t(this).closest(n.context)[0]), i.push(new e(n))
            }), i
        }
    }
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
}();
/*!
Waypoints Infinite Scroll Shortcut - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
! function () {
    "use strict";

    function t(n) {
        this.options = i.extend({}, t.defaults, n), this.container = this.options.element, "auto" !== this.options.container && (this.container = this.options.container), this.$container = i(this.container), this.$more = i(this.options.more), this.$more.length && (this.setupHandler(), this.waypoint = new o(this.options))
    }
    var i = window.jQuery,
        o = window.Waypoint;
    t.prototype.setupHandler = function () {
        this.options.handler = i.proxy(function () {
            this.options.onBeforePageLoad(), this.destroy(), this.$container.addClass(this.options.loadingClass), i.get(i(this.options.more).attr("href"), i.proxy(function (t) {
                var n = i(i.parseHTML(t)),
                    e = n.find(this.options.more),
                    s = n.find(this.options.items);
                s.length || (s = n.filter(this.options.items)), this.$container.append(s), this.$container.removeClass(this.options.loadingClass), e.length || (e = n.filter(this.options.more)), e.length ? (this.$more.replaceWith(e), this.$more = e, this.waypoint = new o(this.options)) : this.$more.remove(), this.options.onAfterPageLoad(s)
            }, this))
        }, this)
    }, t.prototype.destroy = function () {
        this.waypoint && this.waypoint.destroy()
    }, t.defaults = {
        container: "auto",
        items: ".infinite-item",
        more: ".infinite-more-link",
        offset: "bottom-in-view",
        loadingClass: "infinite-loading",
        onBeforePageLoad: i.noop,
        onAfterPageLoad: i.noop
    }, o.Infinite = t
}();

/* Inview waypoint */
! function () {
    "use strict";

    function t() {}

    function e(t) {
        this.options = i.Adapter.extend({}, e.defaults, t), this.axis = this.options.horizontal ? "horizontal" : "vertical", this.waypoints = [], this.element = this.options.element, this.createWaypoints()
    }
    var i = window.Waypoint;
    e.prototype.createWaypoints = function () {
        for (var t = {
                vertical: [{
                    down: "enter",
                    up: "exited",
                    offset: "100%"
                }, {
                    down: "entered",
                    up: "exit",
                    offset: "bottom-in-view"
                }, {
                    down: "exit",
                    up: "entered",
                    offset: 0
                }, {
                    down: "exited",
                    up: "enter",
                    offset: function () {
                        return -this.adapter.outerHeight()
                    }
                }],
                horizontal: [{
                    right: "enter",
                    left: "exited",
                    offset: "100%"
                }, {
                    right: "entered",
                    left: "exit",
                    offset: "right-in-view"
                }, {
                    right: "exit",
                    left: "entered",
                    offset: 0
                }, {
                    right: "exited",
                    left: "enter",
                    offset: function () {
                        return -this.adapter.outerWidth()
                    }
                }]
            }, e = 0, i = t[this.axis].length; i > e; e++) {
            var n = t[this.axis][e];
            this.createWaypoint(n)
        }
    }, e.prototype.createWaypoint = function (t) {
        var e = this;
        this.waypoints.push(new i({
            context: this.options.context,
            element: this.options.element,
            enabled: this.options.enabled,
            handler: function (t) {
                return function (i) {
                    e.options[t[i]].call(e, i)
                }
            }(t),
            offset: t.offset,
            horizontal: this.options.horizontal
        }))
    }, e.prototype.destroy = function () {
        for (var t = 0, e = this.waypoints.length; e > t; t++) this.waypoints[t].destroy();
        this.waypoints = []
    }, e.prototype.disable = function () {
        for (var t = 0, e = this.waypoints.length; e > t; t++) this.waypoints[t].disable()
    }, e.prototype.enable = function () {
        for (var t = 0, e = this.waypoints.length; e > t; t++) this.waypoints[t].enable()
    }, e.defaults = {
        context: window,
        enabled: !0,
        enter: t,
        entered: t,
        exit: t,
        exited: t
    }, i.Inview = e
}();

/*
 FastClick: polyfill to remove click delays on browsers with touch UIs.

 @version 1.0.3
 @codingstandard ftlabs-jsv2
 @copyright The Financial Times Limited [All Rights Reserved]
 @license MIT License (see LICENSE.txt)
*/
(function () {
    "use strict";

    function e(t, r) {
        function s(e, t) {
            return function () {
                return e.apply(t, arguments)
            }
        }
        var i;
        r = r || {};
        this.trackingClick = false;
        this.trackingClickStart = 0;
        this.targetElement = null;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.lastTouchIdentifier = 0;
        this.touchBoundary = r.touchBoundary || 10;
        this.layer = t;
        this.tapDelay = r.tapDelay || 200;
        this.tapTimeout = r.tapTimeout || 700;
        if (e.notNeeded(t)) {
            return
        }
        var o = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"];
        var u = this;
        for (var a = 0, f = o.length; a < f; a++) {
            u[o[a]] = s(u[o[a]], u)
        }
        if (n) {
            t.addEventListener("mouseover", this.onMouse, true);
            t.addEventListener("mousedown", this.onMouse, true);
            t.addEventListener("mouseup", this.onMouse, true)
        }
        t.addEventListener("click", this.onClick, true);
        t.addEventListener("touchstart", this.onTouchStart, false);
        t.addEventListener("touchmove", this.onTouchMove, false);
        t.addEventListener("touchend", this.onTouchEnd, false);
        t.addEventListener("touchcancel", this.onTouchCancel, false);
        if (!Event.prototype.stopImmediatePropagation) {
            t.removeEventListener = function (e, n, r) {
                var i = Node.prototype.removeEventListener;
                if (e === "click") {
                    i.call(t, e, n.hijacked || n, r)
                } else {
                    i.call(t, e, n, r)
                }
            };
            t.addEventListener = function (e, n, r) {
                var i = Node.prototype.addEventListener;
                if (e === "click") {
                    i.call(t, e, n.hijacked || (n.hijacked = function (e) {
                        if (!e.propagationStopped) {
                            n(e)
                        }
                    }), r)
                } else {
                    i.call(t, e, n, r)
                }
            }
        }
        if (typeof t.onclick === "function") {
            i = t.onclick;
            t.addEventListener("click", function (e) {
                i(e)
            }, false);
            t.onclick = null
        }
    }
    var t = navigator.userAgent.indexOf("Windows Phone") >= 0;
    var n = navigator.userAgent.indexOf("Android") > 0 && !t;
    var r = /iP(ad|hone|od)/.test(navigator.userAgent) && !t;
    var i = r && /OS 4_\d(_\d)?/.test(navigator.userAgent);
    var s = r && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);
    var o = navigator.userAgent.indexOf("BB10") > 0;
    e.prototype.needsClick = function (e) {
        switch (e.nodeName.toLowerCase()) {
            case "button":
            case "select":
            case "textarea":
                if (e.disabled) {
                    return true
                }
                break;
            case "input":
                if (r && e.type === "file" || e.disabled) {
                    return true
                }
                break;
            case "label":
            case "iframe":
            case "video":
                return true
        }
        return /\bneedsclick\b/.test(e.className)
    };
    e.prototype.needsFocus = function (e) {
        switch (e.nodeName.toLowerCase()) {
            case "textarea":
                return true;
            case "select":
                return !n;
            case "input":
                switch (e.type) {
                    case "button":
                    case "checkbox":
                    case "file":
                    case "image":
                    case "radio":
                    case "submit":
                        return false
                }
                return !e.disabled && !e.readOnly;
            default:
                return /\bneedsfocus\b/.test(e.className)
        }
    };
    e.prototype.sendClick = function (e, t) {
        var n, r;
        if (document.activeElement && document.activeElement !== e) {
            document.activeElement.blur()
        }
        r = t.changedTouches[0];
        n = document.createEvent("MouseEvents");
        n.initMouseEvent(this.determineEventType(e), true, true, window, 1, r.screenX, r.screenY, r.clientX, r.clientY, false, false, false, false, 0, null);
        n.forwardedTouchEvent = true;
        e.dispatchEvent(n)
    };
    e.prototype.determineEventType = function (e) {
        if (n && e.tagName.toLowerCase() === "select") {
            return "mousedown"
        }
        return "click"
    };
    e.prototype.focus = function (e) {
        var t;
        if (r && e.setSelectionRange && e.type.indexOf("date") !== 0 && e.type !== "time" && e.type !== "month") {
            t = e.value.length;
            e.setSelectionRange(t, t)
        } else {
            e.focus()
        }
    };
    e.prototype.updateScrollParent = function (e) {
        var t, n;
        t = e.fastClickScrollParent;
        if (!t || !t.contains(e)) {
            n = e;
            do {
                if (n.scrollHeight > n.offsetHeight) {
                    t = n;
                    e.fastClickScrollParent = n;
                    break
                }
                n = n.parentElement
            } while (n)
        }
        if (t) {
            t.fastClickLastScrollTop = t.scrollTop
        }
    };
    e.prototype.getTargetElementFromEventTarget = function (e) {
        if (e.nodeType === Node.TEXT_NODE) {
            return e.parentNode
        }
        return e
    };
    e.prototype.onTouchStart = function (e) {
        var t, n, s;
        if (e.targetTouches.length > 1) {
            return true
        }
        t = this.getTargetElementFromEventTarget(e.target);
        n = e.targetTouches[0];
        if (r) {
            s = window.getSelection();
            if (s.rangeCount && !s.isCollapsed) {
                return true
            }
            if (!i) {
                if (n.identifier && n.identifier === this.lastTouchIdentifier) {
                    e.preventDefault();
                    return false
                }
                this.lastTouchIdentifier = n.identifier;
                this.updateScrollParent(t)
            }
        }
        this.trackingClick = true;
        this.trackingClickStart = e.timeStamp;
        this.targetElement = t;
        this.touchStartX = n.pageX;
        this.touchStartY = n.pageY;
        if (e.timeStamp - this.lastClickTime < this.tapDelay) {
            e.preventDefault()
        }
        return true
    };
    e.prototype.touchHasMoved = function (e) {
        var t = e.changedTouches[0],
            n = this.touchBoundary;
        if (Math.abs(t.pageX - this.touchStartX) > n || Math.abs(t.pageY - this.touchStartY) > n) {
            return true
        }
        return false
    };
    e.prototype.onTouchMove = function (e) {
        if (!this.trackingClick) {
            return true
        }
        if (this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) {
            this.trackingClick = false;
            this.targetElement = null
        }
        return true
    };
    e.prototype.findControl = function (e) {
        if (e.control !== undefined) {
            return e.control
        }
        if (e.htmlFor) {
            return document.getElementById(e.htmlFor)
        }
        return e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    };
    e.prototype.onTouchEnd = function (e) {
        var t, o, u, a, f, l = this.targetElement;
        if (!this.trackingClick) {
            return true
        }
        if (e.timeStamp - this.lastClickTime < this.tapDelay) {
            this.cancelNextClick = true;
            return true
        }
        if (e.timeStamp - this.trackingClickStart > this.tapTimeout) {
            return true
        }
        this.cancelNextClick = false;
        this.lastClickTime = e.timeStamp;
        o = this.trackingClickStart;
        this.trackingClick = false;
        this.trackingClickStart = 0;
        if (s) {
            f = e.changedTouches[0];
            l = document.elementFromPoint(f.pageX - window.pageXOffset, f.pageY - window.pageYOffset) || l;
            l.fastClickScrollParent = this.targetElement.fastClickScrollParent
        }
        u = l.tagName.toLowerCase();
        if (u === "label") {
            t = this.findControl(l);
            if (t) {
                this.focus(l);
                if (n) {
                    return false
                }
                l = t
            }
        } else if (this.needsFocus(l)) {
            if (e.timeStamp - o > 100 || r && window.top !== window && u === "input") {
                this.targetElement = null;
                return false
            }
            this.focus(l);
            this.sendClick(l, e);
            if (!r || u !== "select") {
                this.targetElement = null;
                e.preventDefault()
            }
            return false
        }
        if (r && !i) {
            a = l.fastClickScrollParent;
            if (a && a.fastClickLastScrollTop !== a.scrollTop) {
                return true
            }
        }
        if (!this.needsClick(l)) {
            e.preventDefault();
            this.sendClick(l, e)
        }
        return false
    };
    e.prototype.onTouchCancel = function () {
        this.trackingClick = false;
        this.targetElement = null
    };
    e.prototype.onMouse = function (e) {
        if (!this.targetElement) {
            return true
        }
        if (e.forwardedTouchEvent) {
            return true
        }
        if (!e.cancelable) {
            return true
        }
        if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
            if (e.stopImmediatePropagation) {
                e.stopImmediatePropagation()
            } else {
                e.propagationStopped = true
            }
            e.stopPropagation();
            e.preventDefault();
            return false
        }
        return true
    };
    e.prototype.onClick = function (e) {
        var t;
        if (this.trackingClick) {
            this.targetElement = null;
            this.trackingClick = false;
            return true
        }
        if (e.target.type === "submit" && e.detail === 0) {
            return true
        }
        t = this.onMouse(e);
        if (!t) {
            this.targetElement = null
        }
        return t
    };
    e.prototype.destroy = function () {
        var e = this.layer;
        if (n) {
            e.removeEventListener("mouseover", this.onMouse, true);
            e.removeEventListener("mousedown", this.onMouse, true);
            e.removeEventListener("mouseup", this.onMouse, true)
        }
        e.removeEventListener("click", this.onClick, true);
        e.removeEventListener("touchstart", this.onTouchStart, false);
        e.removeEventListener("touchmove", this.onTouchMove, false);
        e.removeEventListener("touchend", this.onTouchEnd, false);
        e.removeEventListener("touchcancel", this.onTouchCancel, false)
    };
    e.notNeeded = function (e) {
        var t;
        var r;
        var i;
        if (typeof window.ontouchstart === "undefined") {
            return true
        }
        r = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];
        if (r) {
            if (n) {
                t = document.querySelector("meta[name=viewport]");
                if (t) {
                    if (t.content.indexOf("user-scalable=no") !== -1) {
                        return true
                    }
                    if (r > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
                        return true
                    }
                }
            } else {
                return true
            }
        }
        if (o) {
            i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
            if (i[1] >= 10 && i[2] >= 3) {
                t = document.querySelector("meta[name=viewport]");
                if (t) {
                    if (t.content.indexOf("user-scalable=no") !== -1) {
                        return true
                    }
                    if (document.documentElement.scrollWidth <= window.outerWidth) {
                        return true
                    }
                }
            }
        }
        if (e.style.msTouchAction === "none") {
            return true
        }
        if (e.style.touchAction === "none") {
            return true
        }
        return false
    };
    e.attach = function (t, n) {
        return new e(t, n)
    };
    if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        define(function () {
            return e
        })
    } else if (typeof module !== "undefined" && module.exports) {
        module.exports = e.attach;
        module.exports.FastClick = e
    } else {
        window.FastClick = e
    }
})();

if (Modernizr.csstransitions) {
    /*! Hammer.JS - v2.0.8 - 2016-04-23
     * http://hammerjs.github.io/
     *
     * Copyright (c) 2016 Jorik Tangelder;
     * Licensed under the MIT license */
    ! function (a, b, c, d) {
        "use strict";

        function e(a, b, c) {
            return setTimeout(j(a, c), b)
        }

        function f(a, b, c) {
            return Array.isArray(a) ? (g(a, c[b], c), !0) : !1
        }

        function g(a, b, c) {
            var e;
            if (a)
                if (a.forEach) a.forEach(b, c);
                else if (a.length !== d)
                for (e = 0; e < a.length;) b.call(c, a[e], e, a), e++;
            else
                for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a)
        }

        function h(b, c, d) {
            var e = "DEPRECATED METHOD: " + c + "\n" + d + " AT \n";
            return function () {
                var c = new Error("get-stack-trace"),
                    d = c && c.stack ? c.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
                    f = a.console && (a.console.warn || a.console.log);
                return f && f.call(a.console, e, d), b.apply(this, arguments)
            }
        }

        function i(a, b, c) {
            var d, e = b.prototype;
            d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && la(d, c)
        }

        function j(a, b) {
            return function () {
                return a.apply(b, arguments)
            }
        }

        function k(a, b) {
            return typeof a == oa ? a.apply(b ? b[0] || d : d, b) : a
        }

        function l(a, b) {
            return a === d ? b : a
        }

        function m(a, b, c) {
            g(q(b), function (b) {
                a.addEventListener(b, c, !1)
            })
        }

        function n(a, b, c) {
            g(q(b), function (b) {
                a.removeEventListener(b, c, !1)
            })
        }

        function o(a, b) {
            for (; a;) {
                if (a == b) return !0;
                a = a.parentNode
            }
            return !1
        }

        function p(a, b) {
            return a.indexOf(b) > -1
        }

        function q(a) {
            return a.trim().split(/\s+/g)
        }

        function r(a, b, c) {
            if (a.indexOf && !c) return a.indexOf(b);
            for (var d = 0; d < a.length;) {
                if (c && a[d][c] == b || !c && a[d] === b) return d;
                d++
            }
            return -1
        }

        function s(a) {
            return Array.prototype.slice.call(a, 0)
        }

        function t(a, b, c) {
            for (var d = [], e = [], f = 0; f < a.length;) {
                var g = b ? a[f][b] : a[f];
                r(e, g) < 0 && d.push(a[f]), e[f] = g, f++
            }
            return c && (d = b ? d.sort(function (a, c) {
                return a[b] > c[b]
            }) : d.sort()), d
        }

        function u(a, b) {
            for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ma.length;) {
                if (c = ma[g], e = c ? c + f : b, e in a) return e;
                g++
            }
            return d
        }

        function v() {
            return ua++
        }

        function w(b) {
            var c = b.ownerDocument || b;
            return c.defaultView || c.parentWindow || a
        }

        function x(a, b) {
            var c = this;
            this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function (b) {
                k(a.options.enable, [a]) && c.handler(b)
            }, this.init()
        }

        function y(a) {
            var b, c = a.options.inputClass;
            return new(b = c ? c : xa ? M : ya ? P : wa ? R : L)(a, z)
        }

        function z(a, b, c) {
            var d = c.pointers.length,
                e = c.changedPointers.length,
                f = b & Ea && d - e === 0,
                g = b & (Ga | Ha) && d - e === 0;
            c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, A(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c
        }

        function A(a, b) {
            var c = a.session,
                d = b.pointers,
                e = d.length;
            c.firstInput || (c.firstInput = D(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = D(b) : 1 === e && (c.firstMultiple = !1);
            var f = c.firstInput,
                g = c.firstMultiple,
                h = g ? g.center : f.center,
                i = b.center = E(d);
            b.timeStamp = ra(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = I(h, i), b.distance = H(h, i), B(c, b), b.offsetDirection = G(b.deltaX, b.deltaY);
            var j = F(b.deltaTime, b.deltaX, b.deltaY);
            b.overallVelocityX = j.x, b.overallVelocityY = j.y, b.overallVelocity = qa(j.x) > qa(j.y) ? j.x : j.y, b.scale = g ? K(g.pointers, d) : 1, b.rotation = g ? J(g.pointers, d) : 0, b.maxPointers = c.prevInput ? b.pointers.length > c.prevInput.maxPointers ? b.pointers.length : c.prevInput.maxPointers : b.pointers.length, C(c, b);
            var k = a.element;
            o(b.srcEvent.target, k) && (k = b.srcEvent.target), b.target = k
        }

        function B(a, b) {
            var c = b.center,
                d = a.offsetDelta || {},
                e = a.prevDelta || {},
                f = a.prevInput || {};
            b.eventType !== Ea && f.eventType !== Ga || (e = a.prevDelta = {
                x: f.deltaX || 0,
                y: f.deltaY || 0
            }, d = a.offsetDelta = {
                x: c.x,
                y: c.y
            }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y)
        }

        function C(a, b) {
            var c, e, f, g, h = a.lastInterval || b,
                i = b.timeStamp - h.timeStamp;
            if (b.eventType != Ha && (i > Da || h.velocity === d)) {
                var j = b.deltaX - h.deltaX,
                    k = b.deltaY - h.deltaY,
                    l = F(i, j, k);
                e = l.x, f = l.y, c = qa(l.x) > qa(l.y) ? l.x : l.y, g = G(j, k), a.lastInterval = b
            } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;
            b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g
        }

        function D(a) {
            for (var b = [], c = 0; c < a.pointers.length;) b[c] = {
                clientX: pa(a.pointers[c].clientX),
                clientY: pa(a.pointers[c].clientY)
            }, c++;
            return {
                timeStamp: ra(),
                pointers: b,
                center: E(b),
                deltaX: a.deltaX,
                deltaY: a.deltaY
            }
        }

        function E(a) {
            var b = a.length;
            if (1 === b) return {
                x: pa(a[0].clientX),
                y: pa(a[0].clientY)
            };
            for (var c = 0, d = 0, e = 0; b > e;) c += a[e].clientX, d += a[e].clientY, e++;
            return {
                x: pa(c / b),
                y: pa(d / b)
            }
        }

        function F(a, b, c) {
            return {
                x: b / a || 0,
                y: c / a || 0
            }
        }

        function G(a, b) {
            return a === b ? Ia : qa(a) >= qa(b) ? 0 > a ? Ja : Ka : 0 > b ? La : Ma
        }

        function H(a, b, c) {
            c || (c = Qa);
            var d = b[c[0]] - a[c[0]],
                e = b[c[1]] - a[c[1]];
            return Math.sqrt(d * d + e * e)
        }

        function I(a, b, c) {
            c || (c = Qa);
            var d = b[c[0]] - a[c[0]],
                e = b[c[1]] - a[c[1]];
            return 180 * Math.atan2(e, d) / Math.PI
        }

        function J(a, b) {
            return I(b[1], b[0], Ra) + I(a[1], a[0], Ra)
        }

        function K(a, b) {
            return H(b[0], b[1], Ra) / H(a[0], a[1], Ra)
        }

        function L() {
            this.evEl = Ta, this.evWin = Ua, this.pressed = !1, x.apply(this, arguments)
        }

        function M() {
            this.evEl = Xa, this.evWin = Ya, x.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
        }

        function N() {
            this.evTarget = $a, this.evWin = _a, this.started = !1, x.apply(this, arguments)
        }

        function O(a, b) {
            var c = s(a.touches),
                d = s(a.changedTouches);
            return b & (Ga | Ha) && (c = t(c.concat(d), "identifier", !0)), [c, d]
        }

        function P() {
            this.evTarget = bb, this.targetIds = {}, x.apply(this, arguments)
        }

        function Q(a, b) {
            var c = s(a.touches),
                d = this.targetIds;
            if (b & (Ea | Fa) && 1 === c.length) return d[c[0].identifier] = !0, [c, c];
            var e, f, g = s(a.changedTouches),
                h = [],
                i = this.target;
            if (f = c.filter(function (a) {
                    return o(a.target, i)
                }), b === Ea)
                for (e = 0; e < f.length;) d[f[e].identifier] = !0, e++;
            for (e = 0; e < g.length;) d[g[e].identifier] && h.push(g[e]), b & (Ga | Ha) && delete d[g[e].identifier], e++;
            return h.length ? [t(f.concat(h), "identifier", !0), h] : void 0
        }

        function R() {
            x.apply(this, arguments);
            var a = j(this.handler, this);
            this.touch = new P(this.manager, a), this.mouse = new L(this.manager, a), this.primaryTouch = null, this.lastTouches = []
        }

        function S(a, b) {
            a & Ea ? (this.primaryTouch = b.changedPointers[0].identifier, T.call(this, b)) : a & (Ga | Ha) && T.call(this, b)
        }

        function T(a) {
            var b = a.changedPointers[0];
            if (b.identifier === this.primaryTouch) {
                var c = {
                    x: b.clientX,
                    y: b.clientY
                };
                this.lastTouches.push(c);
                var d = this.lastTouches,
                    e = function () {
                        var a = d.indexOf(c);
                        a > -1 && d.splice(a, 1)
                    };
                setTimeout(e, cb)
            }
        }

        function U(a) {
            for (var b = a.srcEvent.clientX, c = a.srcEvent.clientY, d = 0; d < this.lastTouches.length; d++) {
                var e = this.lastTouches[d],
                    f = Math.abs(b - e.x),
                    g = Math.abs(c - e.y);
                if (db >= f && db >= g) return !0
            }
            return !1
        }

        function V(a, b) {
            this.manager = a, this.set(b)
        }

        function W(a) {
            if (p(a, jb)) return jb;
            var b = p(a, kb),
                c = p(a, lb);
            return b && c ? jb : b || c ? b ? kb : lb : p(a, ib) ? ib : hb
        }

        function X() {
            if (!fb) return !1;
            var b = {},
                c = a.CSS && a.CSS.supports;
            return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function (d) {
                b[d] = c ? a.CSS.supports("touch-action", d) : !0
            }), b
        }

        function Y(a) {
            this.options = la({}, this.defaults, a || {}), this.id = v(), this.manager = null, this.options.enable = l(this.options.enable, !0), this.state = nb, this.simultaneous = {}, this.requireFail = []
        }

        function Z(a) {
            return a & sb ? "cancel" : a & qb ? "end" : a & pb ? "move" : a & ob ? "start" : ""
        }

        function $(a) {
            return a == Ma ? "down" : a == La ? "up" : a == Ja ? "left" : a == Ka ? "right" : ""
        }

        function _(a, b) {
            var c = b.manager;
            return c ? c.get(a) : a
        }

        function aa() {
            Y.apply(this, arguments)
        }

        function ba() {
            aa.apply(this, arguments), this.pX = null, this.pY = null
        }

        function ca() {
            aa.apply(this, arguments)
        }

        function da() {
            Y.apply(this, arguments), this._timer = null, this._input = null
        }

        function ea() {
            aa.apply(this, arguments)
        }

        function fa() {
            aa.apply(this, arguments)
        }

        function ga() {
            Y.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
        }

        function ha(a, b) {
            return b = b || {}, b.recognizers = l(b.recognizers, ha.defaults.preset), new ia(a, b)
        }

        function ia(a, b) {
            this.options = la({}, ha.defaults, b || {}), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = a, this.input = y(this), this.touchAction = new V(this, this.options.touchAction), ja(this, !0), g(this.options.recognizers, function (a) {
                var b = this.add(new a[0](a[1]));
                a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3])
            }, this)
        }

        function ja(a, b) {
            var c = a.element;
            if (c.style) {
                var d;
                g(a.options.cssProps, function (e, f) {
                    d = u(c.style, f), b ? (a.oldCssProps[d] = c.style[d], c.style[d] = e) : c.style[d] = a.oldCssProps[d] || ""
                }), b || (a.oldCssProps = {})
            }
        }

        function ka(a, c) {
            var d = b.createEvent("Event");
            d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d)
        }
        var la, ma = ["", "webkit", "Moz", "MS", "ms", "o"],
            na = b.createElement("div"),
            oa = "function",
            pa = Math.round,
            qa = Math.abs,
            ra = Date.now;
        la = "function" != typeof Object.assign ? function (a) {
            if (a === d || null === a) throw new TypeError("Cannot convert undefined or null to object");
            for (var b = Object(a), c = 1; c < arguments.length; c++) {
                var e = arguments[c];
                if (e !== d && null !== e)
                    for (var f in e) e.hasOwnProperty(f) && (b[f] = e[f])
            }
            return b
        } : Object.assign;
        var sa = h(function (a, b, c) {
                for (var e = Object.keys(b), f = 0; f < e.length;)(!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++;
                return a
            }, "extend", "Use `assign`."),
            ta = h(function (a, b) {
                return sa(a, b, !0)
            }, "merge", "Use `assign`."),
            ua = 1,
            va = /mobile|tablet|ip(ad|hone|od)|android/i,
            wa = "ontouchstart" in a,
            xa = u(a, "PointerEvent") !== d,
            ya = wa && va.test(navigator.userAgent),
            za = "touch",
            Aa = "pen",
            Ba = "mouse",
            Ca = "kinect",
            Da = 25,
            Ea = 1,
            Fa = 2,
            Ga = 4,
            Ha = 8,
            Ia = 1,
            Ja = 2,
            Ka = 4,
            La = 8,
            Ma = 16,
            Na = Ja | Ka,
            Oa = La | Ma,
            Pa = Na | Oa,
            Qa = ["x", "y"],
            Ra = ["clientX", "clientY"];
        x.prototype = {
            handler: function () {},
            init: function () {
                this.evEl && m(this.element, this.evEl, this.domHandler), this.evTarget && m(this.target, this.evTarget, this.domHandler), this.evWin && m(w(this.element), this.evWin, this.domHandler)
            },
            destroy: function () {
                this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(w(this.element), this.evWin, this.domHandler)
            }
        };
        var Sa = {
                mousedown: Ea,
                mousemove: Fa,
                mouseup: Ga
            },
            Ta = "mousedown",
            Ua = "mousemove mouseup";
        i(L, x, {
            handler: function (a) {
                var b = Sa[a.type];
                b & Ea && 0 === a.button && (this.pressed = !0), b & Fa && 1 !== a.which && (b = Ga), this.pressed && (b & Ga && (this.pressed = !1), this.callback(this.manager, b, {
                    pointers: [a],
                    changedPointers: [a],
                    pointerType: Ba,
                    srcEvent: a
                }))
            }
        });
        var Va = {
                pointerdown: Ea,
                pointermove: Fa,
                pointerup: Ga,
                pointercancel: Ha,
                pointerout: Ha
            },
            Wa = {
                2: za,
                3: Aa,
                4: Ba,
                5: Ca
            },
            Xa = "pointerdown",
            Ya = "pointermove pointerup pointercancel";
        a.MSPointerEvent && !a.PointerEvent && (Xa = "MSPointerDown", Ya = "MSPointerMove MSPointerUp MSPointerCancel"), i(M, x, {
            handler: function (a) {
                var b = this.store,
                    c = !1,
                    d = a.type.toLowerCase().replace("ms", ""),
                    e = Va[d],
                    f = Wa[a.pointerType] || a.pointerType,
                    g = f == za,
                    h = r(b, a.pointerId, "pointerId");
                e & Ea && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ga | Ha) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, {
                    pointers: b,
                    changedPointers: [a],
                    pointerType: f,
                    srcEvent: a
                }), c && b.splice(h, 1))
            }
        });
        var Za = {
                touchstart: Ea,
                touchmove: Fa,
                touchend: Ga,
                touchcancel: Ha
            },
            $a = "touchstart",
            _a = "touchstart touchmove touchend touchcancel";
        i(N, x, {
            handler: function (a) {
                var b = Za[a.type];
                if (b === Ea && (this.started = !0), this.started) {
                    var c = O.call(this, a, b);
                    b & (Ga | Ha) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, {
                        pointers: c[0],
                        changedPointers: c[1],
                        pointerType: za,
                        srcEvent: a
                    })
                }
            }
        });
        var ab = {
                touchstart: Ea,
                touchmove: Fa,
                touchend: Ga,
                touchcancel: Ha
            },
            bb = "touchstart touchmove touchend touchcancel";
        i(P, x, {
            handler: function (a) {
                var b = ab[a.type],
                    c = Q.call(this, a, b);
                c && this.callback(this.manager, b, {
                    pointers: c[0],
                    changedPointers: c[1],
                    pointerType: za,
                    srcEvent: a
                })
            }
        });
        var cb = 2500,
            db = 25;
        i(R, x, {
            handler: function (a, b, c) {
                var d = c.pointerType == za,
                    e = c.pointerType == Ba;
                if (!(e && c.sourceCapabilities && c.sourceCapabilities.firesTouchEvents)) {
                    if (d) S.call(this, b, c);
                    else if (e && U.call(this, c)) return;
                    this.callback(a, b, c)
                }
            },
            destroy: function () {
                this.touch.destroy(), this.mouse.destroy()
            }
        });
        var eb = u(na.style, "touchAction"),
            fb = eb !== d,
            gb = "compute",
            hb = "auto",
            ib = "manipulation",
            jb = "none",
            kb = "pan-x",
            lb = "pan-y",
            mb = X();
        V.prototype = {
            set: function (a) {
                a == gb && (a = this.compute()), fb && this.manager.element.style && mb[a] && (this.manager.element.style[eb] = a), this.actions = a.toLowerCase().trim()
            },
            update: function () {
                this.set(this.manager.options.touchAction)
            },
            compute: function () {
                var a = [];
                return g(this.manager.recognizers, function (b) {
                    k(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()))
                }), W(a.join(" "))
            },
            preventDefaults: function (a) {
                var b = a.srcEvent,
                    c = a.offsetDirection;
                if (this.manager.session.prevented) return void b.preventDefault();
                var d = this.actions,
                    e = p(d, jb) && !mb[jb],
                    f = p(d, lb) && !mb[lb],
                    g = p(d, kb) && !mb[kb];
                if (e) {
                    var h = 1 === a.pointers.length,
                        i = a.distance < 2,
                        j = a.deltaTime < 250;
                    if (h && i && j) return
                }
                return g && f ? void 0 : e || f && c & Na || g && c & Oa ? this.preventSrc(b) : void 0
            },
            preventSrc: function (a) {
                this.manager.session.prevented = !0, a.preventDefault()
            }
        };
        var nb = 1,
            ob = 2,
            pb = 4,
            qb = 8,
            rb = qb,
            sb = 16,
            tb = 32;
        Y.prototype = {
            defaults: {},
            set: function (a) {
                return la(this.options, a), this.manager && this.manager.touchAction.update(), this
            },
            recognizeWith: function (a) {
                if (f(a, "recognizeWith", this)) return this;
                var b = this.simultaneous;
                return a = _(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this
            },
            dropRecognizeWith: function (a) {
                return f(a, "dropRecognizeWith", this) ? this : (a = _(a, this), delete this.simultaneous[a.id], this)
            },
            requireFailure: function (a) {
                if (f(a, "requireFailure", this)) return this;
                var b = this.requireFail;
                return a = _(a, this), -1 === r(b, a) && (b.push(a), a.requireFailure(this)), this
            },
            dropRequireFailure: function (a) {
                if (f(a, "dropRequireFailure", this)) return this;
                a = _(a, this);
                var b = r(this.requireFail, a);
                return b > -1 && this.requireFail.splice(b, 1), this
            },
            hasRequireFailures: function () {
                return this.requireFail.length > 0
            },
            canRecognizeWith: function (a) {
                return !!this.simultaneous[a.id]
            },
            emit: function (a) {
                function b(b) {
                    c.manager.emit(b, a)
                }
                var c = this,
                    d = this.state;
                qb > d && b(c.options.event + Z(d)), b(c.options.event), a.additionalEvent && b(a.additionalEvent), d >= qb && b(c.options.event + Z(d))
            },
            tryEmit: function (a) {
                return this.canEmit() ? this.emit(a) : void(this.state = tb)
            },
            canEmit: function () {
                for (var a = 0; a < this.requireFail.length;) {
                    if (!(this.requireFail[a].state & (tb | nb))) return !1;
                    a++
                }
                return !0
            },
            recognize: function (a) {
                var b = la({}, a);
                return k(this.options.enable, [this, b]) ? (this.state & (rb | sb | tb) && (this.state = nb), this.state = this.process(b), void(this.state & (ob | pb | qb | sb) && this.tryEmit(b))) : (this.reset(), void(this.state = tb))
            },
            process: function (a) {},
            getTouchAction: function () {},
            reset: function () {}
        }, i(aa, Y, {
            defaults: {
                pointers: 1
            },
            attrTest: function (a) {
                var b = this.options.pointers;
                return 0 === b || a.pointers.length === b
            },
            process: function (a) {
                var b = this.state,
                    c = a.eventType,
                    d = b & (ob | pb),
                    e = this.attrTest(a);
                return d && (c & Ha || !e) ? b | sb : d || e ? c & Ga ? b | qb : b & ob ? b | pb : ob : tb
            }
        }), i(ba, aa, {
            defaults: {
                event: "pan",
                threshold: 10,
                pointers: 1,
                direction: Pa
            },
            getTouchAction: function () {
                var a = this.options.direction,
                    b = [];
                return a & Na && b.push(lb), a & Oa && b.push(kb), b
            },
            directionTest: function (a) {
                var b = this.options,
                    c = !0,
                    d = a.distance,
                    e = a.direction,
                    f = a.deltaX,
                    g = a.deltaY;
                return e & b.direction || (b.direction & Na ? (e = 0 === f ? Ia : 0 > f ? Ja : Ka, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Ia : 0 > g ? La : Ma, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction
            },
            attrTest: function (a) {
                return aa.prototype.attrTest.call(this, a) && (this.state & ob || !(this.state & ob) && this.directionTest(a))
            },
            emit: function (a) {
                this.pX = a.deltaX, this.pY = a.deltaY;
                var b = $(a.direction);
                b && (a.additionalEvent = this.options.event + b), this._super.emit.call(this, a)
            }
        }), i(ca, aa, {
            defaults: {
                event: "pinch",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function () {
                return [jb]
            },
            attrTest: function (a) {
                return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & ob)
            },
            emit: function (a) {
                if (1 !== a.scale) {
                    var b = a.scale < 1 ? "in" : "out";
                    a.additionalEvent = this.options.event + b
                }
                this._super.emit.call(this, a)
            }
        }), i(da, Y, {
            defaults: {
                event: "press",
                pointers: 1,
                time: 251,
                threshold: 9
            },
            getTouchAction: function () {
                return [hb]
            },
            process: function (a) {
                var b = this.options,
                    c = a.pointers.length === b.pointers,
                    d = a.distance < b.threshold,
                    f = a.deltaTime > b.time;
                if (this._input = a, !d || !c || a.eventType & (Ga | Ha) && !f) this.reset();
                else if (a.eventType & Ea) this.reset(), this._timer = e(function () {
                    this.state = rb, this.tryEmit()
                }, b.time, this);
                else if (a.eventType & Ga) return rb;
                return tb
            },
            reset: function () {
                clearTimeout(this._timer)
            },
            emit: function (a) {
                this.state === rb && (a && a.eventType & Ga ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = ra(), this.manager.emit(this.options.event, this._input)))
            }
        }), i(ea, aa, {
            defaults: {
                event: "rotate",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function () {
                return [jb]
            },
            attrTest: function (a) {
                return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & ob)
            }
        }), i(fa, aa, {
            defaults: {
                event: "swipe",
                threshold: 10,
                velocity: .3,
                direction: Na | Oa,
                pointers: 1
            },
            getTouchAction: function () {
                return ba.prototype.getTouchAction.call(this)
            },
            attrTest: function (a) {
                var b, c = this.options.direction;
                return c & (Na | Oa) ? b = a.overallVelocity : c & Na ? b = a.overallVelocityX : c & Oa && (b = a.overallVelocityY), this._super.attrTest.call(this, a) && c & a.offsetDirection && a.distance > this.options.threshold && a.maxPointers == this.options.pointers && qa(b) > this.options.velocity && a.eventType & Ga
            },
            emit: function (a) {
                var b = $(a.offsetDirection);
                b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a)
            }
        }), i(ga, Y, {
            defaults: {
                event: "tap",
                pointers: 1,
                taps: 1,
                interval: 300,
                time: 250,
                threshold: 9,
                posThreshold: 10
            },
            getTouchAction: function () {
                return [ib]
            },
            process: function (a) {
                var b = this.options,
                    c = a.pointers.length === b.pointers,
                    d = a.distance < b.threshold,
                    f = a.deltaTime < b.time;
                if (this.reset(), a.eventType & Ea && 0 === this.count) return this.failTimeout();
                if (d && f && c) {
                    if (a.eventType != Ga) return this.failTimeout();
                    var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0,
                        h = !this.pCenter || H(this.pCenter, a.center) < b.posThreshold;
                    this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a;
                    var i = this.count % b.taps;
                    if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function () {
                        this.state = rb, this.tryEmit()
                    }, b.interval, this), ob) : rb
                }
                return tb
            },
            failTimeout: function () {
                return this._timer = e(function () {
                    this.state = tb
                }, this.options.interval, this), tb
            },
            reset: function () {
                clearTimeout(this._timer)
            },
            emit: function () {
                this.state == rb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
            }
        }), ha.VERSION = "2.0.8", ha.defaults = {
            domEvents: !1,
            touchAction: gb,
            enable: !0,
            inputTarget: null,
            inputClass: null,
            preset: [[ea, {
                enable: !1
            }], [ca, {
                enable: !1
            }, ["rotate"]], [fa, {
                direction: Na
            }], [ba, {
                direction: Na
            }, ["swipe"]], [ga], [ga, {
                event: "doubletap",
                taps: 2
            }, ["tap"]], [da]],
            cssProps: {
                userSelect: "none",
                touchSelect: "none",
                touchCallout: "none",
                contentZooming: "none",
                userDrag: "none",
                tapHighlightColor: "rgba(0,0,0,0)"
            }
        };
        var ub = 1,
            vb = 2;
        ia.prototype = {
            set: function (a) {
                return la(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this
            },
            stop: function (a) {
                this.session.stopped = a ? vb : ub
            },
            recognize: function (a) {
                var b = this.session;
                if (!b.stopped) {
                    this.touchAction.preventDefaults(a);
                    var c, d = this.recognizers,
                        e = b.curRecognizer;
                    (!e || e && e.state & rb) && (e = b.curRecognizer = null);
                    for (var f = 0; f < d.length;) c = d[f], b.stopped === vb || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (ob | pb | qb) && (e = b.curRecognizer = c), f++
                }
            },
            get: function (a) {
                if (a instanceof Y) return a;
                for (var b = this.recognizers, c = 0; c < b.length; c++)
                    if (b[c].options.event == a) return b[c];
                return null
            },
            add: function (a) {
                if (f(a, "add", this)) return this;
                var b = this.get(a.options.event);
                return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a
            },
            remove: function (a) {
                if (f(a, "remove", this)) return this;
                if (a = this.get(a)) {
                    var b = this.recognizers,
                        c = r(b, a); - 1 !== c && (b.splice(c, 1), this.touchAction.update())
                }
                return this
            },
            on: function (a, b) {
                if (a !== d && b !== d) {
                    var c = this.handlers;
                    return g(q(a), function (a) {
                        c[a] = c[a] || [], c[a].push(b)
                    }), this
                }
            },
            off: function (a, b) {
                if (a !== d) {
                    var c = this.handlers;
                    return g(q(a), function (a) {
                        b ? c[a] && c[a].splice(r(c[a], b), 1) : delete c[a]
                    }), this
                }
            },
            emit: function (a, b) {
                this.options.domEvents && ka(a, b);
                var c = this.handlers[a] && this.handlers[a].slice();
                if (c && c.length) {
                    b.type = a, b.preventDefault = function () {
                        b.srcEvent.preventDefault()
                    };
                    for (var d = 0; d < c.length;) c[d](b), d++
                }
            },
            destroy: function () {
                this.element && ja(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
            }
        }, la(ha, {
            INPUT_START: Ea,
            INPUT_MOVE: Fa,
            INPUT_END: Ga,
            INPUT_CANCEL: Ha,
            STATE_POSSIBLE: nb,
            STATE_BEGAN: ob,
            STATE_CHANGED: pb,
            STATE_ENDED: qb,
            STATE_RECOGNIZED: rb,
            STATE_CANCELLED: sb,
            STATE_FAILED: tb,
            DIRECTION_NONE: Ia,
            DIRECTION_LEFT: Ja,
            DIRECTION_RIGHT: Ka,
            DIRECTION_UP: La,
            DIRECTION_DOWN: Ma,
            DIRECTION_HORIZONTAL: Na,
            DIRECTION_VERTICAL: Oa,
            DIRECTION_ALL: Pa,
            Manager: ia,
            Input: x,
            TouchAction: V,
            TouchInput: P,
            MouseInput: L,
            PointerEventInput: M,
            TouchMouseInput: R,
            SingleTouchInput: N,
            Recognizer: Y,
            AttrRecognizer: aa,
            Tap: ga,
            Pan: ba,
            Swipe: fa,
            Pinch: ca,
            Rotate: ea,
            Press: da,
            on: m,
            off: n,
            each: g,
            merge: ta,
            extend: sa,
            assign: la,
            inherit: i,
            bindFn: j,
            prefixed: u
        });
        var wb = "undefined" != typeof a ? a : "undefined" != typeof self ? self : {};
        wb.Hammer = ha, "function" == typeof define && define.amd ? define(function () {
            return ha
        }) : "undefined" != typeof module && module.exports ? module.exports = ha : a[c] = ha
    }(window, document, "Hammer");

    /*! jQuery plugin for Hammer.JS
     * http://eightmedia.github.com/hammer.js
     *
     * Copyright (c) 2014 Jorik Tangelder <j.tangelder@gmail.com>;
     * Licensed under the MIT license */
    (function (factory) {
        if (typeof define === 'function' && define.amd) {
            define(['jquery', 'hammerjs'], factory);
        } else if (typeof exports === 'object') {
            factory(require('jquery'), require('hammerjs'));
        } else {
            factory(jQuery, Hammer);
        }
    }(function ($, Hammer) {
        function hammerify(el, options) {
            var $el = $(el);
            if (!$el.data("hammer")) {
                $el.data("hammer", new Hammer($el[0], options));
            }
        }

        $.fn.hammer = function (options) {
            return this.each(function () {
                hammerify(this, options);
            });
        };

        // extend the emit method to also trigger jQuery events
        Hammer.Manager.prototype.emit = (function (originalEmit) {
            return function (type, data) {
                originalEmit.call(this, type, data);
                $(this.element).trigger({
                    type: type,
                    gesture: data
                });
            };
        })(Hammer.Manager.prototype.emit);
    }));
}

/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.9
 *
 * Requires: jQuery 1.2.2+
 */
(function (e) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], e)
    } else if (typeof exports === "object") {
        module.exports = e
    } else {
        e(jQuery)
    }
})(function (e) {
    function a(t) {
        var n = t || window.event,
            o = r.call(arguments, 1),
            u = 0,
            a = 0,
            c = 0,
            h = 0;
        t = e.event.fix(n);
        t.type = "mousewheel";
        if ("detail" in n) {
            c = n.detail * -1
        }
        if ("wheelDelta" in n) {
            c = n.wheelDelta
        }
        if ("wheelDeltaY" in n) {
            c = n.wheelDeltaY
        }
        if ("wheelDeltaX" in n) {
            a = n.wheelDeltaX * -1
        }
        if ("axis" in n && n.axis === n.HORIZONTAL_AXIS) {
            a = c * -1;
            c = 0
        }
        u = c === 0 ? a : c;
        if ("deltaY" in n) {
            c = n.deltaY * -1;
            u = c
        }
        if ("deltaX" in n) {
            a = n.deltaX;
            if (c === 0) {
                u = a * -1
            }
        }
        if (c === 0 && a === 0) {
            return
        }
        if (n.deltaMode === 1) {
            var p = e.data(this, "mousewheel-line-height");
            u *= p;
            c *= p;
            a *= p
        } else if (n.deltaMode === 2) {
            var d = e.data(this, "mousewheel-page-height");
            u *= d;
            c *= d;
            a *= d
        }
        h = Math.max(Math.abs(c), Math.abs(a));
        if (!s || h < s) {
            s = h;
            if (l(n, h)) {
                s /= 40
            }
        }
        if (l(n, h)) {
            u /= 40;
            a /= 40;
            c /= 40
        }
        u = Math[u >= 1 ? "floor" : "ceil"](u / s);
        a = Math[a >= 1 ? "floor" : "ceil"](a / s);
        c = Math[c >= 1 ? "floor" : "ceil"](c / s);
        t.deltaX = a;
        t.deltaY = c;
        t.deltaFactor = s;
        t.deltaMode = 0;
        o.unshift(t, u, a, c);
        if (i) {
            clearTimeout(i)
        }
        i = setTimeout(f, 200);
        return (e.event.dispatch || e.event.handle).apply(this, o)
    }

    function f() {
        s = null
    }

    function l(e, t) {
        return u.settings.adjustOldDeltas && e.type === "mousewheel" && t % 120 === 0
    }
    var t = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        n = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        r = Array.prototype.slice,
        i, s;
    if (e.event.fixHooks) {
        for (var o = t.length; o;) {
            e.event.fixHooks[t[--o]] = e.event.mouseHooks
        }
    }
    var u = e.event.special.mousewheel = {
        version: "3.1.9",
        setup: function () {
            if (this.addEventListener) {
                for (var t = n.length; t;) {
                    this.addEventListener(n[--t], a, false)
                }
            } else {
                this.onmousewheel = a
            }
            e.data(this, "mousewheel-line-height", u.getLineHeight(this));
            e.data(this, "mousewheel-page-height", u.getPageHeight(this))
        },
        teardown: function () {
            if (this.removeEventListener) {
                for (var e = n.length; e;) {
                    this.removeEventListener(n[--e], a, false)
                }
            } else {
                this.onmousewheel = null
            }
        },
        getLineHeight: function (t) {
            return parseInt(e(t)["offsetParent" in e.fn ? "offsetParent" : "parent"]().css("fontSize"), 10)
        },
        getPageHeight: function (t) {
            return e(t).height()
        },
        settings: {
            adjustOldDeltas: true
        }
    };
    e.fn.extend({
        mousewheel: function (e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        },
        unmousewheel: function (e) {
            return this.unbind("mousewheel", e)
        }
    })
});

// Scroll start / scroll end
(function (e) {
    var t = (new Date).getTime(),
        n = e.event.special,
        r = e.event.handle || e.event.dispatch,
        i = "scroll",
        s = i + "start",
        o = i + "end",
        u = i + "." + s + t,
        a = i + "." + o + t;
    n.scrollstart = {
        setup: function () {
            var t, i = function (e) {
                if (t == null) {
                    e.type = s;
                    r.apply(this, arguments)
                } else {
                    clearTimeout(t)
                }
                t = setTimeout(function () {
                    t = null
                }, n.scrollend.delay)
            };
            e(this).bind(u, i)
        },
        teardown: function () {
            e(this).unbind(u)
        }
    };
    n.scrollend = {
        delay: 300,
        setup: function () {
            var t, i = function (e) {
                var i = this,
                    s = arguments;
                clearTimeout(t);
                t = setTimeout(function () {
                    e.type = o;
                    r.apply(i, s)
                }, n.scrollend.delay)
            };
            e(this).bind(a, i)
        },
        teardown: function () {
            e(this).unbind(a)
        }
    };
    e.isScrolled = false;
    e(window).bind(s + " " + o, function (t) {
        e.isScrolled = t.type == s;
        e("body")[e.isScrolled ? "addClass" : "removeClass"]("is-scrolled")
    })
})(jQuery);

/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function (b, c) {
    var $ = b.jQuery || b.Cowboy || (b.Cowboy = {}),
        a;
    $.throttle = a = function (e, f, j, i) {
        var h, d = 0;
        if (typeof f !== "boolean") {
            i = j;
            j = f;
            f = c
        }

        function g() {
            var o = this,
                m = +new Date() - d,
                n = arguments;

            function l() {
                d = +new Date();
                j.apply(o, n)
            }

            function k() {
                h = c
            }
            if (i && !h) {
                l()
            }
            h && clearTimeout(h);
            if (i === c && m > e) {
                l()
            } else {
                if (f !== true) {
                    h = setTimeout(i ? k : l, i === c ? e - m : e)
                }
            }
        }
        if ($.guid) {
            g.guid = j.guid = j.guid || $.guid++
        }
        return g
    };
    $.debounce = function (d, e, f) {
        return f === c ? a(d, e, false) : a(d, f, e !== false)
    }
})(this);

/* jQuery Transit */
(function (t, e) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], e)
    } else if (typeof exports === "object") {
        module.exports = e(require("jquery"))
    } else {
        e(t.jQuery)
    }
})(this, function (t) {
    t.transit = {
        version: "0.9.12",
        propertyMap: {
            marginLeft: "margin",
            marginRight: "margin",
            marginBottom: "margin",
            marginTop: "margin",
            paddingLeft: "padding",
            paddingRight: "padding",
            paddingBottom: "padding",
            paddingTop: "padding"
        },
        enabled: true,
        useTransitionEnd: false
    };
    var e = document.createElement("div");
    var n = {};

    function i(t) {
        if (t in e.style) return t;
        var n = ["Moz", "Webkit", "O", "ms"];
        var i = t.charAt(0).toUpperCase() + t.substr(1);
        for (var r = 0; r < n.length; ++r) {
            var s = n[r] + i;
            if (s in e.style) {
                return s
            }
        }
    }

    function r() {
        e.style[n.transform] = "";
        e.style[n.transform] = "rotateY(90deg)";
        return e.style[n.transform] !== ""
    }
    var s = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
    n.transition = i("transition");
    n.transitionDelay = i("transitionDelay");
    n.transform = i("transform");
    n.transformOrigin = i("transformOrigin");
    n.filter = i("Filter");
    n.transform3d = Modernizr.csstransforms3d;
    var a = {
        transition: "transitionend",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        WebkitTransition: "webkitTransitionEnd",
        msTransition: "MSTransitionEnd"
    };
    var o = n.transitionEnd = a[n.transition] || null;
    for (var u in n) {
        if (n.hasOwnProperty(u) && typeof t.support[u] === "undefined") {
            t.support[u] = n[u]
        }
    }
    e = null;
    t.cssEase = {
        _default: "ease",
        "in": "ease-in",
        out: "ease-out",
        "in-out": "ease-in-out",
        snap: "cubic-bezier(0,1,.5,1)",
        easeInCubic: "cubic-bezier(.550,.055,.675,.190)",
        easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
        easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
        easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
        easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
        easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
        easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
        easeOutExpo: "cubic-bezier(.19,1,.22,1)",
        easeInOutExpo: "cubic-bezier(1,0,0,1)",
        easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
        easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
        easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
        easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
        easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
        easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
        easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
        easeOutQuint: "cubic-bezier(.23,1,.32,1)",
        easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
        easeInSine: "cubic-bezier(.47,0,.745,.715)",
        easeOutSine: "cubic-bezier(.39,.575,.565,1)",
        easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
        easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
        easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
        easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
    };
    t.cssHooks["transit:transform"] = {
        get: function (e) {
            return t(e).data("transform") || new f
        },
        set: function (e, i) {
            var r = i;
            if (!(r instanceof f)) {
                r = new f(r)
            }
            if (n.transform && n.transform3d) {
                e.style[n.transform] = r.toString(true)
            } else {
                e.style[n.transform] = r.toString()
            }
            t(e).data("transform", r)
        }
    };
    t.cssHooks.transform = {
        set: t.cssHooks["transit:transform"].set
    };
    t.cssHooks.filter = {
        get: function (t) {
            return t.style[n.filter]
        },
        set: function (t, e) {
            t.style[n.filter] = e
        }
    };
    if (t.fn.jquery < "1.8") {
        t.cssHooks.transformOrigin = {
            get: function (t) {
                return t.style[n.transformOrigin]
            },
            set: function (t, e) {
                t.style[n.transformOrigin] = e
            }
        };
        t.cssHooks.transition = {
            get: function (t) {
                return t.style[n.transition]
            },
            set: function (t, e) {
                t.style[n.transition] = e
            }
        }
    }
    p("scale");
    p("scaleX");
    p("scaleY");
    p("translate");
    p("rotate");
    p("rotateX");
    p("rotateY");
    p("rotate3d");
    p("perspective");
    p("skewX");
    p("skewY");
    p("x", true);
    p("y", true);

    function f(t) {
        if (typeof t === "string") {
            this.parse(t)
        }
        return this
    }
    f.prototype = {
        setFromString: function (t, e) {
            var n = typeof e === "string" ? e.split(",") : e.constructor === Array ? e : [e];
            n.unshift(t);
            f.prototype.set.apply(this, n)
        },
        set: function (t) {
            var e = Array.prototype.slice.apply(arguments, [1]);
            if (this.setter[t]) {
                this.setter[t].apply(this, e)
            } else {
                this[t] = e.join(",")
            }
        },
        get: function (t) {
            if (this.getter[t]) {
                return this.getter[t].apply(this)
            } else {
                return this[t] || 0
            }
        },
        setter: {
            rotate: function (t) {
                this.rotate = b(t, "deg")
            },
            rotateX: function (t) {
                this.rotateX = b(t, "deg")
            },
            rotateY: function (t) {
                this.rotateY = b(t, "deg")
            },
            scale: function (t, e) {
                if (e === undefined) {
                    e = t
                }
                this.scale = t + "," + e
            },
            skewX: function (t) {
                this.skewX = b(t, "deg")
            },
            skewY: function (t) {
                this.skewY = b(t, "deg")
            },
            perspective: function (t) {
                this.perspective = b(t, "px")
            },
            x: function (t) {
                this.set("translate", t, null)
            },
            y: function (t) {
                this.set("translate", null, t)
            },
            translate: function (t, e) {
                if (this._translateX === undefined) {
                    this._translateX = 0
                }
                if (this._translateY === undefined) {
                    this._translateY = 0
                }
                if (t !== null && t !== undefined) {
                    this._translateX = b(t, "px")
                }
                if (e !== null && e !== undefined) {
                    this._translateY = b(e, "px")
                }
                this.translate = this._translateX + "," + this._translateY
            }
        },
        getter: {
            x: function () {
                return this._translateX || 0
            },
            y: function () {
                return this._translateY || 0
            },
            scale: function () {
                var t = (this.scale || "1,1").split(",");
                if (t[0]) {
                    t[0] = parseFloat(t[0])
                }
                if (t[1]) {
                    t[1] = parseFloat(t[1])
                }
                return t[0] === t[1] ? t[0] : t
            },
            rotate3d: function () {
                var t = (this.rotate3d || "0,0,0,0deg").split(",");
                for (var e = 0; e <= 3; ++e) {
                    if (t[e]) {
                        t[e] = parseFloat(t[e])
                    }
                }
                if (t[3]) {
                    t[3] = b(t[3], "deg")
                }
                return t
            }
        },
        parse: function (t) {
            var e = this;
            t.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function (t, n, i) {
                e.setFromString(n, i)
            })
        },
        toString: function (t) {
            var e = [];
            for (var i in this) {
                if (this.hasOwnProperty(i)) {
                    if (!n.transform3d && (i === "rotateX" || i === "rotateY" || i === "perspective" || i === "transformOrigin")) {
                        continue
                    }
                    if (i[0] !== "_") {
                        if (t && i === "scale") {
                            e.push(i + "3d(" + this[i] + ",1)")
                        } else if (t && i === "translate") {
                            e.push(i + "3d(" + this[i] + ",0)")
                        } else {
                            e.push(i + "(" + this[i] + ")")
                        }
                    }
                }
            }
            return e.join(" ")
        }
    };

    function c(t, e, n) {
        if (e === true) {
            t.queue(n)
        } else if (e) {
            t.queue(e, n)
        } else {
            t.each(function () {
                n.call(this)
            })
        }
    }

    function l(e) {
        var i = [];
        t.each(e, function (e) {
            e = t.camelCase(e);
            e = t.transit.propertyMap[e] || t.cssProps[e] || e;
            e = h(e);
            if (n[e]) e = h(n[e]);
            if (t.inArray(e, i) === -1) {
                i.push(e)
            }
        });
        return i
    }

    function d(e, n, i, r) {
        var s = l(e);
        if (t.cssEase[i]) {
            i = t.cssEase[i]
        }
        var a = "" + y(n) + " " + i;
        if (parseInt(r, 10) > 0) {
            a += " " + y(r)
        }
        var o = [];
        t.each(s, function (t, e) {
            o.push(e + " " + a)
        });
        return o.join(", ")
    }
    t.fn.transition = t.fn.transit = function (e, i, r, s) {
        var a = this;
        var u = 0;
        var f = true;
        var l = t.extend(true, {}, e);
        if (typeof i === "function") {
            s = i;
            i = undefined
        }
        if (typeof i === "object") {
            r = i.easing;
            u = i.delay || 0;
            f = typeof i.queue === "undefined" ? true : i.queue;
            s = i.complete;
            i = i.duration
        }
        if (typeof r === "function") {
            s = r;
            r = undefined
        }
        if (typeof l.easing !== "undefined") {
            r = l.easing;
            delete l.easing
        }
        if (typeof l.duration !== "undefined") {
            i = l.duration;
            delete l.duration
        }
        if (typeof l.complete !== "undefined") {
            s = l.complete;
            delete l.complete
        }
        if (typeof l.queue !== "undefined") {
            f = l.queue;
            delete l.queue
        }
        if (typeof l.delay !== "undefined") {
            u = l.delay;
            delete l.delay
        }
        if (typeof i === "undefined") {
            i = t.fx.speeds._default
        }
        if (typeof r === "undefined") {
            r = t.cssEase._default
        }
        i = y(i);
        var p = d(l, i, r, u);
        var h = t.transit.enabled && n.transition;
        var b = h ? parseInt(i, 10) + parseInt(u, 10) : 0;
        if (b === 0) {
            var g = function (t) {
                a.css(l);
                if (s) {
                    s.apply(a)
                }
                if (t) {
                    t()
                }
            };
            c(a, f, g);
            return a
        }
        var m = {};
        var v = function (e) {
            var i = false;
            var r = function () {
                if (i) {
                    a.unbind(o, r)
                }
                if (b > 0) {
                    a.each(function () {
                        this.style[n.transition] = m[this] || null
                    })
                }
                if (typeof s === "function") {
                    s.apply(a)
                }
                if (typeof e === "function") {
                    e()
                }
            };
            if (b > 0 && o && t.transit.useTransitionEnd) {
                i = true;
                a.bind(o, r)
            } else {
                window.setTimeout(r, b)
            }
            a.each(function () {
                if (b > 0) {
                    this.style[n.transition] = p
                }
                t(this).css(l)
            })
        };
        var z = function (t) {
            this.offsetWidth;
            v(t)
        };
        c(a, f, z);
        return this
    };

    function p(e, i) {
        if (!i) {
            t.cssNumber[e] = true
        }
        t.transit.propertyMap[e] = n.transform;
        t.cssHooks[e] = {
            get: function (n) {
                var i = t(n).css("transit:transform");
                return i.get(e)
            },
            set: function (n, i) {
                var r = t(n).css("transit:transform");
                r.setFromString(e, i);
                t(n).css({
                    "transit:transform": r
                })
            }
        }
    }

    function h(t) {
        return t.replace(/([A-Z])/g, function (t) {
            return "-" + t.toLowerCase()
        })
    }

    function b(t, e) {
        if (typeof t === "string" && !t.match(/^[\-0-9\.]+$/)) {
            return t
        } else {
            return "" + t + e
        }
    }

    function y(e) {
        var n = e;
        if (typeof n === "string" && !n.match(/^[\-0-9\.]+/)) {
            n = t.fx.speeds[n] || t.fx.speeds._default
        }
        return b(n, "ms")
    }
    t.transit.getTransitionValue = d;
    return t
});

/* History.js */
typeof JSON != "object" && (JSON = {}),
    function () {
        "use strict";

        function f(e) {
            return e < 10 ? "0" + e : e
        }

        function quote(e) {
            return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
                var t = meta[e];
                return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
        }

        function str(e, t) {
            var n, r, i, s, o = gap,
                u, a = t[e];
            a && typeof a == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)), typeof rep == "function" && (a = rep.call(t, e, a));
            switch (typeof a) {
                case "string":
                    return quote(a);
                case "number":
                    return isFinite(a) ? String(a) : "null";
                case "boolean":
                case "null":
                    return String(a);
                case "object":
                    if (!a) return "null";
                    gap += indent, u = [];
                    if (Object.prototype.toString.apply(a) === "[object Array]") {
                        s = a.length;
                        for (n = 0; n < s; n += 1) u[n] = str(n, a) || "null";
                        return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i
                    }
                    if (rep && typeof rep == "object") {
                        s = rep.length;
                        for (n = 0; n < s; n += 1) typeof rep[n] == "string" && (r = rep[n], i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i))
                    } else
                        for (r in a) Object.prototype.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
                    return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i
            }
        }
        typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function (e) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (e) {
            return this.valueOf()
        });
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap, indent, meta = {
                "\b": "\\b",
                "	": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            rep;
        typeof JSON.stringify != "function" && (JSON.stringify = function (e, t, n) {
            var r;
            gap = "", indent = "";
            if (typeof n == "number")
                for (r = 0; r < n; r += 1) indent += " ";
            else typeof n == "string" && (indent = n);
            rep = t;
            if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number") return str("", {
                "": e
            });
            throw new Error("JSON.stringify")
        }), typeof JSON.parse != "function" && (JSON.parse = function (text, reviver) {
            function walk(e, t) {
                var n, r, i = e[t];
                if (i && typeof i == "object")
                    for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
                return reviver.call(e, t, i)
            }
            var j;
            text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
                return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }));
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({
                "": j
            }, "") : j;
            throw new SyntaxError("JSON.parse")
        })
    }(),
    function (e, t) {
        "use strict";
        var n = e.History = e.History || {},
            r = e.jQuery;
        if (typeof n.Adapter != "undefined") throw new Error("History.js Adapter has already been loaded...");
        n.Adapter = {
            bind: function (e, t, n) {
                r(e).bind(t, n)
            },
            trigger: function (e, t, n) {
                r(e).trigger(t, n)
            },
            extractEventData: function (e, n, r) {
                var i = n && n.originalEvent && n.originalEvent[e] || r && r[e] || t;
                return i
            },
            onDomLoad: function (e) {
                r(e)
            }
        }, typeof n.init != "undefined" && n.init()
    }(window),
    function (e, t) {
        "use strict";
        var n = e.document,
            r = e.setTimeout || r,
            i = e.clearTimeout || i,
            s = e.setInterval || s,
            o = e.History = e.History || {};
        if (typeof o.initHtml4 != "undefined") throw new Error("History.js HTML4 Support has already been loaded...");
        o.initHtml4 = function () {
            if (typeof o.initHtml4.initialized != "undefined") return !1;
            o.initHtml4.initialized = !0, o.enabled = !0, o.savedHashes = [], o.isLastHash = function (e) {
                var t = o.getHashByIndex(),
                    n;
                return n = e === t, n
            }, o.isHashEqual = function (e, t) {
                return e = encodeURIComponent(e).replace(/%25/g, "%"), t = encodeURIComponent(t).replace(/%25/g, "%"), e === t
            }, o.saveHash = function (e) {
                return o.isLastHash(e) ? !1 : (o.savedHashes.push(e), !0)
            }, o.getHashByIndex = function (e) {
                var t = null;
                return typeof e == "undefined" ? t = o.savedHashes[o.savedHashes.length - 1] : e < 0 ? t = o.savedHashes[o.savedHashes.length + e] : t = o.savedHashes[e], t
            }, o.discardedHashes = {}, o.discardedStates = {}, o.discardState = function (e, t, n) {
                var r = o.getHashByState(e),
                    i;
                return i = {
                    discardedState: e,
                    backState: n,
                    forwardState: t
                }, o.discardedStates[r] = i, !0
            }, o.discardHash = function (e, t, n) {
                var r = {
                    discardedHash: e,
                    backState: n,
                    forwardState: t
                };
                return o.discardedHashes[e] = r, !0
            }, o.discardedState = function (e) {
                var t = o.getHashByState(e),
                    n;
                return n = o.discardedStates[t] || !1, n
            }, o.discardedHash = function (e) {
                var t = o.discardedHashes[e] || !1;
                return t
            }, o.recycleState = function (e) {
                var t = o.getHashByState(e);
                return o.discardedState(e) && delete o.discardedStates[t], !0
            }, o.emulated.hashChange && (o.hashChangeInit = function () {
                o.checkerFunction = null;
                var t = "",
                    r, i, u, a, f = Boolean(o.getHash());
                return o.isInternetExplorer() ? (r = "historyjs-iframe", i = n.createElement("iframe"), i.setAttribute("id", r), i.setAttribute("src", "#"), i.style.display = "none", n.body.appendChild(i), i.contentWindow.document.open(), i.contentWindow.document.close(), u = "", a = !1, o.checkerFunction = function () {
                    if (a) return !1;
                    a = !0;
                    var n = o.getHash(),
                        r = o.getHash(i.contentWindow.document.location);
                    return n !== t ? (t = n, r !== n && (u = r = n, i.contentWindow.document.open(), i.contentWindow.document.close(), i.contentWindow.document.location.hash = o.escapeHash(n)), o.Adapter.trigger(e, "hashchange")) : r !== u && (u = r, f && r === "" ? o.back() : o.setHash(r, !1)), a = !1, !0
                }) : o.checkerFunction = function () {
                    var n = o.getHash() || "";
                    return n !== t && (t = n, o.Adapter.trigger(e, "hashchange")), !0
                }, o.intervalList.push(s(o.checkerFunction, o.options.hashChangeInterval)), !0
            }, o.Adapter.onDomLoad(o.hashChangeInit)), o.emulated.pushState && (o.onHashChange = function (t) {
                var n = t && t.newURL || o.getLocationHref(),
                    r = o.getHashByUrl(n),
                    i = null,
                    s = null,
                    u = null,
                    a;
                return o.isLastHash(r) ? (o.busy(!1), !1) : (o.doubleCheckComplete(), o.saveHash(r), r && o.isTraditionalAnchor(r) ? (o.Adapter.trigger(e, "anchorchange"), o.busy(!1), !1) : (i = o.extractState(o.getFullUrl(r || o.getLocationHref()), !0), o.isLastSavedState(i) ? (o.busy(!1), !1) : (s = o.getHashByState(i), a = o.discardedState(i), a ? (o.getHashByIndex(-2) === o.getHashByState(a.forwardState) ? o.back(!1) : o.forward(!1), !1) : (o.pushState(i.data, i.title, encodeURI(i.url), !1), !0))))
            }, o.Adapter.bind(e, "hashchange", o.onHashChange), o.pushState = function (t, n, r, i) {
                r = encodeURI(r).replace(/%25/g, "%");
                if (o.getHashByUrl(r)) throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
                if (i !== !1 && o.busy()) return o.pushQueue({
                    scope: o,
                    callback: o.pushState,
                    args: arguments,
                    queue: i
                }), !1;
                o.busy(!0);
                var s = o.createStateObject(t, n, r),
                    u = o.getHashByState(s),
                    a = o.getState(!1),
                    f = o.getHashByState(a),
                    l = o.getHash(),
                    c = o.expectedStateId == s.id;
                return o.storeState(s), o.expectedStateId = s.id, o.recycleState(s), o.setTitle(s), u === f ? (o.busy(!1), !1) : (o.saveState(s), c || o.Adapter.trigger(e, "statechange"), !o.isHashEqual(u, l) && !o.isHashEqual(u, o.getShortUrl(o.getLocationHref())) && o.setHash(u, !1), o.busy(!1), !0)
            }, o.replaceState = function (t, n, r, i) {
                r = encodeURI(r).replace(/%25/g, "%");
                if (o.getHashByUrl(r)) throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
                if (i !== !1 && o.busy()) return o.pushQueue({
                    scope: o,
                    callback: o.replaceState,
                    args: arguments,
                    queue: i
                }), !1;
                o.busy(!0);
                var s = o.createStateObject(t, n, r),
                    u = o.getHashByState(s),
                    a = o.getState(!1),
                    f = o.getHashByState(a),
                    l = o.getStateByIndex(-2);
                return o.discardState(a, s, l), u === f ? (o.storeState(s), o.expectedStateId = s.id, o.recycleState(s), o.setTitle(s), o.saveState(s), o.Adapter.trigger(e, "statechange"), o.busy(!1)) : o.pushState(s.data, s.title, s.url, !1), !0
            }), o.emulated.pushState && o.getHash() && !o.emulated.hashChange && o.Adapter.onDomLoad(function () {
                o.Adapter.trigger(e, "hashchange")
            })
        }, typeof o.init != "undefined" && o.init()
    }(window),
    function (e, t) {
        "use strict";
        var n = e.console || t,
            r = e.document,
            i = e.navigator,
            s = e.sessionStorage || !1,
            o = e.setTimeout,
            u = e.clearTimeout,
            a = e.setInterval,
            f = e.clearInterval,
            l = e.JSON,
            c = e.alert,
            h = e.History = e.History || {},
            p = e.history;
        try {
            s.setItem("TEST", "1"), s.removeItem("TEST")
        } catch (d) {
            s = !1
        }
        l.stringify = l.stringify || l.encode, l.parse = l.parse || l.decode;
        if (typeof h.init != "undefined") throw new Error("History.js Core has already been loaded...");
        h.init = function (e) {
            return typeof h.Adapter == "undefined" ? !1 : (typeof h.initCore != "undefined" && h.initCore(), typeof h.initHtml4 != "undefined" && h.initHtml4(), !0)
        }, h.initCore = function (d) {
            if (typeof h.initCore.initialized != "undefined") return !1;
            h.initCore.initialized = !0, h.options = h.options || {}, h.options.hashChangeInterval = h.options.hashChangeInterval || 100, h.options.safariPollInterval = h.options.safariPollInterval || 500, h.options.doubleCheckInterval = h.options.doubleCheckInterval || 500, h.options.disableSuid = h.options.disableSuid || !1, h.options.storeInterval = h.options.storeInterval || 1e3, h.options.busyDelay = h.options.busyDelay || 250, h.options.debug = h.options.debug || !1, h.options.initialTitle = h.options.initialTitle || r.title, h.options.html4Mode = h.options.html4Mode || !1, h.options.delayInit = h.options.delayInit || !1, h.intervalList = [], h.clearAllIntervals = function () {
                var e, t = h.intervalList;
                if (typeof t != "undefined" && t !== null) {
                    for (e = 0; e < t.length; e++) f(t[e]);
                    h.intervalList = null
                }
            }, h.debug = function () {
                (h.options.debug || !1) && h.log.apply(h, arguments)
            }, h.log = function () {
                var e = typeof n != "undefined" && typeof n.log != "undefined" && typeof n.log.apply != "undefined",
                    t = r.getElementById("log"),
                    i, s, o, u, a;
                e ? (u = Array.prototype.slice.call(arguments), i = u.shift(), typeof n.debug != "undefined" ? n.debug.apply(n, [i, u]) : n.log.apply(n, [i, u])) : i = "\n" + arguments[0] + "\n";
                for (s = 1, o = arguments.length; s < o; ++s) {
                    a = arguments[s];
                    if (typeof a == "object" && typeof l != "undefined") try {
                        a = l.stringify(a)
                    } catch (f) {}
                    i += "\n" + a + "\n"
                }
                return t ? (t.value += i + "\n-----\n", t.scrollTop = t.scrollHeight - t.clientHeight) : e || c(i), !0
            }, h.getInternetExplorerMajorVersion = function () {
                var e = h.getInternetExplorerMajorVersion.cached = typeof h.getInternetExplorerMajorVersion.cached != "undefined" ? h.getInternetExplorerMajorVersion.cached : function () {
                    var e = 3,
                        t = r.createElement("div"),
                        n = t.getElementsByTagName("i");
                    while ((t.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->") && n[0]);
                    return e > 4 ? e : !1
                }();
                return e
            }, h.isInternetExplorer = function () {
                var e = h.isInternetExplorer.cached = typeof h.isInternetExplorer.cached != "undefined" ? h.isInternetExplorer.cached : Boolean(h.getInternetExplorerMajorVersion());
                return e
            }, h.options.html4Mode ? h.emulated = {
                pushState: !0,
                hashChange: !0
            } : h.emulated = {
                pushState: !Boolean(e.history && e.history.pushState && e.history.replaceState && !/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(i.userAgent) && !/AppleWebKit\/5([0-2]|3[0-2])/i.test(i.userAgent)),
                hashChange: Boolean(!("onhashchange" in e || "onhashchange" in r) || h.isInternetExplorer() && h.getInternetExplorerMajorVersion() < 8)
            }, h.enabled = !h.emulated.pushState, h.bugs = {
                setHash: Boolean(!h.emulated.pushState && i.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),
                safariPoll: Boolean(!h.emulated.pushState && i.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),
                ieDoubleCheck: Boolean(h.isInternetExplorer() && h.getInternetExplorerMajorVersion() < 8),
                hashEscape: Boolean(h.isInternetExplorer() && h.getInternetExplorerMajorVersion() < 7)
            }, h.isEmptyObject = function (e) {
                for (var t in e)
                    if (e.hasOwnProperty(t)) return !1;
                return !0
            }, h.cloneObject = function (e) {
                var t, n;
                return e ? (t = l.stringify(e), n = l.parse(t)) : n = {}, n
            }, h.getRootUrl = function () {
                var e = r.location.protocol + "//" + (r.location.hostname || r.location.host);
                if (r.location.port || !1) e += ":" + r.location.port;
                return e += "/", e
            }, h.getBaseHref = function () {
                var e = r.getElementsByTagName("base"),
                    t = null,
                    n = "";
                return e.length === 1 && (t = e[0], n = t.href.replace(/[^\/]+$/, "")), n = n.replace(/\/+$/, ""), n && (n += "/"), n
            }, h.getBaseUrl = function () {
                var e = h.getBaseHref() || h.getBasePageUrl() || h.getRootUrl();
                return e
            }, h.getPageUrl = function () {
                var e = h.getState(!1, !1),
                    t = (e || {}).url || h.getLocationHref(),
                    n;
                return n = t.replace(/\/+$/, "").replace(/[^\/]+$/, function (e, t, n) {
                    return /\./.test(e) ? e : e + "/"
                }), n
            }, h.getBasePageUrl = function () {
                var e = h.getLocationHref().replace(/[#\?].*/, "").replace(/[^\/]+$/, function (e, t, n) {
                    return /[^\/]$/.test(e) ? "" : e
                }).replace(/\/+$/, "") + "/";
                return e
            }, h.getFullUrl = function (e, t) {
                var n = e,
                    r = e.substring(0, 1);
                return t = typeof t == "undefined" ? !0 : t, /[a-z]+\:\/\//.test(e) || (r === "/" ? n = h.getRootUrl() + e.replace(/^\/+/, "") : r === "#" ? n = h.getPageUrl().replace(/#.*/, "") + e : r === "?" ? n = h.getPageUrl().replace(/[\?#].*/, "") + e : t ? n = h.getBaseUrl() + e.replace(/^(\.\/)+/, "") : n = h.getBasePageUrl() + e.replace(/^(\.\/)+/, "")), n.replace(/\#$/, "")
            }, h.getShortUrl = function (e) {
                var t = e,
                    n = h.getBaseUrl(),
                    r = h.getRootUrl();
                return h.emulated.pushState && (t = t.replace(n, "")), t = t.replace(r, "/"), h.isTraditionalAnchor(t) && (t = "./" + t), t = t.replace(/^(\.\/)+/g, "./").replace(/\#$/, ""), t
            }, h.getLocationHref = function (e) {
                return e = e || r, e.URL === e.location.href ? e.location.href : e.location.href === decodeURIComponent(e.URL) ? e.URL : e.location.hash && decodeURIComponent(e.location.href.replace(/^[^#]+/, "")) === e.location.hash ? e.location.href : e.URL.indexOf("#") == -1 && e.location.href.indexOf("#") != -1 ? e.location.href : e.URL || e.location.href
            }, h.store = {}, h.idToState = h.idToState || {}, h.stateToId = h.stateToId || {}, h.urlToId = h.urlToId || {}, h.storedStates = h.storedStates || [], h.savedStates = h.savedStates || [], h.normalizeStore = function () {
                h.store.idToState = h.store.idToState || {}, h.store.urlToId = h.store.urlToId || {}, h.store.stateToId = h.store.stateToId || {}
            }, h.getState = function (e, t) {
                typeof e == "undefined" && (e = !0), typeof t == "undefined" && (t = !0);
                var n = h.getLastSavedState();
                return !n && t && (n = h.createStateObject()), e && (n = h.cloneObject(n), n.url = n.cleanUrl || n.url), n
            }, h.getIdByState = function (e) {
                var t = h.extractId(e.url),
                    n;
                if (!t) {
                    n = h.getStateString(e);
                    if (typeof h.stateToId[n] != "undefined") t = h.stateToId[n];
                    else if (typeof h.store.stateToId[n] != "undefined") t = h.store.stateToId[n];
                    else {
                        for (;;) {
                            t = (new Date).getTime() + String(Math.random()).replace(/\D/g, "");
                            if (typeof h.idToState[t] == "undefined" && typeof h.store.idToState[t] == "undefined") break
                        }
                        h.stateToId[n] = t, h.idToState[t] = e
                    }
                }
                return t
            }, h.normalizeState = function (e) {
                var t, n;
                if (!e || typeof e != "object") e = {};
                if (typeof e.normalized != "undefined") return e;
                if (!e.data || typeof e.data != "object") e.data = {};
                return t = {}, t.normalized = !0, t.title = e.title || "", t.url = h.getFullUrl(e.url ? e.url : h.getLocationHref()), t.hash = h.getShortUrl(t.url), t.data = h.cloneObject(e.data), t.id = h.getIdByState(t), t.cleanUrl = t.url.replace(/\??\&_suid.*/, ""), t.url = t.cleanUrl, n = !h.isEmptyObject(t.data), (t.title || n) && h.options.disableSuid !== !0 && (t.hash = h.getShortUrl(t.url).replace(/\??\&_suid.*/, ""), /\?/.test(t.hash) || (t.hash += "?"), t.hash += "&_suid=" + t.id), t.hashedUrl = h.getFullUrl(t.hash), (h.emulated.pushState || h.bugs.safariPoll) && h.hasUrlDuplicate(t) && (t.url = t.hashedUrl), t
            }, h.createStateObject = function (e, t, n) {
                var r = {
                    data: e,
                    title: t,
                    url: n
                };
                return r = h.normalizeState(r), r
            }, h.getStateById = function (e) {
                e = String(e);
                var n = h.idToState[e] || h.store.idToState[e] || t;
                return n
            }, h.getStateString = function (e) {
                var t, n, r;
                return t = h.normalizeState(e), n = {
                    data: t.data,
                    title: e.title,
                    url: e.url
                }, r = l.stringify(n), r
            }, h.getStateId = function (e) {
                var t, n;
                return t = h.normalizeState(e), n = t.id, n
            }, h.getHashByState = function (e) {
                var t, n;
                return t = h.normalizeState(e), n = t.hash, n
            }, h.extractId = function (e) {
                var t, n, r, i;
                return e.indexOf("#") != -1 ? i = e.split("#")[0] : i = e, n = /(.*)\&_suid=([0-9]+)$/.exec(i), r = n ? n[1] || e : e, t = n ? String(n[2] || "") : "", t || !1
            }, h.isTraditionalAnchor = function (e) {
                var t = !/[\/\?\.]/.test(e);
                return t
            }, h.extractState = function (e, t) {
                var n = null,
                    r, i;
                return t = t || !1, r = h.extractId(e), r && (n = h.getStateById(r)), n || (i = h.getFullUrl(e), r = h.getIdByUrl(i) || !1, r && (n = h.getStateById(r)), !n && t && !h.isTraditionalAnchor(e) && (n = h.createStateObject(null, null, i))), n
            }, h.getIdByUrl = function (e) {
                var n = h.urlToId[e] || h.store.urlToId[e] || t;
                return n
            }, h.getLastSavedState = function () {
                return h.savedStates[h.savedStates.length - 1] || t
            }, h.getLastStoredState = function () {
                return h.storedStates[h.storedStates.length - 1] || t
            }, h.hasUrlDuplicate = function (e) {
                var t = !1,
                    n;
                return n = h.extractState(e.url), t = n && n.id !== e.id, t
            }, h.storeState = function (e) {
                return h.urlToId[e.url] = e.id, h.storedStates.push(h.cloneObject(e)), e
            }, h.isLastSavedState = function (e) {
                var t = !1,
                    n, r, i;
                return h.savedStates.length && (n = e.id, r = h.getLastSavedState(), i = r.id, t = n === i), t
            }, h.saveState = function (e) {
                return h.isLastSavedState(e) ? !1 : (h.savedStates.push(h.cloneObject(e)), !0)
            }, h.getStateByIndex = function (e) {
                var t = null;
                return typeof e == "undefined" ? t = h.savedStates[h.savedStates.length - 1] : e < 0 ? t = h.savedStates[h.savedStates.length + e] : t = h.savedStates[e], t
            }, h.getCurrentIndex = function () {
                var e = null;
                return h.savedStates.length < 1 ? e = 0 : e = h.savedStates.length - 1, e
            }, h.getHash = function (e) {
                var t = h.getLocationHref(e),
                    n;
                return n = h.getHashByUrl(t), n
            }, h.unescapeHash = function (e) {
                var t = h.normalizeHash(e);
                return t = decodeURIComponent(t), t
            }, h.normalizeHash = function (e) {
                var t = e.replace(/[^#]*#/, "").replace(/#.*/, "");
                return t
            }, h.setHash = function (e, t) {
                var n, i;
                return t !== !1 && h.busy() ? (h.pushQueue({
                    scope: h,
                    callback: h.setHash,
                    args: arguments,
                    queue: t
                }), !1) : (h.busy(!0), n = h.extractState(e, !0), n && !h.emulated.pushState ? h.pushState(n.data, n.title, n.url, !1) : h.getHash() !== e && (h.bugs.setHash ? (i = h.getPageUrl(), h.pushState(null, null, i + "#" + e, !1)) : r.location.hash = e), h)
            }, h.escapeHash = function (t) {
                var n = h.normalizeHash(t);
                return n = e.encodeURIComponent(n), h.bugs.hashEscape || (n = n.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")), n
            }, h.getHashByUrl = function (e) {
                var t = String(e).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
                return t = h.unescapeHash(t), t
            }, h.setTitle = function (e) {
                var t = e.title,
                    n;
                t || (n = h.getStateByIndex(0), n && n.url === e.url && (t = n.title || h.options.initialTitle));
                try {
                    r.getElementsByTagName("title")[0].innerHTML = t.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
                } catch (i) {}
                return r.title = t, h
            }, h.queues = [], h.busy = function (e) {
                typeof e != "undefined" ? h.busy.flag = e : typeof h.busy.flag == "undefined" && (h.busy.flag = !1);
                if (!h.busy.flag) {
                    u(h.busy.timeout);
                    var t = function () {
                        var e, n, r;
                        if (h.busy.flag) return;
                        for (e = h.queues.length - 1; e >= 0; --e) {
                            n = h.queues[e];
                            if (n.length === 0) continue;
                            r = n.shift(), h.fireQueueItem(r), h.busy.timeout = o(t, h.options.busyDelay)
                        }
                    };
                    h.busy.timeout = o(t, h.options.busyDelay)
                }
                return h.busy.flag
            }, h.busy.flag = !1, h.fireQueueItem = function (e) {
                return e.callback.apply(e.scope || h, e.args || [])
            }, h.pushQueue = function (e) {
                return h.queues[e.queue || 0] = h.queues[e.queue || 0] || [], h.queues[e.queue || 0].push(e), h
            }, h.queue = function (e, t) {
                return typeof e == "function" && (e = {
                    callback: e
                }), typeof t != "undefined" && (e.queue = t), h.busy() ? h.pushQueue(e) : h.fireQueueItem(e), h
            }, h.clearQueue = function () {
                return h.busy.flag = !1, h.queues = [], h
            }, h.stateChanged = !1, h.doubleChecker = !1, h.doubleCheckComplete = function () {
                return h.stateChanged = !0, h.doubleCheckClear(), h
            }, h.doubleCheckClear = function () {
                return h.doubleChecker && (u(h.doubleChecker), h.doubleChecker = !1), h
            }, h.doubleCheck = function (e) {
                return h.stateChanged = !1, h.doubleCheckClear(), h.bugs.ieDoubleCheck && (h.doubleChecker = o(function () {
                    return h.doubleCheckClear(), h.stateChanged || e(), !0
                }, h.options.doubleCheckInterval)), h
            }, h.safariStatePoll = function () {
                var t = h.extractState(h.getLocationHref()),
                    n;
                if (!h.isLastSavedState(t)) return n = t, n || (n = h.createStateObject()), h.Adapter.trigger(e, "popstate"), h;
                return
            }, h.back = function (e) {
                return e !== !1 && h.busy() ? (h.pushQueue({
                    scope: h,
                    callback: h.back,
                    args: arguments,
                    queue: e
                }), !1) : (h.busy(!0), h.doubleCheck(function () {
                    h.back(!1)
                }), p.go(-1), !0)
            }, h.forward = function (e) {
                return e !== !1 && h.busy() ? (h.pushQueue({
                    scope: h,
                    callback: h.forward,
                    args: arguments,
                    queue: e
                }), !1) : (h.busy(!0), h.doubleCheck(function () {
                    h.forward(!1)
                }), p.go(1), !0)
            }, h.go = function (e, t) {
                var n;
                if (e > 0)
                    for (n = 1; n <= e; ++n) h.forward(t);
                else {
                    if (!(e < 0)) throw new Error("History.go: History.go requires a positive or negative integer passed.");
                    for (n = -1; n >= e; --n) h.back(t)
                }
                return h
            };
            if (h.emulated.pushState) {
                var v = function () {};
                h.pushState = h.pushState || v, h.replaceState = h.replaceState || v
            } else h.onPopState = function (t, n) {
                var r = !1,
                    i = !1,
                    s, o;
                return h.doubleCheckComplete(), s = h.getHash(), s ? (o = h.extractState(s || h.getLocationHref(), !0), o ? h.replaceState(o.data, o.title, o.url, !1) : (h.Adapter.trigger(e, "anchorchange"), h.busy(!1)), h.expectedStateId = !1, !1) : (r = h.Adapter.extractEventData("state", t, n) || !1, r ? i = h.getStateById(r) : h.expectedStateId ? i = h.getStateById(h.expectedStateId) : i = h.extractState(h.getLocationHref()), i || (i = h.createStateObject(null, null, h.getLocationHref())), h.expectedStateId = !1, h.isLastSavedState(i) ? (h.busy(!1), !1) : (h.storeState(i), h.saveState(i), h.setTitle(i), h.Adapter.trigger(e, "statechange"), h.busy(!1), !0))
            }, h.Adapter.bind(e, "popstate", h.onPopState), h.pushState = function (t, n, r, i) {
                if (h.getHashByUrl(r) && h.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (i !== !1 && h.busy()) return h.pushQueue({
                    scope: h,
                    callback: h.pushState,
                    args: arguments,
                    queue: i
                }), !1;
                h.busy(!0);
                var s = h.createStateObject(t, n, r);
                return h.isLastSavedState(s) ? h.busy(!1) : (h.storeState(s), h.expectedStateId = s.id, p.pushState(s.id, s.title, s.url), h.Adapter.trigger(e, "popstate")), !0
            }, h.replaceState = function (t, n, r, i) {
                if (h.getHashByUrl(r) && h.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (i !== !1 && h.busy()) return h.pushQueue({
                    scope: h,
                    callback: h.replaceState,
                    args: arguments,
                    queue: i
                }), !1;
                h.busy(!0);
                var s = h.createStateObject(t, n, r);
                return h.isLastSavedState(s) ? h.busy(!1) : (h.storeState(s), h.expectedStateId = s.id, p.replaceState(s.id, s.title, s.url), h.Adapter.trigger(e, "popstate")), !0
            };
            if (s) {
                try {
                    h.store = l.parse(s.getItem("History.store")) || {}
                } catch (m) {
                    h.store = {}
                }
                h.normalizeStore()
            } else h.store = {}, h.normalizeStore();
            h.Adapter.bind(e, "unload", h.clearAllIntervals), h.saveState(h.storeState(h.extractState(h.getLocationHref(), !0))), s && (h.onUnload = function () {
                var e, t, n;
                try {
                    e = l.parse(s.getItem("History.store")) || {}
                } catch (r) {
                    e = {}
                }
                e.idToState = e.idToState || {}, e.urlToId = e.urlToId || {}, e.stateToId = e.stateToId || {};
                for (t in h.idToState) {
                    if (!h.idToState.hasOwnProperty(t)) continue;
                    e.idToState[t] = h.idToState[t]
                }
                for (t in h.urlToId) {
                    if (!h.urlToId.hasOwnProperty(t)) continue;
                    e.urlToId[t] = h.urlToId[t]
                }
                for (t in h.stateToId) {
                    if (!h.stateToId.hasOwnProperty(t)) continue;
                    e.stateToId[t] = h.stateToId[t]
                }
                h.store = e, h.normalizeStore(), n = l.stringify(e);
                try {
                    s.setItem("History.store", n)
                } catch (i) {
                    if (i.code !== DOMException.QUOTA_EXCEEDED_ERR) throw i;
                    s.length && (s.removeItem("History.store"), s.setItem("History.store", n))
                }
            }, h.intervalList.push(a(h.onUnload, h.options.storeInterval)), h.Adapter.bind(e, "beforeunload", h.onUnload), h.Adapter.bind(e, "unload", h.onUnload));
            if (!h.emulated.pushState) {
                h.bugs.safariPoll && h.intervalList.push(a(h.safariStatePoll, h.options.safariPollInterval));
                if (i.vendor === "Apple Computer, Inc." || (i.appCodeName || "") === "Mozilla") h.Adapter.bind(e, "hashchange", function () {
                    h.Adapter.trigger(e, "popstate")
                }), h.getHash() && h.Adapter.onDomLoad(function () {
                    h.Adapter.trigger(e, "hashchange")
                })
            }
        }, (!h.options || !h.options.delayInit) && h.init()
    }(window);
