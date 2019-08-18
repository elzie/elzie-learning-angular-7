import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from './../shared/assignments.service';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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

  submitted: Assignment[];
  unsubmitted: Assignment[];

  constructor(private assignmentService: AssignmentsService,
    private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.enabled = true;
    }, 2000);
    // this.assignments = this.assignmentService.getAssignments();
    this.getAssignments();
    this.assignmentService.getSubmitted().subscribe(subAssignments => this.submitted = subAssignments);
    this.assignmentService.getUnsubmitted().subscribe(unsubAssignments => this.unsubmitted = unsubAssignments);
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
  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }
  }
}
