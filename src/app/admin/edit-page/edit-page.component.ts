import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../shared/posts.service';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {Post} from '../../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.sass']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  post: Post;
  submitted = false;
  uSub: Subscription;

  constructor(
    private postService: PostsService,
    private  route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params.id);
      })
    ).subscribe( (post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      });
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    this.uSub = this.postService.updatePost({
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text
    }).subscribe(() => {
      this.submitted = false;
      this.alertService.success('Post has been updated!');
    });
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }
}
