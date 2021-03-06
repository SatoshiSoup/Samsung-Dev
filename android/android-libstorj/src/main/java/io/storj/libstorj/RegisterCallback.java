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
 * <code>register()</code> method.
 * 
 * @see Storj#register(String, String, RegisterCallback)
 */
public interface RegisterCallback {

    /**
     * Called if registration finished successfully and now the new account is
     * pending confirmation via an activation link.
     * 
     * @param email
     *            the email address that will receive the activation link, same as
     *            the user's email used for the registration
     */
    void onConfirmationPending(String email);

    /**
     * Called if registration finished with error.
     * 
     * @param code
     *            the error code
     * @param message
     *            the error message
     */
    void onError(int code, String message);

}
