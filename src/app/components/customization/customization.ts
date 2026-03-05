import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customization',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customization.html',
  styleUrls: ['./customization.css']
})
export class CustomizationComponent {
  @Input() currentConfig: any = {};
  @Output() configChange = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  backgroundColor = '#667eea';
  leftImage = '';
  rightImage = '';
  loadingLeft = false;
  loadingRight = false;

  predefinedColors = [
    '#667eea', '#764ba2', '#f093fb', '#4facfe',
    '#43e97b', '#fa709a', '#fee140', '#30cfd0'
  ];

  ngOnInit() {
    this.backgroundColor = this.currentConfig.backgroundColor || '#667eea';
    this.leftImage = this.currentConfig.leftImage || '';
    this.rightImage = this.currentConfig.rightImage || '';
  }

  selectColor(color: string) {
    this.backgroundColor = color;
  }

  onLeftImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.loadingLeft = true;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          this.leftImage = e.target.result;
          this.loadingLeft = false;
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onRightImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.loadingRight = true;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          this.rightImage = e.target.result;
          this.loadingRight = false;
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  clearLeftImage() {
    this.leftImage = '';
  }

  clearRightImage() {
    this.rightImage = '';
  }

  apply() {
    this.configChange.emit({
      backgroundColor: this.backgroundColor,
      leftImage: this.leftImage,
      rightImage: this.rightImage
    });
    this.close.emit();
  }

  cancel() {
    this.close.emit();
  }
}
