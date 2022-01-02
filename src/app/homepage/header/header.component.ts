import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
// import { AuthService } from '../../../Services/auth.service';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faLogout = faSignOutAlt;
  constructor(private auth: AuthService) {}

  logout(): void {
    this.auth.logout();
  }
}