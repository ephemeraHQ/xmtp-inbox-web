/* eslint-disable class-methods-use-this */
import { ContentTypeId } from "@xmtp/xmtp-js";
import type { ContentCodec, EncodedContent } from "@xmtp/xmtp-js";

export const ContentTypeSnowEffect = new ContentTypeId({
  authorityId: "xmtp.chat",
  typeId: "snowEffect",
  versionMajor: 1,
  versionMinor: 0,
});

export type SnowEffect = {
  messageId: string;
  topic: string;
};

interface MessageIdTracker {
  [key: string]: boolean;
}

export type SnowEffectParameters = Pick<SnowEffect, "messageId" | "topic">;

export class SnowEffectCodec implements ContentCodec<SnowEffect | undefined> {
  private hasRun: MessageIdTracker = {};

  get contentType(): ContentTypeId {
    return ContentTypeSnowEffect;
  }

  encode(content: SnowEffect): EncodedContent<SnowEffectParameters> {
    return {
      type: ContentTypeSnowEffect,
      parameters: {
        messageId: content.messageId,
        topic: content.topic,
      },
      content: new Uint8Array(),
    };
  }

  decode(
    content: EncodedContent<SnowEffectParameters>,
  ): SnowEffect | undefined {
    const { messageId, topic } = content.parameters;

    if (this.hasRun[messageId]) {
      // If it has, don't run it again
      return;
    }

    if (localStorage.getItem("topic") !== topic) {
      // If this message is not part of the current topic, dont run it again
      return;
    }

    // // This block is just a hack until we can filter out certain cached messages from the SDK.
    // // Right now there isn't the option, so they return on a refresh from the cache.
    if (localStorage.getItem(messageId)) {
      return;
    }

    this.hasRun[messageId] = true;
    // Remove after this just gets removed from the cache from the SDK via options (e.g. remove content types of XYZ)
    localStorage.setItem(messageId, "effectAlreadyRun");

    // Create container for the snow effect
    const snowContainer = document.createElement("div");

    // Dynamically add 200 snow divs with randomized styles
    for (let i = 0; i < 150; i++) {
      const snowFlake = document.createElement("div");
      snowFlake.className = "snow";
      snowFlake.style.left = `${Math.random() * 100}vw`;
      snowFlake.style.opacity = `${Math.random()}`;
      snowFlake.style.animationDuration = `${10 + Math.random() * 20}s`; // Random duration between 10s and 30s
      snowFlake.style.animationDelay = `-${Math.random() * 20}s`; // Random delay
      snowContainer.appendChild(snowFlake);
    }

    // Apply CSS
    const style = document.createElement("style");
    style.textContent = `
    body {
      height: 100vh;
      background: radial-gradient(ellipse at bottom, #dee1e3 0%, #090a0f 100%);
      overflow: hidden;
      filter: drop-shadow(0 0 10px white);
    }

    .snow {
      position: absolute;
      width: 10px;
      height: 10px;
      background: white;
      border-radius: 50%;
      bottom: 100%;
      animation: fall linear infinite;
    }

    @keyframes fall {
      to {
        transform: translateY(100vh);
      }
    }
  `;

    // Append style and container to the document
    document.head.appendChild(style);
    document.body.appendChild(snowContainer);
    document.body.style.pointerEvents = "none";

    // Event listener to toggle snowfall animation after 5 seconds
    setTimeout(() => {
      document.head.removeChild(style);
      document.body.removeChild(snowContainer);
      document.body.style.pointerEvents = "auto";
    }, 4000);
  }

  fallback() {
    return undefined;
  }
}
