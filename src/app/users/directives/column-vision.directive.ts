import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[agnColumnVision]',
})
export class ColumnVisionDirective implements OnChanges {
  @Input('agnColumnVision') public isChecked!: boolean;

  constructor(private elementRef: ElementRef) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['isChecked']) {
      this.updateVisibility();
    }
  }

  private updateVisibility(): void {
    const element = this.elementRef.nativeElement as HTMLElement;
    if (this.isChecked) {
      element.classList.add('table__vision');
    } else {
      element.classList.remove('table__vision');
    }
  }
}
