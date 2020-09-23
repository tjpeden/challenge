import { Injectable } from '@angular/core';

import {
  whereEq,
} from 'ramda';

import {
  of,
  Observable,
} from 'rxjs';

export interface Application {
  formId: string
  applicationType: string
  applicationInstanceId: string
  creationDate: string
  lastUpdate: string
  children?: ApplicationBits[]
}

export interface ApplicationBits {
  id: string
  type: string
  title: string
  children?: ApplicationBits[]
  fieldType?: string
  format?: string
  required?: boolean
  masked?: boolean
}

export interface ApplicationQueryVariables {
  applicationInstanceId: string
}

const Applications: Application[] = [
  {
    "formId": "1",
    "applicationType": "Taxes Form",
    "applicationInstanceId": "34bbdc2a-d6a4-442e-9e91-a9c32731ead0",
    "creationDate": "2020-01-01",
    "lastUpdate": "2020-09-01",
    "children": [
      {
        "id": "1",
        "type": "tree",
        "title": "Tree 1",
        "children": [
          {
            "id": "11",
            "type": "subform",
            "title": "SubForm 11",
            "children": [
              {
                "id": "111",
                "type": "section",
                "title": "Section 111",
                "children": [
                  {
                    "id": "1111",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1111",
                  },
                  {
                    "id": "1112",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "ssn",
                    "masked": true,
                    "title": "Field 1112",
                  },
                  {
                    "id": "1113",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "phonenumber",
                    "masked": true,
                    "title": "Field 1113",
                  },
                ],
              },
              {
                "id": "112",
                "type": "section",
                "title": "Section 112",
                "children": [
                  {
                    "id": "1121",
                    "type": "field",
                    "fieldType": "textArea",
                    "required": true,
                    "title": "Field 1121",
                  },
                  {
                    "id": "1122",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1122",
                  },
                  {
                    "id": "1123",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1123",
                  },
                ],
              },
              {
                "id": "113",
                "type": "section",
                "title": "Section 113",
                "children": [
                  {
                    "id": "1131",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1131",
                  },
                  {
                    "id": "1132",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1132",
                  },
                  {
                    "id": "1133",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1133",
                  },
                ],
              },
            ],
          },
          {
            "id": "12",
            "type": "subform",
            "title": "SubForm 12",
            "children": [
              {
                "id": "121",
                "type": "section",
                "title": "Section 121",
                "children": [
                  {
                    "id": "1211",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1211",
                  },
                  {
                    "id": "1212",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1212",
                  },
                  {
                    "id": "1213",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1213",
                  },
                ],
              },
              {
                "id": "122",
                "type": "section",
                "title": "Section 122",
                "children": [
                  {
                    "id": "1221",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1221",
                  },
                  {
                    "id": "1222",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1222",
                  },
                  {
                    "id": "1223",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1223",
                  },
                ],
              },
              {
                "id": "123",
                "type": "section",
                "title": "Section 123",
                "children": [
                  {
                    "id": "1231",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1231",
                  },
                  {
                    "id": "1232",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1232",
                  },
                  {
                    "id": "1233",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1233",
                  },
                ],
              },
            ],
          },
          {
            "id": "13",
            "type": "subform",
            "title": "SubForm 13",
            "children": [
              {
                "id": "131",
                "type": "section",
                "title": "Section 131",
                "children": [
                  {
                    "id": "1311",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1311",
                  },
                  {
                    "id": "1312",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1312",
                  },
                  {
                    "id": "1313",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1313",
                  },
                ],
              },
              {
                "id": "132",
                "type": "section",
                "title": "Section 132",
                "children": [
                  {
                    "id": "1321",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1321",
                  },
                  {
                    "id": "1322",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1322",
                  },
                  {
                    "id": "1323",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1323",
                  },
                ],
              },
              {
                "id": "133",
                "type": "section",
                "title": "Section 133",
                "children": [
                  {
                    "id": "1331",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1331",
                  },
                  {
                    "id": "1332",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1332",
                  },
                  {
                    "id": "1333",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 1333",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        "id": "2",
        "type": "tree",
        "title": "Tree 2",
        "children": [
          {
            "id": "21",
            "type": "subform",
            "title": "SubForm 21",
            "children": [
              {
                "id": "211",
                "type": "section",
                "title": "Section 211",
                "children": [
                  {
                    "id": "2111",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2111",
                  },
                  {
                    "id": "2112",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2112",
                  },
                  {
                    "id": "2113",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2113",
                  },
                ],
              },
              {
                "id": "212",
                "type": "section",
                "title": "Section 212",
                "children": [
                  {
                    "id": "2121",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2121",
                  },
                  {
                    "id": "2122",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2122",
                  },
                  {
                    "id": "2123",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2123",
                  },
                ],
              },
              {
                "id": "213",
                "type": "section",
                "title": "Section 213",
                "children": [
                  {
                    "id": "2131",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2131",
                  },
                  {
                    "id": "2132",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2132",
                  },
                  {
                    "id": "2133",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2133",
                  },
                ],
              },
            ],
          },
          {
            "id": "22",
            "type": "subform",
            "title": "SubForm 22",
            "children": [
              {
                "id": "221",
                "type": "section",
                "title": "Section 221",
                "children": [
                  {
                    "id": "2211",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2211",
                  },
                  {
                    "id": "2212",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2212",
                  },
                  {
                    "id": "2213",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2213",
                  },
                ],
              },
              {
                "id": "222",
                "type": "section",
                "title": "Section 222",
                "children": [
                  {
                    "id": "2221",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2221",
                  },
                  {
                    "id": "2222",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2222",
                  },
                  {
                    "id": "2223",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2223",
                  },
                ],
              },
              {
                "id": "223",
                "type": "section",
                "title": "Section 223",
                "children": [
                  {
                    "id": "2231",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2231",
                  },
                  {
                    "id": "2232",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2232",
                  },
                  {
                    "id": "2233",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2233",
                  },
                ],
              },
            ],
          },
          {
            "id": "23",
            "type": "subform",
            "title": "SubForm 23",
            "children": [
              {
                "id": "231",
                "type": "section",
                "title": "Section 231",
                "children": [
                  {
                    "id": "2311",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2311",
                  },
                  {
                    "id": "2312",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2312",
                  },
                  {
                    "id": "2313",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2313",
                  },
                ],
              },
              {
                "id": "232",
                "type": "section",
                "title": "Section 232",
                "children": [
                  {
                    "id": "2321",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2321",
                  },
                  {
                    "id": "2322",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2322",
                  },
                  {
                    "id": "2323",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2323",
                  },
                ],
              },
              {
                "id": "233",
                "type": "section",
                "title": "Section 233",
                "children": [
                  {
                    "id": "2331",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2331",
                  },
                  {
                    "id": "2332",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2332",
                  },
                  {
                    "id": "2333",
                    "type": "field",
                    "fieldType": "textField",
                    "required": true,
                    "format": "email",
                    "masked": true,
                    "title": "Field 2333",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  public constructor() { }

  public fetch(variables: ApplicationQueryVariables): Observable<Application> {
    return of(Applications.find(whereEq(variables)))
  }

}
