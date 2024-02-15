import { OpenFramesProxy, type FramesApiResponse } from "@xmtp/frames-client";

const proxy = new OpenFramesProxy();

export const readMetadata = async (url: string): Promise<FramesApiResponse> =>
  proxy.readMetadata(url);
