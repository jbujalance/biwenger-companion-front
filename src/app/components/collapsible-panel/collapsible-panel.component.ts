import { Component, Input } from '@angular/core';

@Component({
  selector: 'collapsible-panel',
  templateUrl: './collapsible-panel.component.html',
  styleUrls: ['./collapsible-panel.component.css']
})
export class CollapsiblePanelComponent {

  @Input('isOpen') isOpen: boolean = false;
  @Input('title') title: string;

  public toggle(): void {
    this.isOpen = !this.isOpen;
  }

}
