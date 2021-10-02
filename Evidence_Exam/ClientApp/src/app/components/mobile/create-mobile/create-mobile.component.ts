import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Brand } from '../../models/brand';
import { Mobile } from '../../models/mobile';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-create-mobile',
  templateUrl: './create-mobile.component.html',
  styleUrls: ['./create-mobile.component.css']
})
export class CreateMobileComponent implements OnInit {

  picFile!: File;
  brands: Brand[] = [];
  mobile:Mobile = new Mobile();
  mobileForm: FormGroup = new FormGroup({
    model: new FormControl('', Validators.required),
    price: new FormControl('',Validators.required),
    releaseDate: new FormControl('',Validators.required),
    picture: new FormControl(undefined, Validators.required),
    available:new FormControl(''),
    brandId: new FormControl('', Validators.required)
  });
  constructor(
    private dataService: DataService,
    private notify: NotificationService,
    private datepipe: DatePipe
  ) { }
  get f() {
    return this.mobileForm.controls;
  }
  onChange(event: any) {
    this.picFile = event.target.files[0];
  }
  insert(): void {
    if (this.mobileForm.invalid) return;
    console.log(this.mobileForm.value);
    Object.assign(this.mobile, this.mobileForm.value);
    console.log(this.mobile);
    this.mobile.picture = 'no-pic.jpg';
    this.mobile.model = this.f.model.value
    this.mobile.price = this.f.price.value
    this.mobile.releaseDate = this.f.releaseDate.value
    this.mobile.releaseDate = new Date(<string>this.datepipe.transform(this.mobile.releaseDate, "yyyy-MM-dd"));
    this.mobile.available = this.f.available.value
    this.mobile.brandId = this.f.brandId.value
    this.dataService.postMobile(this.mobile)
      .subscribe(m => {
        this.upload(Number(m.mobileId));
      }, err => {
        this.notify.fail("Failed to save mobile data", "Close");
      });
  }
  upload(id: number) {
    let reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      this.dataService.upload(id, this.picFile)
        .subscribe(r => {
          this.mobile.picture = r.imagePath;
          this.notify.success("Succeeded to save mobile data", "Close");
          this.mobileForm.reset({});
        }, err => {
          this.notify.fail("Failed to upload picture", "Close");
        })
    })
    reader.readAsDataURL(this.picFile);
  }
  

  ngOnInit(): void {
    this.dataService.getBrand()
      .subscribe(r => {
        this.brands = r;
      }, err => {
        this.notify.fail("Failed to load mobile", "Close");

      })
  }
}
