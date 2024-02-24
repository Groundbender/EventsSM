import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageCrop from "filepond-plugin-image-crop"
import FilePondPluginImageTransform from "filepond-plugin-image-transform"

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useState } from 'react';
import { useFireStore } from '../../app/hooks/firestore/useFirestore';
import { auth, storage } from '../../app/config/firebase';
import { createId } from '@paralleldrive/cuid2';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Profile } from '../../app/types/profile';
import { updateProfile } from 'firebase/auth';



registerPlugin(FilePondPluginImageCrop, FilePondPluginImagePreview, FilePondPluginImageTransform);
type Props = {
  profile: Profile,
  setEditMode: (editMode: boolean) => void
}



const PhotoUpload = ({ profile, setEditMode }: Props) => {


  const { update } = useFireStore("profiles");
  const { set } = useFireStore(`profiles/${auth.currentUser?.uid}/photos`);


  const [files, setFiles] = useState<any>([])
  return (
    <FilePond
      files={files}
      onupdatefiles={setFiles}
      allowMultiple={false}
      maxFiles={1}
      server={{
        process: (fieldName, file, metadata, load, error, progress) => {
          const id = createId();
          const storageRef = ref(storage, `${auth.currentUser?.uid}/user_images/${id}`);
          const task = uploadBytesResumable(storageRef, file);
          task.on(
            "state_changed",
            snapshot => {
              progress(true, snapshot.bytesTransferred, snapshot.totalBytes)
            },
            err => {
              error(err.message)
            },
            () => {
              getDownloadURL(task.snapshot.ref).then(async (url) => {
                if (!profile.photoUrl) {
                  await update(profile.id, {
                    photoUrl: url
                  })
                  await updateProfile(auth.currentUser!, {
                    photoURL: url
                  })
                }
                await set(id, {
                  name: file.name,
                  url
                })
                setEditMode(false)
              })
              load(id)
            }



          )
        }
      }}
      name="files"
      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      credits={false}
      allowImageCrop={true}
      imageCropAspectRatio='1:1'
      instantUpload={false}
    />
  )
}
export default PhotoUpload