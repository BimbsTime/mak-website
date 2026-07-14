"use client";

import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, MouseEvent as ReactMouseEvent } from "react";

type DragState = {
  pointerId: number | null;
  startX: number;
  startScrollLeft: number;
  moved: boolean;
};

export function useDragScroll<T extends HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const frameRef = useRef<number | null>(null);
  const dragStateRef = useRef<DragState>({
    pointerId: null,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });
  const [isDragging, setIsDragging] = useState(false);

  const stopDragging = () => {
    dragStateRef.current.pointerId = null;
    setIsDragging(false);

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<T>) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || !ref.current) {
      return;
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: ref.current.scrollLeft,
      moved: false,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<T>) => {
    if (!ref.current || dragStateRef.current.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragStateRef.current.startX;

    if (Math.abs(deltaX) > 6) {
      dragStateRef.current.moved = true;
    }

    const nextScrollLeft = dragStateRef.current.startScrollLeft - deltaX;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.scrollLeft = nextScrollLeft;
      }
      frameRef.current = null;
    });

    event.preventDefault();
  };

  const handlePointerUp = (event: ReactPointerEvent<T>) => {
    if (dragStateRef.current.pointerId !== event.pointerId) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);

    requestAnimationFrame(() => {
      dragStateRef.current.moved = false;
    });

    stopDragging();
  };

  const handlePointerLeave = (event: ReactPointerEvent<T>) => {
    if (dragStateRef.current.pointerId !== event.pointerId) {
      return;
    }

    stopDragging();
  };

  const handleClickCapture = (event: ReactMouseEvent<T>) => {
    if (!dragStateRef.current.moved) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
  };

  return {
    ref,
    isDragging,
    dragHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerLeave: handlePointerLeave,
      onPointerCancel: stopDragging,
      onClickCapture: handleClickCapture,
    },
  };
}
