import { Component, OnInit } from '@angular/core';
import words from './words.json'
@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {
  words:any = words
  constructor() { }

  ngOnInit(): void {
  }

}
