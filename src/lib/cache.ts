import NodeCache from "node-cache";

const globalCache =
  global.chatCache || new NodeCache({ stdTTL: 60 * 60 * 24 });

if (!global.chatCache) {
  global.chatCache = globalCache;
}

export default globalCache;
