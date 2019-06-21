import {IoElement, html} from "../core/element.js";
import {IoMenuLayer} from "./menu-layer.js";

export class IoMenu extends IoElement {
  static get properties() {
    return {
      options: Array,
      expanded: Boolean,
      position: 'pointer',
      button: 0,
    };
  }
  constructor(props) {
    super(props);
    this.template([
      ['io-menu-options', {
        id: 'group',
        $parent: this,
        options: this.bind('options'),
        position: this.bind('position'),
        expanded: this.bind('expanded')
      }]
    ]);
  }
  connectedCallback() {
    super.connectedCallback();
    this.parentElement.addEventListener('mousedown', this._onMousedown);
    this.parentElement.addEventListener('touchstart', this._onTouchstart);
    this.parentElement.addEventListener('contextmenu', this._onContextmenu);
    IoMenuLayer.singleton.appendChild(this.$['group']);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.parentElement.removeEventListener('mousedown', this._onMousedown);
    this.parentElement.removeEventListener('touchstart', this._onTouchstart);
    this.parentElement.removeEventListener('touchmove', this._onTouchmove);
    this.parentElement.removeEventListener('touchend', this._onTouchend);
    this.parentElement.removeEventListener('contextmenu', this._onContextmenu);
    if (this.$['group']) IoMenuLayer.singleton.removeChild(this.$['group']);
  }
  getBoundingClientRect() {
    return this.parentElement.getBoundingClientRect();
  }
  _onContextmenu(event) {
    if (this.button === 2) {
      event.preventDefault();
      this.open(event);
    }
  }
  _onMousedown(event) {
    if (event.button === this.button && event.button !== 2) {
      this.open(event);
    }
  }
  _onTouchstart(event) {
    if (this.button !== 2) {
      event.preventDefault();
      this.open(event.changedTouches[0]);
    }
    this.parentElement.addEventListener('touchmove', this._onTouchmove);
    this.parentElement.addEventListener('touchend', this._onTouchend);
  }
  _onTouchmove(event) {
    if (this.expanded) event.preventDefault();
    IoMenuLayer.singleton._onTouchmove(event);
  }
  _onTouchend(event) {
    this.parentElement.removeEventListener('touchmove', this._onTouchmove);
    this.parentElement.removeEventListener('touchend', this._onTouchend);
    IoMenuLayer.singleton._onTouchend(event);
  }
  open(event) {
    IoMenuLayer.singleton.collapseAllGroups();
    IoMenuLayer.singleton._x = event.clientX;
    IoMenuLayer.singleton._y = event.clientY;
    IoMenuLayer.singleton.collapseOnPointerup = false;
    window.getSelection().removeAllRanges();
    this.expanded = true;
  }
}

IoMenu.Register();

export class IoMenuOptions extends IoElement {
  static get style() {
    return html`<style>
      :host {
        display: flex;
        flex-direction: column;
        white-space: nowrap;
        user-select: none;
        touch-action: none;
        background: var(--io-background-color);
        color: var(--io-color);
        padding: var(--io-spacing);
        border-radius: var(--io-border-radius);
        border: var(--io-outset-border);
        border-color: var(--io-outset-border-color);
        box-shadow: var(--io-shadow);
      }
      :host[horizontal] {
        flex-direction: row;
        align-self: stretch;
      }
      :host[horizontal] > io-menu-item {
        margin: 0 0.5em;
      }
      :host[horizontal] > io-menu-item > .io-menu-hint,
      :host[horizontal] > io-menu-item > .io-menu-more {
        display: none;
      }
    </style>`;
  }
  static get properties() {
    return {
      options: Array,
      expanded: {
        type: Boolean,
        reflect: true
      },
      position: 'right',
      horizontal: {
        type: Boolean,
        reflect: true
      },
      role: 'listbox',
      $parent: HTMLElement
    };
  }
  connectedCallback() {
    super.connectedCallback();
    IoMenuLayer.singleton.registerGroup(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    IoMenuLayer.singleton.unregisterGroup(this);
  }
  optionsChanged() {
    const itemPosition = this.horizontal ? 'bottom' : 'right';
    const options = this.options.map(option => {return (option.label !== undefined || option.value !== undefined) ? option : {value: option};});
    this.template([options.map((elem, i) =>
      ['io-menu-item', {
        $parent: this,
        value: options[i].value,
        label: options[i].label,
        hint: options[i].hint,
        icon: options[i].icon,
        options: options[i].options || [],
        position: itemPosition,
      }]
    )]);
  }
}

IoMenuOptions.Register();

export class IoMenuItem extends IoElement {
  static get style() {
    return html`<style>
      :host {
        display: flex;
        flex-direction: row;
        cursor: pointer;
        background: var(--io-background-color);
        padding: var(--io-spacing) 0;
      }
      :host > * {
        padding: 0 var(--io-spacing);
        min-width: 0.5em;
      }
      :host > .io-menu-icon {}
      :host > .io-menu-label {
        flex: 1 1 auto;
      }
      :host > .io-menu-hint {
        opacity: 0.25;
      }
    </style>`;
  }
  static get properties() {
    return {
      value: null,
      label: String,
      icon: String,
      hint: String,
      options: Array,
      position: String,
      $parent: HTMLElement,
      $options: IoMenuOptions,
      tabindex: 0
    };
  }
  static get listeners() {
    return {
      'touchstart': '_onTouchstart',
      'touchmove': '_onTouchmove',
      'touchend': '_onTouchend',
      'mousedown': '_onMousedown',
      'keydown': '_onKeydown',
      'focus': '_onFocus',
    };
  }
  get $root() {
    let parent = this;
    while (parent && parent.$parent) {
      parent = parent.$parent;
    }
    return parent;
  }
  get optionschain() {
    const chain = [];
    if (this.$options) chain.push(this.$options);
    let parent = this.$parent;
    while (parent) {
      if (parent.localName == 'io-menu-options') chain.push(parent);
      parent = parent.$parent;
    }
    return chain;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.$options.parentNode) {
      IoMenuLayer.singleton.appendChild(this.$options);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.$options.parentNode) {
      this.$options.parentNode.removeChild(this.$options);
    }
  }
  _onMousedown() {
    if (this.options.length) this.$options.expanded = true;
    IoMenuLayer.singleton._onMousedown(event);
  }
  _onTouchstart() {
    if (this.options.length) this.$options.expanded = true;
    IoMenuLayer.singleton._onTouchstart(event);
  }
  _onTouchmove(event) {
    IoMenuLayer.singleton._onTouchmove(event);
  }
  _onTouchend(event) {
    IoMenuLayer.singleton._onTouchend(event);
  }
  _onKeydown(event) {
    IoMenuLayer.singleton._onKeydown(event);
  }
  _onFocus() {
    IoMenuLayer.singleton._onFocus(event);
  }
  changed() {
    this.$options.setProperties({$parent: this, options: this.options, position: this.position});
    this.template([
      ['span', {className: 'io-menu-icon'}, this.icon],
      ['span', {className: 'io-menu-label'}, this.label || String(this.value)],
      ['span', {className: 'io-menu-hint'}, (this.hint || '') + (this.options.length ? '▸' : '')],
    ]);
  }
}

IoMenuItem.Register();
