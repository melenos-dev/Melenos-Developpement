import { motion } from "framer-motion";
import styled from "styled-components";

const Sbutton = styled(motion.button)`
  ${(props) => props.css}
  ${(props) =>
    props.isselected
      ? "box-shadow: 0 0 3px #0f2f98; border:3px solid white"
      : ""}
`;

export default function Button({
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  css,
  isSelected,
}) {
  return (
    <Sbutton
      css={css}
      isselected={isSelected}
      whileHover={{
        scale: 1.3,
        color: "#1a192a",
        background: "transparent",
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0 }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Sbutton>
  );
}
