import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { ViewContainerRef } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [CommonModule, OverlayModule, PortalModule, RouterLink],
})
export class HeaderComponent {
  @ViewChild('userMenu') userMenuRef!: TemplateRef<any>;

  constructor(private viewContainerRef: ViewContainerRef) {}

  overlayRef: any;

  openMenu(event: MouseEvent) {
    event.stopPropagation();
    const { Overlay, OverlayPositionBuilder } = require('@angular/cdk/overlay');
    const positionStrategy = new OverlayPositionBuilder()
      .flexibleConnectedTo({ x: event.clientX, y: event.clientY })
      .withPositions([{ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' }]);

    this.overlayRef = new Overlay().create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });

    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());

    const portal = new TemplatePortal(this.userMenuRef, this.viewContainerRef);
    this.overlayRef.attach(portal);
  }
}
