import { NgModule } from '@angular/core';
import { JsonDiffComponent, JsonDiffDialogService } from './jsonDiffPage.component';
import { LazyComponentDialogService } from 'nmce';


@NgModule({
  declarations: [JsonDiffComponent],
  imports: [
  ],
  exports: [JsonDiffComponent],
  providers: [
    JsonDiffDialogService,
    LazyComponentDialogService
  ]
})
export class NmceJsonDiffModule { }
