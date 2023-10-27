import { styled } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 600px;
  width: 100%;
  transform: translate(-50%, -50%);
  background: ${(p) => p.theme.palette.background.paper};
  overflow: auto;
  max-height: 80vh;
`;

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: any;
}

export default function ModalExtended(props: ModalProps) {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
    >
      <ModalBox>
        {props.children}
      </ModalBox>
    </Modal>
  );
}
