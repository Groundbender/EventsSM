import { useAppSelector } from "../../store/store"
import LoginForm from "../../../features/auth/LoginForm"
import RegisterForm from "../../../features/auth/RegisterForm"
const ModalManager = () => {

  const modalLookup = {
    LoginForm,
    RegisterForm
  }



  const { type, data, open } = useAppSelector((state) => state.modals)


  let renderedModal;


  if (open && type) {
    const ModalComponent = (modalLookup as any)[type];
    renderedModal = <ModalComponent data={data} />
  }


  return (
    <>{renderedModal}</>
  )
}
export default ModalManager