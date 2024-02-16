import { getButtonIndex, mediaUrl } from "./openFrames";

const BUTTON_PREFIX = "fc:frame:button:";
const IMAGE_PREFIX = "fc:frame:image";
const POST_URL_PREFIX = "fc:frame:post_url";
const TITLE_PREFIX = "og:title";

const ALLOWED_ACTIONS = ["post", "post_redirect", "link", "mint"] as const;

export type FrameButton = {
  text?: string;
  action?: (typeof ALLOWED_ACTIONS)[number];
  target?: string;
};

function addButtonTag(
  existingButtons: FrameButton[],
  key: string,
  value: string,
): FrameButton[] {
  const buttons = existingButtons;
  const buttonIndex = getButtonIndex(key);
  if (buttonIndex) {
    buttons[buttonIndex] = buttons[buttonIndex] || {};
    if (
      key.endsWith(":action") &&
      ALLOWED_ACTIONS.includes(value as (typeof ALLOWED_ACTIONS)[number])
    ) {
      buttons[buttonIndex].action = value as (typeof ALLOWED_ACTIONS)[number];
    } else if (key.endsWith(":target")) {
      buttons[buttonIndex].target = value;
    } else if (key.endsWith(buttonIndex.toString())) {
      buttons[buttonIndex].text = value;
    }
  }
  return buttons;
}

export function getFrameInfo(extractedTags: Record<string, string>) {
  let buttons: FrameButton[] = [];
  let image = "";
  let postUrl = "";
  let title = "";
  for (const key in extractedTags) {
    if (key) {
      if (key.startsWith(BUTTON_PREFIX)) {
        buttons = addButtonTag(buttons, key, extractedTags[key]);
      }
      if (key.startsWith(IMAGE_PREFIX)) {
        const imageUrl = extractedTags[key];
        image = imageUrl.startsWith("data:")
          ? extractedTags[key]
          : mediaUrl(imageUrl);
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
    buttons: buttons.filter((b) => b),
    image,
    postUrl,
    title,
  };
}
