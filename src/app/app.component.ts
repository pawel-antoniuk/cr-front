import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cr-front';
  links = [
    {
      link: 'upload',
      label: 'Upload code',
    },
    {
      link: 'add-task',
      label: 'New task',
    },
    {
      link: 'edit-task',
      label: 'Edit Task',
    },
    {
      link: 'summary',
      label: 'Execution summary',
    },
  ];
  activeLink = this.links[0];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // this.activeLink = this.links.find(link => link.link === this.router.url) ?? this.links[0];
  }
}
