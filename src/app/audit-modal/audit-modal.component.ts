import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-audit-modal',
  templateUrl: './audit-modal.component.html',
  styleUrls: ['./audit-modal.component.scss']
})
export class AuditModalComponent implements OnInit {
  @Input() src;
  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }
}


