import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsServices } from '../shared/posts.services';
import { Observable, switchMap } from 'rxjs';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$!: Observable<Post>

  constructor(private route: ActivatedRoute, private postService: PostsServices) {
  }

  ngOnInit(){
    this.post$ = this.route.params.pipe(switchMap((params: Params)=>{
      return this.postService.getById(params['id'])
    }))
  }

}
