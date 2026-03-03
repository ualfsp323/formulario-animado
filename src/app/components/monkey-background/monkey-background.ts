import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Monkey {
  id: number;
  top: string;
  left: string;
  disappear: boolean;
}

@Component({
  selector: 'app-monkey-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monkey-background.html',
  styleUrls: ['./monkey-background.css']
})
export class MonkeyBackgroundComponent implements OnInit, OnDestroy {
  monkeyImage = 'J-men.jpeg';
  useAlternate = false;

  monkeys: Monkey[] = [];

  private readonly monkeyVisibleMs = 10000;
  private readonly monkeyDeflateMs = 1200;
  private cycleTimer: any;
  private replaceTimer: any;

  constructor(private cdr: ChangeDetectorRef) {}

  toggleMonkey() {
    this.useAlternate = !this.useAlternate;
    this.monkeyImage = this.useAlternate ? 'descarga.jpg' : 'J-men.jpeg';
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.startMonkeyCycle();
  }

  ngOnDestroy() {
    this.stopMonkeyCycle();
  }

  private startMonkeyCycle() {
    this.createMonkeys();
    this.scheduleMonkeyCycle();
  }

  private stopMonkeyCycle() {
    if (this.cycleTimer) clearTimeout(this.cycleTimer);
    if (this.replaceTimer) clearTimeout(this.replaceTimer);
  }

  private scheduleMonkeyCycle() {
    if (this.cycleTimer) clearTimeout(this.cycleTimer);
    this.cycleTimer = setTimeout(() => {
      this.cycleMonkeys();
    }, this.monkeyVisibleMs);
  }

  private createMonkeys() {
    const count = Math.floor(Math.random() * 4) + 3;
    this.monkeys = [];
    for (let index = 0; index < count; index++) {
      this.monkeys.push({
        id: Date.now() + index,
        top: Math.random() * 80 + '%',
        left: Math.random() * 80 + '%',
        disappear: false
      });
    }
  }

  private cycleMonkeys() {
    if (!this.monkeys.length) {
      this.scheduleMonkeyCycle();
      return;
    }

    if (this.replaceTimer) clearTimeout(this.replaceTimer);

    this.monkeys = this.monkeys.map(monkey => ({ ...monkey, disappear: true }));
    this.cdr.detectChanges();

    this.replaceTimer = setTimeout(() => {
      this.createMonkeys();
      this.cdr.detectChanges();
      this.scheduleMonkeyCycle();
    }, this.monkeyDeflateMs);
  }

  trackByMonkey(_: number, monkey: Monkey) {
    return monkey.id;
  }
}
