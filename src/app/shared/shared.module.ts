import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CKEditorModule,
  ],
  exports: [
    HttpClientModule,
    CKEditorModule,
  ],
  providers: []
})

export class SharedModule {

}
