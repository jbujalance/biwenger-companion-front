/**
 * The HTTP request cache configuration. It contains a boolean indicating if the cache is active or not,
 * and a set of caching configuration for every cached URL.
 */
export interface ICacheConfiguration {
    available: boolean,
    cachedUrls: IUrlCacheConfiguration[]
}

/**
 * A URL cache configuration. Every IUrlCacheConfiguration entry configures the cache of a single URL. 
 */
export interface IUrlCacheConfiguration {
    /** The URL whose reponse must be cached. */
    url: string,
    /** The expiration time of the cache, in seconds. */
    expiration: number
}