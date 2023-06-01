import Dexie, { Table } from "dexie";
import { Attachment } from "xmtp-content-type-remote-attachment";

export interface CachedAttachments {
  attachmentObject: Attachment;
  attachmentUrl: string;
  remoteContentUrl: string;
}

export class RemoteAttachmentDb extends Dexie {
  attachments!: Table<CachedAttachments>;

  constructor() {
    super("remoteAttachments");
    this.version(1).stores({
      attachments: "id++, remoteContentUrl, attachmentObject, attachmentUrl",
    });
  }
}

export const db = new RemoteAttachmentDb();
