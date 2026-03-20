import { useRef, useState, type ChangeEvent } from "react";
import axios from "axios";
import { type uploadProps, type uploadFile } from "./types";
import Dragger from "./dragger";
const CardEl = (props: { data: uploadFile; onRemove: () => void }) => {
  const { data } = props;
  const baseStyle =
    "w-22 h-22 p-1.5 border-1 border-neutral-300 rounded-xl cursor-pointer grid place-items-center";
  const getFileType = (type: string) => {
    const fileTypeMap: Record<string, string[]> = {
      word: ["doc", "docx"],
      excel: ["xls", "xlsx"],
      ppt: ["ppt", "pptx"],
      pdf: ["pdf"],
      csv: ["csv"],
      pages: ["pages"],
      key: ["key"],
      numbers: ["numbers"],
      mp4: ["mp4"],
      pic: ["jpg", "jpeg", "png", "gif", "webp", "bmp"],
      zip: ["zip"],
    };
    let result = "unknown";
    Object.keys(fileTypeMap).forEach((item: string) => {
      if (fileTypeMap[item].includes(type)) {
        result = item;
      }
    });
    return result;
  };
  const RenderCardError = (
    <div className={`${baseStyle} shadow-error bg-danger-100`}>
      <Icon className="animate-pulse" name="err" color="#c67c7b" size={32} />
    </div>
  );
  const RenderCardUploading = (
    <div className={`${baseStyle} relative shadow-warning`}>
      <div className="absolute p-1.5 w-full h-full ">
        <div className="w-full h-full relative overflow-hidden rounded-xl">
          {getFileType(data.type!) === "pic" ? (
            <img className="w-full h-full rounded-xl" src={data.url} />
          ) : (
            <Icon name={getFileType(data.type!)} size={48} />
          )}
        </div>
      </div>
      <Icon className="animate-spin" name="loading" size={32} />
      <div className="absolute w-full h-full bg-disabled opacity-40"></div>
    </div>
  );
  if (data.status === "error") return RenderCardError;
  if (data.status === "uploading") return RenderCardUploading;
  return (
    <div className={`${baseStyle} shadow-success`}>
      {getFileType(data.type!) === "pic" ? (
        <img className="w-full h-full rounded-xl" src={data.url} />
      ) : (
        <Icon name={getFileType(data.type!)} size={48} />
      )}
    </div>
  );
};
const TextEl = (props: { data: uploadFile; onRemove: () => void }) => {
  const { data, onRemove } = props;
  const formateSize = (size: number) => {
    return Math.round(size / 1024) + "MB";
  };
  const styleMap = {
    done: "bg-success-100 text-success-700 border-success-500 border-l-6",
    uploading: "bg-warning-100 text-warning-700 border-warning-500 border-l-6",
    error: "bg-danger-100 text-danger-700 border-danger-500 border-l-6",
  };
  return (
    <div
      className={`${styleMap[data.status]} group px-3 py-1 mb-2 flex justify-between items-center`}>
      <div className="text-ellipsis">
        <span>{data.name}</span>
        <span className="ml-2 text-sm text-neutral-400">({formateSize(data.size)})</span>
      </div>
      {data.status === "uploading" && (
        <Progress width={300} variant="warning" percentage={data.percent!} />
      )}
      <div className="opacity-0 group-hover:opacity-100 cursor-pointer flex gap-2">
        {data.status === "done" && (
          <div onClick={onRemove}>
            {" "}
            <Icon name="download" color="#6a8ca0" />
          </div>
        )}
        {data.status !== "uploading" && (
          <div onClick={onRemove}>
            <Icon name="delete" color="#c67c7b" />
          </div>
        )}
      </div>
    </div>
  );
};
export const Upload: React.FC<uploadProps> = (props) => {
  const {
    className,
    style,
    action = "",
    fileList = [],
    listType = "text",
    children,
    tip = "",
    multiple,
    accept,
    drag,
    beforeUpload,
    onProgress,
    onSuccess,
    onFailed,
    onChange,
  } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [curFileList, setCurFileList] = useState<uploadFile[]>(fileList);
  const post = (file: File) => {
    const nameTemp = file.name.split(".");
    let _file: uploadFile = {
      uid: Date.now() + "upload-file",
      status: "uploading",
      name: file.name,
      size: file.size,
      type: nameTemp[nameTemp.length - 1],
      percent: 0,
      raw: file,
    };
    if (listType === "text") {
      setCurFileList([...curFileList, _file]);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (val: ProgressEvent<FileReader>) => {
        _file.url = val.target?.result as string;
        setCurFileList([...curFileList, _file]);
      };
    }
    const formData = new FormData();
    formData.append(file.name, file);
    axios
      .post(action, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e: any) => {
          let percentage = Math.round((e.loaded * 100) / e.total!) || 0;
          if (percentage < 100) {
            setCurFileList((prev) => {
              if (prev.findIndex((item) => item.uid === _file.uid) !== -1) {
                return [
                  ...prev.filter((item) => item.uid !== _file.uid),
                  {
                    ..._file,
                    status: "uploading",
                    percent: percentage,
                  },
                ];
              }
              return prev;
            });
            onProgress?.(percentage, file);
          }
        },
      })
      .then((resp) => {
        setCurFileList((prev) => {
          if (prev.findIndex((item) => item.uid === _file.uid) !== -1) {
            return [
              ...prev.filter((item) => item.uid !== _file.uid),
              {
                ..._file,
                status: "done",
              },
            ];
          }
          return prev;
        });
        onSuccess?.(resp.data, file);
      })
      .catch((err) => {
        setCurFileList((prev) => {
          if (prev.findIndex((item) => item.uid === _file.uid) !== -1) {
            return [
              ...prev.filter((item) => item.uid !== _file.uid),
              {
                ..._file,
                status: "error",
              },
            ];
          }
          return prev;
        });
        onFailed?.(err, file);
      })
      .finally(() => {
        onChange?.(_file, curFileList);
      });
  };
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };
  const handleBtnClick = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    uploadFiles(files);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleFileRemove = (id: string) => {
    const file = curFileList.find((item) => item.uid === id);
    const newList = curFileList.filter((item) => item.uid !== id);
    setCurFileList(newList);
    onChange?.(file!, newList);
  };
  return (
    <div className={`${className}`} style={style}>
      {listType === "card" ? (
        <div className="flex flex-wrap gap-2">
          {curFileList.map((item) => (
            <CardEl key={item.uid} data={item} onRemove={() => handleFileRemove(item.uid)} />
          ))}
          <div
            className="w-22 h-22 p-2 border-1 border-neutral-300 rounded-xl grid place-content-center cursor-pointer"
            onClick={handleBtnClick}>
            <Icon name="add" />
          </div>
        </div>
      ) : (
        <div>
          {drag ? (
            <div onClick={handleBtnClick}>
              <Dragger onFile={uploadFiles}>{children}</Dragger>
            </div>
          ) : (
            <div onClick={handleBtnClick}>{children}</div>
          )}
          {tip !== "" && <div className="my-2 text-neutral-400">{tip}</div>}
          {curFileList.map((item) => (
            <TextEl key={item.uid} data={item} onRemove={() => handleFileRemove(item.uid)} />
          ))}
        </div>
      )}
      <input
        ref={fileInputRef}
        style={{ display: "none" }}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleFileChange}
      />
    </div>
  );
};
