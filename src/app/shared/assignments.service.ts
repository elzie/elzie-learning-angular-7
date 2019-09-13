import { Injectable } from '@angular/core';
import { Assignment } from './../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  myAssignments: Assignment[] = [{
    id: 1,
    name: 'Front-end Development',
    dueDate: '2020-04-11',
    submitted: true
  },
  {
    id: 2,
    name: 'App Development',
    dueDate: '2020-04-11',
    submitted: false
  },
  {
    id: 3,
    name: 'Video Effects',
    dueDate: '2020-04-11',
    submitted: true
  },
  {
    id: 4,
    name: 'Do the dishes.',
    dueDate: '2020-04-11',
    submitted: false
  },
  {
    id: 5,
    name: 'Deploy awesome site',
    dueDate: '2020-04-11',
    submitted: true
  },
  {
    id: 6,
    name: 'Correct all the errors!',
    dueDate: '2020-04-11',
    submitted: false
  },
  {
    id: 7,
    name: 'Being awesome',
    dueDate: '2020-04-11',
    submitted: true
  },
  {
    id: 8,
    name: 'After Effects Training',
    dueDate: '2020-04-11',
    submitted: false
  },
  {
    id: 9,
    name: 'React and Vue',
    dueDate: '2020-04-11',
    submitted: true
  },
  {
    id: 10,
    name: 'Front-end Development',
    dueDate: '2020-04-11',
    submitted: false
  }
  ];


  url = environment.url;
  // urlOne = environment.urlOne;
  // private api key: fb4d5819-ea22-4780-8588-62302c55c203
  constructor(private loggingService: LoggingService,
    private http: HttpClient) { }

  getAssignments(): Observable<Assignment[]> {
    // return of(this.assignments);
    return of(this.myAssignments);
  }

  addAssignments(assignment: Assignment): Observable<any> {
    this.myAssignments.push(assignment);
    // this.loggingService.log(assignment.name, 'added');
    return of('assignment successfully added !');
    // return this.http.post<Assignment>(this.assignments, assignment, this.httpOptions);
  }

  getAssignment(id: number): Observable<Assignment> {
    return of(this.myAssignments.find(x => x.id === id));
    // return this.http.get<Assignment>(this.urlOne + '/' + id);
    // return this.http.get<Assignment>(this.urlOne + '/' + id)
    //   .pipe(
    //     tap(_ => console.log(`fetched assignment id =${id}`)),
    //     catchError(this.handleError<Assignment>(`getAssignment id=${id}`))
    //   );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  updateAssignments(assignment: Assignment): Observable<string> {
    // return this.http.put<Assignment>(this.urlOne, assignment);
    this.myAssignments.forEach((assignment, i) => {
      if (assignment === assignment) {
        this.myAssignments[i] = assignment;
      }
    });
    return of('assignment updated!');
  }

  deleteAssignment(deletedAssignment: Assignment): Observable<any> {
    // const newUrl = this.urlOne + '/' + deletedAssignment._id;
    this.myAssignments.forEach((assignment, i) => {
      if (assignment === deletedAssignment) {
        this.myAssignments.splice(i, 1);
      }
    });
    return of('assignment deleted!');
    // return this.http.delete(newUrl);
  }
  getSubmitted(): Observable<any> {
    const assignments = this.http.get<Assignment[]>(this.url);

    return assignments.pipe(map(arr =>
      arr.filter(a => a.submitted === true)));

  }

  getUnsubmitted() {
    const assignments = this.http.get<Assignment[]>(this.url);

    return assignments.pipe(map(arr =>
      arr.filter(a => a.submitted === false)));
  }
}
