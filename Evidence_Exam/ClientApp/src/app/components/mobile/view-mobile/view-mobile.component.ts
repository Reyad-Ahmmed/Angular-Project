import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Brand } from '../../models/brand';
import { Mobile } from '../../models/mobile';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';
import { DeleteMobileComponent } from '../delete-mobile/delete-mobile.component';

@Component({
  selector: 'app-view-mobile',
  templateUrl: './view-mobile.component.html',
  styleUrls: ['./view-mobile.component.css']
})
export class ViewMobileComponent implements OnInit {
  
  mobiles: Mobile[] = [];
  brands: Brand[] = [];
  
  // for table
  dataSource: MatTableDataSource<Mobile> = new MatTableDataSource(this.mobiles);
  // for pagination
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  // for sorting data
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  // for column list
  columnList = ['picture', "model", "releaseDate", "price", "available", "brand", "actions"];

  // constructor
  constructor(
    private dataService: DataService,
    private notify: NotificationService,
    private dialog:MatDialog
  ) { }

  // for brand name against brand id
  getBrandName(id: number): string|undefined{
    let bname = this.brands.find(b => b.brandId == id);
    return bname ? bname.brandName : "";
  }
  
  // for delete mobile data
  confirmDelete(data: Mobile): void {
    this.dialog.open(DeleteMobileComponent, {
      width: '550px'
    }).afterClosed().subscribe(r => {
      if (r) {
        this.dataService.deleteMobile(Number(data.mobileId))
          .subscribe(x => {
            this.notify.success("Data has been deleted", "Close");
            this.dataSource.data = this.dataSource.data.filter(m => m.mobileId != x.mobileId);
          }, err => {
            this.notify.fail("Faile to delete mobile", "Close");
          });
      }
      else {
        this.notify.fail("Data is not deleted", "Close");
      }
    })
  }

  //for length
  mlength(): any {
    return this.mobiles.length;
  }
  mobileLength!: Mobile;
  ngOnInit(): void {
    this.dataService.getMobile()
      .subscribe(r => {
        this.mobiles = r;
        this.dataSource.data = this.mobiles;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        console.log(err);
      })
    this.dataService.getBrand().
      subscribe(x => {
        this.brands = x;
      }, err => {
        this.notify.fail("Faile to find brand", "Close");
      });

  }
}
 
