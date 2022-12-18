(function() {
    ! function(a) {
        var b, c, d, e, f, g, h, i, j, k;
        return b = function(a, b) {
            return this.$element = a, this.$slides = this.$element.find(".shrewd-slides ul li"), this.$slides.length < 1 && (this.$slides = this.$element.find('[data-group="slides"] ul li')), this.$prevNext = this.$element.find("[data-jump]"), this.$pages = this.$element.find("[data-jump-to]"), this.$slidesContainer = this.$element.find('[data-group="slides"]'), this.$rel = this.$element.find('[data-group="slides"] ul'), this.$rel.css("position", "relative"), this.slideChangeInProgress = !1, this.interval = !1, this.options = b, this.current = 2, this.slide = 1, this.set(2, !0), this.options.onInit.call(this), this.runAnimations(), null
        }, b.prototype = {
            getUniversalWidth: function() {
                return this.$element.width()
            },
            updateControls: function() {
                return this.$pages.removeClass("active"), this.$pages.filter("[data-jump-to=" + (this.current - 1) + "]").addClass("active")
            },
            runAnimations: function() {
                var b, c;
                return c = this, b = a(this.$slides[this.current - 1]).find("[data-animate]"), b.each(function() {
                    var b;
                    return b = a(this), c.options.animations[b.data("animate")](b, b.data("delay"), b.data("length"))
                })
            },
            hideAnimatedCaptions: function(b) {
                return a(this.$slides[b - 1]).find("[data-animate]").css({
                    opacity: 0
                })
            },
            calculateScroll: function(a) {
                var b;
                return b = this.getUniversalWidth(), (a - 1) * b
            },
            resize: function() {
                return this.$rel.css("right", this.calculateScroll(this.current))
            },
            jump: function(a, b, c) {
                var d, e, f, g;
                return null == b && (b = this.options.transitionTime), null == c && (c = !1), f = this, a === f.current && (c = !0), this.$slides.length >= a && !this.slideChangeInProgress && (e = this.getUniversalWidth(), c || this.hideAnimatedCaptions(a), g = void 0, this.options.viewed && (this.currentBgPosition = parseInt(f.$slidesContainer.css("background-position")), this.moveStartScroll = parseInt(this.$rel.css("right"), 10), g = function() {
                    var a;
                    return a = Math.round(f.currentBgPosition - (f.moveStartScroll - parseInt(f.$rel.css("right"), 10)) * f.options.viewedDistance * f.options.viewedDirection) + "px 0", f.$slidesContainer.css("background-position", a)
                }), d = {
                    duration: b,
                    step: g,
                    done: function() {
                        return 1 === a ? (f.hideAnimatedCaptions(f.$slides.length - 1), f.set(f.$slides.length - 1)) : a === f.$slides.length ? (f.hideAnimatedCaptions(2), f.set(2)) : (f.current = a, f.slide = a - 1), f.updateControls(), c || f.runAnimations(), f.options.onSlideChange.call(f), null
                    },
                    always: function() {
                        return f.slideChangeInProgress = !1, null
                    }
                }, this.slideChangeInProgress = !0, this.$rel.animate({
                    right: this.calculateScroll(a)
                }, d)), null
            },
            set: function(a, b) {
                var c;
                return null == b && (b = !1), c = this.getUniversalWidth(), this.$rel.css("right", this.calculateScroll(a)), this.current = a, this.slide = a - 1, this.updateControls(), null
            },
            movestart: function(a) {
                return a.distX > a.distY && a.distX < -a.distY || a.distX < a.distY && a.distX > -a.distY ? a.preventDefault() : (this.stop(), this.options.viewed && (this.currentBgPosition = parseInt(this.$slidesContainer.css("background-position"))), this.hideAnimatedCaptions(this.current - 1), this.hideAnimatedCaptions(this.current + 1), this.moveStartScroll = parseInt(this.$rel.css("right"), 10), this.$rel.stop(), this.$rel.addClass("drag"), this.timeStart = new Date)
            },
            move: function(a) {
                var b;
                return this.options.viewed && (b = Math.round(this.currentBgPosition - a.distX * this.options.viewedDistance * this.options.viewedDirection) + "px 0", this.$slidesContainer.css("background-position", b)), this.$rel.css("right", this.moveStartScroll - a.distX)
            },
            moveend: function(a) {
                var b, c, d, e, f;
                return b = Math.abs(a.distX), e = (new Date).getTime() - this.timeStart.getTime(), d = this.getUniversalWidth(), c = b / d, f = e / c * (1 - c), f = 1e3 > f ? f : 1e3, this.$rel.removeClass("drag"), b < d / this.options.moveDistanceToSlideChange ? this.jump(this.current, f, !0) : a.distX < 0 ? this.next(f) : this.prev(f)
            },
            stop: function(a) {
                return null == a && (a = !0), clearInterval(this.interval), a && (this.$element.off("mouseover"), this.$element.off("mouseleave")), null
            },
            start: function() {
                var a;
                return a = this, this.interval = setInterval(function() {
                    return a.next()
                }, this.options.interval)
            },
            autoplay: function() {
                var a;
                return a = this, this.stop(), this.start(), this.$element.on("mouseover", function() {
                    return a.stop(!1)
                }), this.$element.on("mouseleave", function() {
                    return a.stop(!1), a.start()
                })
            },
            prev: function(a, b) {
                return null == a && (a = this.options.transitionTime), null == b && (b = !1), this.jump(this.current - 1, a, b), this.options.onSlidePrev.call(this), this.options.onSlidePageChange.call(this)
            },
            next: function(a, b) {
                return null == a && (a = this.options.transitionTime), null == b && (b = !1), this.jump(this.current + 1, a, b), this.options.onSlideNext.call(this), this.options.onSlidePageChange.call(this)
            }
        }, a.fn.shrewdSlider = function(c) {
            var d, e, f, g, h;
            return g = this, e = a.extend({}, a.fn.shrewdSlider.defaults, "object" == typeof c && c), e.animations = a.fn.shrewdSlider.animations, f = {
                next: "next",
                prev: "prev",
                stop: "stop",
                start: "autoplay"
            }, d = function(c) {
                var d, f, g, h;
                return e = a.metadata ? a.extend({}, e, c.metadata()) : e, h = c.find("ul li"), h.length > 1 && (d = a(h[0]), f = a(h[h.length - 1]), d.before(f.clone()), f.after(d.clone())), c.data("slider", g = new b(c, e)), e.autoplay && (g.interval = setInterval(function() {
                    return g.next()
                }, e.interval), g.autoplay()), a(window).on("resize", function() {
                    return g.resize()
                }), c.find("[data-jump]").on("click", function() {
                    return g[a(this).data("jump")](), !1
                }), c.find("[data-jump-to]").on("click", function() {
                    return g.jump(a(this).data("jump-to") + 1), !1
                }), e.touch ? c.find('[data-group="slide"]').on("movestart", function(a) {
                    return g.movestart(a)
                }).on("move", function(a) {
                    return g.move(a)
                }).on("moveend", function(a) {
                    return g.moveend(a)
                }) : void 0
            }, h = function() {
                return g.each(function() {
                    var b, g;
                    return b = a(this), g = b.data("slider"), g ? "string" == typeof c ? g[f[c]]() : "number" == typeof c && g.jump(Math.abs(c) + 1) : d(b, e), b
                })
            }, a.fn.shrewdSlider.run ? h() : (a(window).on("load", h), a.fn.shrewdSlider.run = !0)
        }, a.fn.shrewdSlider.animations = {
            slideShowFromRightToLeft: function(a, b, c) {
                var d, e;
                return null == b && (b = 0), null == c && (c = 300), e = {
                    "margin-left": 100,
                    "margin-right": -100
                }, a.css(e), d = function() {
                    return e = {
                        "margin-left": 0,
                        "margin-right": 0,
                        opacity: 1
                    }, a.animate(e, c)
                }, b > 0 ? setTimeout(d, b) : d()
            },
            slideShowFromLeftToRight: function(a, b, c) {
                var d, e;
                return null == b && (b = 0), null == c && (c = 300), e = {
                    "margin-left": -100,
                    "margin-right": 100
                }, a.css(e), d = function() {
                    return e = {
                        "margin-left": 0,
                        "margin-right": 0,
                        opacity: 1
                    }, a.animate(e, c)
                }, b > 0 ? setTimeout(d, b) : d()
            },
            slideShowFromUpToDown: function(a, b, c) {
                var d, e;
                return null == b && (b = 0), null == c && (c = 300), e = {
                    "margin-top": 100,
                    "margin-bottom": -100
                }, a.css(e), d = function() {
                    return e = {
                        "margin-top": 0,
                        "margin-bottom": 0,
                        opacity: 1
                    }, a.animate(e, c)
                }, b > 0 ? setTimeout(d, b) : d()
            },
            slideShowFromDownToUp: function(a, b, c) {
                var d, e;
                return null == b && (b = 0), null == c && (c = 300), e = {
                    "margin-top": -100,
                    "margin-bottom": 100
                }, a.css(e), d = function() {
                    return e = {
                        "margin-top": 0,
                        "margin-bottom": 0,
                        opacity: 1
                    }, a.animate(e, c)
                }, b > 0 ? setTimeout(d, b) : d()
            }
        }, a.fn.shrewdSlider.defaults = {
            autoplay: !1,
            interval: 5e3,
            touch: !0,
            viewed: !1,
            viewedDistance: .1,
            viewedDirection: 1,
            transitionTime: 300,
            moveDistanceToSlideChange: 4,
            onSlideChange: function() {},
            onSlideNext: function() {},
            onSlidePrev: function() {},
            onSlidePageChange: function() {},
            onInit: function() {}
        }, a.fn.shrewdSlider.run = !1, i = a('[data-spy="shrewd-slider"]'), i.length && (e = {}, (c = i.data("autoplay")) && (e.autoplay = c), (d = i.data("interval")) && (e.interval = d), (f = i.data("viewed")) && (e.viewed = f), (h = i.data("viewed-distance")) && (e.viewedDistance = parseInt(h, 10)), (g = i.data("viewed-direction")) && (e.viewedDirection = parseInt(g, 10)), (j = i.data("touch")) || (e.touch = j), (k = i.data("transitiontime")) && (e.transitionTime = k), i.shrewdSlider(e)), null
    }(jQuery)
}).call(this);