import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonkeyBackgroundComponent } from '../monkey-background/monkey-background';
import { TimerComponent } from '../timer/timer';
import { CustomizationComponent } from '../customization/customization';
import { GamesComponent } from '../games/games';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MonkeyBackgroundComponent, TimerComponent, CustomizationComponent, GamesComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  @Input() userName = '';
  @Input() userPhoto = '';
  
  showCustomization = false;
  showGames = false;
  backgroundColor = '#667eea';
  leftImage = '';
  rightImage = '';
  profileImage = '';

  toggleCustomization() {
    this.showCustomization = !this.showCustomization;
  }

  toggleGames() {
    this.showGames = !this.showGames;
  }

  onCustomizationChange(config: any) {
    this.backgroundColor = config.backgroundColor;
    this.leftImage = config.leftImage;
    this.rightImage = config.rightImage;
    if (config.profileImage) {
      this.userPhoto = config.profileImage;
    }
  }
}
