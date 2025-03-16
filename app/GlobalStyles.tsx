"use client";

import { Global } from "@emotion/react";

export function GlobalStyles() {
  return (
    <Global
      styles={`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html, body {
          width: 100%;
          height: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .infinite-canvas-container {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          touch-action: none;
          position: relative;
          background: #f0f0f0;
        }

        .infinite-canvas {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 50%;
          top: 50%;
          transform-origin: center center;
        }
      `}
    />
  );
}
