import React, { useState, useCallback, useThrottled, useEffect } from "react";
import Rectangle from "../drawableComponents/Rectangle";

const MAX_ZOOM = 4;
const MIN_ZOOM = 0.3;
const ZOOM_INCREMENT = 0.25;

export default function Canvas({ objects }) {
  const [zoom, setZoom] = useState(1.5);
  const [dragging, setDragging] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(50);
  const [relativeTop, setRelativeTop] = useState(0);
  const [relativeLeft, setRelativeLeft] = useState(0);
  const [windowWidth, setWindowWidth] = useState(Number(window.innerWidth));
  const [windowHeight, setWindowHeight] = useState(Number(window.innerHeight));

  const zoomInOutMouseWheel = useCallback((e) => {
    const newzoom = zoom - e.deltaY * 0.001;
    setZoom(Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, newzoom)));
  }, [zoom]);

  const mouseDown = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.button !== 0) {
      return; // Should only run code from left mouse click
    }
    // console.log("mouseDown", e.pageX, e.pageY, e);
    setDragging(true);
    setRelativeLeft(e.pageX - left);
    setRelativeTop(e.pageY - top);
  }, [left, top]);

  const mouseUp = useCallback((e) => {
    // console.log("mouseUp");
    e.stopPropagation();
    e.preventDefault();
    setDragging(false);
  }, []);

  const moveMouse = useCallback((e) => {
    // console.log("moveMouse");
    e.stopPropagation();
    e.preventDefault();
    if (!dragging) {
      return;
    }
    setLeft(e.pageX - relativeLeft);
    setTop(e.pageY - relativeTop);
  }, [dragging]);

  useEffect(() => {
    // console.log(left, top, dragging);

    document.addEventListener('mousemove', moveMouse);
    document.addEventListener('mouseup', mouseUp);
    // window.addEventListener('resize', updateWindowDimensions);
    return () => {
      document.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('mouseup', mouseUp);
      // window.removeEventListener('resize', updateWindowDimensions);
    };
  }, [moveMouse, mouseUp, mouseDown]);

  return (
    <div className="scrollable-image">
      <svg className="image"
        viewBox={`${-left} ${-top} ${windowWidth} ${windowHeight}`}
        onWheel={zoomInOutMouseWheel}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onMouseMove={moveMouse}>
        <g transform={`scale(${zoom})`}>
          {objects}
        </g>
      </svg>
    </div>
  );
}