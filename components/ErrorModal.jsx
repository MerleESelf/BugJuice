import PropTypes from 'prop-types'
import { Error } from "./Error"
import { Modal } from "./Modal"

export const ErrorModal = ({ isOpen }) => {
  return (
    <Modal isOpen={isOpen}>
      <Error />
    </Modal>
  )
}

ErrorModal.propTypes = {
  isOpen: PropTypes.bool
}
