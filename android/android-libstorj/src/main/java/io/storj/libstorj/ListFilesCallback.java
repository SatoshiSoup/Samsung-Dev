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
 * <code>listFiles()</code> methods.
 * 
 * @see Storj#listFiles(Bucket, ListFilesCallback)
 * @see Storj#listFiles(String, ListFilesCallback)
 * @see Storj#listFiles(Bucket[], ListFilesCallback)
 * @see Storj#listFiles(String[], ListFilesCallback)
 */
public interface ListFilesCallback {

    /**
     * Called if the files list was retrieved successfully.
     *
     * @param bucketId
     *            the bucket id the received file list applies to
     * @param files
     *            an array of {@link File} objects with the result
     */
    void onFilesReceived(String bucketId, File[] files);

    /**
     * Called if getting the files list finished with error.
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
