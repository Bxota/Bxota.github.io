import { createBucketClient } from '@cosmicjs/sdk';

export const cosmic = createBucketClient({
  bucketSlug: process.env.VUE_APP_COSMICJS_BUCKET_SLUG,
  readKey: "xpscKyrb5wGbweRHfaXZjPI1xeNuU1kEOGXKMq033skBUOW4qO",
});
