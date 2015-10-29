
namespace jnetzky.flexbox.demo {

    export class NavButton {

        private _selected: boolean;
        private _nav: Navigation;
        private _layoutPanel: LayoutPanel;
        private _element: HTMLAnchorElement;

        constructor(nav: Navigation, element: HTMLAnchorElement, tabSelector: string) {
            this._nav = nav;
            this._element = element;
            this._selected = false;
            this._layoutPanel = new LayoutPanel(this.GetTabSelector(tabSelector));

            nav.Subscribe(this);

            this.InitializeElement(this._element);
        }

        set Selected(val: boolean) {
            this._selected = val;
            if (this._selected) {
                this._element.className = "selected";
                this._layoutPanel.Hidden = false;
            }
            else {
                this._element.className = "";
                this._layoutPanel.Hidden = true;
            }
        }

        get Selected(): boolean {
            return this._selected;
        }


        private OnClick() {
            this.Selected = true;
            this._nav.Notify(this);
            
        }

        private InitializeElement(ele: HTMLAnchorElement): void {
            ele.addEventListener("click", this.OnClick.bind(this));
        }

        private GetTabSelector(classname: string): HTMLElement {
            console.log(classname);
            var ele = <HTMLElement>document.querySelector(classname);
            return ele;
        }
    }

    export class Navigation {

        private _navButtons: NavButton[];
        private _tabSelectors: Array<string>;

        constructor(nav: HTMLElement, tabs : Array<string>) {
            this._navButtons = [];
            this._tabSelectors = tabs;

            this.InitializeButtons(nav);
        }

        public Subscribe(navButton: NavButton) {
            this._navButtons.push(navButton);
        }

        public Notify(navButton: NavButton) {
            for (let navBtn of this._navButtons) {
                if (navBtn !== navButton && navButton.Selected) {
                    navBtn.Selected = false;
                }
            }
        }

        private InitializeButtons(nav: HTMLElement) {
            for (let i = 0; i < nav.children.length; i++) {
                let navBtn = <HTMLAnchorElement>nav.children[i];
                let newButton = new jnetzky.flexbox.demo.NavButton(this, navBtn, this._tabSelectors[i]);

                if (i == 0) {
                    newButton.Selected = true;
                }
            }
        }
    }

    export class LayoutPanel {

        private _element: HTMLElement;
        private _hidden: boolean;

        constructor(element: HTMLElement) {
            this._element = element;
            this._hidden = true;

            this._element.style.display = "none";
        }

        set Hidden(val: boolean) {
            this._hidden = val;
            if (this._hidden) {
                this.HideElement();
            }
            else {
                this.ShowElement();
            }
        }

        get Hidden(): boolean {
            return this._hidden;
        }

        private HideElement(): void {
            this._element.style.display = "none";
        }

        private ShowElement(): void {
            this._element.style.display = "block";
        }

    }
}

window.onload = () => {
    console.log("APP START");

    var tabs = [".tables",".floats",".flexbox"];

    var nav = new jnetzky
        .flexbox
        .demo
        .Navigation(<HTMLElement>document.querySelector(".layout_toggle"), tabs);
}