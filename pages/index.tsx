import { TouchEventHandler, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Gallery: React.FC = () => {
  const images = [
    "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
    "https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80",
    "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80",
    "https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80",
    "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
    "https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80",
    "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80",
    "https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80",
    "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
    "https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80",
    "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80",
    "https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80",
    "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
    "https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80",
    "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80",
    "https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [value, setValue] = useState("100vh");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const previewTouchStartX = useRef(0);
  const previewTouchEndX = useRef(0);

  const [dragDistance, setDragDistance] = useState(0);

  const ITEM_WIDTH = 40;
  const FOCUSED_ITEM_WIDTH = 71.12;
  const ITEM_MARGIN_X = 2;

  useEffect(() => {
    setValue(`${window.innerHeight}px`);
  }, [setValue]);

  const handleTouchStart: TouchEventHandler = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove: TouchEventHandler = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd: TouchEventHandler = (e) => {
    if (touchStartX.current - touchEndX.current > 45) {
      setCurrentIndex((currentIndex) =>
        currentIndex < images.length - 1 ? currentIndex + 1 : currentIndex
      );
    } else if (touchStartX.current - touchEndX.current < -45) {
      setCurrentIndex((currentIndex) =>
        currentIndex > 0 ? currentIndex - 1 : currentIndex
      );
    }
  };

  const handlePreviewTouchStart: TouchEventHandler = (e) => {
    previewTouchStartX.current = e.targetTouches[0].clientX;
  };

  const getShift = (diff: number = 0) => {
    return (
      FOCUSED_ITEM_WIDTH / 2 +
      (ITEM_WIDTH + ITEM_MARGIN_X * 2) * (currentIndex + diff)
    );
  };

  const shouldChangeIndex = () => {
    return (
      getShift() + dragDistance >= getShift(1) ||
      getShift() + dragDistance <= getShift(-1)
    );
  };

  const handlePreviewTouchMove: TouchEventHandler = (e) => {
    if (previewTouchStartX.current === 0) {
      previewTouchStartX.current = e.targetTouches[0].clientX;
    }
    previewTouchEndX.current = e.targetTouches[0].clientX;
    setDragDistance(previewTouchStartX.current - previewTouchEndX.current);
  };
  const handlePreviewSwipe = () => {
    if (dragDistance > 40) {
      setCurrentIndex((currentIndex) =>
        currentIndex < images.length - 1 ? currentIndex + 1 : currentIndex
      );
    } else if (dragDistance < -40) {
      setCurrentIndex((currentIndex) =>
        currentIndex > 0 ? currentIndex - 1 : currentIndex
      );
    }
    setDragDistance(0);
    previewTouchStartX.current = 0;
    previewTouchEndX.current = 0;
  };

  useEffect(() => {
    if (shouldChangeIndex()) {
      handlePreviewSwipe();
    }
  }, [dragDistance, shouldChangeIndex, handlePreviewSwipe]);

  return (
    <Container value={value} ref={(ref) => (containerRef.current = ref)}>
      <Slider
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        // @ts-ignore
        translate={
          // @ts-ignore
          containerRef?.current?.getBoundingClientRect().width < 640
            ? `${100 * currentIndex}vw`
            : `${100 * currentIndex}vw`
        }
      >
        {images.map((image) => (
          <Slide key={image} imageUrl={image} />
        ))}
      </Slider>
      <Preview
        onTouchStart={handlePreviewTouchStart}
        onTouchMove={handlePreviewTouchMove}
        onTouchEnd={() => setDragDistance(0)}
        style={{
          transform: `translateX(-${
            FOCUSED_ITEM_WIDTH / 2 +
            (ITEM_WIDTH + ITEM_MARGIN_X * 2) * currentIndex +
            dragDistance
          }px)`,
        }}
      >
        <div
          style={{
            width:
              // @ts-ignore
              containerRef?.current?.getBoundingClientRect().width < 640
                ? "50vw"
                : "50vw",
            // 320px
            height: "40px",
            flexGrow: 1,
            flexShrink: 0,
          }}
        />
        {images.map((image, index) => (
          <PreviewItem
            onClick={() => setCurrentIndex(index)}
            key={`${image}–––${index}`}
            imageUrl={image}
            isFocused={currentIndex === index}
          />
        ))}
      </Preview>
      <FocusDot />
      {/* <TempText>{value1}</TempText> */}
    </Container>
  );
};

const FocusDot = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: white;
`;

const Container = styled.div<{ value: any }>`
  position: relative;
  margin: auto;
  background-color: #000;
  height: ${({ value }) => value};
  width: min(110vw, 100vw);
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const Slider = styled.div<{ translate: string }>`
  transform: ${({ translate }) => `translate(-${translate})`};
  transition: transform 350ms ease;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;
`;

const Slide = styled.div<{ imageUrl: string }>`
  width: min(110vw, 100vw);
  height: min(60vw, 56.25vw);
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Preview = styled.div`
  position: absolute;
  bottom: 20px;
  transition: transform 350ms ease;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 4px 0;
  width: 100%;
  overflow: visible;
`;

const PreviewItem = styled.div<{ imageUrl: string; isFocused: boolean }>`
  transition: aspect-ratio 350ms ease;
  height: 40px;
  aspect-ratio: ${({ isFocused }) => (isFocused ? 16 / 9 : 1)};
  margin: 0 2px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 6px;
`;

export default Gallery;
