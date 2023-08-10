import {Component} from '@angular/core';
import {Hero} from '../hero';
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../hero.service";
import {Location} from '@angular/common';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {

  hero: Hero | undefined;
  applyForm: FormGroup | undefined;
  constructor(
      private route: ActivatedRoute,
      private heroService: HeroService,
      private fb: FormBuilder,
      private location: Location,
  ) {
  }

  initForm():void{
    // console.log(this.applyForm);
    this.applyForm = this.fb.group({
      name: new FormControl(''),
      dob: new FormControl(''),
      description: new FormControl('')
    });
  }
  ngOnInit(): void {
    this.getHero();
    this.initForm();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => {
          this.hero = hero;
          this.applyForm?.patchValue({
            dob:this.hero?.dob,
            name: this.hero?.name,
            description: this.hero?.description
          })
      })
  }

  saveWithReactiveFrom(): void{
    console.log("hello");
    const { name, dob, description } = this.applyForm?.value;
    const id = this.hero?.id;
    this.heroService.updateHero({ id , name, dob, description } as Hero)
      .subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }


}
