import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {

  assignmentName: string;
  dueDate: Date;
  assignment: Assignment;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assignmentsService: AssignmentsService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    this.getAssignment(id);

    // console.log('queryParams', this.route.snapshot.queryParams);
    // console.log('fragment', this.route.snapshot.fragment);

    this.route.queryParams.subscribe(params => console.log(params));
    this.route.fragment.subscribe(fragment => console.log(fragment));
  }
  getAssignment(id) {
    this.assignmentsService.getAssignment(id).subscribe(
      assignment => this.assignment = assignment
    );
  }
  onSaveAssignment() {
    if (this.assignmentName) {
      this.assignment.name = this.assignmentName;
    }
    if (this.dueDate) {
      this.assignment.dueDate = this.dueDate;
    }
    this.assignmentsService.updateAssignments(this.assignment)
      .subscribe(assignment =>
        this.router.navigate(['/assignment/' + this.assignment.id]));
  }
}
