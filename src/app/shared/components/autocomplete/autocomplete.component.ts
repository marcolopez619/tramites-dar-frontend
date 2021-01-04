import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { fadeInAnim, slideInLeftAnim } from '../../animations/template.animation';
import { UsuarioModel } from '../../models/Usuario.model';
import { LangService } from '../../services/lang.service';
import { BaseComponent } from './../../base.component';

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
  formAutocomplete: FormGroup;
  listaFiltrada: Observable<Array<UsuarioModel>>;
  listaSeleccionados: Array<UsuarioModel> = [];

  @Input()
  placeHolder: string;

  @Input()
  matLabelError: string;

  @Input()
  listaCompleta: Array<UsuarioModel>;

  @Input()
  listaInicial: Array<UsuarioModel> = [];

  @Input()
  isRequired: boolean;

  @Output()
  listaSeleccionadosEmiter = new EventEmitter();

  @Output()
  isFormularioInvalid = new EventEmitter();

  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    public langService: LangService,
    private formBuilder: FormBuilder
  ) {
    super();
  }
  ngOnInit(): void {

    // Para cargar la lista inicial en caso de que se le envie uno desde el componente padre.
    this.listaSeleccionados = this.listaInicial;

    if (this.isRequired) {
      this.formAutocomplete = this.formBuilder.group({
        autoCompleteData : [ this.listaSeleccionados.length > 0 ? this.listaSeleccionados : undefined, Validators.compose([ Validators.required ])]
      });

      this._emitIsFormularioInvalid();

    } else {
      this.formAutocomplete = this.formBuilder.group({
        autoCompleteData : [ undefined ]
      });
    }

    this.listaFiltrada = this.formAutocomplete.valueChanges
        .pipe(
          startWith(''),
          map((item: UsuarioModel | null) => item ? this._filter(item) : this.listaCompleta.slice())
        );
  }
  private _filter(value: any): Array<UsuarioModel> {

    value = value.autoCompleteData;
    if ( value ) {

      if ( typeof value === 'object'  ) {
        const filterValue = value as UsuarioModel;
        return this.listaCompleta.filter(item => item.nombreCompleto.toLowerCase().includes(filterValue.nombreCompleto) );
      } else {
        // Es un string
        const filterValue = value.toLowerCase();
        // Busqueda que INCLUYE el parametro de busqueda dentro la cadena a buscar.
        return this.listaCompleta.filter(item => item.nombreCompleto.toLowerCase().includes(filterValue) );
      }
    }
  }

  private _emitIsFormularioInvalid(): void {
    this.isFormularioInvalid.emit( this.formAutocomplete.controls['autoCompleteData'].invalid );
  }

  add(event: MatChipInputEvent): void {
    /* const input = event.input;
    const value = event.value;

    if ((value || '') ) {
      this.listaSeleccionados.push(value as UsuarioModel);
      this.listaSeleccionadosEmiter.next( this.listaSeleccionados );
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.formAutocomplete.setValue(''); */
  }

  remove(item: UsuarioModel): void {
    const index = this.listaSeleccionados.indexOf(item);

    if (index >= 0) {
      this.listaSeleccionados.splice(index, 1);
      if (this.listaSeleccionados.length === 0 && this.isRequired) {
        this.formAutocomplete.controls['autoCompleteData'].reset();
        this.formAutocomplete.controls['autoCompleteData'].updateValueAndValidity();
      }
      // this.isFormularioInvalid.emit( this.formAutocomplete.controls['autoCompleteData'].invalid );
      this._emitIsFormularioInvalid();
      this.listaSeleccionadosEmiter.next( this.listaSeleccionados );
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.listaSeleccionados.push(event.option.value as UsuarioModel);
    this.input.nativeElement.value = '';
    this._emitIsFormularioInvalid();
    this.listaSeleccionadosEmiter.next( this.listaSeleccionados );
  }

}
