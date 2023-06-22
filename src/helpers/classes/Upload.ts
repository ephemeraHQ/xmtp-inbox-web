import type { Filelike } from "web3.storage";

export default class Upload implements Filelike {
  name: string;

  data: Uint8Array;

  constructor(name: string, data: Uint8Array) {
    this.name = name;
    this.data = data;
  }

  stream(): ReadableStream {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return new ReadableStream({
      start(controller) {
        controller.enqueue(Buffer.from(self.data));
        controller.close();
      },
    });
  }
}
