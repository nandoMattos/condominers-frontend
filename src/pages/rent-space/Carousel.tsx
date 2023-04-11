import styled from "styled-components";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { LeisureSpaceFormat } from "../../helpers/api/leisure-space";

type CarouselProps = {
  setScheduleLoading: React.Dispatch<boolean>;
  spaces: LeisureSpaceFormat[] | undefined;
  selectedSpaceId: number;
  setSelectedSapceId: React.Dispatch<number>;
};

export default function Carousel({
  setScheduleLoading,
  selectedSpaceId,
  setSelectedSapceId,
  spaces,
}: CarouselProps) {
  const carousel = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current?.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  function handleClick(id: number) {
    if (selectedSpaceId !== id) {
      setScheduleLoading(true);
      setSelectedSapceId(id);
    }
  }

  return (
    <CarouselContainer>
      <motion.div whileDrag={{ cursor: "grabbing" }} className="carousel">
        <motion.div
          ref={carousel}
          className="container"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {spaces?.map((s) => (
            <motion.div
              // onClick={() => alert(i.name)}
              className="item"
              onClick={() => handleClick(s.id)}
              key={s.id}
            >
              <Div
                outline={selectedSpaceId === s.id ? "2px solid green" : "none"}
              >
                <h1>{s.name}</h1>
                <img src={s.image_url} alt="picanha" />
                <p>Capacidade:{s.capacity}</p>
                <p>R${(s.daily_rent / 100).toString() + ",00"}/dia</p>
              </Div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </CarouselContainer>
  );
}

const CarouselContainer = styled.div`
  width: 80%;
  height: 300px;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 4px;
  font-family: "Oswald", sans-serif;
  color: black;

  p {
    margin-top: 10px;
    font-size: 25px;
  }

  .carousel {
    /* cursor: grab; */
    height: 100%;
    width: 100%;
    overflow: hidden;
    /* background-color: red; */
  }

  .container {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    /* background-color: blue; */
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  img {
    padding: 10px;
    width: 300px;
    border-radius: 6px;
    height: 50%;
    object-fit: cover;
    border-radius: 12px;
    pointer-events: none;
    cursor: pointer;
  }
`;

const Div = styled.div<{ outline: string }>`
  h1 {
    font-size: 25px;
  }

  p {
    font-size: 20px;
  }

  transition: all 0.1s;
  height: 90%;
  border-radius: 3px;
  outline: ${({ outline }) => outline};
`;
