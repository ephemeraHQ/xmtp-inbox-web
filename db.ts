import Dexie, { Table } from "dexie";

export interface CachedAttachments {
  // Used as key
  contentURL: string;
  // Below fields come directly from the attachment data
  filename: string;
  mimetype: string;
  // Derived from the attachment data
  contentDataURL: string;
}

export class RemoteAttachmentDb extends Dexie {
  attachments!: Table<CachedAttachments>;

  constructor() {
    super("remoteAttachments");
    this.version(1).stores({
      attachments: "id++, contentURL, filename, mimetype, contentDataURL",
    });
  }
}

export const db = new RemoteAttachmentDb();
