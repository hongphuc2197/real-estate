import { Component, Input, OnInit } from '@angular/core';
import { PropertyType } from '../../enums/property';

@Component({
  selector: 'app-property-badge',
  templateUrl: './property-badge.component.html',
  styleUrls: ['./property-badge.component.scss'],
})
export class PropertyBadgeComponent implements OnInit {
  @Input() type = 'residential';
  constructor() {}

  ngOnInit() {}

  typeColor() {
    switch (this.type) {
      case PropertyType.residential:
        return 'danger';
      case PropertyType.commercial:
        return 'tertiary';
      case PropertyType.industrial:
        return 'warning';
      case PropertyType.land:
        return 'success';
      default:
        break;
    }
  }

  typeLabel() {
    switch (this.type) {
      case PropertyType.residential:
        return 'Bất động sản nhà ở';
      case PropertyType.commercial:
        return 'Bất động sản thương mại';
      case PropertyType.industrial:
        return 'Bất động sản công nghiệp';
      case PropertyType.land:
        return 'Bất động sản đất đai';
      default:
        break;
    }
  }
}
