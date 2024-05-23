import { Component, OnDestroy, OnInit, ViewChild, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { PropertyType } from '../shared/enums/property';

import { Property } from '../shared/interface/property';
import { UserService } from '../user/user.service';
import { PropertiesNewComponent } from './properties-new-modal/properties-new.component';
import { PropertiesUploadsComponent } from './properties-uploads-modal/properties-uploads.component';
import { PropertiesListComponent } from './properties-list/properties-list.component';
import { User } from '../shared/interface/user';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
})
export class PropertiesPage implements OnInit, OnDestroy {
  @ViewChild('propertyLists') propertyListsComponent: PropertiesListComponent;
  public progressBar = false;
  public search = '';
  public properties: Property[] = [];
  public ownedPropertiesOnly = signal(false);
  public filterBy: PropertyType[] = [];
  public filters = [
    {
      value: PropertyType.residential,
      label: 'Dân cư',
    },
    {
      value: PropertyType.commercial,
      label: 'Thương mại',
    },
    {
      value: PropertyType.industrial,
      label: 'Nhà máy',
    },
    {
      value: PropertyType.land,
      label: 'Đất',
    },
  ];
  public sortBy = 'latest';
  public sorts = [
    {
      value: 'latest',
      label: 'Mới nhất',
    },
    {
      value: 'name',
      label: 'Tên',
    },
    {
      value: 'price',
      label: 'Giá',
    },
  ];
  public user: User;
  private unSubscribe$ = new Subject<void>();

  constructor(
    public modalController: ModalController,
    private userService: UserService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    this.userService.user$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((val) => {
        console.log('subscsriptoon');
        this.user = val;
      });
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

  async presentModal() {
    const user = this.userService.user;
    if (!user) {
      this.router.navigateByUrl('/user/signin');
      this.toastCtrl
        .create({
          message: 'Hãy đăng nhập để tiếp tục',
          duration: 3000,
          color: 'danger',
        })
        .then((toast) => toast.present());
      return;
    }
    const modalPropertiesNew = await this.modalController.create({
      component: PropertiesNewComponent,
    });
    await modalPropertiesNew.present();
    const { data } = await modalPropertiesNew.onDidDismiss();
    if (data) {
      this.presentUploadModal(data);
    }
  }

  public async presentLoading() {
    this.progressBar = true;
    setTimeout(() => (this.progressBar = false), 1500);
  }

  public switchOwnedProperty(event: CustomEvent) {
    this.ownedPropertiesOnly.set(event.detail.checked);
    this.propertyListsComponent.setOwnedPropertiesOnly(event.detail.checked);
  }

  private async presentUploadModal(property: Property) {
    const modalUploads = await this.modalController.create({
      component: PropertiesUploadsComponent,
      componentProps: { property },
    });
    await modalUploads.present();
  }
}
