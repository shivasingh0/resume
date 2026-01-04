import NodeCache from "node-cache";

const globalCache = new NodeCache({ stdTTL: 60 * 60 * 24 });

export default globalCache;
