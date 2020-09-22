import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
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

import { NgFormsManager } from '@ngneat/forms-manager';

import {
  BehaviorSubject,
  Subject,
  combineLatest,
} from 'rxjs';
import {
  map as rxMap,
  switchMap,
  takeUntil,
  tap as rxTap,
} from 'rxjs/operators'

import {
  head,
  map,
  pipe,
  prop,
  propOr,
  find,
  whereEq,
  chain,
} from 'ramda';

import emailMask from 'text-mask-addons/dist/emailMask'

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

@Component({
  selector: 'app-application-instance',
  templateUrl: './application-instance.component.html',
  styleUrls: ['./application-instance.component.scss']
})
export class ApplicationInstanceComponent implements OnInit, OnDestroy {
  private destroy: Subject<void>

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
    private manager: NgFormsManager,
    private builder: FormBuilder,
    private service: ApplicationService,
    private route: ActivatedRoute,
  ) {
    this.destroy = new Subject()
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
      rxMap(prop('id')),
      switchMap((applicationInstanceId: string) => this.service.fetch({ applicationInstanceId })),
      takeUntil(this.destroy),
    )

    application$.subscribe(this.application)

    const tree$ = application$
    .pipe(
      rxMap(propOr([], 'children')),
      takeUntil(this.destroy),
    )

    tree$.subscribe(
      (data: ApplicationBits[]) => {
        this.dataSource.data = data

        this.treeControl.expandAll()
      }
    )

    const sections$ = combineLatest(
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

    sections$
    .pipe(
      rxMap(
        map((section: ApplicationBits) => this.createForm(section))
      )
    )
    .subscribe(this.formGroups)

    sections$.subscribe(this.sections)

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

  public ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.unsubscribe()
    this.manager.unsubscribe()
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

  public getField(name: string, index: number) {
    return this.manager.getControl(name, `fields.${index}`)
  }

  private transformer({ id, type, title: name, children }: ApplicationBits, level: number): FlatNode {
    return {
      id,
      name,
      level,
      expandable: type === 'tree' && !!children && children.length > 0,
    }
  }

  private createForm(section: ApplicationBits) {
    const name = this.getName(section)

    const controlsConfig = section.children.map(
      field => {
        const validators = []

        if (field.required) {
          validators.push(Validators.required)
        }

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

        return this.builder.control(null, Validators.compose(validators))
      }
    )
    const formGroup = this.builder.group({
      fields: this.builder.array(controlsConfig),
    })

    this.manager.upsert(name, formGroup)

    return formGroup
  }

}
