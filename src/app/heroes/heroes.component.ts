import {Component, OnInit} from '@angular/core';
import {HeroService} from '../hero.service';
import {Hero} from "../hero";
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit{
  heroes: Hero[] = [];
  constructor(private heroService: HeroService) { }
  ngOnInit(): void {
    this.getHeroes();
  }
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }


  applyForm = new FormGroup({
    name: new FormControl(''),
    dob: new FormControl(''),
    description: new FormControl('')
  });
  addWithReactiveForm() {
    let name = (this.applyForm.value.name ?? '').trim();
    let dob = (this.applyForm.value.dob ?? '').trim();
    let description = (this.applyForm.value.description ?? '').trim();
    if (!name) { return; }
    this.heroService.addHero({ name, dob, description } as Hero)
        .subscribe(hero => {
          this.heroes.push(hero);
        });
  }

}
