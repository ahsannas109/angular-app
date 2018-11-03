import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedFiles = null;
  imageSre = null;
  constructor(private http: HttpClient) {
  }
  onFileSelected(event) {
    // console.log(event);
    this.selectedFiles = <File>event.target.files[0];
  }
  onUpload() {
    // this.http is the injected HttpClient
    const uploadData = new FormData();
    uploadData.append('file', this.selectedFiles, this.selectedFiles.name);
    this.http.post('http://35.231.215.152:8080/process', uploadData).subscribe(response => {
      console.log(response); // handle event here
      return this.imageSre  = 'http://35.231.215.152:8080/upload/' + <string> response.result;
      document.getElementById("img_head").style.display = 'none';

    });

  }
}

