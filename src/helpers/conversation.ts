import {
  updateConversationMetadata,
  type CachedConversation,
} from "@xmtp/react-sdk";
import type Dexie from "dexie";
import type { ETHAddress } from "./string";
import {
  throttledFetchUnsNames,
  throttledFetchEnsAvatar,
  throttledFetchEnsName,
  throttledFetchAddressName,
} from "./string";
import { chunkArray } from "./functions";
import { getWagmiConfig } from "./config";

export type PeerAddressAvatar = string | null;
export type PeerAddressName = string | null;

/**
 * Get the cached name of a conversation's peer address
 *
 * @param conversation The conversation
 * @returns The resolved name of the conversation's peer address
 */
export const getCachedPeerAddressName = (conversation: CachedConversation) =>
  conversation.metadata?.peerAddressName as PeerAddressName;

/**
 * Fetch the resolved name of a conversation's peer address if it's not present
 * in the cache
 *
 * @param conversation The conversation
 * @returns The resolved name of the conversation's peer address
 */
export const fetchPeerAddressName = async (
  conversation: CachedConversation,
) => {
  // first check if the name is cached
  let name = getCachedPeerAddressName(conversation);
  if (!name) {
    name =
      (await throttledFetchAddressName(
        conversation.peerAddress as ETHAddress,
      )) ?? null;
  }
  return name;
};

/**
 * Set the peer address name in a conversation
 *
 * @param name The name for the peer address
 * @param conversation The conversation
 * @param db DB instance
 */
export const setPeerAddressName = async (
  name: string | null,
  conversation: CachedConversation,
  db: Dexie,
) => {
  // store peer address name in conversation metadata
  await updateConversationMetadata(
    conversation.walletAddress,
    conversation.topic,
    "peerAddressName",
    name,
    db,
  );
};

/**
 * Get the cached avatar of a conversation's peer address
 *
 * @param conversation The conversation
 * @returns The avatar of the conversation's peer address
 */
export const getCachedPeerAddressAvatar = (conversation: CachedConversation) =>
  conversation.metadata?.peerAddressAvatar as PeerAddressAvatar;

/**
 * Fetch the avatar of a conversation's peer address if it's not present
 * in the cache
 *
 * @param conversation The conversation
 * @returns The avatar of the conversation's peer address
 */
export const fetchPeerAddressAvatar = async (
  conversation: CachedConversation,
) => {
  // first check if the avatar is cached
  let avatar = getCachedPeerAddressAvatar(conversation);
  if (!avatar) {
    // check for a cached name
    const name = getCachedPeerAddressName(conversation);
    if (name) {
      avatar =
        (await throttledFetchEnsAvatar(getWagmiConfig(), { name })) ?? null;
    }
  }
  return avatar;
};

/**
 * Set the peer address name in a conversation
 *
 * @param avatar The avatar for the peer address
 * @param conversation The conversation
 * @param db DB instance
 */
export const setPeerAddressAvatar = async (
  avatar: string | null,
  conversation: CachedConversation,
  db: Dexie,
) => {
  // store peer address avatar in conversation metadata
  await updateConversationMetadata(
    conversation.walletAddress,
    conversation.topic,
    "peerAddressAvatar",
    avatar,
    db,
  );
};

/**
 * Given a conversation, lookup and update the identity of the conversation
 * peer address.
 */
export const updateConversationIdentity = async (
  conversation: CachedConversation,
  db: Dexie,
) => {
  const name = await fetchPeerAddressName(conversation);
  if (name) {
    await setPeerAddressName(name, conversation, db);

    const avatar = await fetchPeerAddressAvatar(conversation);
    if (avatar) {
      await setPeerAddressAvatar(avatar, conversation, db);
    }
  }
};

/**
 * Given an array of conversations, lookup and update the identities of the
 * conversation peer addresses.
 */
