import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Country, Idd } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRouter: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRouter.params
    .pipe(
      switchMap( ({id}) => this.countriesService.searchCountryByAlphaCode(id) )
    )
    .subscribe( country => {
      if( !country ) return this.router.navigateByUrl('')
      return this.country = country;
    });
  };
  
};
