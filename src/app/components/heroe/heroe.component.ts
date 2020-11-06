import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeMOdel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
})
export class HeroeComponent implements OnInit {
  heroe: HeroeMOdel = new HeroeMOdel();

  //step 4:heroeComponent.ts call the service in the constructor
  constructor(private hS: HeroesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.hS.gethHeroeData(id).subscribe((resp: HeroeMOdel) => {
        this.heroe = resp;
        this.heroe.Id = id;
      });
    }
  }
  //this form is the form where i have the inputs data
  save(form: NgForm) {
    if (form.invalid) {
      return;
    }
    Swal.fire({
      titleText: 'wait..',
      allowOutsideClick: false,
      text: 'saving information',
    });
    Swal.showLoading();

    let petition: Observable<any>;
    if (this.heroe.Id) {
      //step5: here with this declation i call the service to conect. createHeroe is declare in the heroeService in services file
      petition = this.hS.updateHeroe(this.heroe);
      // .subscribe((resp) => {
      //   console.log('result of the connection', resp);
      //   //here is the same result where i apply in the step 7 in the service
      //   // this.heroe = resultOfTheService;
      // });
    } else {
      petition = this.hS.createHeroe(this.heroe);
      //the suscribe is to bring the data
      //  .subscribe((resp) => {
      //     console.log(resp);
      //     this.heroe = resp;
      //   });
    }
    petition.subscribe((resp) => {
      Swal.fire({
        title: this.heroe.name,
        text: 'update succes',
      });
    });
  }
}
