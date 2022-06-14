import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ToDo';

  constructor(private http: HttpClient) { }

  getTestItems() {
    this.http.get('/api/items').subscribe(items => console.log("current items = ", items));
  }

  addNewItem() {
    this.http
      .post('/api/items', this.generateRandomItem())
      .subscribe(item => console.log("create item = ", item));
  }

  private generateRandomItem() {
    return {
      id: Date.now(),
      name: Math.random().toString(36).slice(2, 7)
    }
  }

}
