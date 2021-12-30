import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api ='http://localhost:3000/SignupUsers'
  constructor(private http: HttpClient) { }

  
  addManager(data : any){
    return this.http.post<any>(this.api, data)
    .pipe(map((res:any)=>{
      return res
    }))
  }

  getManager(){
    return this.http.get<any>(this.api)
    .pipe(map((res:any)=>{  
       
      return res;
    }))
  }


}
