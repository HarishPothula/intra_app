import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-show-modal',
  templateUrl: './show-modal.component.html',
  styleUrls: ['./show-modal.component.scss']
})
export class ShowModalComponent implements OnInit {
  @Input() src;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
