import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
} from '@angular/router';

import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlattener,
  MatTreeFlatDataSource,
} from '@angular/material/tree';

import {
  untilDestroyed,
  UntilDestroy,
} from '@ngneat/until-destroy'

import {
  BehaviorSubject,
  Subject,
  combineLatest,
} from 'rxjs';
import {
  map as rxMap,
  switchMap,
} from 'rxjs/operators'

import {
  head,
  pipe,
  prop,
  propOr,
  find,
  whereEq,
  chain,
  reduce,
} from 'ramda';

import emailMask from 'text-mask-addons/dist/emailMask';

import {
  Application,
  ApplicationBits,
  ApplicationService,
} from 'app/services/application.service';

interface FlatNode {
  id: string
  name: string
  level: number
  expandable: boolean
}

@UntilDestroy()
@Component({
  selector: 'app-application-instance',
  templateUrl: './application-instance.component.html',
  styleUrls: ['./application-instance.component.scss']
})
export class ApplicationInstanceComponent implements OnInit {
  public form: FormGroup

  public subFormId: Subject<string>
  public application: BehaviorSubject<Application>
  public sections: BehaviorSubject<ApplicationBits[]>
  public formGroups: BehaviorSubject<FormGroup[]>

  public treeControl: FlatTreeControl<FlatNode>
  public treeFlattener: MatTreeFlattener<ApplicationBits, FlatNode>
  public dataSource: MatTreeFlatDataSource<ApplicationBits, FlatNode>

  public masks = {
    email: emailMask,
    ssn: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    phonenumber: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  }

  public constructor(
    private builder: FormBuilder,
    private service: ApplicationService,
    private route: ActivatedRoute,
  ) {
    this.subFormId = new Subject()
    this.application = new BehaviorSubject(null)
    this.sections = new BehaviorSubject([])
    this.formGroups = new BehaviorSubject([])
    this.treeControl = new FlatTreeControl(
      prop('level'),
      prop('expandable'),
    )
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      prop('level'),
      prop('expandable'),
      ({ type, children }) => type === 'tree' ? children : null,
    )
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener,
    )
  }

  public ngOnInit(): void {
    const application$ = this.route.params
    .pipe(
      untilDestroyed(this),
      rxMap(prop('id')),
      switchMap((applicationInstanceId: string) => this.service.fetch({ applicationInstanceId })),
    )

    application$.subscribe(this.application)

    const tree$ = application$
    .pipe(
      rxMap<Application, ApplicationBits[]>(propOr([], 'children')),
    )

    tree$.subscribe(
      (data: ApplicationBits[]) => {
        this.dataSource.data = data

        this.treeControl.expandAll()
      }
    )

    tree$
    .pipe(
      rxMap(
        pipe<readonly ApplicationBits[], ApplicationBits[], ApplicationBits[], FormGroup>(
          chain(propOr([], 'children')),
          chain(propOr([], 'children')),
          (sections: ApplicationBits[]) => this.createForm(sections),
        ),
      ),
    )
    .subscribe(form => this.form = form)

    combineLatest(
      tree$,
      this.subFormId,
      (tree, id) => {
        const search = pipe(
          chain(propOr([], 'children')),
          find(whereEq({ id })),
        )

        return search(tree);
      }
    )
    .pipe(
      rxMap(prop('children')),
    )
    .subscribe(this.sections)

    tree$
    .pipe(
      rxMap(
        pipe(
          head, // first tree
          prop('children'),
          head, // first subform
          prop('id')
        ),
      ),
    )
    .subscribe((id: string) => this.setSubForm(id))
  }

  public hasChild(_: number, node: FlatNode): boolean {
    return node.expandable
  }

  public setSubForm(id: string) {
    this.subFormId.next(id)
  }

  public getName({ type, id }: ApplicationBits, debug = false): string {
    if (debug) {
      console.log(`${type}${id}`)
    }
    return `${type}${id}`
  }

  public getForm(section: string): FormGroup {
    return this.form.get(section) as FormGroup
  }

  public getField(section: string, field: string) {
    return this.form.get([section, field])
  }

  public submit() {
    this.form.disable()
  }

  private transformer({ id, type, title: name, children }: ApplicationBits, level: number): FlatNode {
    return {
      id,
      name,
      level,
      expandable: type === 'tree' && !!children && children.length > 0,
    }
  }

  // This needs to be refactored to be more DRY
  private createForm(sections: ApplicationBits[]): FormGroup {
    const controlsConfig = reduce(
      (group, section) => {
        const name = this.getName(section)

        group[name] = this.createSectionFormGroup(section)

        return group
      },
      {},
      sections,
    )

    return this.builder.group(controlsConfig)
  }

  private createSectionFormGroup(section: ApplicationBits): FormGroup {
    const controlsConfig = reduce(
      (group, field) => {
        const name = this.getName(field)

        group[name] = [null, this.getValidators(field)]

        return group
      },
      {},
      section.children,
    )

    return this.builder.group(controlsConfig)
  }

  private getValidators(field: ApplicationBits): ValidatorFn {
    const validators = []

    switch (field.format) {
      case 'email': {
        validators.push(Validators.email)

        break
      }
      case 'phonenumber': {
        validators.push(Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/))

        break
      }
      case 'ssn': {
        validators.push(Validators.pattern(/^\d{3}-\d{2}-\d{4}$/))

        break
      }
      case 'date': {
        validators.push(Validators.pattern(/^\d{4}-\d{2}-\d{2}$/))

        break
      }
      case 'zipCode': {
        validators.push(Validators.pattern(/^\d{5}$/))

        break
      }
      case 'zipCode+4': {
        validators.push(Validators.pattern(/^\d{5}-\d{4}$/))

        break
      }
      case 'alphanumeric': {
        validators.push(Validators.pattern(/^[0-9A-Za-z]*$/))

        break
      }
      case 'onlyLetters': {
        validators.push(Validators.pattern(/^[A-Za-z]*$/))

        break
      }
      case 'onlyNumbers': {
        validators.push(Validators.pattern(/^[0-9]*$/))

        break
      }
      // Running low on time. Very crude implementation here.
      case 'currency': {
        validators.push(Validators.pattern(/^\$\d+\.\d{2}$/))

        break
      }
      default: break
    }

    if (field.required) {
      if (validators.length === 0) {
        return Validators.required
      }

      validators.push(Validators.required)
    }

    return Validators.compose(validators)
  }

}
