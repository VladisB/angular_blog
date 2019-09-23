import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {Post} from '../../shared/interfaces';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.sass']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup;
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormGroup(null, Validators.required),
      text: new FormGroup(null, Validators.required),
      author: new FormGroup(null, Validators.required)
    });
  }


  submit() {
    if (this.form.invalid) {
      return;
    }

    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      date: new Date()
    };
  }

}
