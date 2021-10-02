import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ImagePath } from '../models/image-path';
import { Mobile } from '../models/mobile';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getBrand(): Observable<Brand[]> {
    return this.http.get<Brand[]>('/api/Brands');
  }
  getBrandById(id: number): Observable<Brand> {
    return this.http.get<Brand>(`/api/Brands/${id}`);
  }
  postBrand(data: Brand): Observable<Brand> {
    return this.http.post<Brand>(`/api/Brands`, data);
  }
  putBrand(data: Brand): Observable<any> {
    return this.http.put<any>(`/api/Brands/${data.brandId}`, data);
  }
  deleteBrand(id: number): Observable<Brand> {
    return this.http.delete<Brand>(`/api/Brands/${id}`);
  }

  // for mobile

  getMobile(): Observable<Mobile[]> {
    return this.http.get<Mobile[]>('/api/Mobiles');
  }
  getMobileById(id: number): Observable<Mobile> {
    return this.http.get<Mobile>(`/api/Mobiles/${id}`);
  }
  postMobile(data: Mobile): Observable<Mobile> {
    return this.http.post<Brand>(`/api/Mobiles`, data);
  }
  putMobile(data: Mobile): Observable<any> {
    return this.http.put<any>(`/api/Mobiles/${data.mobileId}`, data);
  }
  deleteMobile(id: number): Observable<Mobile> {
    return this.http.delete<Mobile>(`/api/Mobiles/${id}`);
  }
  // for upload image
  upload(id: number, f: File): Observable<ImagePath> {
    const formData = new FormData();
    formData.append('file', f);
    return this.http.post<ImagePath>(`/api/Mobiles/Uploads/${id}`, formData);
  }

}
