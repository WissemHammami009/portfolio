import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reload',
  templateUrl: './reload.component.html',
  styleUrls: ['./reload.component.css']
})
export class ReloadComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    Swal.showLoading(null)
    this.router.navigate(['/dashboard'])
  }

}
