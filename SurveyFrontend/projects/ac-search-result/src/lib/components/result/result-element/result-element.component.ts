import { Component, Input, OnInit } from '@angular/core';
import { IResultElement } from '../result.interface';

@Component({
  selector: 'ac-result-element',
  templateUrl: './result-element.component.html',
  styleUrls: ['./result-element.component.scss']
})
export class ResultElementComponent implements OnInit {
  @Input() element: IResultElement;

  constructor() { }

  ngOnInit() {
  }

}
