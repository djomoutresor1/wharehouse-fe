import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../shared/enums/auth-enums';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiServerUrl = environment.apiBaseUrl;
  selectedFile: any;

  constructor(private http: HttpClient) {}

  getUploadImageProfil() {
    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    return this.http.post(
      `${this.apiServerUrl}${Auth.WAREHOUSE_UPLOAD_IMAGE}`,
      uploadData
    );
  }
}
