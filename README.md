
# Local Storage Cache

Npm module for use the local storage as a cache.

[![Version](https://img.shields.io/npm/v/@dsabre/local-storage-cache?style=for-the-badge)](https://www.npmjs.com/package/@dsabre/local-storage-cache)
[![License: MIT](https://img.shields.io/npm/l/@dsabre/local-storage-cache?registry_uri=https%3A%2F%2Fregistry.npmjs.org&style=for-the-badge)](https://github.com/dsabre/local-storage-cache/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dw/@dsabre/local-storage-cache?style=for-the-badge)](https://www.npmjs.com/package/@dsabre/local-storage-cache)
[![GitHub issues](https://img.shields.io/github/issues-raw/dsabre/local-storage-cache?style=for-the-badge)](https://github.com/dsabre/local-storage-cache/issues)
[![Dependencies](https://img.shields.io/librariesio/release/npm/@dsabre/local-storage-cache?style=for-the-badge)](https://www.npmjs.com/package/@dsabre/local-storage-cache)


## Dependencies
[Moment.js](https://momentjs.com/)


## Installation

```bash
  npm i @dsabre/local-storage-cache
```
    
    
## Methods
The class exposes these methods:

#### `setBucket(bucketName: string)`
Set the bucket name for the cache, if not used the default bucket name cache is used

---

#### `set(cid: string, value: any, expirationInMinutes: number)`
Set a cache item in bucket.
- **cid**: is the cache id for this item,
- **value**: contain what you want to be saved,
- **expirationInMinutes**: pass here the amount of minutes while you cache item is valid.

---

#### `get(cid: string)`
Get a cache item from bucket.
- **cid**: is the cache id for this item.

---

#### `remove(cid: string)`
Remove a cache item from bucket.
- **cid**: is the cache id for this item.

---

#### `flush()`
Flush the entire bucket from local storage.

---

#### `flushExpired()`
Flush expired items from bucket.


## Thanks

This class is inspired by:

[lscache](https://www.npmjs.com/package/lscache)


## License

[MIT](https://choosealicense.com/licenses/mit/)
