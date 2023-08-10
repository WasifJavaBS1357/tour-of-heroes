import {Component} from '@angular/core';
import {Hero} from '../hero';
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../hero.service";
import {Location} from '@angular/common';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {

  hero: Hero | undefined;
  constructor(
      private route: ActivatedRoute,
      private heroService: HeroService,
      private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  applyForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    dob: new FormControl(''),
    description: new FormControl('')
  });

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
        .subscribe(hero => this.hero = hero);
  }
  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
          .subscribe(() => this.goBack());
    }
  }

  saveWithReactiveFrom(): void{
    console.log("hello");
    const { name, dob, description } = this.applyForm.value;
    const id = this.hero?.id;
    this.heroService.updateHero({ id , name, dob, description } as Hero)
      .subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }


}
