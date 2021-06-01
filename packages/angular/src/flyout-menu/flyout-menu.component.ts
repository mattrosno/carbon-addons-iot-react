import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IconService } from 'carbon-components-angular';
import { Filter16 } from '@carbon/icons';

/**
 * The Filter menu component encapsulates the OverFlowMenu directive, and the flyout iconography
 * into one convienent component
 *
 * [See demo](../../?path=/story/components-flyout-menu--basic)
 *
 * html:
 * ```
 * <ai-flyout-menu>
 *	options
 * </ai-flyout-menu>
 * ```
 *
 * <example-url>../../iframe.html?id=components-flyout-menu--basic</example-url>
 */
@Component({
  selector: 'ai-flyout-menu',
  template: `
    <ng-template #templateRef let-tooltip="tooltip">
      <div class="bx--tooltip__content">
        <div class="iot--flyout-menu--content">
          <ng-content></ng-content>
        </div>
        <div class="iot--flyout-menu__bottom-container">
          <ng-content select="[cancelButton]"></ng-content>
          <ng-content select="[applyButton]"></ng-content>
        </div>
      </div>
    </ng-template>
    <div
      [aiFlyoutMenu]="templateRef"
      [offset]="offset"
      [flip]="flip"
      trigger="click"
      [placement]="placement"
      style="--tooltip-visibility: hidden;"
    >
      <button
        aria-label="Helpful description"
        data-testid="flyout-menu-button"
        tabindex="0"
        ibmButton="ghost"
        iconOnly="true"
        class="
        iot--flyout-menu--trigger-button
        iot--btn
        bx--tooltip__trigger
        bx--tooltip--a11y
        bx--tooltip--top
        bx--tooltip--align-center"
      >
        <svg ibmIcon="filter" size="16" class="bx--overflow-menu__icon"></svg>
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class FlyoutMenu implements OnInit {
  /**
   * This specifies any vertical and horizontal offset for the position of the dialog
   */
  @Input() set offset(os: { x: number; y: number }) {
    this._offset = os;
  }
  get offset(): { x: number; y: number } {
    if (!this._offset) {
      return { x: (this.flip ? -1 : 1) * 4, y: 0 };
    }
    return this._offset;
  }

  @Input() flip = false;

  @Input() placement: 'bottom' | 'top' | 'left' | 'right' = 'bottom';

  private _offset;

  constructor(protected iconService: IconService) {}

  ngOnInit() {
    this.iconService.register(Filter16);
  }
}
