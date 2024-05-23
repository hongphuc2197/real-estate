import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PropertyType } from 'src/app/shared/enums/property';

interface Markers {
  label: string;
  value: string;
  isChecked: boolean;
  icon: string;
}

@Component({
  selector: 'app-map-markers-legend',
  templateUrl: './map-markers-legend.component.html',
  styleUrls: ['./map-markers-legend.component.scss'],
})
export class MapMarkersLegendComponent implements OnInit {
  @Output() toggledMarker = new EventEmitter<{
    type: string;
    isChecked: boolean;
  }>();

  public markers: Markers[] = [
    {
      label: 'Dân cư',
      value: PropertyType.residential,
      isChecked: true,
      icon: 'marker-residential.svg',
    },
    {
      label: 'Thương mại',
      value: PropertyType.commercial,
      isChecked: true,
      icon: 'marker-commercial.svg',
    },
    {
      label: 'Nhà máy',
      value: PropertyType.industrial,
      isChecked: true,
      icon: 'marker-industrial.svg',
    },
    {
      label: 'Đất',
      value: PropertyType.land,
      isChecked: true,
      icon: 'marker-land.svg',
    },
  ];
  constructor() {}

  ngOnInit() {}

  markerSelected(marker: Markers) {
    this.toggledMarker.emit({
      type: marker.value,
      isChecked: marker.isChecked,
    });
  }
}
