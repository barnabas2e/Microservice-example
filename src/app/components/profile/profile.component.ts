import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User';
import { Transaction } from 'src/models/Transaction';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User;
  transactionList: Array<Transaction>;

  constructor(private userService: UserService, private courseService: CourseService, private router: Router) {
      this.currentUser = this.userService.currentUserValue;
  }

  ngOnInit() {
    if (!this.currentUser){
      this.router.navigate(['/login']);
      return;
    }
    this.findTransactionsOfUser();
  }

  findTransactionsOfUser() {
    this.courseService.findTransactionsOfUser(this.currentUser.id).subscribe(data => {
      this.transactionList = data;
    });
  }

  logOut(){
    this.userService.logOut().subscribe(data => {
      this.router.navigate(['/login']);
    });
  }
}
