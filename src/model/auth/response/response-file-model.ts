export interface ResponseFileModel {
  fileName: string;
  fileType: string;
  imageType: string;
  fileSize: number;
  data: Blob;
  lastUploadDate: string;
}
