import { useState, useEffect } from "react";
import {
  Attachment,
  RemoteAttachment,
  RemoteAttachmentCodec,
} from "xmtp-content-type-remote-attachment";
import React from "react";
import { useClient } from "@xmtp/react-sdk";
import { humanFileSize } from "../../../helpers/attachments";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { db } from "../../../db";

type RemoteAttachmentMessageTileProps = {
  content: RemoteAttachment;
  isSelf: boolean;
  isLoading: boolean;
  isError: boolean;
};

type status = "unloaded" | "loadRequested" | "loading" | "loaded" | "error";

const RemoteAttachmentMessageTile = ({
  content,
  isSelf,
  isLoading,
  isError,
}: RemoteAttachmentMessageTileProps) => {
  const [status, setStatus] = useState<status>("unloaded");
  const [url, setURL] = useState<string | null>(null);

  const { client } = useClient();

  useEffect(() => {
    const handleLoading = async () => {
      if (status === "loadRequested") {
        setStatus("loading");

        if (client) {
          const attachment: Attachment = await RemoteAttachmentCodec.load(
            content,
            client,
          );

          const objectURL = URL.createObjectURL(
            new Blob([Buffer.from(attachment.data)], {
              type: attachment.mimeType,
            }),
          );

          setURL(objectURL);
          setStatus("loaded");
        }

        return;
      }
    };
    handleLoading();
  }, [status, client, content]);

  const load = (inCache = false) => {
    // If not in cache, add to cache
    if (!inCache) {
      db.attachments
        .add({ attachment: content.url })
        .then(() => {
          setStatus("loadRequested");
        })
        .catch((e: Error) => {
          // If error adding to cache, can silently fail and no need to display an error
          console.log("Error caching image --> ", e);
        });
    } else {
      setStatus("loadRequested");
    }
  };

  useEffect(() => {
    // No need to wait
    if (isSelf) {
      load();
    }
    // Check if this is in cache
    db.attachments
      .get({ attachment: content.url })
      .then(() => {
        load(true);
      })
      .catch((e: Error) => {
        // If error retrieving from cache, can silently fail and no need to display an error
        console.log("Error fetching image --> ", e);
      });
  }, []);

  return isError ? (
    <p className="text-red-600 p-0">Sorry, an error occurred.</p>
  ) : (
    <div>
      {status === "loading" || isLoading ? "Loading…" : ""}
      {url ? (
        <Zoom>
          <img
            src={url}
            className="max-h-80 rounded-lg"
            alt={content.filename}
          />
        </Zoom>
      ) : null}
      {status !== "loaded" && !isSelf ? (
        <small>
          {content.filename} - {humanFileSize(content.contentLength)}
          {
            <button onClick={() => load(false)} type="button">
              - Click to Load
            </button>
          }
        </small>
      ) : null}
    </div>
  );
};

export default RemoteAttachmentMessageTile;
