import { styled, Box } from '@mui/material';

const Balloon = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100% - 40px);
  padding: 10px 20px;
  min-height: 26px;
  word-wrap: break-word;
  border-radius: 25px;
  color: ${(p) => p.theme.palette.background.paper};
  background: ${(p) => p.theme.palette.primary.dark};
  align-self: flex-start;
  &:before, &:after {
    position: absolute;
    content: "";
    bottom: 0;
    height: 25px;
  }
  &:before {
    left: -7px;
    width: 20px;
    border-bottom-right-radius: 16px 14px;
    background-color: ${(p) => p.theme.palette.primary.dark};
  }
  &:after {
    left: -26px;
    width: 26px;
    border-bottom-right-radius: 10px;
    background-color: ${(p) => p.theme.palette.background.paper};
 }`;

export default Balloon;
