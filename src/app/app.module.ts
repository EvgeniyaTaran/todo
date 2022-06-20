import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoAppComponent } from './components/todo-app/todo-app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import {Effects} from './store/effects/todos.effects';
import { FormsModule } from '@angular/forms';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { storeFreeze} from 'ngrx-store-freeze';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { logger } from './store/reducers/todos.reducer';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './services/todo.service';
import { EffectsModule } from '@ngrx/effects';

const environment = {
  development: true,
  production: false,
};

export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze, logger] : [];

@NgModule({
  declarations: [
    AppComponent,
    TodoAppComponent,
    TodoItemComponent,
    TodoListComponent,
    TodoFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forFeature('todos', reducers),
    EffectsModule.forRoot([Effects]),
    environment.development ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
