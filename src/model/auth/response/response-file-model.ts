export interface ResponseFileModel {
  fileName: string;
  fileType: string;
  fileSize: number;
  data: Blob;
  lastUploadDate: string;
}
