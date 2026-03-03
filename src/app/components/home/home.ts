import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonkeyBackgroundComponent } from '../monkey-background/monkey-background';
import { TimerComponent } from '../timer/timer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MonkeyBackgroundComponent, TimerComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  @Input() userName = '';
  @Input() userPhoto = '';
  
  backgroundColor = '#667eea';

  constructor(private cdr: ChangeDetectorRef) {}

  onColorChange(event: any) {
    this.backgroundColor = event.target.value;
    this.cdr.detectChanges();
  }
}
