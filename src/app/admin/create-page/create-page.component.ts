import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Post } from '../../shared/interfaces';
import { PostsServices } from '../../shared/posts.services';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form!: FormGroup
  editor = ClassicEditor;

  constructor(private postService: PostsServices, private  alertService: AlertService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    const post: Post = {
      author: this.form.value.author,
      date: new Date(),
      text: this.form.value.text,
      title: this.form.value.title

    }
    this.postService.create(post).subscribe(()=>{
      this.form.reset();
      this.alertService.success('Пост был создан!')
    })
  }
}
