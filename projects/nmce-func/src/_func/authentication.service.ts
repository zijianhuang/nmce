import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

/**
 * Login and saving tokens in sessionStorage.
 * App needs to provide constant 'auth.tokenUrl'.
 */
@Injectable()
export class AuthenticationService {
	userName: string;

	constructor(@Inject('auth.tokenUrl') private authUri: string, private http: HttpClient) {
	}

	/**
	 * Login and save tokens to sessionStorage then return an observable.
	 * @param username
	 * @param password
	 */
	login(username: string, password: string) {
		const body = 'username=' + username + '&password=' + password + '&grant_type=password';
		const options = { headers: { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' } };
		return this.http.post<{
			access_token?: string;
			expires?: string;
			expires_in?: number;
			issued?: string;
			token_type?: string;
			username: string;
		}>(this.authUri, body, options)
			.pipe(map(
				response => {
					//sessionStorage.setItem('access_token', response.access_token); The client code is response to doing these.
					//sessionStorage.setItem('expires_in', response.expires_in.toString());
					//sessionStorage.setItem('token_type', response.token_type);
					//sessionStorage.setItem('issued', response.issued);
					//sessionStorage.setItem('expires', response.expires); // often up to 2 weeks by default in Asp.net identity 2.
					this.userName = response.username;
					//APP_STATUSES.userName = this.userName;
					return response;
				}

			));
	}

}
