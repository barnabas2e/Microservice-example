import { Observable } from 'rxjs';
import { Transaction } from '../../models/Transaction';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:7171/api/course/service/';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  enroll(transaction: Transaction): Observable<any> {
    return this.http.post(API_URL + 'enroll', JSON.stringify(transaction),
    {headers: {'Content-Type': 'application/json; charset=UTF-8'}});
  }

  findAllCourses(): Observable<any> {
    return this.http.get(API_URL + 'all', {headers: {'Content-Type': 'application/json; charset=UTF-8'}});
  }

  findTransactionsOfUser(userId: number): Observable<any> {
    return this.http.get(API_URL + 'user/' + userId,
    { headers: {'Content-Type': 'application/json; charset=UTF-8'}});
  }

  findStudentsOfCourse(courseId: number): Observable<any> {
    return this.http.get(API_URL + 'course/' + courseId,
    {headers:
      {'Content-Type': 'application/json; charset=UTF-8'}
    });
  }
}
