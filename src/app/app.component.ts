import { Component } from '@angular/core';
import { User } from 'src/models/User';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client Side';
  currentUser: User;

  constructor(private userService: UserService, private router: Router) {
    // Call it observable because it can be changed from other page like login.
    this.userService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  logOut() {
    this.userService.logOut().subscribe(data => {
      this.router.navigate(['/login']);
    });
  }
}
