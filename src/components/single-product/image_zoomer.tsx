import { useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  padding: 50px;;
  border: 1px solid #00adb7;
  border-radius: 15px;
  :hover {
    box-shadow: 0 14px 24px rgba(0, 0, 0, 0.55), 0 14px 18px rgba(0, 0, 0, 0.55);
  }
`;

const Image = styled.img.attrs((props) => ({
  src: props.src,
  className: "img"
}))``;

const Target = styled(Image)<{ offset: { left: number; top: number }; opacity: number }>`
  position: absolute;
  left: ${(props) => props.offset.left}px;
  top: ${(props) => props.offset.top}px;
  opacity: ${(props) => props.opacity};
  width: 1000px; // Explicitly set the width
  height: 1000px;  // Maintain aspect ratio
`;

export default function ImageZoomer(props: {src: string; alt: string;className?: string; id:string; width:number;}) {
  const sourceRef = useRef<HTMLImageElement | null>(null);
  const targetRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [opacity, setOpacity] = useState(0);
  const [offset, setOffset] = useState({ left: 0, top: 0 });

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!targetRef.current || !sourceRef.current || !containerRef.current) {
      return;
    }

    const targetRect = targetRef.current.getBoundingClientRect();
    const sourceRect = sourceRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const xRatio = (targetRect.width - containerRect.width) / sourceRect.width;
    const yRatio =
      (targetRect.height - containerRect.height) / sourceRect.height;

    const left = Math.max(
      Math.min(e.pageX - sourceRect.left, sourceRect.width),
      0
    );
    const top = Math.max(
      Math.min(e.pageY - sourceRect.top, sourceRect.height),
      0
    );

    setOffset({
      left: left * -xRatio,
      top: top * -yRatio
    });
  };

  return (
    <div className="App">
      <Container
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className="product-page-image-container"
      >
        <Image ref={sourceRef} alt={props.alt || "no alt"} src={props.src||"/product_placeholder.webp"} id="main-img"/>
        <Target
          ref={targetRef}
          alt={props.alt}
          opacity={opacity}
          offset={offset}
          src={props.src}
          id={props.id}
        />
      </Container>
    </div>
  );
}
