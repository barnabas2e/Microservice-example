import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = 'http://localhost:7171/api/user/service/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: Observable<User>;
  // BehaviorSubject is a type of subject, a subject is a special type of observable 
  // so you can subscribe to messages like any other observable
  // tslint:disable-next-line: max-line-length
  // read more : "https://stackoverflow.com/questions/39494058/behaviorsubject-vs-observable#:~:text=BehaviorSubject%20is%20a%20type%20of,unique%20features%20of%20BehaviorSubject%20are%3A&text=at%20any%20point%2C%20you%20can,using%20the%20getValue()%20method."
  private curentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    this.curentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.curentUserSubject.asObservable();
   }

public get currentUserValue(): User {
  return this.curentUserSubject.value;
}

login(user: User): Observable<any> {
    const headers = new HttpHeaders(
      user ? {
        // btoa() method creates a Base64-encoded ASCII string from a binary string
        authorization: 'Basic ' + btoa(user.username + ':' + user.password)
      } : {}
    );

    return this.http.get<any>(API_URL + 'login', { headers }).pipe(
    map(response => {
      if (response) {
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.curentUserSubject.next(response);
      }
      return response;
    })
  );
}

logOut(): Observable<any> {
  return this.http.post(API_URL + 'logout', {}).pipe(
    map(response => {
      localStorage.removeItem('currentUser');
      this.curentUserSubject.next(null);
    })
  );
}

register(user: User): Observable<any> {
  return this.http.post(API_URL + 'registration', JSON.stringify(user),
  { headers: {'content-Type': 'application/json; charset=UTF-8' }});
}

}
