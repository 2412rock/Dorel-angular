import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-or-edit-servicii',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-or-edit-servicii.component.html',
  styleUrl: './add-or-edit-servicii.component.css'
})
export class AddOrEditServiciiComponent {

  constructor(private router: Router){}

  clickAdd(){
    this.router.navigate(['./account-settings/assign-servicii'])
  }
}
