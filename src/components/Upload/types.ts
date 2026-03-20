export type listType = 'card' | 'text'
export type uploadFileType = 'unknown' | 'pdf' | 'doc' | 'docx' | 'xls' | 'xlsx' | 'ppt' | 'pptx' | 'csv' | 'pages' | 'key' | 'numbers' | 'mp4' | "jpg" | "jpeg" | "png" | "gif" | "webp" | "bmp" | 'zip'
export type uploadFileStatus = 'error' | 'done' | 'uploading'
export interface uploadFile {
  uid: string;
  name: string;
  url?: string;
  status: uploadFileStatus;
  size: number;
  type?: string;
  percent?: number;
  raw?: File
}
export interface uploadProps {
  children?: React.ReactNode;
  className?: string;
  action?: string;
  tip?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  fileList?: uploadFile[];
  listType?: listType;
  multiple?: boolean;
  accept?: string;
  drag?: boolean;
  beforeUpload?: (file: File) => boolean | Promise<File>
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onFailed?: (err: any, file: File) => void;
  onChange?: (file: uploadFile, files: uploadFile[]) => void;
}
export interface draggerProps {
  children: React.ReactNode;
  onFile: (files: FileList) => void
}