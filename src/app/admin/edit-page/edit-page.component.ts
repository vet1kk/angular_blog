import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { PostsServices } from '../../shared/posts.services';
import { Subscription, switchMap } from 'rxjs';
import { Post } from '../../shared/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  form!: FormGroup
  post!: Post
  submitted = false
  uSub!: Subscription
  editor = ClassicEditor;

  constructor(private route: ActivatedRoute, private postService: PostsServices, private alert: AlertService) {
  }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params['id'])

      })
    ).subscribe({
      next: (post: Post) => {
        this.post = post
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required),
        })
      }
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true;
    this.uSub = this.postService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,

    }).subscribe(() => {
      this.submitted = false;
      this.alert.success('Пост был обновлен!')
    })
  }
}
