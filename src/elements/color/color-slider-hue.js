import {IoColorSlider} from './color-slider.js';

export class IoColorSliderHue extends IoColorSlider {
  static get Frag() {
    return /* glsl */`
      varying vec2 vUv;

      void main(void) {
        vec2 size = (uHorizontal == 1) ? uSize : uSize.yx;
        vec2 uv = uHorizontal == 1 ? vUv.xy : vUv.yx;
        vec2 position = size * uv;

        // Hue spectrum
        vec3 finalColor = hsv2rgb(vec3(uv.x, uHsv[1], uHsv[2]));

        // Marker
        vec2 markerPos = translate(position, vec2(size.x * uHsv[0], size.y * 0.5));
        vec4 slider = paintColorSlider(markerPos, uRgb);
        finalColor = mix(finalColor, slider.rgb, slider.a);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;
  }
  _setIncrease() {
    this.hsv[0] = Math.min(1, this.hsv[0] + 0.01);
    this.setValueFromHsv();
  }
  _setDecrease() {
    this.hsv[0] = Math.max(0, this.hsv[0] - 0.01);
    this.setValueFromHsv();
  }
  _setValue(x) {
    this.hsv[0] = x;
    this.setValueFromHsv();
  }
}

IoColorSliderHue.Register();
