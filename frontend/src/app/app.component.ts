import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from './shared/interface/user';

import { EnquiriesService } from './enquiries/enquiries.service';
import { StorageService } from './shared/services/storage/storage.service';
import { UserService } from './user/user.service';
import { WebSocketService } from './web-scoket/web-socket.service';
import { Enquiry } from './shared/interface/enquiry';

// Register swiper js
import { register } from 'swiper/element/bundle';
register();

interface NavLinks {
  title: string;
  url: string;
  icon: string;
  signIn?: boolean;
  guest?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages: NavLinks[] = [
    { title: 'Bản đồ', url: '/map', icon: 'map' },
    { title: 'Danh sách', url: '/properties', icon: 'home' },
    { title: 'Yêu cầu', url: '/enquiries', icon: 'reader' },
    { title: 'Tính toán khoản vay', url: '/mortgage-calc', icon: 'calculator' },
    { title: 'Cài đặt', url: '/settings', icon: 'cog' },
  ];

  public appLowerPages: NavLinks[] = [
    { title: 'Thông tin trang web', url: '/about', icon: 'help-circle' },
    { title: 'Tài khoản', url: '/user/account', icon: 'person', signIn: true },
    { title: 'Đăng ký', url: '/user/register', icon: 'create', guest: true },
    { title: 'Đăng nhập', url: '/user/signin', icon: 'log-in', guest: true },
  ];

  public user: User;
  public unreadEnquiries = 0;

  constructor(
    private platform: Platform,
    private storage: StorageService,
    private userService: UserService,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private http: HttpClient,
    private enquiriesService: EnquiriesService,
    private webSocket: WebSocketService
  ) {}

  async ngOnInit() {
    await this.platform.ready();
    await this.storage.init();
    const isDark = await this.storage.getDartTheme();
    // SET THEME
    if (isDark) {
      document.body.classList.add('dark');
    }
    this.userService.user$.subscribe((user) => {
      this.user = user;
      if (user) {
        this.webSocket.connect(this.userService.token());
        /**
         *  Fetch users enquiries if there's was no initial fetch
         */
        if (!this.enquiriesService.initialFetchDone) {
          this.enquiriesService.fetchEnquiries();
        }
      }
    });
    this.enquiriesService.enquiries$.subscribe((enquiries) => {
      this.unreadEnquiries = enquiries.filter((enq) =>
        this.isUnread(enq)
      ).length;
    });
    this.checkServer();
  }

  public isHidden(link: NavLinks) {
    if (!link.signIn && !link.guest) {
      return;
    }
    if (link.signIn && this.user) {
      return;
    }
    if (link.guest && !this.user) {
      return;
    }
    return true;
  }

  public async signOut() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Bạn có chắc chắn không?',
      message: 'Bạn sẽ đăng xuất!!!',
      buttons: [
        {
          text: 'Huỷ',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Đăng xuất',
          cssClass: 'danger',
          handler: async () => {
            await this.userService.signOut();
            this.enquiriesService.resetState();
            this.showToast();
            this.router.navigate(['/user/signin']);
          },
        },
      ],
    });
    await alert.present();
  }

  private async showToast() {
    const toast = await this.toastController.create({
      message: 'Thành công, bạn đã đăng nhập!',
      color: 'success',
      duration: 3000,
    });
    toast.present();
  }

  private checkServer() {
    firstValueFrom(this.http.get(environment.api.server)).then((data) =>
      console.log(data)
    );
  }

  private isUnread(enquiry: Enquiry) {
    return !enquiry.read && enquiry.users.to.user_id === this.user.user_id;
  }
}