export const updateConversationIdentities = async (
  conversations: CachedConversation[],
  db: Dexie,
) => {
  // key the conversations by peer address for easy lookup
  const conversationsWithoutNameMap = conversations.reduce(
    (result, conversation) => {
      // check if conversation already has peer address name
      const name = getCachedPeerAddressName(conversation);
      // skip conversations with name
      return name
        ? result
        : {
            ...result,
            [conversation.peerAddress]: (
              result[conversation.peerAddress] ?? []
            ).concat(conversation),
          };
    },
    {} as { [peerAddress: string]: CachedConversation[] },
  );
  const addressesWithoutNames = Object.keys(
    conversationsWithoutNameMap,
  ) as ETHAddress[];
  const resolvedAddresses: { [address: string]: string } = {};
  // make sure we have addresses to lookup
  if (addressesWithoutNames.length > 0) {
    // first check for UNS names first since we can do a bulk lookup
    const unsNames = await throttledFetchUnsNames(addressesWithoutNames);
    (Object.entries(unsNames) as [ETHAddress, string][]).forEach(
      ([address, name]) => {
        const addressConversations = conversationsWithoutNameMap[address];
        addressConversations.forEach((convo) => {
          void setPeerAddressName(name, convo, db);
        });
      },
    );
    const unsAddresses = Object.keys(unsNames);
    const unresolvedAddresses: ETHAddress[] = addressesWithoutNames.filter(
      (address) => !unsAddresses.includes(address),
    );
    // since there's no bulk lookup for ENS names, we batch the lookups in
    // groups of 10
    // eslint-disable-next-line no-restricted-syntax
    for (const chunk of chunkArray(unresolvedAddresses, 10)) {
      // this will yield to the event loop to prevent UI blocking
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => {
        requestAnimationFrame(resolve);
      });
      // eslint-disable-next-line no-await-in-loop
      await Promise.all(
        chunk.map(async (address) => {
          const name = await throttledFetchEnsName(getWagmiConfig(), {
            address,
          });
          if (name) {
            resolvedAddresses[address] = name;
            const addressConversations = conversationsWithoutNameMap[address];
            await Promise.all(
              addressConversations.map((convo) =>
                setPeerAddressName(name, convo, db),
              ),
            );
          }
        }),
      );
    }
  }
  // key the conversations by ENS name for easy lookup
  const conversationsWithoutAvatarMap = conversations.reduce(
    (result, conversation) => {
      const name =
        // check cache
        getCachedPeerAddressName(conversation) ??
        // check recently resolved ENS addresses
        resolvedAddresses[conversation.peerAddress];
      // make sure there's a valid ENS name first
      if (!name) {
        return result;
      }
      // check if conversation already has peer identity metadata
      const avatar = getCachedPeerAddressAvatar(conversation);
      // skip conversations with avatar
      return avatar
        ? result
        : {
            ...result,
            [name]: (result[name] ?? []).concat(conversation),
          };
    },
    {} as { [peerName: string]: CachedConversation[] },
  );
  const namesWithoutAvatars = Object.keys(
    conversationsWithoutAvatarMap,
  ) as ETHAddress[];
  // make sure we have addresses to lookup
  if (namesWithoutAvatars.length > 0) {
    // since there's no bulk lookup for ENS avatars, we batch the lookups in
    // groups of 10
    // eslint-disable-next-line no-restricted-syntax
    for (const chunk of chunkArray(namesWithoutAvatars, 10)) {
      // this will yield to the event loop to prevent UI blocking
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => {
        requestAnimationFrame(resolve);
      });
      // eslint-disable-next-line no-await-in-loop
      await Promise.all(
        chunk.map(async (name) => {
          const avatar = await throttledFetchEnsAvatar(getWagmiConfig(), {
            name,
          });
          const addressConversations = conversationsWithoutAvatarMap[name];
          await Promise.all(
            addressConversations.map((convo) =>
              setPeerAddressAvatar(avatar, convo, db),
            ),
          );
        }),
      );
    }
  }
};
