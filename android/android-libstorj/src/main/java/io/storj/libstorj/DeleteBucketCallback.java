/*
 * Copyright (C) 2017-2018 Kaloyan Raev
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package io.storj.libstorj;

/**
 * Callback interface for receiving the response from the
 * <code>deleteBucket()</code> and <code>deleteBuckets()</code> methods.
 * 
 * @see Storj#deleteBucket(Bucket, DeleteBucketCallback)
 * @see Storj#deleteBucket(String, DeleteBucketCallback)
 * @see Storj#deleteBuckets(Bucket[], DeleteBucketCallback)
 * @see Storj#deleteBuckets(String[], DeleteBucketCallback)
 */
public interface DeleteBucketCallback {

    /**
     * Called if the bucket was deleted successfully.
     * 
     * @param bucketId
     *            the id of the bucket that was deleted
     */
    void onBucketDeleted(String bucketId);

    /**
     * Called if deleting the bucket finished with error.
     * 
     * @param bucketId
     *            the bucket id this error applies to
     * @param code
     *            the error code
     * @param message
     *            the error message
     */
    void onError(String bucketId, int code, String message);

}
