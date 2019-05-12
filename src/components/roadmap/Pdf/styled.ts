import styled from "@styled";

export const PdfIcon = styled.div`
  position: relative;
  width: 67px;
  height: 67px;
  box-shadow: 0 2px 26px 0 rgba(11, 116, 222, 0.2);
  border-radius: 100%;
  transition: 0.3s all;
  cursor: pointer;

  background: #0b74de;
  color: #fff;

  &:hover,
  &:focus,
  &:active {
    background: #fff;
    color: #0b74de;
  }

  > svg {
    font-size: 36px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  }
`;
