import moment from 'moment';

export default class LocalStorageCache {

    constructor() {
        // constants
        this._EXPIRATION_INFINITE = 'infinite';

        // set a bucket default name
        this.setBucket('cache');
    }

    /**
     * Set the bucket name
     * @param bucket
     * @return {LocalStorageCache}
     */
    setBucket(bucket) {
        this._bucket = bucket;
        return this;
    }

    /**
     * Save a cache item in bucket
     * @param cid
     * @param data
     * @param expirationInMinutes
     * @return {LocalStorageCache}
     */
    set(cid, data, expirationInMinutes) {
        const cache = this.all();

        cache[cid] = {
            data:       data,
            expiration: typeof expirationInMinutes === 'number'
                            ? moment().add(expirationInMinutes, 'minutes').format()
                            : this._EXPIRATION_INFINITE
        };

        this._saveCache(cache);

        return this;
    }

    /**
     * Get a cache item from bucket
     * @param cid
     * @return {null|*}
     */
    get(cid) {
        const cache = this.all();

        if (!cache[cid]) {
            return null;
        }

        if (this._isExpired(cache[cid])) {
            this.remove(cid);
            return null;
        }

        return cache[cid].data;
    }

    /**
     * Remove a cache item from bucket
     * @param cid
     * @return {LocalStorageCache}
     */
    remove(cid) {
        const cache = this.all();
        delete cache[cid];
        this._saveCache(cache);
        return this;
    }

    /**
     * Flush all bucket
     * @return {LocalStorageCache}
     */
    flush() {
        localStorage.removeItem(this._getBucket());
        return this;
    }

    /**
     * Flush all cache expired in bucket
     * @return {LocalStorageCache}
     */
    flushExpired() {
        const cache = this.all();
        const cids  = Object.keys(cache);

        if (cids.length > 0) {
            cids.forEach((cid, k) => {
                if (this._isExpired(cache[cid])) {
                    delete cache[cid];
                }
            });

            this._saveCache(cache);
        } else {
            this.flush();
        }

        return this;
    }

    /**
     * Get all cache save in bucket
     * @return {object}
     */
    all() {
        const c = localStorage.getItem(this._getBucket());

        if (!c) {
            return {};
        }

        return JSON.parse(atob(c));
    }

    /**
     * Save cache in bucket
     * @param cache
     * @return {LocalStorageCache}
     * @private
     */
    _saveCache(cache) {
        try {
            localStorage.setItem(this._getBucket(), btoa(JSON.stringify(cache)));
        } catch (e) {
            console.error(e.message);
        }

        return this;
    }

    /**
     * Check if a cache item is expired
     * @param item
     * @return {boolean}
     * @private
     */
    _isExpired(item) {
        if (item.expiration === this._EXPIRATION_INFINITE) {
            return false;
        }

        return parseInt(moment().format('X')) > parseInt(moment(item.expiration).format('X'));
    }

    /**
     * Return the name of the bucket
     * @return {*}
     * @private
     */
    _getBucket() {
        return this._bucket;
    }
}
