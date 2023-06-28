// TODO: support exposing more fields from packageJson
// Currently we only support version.
// import packageJson from "../../package.json";

export const getAppVersion = () => {
  // const { name, version } = packageJson;
  const { name, version } = {
    name: "xmtp-inbox-web",
    version: "1.0.0",
  };
  return `${name}/${version}`;
};
