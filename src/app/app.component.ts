import { Component, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AnalysisToolbarComponent } from './components/analysis-toolbar/analysis-toolbar.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cr-front';
  links = [
    {
      link: '/recents',
      label: 'Recents',
      icon: 'campaign'
    },
    {
      link: '/ranking',
      label: 'Ranking',
      icon: 'star'
    },
    {
      link: '/tasks-solutions',
      label: 'Tasks & Solutions',
      icon: 'task'
    },
    {
      link: '/upload-code',
      label: 'Upload Code',
      icon: 'file_upload'
    },
    {
      link: '/create-task',
      label: 'Create Task',
      icon: 'add_task'
    },
    {
      link: '/edit-task',
      label: 'Edit Task',
      icon: 'edit'
    },
    {
      link: '/results',
      label: 'Results',
      icon: 'assessment'
    },
  ];
  activeLink = this.links[0];

  isResultTabActive = false;

  constructor(private router: Router,
    private location: Location) {}

  ngOnInit(): void {
    let currentUrl = this.location.path();
    console.log(currentUrl);
    this.activeLink = this.links.find(link => link.link === currentUrl) ?? this.links[0];
  }
}
