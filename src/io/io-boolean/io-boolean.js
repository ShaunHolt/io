import {html} from "../ioutil.js"
import {Io} from "../io.js"
import {UiButton} from "../../ui/ui-button/ui-button.js"

export class IoBoolean extends Io {
  static get style() {
    return html`
      <style>
        :host {
          display: inline-block;
        }
        :host.invalid {
          text-decoration: underline;
          text-decoration-style: dashed;
          text-decoration-color: red;
          opacity: 0.25;
        }
        :host > ui-button {
          flex: 1;
        }
      </style>
    `;
  }
  static get properties() {
    return {
      value: {
        type: Boolean,
        observer: '_update'
      },
      true: {
        value: 'true',
        type: String,
        observer: '_update'
      },
      false: {
        value: 'false',
        type: String,
        observer: '_update'
      }
    }
  }
  _toggleHandler(event) {
    this._setValue(!this.value);
  }
  _update() {
    this.classList.toggle('invalid', typeof this.value !== 'boolean');
    this.render([
      ['ui-button', {action: this._toggleHandler}, this.value ? this.true : this.false]
    ]);
  }
}

window.customElements.define('io-boolean', IoBoolean);
