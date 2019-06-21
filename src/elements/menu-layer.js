import {html, IoElement} from "../core/element.js";

let previousOption;
let previousParent;
let timeoutOpen;
let timeoutReset;
let WAIT_TIME = 200;
// let lastFocus;

// TODO: implement search

export class IoMenuLayer extends IoElement {
  static get style() {
    return html`<style>
      :host {
        display: block;
        visibility: hidden;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 100000;
        background: rgba(0, 0, 0, 0.2);
        user-select: none;
        overflow: hidden;
        pointer-events: none;
        touch-action: none;
      }
      :host[expanded] {
        visibility: visible;
        pointer-events: all;
      }
      :host io-menu-options:not([expanded]) {
        display: none;
      }
      :host io-menu-options {
        position: absolute;
        transform: translateZ(0);
        top: 0;
        left: 0;
      }
    </style>`;
  }
  static get properties() {
    return {
      expanded: {
        type: Boolean,
        reflect: true,
      },
      $options: Array
    };
  }
  static get listeners() {
    return {
      'mousedown': '_onMousedown',
      'mousemove': '_onMousemove',
      'mouseup': '_onMouseup',
      'touchstart': '_onTouchstart',
      'touchmove': '_onTouchmove',
      'touchend': '_onTouchend',
      'contextmenu': '_onContextmenu',
    };
  }
  constructor(props) {
    super(props);
    this._hoveredItem = null;
    this._hoveredGroup = null;
    this._x = 0;
    this._y = 0;
    this._v = 0;
    window.addEventListener('scroll', this._onScroll);
    this._animate();
    // window.addEventListener('focusin', this._onWindowFocus);
  }
  registerGroup(group) {
    this.$options.push(group);
    group.addEventListener('expanded-changed', this._onGroupExpandedChanged);
  }
  unregisterGroup(group) {
    this.$options.splice(this.$options.indexOf(group), 1);
    group.removeEventListener('expanded-changed', this._onGroupExpandedChanged);
  }
  collapseAllGroups() {
    for (let i = this.$options.length; i--;) {
      this.$options[i].expanded = false;
    }
    this.expanded = false;
    this.collapseOnPointerup = false;
    // if (lastFocus) {
    //   lastFocus.focus();
    //
  }
  runAction(option) {
    // if (option.options.length) option.$options.expanded = true;

    if (typeof option.action === 'function') {
      this.collapseAllGroups();
      option.action.apply(null, [option.value]);
    } else if (option.button) {
      this.collapseAllGroups();
      option.button.click(); // TODO: test
    }
  }
  _onScroll() {
    if (this.expanded) {
      this.collapseAllGroups();
    }
  }
  _onMousedown(event) {
    this._onPointermove(event);
    if (!this._hoveredGroup && this.collapseOnPointerup) {
      this.collapseAllGroups();
    }
  }
  _onMousemove(event) {
    this._onPointermove(event);
  }
  _onMouseup(event) {
    this._onPointerup(event);
  }
  _onTouchstart(event) {
    this._onPointermove(event.changedTouches[0]);
    if (!this._hoveredGroup && this.collapseOnPointerup) {
      this.collapseAllGroups();
    }
  }
  _onTouchmove(event) {
    this._onPointermove(event.changedTouches[0]);
  }
  _onTouchend(event) {
    this._onPointerup(event);
  }
  _onContextmenu(event) {
    event.preventDefault();
    if (this.expanded) {
      this.collapseAllGroups();
    }
  }
  // _onWindowFocus(event) {
  //   if (event.target.localName !== 'io-menu-item') lastFocus = event.target;
  // }
  _onFocus(event) {
    const path = event.composedPath();
    const item = path[0];
    const optionschain = item.optionschain;
    this._hoveredGroup = item;
    for (let i = this.$options.length; i--;) {
      if (optionschain.indexOf(this.$options[i]) === -1) {
        this.$options[i].expanded = false;
      }
    }
  }
  _onPointermove(event) {
    const movementX = event.clientX - this._x;
    const movementY = event.clientY - this._y;
    this._v = (2 * this._v + Math.abs(movementY) - Math.abs(movementX)) / 3;
    this._x = event.clientX;
    this._y = event.clientY;
    let groups = this.$options;
    for (let i = groups.length; i--;) {
      if (groups[i].expanded) {
        let rect = groups[i].getBoundingClientRect();
        if (rect.top < this._y && rect.bottom > this._y && rect.left < this._x && rect.right > this._x) {
          this._hover(groups[i]);
          this._hoveredGroup = groups[i];
          return groups[i];
        }
      }
    }
    this._hoveredItem = null;
    this._hoveredGroup = null;
  }
  _onPointerup() {
    if (this._hoveredItem) {
      this.runAction(this._hoveredItem);
      this._hoveredItem.$root.dispatchEvent('menu-item-clicked', this._hoveredItem);
      setTimeout(()=>{
        if (this.collapseOnPointerup) this.collapseAllGroups(); // TODO: ?
      }, 100);
    } else if (!this._hoveredGroup && this.collapseOnPointerup) {
      this.collapseAllGroups();
    }
    this.collapseOnPointerup = true;
  }
  _onKeydown(event) {
    event.preventDefault();
    const path = event.composedPath();
    if (path[0].localName !== 'io-menu-item') return;

    let elem = path[0];
    let group = elem.$parent;
    let siblings = [...group.querySelectorAll('io-menu-item')] || [];
    let children = elem.$options ? [...elem.$options.querySelectorAll('io-menu-item')]  : [];
    let index = siblings.indexOf(elem);

    let command = '';

    if (!group.horizontal) {
      if (event.key == 'ArrowUp') command = 'prev';
      if (event.key == 'ArrowRight') command = 'in';
      if (event.key == 'ArrowDown') command = 'next';
      if (event.key == 'ArrowLeft') command = 'out';
    } else {
      if (event.key == 'ArrowUp') command = 'out';
      if (event.key == 'ArrowRight') command = 'next';
      if (event.key == 'ArrowDown') command = 'in';
      if (event.key == 'ArrowLeft') command = 'prev';
    }
    if (event.key == 'Tab') command = 'next';
    if (event.key == 'Escape') command = 'exit';
    if (event.key == 'Enter' || event.which == 32) command = 'action';

    switch (command) {
      case 'action':
        this.runAction(elem);
        break;
      case 'prev':
        siblings[(index + siblings.length - 1) % (siblings.length)].focus();
        break;
      case 'next':
        siblings[(index + 1) % (siblings.length)].focus();
        break;
      case 'in':
        if (children.length) children[0].focus();
        break;
      case 'out':
        if (group && group.$parent) group.$parent.focus();
        break;
      case 'exit':
        this.collapseAllGroups();
        break;
      default:
        break;
    }
  }
  _hover(group) {
    let items = group.querySelectorAll('io-menu-item');
    for (let i = items.length; i--;) {
      let rect = items[i].getBoundingClientRect();
      if (rect.top < this._y && rect.bottom > this._y && rect.left < this._x && rect.right > this._x) {
        let force = group.horizontal;
        this._focus(items[i], force);
        this._hoveredItem = items[i];
        return items[i];
      }
    }
    this._hoveredItem = null;
    this._hoveredItem = null;
  }
  _focus(item, force) {
    if (item !== previousOption) {
      clearTimeout(timeoutOpen);
      clearTimeout(timeoutReset);
      if (this._v > 1 || item.parentNode !== previousParent || force) {
        previousOption = item;
        item.focus();
      } else {
        timeoutOpen = setTimeout(function() {
          previousOption = item;
          item.focus();
        }.bind(this), WAIT_TIME);
      }
      previousParent = item.parentNode;
      timeoutReset = setTimeout(function() {
        previousOption = null;
        previousParent = null;
      }.bind(this), WAIT_TIME + 1);
    }
  }
  _onGroupExpandedChanged(event) {
    const path = event.composedPath();
    if (path[0].expanded) this._setGroupPosition(path[0]);
    for (let i = this.$options.length; i--;) {
      if (this.$options[i].expanded) {
        this.expanded = true;
        return;
      }
    }
    requestAnimationFrame(() => { this.expanded = false; });
  }
  _setGroupPosition(group) {
    if (!group.$parent) return;
    let rect = group.getBoundingClientRect();
    let pRect = group.$parent.getBoundingClientRect();
     // TODO: unhack horizontal long submenu bug.
    if (group.position === 'bottom' && rect.height > (window.innerHeight - this._y)) group.position = 'right';
    //
    switch (group.position) {
      case 'pointer':
        group._x = this._x - 1 || pRect.x;
        group._y = this._y - 1 || pRect.y;
        break;
      case 'top':
        group._x = pRect.x;
        group._y = pRect.top - rect.height;
        break;
      case 'left':
        group._x = pRect.x - rect.width;
        group._y = pRect.top;
        break;
      case 'bottom':
        group._x = pRect.x;
        group._y = pRect.bottom;
        break;
      case 'right':
      default:
        group._x = pRect.right;
        group._y = pRect.y;
        if (group._x + rect.width > window.innerWidth) {
          group._x = pRect.x - rect.width;
        }
        break;
    }
    group._x = Math.max(0, Math.min(group._x, window.innerWidth - rect.width));
    group._y = Math.min(group._y, window.innerHeight - rect.height);
    group.style.left = group._x + 'px';
    group.style.top = group._y + 'px';
  }
  _animate() {
    if (this.expanded) {
      let group = this._hoveredGroup;
      if (group) {
        let rect = group.getBoundingClientRect();
        if (rect.height > window.innerHeight) {
          if (this._y < 100 && rect.top < 0) {
            let scrollSpeed = (100 - this._y) / 5000;
            let overflow = rect.top;
            group._y = group._y - Math.ceil(overflow * scrollSpeed) + 1;
          } else if (this._y > window.innerHeight - 100 && rect.bottom > window.innerHeight) {
            let scrollSpeed = (100 - (window.innerHeight - this._y)) / 5000;
            let overflow = (rect.bottom - window.innerHeight);
            group._y = group._y - Math.ceil(overflow * scrollSpeed) - 1;
          }
          group.style.left = group._x + 'px';
          group.style.top = group._y + 'px';
        }
      }
    }
    requestAnimationFrame(this._animate);
  }
  expandedChanged() {
    this._hoveredItem = null;
    this._hoveredItem = null;
  }
}

IoMenuLayer.Register();
IoMenuLayer.singleton = new IoMenuLayer();
document.body.appendChild(IoMenuLayer.singleton);
