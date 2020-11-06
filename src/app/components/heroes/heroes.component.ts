import { Component, OnInit } from '@angular/core';
import { HeroeMOdel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: HeroeMOdel[] = [];
  constructor(private hS: HeroesService) {}

  ngOnInit(): void {
    //call the service of heroes
    this.hS.getHeroes().subscribe((resp) => {
      console.log(resp);
      this.heroes = resp;
    });
  }
}
