import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageCrop from "filepond-plugin-image-crop"
import FilePondPluginImageTransform from "filepond-plugin-image-transform"

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useState } from 'react';

type Props = {}


registerPlugin(FilePondPluginImageCrop, FilePondPluginImagePreview, FilePondPluginImageTransform);

const PhotoUpload = (props: Props) => {

  const [files, setFiles] = useState<any>([])
  return (
    <FilePond
      files={files}
      onupdatefiles={setFiles}
      allowMultiple={false}
      maxFiles={1}
      server="/api"
      name="files"
      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      credits={false}
      allowImageCrop={true}
      imageCropAspectRatio='1:1'
    />
  )
}
export default PhotoUpload