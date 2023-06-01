import Dexie, { Table } from "dexie";

export class RemoteAttachmentDb extends Dexie {
  attachments!: Table<{ attachment: string }>;

  constructor() {
    super("remoteAttachments");
    this.version(1).stores({
      attachments: "++id, attachment", // Primary key and indexed props
    });
  }
}

export const db = new RemoteAttachmentDb();
