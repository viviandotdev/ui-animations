import { Page } from 'framer';
import { motion } from 'framer-motion';
import { useState } from 'react';

const pages = [1, 2, 3, 4, 5];
const indicatorSize = 10;
const indicatorPadding = 10;
const indicatorWidth = pages.length * indicatorSize;
const indicatorPaddingTotal = (pages.length - 1) * indicatorPadding;
const indicatorWidthTotal = indicatorWidth + indicatorPaddingTotal;
const indicatorAlpha = 0.3;

export default function pageIndicators(props) {
  const [current, setCurrent] = useState(0);

  return (
    <div
      style={{
        width: 400,
        height: 400,
        ...props.style,
        display: 'flex',
        placeItems: 'center',
        placeContent: 'center',
      }}
    >
      <Page
        width={150}
        height={150}
        radius={30}
        currentPage={current}
        onChangePage={(current, previous) => setCurrent(current)}
      >
        {pages.map((index) => {
          return (
            <div
              style={{
                width: 150,
                height: 150,
                borderRadius: 30,
                backgroundColor: 'black',
              }}
            />
          );
        })}
      </Page>

      {pages.map((index) => {
        return (
          <motion.div
            style={{
              width: indicatorSize,
              height: indicatorSize,
              borderRadius: '50%',
              backgroundColor: 'black',
              position: 'absolute',
              top: 'calc(50% + 100px)',
              left: `calc(50% + ${index - 1} * ${
                indicatorSize + indicatorPadding
              }px)`,
              x: -indicatorWidthTotal / 2,
            }}
            animate={{
              opacity: current === index - 1 ? 1 : indicatorAlpha,
            }}
            onTap={() => setCurrent(index - 1)}
          />
        );
      })}
    </div>
  );
}
