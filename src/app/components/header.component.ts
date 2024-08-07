import { Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
  selector: "app-header",
  template: `
    <mat-toolbar>
        <span>My Finances</span>
    </mat-toolbar>
  `,
  styles: ``,
  standalone: true,
  imports: [MatToolbarModule],
})
export class HeaderComponent {
}