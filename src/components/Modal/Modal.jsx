import PropTypes from 'prop-types';
import { Animate } from "react-simple-animate";

const Modal = ({ children  }) => {
  return (
    <Animate
      play={true}
      duration={.200}
      delay={0}
      start={{ opacity: 0 }}
      end={{ opacity: 1 }}
      easeType="cubic-bezier(0.445, 0.05, 0.55, 0.95)"
    >
      {children}
    </Animate>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Modal