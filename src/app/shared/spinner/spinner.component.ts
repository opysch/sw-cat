import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() public isFullScreen: boolean;

  constructor() {
    this.isFullScreen = false;
  }

  ngOnInit() {
  }

}
