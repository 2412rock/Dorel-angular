import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../model/response';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://dorelapp.xyz:4200'; // Replace this with your API endpoint URL

  constructor(private http: HttpClient) { }

  // Define methods to make HTTP requests

  // Example GET request
  async getData() {
    return this.http.get<ResponseModel>(`${this.apiUrl}/api/GetData`);
  }

  // Example POST request
  postData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/data`, data);
  }
}
