import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhotoUploadComponent } from '../photo-upload/photo-upload';
import { MonkeyBackgroundComponent } from '../monkey-background/monkey-background';
import { TimerComponent } from '../timer/timer';
import { HomeComponent } from '../home/home';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, PhotoUploadComponent, MonkeyBackgroundComponent, TimerComponent, HomeComponent],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.css']
})
export class UserFormComponent {
  user = {
    nombre: '',
    email: '',
    telefono: '',
    edad: null,
    foto: ''
  };

  submitted = false;
  showHome = false;
  registering = false;

  constructor(private cdr: ChangeDetectorRef) {}

  onPhotoSelected(photo: string) {
    this.user.foto = photo;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.registering = true;
    this.cdr.detectChanges();
    console.log('Usuario registrado:', this.user);
    setTimeout(() => {
      this.registering = false;
      this.submitted = true;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.submitted = false;
        this.showHome = true;
        this.cdr.detectChanges();
      }, 2000);
    }, 1500);
  }

  resetForm() {
    this.user = {
      nombre: '',
      email: '',
      telefono: '',
      edad: null,
      foto: ''
    };
  }
}