import { useCallback, useEffect, useRef } from "react"
import { useAppDispatch } from "../../store/store"
import { GenericActions } from "../../store/genericSlice"
import { DocumentData, collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../../config/firebase"
import { toast } from "react-toastify"

type ListenerState = {
  name?: string
  unsubsribe: () => void
  
}

export const useFireStore = <T extends DocumentData>(path: string) => {

  const listenersRef = useRef<ListenerState[]>([])


  useEffect(() => {

      let listenerRefValue: ListenerState[] | null = null;

      if (listenersRef.current) {
        listenerRefValue = listenersRef.current
      }



    return () => {
      if (listenerRefValue) {
        listenerRefValue.forEach(listener => {
          listener.unsubsribe()
        })
      }
    }
  }, [])


  const dispatch = useAppDispatch();



  const loadCollection = useCallback((actions: GenericActions<T>) => {
        dispatch(actions.loading())

        const query = collection(db, path);

        const listener = onSnapshot(query, {
          next: querySnapshot => {
            console.log(listenersRef.current, "2");

              const data: DocumentData[] = []

              if (querySnapshot.empty) {
                  dispatch(actions.success([] as unknown as T))
                  return;
              }

              querySnapshot.forEach((doc) => {
                  data.push({id: doc.id, ...doc.data()})
              })

              dispatch(actions.success(data as unknown as T))
          },
          error: error => {
              dispatch(actions.error(error.message))
              console.log("Collection errpr:", error.message);
              
          }
        })
          console.log(listenersRef.current, "1");
          
          
        listenersRef.current.push({
          name: path,
          unsubsribe: listener
        })

  }, [dispatch, path])



  const loadDocument = useCallback((id: string, actions: GenericActions<T>) => {
      dispatch(actions.loading());
      const docRef = doc(db, path, id);


      const listener = onSnapshot(docRef, {
        next: doc => {
          if (!doc.exists()) {
              dispatch(actions.error("Document does not exist"))
              return 
          }
          dispatch(actions.success({id: doc.id, ...doc.data()  } as unknown as T))
        }
      })

      listenersRef.current.push({
        name: path + "/" + id,
        unsubsribe: listener
      })

  }, [dispatch, path])



  const create = async (data: T) => {
    try {
      const ref = doc(collection(db, path))
      await setDoc(ref, data)
      return ref
      
    } catch (error) {
      console.log(error);
      toast.error((error as  Error).message)
    }
}

const update = async (id: string, data: T) => {
  
  try {
    const docRef = doc(db, path, id)
    return await updateDoc(docRef, data)
    
  } catch (error) {
    console.log(error);
    toast.error((error as  Error).message)
  }
}

const remove = async (id : string) => {
  try {
      return await deleteDoc(doc(db, path, id))
  } catch (error) {
    console.log(error);
    toast.error((error as  Error).message)
  }
}
 

  return {
    loadCollection,
    loadDocument,
    create,
    update,
    remove
  }

}