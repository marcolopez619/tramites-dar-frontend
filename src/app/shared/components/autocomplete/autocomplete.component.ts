import {T} from 'typescript/lib/typescript';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { BaseComponent } from './../../base.component';
import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { fadeInAnim, slideInLeftAnim } from '../../animations/template.animation';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'sh-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class AutocompleteComponent extends BaseComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes = [ENTER, COMMA];
  formAutocomplete = new FormControl();
  listaFiltrada: Observable<Array<string>>;
  listaSeleccionados: Array<T> = [];

  @Input()
  placeHolder: string;

  @Input()
  listaCompleta: Array<T>;

  @Output()
  listaSeleccionadosEmiter = new EventEmitter<T>();


  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    public langService: LangService,
  ) {
    super();
  }
  ngOnInit(): void {

    this.listaFiltrada = this.formAutocomplete.valueChanges
        .pipe(
          startWith(''),
          map((item: string | null) => item ? this._filter(item) : this.listaCompleta.slice())
        );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.listaSeleccionados.push(value.trim());
      this.listaSeleccionadosEmiter.next( this.listaSeleccionados );
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.formAutocomplete.setValue('');
  }

  remove(item: string): void {
    const index = this.listaSeleccionados.indexOf(item);

    if (index >= 0) {
      this.listaSeleccionados.splice(index, 1);
      this.listaSeleccionadosEmiter.next( this.listaSeleccionados );
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.listaSeleccionados.push(event.option.viewValue);
    this.input.nativeElement.value = '';
    this.formAutocomplete.setValue('');
    this.listaSeleccionadosEmiter.next( this.listaSeleccionados );
  }

  private _filter(value: string): Array<T> {
    const filterValue = value.toLowerCase();
    // Busqueda que INCLUYE el parametro de busqueda dentro la cadena a buscar.
    return this.listaCompleta.filter(item => item.toLowerCase().includes(filterValue) );
  }

}
