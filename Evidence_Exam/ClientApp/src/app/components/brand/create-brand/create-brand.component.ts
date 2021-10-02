import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Brand } from '../../models/brand';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.css']
})
export class CreateBrandComponent implements OnInit {
  brand: Brand = new Brand();
  constructor(
    private dataSvc: DataService, private notifySvc: NotificationService
  ) { }
  insert(f: NgForm): void {
    if (f.invalid) return;
    this.dataSvc.postBrand(this.brand)
      .subscribe(r => {
        this.notifySvc.success("Data Save Successfully","Close")
      }, err => {
        this.notifySvc.success("Failed to Save Data", "Close")
      })
  }
  ngOnInit(): void {
  }
}
