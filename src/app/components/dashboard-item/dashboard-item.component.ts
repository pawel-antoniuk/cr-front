import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ComponentRef, Type, ComponentFactoryResolver } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
export interface CloneableDashboardItem<T> {
  cloneComponent(otherComponentInstance: T);
}

export interface ComponentOption {
  id: string;
  name: string;
  iconName: string;
}

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent implements OnInit, AfterViewInit {

  @ViewChild("container", { read: ViewContainerRef }) container: ViewContainerRef;

  public title: string
  public subheader: string;
  public componentRef: ComponentRef<any>;
  public saveable = false;
  public cloneable = false;
  public componentOptions: ComponentOption[] = [];
  public openOption: (optionId: string) => void;

  private componentType: Type<any>;
  private complete: (component: ComponentRef<any>) => void;

  constructor(private resolver: ComponentFactoryResolver,
    private dashboardService: DashboardService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.container.clear();
    const factory = this.resolver.resolveComponentFactory(this.componentType);
    this.componentRef = this.container.createComponent(factory);
    this.cloneable = true;
    this.saveable = typeof this.componentRef.instance.saveComponent === 'function';
    this.componentOptions = this.componentRef.instance.componentOptions;

    this.complete(this.componentRef);
  }

  public setComponent<T>(component: Type<T>,
    complete: (component: ComponentRef<T>) => void) {

    this.componentType = component;
    this.complete = complete;
  }

  onClose() {
    this.dashboardService.removeComponent(this);
  }

  onClone() {
    this.dashboardService.addComponent(this.title, this.componentType, ref => {
      if(typeof this.componentRef.instance.cloneComponent === 'function') {
        this.componentRef.instance.cloneComponent(ref.instance);
      }
    });
  }

  onSave() {
    this.componentRef.instance.saveComponent();
  }

  onStopDragging(event) {
    // event.classList.remove('card-dragging');
    // event.style.transform = '';
    // console.log(event);
  }

  onStartDragging(event) {
    // event.classList.add('card-dragging');
    // console.log(event);
  }

  onOptionSelected(optionId: string) {
      this.componentRef.instance.openComponentOption(this, optionId);
  }
}
