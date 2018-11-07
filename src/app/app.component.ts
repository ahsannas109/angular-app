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

    this.http.post('http://35.231.215.152:8080/process', uploadData)
      .subscribe((response: any) => {
        document.getElementById("detect").style.display ='block';
      // console.log(response); // handle event here

      this.imageSre  = 'http://35.231.215.152:8080/upload/' + <string> response.result;


    }, error => {
        alert('Corrupt image uploaded, please upload correct image')
        console.log('oops', error);
        this.errorMessage = 'the file uploaded is corrupted, make sure to upload a file of valid format';
        document.getElementById("error").style.display ='block';
      });


  }
}

