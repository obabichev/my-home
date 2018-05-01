import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class RestService {

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) {
  }

  private headers() {
    return {headers: {Authorization: `Bearer ${this.authenticationService.getToken()}`}};
  }

  public rget(url: string) {
    return this.http.get(url, this.headers());
  }

  public rpost(url: string, body: any) {
    return this.http.post(url, body, this.headers());
  }

  public rput(url: string, body: any) {
    return this.http.put(url, body, this.headers());
  }

  public rdelete(url: string) {
    return this.http.delete(url, this.headers());
  }

}
