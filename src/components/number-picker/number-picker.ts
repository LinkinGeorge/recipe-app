import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'number-picker',
  templateUrl: 'number-picker.html'
})
export class NumberPickerComponent implements OnInit {

  @Input() start: number = 1;
  @Input() min: number = 1;
  @Input() max: number = 100;
  @Input() steps: number = 1;
  @Input() caption: string;
  @Input() captionSingular: string;
  @Output() onChange = new EventEmitter<number>();

  value: number;
  pickerCaption: string;
  pickerCaptionSingular: string;

  ngOnInit() {
    this.value = this.start;
    this.pickerCaption = this.caption;
    this.pickerCaptionSingular = this.captionSingular;
  }

  plus() {
    if (this.value + this.steps <= this.max) {
      this.value = this.value + this.steps;
      this.onChange.emit(this.value);
    }
  }

  minus() {
    if (this.value - this.steps >= this.min) {
      this.value = this.value - this.steps;
      this.onChange.emit(this.value);
    }
  }

  singular():boolean {
    if ((this.value >= -1 && this.value <= 1) && this.pickerCaptionSingular) {
      if (this.pickerCaptionSingular.length > 0) {
        return true;
      }
    }
    return false;
  }

}
