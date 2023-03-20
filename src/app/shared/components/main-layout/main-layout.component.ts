import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../admin/shared/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']

})
export class MainLayoutComponent implements OnInit {


  constructor(public auth: AuthService) {
  }

  ngOnInit() {

  }

  // goToAdmin() {
  //   if (this.auth.isAuthenticated()) {
  //     this.router.navigate(['/admin','dashboard'])
  //   }else {
  //     this.router.navigate(['/admin'])
  //   }
  // }

}

