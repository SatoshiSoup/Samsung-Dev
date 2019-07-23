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
 * A class representing the keys required for accessing the Storj network:
 * <ul>
 * <li>Satellite address
 * <li>API key
 * <li>Encryption access for encrypting and decrypting the transferred files
 * </ul>
 */
public class Keys {

    private String apiKey;
    private String encryptionAccess;

    /**
     * Constructs a new Keys object with the provided credentials.
     *
     * @param apiKey
     *            an API key
     * @param encryptionAccess
     *            a serialized encryption access
     */
    public Keys(String apiKey, String encryptionAccess) {
        this.apiKey = apiKey;
        this.encryptionAccess = encryptionAccess;
    }

    /**
     * Returns the API key.
     * 
     * @return an API key
     */
    public String getApiKey() {
        return apiKey;
    }

    /**
     * Returns the serialized encryption access.
     * 
     * @return a serialized encryption access
     */
    public String getEncryptionContext() {
        return encryptionAccess;
    }
}
