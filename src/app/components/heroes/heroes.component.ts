import { Component, OnInit } from '@angular/core';
import { type } from 'os';
import { HeroeMOdel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { types } from 'util';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: HeroeMOdel[] = [];
  charge = false;
  constructor(private hS: HeroesService) {}

  ngOnInit(): void {
    //the first i need charge in ngOninit
    this.charge = true;

    //call the service of heroes
    this.hS.getHeroes().subscribe((resp) => {
      console.log(resp);
      this.heroes = resp;
      //here i use the load
      this.charge = false;
    });
  }
  deleteHeroe(heroe: HeroeMOdel, i: number) {
    Swal.fire({
      titleText: `are you shure to delete ${heroe.name}`,
      title: 'hi',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        this.heroes.splice(i, 1);
        this.hS
          .deleteHeroe(heroe.Id)
          //for working this  i need call suscribe
          .subscribe();
      }
    });
  }
}
