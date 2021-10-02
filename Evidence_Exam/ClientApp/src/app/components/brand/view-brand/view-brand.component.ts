import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Brand } from '../../models/brand';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';
import { DeleteBrandComponent } from '../delete/delete.component';


@Component({
  selector: 'app-view-brand',
  templateUrl: './view-brand.component.html',
  styleUrls: ['./view-brand.component.css']
})
export class ViewBrandComponent implements OnInit {
  brands: Brand[] = [];
  dataSource: MatTableDataSource<Brand> = new MatTableDataSource(this.brands);
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  columnList = ['brandName', "country", "actions"];
  constructor(private dataService: DataService, private notify: NotificationService, private delDialog: MatDialog) { }
  confirmDelete(brand: Brand): void {
    this.delDialog.open(DeleteBrandComponent, {
      width: '700px',
      height:'200px'
    }).afterClosed()
      .subscribe(r => {
        if (r) {
          this.dataService.deleteBrand(Number(brand.brandId))
            .subscribe(r => {
              this.dataSource.data = this.dataSource.data.filter(x => x.brandId != brand.brandId);
              this.notify.success("Data Deleted Successfully", "Close")
            }, err => {
              this.notify.fail("Failed to delete brand. Because brand has a child. First delete mobile then brand.", "Close")
            });
        }
        else {
          this.notify.fail("Data is not delete", "Close")
        }
      });
  }
  ngOnInit(): void {
    this.dataService.getBrand()
      .subscribe(r => {
        this.brands = r;
        this.dataSource.data = this.brands;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }, err => {
        console.log(err);
    })
  }

}
