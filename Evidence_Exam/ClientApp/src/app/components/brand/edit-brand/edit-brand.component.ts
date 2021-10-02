import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Brand } from '../../models/brand';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {
  brand: Brand = new Brand();
  constructor(
    private dataService: DataService,
    private notify: NotificationService,
    private activateRoute: ActivatedRoute
  ) { }
  update(f: NgForm): void {
    if (f.invalid) return;
    console.log(this.brand);
    this.dataService.putBrand(this.brand)
      .subscribe(r => {
        this.notify.success("Data modified successfully", "Close")
      }, err => {
        this.notify.fail("Failed to modify data", "Close")
      });
  }
  ngOnInit(): void {
    let id = this.activateRoute.snapshot.params.id
    this.dataService.getBrandById(id)
      .subscribe(r => {
        this.brand = r;
      }, err => {
        this.notify.fail("Failed to fetch data from server", "Close")
      })
    console.log(id);
  }

}
