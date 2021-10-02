import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Brand } from '../../models/brand';
import { Mobile } from '../../models/mobile';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-edit-mobile',
  templateUrl: './edit-mobile.component.html',
  styleUrls: ['./edit-mobile.component.css']
})
export class EditMobileComponent implements OnInit {

  picFile!: File;
  mobile!: Mobile;
  mobileForm: FormGroup = new FormGroup({
    model: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    releaseDate: new FormControl('', Validators.required),
    picture: new FormControl(undefined, Validators.required),
    available: new FormControl(''),
    brandId: new FormControl('', Validators.required)
  });
  brands: Brand[] = [];
  constructor(
    private dataService: DataService,
    private notify: NotificationService,
    private actvatedRoute: ActivatedRoute,
    private datepipe: DatePipe
  ) { }
  get f() {
    return this.mobileForm.controls;
  }
  onChange(event: any) {
    this.picFile = event.target.files[0];
  }
  update(): void {
    if (this.mobileForm.invalid) return;
    console.log(this.mobileForm.value);

    this.mobile.model = this.f.model.value
    this.mobile.price = this.f.price.value
    this.mobile.releaseDate = this.f.releaseDate.value
    this.mobile.releaseDate = new Date(<string>this.datepipe.transform(this.mobile.releaseDate, "yyyy-MM-dd"));
    this.mobile.available = this.f.available.value
    this.mobile.brandId = this.f.brandId.value
    console.log(this.mobile);

    this.dataService.putMobile(this.mobile)
      .subscribe(m => {
        if (this.picFile != null && this.mobile.mobileId) {
          this.upload(Number(this.mobile.mobileId))
        }
        else {
          this.notify.success("Succeeded to modify mobile data", "Close");
        }
      }, err => {
        this.notify.fail("Failed to save mobile data", "Close");
      });
  }
  upload(id: number): void {
    let reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      this.dataService.upload(id, this.picFile)
        .subscribe(r => {
          this.mobile.picture = r.imagePath;
          this.notify.success("Succeeded to upload mobile data", "Close");
        }, err => {
          this.notify.fail("Failed to upload image", "Close");
        })
    })
    reader.readAsDataURL(this.picFile);
  }
  ngOnInit(): void {
    let id: number = this.actvatedRoute.snapshot.params.id;
    this.dataService.getMobileById(id).
      subscribe(r => {
        this.mobile = r;
        this.mobileForm.patchValue(this.mobile);
      }, err => {
        this.notify.fail("Faild to load mobile data", "Close");
      })
    this.dataService.getBrand()
      .subscribe(r => {
        this.brands = r;
      }, err => {
        this.notify.fail("Failed to load brands", "Close");
      });
  }



}
