var jnetzky;
(function (jnetzky) {
    var flexbox;
    (function (flexbox) {
        var demo;
        (function (demo) {
            var NavButton = (function () {
                function NavButton(nav, element, tabSelector) {
                    this._nav = nav;
                    this._element = element;
                    this._selected = false;
                    this._layoutPanel = new LayoutPanel(this.GetTabSelector(tabSelector));
                    nav.Subscribe(this);
                    this.InitializeElement(this._element);
                }
                Object.defineProperty(NavButton.prototype, "Selected", {
                    get: function () {
                        return this._selected;
                    },
                    set: function (val) {
                        this._selected = val;
                        if (this._selected) {
                            this._element.className = "selected";
                            this._layoutPanel.Hidden = false;
                        }
                        else {
                            this._element.className = "";
                            this._layoutPanel.Hidden = true;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                NavButton.prototype.OnClick = function () {
                    this.Selected = true;
                    this._nav.Notify(this);
                };
                NavButton.prototype.InitializeElement = function (ele) {
                    ele.addEventListener("click", this.OnClick.bind(this));
                };
                NavButton.prototype.GetTabSelector = function (classname) {
                    console.log(classname);
                    var ele = document.querySelector(classname);
                    return ele;
                };
                return NavButton;
            })();
            demo.NavButton = NavButton;
            var Navigation = (function () {
                function Navigation(nav, tabs) {
                    this._navButtons = [];
                    this._tabSelectors = tabs;
                    this.InitializeButtons(nav);
                }
                Navigation.prototype.Subscribe = function (navButton) {
                    this._navButtons.push(navButton);
                };
                Navigation.prototype.Notify = function (navButton) {
                    for (var _i = 0, _a = this._navButtons; _i < _a.length; _i++) {
                        var navBtn = _a[_i];
                        if (navBtn !== navButton && navButton.Selected) {
                            navBtn.Selected = false;
                        }
                    }
                };
                Navigation.prototype.InitializeButtons = function (nav) {
                    for (var i = 0; i < nav.children.length; i++) {
                        var navBtn = nav.children[i];
                        var newButton = new jnetzky.flexbox.demo.NavButton(this, navBtn, this._tabSelectors[i]);
                        if (i == 0) {
                            newButton.Selected = true;
                        }
                    }
                };
                return Navigation;
            })();
            demo.Navigation = Navigation;
            var LayoutPanel = (function () {
                function LayoutPanel(element) {
                    this._element = element;
                    this._hidden = true;
                    this._element.style.display = "none";
                }
                Object.defineProperty(LayoutPanel.prototype, "Hidden", {
                    get: function () {
                        return this._hidden;
                    },
                    set: function (val) {
                        this._hidden = val;
                        if (this._hidden) {
                            this.HideElement();
                        }
                        else {
                            this.ShowElement();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                LayoutPanel.prototype.HideElement = function () {
                    this._element.style.display = "none";
                };
                LayoutPanel.prototype.ShowElement = function () {
                    this._element.style.display = "block";
                };
                return LayoutPanel;
            })();
            demo.LayoutPanel = LayoutPanel;
        })(demo = flexbox.demo || (flexbox.demo = {}));
    })(flexbox = jnetzky.flexbox || (jnetzky.flexbox = {}));
})(jnetzky || (jnetzky = {}));
window.onload = function () {
    console.log("APP START");
    var tabs = [".tables", ".floats", ".flexbox"];
    var nav = new jnetzky
        .flexbox
        .demo
        .Navigation(document.querySelector(".layout_toggle"), tabs);
};
//# sourceMappingURL=app.js.map