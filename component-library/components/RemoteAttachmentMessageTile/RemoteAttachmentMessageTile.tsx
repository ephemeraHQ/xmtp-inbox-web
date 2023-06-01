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

  function load() {
    setStatus("loadRequested");
  }

  useEffect(() => {
    // No need to wait
    if (isSelf) {
      load();
    }
  }, []);

  return isError ? (
    <p className="text-red-600 p-0">Sorry, an error occurred.</p>
  ) : (
    <div>
      {status === "loading" || isLoading ? "Loading…" : ""}
      {url ? (
        <Zoom>
          <img src={url} className="max-h-80 rounded-lg" />
        </Zoom>
      ) : null}
      {status !== "loaded" && !isSelf ? (
        <small>
          {content.filename} - {humanFileSize(content.contentLength)}
          {
            <button onClick={load} type="button">
              - Click to Load
            </button>
          }
        </small>
      ) : null}
    </div>
  );
};

export default RemoteAttachmentMessageTile;
