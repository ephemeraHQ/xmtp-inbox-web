import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Conversation: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    let recipient = window.location.pathname.split("/").slice(-1)[0];
    if (!recipient) {
      router.push("/");
    }
  }, [window.location.pathname]);

  return <div />;
};

export default Conversation;
