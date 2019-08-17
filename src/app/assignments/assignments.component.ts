import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from './../shared/assignments.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  title = 'Elzies Assignment Application';
  enabled = false;
  formVisible = false;

  selectedAssignment: Assignment;
  assignments: Assignment[];

  constructor(private assignmentService: AssignmentsService,
    private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.enabled = true;
    }, 2000);
    // this.assignments = this.assignmentService.getAssignments();
    this.getAssignments();
  }

  getAssignments() {
    this.assignmentService.getAssignments().subscribe(
      assignments => this.assignments = assignments
    );
  }

  setSelected(assignment: Assignment) {
    // this.selectedAssignment = assignment;
    this.router.navigate(['/assignment/' + assignment.id]);
  }

  onAddNewBtnClick() {
    // this.formVisible = true;
    this.selectedAssignment = null;
  }

  /* onNewAssignment(event: Assignment) {
    this.assignmentService.addAssignments(event).subscribe(
      success => console.log('erh win')
    );
    this.formVisible = false;
  } */

}
