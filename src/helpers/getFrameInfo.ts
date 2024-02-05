const BUTTON_PREFIX = "fc:frame:button:";
const IMAGE_PREFIX = "fc:frame:image";
const POST_URL_PREFIX = "fc:frame:post_url";
const TITLE_PREFIX = "og:title";

export function getFrameInfo(extractedTags: Record<string, string>) {
  const buttons: string[] = [];
  let image = "";
  let postUrl = "";
  let title = "";
  for (const key in extractedTags) {
    if (key) {
      if (key.startsWith(BUTTON_PREFIX)) {
        const buttonIndex = parseInt(key.replace(BUTTON_PREFIX, ""), 10);
        buttons[buttonIndex] = extractedTags[key];
      }
      if (key.startsWith(IMAGE_PREFIX)) {
        image = extractedTags[key];
      }
      if (key.startsWith(POST_URL_PREFIX)) {
        postUrl = extractedTags[key];
      }
      if (key.startsWith(TITLE_PREFIX)) {
        title = extractedTags[key];
      }
    }
  }
  return {
    buttons,
    image,
    postUrl,
    title,
  };
}
