import { useState, useEffect } from "react";
import {
  Attachment,
  RemoteAttachment,
  RemoteAttachmentCodec,
} from "../../../attachments";
import React from "react";
import { useClient } from "@xmtp/react-sdk";
import { humanFileSize } from "../../../helpers/attachments";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { db } from "../../../db";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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

          db.attachments
            .add({
              contentURL: content.url,
              filename: attachment.filename,
              mimetype: attachment.mimeType,
              contentDataURL: objectURL,
            })
            .then(() => {
              setURL(objectURL);
              setStatus("loaded");
            })
            .catch((e: Error) => {
              // If error adding to cache, can silently fail and no need to display an error
              console.log("Error caching image --> ", e);
              setURL(objectURL);
              setStatus("loaded");
            });
        }

        return;
      }
    };
    handleLoading();
  }, [status, client, content]);

  const load = (inCache = false) => {
    // If not in cache, run handleLoading
    if (!inCache) {
      setStatus("loadRequested");
    }
  };

  useEffect(() => {
    // Check if this is in cache
    db.attachments
      .get({ contentURL: content.url })
      .then((attachment) => {
        if (attachment?.contentDataURL) {
          setURL(attachment.contentDataURL);
          setStatus("loaded");
        } else {
          if (isSelf) {
            load();
          }
        }
      })
      .catch(() => {
        // If error retrieving from cache, can silently fail and no need to display an error
        // Still load if it's own images
        if (isSelf) {
          load();
        }
      });
  }, []);

  return isError ? (
    <p className="text-red-600 p-0">{t("status_messaging.error_1_header")}</p>
  ) : (
    <div>
      {status === "loading" || isLoading ? t("status_messaging.loading") : ""}
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
              {`- ${t("messages.attachment_cta")}`}
            </button>
          }
        </small>
      ) : null}
    </div>
  );
};

export default RemoteAttachmentMessageTile;
