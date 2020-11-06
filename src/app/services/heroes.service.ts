import { Injectable } from '@angular/core';
import { HeroeMOdel } from '../models/heroe.model';
//step3: import { HttpClient } from '@angular/common/http'; in the service file
import { HttpClient } from '@angular/common/http';
//step6: import mapOperator, the map transform the data i receiv
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private url = 'https://heroes-9c7e0.firebaseio.com';
  constructor(private http: HttpClient) {}

  createHeroe(heroe: HeroeMOdel) {
    //step 4: when i send the link of the service, i need send the body, the body is come from model for example in this case is heroe declared in heroeComponent.ts
    return (
      this.http
        .post(`${this.url}/heroes.json`, heroe)
        //step7: work like a filter to reciev special data
        .pipe(
          //i add any because name give some red color
          map((resultIWantReciev: any) => {
            heroe.Id = resultIWantReciev.name;
            return heroe;
          })
        )
    );
  }
  //this .json i add in the end of the link is only in firebase

  updateHeroe(heroe: HeroeMOdel) {
    const heroeTemp = {
      ...heroe,
    };
    delete heroeTemp.Id;

    return this.http.put(`${this.url}/heroes/${heroe.Id}.json`, heroeTemp);
  }
  getHeroes() {
    return this.http
      .get(`${this.url}/heroes.json`)
      .pipe(map((resp) => this.heroeArray(resp)));
  }
  private heroeArray(heroesObj: Object) {
    const heroes: HeroeMOdel[] = [];
    // console.log('loooooooook', heroesObj);
    if (heroesObj === null) {
      return [];
    }
    Object.keys(heroesObj).forEach((key) => {
      const heroe: HeroeMOdel = heroesObj[key];
      heroe.Id = key;
      heroes.push(heroe);
    });
    return heroes;
  }
}
