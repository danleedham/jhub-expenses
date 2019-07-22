import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ImagePickerComponent } from './pickers/image-picker/image-picker.component';
import { LocationPickerComponent } from './pickers/location-picker/location-picker.component';

@NgModule({
  declarations: [ImagePickerComponent, LocationPickerComponent],
  imports: [CommonModule, IonicModule],
  exports: [LocationPickerComponent, ImagePickerComponent],
})
export class SharedModule {}
